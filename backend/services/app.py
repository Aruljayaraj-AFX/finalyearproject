from fastapi import HTTPException,Depends,status
from models.user_info import userTable
from models.client_info import ClientTable
from models.App_info import AppTable
from .info import generate_idno_app
from sqlalchemy.exc import SQLAlchemyError
import traceback
import sys

async def app_create(app_info, db, token):
    try:
        result = db.query(ClientTable).filter(ClientTable.clent_email == token['email']).first()
        if not result:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="client Not Found")
        all_app_ids = {u.App_id for u in db.query(AppTable.App_id).all()}
        res = db.query(userTable).filter(userTable.client_id == result.client_id).first()
        if not res:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User Not Found")
        newapp_id = generate_idno_app(all_app_ids)
        new_app_entry = AppTable(
            App_id =newapp_id,
            App_name = app_info.app_name,
            access_users = app_info.access_users
        )
        db.add(new_app_entry)
        db.commit()
        db.refresh(new_app_entry)
        existing_app_ids = res.App_id or []
        existing_app_ids.append(newapp_id)
        res.App_id = existing_app_ids
        db.commit()
        db.refresh(res)
        db.close()

        return  "success_new_app_added"

    except HTTPException:
        raise
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def apps_list(db,token):
    try:
        result = db.query(ClientTable).filter(ClientTable.clent_email == token["email"]).first()
        if not result:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User Not Found")
        client_id = result.client_id
        res = db.query(userTable.App_id).filter(userTable.client_id==client_id).first()
        if ((not res) or (res == [])):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Apps Not Found")
        print(res)
        return res[0]
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

"""async def name_change(app_info, db, token):
    try:
        user = db.query(ClientTable).filter()"""