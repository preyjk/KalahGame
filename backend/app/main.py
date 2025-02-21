from fastapi import FastAPI
from routes import user_routes, kalah_routes

app = FastAPI()

app.include_router(user_routes.router)
app.include_router(kalah_routes.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}