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
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# PORT=5000


# === Frontend Setup ===

# 5. Open a new terminal tab/window and go to frontend folder
cd frontend

# 6. Install frontend packages
npm install

# 7. Start the frontend development server
npm start

