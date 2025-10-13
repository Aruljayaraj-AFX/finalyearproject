from pydantic import BaseModel, constr
from enum import Enum
from typing import Optional, Dict
from utils.data_santized import SanitizeModel

class sig_type(str, Enum):
    GOOGLE = "GOOGLE"
    FACEBOOK = "FACEBOOK"
    GITHUB = "GITHUB"

class role(str,Enum):
    CLIENT = "CLIENT"
    USER = "USER"

class User_info(SanitizeModel):
    Email:str
    type_sig:sig_type
    fullname:str
    role: role

class login_client(SanitizeModel):
    email:str
    fullname:str

class form_info_client(SanitizeModel):
    logo:Optional[str] = None
    company_name:Optional[str] = None
    fullname:Optional[str]= None
    phone_no:Optional[constr(pattern=r"^[0-9]{10}$")]=None
    country:Optional[str] = None
    state:Optional[str] = None
    district:Optional[str] = None
    description:Optional[str] = None
    slogan:Optional[str] = None
    links:Optional[Dict[str, str]] = {}