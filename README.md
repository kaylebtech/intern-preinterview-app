KoinSave – Fintech Dashboard (React + Firebase Auth + MockAPI)

Live Demo
🔗 https://github.com/kaylebtech/intern-preinterview-app

A pre-interview project built for the KoinSave Internship Assessment.

A lightweight fintech-style web app featuring user authentication, dashboard UI, mock transactions, and a dual-backend setup using Firebase Authentication + MockAPI.


Features

✅ Authentication (Firebase Auth)

Email + password sign up

Secure login through Firebase

Full error handling (email already in use, invalid credentials, network errors)


✅ Dashboard (MockAPI)

Displays logged-in user profile

Shows account balance

Loads mock transactions

“Send Money” feature:

Creates a new transaction

Deducts amount from user balance

Syncs balance back to MockAPI



✅ Dual Backend System

This project uses two APIs together:

Purpose	Service

Secure Authentication	Firebase Authentication
User records + transactions	MockAPI.io


This matches real-world structures where auth and data live on separate services.

Endpoints Used (MockAPI)

/users

/transactions


Base URL:

https://691db2c6d58e64bf0d372c91.mockapi.io


---

Tech Stack

React (Vite)

Firebase Authentication

MockAPI.io

LocalStorage (session persistence)

Custom CSS (clean fintech UI)

⸻

Project Structure

src/
 ├── api.js
 ├── auth.js
 ├── firebase.js
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

1. Signup

Creates a Firebase user

Automatically creates a corresponding user on MockAPI

Redirects to dashboard


2. Login

Authenticates via Firebase

Fetches the matching MockAPI user using the Firebase uid


3. Send Money

Deducts balance

Adds a new transaction to MockAPI

Updates dashboard instantly

⸻

Deployment

This project can be deployed on:
	•	Vercel
	•	Netlify

Just import the GitHub repo and deploy.

⸻

Notes

All financial data is mocked (no real money movement).

MockAPI stores user records + transactions.

Firebase handles secure authentication.

Dashboard auto-loads:

Current user (from LocalStorage)

User transactions (from MockAPI)

⸻
