# 🎬 Book My Show – Full Stack Movie Booking App

🔗 **Live:** https://book-my-show-atxj.onrender.com/

A full-stack movie booking application where users can browse movies and securely authenticate using JWT. Built with a scalable backend and a separate frontend.

---

## 🚀 Features

* 🔐 User authentication (JWT-based)
* 📝 Signup & Login system
* 🚪 Secure logout
* ✅ Auth check for protected routes
* 🌐 Full-stack deployment (Render + Vercel)

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JSON Web Token (JWT)

### Frontend

* JavaScript (inside `/Frontend` folder)

### Deployment

* Render 

---

## 📁 Project Structure

```bash
book_my_show/
│── Frontend/        # Frontend code
│── auth/            # Auth routes & logic
│── jwtToken/        # JWT utilities
│── models/          # Mongoose schemas
│── index.js         # Main server file
│── package.json
```

---

## 🔐 Authentication API

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| GET    | /api/auth/authCheck | Verify user authentication |
| POST   | /api/auth/signup    | Register user              |
| POST   | /api/auth/login     | Login user                 |
| POST   | /api/auth/logout    | Logout user                |

---

## 🧠 Authentication Flow

1. User signs up or logs in
2. Server generates a **JWT token**
3. Token is sent to client
4. Client sends token in future requests
5. Protected routes verify token using middleware

---

## ⚙️ Installation & Setup

### 1️⃣ Clone repo

```bash
git clone https://github.com/nikhiljha02/book_my_show.git
cd book_my_show
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

### 4️⃣ Run server

```bash
npm start
```

---


---

## 🧠 Future Improvements

* 🎟️ Seat booking system
* 💳 Payment integration
* 📱 Better UI (React)
* 🔐 Role-based authentication
* ⭐ Reviews & ratings

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch
3. Make changes
4. Open PR

---

## 👨‍💻 Author

**Nikhil Jha**
GitHub: https://github.com/nikhiljha02

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
