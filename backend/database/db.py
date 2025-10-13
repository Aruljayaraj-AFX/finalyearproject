from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()
DB_URL=str(os.getenv("DB_URL"))

engine = create_async_engine(DB_URL,echo=False,pool_size=5,max_overflow=10,pool_timeout=30,pool_recycle=1800)

AsyncSessionLocal = sessionmaker(bind=engine,class_=AsyncSession,expire_on_commit=False,autoflush=False,autocommit=False,)

async def get_DB():
    async with AsyncSessionLocal() as session:
        yield session