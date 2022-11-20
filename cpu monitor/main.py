# _*_ coding:utf-8 _*_
import psutil
from starlette.middleware.cors import CORSMiddleware
from fastapi import FastAPI
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
@app.get("/cpu")
def read_cpu():
    return psutil.cpu_percent()

@app.get("/disk")
def read_disk():
    return psutil.disk_usage("/")