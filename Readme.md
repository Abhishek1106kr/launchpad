# 🔧 All Setup Commands (Backend + Frontend)

## === Backend Setup ===

### 1️⃣ Go to backend folder
```bash
cd backend
```

### 2️⃣ Initialize Node.js project (if not already done)
```bash
npm init -y
```

### 3️⃣ Install required backend packages
```bash
npm install bcryptjs cors dotenv express jsonwebtoken mongoose
```

### 4️⃣ Modify `package.json` to add the start script
Inside `package.json`:
```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "nodemon server.js"
}
```

### 🛠️ Create a `.env` file in the `backend` folder with the following:
```env
MONGO_URI=mongodb+srv://belalaamirkhan:baZ3nUTBMmAvBNlj@cluster0.1sco7s6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=mystrongsecretkey123
PORT=5002
```

### 5️⃣ Start the backend server
```bash
npm start
```

---

## === Frontend Setup ===

### 6️⃣ Open a new terminal tab/window and navigate to frontend folder
```bash
cd frontend
```

### 7️⃣ Initialize frontend project (if not already done)
```bash
npm init -y
```

### 8️⃣ Install frontend packages
```bash
npm install react react-dom react-icons react-router-dom axios
```

### 9️⃣ Install development dependencies
```bash
npm install --save-dev eslint @vitejs/plugin-react vite
```

### 🔟 Install frontend packages (again to make sure all deps are in place)
```bash
npm install
```

### 1️⃣1️⃣ Modify `package.json` to add the dev script
Inside `package.json`:
```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "vite"
}
```

### 1️⃣2️⃣ Start the frontend development server
```bash
npm run dev
```
