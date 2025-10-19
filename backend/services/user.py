from fastapi import HTTPException, status
from schema.user_info import user_info
from models.user_info import userTable
from models.client_info import ClientTable
from .info import generate_idno_user
from sqlalchemy.exc import SQLAlchemyError
import traceback
import sys

async def new_user(user_data, db, token):
    try:
        existing = db.query(userTable).filter(userTable.user_Email == user_data.user_Email).first()
        if existing:
            raise HTTPException(status_code=409, detail="Email already exists")

        all_user_ids = {u.user_id for u in db.query(userTable.user_id).all()}
        user_id = await generate_idno_user(all_user_ids)

        client = db.query(ClientTable).filter(ClientTable.clent_email == token['email']).first()

        new_user_entry = userTable( 
            client_id=client.client_id,
            user_id=user_id,
            Role="ADMIN",
            User_Name=user_data.User_Name,
            user_Email=user_data.user_Email,
            user_PhoneNo=user_data.user_PhoneNo,
            Address=user_data.Address,
            user_country=user_data.user_country,
            user_State=user_data.user_State,
            user_district=user_data.user_district
        )

        db.add(new_user_entry)
        db.commit()
        db.refresh(new_user_entry)

        return  "success_new_user_added"

    except HTTPException:
        raise
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
async def update_user(user_data,db,token):
    try:
        result=db.query(userTable).filter(userTable.user_Email == user_data.user_Email).first()
        result.User_Name = user_data.User_Name
        result.user_Email = user_data.user_Email
        result.user_PhoneNO = user_data.user_PhoneNo
        result.Address = user_data.Address
        result.user_district = user_data.district
        result.user_State  = user_data.user_State
        result.user_country = user_data.user_country
        db.commit()
        db.close()
        return "successfully_update"
    except Exception as e:
        db.rollback()
        traceback.print_exc(file=sys.stdout)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=f"form update error: {repr(e)}")
    except HTTPException:
        raise

async def delete_user(user_id,db,token):
    try:
        result = db.query(userTable).filter(userTable.user_id == user_id).first()
        if not result:
            raise HTTPException(status_code=404, detail="Client not found")
        db.delete(result)
        db.commit()
        return "delete_successfully"
    except Exception as e:
        db.rollback()
        traceback.print_exc(file=sys.stdout)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=f"form update error: {repr(e)}")
    except HTTPException:
        raise