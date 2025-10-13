from sqlalchemy import Column,ARRAY,String,Text,DateTime,func,BigInteger
from sqlalchemy.orm import declarative_base

Base3 = declarative_base()

class AppTable(Base3):
    __tablename__ = "App_table"
    App_id = Column(String(30),primary_key=True,index=True)
    Area_id = Column(ARRAY(String),nullable=True)
    created_by = Column(DateTime,default=func.now())