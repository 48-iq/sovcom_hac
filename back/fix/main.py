from fastapi import FastAPI 
import json

from other_data import other_data

from partners_data import partners_data

app = FastAPI()


if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host="localhost", port=8000)