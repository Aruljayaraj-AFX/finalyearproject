from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()
DB_URL = str(os.getenv("DB_URL"))

engine = create_engine(
    DB_URL,
    pool_size=5,        
    max_overflow=0,         
    pool_pre_ping=True  
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

def get_DB():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
