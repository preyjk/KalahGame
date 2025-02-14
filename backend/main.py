from typing import Union
import os
import psycopg2
from psycopg2.extras import RealDictCursor

from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI()


class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}


def get_db_connection():
    try:
        conn = psycopg2.connect(
            os.getenv("DATABASE_URL"),
            cursor_factory=RealDictCursor
        )
        return conn
    except Exception as error:
        print("Error connecting to database:", error)
        return None


@app.get("/test-db")
async def test_db():
    conn = get_db_connection()
    if conn:
        try:
            cur = conn.cursor()
            cur.execute("SELECT 1")
            result = cur.fetchone()
            cur.close()
            conn.close()
            return {"message": "Database connection successful", "result": result}
        except Exception as error:
            return {"error": str(error)}
    return {"error": "Could not connect to database"}