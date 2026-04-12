# Nitesh Singh - Personal Portfolio

This is the repository for my personal portfolio website. It's a full-stack application built with React on the frontend and Node.js/Express on the backend.

## Project Structure

The project is split into two main directories:
- `client/` - React frontend built with Vite
- `server/` - Node.js and Express backend API

## Tech Stack

- **Frontend:** React 18, Vite, React Router, GSAP for animations, CSS Modules
- **Backend:** Node.js, Express, MongoDB (Mongoose)

## Local Development

To run this project locally, you'll need Node.js installed.

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   npm install
   ```

2. Create a `.env` file based on `.env.example`.
   - If you don't provide a `MONGO_URI`, the backend will fall back to using in-memory data for development purposes.

3. Start the backend server:
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5000`.

*(Optional) Database Seeding:*
If you are using MongoDB, you can seed the database with initial project data by running `npm run seed` in the server directory.

### Frontend Setup

1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:4500`. Vite is configured to automatically proxy `/api` requests to the backend server.

## Features

- Custom hero animations using GSAP
- Filterable project gallery
- Dynamic project detail routing
- Working contact form with validation
- Resume download
- Dark/light mode support
- Fully responsive layout

