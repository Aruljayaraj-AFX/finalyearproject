import bleach
from pydantic import BaseModel, field_validator

def sanitize_text(text: str) -> str:
    return bleach.clean(text, strip=True)

class SanitizeModel(BaseModel):
    @field_validator("*", mode="before")
    def sanitize_all(cls, v):
        if isinstance(v, str):
            return sanitize_text(v)
        return v
