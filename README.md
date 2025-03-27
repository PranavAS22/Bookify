# Bookify - Online Movie Ticket Booking

Bookify is an online movie ticket booking system that allows users to select movies, select seats, and book tickets seamlessly. It features a React-based frontend, a Node.js and Express backend, and MongoDB for data storage. The entire application is Dockerized for easy deployment.

---

## Features
- **User Authentication**: Signup/Login for users.
- **Movie Listings**: View available movies and their details.
- **Seat Selection**: Choose available seats for a movie show.
- **Booking System**: Secure ticket booking and confirmation.
- **Admin Panel**: Add movie, theaters, bookings.

---

## Tech Stack
### Frontend
- **React.js**
- **Tailwind CSS**
- **HTML & JavaScript**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**

### Deployment & DevOps
- **Docker**
- **Docker Compose**

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (Latest LTS version)
- **Docker & Docker Compose**

### Clone the Repository
```sh
git clone https://github.com/your-username/bookify.git
cd bookify
```

### Running with Docker

#### 1️⃣ Build and Start Containers
```sh
docker compose up --build
```
This will start:
- **MongoDB** (Database)
- **API** (Backend)
- **UI** (Frontend)

#### 2️⃣ Access the Application
- **Frontend (UI)**: `http://localhost:3000`
- **Backend (API)**: `http://localhost:8000`
- **MongoDB** runs internally on port `27017`

#### 3️⃣ Stopping the Containers
```sh
docker compose down
```

---

## Manual Setup (Without Docker)

### Backend Setup
```sh
cd Server
npm install
npm start
```
API runs on: `http://localhost:8000`

### Frontend Setup
```sh
cd UI
npm install
npm start
```
UI runs on: `http://localhost:3000`

---

## Signing Up as Admin
To register as an admin, sign up using the following email:

- **Email**: `admin@bookify.com`
- **Any Username & Password of Your Choice**

Users signing up with this email will automatically have admin privileges.

---

## Docker Compose File
```yaml
services:
  mongodb:
    image: mongo:latest
    container_name: mongodb
    ports:
      - 27017:27017
    volumes:
      - mongo_volume:/data/db
  api:
    image: api
    container_name: api
    depends_on:
      - mongodb
    build:
      context: Server
      dockerfile: ./Dockerfile
    ports:
      - 8000:7300
  ui:
    image: ui
    container_name: ui
    depends_on:
      - api
    build:
      context: UI
      dockerfile: ./Dockerfile
    ports:
      - 3000:3200
volumes:
  mongo_volume:
```

---

### Happy Booking with Bookify! 🎟️🎬
