
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
<img width="1920" height="939" alt="image" src="https://github.com/user-attachments/assets/4e784303-8986-4999-ac73-c98a9808727a" />

<img width="1920" height="374" alt="image" src="https://github.com/user-attachments/assets/8907829b-a5ac-49b2-a0fa-2c25c7863a2f" />

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
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```
# Project Setup
```
mkdir mern-todo-app
```
# Frontend Setup
```
npm create vite@latest frontend --template react-ts
cd frontend
npm install
cd mern-todo-app
code .
npm install axios
```
# Backend Setup
```
mkdir backend
cd backend
npm init -y
npm install express mongoose cors dotenv
npm install --save-dev nodemon
```
# Project structure
```
mern-todo-app/
├── frontend/       # React + Vite + TS frontend
├── backend/        # Express + Mongoose backend
└── README.md
```
Visit http://localhost:5173 to see the app in action.
