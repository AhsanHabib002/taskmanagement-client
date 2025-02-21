# Task Management Application

A simple and efficient Task Management Application where users can add, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are categorized into three sections: **To-Do, In Progress, and Done**. Changes are saved instantly to the database, ensuring persistence.

## 🚀 Live Demo  
[Task Management App](https://task-management-d2b41.web.app/)  

## 📜 Features  
- Add, edit, and delete tasks  
- Drag-and-drop tasks between categories  
- Instant updates with real-time database synchronization  
- User authentication with Firebase  
- Responsive UI with Tailwind CSS & Daisy UI  

## 🛠 Technologies Used  

### Frontend:  
- React  
- React Router  
- Daisy UI  
- Tailwind CSS  
- DnD Kit (for drag and drop)  
- Moment.js (for time formatting)  
- Firebase Authentication  
- Axios  

### Backend:  
- Node.js  
- Express.js  
- MongoDB  
- JSON Web Token (JWT)  
- MongoDB Change Streams  
- CORS  
- Vercel (for deployment)  

## 🛠 Installation & Setup  

### 🔹 Prerequisites  
Ensure you have the following installed:  
- Node.js  
- MongoDB  

### 🔹 Backend Setup  
1. Clone the repository:  
   ```sh
   git clone <your-repo-url>
   cd backend
Install dependencies:
sh
Copy
Edit
npm install
Create a .env file in the root directory and configure the following:
ini
Copy
Edit
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
Start the backend server:
sh
Copy
Edit
npm start
🔹 Frontend Setup
Navigate to the frontend directory:
sh
Copy
Edit
cd frontend
Install dependencies:
sh
Copy
Edit
npm install
Start the development server:
sh
Copy
Edit
npm start
📌 API & Authentication
Users authenticate via Firebase Authentication.
The backend uses JWT for secure API requests.
📜 License
This project is licensed under the MIT License.

✨ Contributors
[Ahsan Habib Hridoy] – Developer