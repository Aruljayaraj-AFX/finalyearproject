from fastapi import HTTPException,Request,Depends,status
from schema.user_info import user_info
from models.user_info import userTable
from models.client_info import ClientTable
from .info import generate_idno_user
from sqlalchemy.future import select
from sqlalchemy import func
from sqlalchemy.ext.asyncio import AsyncSession
import logging


async def new_user(user_data, db: AsyncSession, token: dict):
    try:
        result = await db.execute(select(userTable).where(userTable.user_Email == user_data.user_Email))
        if result.scalar_one_or_none():
            raise HTTPException(status_code=409, detail="Email already exists")

        max_id_result = await db.execute(select(func.max(userTable.user_id)))
        max_id = max_id_result.scalar() or 0
        user_id = max_id + 1

        client_result = await db.execute(select(ClientTable).where(ClientTable.clent_email == token['email']))
        client = client_result.scalar_one_or_none()
        if not client:
            raise HTTPException(status_code=404, detail="Client not found")

        new_user_obj = userTable(
            client_id=client.client_id,
            user_id=user_id,
            Role="ADMIN",
            User_Name=user_data.User_Name,
            user_Email=user_data.user_Email,
            user_PhoneNo=user_data.user_PhoneNo,
            Address=user_data.Address,
            user_country=user_data.user_country,
            user_State=user_data.user_State,
            user_district=user_data.user_district,
        )

        async with db.begin():
            db.add(new_user_obj)

        await db.refresh(new_user_obj)

        return {"status": "success", "user_id": user_id, "message": "User created"}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred"
        )

"""async def update_user(User_info,db,token):
    try:
        if User_info.role != "CLIENT":
            raise HTTPException(status_code=403, detail="Only CLIENT role allowed")
        existing = db.query(userTable).filter(userTable.clent_email == User_info.Email).first()
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
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")"""
