# API Gateway Notes

## Provision API Gateway

Create an **API Gateway** `asc-apigw` on the **public** subnet.

Get your own compartment searching by name or use the root compartment from env variable `OCI_TENANCY` (to use in next step):
```bash
oci iam compartment list --name "<COMPARTMENT-NAME>" --query "data[].id"
```

Get the application OCID for `app-asc` (to use in next step):
```bash
oci fn application list --query 'data[].[id,"display-name"]' -c <COMPARTMENT-OCID>
```

Get the function OCID for `primefactors` (to use in next step):
```bash
oci fn function list --query 'data[].[id, "display-name"]' --application-id <APPLICATION-OCID>
```

From local computer, on the file [deployment.template.json](deployment.template.json), rename it to `deployment.json`
```bash
cp src/apigw/deployment.template.json src/apigw/deployment.json
```

And replace `FUNCTION-OCID` with the value from previous step.

Create a **Deployment** `asc-demo` with **Upload an existing Deployment API** and Path prefix `/api/v1`.

When `Active`, test endpoint
```bash
curl -s <DEPLOYMENT_ENDPOINT>/primefactors/18 | jq .
```

## Redis

API Gateway Cache feature requires Redis.

Provision a **compute** `redis` on **private** Subnet for Redis server.

Enable **Bastion plugin**.

**Bastion** host with target **Private** Subnet. Create a **Session** for the redis instance.

### Compute instance and Redis service

- Add an Extra Packages for Enterprise Linux (EPEL) repository: `yum install epel-release`
  - Make sure the repo is enable=1 on `/etc/yum.repos.d/oracle-epel-ol7.repo`
- Update yum: `yum update -y`
- Install Redis: `yum install redis -y`
- Start Redis service: `systemctl start redis.service`
- Start Redis on boot: `systemctl enable redis`
- Check status: `systemctl status redis.service`
- Check redis ping: `redis-cli ping`

### Secure Redis Instance

- Get private IP: `ip addr`
- Bind to private IP: `/etc/redis.conf` update with `bind 127.0.0.1 10.0.xxx.xxx`
- Open firewall ports
  - `firewall-cmd --permanent --new-zone=redis` 
  - `firewall-cmd --permanent --zone=redis --add-port=6379/tcp`
  - `firewall-cmd --permanent --zone=redis --add-source=<client_server_private_IP>`
  - `firewall-cmd --reload`
- Generate a strong password `openssl rand -base64 16 > redispass.txt`
- Set up the strong password in `/etc/redis.conf` by uncommenting `requirepass <strongpassword>`
- Restart `systemctl restart redis`
- Check redis ping: ``redis-cli -h <private_ip> -a `cat redispass.txt` ping``

### Create a Vault

- Create a Vault `asc21`
- Create a Master Encryption Key `asc21masterkey`
- Create a secret `redispass` with
```
{"password":"<REDIS-PASSWORD>"}
```

Edit API Gateway `asc-apigw` with caching.

Test with `hey`

```
hey -n 100 -c 1 -q 2 <GW_ENDPOINT>/api/v1/primefactors/1
```

## Observability

Default log groups:

```
vmartin/Default_Group/app_asc_invoke

vmartin/Default_Group/asc_demo_access

vmartin/Default_Group/asc_demo_execution
```

### Access Logs

XXX

### Execution Logs

XXX

### Function Invocation Logs

XXX