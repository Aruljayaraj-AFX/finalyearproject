from pydantic import BaseModel, constr
from enum import Enum
from typing import Optional, Dict

class sig_type(str, Enum):
    GOOGLE = "GOOGLE"
    FACEBOOK = "FACEBOOK"
    GITHUB = "GITHUB"

class role(str,Enum):
    CLIENT = "CLIENT"
    USER = "USER"

class User_info(BaseModel):
    Email:constr(pattern=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
    type_sig:sig_type
    fullname:constr(pattern=r"^[a-zA-Z '-]{2,50}$")
    role: role

class login_client(BaseModel):
    email:constr(pattern=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
    fullname:constr(pattern=r"^[a-zA-Z '-]{2,50}$")

class form_info_client(BaseModel):
    logo:Optional[str] = None
    company_name:Optional[str] = None
    fullname:Optional[constr(pattern=r"^[a-zA-Z '-]{2,50}$")]= None
    phone_no:Optional[constr(pattern=r"^[0-9]{10}$")]=None
    country:Optional[str] = None
    state:Optional[str] = None
    district:Optional[str] = None
    description:Optional[str] = None
    slogan:Optional[str] = None
    links:Optional[Dict[str, str]] = {}