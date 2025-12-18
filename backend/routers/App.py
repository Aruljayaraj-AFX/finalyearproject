from fastapi import APIRouter,Depends
from dotenv import load_dotenv
from services.info import user_Authorization
from services.app import app_create,apps_list
from database.db import get_DB
from schema.app_info import app_info

load_dotenv()

router_app_handle = APIRouter()

@router_app_handle.post("/app_create")
async def new_app(app_info:app_info,db=Depends(get_DB),token:object=Depends(user_Authorization())):
    return await app_create(app_info,db,token)

@router_app_handle.get("app_list")
async def get_apps(db=Depends(get_DB),token:object=Depends(user_Authorization())):
    return await apps_list(db,token)


@router_app_handle.put("/app_name")
async def app_name(app_info:app_info,db=Depends(get_DB),token:object=Depends(user_Authorization)):
    return name_change(app_info,db,token)

"""@router_app_handle.delete("app_delete")
async def app_delete(app_info:app_info,db=Depends(get_DB),token:object=Depends(user_Authorization())):
    return delete_app(app_info,db,token)"""