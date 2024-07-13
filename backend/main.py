from fastapi import FastAPI
from dotenv import load_dotenv
from routers import advert, optimization

load_dotenv()

app = FastAPI(docs_url='/api/swagger')

app.include_router(advert.router, prefix="/api/advert", tags=["Advert"])
app.include_router(optimization.router, prefix="/api/optimization", tags=["Optimization"])
