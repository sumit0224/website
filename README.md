# EduPrime - Online Learning Platform

A fullstack Next.js application for an online learning platform, featuring a modern UI, course management, blog system, and student enrollment.

## Features

- **Public Pages**: Home, Courses, Course Details, Blogs, About Us, Placement, Enroll.
- **Admin Dashboard**: Manage Courses, Blogs, and view Enrollments.
- **Authentication**: Simple Admin login.
- **Backend**: MongoDB for data persistence.
- **Email Notifications**: Nodemailer integration for enrollment requests.
- **Styling**: Custom CSS modules with a modern White/Blue/Orange theme.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript
- **Database**: MongoDB (Mongoose)
- **Styling**: CSS Modules
- **Icons**: Lucide React
- **Email**: Nodemailer

## Getting Started

### Prerequisites

- Node.js installed.
- MongoDB connection string (Atlas or Local).
- Gmail account (or other SMTP service) for sending emails.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Environment Variables:
   Create a `.env.local` file in the root directory (`website/.env.local`) and add the following:

   ```env
   # Database Connection
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/eduprime

   # Email Configuration (for Nodemailer)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password

   # Base URL (Optional, useful for absolute URLs if needed)
   URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Admin Access

- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Username**: `admin`
- **Password**: `admin`

## Project Structure

- `src/app`: App Router pages and API routes.
- `src/components`: Reusable UI components (Navbar, Footer, Hero, etc.).
- `src/lib`: Utility functions (Database connection).
- `src/models`: Mongoose data models (Course, Blog, Enrollment).
- `src/data`: (Deprecated) Mock data used initially.

## Deployment

This project can be easily deployed on Vercel. Remember to add the environment variables in the Vercel dashboard.
