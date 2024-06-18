from fastapi import FastAPI,UploadFile,Form,Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.staticfiles import StaticFiles
from typing import Annotated
import sqlite3

con = sqlite3.connect('db.db', check_same_thread=False)
cur = con.cursor()

cur.execute(f"""
            CREATE TABLE IF NOT EXISTS items(
                id INTIGER PRIMARY KEY,
                title TEXT NOT NULL,
                image INTIGER NOT NULL,
                price INTIGER NOT NULL,
                description TEXT,
                place TEXT NOT NULL,
                insertAt INTIGER NOT NULL
            );
            """)

cur.execute(f"""
            CREATE TABLE IF NOT EXISTS users(
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                password TEXT NOT NULL
            );
            """)

app = FastAPI()

@app.post("/items")
async def create_root(image : UploadFile, 
                title : Annotated[str,Form()], 
                price : Annotated[int,Form()], 
                description : Annotated[str,Form()], 
                place : Annotated[str,Form()],
                insertAt : Annotated[int,Form()]
                ) :
    
    image_bytes = await image.read()
    cur.execute(f"""
                INSERT INTO 
                items(title,image,price,description,place,insertAt)
                VALUES ('{title}','{image_bytes.hex()}',{price},'{description}','{place}','{insertAt}')
                """)
    con.commit()
    return '200'

@app.get('/image/{item_id}')
async def get_image(item_id) :
    cur = con.cursor()
    image_byts= cur.execute(f"""
                            SELECT image FROM items WHERE id={item_id}
                            """).fetchone()[0]
    return Response(content=bytes.fromhex(image_byts),media_type='image/*')

@app.get('/items')
async def get_items() :
    # 칼럼명도 같이 가져옴
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    rows = cur.execute(f"""
                       SELECT * FROM items
                       """).fetchall()
    
    return JSONResponse(jsonable_encoder(dict(row) for row in rows))

@app.post('/signup')
def signup(id : Annotated[str,Form()], 
           password : Annotated[str,Form()],
           name : Annotated[str,Form()],
           email : Annotated[str,Form()]
           ) :
    cur.execute(f"""
                INSERT INTO 
                users(id, name, email, password)
                VALUES ('{id}','{name}','{email}','{password}')
                """)
    con.commit()
    return '200'

app.mount("/", StaticFiles(directory="frontend",html=True), name="frontend")