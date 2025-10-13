from sqlalchemy import Column,ARRAY,String,Text,DateTime,func,BigInteger
from sqlalchemy.orm import declarative_base

Base2 = declarative_base()

class AreaTable(Base2):
    __tablename__ = "Area_table"
    Area_id = Column(String(30),primary_key=True,index=True,nullable=False)
    button_Name = Column(ARRAY(String),nullable=False)
    button_id = Column(ARRAY(String),nullable=False)
    button_type = Column(ARRAY(String),nullable=False)
    created_by = Column(DateTime,default=func.now())