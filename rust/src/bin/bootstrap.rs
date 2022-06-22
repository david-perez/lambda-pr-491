use lambda_runtime::{service_fn, Error};
use serde_json::{json, Value};

#[tokio::main]
async fn main() -> Result<(), Error> {
    let lambda_handler = service_fn(func);

    lambda_http::run(lambda_handler)
        .await
        .expect("something went wrong in the Lambda runtime");

    Ok(())
}

async fn func(_request: lambda_http::Request) -> Result<Value, lambda_http::Error> {
    Ok(json!({ "message": "hello stranger!"}))
}
