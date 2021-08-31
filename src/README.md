# Endpoint Services

## API Gateway

- Create **VCN** with **Public** and **Private** Subnet
- Add **Ingress** Security Rule on **Public** subnet on port **443**
- Add **Dynamic Group** `All {resource.type='ApiGateway', resource.compartment.id='<compartment-ocid>'}` 
- Add **Policy** `Allow dynamic-group <dynamic-group-name> to use functions-family in compartment <compartment-name>`
- Create Functions **Application**
- **Deploy** the functions

## Config Cloud Shell for Functions

Region data (ex, home region)
```bash
oci iam region-subscription list --query 'data[?"is-home-region"] | [0]'
```

Namespace
```bash
oci os ns get --query 'data'
```

User
```bash
XXX
```


```bash
fn list context
fn use context <region>
fn update context oracle.compartment-id <compartment-ocid>
fn update context registry <REGION>.ocir.io/<namespace>/<repo-name>
docker login -u '<namespace>/oracleidentitycloudservice/victor.martin.alvarez@oracle.com' <REGION>.ocir.io
```

## Is Even

Go to `iseven` folder:
```bash
cd iseven
```

Deploy function into application
```bash
fn deploy --app iseven
```