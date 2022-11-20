import uvicorn

# async def app(scope, receive, send):
#     ...

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=5050, log_level="info" , reload = "True")