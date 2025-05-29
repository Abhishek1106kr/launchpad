# 🚀 Launchpad

A full-stack web application for student onboarding, authentication, and test management built with **React + Vite** (frontend) and **Express + MongoDB** (backend).

🌐 **Live Deployment:**  
[Launchpad on Netlify](https://683795d5918567cb7d1881d2--melodic-beijinho-9bdd10.netlify.app/)

---

## 📁 Folder Structure

```
project/
├── backend/       → Node.js + Express API
└── frontend/      → React + Vite app
```

---

## 🧪 Features

- User Signup & Login
- Admin Panel for control
- Student Dashboard
- Test instructions page
- MongoDB backend with JWT authentication
- Deployment-ready on Netlify

---

## 🔧 Full Setup Guide

### ✅ Backend Setup

1. **Go to the backend folder**  
   ```bash
   cd backend
   ```

2. **Initialize Node.js project (if not already initialized)**  
   ```bash
   npm init -y
   ```

3. **Install backend dependencies**  
   ```bash
   npm install bcryptjs cors dotenv express jsonwebtoken mongoose
   ```

4. **Setup `.env` file**  
   Create a `.env` file inside `/backend`:
   ```
   MONGO_URI=mongodb+srv://belalaamirkhan:baZ3nUTBMmAvBNlj@cluster0.1sco7s6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=mystrongsecretkey123
   PORT=5002
   ```

5. **Update package.json scripts**  
   In `backend/package.json`, set:
   ```json
   "scripts": {
     "start": "nodemon server.js"
   }
   ```

6. **Start the backend server**
   ```bash
   npm start
   ```

---

### ✅ Frontend Setup

1. **Open a new terminal & go to the frontend folder**  
   ```bash
   cd frontend
   ```

2. **Initialize frontend project (if not already initialized)**  
   ```bash
   npm init -y
   ```

3. **Install frontend dependencies**  
   ```bash
   npm install react react-dom react-icons react-router-dom axios
   ```

4. **Install Vite & ESLint as dev dependencies**  
   ```bash
   npm install --save-dev eslint @vitejs/plugin-react vite
   ```

5. **Install everything again (for safety)**  
   ```bash
   npm install
   ```

6. **Update package.json scripts**
   In `frontend/package.json`, set:
   ```json
   "scripts": {
     "dev": "vite"
   }
   ```

7. **Run the frontend dev server**  
   ```bash
   npm run dev
   ```

---

## 🚀 Deployment

### 🟢 Frontend on Netlify

- Go to [Netlify](https://netlify.com)
- Connect to your GitHub repository
- **Build command**: `npm run build`  
- **Publish directory**: `dist` (for Vite)
- Set environment variables (if any)

👉 [Live site](https://683795d5918567cb7d1881d2--melodic-beijinho-9bdd10.netlify.app/mainpage)

---

## 👨‍💻 Contributors

- Abhishek Kumar Chauhan  
- Aamir Khan  
(And other awesome team members 🚀)
