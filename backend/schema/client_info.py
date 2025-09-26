from pydantic import BaseModel, constr
from enum import Enum

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
    logo:str
    company_name:str
    fullname:constr(pattern=r"^[a-zA-Z '-]{2,50}$")
    Email:constr(pattern=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
    phone_no:constr(pattern=r"^[0-9]{10}$")
    country:str
    state:str
    district:str