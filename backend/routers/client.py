from fastapi import APIRouter, HTTPException, Request,Depends
from fastapi.responses import JSONResponse
from database.db import get_DB
from starlette.responses import RedirectResponse
from services.info import new_client,login_cli,user_Authorization,info_cli,form_info_up
from schema.client_info import User_info,login_client,form_info_client
from authlib.integrations.starlette_client import OAuth
from models.client_info import ClientTable
from urllib.parse import urlencode
from sqlalchemy.orm import Session
from sqlalchemy import text
from starlette.config import Config
from utils.security_token import hashword,decode
import logging
import json
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
logger = logging.getLogger("uvicorn.error")

@router.get("/ping")
async def ping(db:Session=Depends(get_DB)):
    try:
        db.execute(text("SELECT 1"))
    except Exception as e:
        raise HTTPException(status_code=500, detail="database connection failed!")
    return{ 
        "status": "available",
        "db": "connected successfully"
}

@router.get("/security_check/")
async def read(token: object = Depends(user_Authorization())):
    return token

@router.post("/new_client_reg")
async def new_client_reg(User_info:User_info,db=Depends(get_DB)):
    return await new_client(User_info,db)

@router.post("/login_client")
async def login_client(login_info:login_client,db=Depends(get_DB)):
    return await login_cli(login_info.email,login_info.fullname,db)

@router.get("/client_info_detail")
async def info_detial(db=Depends(get_DB),token: object = Depends(user_Authorization())):
    return await info_cli(db,token)

@router.put("/newclient_form_update")
async def formupdate(form_info:form_info_client,db=Depends(get_DB),token: object = Depends(user_Authorization())):
    return await form_info_up(form_info,db,token)

oauth = OAuth()
oauth.register(
    name="google",
    client_id=str(os.getenv("GOOGLE_CLINET_ID")),
    client_secret=str(os.getenv("GOOGLE_CLINET_SECRET")),
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)

@router.get("/login/google" , include_in_schema=True)
async def login_google(request:Request,act:str):
    redirect_url = request.url_for('auth_google')
    state = json.dumps({"act":act})
    return await oauth.google.authorize_redirect(request, redirect_url,state=state)

@router.get("/auth/google/callback" , include_in_schema=True)
async def auth_google(request:Request,db=Depends(get_DB)):
    token = await oauth.google.authorize_access_token(request)
    user_info = token['userinfo']
    email= user_info["email"]
    fullname= user_info["name"]
    raw_state = request.query_params.get("state")
    state = json.loads(request.query_params.get('state'))
    act_test = state.get("act")
    if act_test == "signup":
        user_data = {
            "Email": user_info["email"],
            "type_sig": "GOOGLE",
            "fullname": user_info["name"],
            "role": "CLIENT"
            }
        user_info = User_info(**user_data)
        try:
            response = await new_client(user_info, db=db)
            message = response.get("message", "")
            if (message == "New client created"):
                print(user_info.Email,user_info.fullname)
                response = await login_cli(email, fullname, db)
                message = response.get("message", "")
                if (message == "Login successful"):
                    token = response.get("token", "")
                    print("point1",token)
                    token1 = decode(token,role="CLIENT")
                    check_form = await info_cli(db,token=token1)
                    print("point2",check_form)
                    data = json.loads(check_form.body)
                    print(data)
                    for key, value in data.items():
                        if value is None :
                            frontend_url = f"http://localhost:5173/Form?{message}&token={token}"
                            return RedirectResponse(url=frontend_url)
                    frontend_url = f"http://localhost:5173/Hero?token={token}"
                    return RedirectResponse(url=frontend_url)
        except HTTPException as e:
            message = e.detail
            if (message == "Email already exists"):
                response = await login_cli(email, fullname, db)
                message = response.get("message", "")
                if (message == "Login successful"):
                    token = response.get("token", "")
                    print("point1",token)
                    token = decode(token,role="CLIENT")
                    check_form = await info_cli(db,token=token)
                    print("point2",check_form)
                    data = json.loads(check_form.body)
                    print(data)
                    for key, value in data.items():
                        if value is None :
                            frontend_url = f"http://localhost:5173/Form?{message}&token={token}"
                            return RedirectResponse(url=frontend_url)
                    frontend_url = f"http://localhost:5173/Hero?token={token}"
                    return RedirectResponse(url=frontend_url)
                frontend_url = f"http://localhost:5173/?error={message}"
        return RedirectResponse(url=frontend_url)
    
    elif act_test == "login":
        try:
            response = await login_cli(email,fullname, db)
            if response.get("message") == "Login successful":
                token = response.get("token", "")
                frontend_url = f"http://localhost:5173/Hero?token={token}"
                return RedirectResponse(url=frontend_url)
            else:
                raise HTTPException(status_code=400, detail=response.get("message", "Login failed"))
        except Exception as e:
            message = e.detail
            frontend_url = f"http://localhost:5173/?error={message}"
            return RedirectResponse(url=frontend_url)
        
oauth2 = OAuth()
oauth2.register(
    name='github',
    client_id='Ov23ctOMPGBNy5AsjYQR',
    client_secret='4f62e1edd4effc32c9ad2a6e4320b961d8b2d16e',
    access_token_url='https://github.com/login/oauth/access_token',
    authorize_url='https://github.com/login/oauth/authorize',
    api_base_url='https://api.github.com/',
    client_kwargs={'scope': 'user:email'},
)

@router.get("/login/github", include_in_schema=True)
async def login_github(request: Request,act: str):
    github = oauth2.create_client("github")
    redirect_uri = request.url_for("github_callback")
    state = json.dumps({"act": act})
    return await github.authorize_redirect(request, redirect_uri, state=state)


@router.get("/auth/github/callback", include_in_schema=True)
async def github_callback(request: Request, db: Session = Depends(get_DB)):
    github = oauth2.create_client("github")
    token = await github.authorize_access_token(request)
    resp = await github.get("user", token=token)
    user_info = resp.json()
    email_resp = await github.get("user/emails", token=token)
    emails = email_resp.json()
    primary_email = next((e["email"] for e in emails if e.get("primary") and e.get("verified")), None)
    if not primary_email:
        raise HTTPException(status_code=400, detail="No verified primary email from GitHub")
    raw_state = request.query_params.get("state")
    if not raw_state:
        raise HTTPException(status_code=400, detail="Missing 'state' parameter")
    try:
        state = json.loads(raw_state)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid 'state' format")
    act_test = state.get("act")
    fullname = user_info.get("name", "GitHub User")
    if act_test == "signup":
        user_model = User_info(
            Email=primary_email,
            fullname=fullname,
            type_sig="GITHUB",
            role="CLIENT"
        )
        try:
            response = await new_client(user_model, db=db)
            message = response.get("message", "")
            if message == "New client created":
                login_resp = await login_cli(primary_email, fullname, db)
                if login_resp.get("message") == "Login successful":
                    token = login_resp.get("token", "")
                    decoded_token = decode(token, role="CLIENT")
                    check_form = await info_cli(db, token=decoded_token)
                    try:
                        data = json.loads(check_form.body)
                    except Exception:
                        data = {}
                    if any(value is None or value == "null" for value in data.values()):
                        frontend_url = f"http://localhost:5173/Form?message={message}&token={token}"
                        return RedirectResponse(url=frontend_url)
                    frontend_url = f"http://localhost:5173/Hero?'token'={token}"
                    return RedirectResponse(url=frontend_url)
        except HTTPException as e:
            message = e.detail
            if (message == "Email already exists"):
                response = await login_cli(primary_email, fullname, db)
                message = response.get("message", "")
                if (message == "Login successful"):
                    token = response.get("token", "")
                    print("point1",token)
                    token1 = decode(token,role="CLIENT")
                    check_form = await info_cli(db,token=token1)
                    print("point2",check_form)
                    data = json.loads(check_form.body)
                    print(data)
                    for key, value in data.items():
                        if value is None :
                            frontend_url = f"http://localhost:5173/Form?{message}&token={token}"
                            return RedirectResponse(url=frontend_url)
                    frontend_url = f"http://localhost:5173/Hero?token={token}"
                    return RedirectResponse(url=frontend_url)
            else:
                frontend_url = f"http://localhost:5173/?error={message}"
                return RedirectResponse(url=frontend_url)
        except Exception as e:
            print("Unexpected error during GitHub signup:", e)
            message = "Internal Server Error"
        frontend_url = f"http://localhost:5173/Form?{urlencode({'error': message})}"
        return RedirectResponse(url=frontend_url)

    elif act_test == "login":
        try:
            login_resp = await login_cli(primary_email, fullname, db)
            if login_resp.get("message") == "Login successful":
                token = login_resp.get("token", "")
                frontend_url = f"http://localhost:5173/Hero?'token'= {token}"
                return RedirectResponse(url=frontend_url)
            else:
                raise HTTPException(status_code=400, detail=login_resp.get("message", "Login failed"))
        except HTTPException as e:
            frontend_url = f"http://localhost:5173/?'error'= {e.detail}"
            return RedirectResponse(url=frontend_url)
        except Exception as e:
            print("Unexpected error during GitHub login:", e)
            frontend_url = f"http://localhost:5173/?'error'= {'Internal Server Error'}"
            return RedirectResponse(url=frontend_url)
    raise HTTPException(status_code=400, detail="Invalid action")

config = Config(".env")

oauth3 = OAuth(config)
oauth3.register(
    name='facebook',
    client_id=config('FACEBOOK_CLIENT_ID'),
    client_secret=config('FACEBOOK_CLIENT_SECRET'),
    access_token_url='https://graph.facebook.com/v16.0/oauth/access_token',
    authorize_url='https://www.facebook.com/v16.0/dialog/oauth',
    api_base_url='https://graph.facebook.com/v16.0/',
    client_kwargs={'scope': 'email public_profile'}
)

@router.get("/login/facebook", include_in_schema=True)
async def login_facebook(request: Request,act: str):
    facebook = oauth3.create_client('facebook')
    redirect_uri = request.url_for("facebook_callback") 
    state = json.dumps({"act": act})
    return await facebook.authorize_redirect(request, redirect_uri, state=state)

@router.get("/auth/facebook/callback", include_in_schema=True)
async def facebook_callback(request: Request, db: Session = Depends(get_DB)):
    facebook = oauth3.create_client("facebook")
    token = await facebook.authorize_access_token(request)
    raw_state = request.query_params.get("state")
    if not raw_state:
        raise HTTPException(status_code=400, detail="Missing 'state' parameter")
    try:
        state = json.loads(raw_state)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid 'state' parameter format")
    act_test = state.get("act")
    resp = await facebook.get(
        "me",
        params={"fields": "id,name,email,first_name,last_name,picture"},
        token=token,
    )
    user_info = resp.json()
    email = user_info.get("email")
    fullname = user_info.get("name", "Facebook User")
    if not email:
        raise HTTPException(status_code=400, detail="Email not returned by Facebook")
    if act_test == "signup":
        user_model = User_info(
            Email=email,
            fullname=fullname,
            type_sig="FACEBOOK",
            role="CLIENT"
        )
        try:
            response = await new_client(user_model, db=db)
            message = response.get("message", "")
        except HTTPException as e:
            message = e.detail
            if message == "Email already exists":
                response = await login_cli(email, fullname, db)
                message = response.get("message", "")
        try:
            if message == "New client created" or message == "Login successful":
                login_resp = await login_cli(email, fullname, db)
                if login_resp.get("message") == "Login successful":
                    token = login_resp.get("token", "")
                    decoded_token = decode(token, role="CLIENT")
                    check_form = await info_cli(db, token=decoded_token)
                    try:
                        data = json.loads(check_form.body)
                    except Exception:
                        data = {}
                    if any(value is None or value == "null" for value in data.values()):
                        frontend_url = f"http://localhost:5173/Form?'message'= {message}&'token'={token}"
                        return RedirectResponse(url=frontend_url)
                    frontend_url = f"http://localhost:5173/Hero?'token'= {token}"
                    return RedirectResponse(url=frontend_url)
        except Exception as e:
            print("Unexpected error during Facebook signup:", e)
            frontend_url = f"http://localhost:5173/Form?'error'={'Internal Server Error'}"
            return RedirectResponse(url=frontend_url)
    elif act_test == "login":
        try:
            login_resp = await login_cli(email, fullname, db)
            if login_resp.get("message") == "Login successful":
                token = login_resp.get("token", "")
                frontend_url = f"http://localhost:5173/Hero?'token'= {token}"
                return RedirectResponse(url=frontend_url)
            else:
                raise HTTPException(status_code=400, detail=login_resp.get("message", "Login failed"))
        except HTTPException as e:
            frontend_url = f"http://localhost:5173/?'error'= {e.detail}"
            return RedirectResponse(url=frontend_url)
        except Exception as e:
            print("Unexpected error during Facebook login:", e)
            frontend_url = f"http://localhost:5173/?'error'={'Internal Server Error'}"
            return RedirectResponse(url=frontend_url)
    raise HTTPException(status_code=400, detail="Invalid action")