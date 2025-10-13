from fastapi import HTTPException,Request,Depends,status
from schema.user_info import user_info
from models.user_info import userTable
from models.client_info import ClientTable
from .info import generate_idno_user

async def new_user(user_data, db, token):
    try:
        if db.query(userTable).filter_by(user_Email=user_data.user_Email).first():
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already exists")

        client = db.query(ClientTable).filter_by(clent_email=token['email']).first()
        if not client:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User Not Found")

        existing_ids = db.query(userTable.user_id).all()
        existing_ids_set = {uid[0] for uid in existing_ids}
        user_id = await generate_idno_user(existing_ids_set)

        new_user_record = userTable(
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

        db.add(new_user_record)
        db.commit()
        db.refresh(new_user_record)
        return {"message": "new_user_added", "user_id": user_id}

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Unexpected error: {str(e)}")

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
