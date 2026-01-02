# Contact Manager – MERN Stack Application

A full-stack Contact Management application built using the MERN stack.  
The application allows users to add, view, sort, and delete contacts with proper client-side validation and persistent storage using MongoDB.

---

## 🚀 Features

- Add new contacts with validation
- Client-side validation with clear error messages
- Phone number validation (exactly 10 digits)
- Email format validation
- Submit button disabled until form is valid
- View all contacts in a table
- Sort contacts by:
  - Default (entered order)
  - Name (A–Z)
  - Name (Z–A)
- Delete contacts
- Responsive and clean UI
- Data persistence using MongoDB
- RESTful API integration

---

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML5
- CSS3

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Local / MongoDB Atlas)

### Tools
- Git & GitHub
- Render (Backend Deployment)
- Vercel (Frontend Deployment)

---

## 📂 Project Structure

contact-manager/
│
├── backend/
│   ├── models/
│   │   └── Contact.js
│   ├── routes/
│   │   └── contactRoutes.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.jsx
│   │   │   └── ContactList.jsx
│   │   ├── App.jsx
│   │   └── index.js
│
└── README.md