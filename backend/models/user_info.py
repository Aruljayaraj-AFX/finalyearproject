from sqlalchemy import Column,ARRAY,String,Text,DateTime,func,BigInteger,ForeignKey
from sqlalchemy.orm import declarative_base,relationship
from .client_info import Base


class userTable(Base):
    __tablename__ = "user_table"
    client_id = Column(String(30),ForeignKey("client_table.client_id"),index=True,nullable=False)
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

    client = relationship("ClientTable", back_populates="users")