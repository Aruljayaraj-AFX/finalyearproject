from dotenv import load_dotenv 
import os
from jose import jwt
from fastapi import HTTPException, status
from jwt import ExpiredSignatureError, InvalidTokenError

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

def decode(token: str, role: str):
    try:
        if role == "CLIENT":
            payload = jwt.decode(token, secret_key1, algorithms=[algorithm])
        else:
            payload = jwt.decode(token, secret_key2, algorithms=[algorithm])
        return payload

    except ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Token has expired")

    except InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid token")

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=f"Token decode error: {str(e)}")