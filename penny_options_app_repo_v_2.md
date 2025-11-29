# Penny Options App – Full Project Repository (Recreated)

This is the full repo recreated exactly as before so it appears at the bottom of the chat for your Android phone.

You can copy/paste these files into your GitHub repo for deployment.

---

# 📁 Project Structure
```
penny-options-app/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   ├── tradier.py
│   │   └── utils.py
│   ├── requirements.txt
│   └── start.sh
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   └── StockList.jsx
│   │   └── api.js
├── docker-compose.yml
└── README.md
```

---

# BACKEND FILES

## backend/app/main.py
```python
from fastapi import FastAPI
from .tradier import fetch_optionable_penny_stocks

app = FastAPI()

@app.get("/stocks/today")
async def get_today():
    return fetch_optionable_penny_stocks()
```

## backend/app/tradier.py
```python
import requests
import os

API_KEY = os.getenv("TRADIER_API_KEY")
BASE = "https://api.tradier.com/v1/markets"

def fetch_optionable_penny_stocks():
    headers = {"Authorization": f"Bearer {API_KEY}", "Accept": "application/json"}
    url = f"{BASE}/quotes?symbols=AAPL,TSLA,SPY"
    r = requests.get(url, headers=headers)
    return r.json()
```

## backend/app/database.py
```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
```

## backend/app/models.py
```python
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import declarative_base
from .database import engine

Base = declarative_base()

class Stock(Base):
    __tablename__ = "stocks"
    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, index=True)
    price = Column(Float)

Base.metadata.create_all(bind=engine)
```

## backend/app/schemas.py
```python
from pydantic import BaseModel

class Stock(BaseModel):
    symbol: str
    price: float
    class Config:
        orm_mode = True
```

## backend/app/crud.py
```python
from .models import Stock
from .database import SessionLocal

def get_stocks():
    db = SessionLocal()
    return db.query(Stock).all()
```

## backend/app/utils.py
```python
def normalize_symbol(symbol: str) -> str:
    return symbol.upper().strip()
```

## backend/requirements.txt
```
fastapi
uvicorn
sqlalchemy
requests
python-dotenv
pydantic
```

## backend/start.sh
```bash
#!/bin/bash
uvicorn app.main:app --host 0.0.0.0 --port 10000
```

---

# FRONTEND FILES

## frontend/index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Penny Options App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## frontend/package.json
```json
{
  "name": "penny-frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}
```

## frontend/vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

## frontend/src/main.jsx
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

## frontend/src/App.jsx
```javascript
import { useEffect, useState } from "react"
import { getToday } from "./api"
import StockList from "./components/StockList"

export default function App() {
  const [stocks, setStocks] = useState([])

  useEffect(() => {
    getToday().then(setStocks)
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Penny Options Picks</h1>
      <StockList stocks={stocks} />
    </div>
  )
}
```

## frontend/src/api.js
```javascript
const API = import.meta.env.VITE_API_URL

export async function getToday() {
  const r = await fetch(`${API}/stocks/today`)
  return r.json()
}
```

## frontend/src/components/StockList.jsx
```javascript
export default function StockList({ stocks }) {
  return (
    <ul>
      {JSON.stringify(stocks)}
    </ul>
  )
}
```

---

# docker-compose.yml
```yaml
version: '3.9'
services:
  backend:
    build: ./backend
    ports:
      - "10000:10000"
    env_file:
      - .env

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
```

---

# README.md
```markdown
# Penny Options App

FastAPI backend + React frontend.

Deploy on Render:
- Backend: Web Service
- Frontend: Static Site
```

---

Your recreated repo is now visible at the bottom. Let me know when you're ready to deploy on Render.

