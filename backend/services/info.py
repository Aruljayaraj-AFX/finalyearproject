from fastapi import HTTPException,Request,Depends,status
from fastapi.security import HTTPBearer,HTTPAuthorizationCredentials
from models.client_info import ClientTable
from fastapi.responses import JSONResponse
from database.db import get_DB
import random
from sqlalchemy.orm import Session
import os
import json
from datetime import datetime,timedelta
from dotenv import load_dotenv
from utils.security_token import hashword,decode
import traceback
import sys

load_dotenv()
ACCESS_TOKEN_EXPIRE_MINUTE = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
client_SECRET_KEY = str(os.getenv("SECRT_KEY1"))
user_SECRET_KEY = str(os.getenv("SECRT_KEY1"))
ALGORITHM = str(os.getenv("ALGORITHM"))

def generate_idno(generate_id):
    while True:
        random_number = random.randint(100000,999999)
        id = "GS"+str(random_number)
        if random_number not in generate_id:
            return id 

def access_token(email,fullname,role):
    try:
        expire=datetime.utcnow()+timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTE)
        payload={
            "email":email,
            "fullname":fullname
        }
        return hashword(payload,role)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=f"Token generation error: {str(e)}")

class user_Authorization(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(user_Authorization, self).__init__(auto_error=auto_error)
    async def __call__(self, request: Request , db: Session = Depends(get_DB)):
        credentials: HTTPAuthorizationCredentials = await super(user_Authorization, self).__call__(request)
        if not credentials:
            raise HTTPException(status_code=403, detail="Invalid egsegfs aauthorization code")
        token = decode(credentials.credentials,role="CLIENT")
        print(token)
        try:
            result = db.query(ClientTable).filter(ClientTable.client_email == token['email']).first()
            db.close()
            try:
                if result:
                    return token
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
        except:
            raise HTTPException(status_code=403, detail="Invalid authorization code")    
        
async def new_client(User_info,db):
    try:
        if User_info.role != "CLIENT":
            raise HTTPException(status_code=403, detail="Only CLIENT role allowed")

        existing = db.query(ClientTable).filter(ClientTable.clent_email == User_info.Email).first()
        if existing:
            raise HTTPException(status_code=409, detail="Email already exists")

        all_clients = db.query(ClientTable).all()
        existing_ids = {client.client_id for client in all_clients}
        client_id = generate_idno(existing_ids) 
        new_cli = ClientTable(client_id=client_id,clent_email=User_info.Email,client_name=User_info.fullname)
        db.add(new_cli)
        db.commit()
        db.refresh(new_cli)

        return {"message": "New client created", "client_id": new_cli.client_id}

    except HTTPException:
        raise  

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
    
async def login_cli(email: str, fullname: str, db):
    try:
        print(email, fullname)
        existing = db.query(ClientTable).filter(ClientTable.clent_email == email).first()
        if not existing:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User Not Found")

        token = access_token(email, fullname, role="CLIENT")

        return {
            "message": "Login successful",
            "token": token,
            "token_type": "bearer",
            "expire": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTE)
        }

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    
async def info_cli(db, token):
    try:
        result = db.query(ClientTable).filter(ClientTable.clent_email == token['email']).first()
        if not result:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User Not Found")

        return {
            "client_logo": result.client_logo,
            "client_company_name": result.client_company_name,
            "client_name": result.client_name,
            "client_email": result.clent_email,
            "client_phoneno": result.client_phone_no,
            "client_country": result.client_country,
            "client_state": result.client_State,
            "client_district": result.client_district,
            "client_description":result.client_description,
            "client_slogan" : result.client_slogan
        }

    except Exception as e:
        print("Error in client_info_detail:", e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

async def info_ch(db, token):
    try:
        result = db.query(ClientTable).filter(ClientTable.clent_email == token['email']).first()
        if not result:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User Not Found")
        result_dict = {column.name: getattr(result, column.name) for column in result.__table__.columns}
        
        for key, value in result_dict.items():
            if key != "links" and value is None:
                return "incomplete"
            
        return "complete"
    except Exception as e:
        print("Error in client_info_detail:", e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))



async def form_info_up(form_info,db,token):
    try:
        print(type(token))
        print("test",token)
        result = db.query(ClientTable).filter(ClientTable.clent_email == token['email']).first()
        if not result:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User Not Found")
        if isinstance(form_info.links, str):
            form_info.links = json.loads(form_info.links)
        result.client_logo = form_info.logo
        result.client_company_name = form_info.company_name
        result.client_name = form_info.fullname
        result.client_phone_no = form_info.phone_no
        result.client_country = form_info.country
        result.client_State = form_info.state
        result.client_district = form_info.district
        result.client_description = form_info.description
        result.client_slogan = form_info.slogan
        result.client_links = form_info.links
        db.commit()
        db.close()
        return {"message":"successfully_update"}
    except Exception as e:
        db.rollback()
        traceback.print_exc(file=sys.stdout)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=f"form update error: {repr(e)}")