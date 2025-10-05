# CineBooker 🎬

CineBooker is a movie booking web application that allows users to browse cinemas, select movies and showtimes, book seats, and manage their bookings. It features a responsive frontend, secure authentication, real-time booking management, and a dashboard for users.

---

## Tech Stack 🛠️

- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **State Management:** Zustand  
- **Authentication:** JWT (JSON Web Tokens)  
- **HTTP Requests:** Axios  
- **Version Control:** Git, GitHub  

---

## Features 

- User authentication (login/register)  
- Browse cinemas, movies, and showtimes  
- Select seats and confirm bookings  
- Cancel bookings with confirmation modal  
- Dashboard to view upcoming, past, and cancelled bookings  
- Real-time updates of bookings using Zustand  

---

## Database Schema 

The database consists of the following main tables:

### `users`
| Column       | Type        | Description                |
| ------------ | ----------- | -------------------------- |
| user_id      | INT         | Primary key                |
| user_name    | VARCHAR     | User's full name           |
| user_email   | VARCHAR     | User's email for login     |
| password     | VARCHAR     | Hashed password            |

### `cinemas`
| Column        | Type        | Description            |
| ------------- | ----------- | -------------------- |
| cinema_id     | INT         | Primary key          |
| cinema_name   | VARCHAR     | Name of the cinema   |
| cinema_location | VARCHAR   | Location of the cinema |

### `movies`
| Column        | Type        | Description             |
| ------------- | ----------- | ---------------------- |
| movie_id      | INT         | Primary key             |
| movie_title   | VARCHAR     | Movie name             |
| movie_genre   | VARCHAR     | Genre of the movie     |
| movie_language | VARCHAR    | Language of the movie  |
| duration_minutes | INT      | Duration in minutes    |

### `showtimes`
| Column        | Type        | Description               |
| ------------- | ----------- | ------------------------ |
| show_id       | INT         | Primary key              |
| cinema_id     | INT         | Foreign key to `cinemas` |
| movie_id      | INT         | Foreign key to `movies`  |
| show_time     | DATETIME    | Scheduled time for show  |
| screen_name   | VARCHAR     | Screen or hall name      |

### `bookings`
| Column        | Type        | Description                       |
| ------------- | ----------- | --------------------------------- |
| booking_id    | INT         | Primary key                       |
| user_id       | INT         | Foreign key to `users`            |
| show_id       | INT         | Foreign key to `showtimes`        |
| seats         | JSON/BLOB   | Array of seat objects booked      |
| status        | ENUM        | Booking status: `confirmed`/`cancelled` |
| booked_at     | DATETIME    | Timestamp when booking was made   |

---

## Setup Instructions ⚡

Follow these steps to run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/CineBooker.git
cd CineBooker
```

### 2. Install backend dependencies
```bash
cd Backend
npm install
```

### 3. Setup MySQL database

--> Create a database named cinebooker

--> Import the SQL schema from database/schema.sql

--> Update .env with your database credentials:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=cinebooker
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Run the backend server

nodemon server

### 5. Install frontend dependencies

```bash
cd ../Frontend
npm install
```

### 6. Run the frontend

```bash
npm run dev
```

### 7. Open the app
Navigate to http://localhost:5173 in your browser.


# Folder Structure 📂

```bash
CineBooker/
│
├─ Backend/
│   ├─ controllers/
│   ├─ routes/
│   ├─ models/
│   ├─ database/
│   ├─ index.js
│   └─ package.json
│
├─ Frontend/
│   ├─ src/
│   │   ├─ Components/
│   │   ├─ store/
│   │   ├─ pages/
│   │   ├─ App.jsx
│   │   └─ index.jsx
│   └─ package.json
│
└─ README.md

```

# Notes 📝

--> Each seat booking costs ₹250.

--> Users can cancel bookings, and the system updates both frontend and backend states.

--> Authentication uses JWT tokens, stored in localStorage.

--> Zustand is used for global state management for bookings and selected seats.


# Author ✍️

Satyam Kumar
Email: sk916151745@gmail.com
GitHub: https://github.com/Satyam2016


