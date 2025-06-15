# Backend Developer Test – User Authentication API

Project Overview

This is a backend coding challenge for a live collaboration project with a frontend developer. The goal is to build a secure, well-structured authentication system to support the following flows from the provided Figma design:

User Registration
Login
Password Reset via OTP
Email Verification

# Features to Implement

User registration with:

First name, last name, email, password, address, phone (with internationalization)
Email/password login

Password reset flow:

Request reset via email
Verify email with OTP
Set and confirm new password
Email verification (OTP-based)

Secure password hashing

Token/session management

Role-based access control (optional)

RESTful API design with consistent JSON responses.

#Tech Stack
Language: Javascript (Nodejs)
Framework: Express Js
Database: Mongodb
Auth Strategy: JWT. JWT is the industry standard for building secure, scalable, stateless REST APIs and mobile backend services. Sessions are great for classic websites. JWTs shine when you have APIs + multiple frontends + scaling needs.

# Setup Instructions
 #Clone the repo
 https://github.com/andoh1996/live-coding-test.git
 
 #Navigate into the project directory
  cd live-coding-test
  
  #Install dependencies
    npm install

  #Add your local configuration
   DATABASE=mongodb+srv://bennyandoh:NQx15M2W4PbrdbC2@cluster0.yj3muva.mongodb.net/livecodedb?retryWrites=true&w=majority
   DATABASE_PASSWORD=NQx15M2W4PbrdbC2

  #Run the application
    node server.js
 
 


