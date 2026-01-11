Room Rental Management System

A full-stack web application designed to simplify the management of rental properties by enabling tenants to browse and book rooms while allowing administrators to manage listings, bookings, and payment status through a centralized system.

🚀 Features
User (Tenant)

User registration and secure login

Browse available rooms with detailed information

Book rooms and track booking status

View payment and rental history

Admin

Secure admin authentication

Add, update, and remove room listings

Manage room availability and bookings

Monitor rental and payment status

Post announcements for tenants

🛠️ Tech Stack
Frontend

React.js

HTML5, CSS3

JavaScript (ES6+)

Backend

Node.js

Express.js

RESTful APIs

Database

MongoDB (Mongoose ODM)

Tools & Platforms

Git & GitHub

Postman (API testing)

VS Code

🏗️ System Architecture

Client–server architecture

RESTful API communication between frontend and backend

Role-based access control (Admin / User)

MVC-style project structure for maintainability

📂 Project Structure (Simplified)
room-rental-management-system/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── README.md
└── package.json

⚙️ Installation & Setup
Prerequisites

Node.js

MongoDB

npm or yarn

Steps

Clone the repository

git clone https://github.com/Mithu1202/Room-rental-management.git


Install backend dependencies

cd backend
npm install


Install frontend dependencies

cd frontend
npm install


Configure environment variables
Create a .env file in the backend directory:

MONGO_URI=your_mongodb_connection_string
PORT=5000


Run the application

Backend:

npm start


Frontend:

npm start

🔐 Authentication & Security

Secure login system for users and admins

Role-based access control

Protected API routes

Input validation for critical operations

📌 Future Enhancements

Online payment gateway integration

Advanced search and filtering

Email notifications for bookings

Deployment with Docker

Admin analytics dashboard

👩‍💻 Author

Vishnavi Thavakkumar
Full Stack Developer Intern
GitHub: https://github.com/Vishnavi21507

📝 License

This project is for educational and portfolio purposes.
