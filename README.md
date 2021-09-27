# API Specifications Conference 21

## Extend your API with Serverless and API Gateways

- Duration: 10 minutes
- Time: Tuesday, 28 Sep 20:20 CET
  
## Demo

START HERE: [Demo Source code](src/README.md)

> Terraform scripts (pending)

Generate zip with all content:
```
git archive --format zip --output ~/Downloads/asc21talk.zip main
```

Unzip:
```
unzip -d asc21talk asc21talk.zip
```

### Clean up (when done)

- Delete `asc-demo` Deployment
- Delete `asc-apigw` API Gateway
- Delete `primefactors` Function
- Delete `app-asc` Application
- Delete `app_asc_invoke`, `asc_demo_execution` and `asc_demo_access` Logs from `Default_Group` Log Group
- Delete `app-asc/primefactors` repo from Container Registry (root compartment)
- Delete `mynetwork` VCN
- Delete `apigw-functions` Policy
- Delete `apigwdynamicgroup` Dynamic Group