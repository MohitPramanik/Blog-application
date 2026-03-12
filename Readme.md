# BlogHub

## 📝 Project Description
BlogHub is a full-stack blogging platform built using the MERN stack. The project is designed with a strong emphasis on scalability, performance, and clean architecture. It allows users to create, manage, search, and save blogs efficiently while handling large datasets through optimized backend APIs and well-structured database design.

---

## 🔗 Live Project
→ https://bloghub-fe.onrender.com/

---

## 🚀 Features

→ User authentication and authorization using JWT  
→ Create, edit, and manage blogs  
→ Soft delete functionality for safe blog removal  
→ Save and unsave blogs for later reading  
→ Pagination for handling large volumes of data  
→ Search blogs by title and author  
→ Category-based blog organization  
→ Optimized backend queries using indexing and lean queries  
→ Scalable user–blog relationship modeling  
→ Secure RESTful APIs following best practices  
→ Responsive and user-friendly interface  

---

## 🛠️ Technologies Used

### Frontend
→ React.js (TypeScript)  
→ Vite  
→ React Router  
→ Axios  
→ Bootstrap / React-Bootstrap  

### Backend
→ Node.js  
→ Express.js  
→ MongoDB  
→ Mongoose  
→ JWT Authentication  
→ Cloudinary (media storage)  

---

## ☁️ Cloudinary Requirement
This project uses **Cloudinary** for image and media uploads.  
A valid Cloudinary account is required, and the credentials must be configured in the backend environment variables.

---

## ⚙️ Environment Variables

### Frontend (`.env`)
```env
VITE_API_BASE_URL={{backend_url}}/api
```

### Backend (`.env`)
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key

CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_FOLDER_NAME=your_cloudinary_folder_name
```

---
## ⚙️ Installation & Running the Project

### Backend

```
cd server
npm install
```

### Frontend

```
cd client
npm install
```

---
## ⚙️ Run the application

### Start backend

```
npm run dev
```

### Start frontend

```
npm run dev
```

---
This project reflects my hands-on experience in building scalable, production-ready full-stack applications, with a strong focus on backend performance, clean architecture, and maintainable code. 



