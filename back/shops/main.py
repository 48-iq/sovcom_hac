from fastapi import FastAPI 
import json

from other_data import other_data

from partners_data import partners_data

app = FastAPI()

@app.get("/partner")
async def partner():
  return partners_data

@app.get("/other")
async def other():
  return other_data

@app.get("/all")
async def all():
  return [*other_data,*partners_data]

@app.get("/all-name")
async def shop_name():
  return [shop["name"] for shop in [*other_data,*partners_data]]

