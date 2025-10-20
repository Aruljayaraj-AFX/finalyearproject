from fastapi import APIRouter,HTTPException, Request,Depends
from dotenv import load_dotenv
from services.info import user_Authorization
from sqlalchemy.orm import Session
from database.db import get_DB
from services.user import new_user,update_user,delete_user,get_detail
from schema.user_info import user_info

load_dotenv()

router_user_handle = APIRouter()

@router_user_handle.post("/new_user")
async def new_user_handle(Data:user_info,db=Depends(get_DB),token: object = Depends(user_Authorization())):
    return await new_user(Data,db,token)

@router_user_handle.put("/update_user")
async def update_user_handle(Data:user_info,db=Depends(get_DB),token: object = Depends(user_Authorization())):
    return await update_user(Data,db,token)

@router_user_handle.delete("/delete_user")
async def delete_user_handle(user_email:str,db=Depends(get_DB),token: object = Depends(user_Authorization())):
    return await delete_user(user_email,db,token)

@router_user_handle.get("/user_info")
async def get_user_handle(pagination:int,size_data:int,db=Depends(get_DB),token: object = Depends(user_Authorization())):
    return await get_detail(pagination,size_data,db,token)