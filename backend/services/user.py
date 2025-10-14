from fastapi import HTTPException, status
from schema.user_info import user_info
from models.user_info import userTable
from models.client_info import ClientTable
from .info import generate_idno_user
from sqlalchemy.exc import SQLAlchemyError
import time

async def new_user(user_data, db, token):
    try:
        start=time.time()
        existing = db.query(userTable).filter(userTable.user_Email == user_data.user_Email).first()
        all_user_ids = {u.user_id for u in db.query(userTable.user_id).all()}
        end=time.time()
        print(f"this execution time {start-end}")
        if existing:
            raise HTTPException(status_code=409, detail="Email already exists")
        user_id = generate_idno_user(all_user_ids)
        client = token['email']
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

        return {"status": "success", "user_id": new_user_entry.user_id}

    except HTTPException:
        raise
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))