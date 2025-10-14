from sqlalchemy import Column,ARRAY,String,Text,DateTime,func,BigInteger
from sqlalchemy.orm import declarative_base

Base1 = declarative_base()

class userTable(Base1):
    __tablename__ = "user_table"
    client_id = Column(String(30),index=True)
    user_id = Column(String(30),primary_key=True,index=True)
    App_id = Column(ARRAY(String),nullable=True)
    Role = Column(String(20),nullable=False)
    User_Name = Column(String(30),nullable=False)
    user_Email = Column(String(30),unique=True,nullable=False,index=True)
    user_PhoneNo = Column(BigInteger,nullable=False)
    Address = Column(Text,nullable=False)
    user_country = Column(String(20),nullable=True)
    user_State = Column(String(20),nullable=True)
    user_district = Column(String(20),nullable=True)
    created_by = Column(DateTime,default=func.now()) 