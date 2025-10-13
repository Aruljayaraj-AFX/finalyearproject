from utils.data_santized import SanitizeModel
from pydantic import EmailStr, Field,StringConstraints
from typing import Annotated

class user_info(SanitizeModel):
    User_Name : str
    user_Email : EmailStr
    user_PhoneNo :Annotated[str, StringConstraints(pattern="^[0-9]+$",min_length=10,max_length=10)]
    Address : str
    user_country : str
    user_State : str
    user_district : str