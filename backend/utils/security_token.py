from dotenv import load_dotenv 
import os
from jose import jwt,JWTError
from fastapi import HTTPException, status

load_dotenv()

token_expiry_minutes = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')
algorithm = os.getenv('ALGORITHM')
secret_key1 = os.getenv('SECRET_KEY1')
secret_key2 = os.getenv('SECRET_KEY2')

def hashword(token,role):
    if role=="CLIENT":
        return jwt.encode(token, secret_key1 , algorithm=algorithm)
    else:
        return jwt.encode(token,secret_key2,algorithm=algorithm)

def decode(token,role):
    try:
        if role=="CLIENT":
            return jwt.decode(token,secret_key1, algorithms=[algorithm])
        else:
            return jwt.decode(token,secret_key2, algorithms=[algorithm])
    except Exception as e:
        raise HTTPException(status_code=500,detail=f"error={str(e)}")
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid or expired token: {str(e)}"
        )