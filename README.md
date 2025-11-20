KoinSave – Fintech Dashboard (React + MockAPI)

A simple fintech-style web application built as part of the KoinSave Internship pre-interview assessment.
It includes authentication, a dashboard UI, mock transactions, and MockAPI integration.

⸻

Features

✅ Authentication (Mock API)
	•	Login with email + password
	•	Signup with form validation
	•	Error handling (invalid credentials, request errors)

✅ Dashboard
	•	Displays user balance
	•	Lists recent transactions
	•	Ability to send money (creates a transaction + updates balance)
	•	Fully responsive layout (mobile + desktop)

✅ MockAPI Integration

Endpoints used:
	•	/users
	•	/transactions

Base URL:
https://691db2c6d58e64bf0d372c91.mockapi.io/user


⸻

Tech Stack
	•	React (Vite)
	•	MockAPI.io (mock backend)
	•	LocalStorage (stores logged-in user session)
	•	Custom CSS (fintech gradient UI)

⸻

Project Structure

src/
 ├── api.js
 ├── pages/
 │     ├── Login.jsx
 │     ├── Signup.jsx
 │     └── Dashboard.jsx
 └── styles/
       ├── auth.css
       └── dashboard.css


⸻

Running the Project

1. Install packages

npm install

2. Start development server

npm run dev

3. Mobile testing (same WiFi)

npm run dev -- --host


⸻

Testing

Use any user created inside your MockAPI /users endpoint to log in.

Signup will automatically create a new user in MockAPI.

Send Money:
	•	Deducts amount from balance
	•	Creates a new transaction on MockAPI
	•	Updates UI instantly

⸻

Deployment

This project can be deployed on:
	•	Vercel
	•	Netlify

Just import the GitHub repo and deploy.

⸻

Notes
	•	API is fully mocked (no real money movement)
	•	Balance updates are simulated using both client and MockAPI backend
	•	Dashboard autoloads:
	•	Logged-in user from LocalStorage
	•	Transactions from MockAPI

⸻
