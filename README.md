# 🚀 Team Task Manager

A full-stack web application designed for seamless team project management, task assignment, and progress tracking. Built with a modern tech stack ensuring performance, scalability, and an excellent user experience.

## ✨ Features

*   **🔒 Secure Authentication:** Signup, Login, and secure session management using Laravel Sanctum.
*   **👥 Role-Based Access Control:** Differentiate between Admin and Member roles for secure operations.
*   **📁 Project Management:** Create projects and build your team by adding members via email.
*   **✅ Task Assignment & Tracking:** Admins can create tasks, assign them to team members, set due dates, and track statuses (`Pending`, `In Progress`, `Completed`).
*   **📊 Interactive Dashboard:** A beautiful, responsive dashboard displaying task summaries, overdue alerts, and overall progress.
*   **🎨 Modern UI/UX:** Built with React and Tailwind CSS v4, featuring a sleek sidebar layout, glassmorphism elements, and smooth micro-animations.

## 🛠️ Technology Stack

*   **Backend:** Laravel 11 / PHP 8.2 (RESTful API, Eloquent ORM)
*   **Frontend:** React 19, Vite, React Router DOM
*   **Styling:** Tailwind CSS v4
*   **Database:** MySQL / SQLite
*   **Deployment:** Railway (Nixpacks configured)

## ⚙️ Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/saqiblko/Team-Task-Manager.git
   cd Team-Task-Manager
   ```

2. **Backend Setup:**
   ```bash
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate
   ```

3. **Frontend Setup:**
   ```bash
   cd task-manager-frontend
   npm install
   npm run build
   cd ..
   ```

4. **Run the Application:**
   ```bash
   php artisan serve
   ```
   *The application will be accessible at `http://localhost:8000`. The Laravel backend serves the compiled React SPA directly.*

## 🌐 Deployment (Railway)

This repository is pre-configured for **Railway** deployment using `nixpacks.toml`.
1. Connect this GitHub repo to a new Railway project.
2. Provision a MySQL Database in Railway.
3. Add the required Environment Variables (`APP_KEY`, `DB_CONNECTION=mysql`, `DB_HOST`, etc.).
4. Run `php artisan migrate --force` from the Railway Console.

---
*Developed as a full-stack assignment demonstrating API architecture, frontend design, and deployment skills.*
