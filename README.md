
# 📝 MERN Stack Todo App

A full-stack Todo application built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js) with **TypeScript** and **Vite** for the frontend. I have included all the information needed for beginners as documentation at appropriate places (I like taking notes).   

## 🚀 Features

- Add and delete tasks
- Toggle task completion
- Clean and responsive UI
- TypeScript support
- Vite-powered fast frontend
- RESTful API integration

## Click here to view the app: https://mlf7ssgv-5173.inc1.devtunnels.ms/

## 🖼️ Preview
<img width="1920" height="962" alt="image" src="https://github.com/user-attachments/assets/59b0d81b-0816-43b6-9150-322d5222c3e4" />
<img width="1920" height="374" alt="image" src="https://github.com/user-attachments/assets/1ab6c110-8309-4e5b-8da0-f76429addd94" />

## 📦 Tech Stack

| Frontend          | Backend             | Database   |
|-------------------|---------------------|------------|
| React + TypeScript| Node.js + Express.js| MongoDB    |

## 🛠️ Set Up Your Development Environment

### ✅ Install Node.js and npm

Install Node.js (which includes npm) from the official [Node.js website](https://nodejs.org/).

After installation, verify using:


bash
```
node -v
npm -v
```

# Set up environment variables
Create a .env file in the server directory with the following content:
.env
PORT=5000
MONGO_URI=your_mongodb_connection_string

# Project Setup
mkdir mern-todo-app

# Frontend Setup
npm create vite@latest frontend --template react-ts
cd frontend
npm install
cd mern-todo-app
code .
npm install axios

# Backend Setup
mkdir backend
cd backend
npm init -y
npm install express mongoose cors dotenv
npm install --save-dev nodemon

# Project structure
mern-todo-app/
├── frontend/       # React + Vite + TS frontend
├── backend/        # Express + Mongoose backend
└── README.md

Visit http://localhost:5173 to see the app in action.
