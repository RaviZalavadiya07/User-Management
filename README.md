# 📘 User Management System  
### Angular + ASP.NET Core Web API

---

## 📌 Project Overview

The **User Management System** is a full-stack web application developed using **Angular** for the frontend and **ASP.NET Core Web API** for the backend.

The application provides:
- Complete **CRUD operations**
- **Search** functionality
- **Pagination**
- Real-world **frontend–backend integration**

This project follows clean coding practices and a structured folder architecture suitable for enterprise applications.

---

## 🛠 Tech Stack

### 🔹 Frontend
- Angular
- Angular Material
- TypeScript
- HTML, CSS
- RxJS

### 🔹 Backend
- ASP.NET Core Web API
- Entity Framework Core
- C#
- SQL Server

### 🔹 Tools
- Visual Studio Code
- Visual Studio
- Git & GitHub
- Swagger

---

## ✨ Features

### ✅ Frontend (Angular)
- User listing using Angular Material Table
- Add, Edit, Delete user functionality
- Search users by keyword
- Pagination support
- Responsive UI using Angular Material
- REST API integration using HttpClient

### ✅ Backend (ASP.NET Core Web API)
- RESTful CRUD APIs
- Repository pattern implementation
- Entity Framework Core with migrations
- Pagination and search functionality
- Clean and structured folder architecture

---

## 📂 Project Structure

### 🔹 Root Folder
```text
User-Management
├── FrontEnd_User-Management
├── BackEnd_User-Management
└── .gitignore

🔹 Backend Structure
BackEnd_User-Management
├── Controllers
│   └── UserController.cs
├── Data
│   └── AppDbContext.cs
├── Model
│   └── User.cs
├── Repository
│   └── UserRepository.cs
├── Migrations
├── Program.cs
└── appsettings.json

🔹 Frontend Structure
FrontEnd_User-Management
├── src/app
│   ├── components
│   ├── services
│   └── models
├── angular.json
└── package.json


🚀 How to Run the Project

▶ Backend Setup
Open BackEnd_User-Management in Visual Studio
Update database connection in appsettings.json
Run migrations:
Update-Database
Run the API (F5)

▶ Frontend Setup
Open FrontEnd_User-Management in VS Code
Install dependencies:
npm install
Run the application:
ng serve
Open browser:
http://localhost:4200

📚 Learning Outcomes
  Angular component-based architecture
  REST API integration in Angular
  ASP.NET Core Web API development
  Entity Framework Core & migrations
  Pagination and search implementation
  Full-stack application workflow




