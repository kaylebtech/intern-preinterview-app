KoinSave – Fintech Dashboard (React + MockAPI)

A simple fintech-style web application built for the internship pre-interview task.

It features authentication, dashboard UI, transaction history, and mock API integration.


Features 
    Login & Signup (Mock API)
	Responsive Fintech Dashboard
	USER VIEW BALANCE
    Send Money (updates balance + creates transaction)
	Recent Transactions

	Slide-out side menu for mobile users

	LocalStorage user session


Tech Stack 
React (Vite)

MockAPI: Users and Transactions endpoints

LocalStorage - Session persistence

Custom CSS

No
API Endpoints ???? (MockAPI)

You'll replace this with your actual base URL: https://691db2c6d58e64bf0d372c91.mockapi.io/user
Endpoints used:

/users

/transactions

Running the Project:

npm install

npm run dev
Mobile testing:
npm run dev -- --host


Test Login
Use any user created in MockAPI.


Project Structure
src/
 api.js
 pages/
  Login.jsx
  Signup.jsx
  Dashboard.jsx
 styles/

dashboard.css 

Notes:
API is mocked, meaning no real money movement. 
Balance updates: emulated client + server 
Dashboard auto-loads user + transactions on login. 
 
Deployment This project can be quickly deployed on either Vercel or Netlify.