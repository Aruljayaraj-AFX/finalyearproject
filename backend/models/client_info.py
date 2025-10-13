from sqlalchemy import Column, Integer,String,Text,DateTime,func,BigInteger,JSON
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class ClientTable(Base):
    __tablename__ = "Client_table"
    client_id = Column(String(30),primary_key=True,index=True)
    client_logo = Column(Text,nullable=True,unique=True)
    client_company_name = Column(String(60),nullable=True)
    client_description = Column(Text,nullable=True)
    client_slogan = Column(Text,nullable=True)
    client_links = Column(JSON,nullable=True)
    client_name = Column(String(30),nullable=False)
    clent_email = Column(String(30),nullable=False,index=True)
    client_phone_no = Column(BigInteger,nullable=True)
    client_country = Column(String(20),nullable=True)
    client_State = Column(String(20),nullable=True)
    client_district = Column(String(20),nullable=True)
    created_by = Column(DateTime,default=func.now())

