# Job Search App - WORK WING
A modern, full-stack MERN job discovery and tracking platform where users can explore job listings, save their favorites, register/login, and manage applications.


## Live Demo
Live Site: https://dashing-crostata-0f72fb.netlify.app

GitHub Repository: https://github.com/AmurdAmzer/Job-Search



## Features
Search and filter job listings

Save jobs to favorites

Submit and track job applications

User registration and login

Interview preparation notes

External job search using a third-party API

Fully responsive and styled interface



## Tech Stack
### Frontend:
React (Next.js style structure)

HTML5 + CSS3 (custom + module-based)

React Hooks & Functional Components

React Testing Library + Mocha (test-ready setup)


### Backend:
Node.js + Express

MongoDB (Mongoose ODM)

RESTful API design

Axios for API requests

Bcrypt for password hashing

Dotenv for environment configuration



## Folder Structure

![image](https://github.com/user-attachments/assets/22f8568d-ef5d-4456-b8eb-203b1f2754de)



## API Endpoints

/api/jobs	GET	Fetch all jobs

/api/jobs/search	GET	Search jobs by filter

/api/jobs/upload	POST	Upload new job

/api/favorites/:userId	GET	Get user's favorites

/api/favorites	POST	Add job to favorites

/api/favorites	DELETE	Remove favorite

/api/users/register	POST	Register a new user

/api/users/login	POST	Login user

/api/users/:id	GET	Get user profile

/api/users/:id	PUT	Update user

/api/users/:id	DELETE	Delete user

/api/applications	POST	Submit application

/api/applications/:id	PUT	Update application

/api/applications/:id	DELETE	Delete application

/api/interview-prep	POST	Save interview notes

/api/interview-prep/:id	PUT	Update interview notes

/api/interview-prep/:id	DELETE	Delete interview prep

/api/search-jobs	GET	External job API integration



## How to Run Locally
Prerequisites

Node.js & npm

MongoDB instance (local or cloud)

## Backend
cd backend/backend

npm install

touch .env

### Add: MONGODB_URI=<your_mongo_uri> and JSEARCH_API_KEY=<your_api_key>

npm start


## Frontend
cd frontend/frontend

npm install

npm run dev

Visit http://localhost:3000 (or as configured)

## Screenshots

### Signup Page
<img width="1469" alt="Screenshot 2025-05-07 at 5 00 36 PM" src="https://github.com/user-attachments/assets/ff126560-c084-4d43-a228-7d7bff20fe82" />

### Login Page
![image](https://github.com/user-attachments/assets/ddf6028c-6d2e-4d3a-ab92-f618eeb04950)

### Jobs Page
![image](https://github.com/user-attachments/assets/39383346-8bcc-4d19-9261-cbad91589fd9)

### Saved Jobs/Favorites Page
![image](https://github.com/user-attachments/assets/9e39043c-2d8e-4093-b71e-a6593e0d8488)

### Interview Prep Page
![image](https://github.com/user-attachments/assets/f891f7fb-b977-4d65-b736-a54c6aa53c26)

### Dashboard
![image](https://github.com/user-attachments/assets/55ff351e-f173-4f83-a7cf-a2a7618aed86)




## Future Improvements
Add pagination to job listings

Enable file uploads (resumes)

Create admin dashboard
