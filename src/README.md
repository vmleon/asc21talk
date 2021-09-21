# Demo

## Prerequisites

### Networking

Create **VCN** with **Public** and **Private** Subnet

Add **Ingress** Security Rule on **Public** subnet on port **443**

### Security

Add **Dynamic Group** `apigwdynamicgroup` with matching rule:
```
All {resource.type='ApiGateway', resource.compartment.id='<COMPARTMENT-OCID>'}
```

Add **Policy** `apigw-functions` with policy rule:
```
Allow dynamic-group <DYNAMIC-GROUP-NAME> to use functions-family in compartment <COMPARTMENT-NAME>
```

## Serverless

Create Functions **Application** `app-asc` on the private subnet

### Config Cloud Shell for Functions

List the context (different regions where you can operate)
```bash
fn list context
```

The env variable `OCI_REGION` has the region/context you want to use
```bash
fn use context $OCI_REGION
```

Get your own compartment searching by name or use the root compartment from env variable `OCI_TENANCY` (to use in next step):
```bash
oci iam compartment list --name "<COMPARTMENT-NAME>" --query "data[].id"
```

Update compartment to work obtained in previous step or root compartment `$OCI_TENANCY`
```bash
fn update context oracle.compartment-id <COMPARTMENT-OCID>
```

Get tenancy namespace (to use in next step)
```bash
oci os ns get --query 'data'
```

Get region key name (to use in next step)
```bash
oci iam region list --query "data[?name=='$OCI_REGION'] | [0].key" | tr [:upper:] [:lower:] | tr -d '" '
```

```bash
fn update context registry <REGION-KEY>.ocir.io/<NAMESPACE>/app-asc
```

Get your user name (to use in next step)
```bash
oci iam user list --name "oracleidentitycloudservice/<YOUR-EMAIL>" --query "data[].name"
```

Create a Auth token for the user.

Login with docker
```bash
docker login -u '<NAMESPACE>/oracleidentitycloudservice/<YOUR-EMAIL>' <REGION-KEY>.ocir.io
```

### Is Even Deployment

Go to `iseven` folder:
```bash
cd src/iseven
```

Deploy function into application
```bash
fn deploy --app app-asc
```