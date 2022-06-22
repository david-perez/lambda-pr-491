use axum::{routing::get, Json, Router};
use lambda_runtime::Error;
use serde_json::{json, Value};

#[tokio::main]
async fn main() -> Result<(), Error> {
    let lambda_handler = Router::new().route("/hello", get(hello));

    lambda_http::run(lambda_handler)
        .await
        .expect("something went wrong in the Lambda runtime");

    Ok(())
}

async fn hello() -> Json<Value> {
    Json(json!({ "message": "hello stranger!"}))
}
