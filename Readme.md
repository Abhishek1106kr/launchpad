Full setup guide

## 🔧 All Setup Commands (Backend + Frontend)


# === Backend Setup ===

# 1. Go to backend folder
cd backend 

# 2. Initialize Node.js project (if not already done)
npm init -y

# 3. Install required backend packages
npm install bcryptjs cors dotenv express jsonwebtoken mongoose

# 4. Start the backend server
npm start

# Make sure you create a .env file in the backend folder with:(for now it is in backend folder)
MONGO_URI=mongodb+srv://belalaamirkhan:baZ3nUTBMmAvBNlj@cluster0.1sco7s6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=mystrongsecretkey123
PORT=5002


# === Frontend Setup ===

# 5. Open a new terminal tab/window and go to frontend folder
cd frontend

# 7️⃣ Initialize frontend project (if not already done)
npm init -y

# 8️⃣ Install frontend packages
npm install react react-dom react-icons react-router-dom axios

# 9️⃣ Install development dependencies
npm install --save-dev eslint @vitejs/plugin-react vite

# 6. Install frontend packages
npm install

add the dev in the package.json if not have { "dev" : vite }

# 7. Start the frontend development server
npm start

