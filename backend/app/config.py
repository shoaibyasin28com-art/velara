from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    firebase_credentials_path: str = "./firebase-service-account.json"
    jwt_secret_key: str = "dev-secret-change-me"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440
    frontend_origin: str = "http://localhost:5173"

    class Config:
        env_file = ".env"


settings = Settings()
