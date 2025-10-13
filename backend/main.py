from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from routers.client import router
from routers.user import router_user_handle
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import time


app = FastAPI()

app.add_middleware(SessionMiddleware, secret_key=os.getenv("SESSION_SECRET", "super-secret-key"))

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def measure_time(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    duration = time.time() - start
    print(f"{request.method} {request.url} [{response.status_code}] completed in {duration:.3f}s")
    return response

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": f"HTTP {exc.status_code}",
            "message": exc.detail,
            "path": str(request.url)
        }
    )


app.include_router(router,prefix="/Growspire/v1/users_dashboard",tags=["Basics_business_dashboard"])
app.include_router( router_user_handle,prefix="/Growspire/v1/Business_users",tags=["business_users_Crud"])

if __name__ == "__main__":
    uvicorn.run("main:app",host="localhost",port=8000,reload=True)