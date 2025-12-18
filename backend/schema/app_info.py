from utils.data_santized import SanitizeModel
from typing import List

class app_info(SanitizeModel):
    app_name:str
    access_users:List[str]