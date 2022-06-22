lambda-cdk
==========

Build the CDK project
---------------------

```sh
cd cdk
npm install
npm run build
```

Deploy
------

Build the Rust Lambda function in _release_ mode:

```sh
cd rust
cargo build --release
```

The binary should appear under `target/release`. It should be named
`bootstrap`. Copy it over to the `target/cdk/release` directory, where CDK will
look into:

```sh
mkdir --parents target/cdk/release
cp target/release/bootstrap target/cdk/release
```

The first time you deploy the function, you need to invoke `cdk bootstrap`.
This is to deploy the CDK toolkit stack into an AWS environment, and has
_nothing_ to do with the fact that our Rust binary is also named `bootstrap`.

```sh
cd cdk
cdk bootstrap
```

To deploy the Lambda function stack, run this command:

```sh
cdk deploy --all
```

Destroy
-------

To destroy the stack:

```sh
cdk destroy --all
```
