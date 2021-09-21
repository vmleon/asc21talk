# API Gateway Notes


## Redis

API Gateway Cache feature requires Redis.

You are going to provision a compute on private Subnet for Redis server.

Bastion host for connecting.

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
- Create a secret `redispass`