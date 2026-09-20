# home-analyzer

This app analyzes an image of a home and displays the image of the home with its furniture highlighted. Users can hover over the highlighted regions to get more information about the analysis of a furniture.

# Demo

The following is a video demonstration of the main features of Home Analyzer, including how to upload images and see analyzed results:

[Home Analyzer Demonstration Video](https://img.youtube.com/vi/Fkx8sq4knFY)

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
   - Update the value of FRONTEND_URL to the frontend URL with the intended port if needed

5. Update the .env File of the Frontend
   - Make a copy of `client/.env.example` and rename the copy `.env`
   - Update the value of VITE_BACKEND_URL to the backend URL with the intended port if needed

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

# Upcoming Features

- Adding analyzed results to a summary
- Downloading the a summary of results
- Disputing analyzed results before adding to summary

# License

Home Analyzer is licensed under GNU Affero General Public License (AGPL-3.0). See [LICENSE](./LICENSE) for more information.
