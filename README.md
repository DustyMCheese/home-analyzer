# home-analyzer

This app analyzes videos or images of a home to check the furnishing and decorations present to give insights to help users quickly find, furnish or advertise a home. By analyzing videos or images provided by the user, the app is able to find the number of each furniture and decorations present in the home.

# Installation and Setup

1. Start by cloning this repository:

`git clone https://github.com/DustyMCheese/home-analyzer.git`

2. Install Backend Dependencies

Start at the root of the repository

```
cd server
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

3. Install Frontend Dependencies

Start at the root of the repository

```
cd client
npm install
```

4. Update the .env File of the Backend
   - Make a copy of `server/.env.example` and rename the copy `.env`
   - Update the value of FRONTEND_URL to the frontend URL with the intended port (E.g., http://localhost:8000)

5. Update the .env File of the Frontend
   - Make a copy of `client/.env.example` and rename the copy `.env`
   - Update the value of VITE_BACKEND_URL to the backend URL with the intended port (E.g., http://localhost:5173)

# Starting the Application

1. Start the backend

Start at the root of the repository

```
cd server
uvicorn main:app --port [YOUR_PORT]
```

Example

```
cd server
uvicorn main:app --port 8000
```

2. Start the frontend

Start at the root of the repository

```
cd client
npm run dev -- --port [YOUR_PORT]
```

Example:

```
cd client
npm run dev -- --port 5173
```
