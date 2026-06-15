# Freelancer Project Bidding Platform

## 🚀 Project Overview

This is a comprehensive Freelancer Project Bidding Platform built with:

- **Frontend:** React, Next.js, TypeScript, Tailwind CSS, Shadcn/UI
- **Backend:** Python, FastAPI, MongoDB
- **Real-time:** Socket.io
- **Authentication:** JWT + bcrypt

## 🎯 Business Logic

### 1. User Authentication & Authorization

- **Registration:** Users can sign up as either `FREELANCER` or `CLIENT`
- **Role-based Access Control (RBAC):**
  - **Freelancers:** Can view projects, place bids, update portfolio, upload documents
  - **Clients:** Can post projects, view freelancers, accept bids, manage payments
- **Secure Login:** JWT tokens with 24-hour expiration + refresh token mechanism

### 2. Project Management

#### For Clients

- Post new projects with:
  - Title, description, category
  - Budget range (min/max), duration
  - Required skills
  - Files (images, PDFs)
  - Visibility settings (public/private)
- Edit, pause, or close projects
- View all freelancers who have bid on their projects

#### For Freelancers

- Browse and filter projects by category, budget, skills
- View project details including client budget and requirements
- Search for projects using keywords
- Mark projects as favorites

### 3. Bidding System

#### Bid Placement

- Freelancers can place bids on projects they're interested in
- Bid includes:
  - Proposed amount (within client's budget range)
  - Estimated duration
  - Custom message/proposal
  - Attachments (optional)
- Real-time notifications to clients when new bids are placed

#### Bid Management

- Clients can view all bids on their projects
- View freelancer profiles and portfolios
- Accept/reject bids
- Send messages to freelancers after accepting a bid

### 4. Chat & Communication

- Real-time messaging between clients and freelancers
- Message history saved in MongoDB
- Socket.io for instant message delivery

### 5. User Profiles

#### Freelancer Profile

- Personal information (name, email, location)
- Professional details (title, bio)
- Skills (tag-based selection)
- Portfolio items (name, link, description)
- Document uploads (resume, certificates)
- Rating and review system (1-5 stars)
- Verified status (boolean)

#### Client Profile

- Name, email, company name
- Company description
- Verification status
- Past projects

### 6. File Management

- Secure file uploads (projects, bids, profiles)
- File deletion support
- Automatic file cleanup when projects/bids are deleted
- Storage on server file system

### 7. Search & Discovery

- Project search by title and description
- Filters by:
  - Category
  - Budget range
  - Duration
  - Required skills

## 💻 Technical Implementation

### Frontend Architecture

- **Next.js App Router:** Server components and client components
- **State Management:** React hooks (useState, useEffect, useRef)
- **Styling:** Tailwind CSS with custom theme
- **UI Components:** Shadcn/UI components with proper accessibility
- **Form Handling:** React Hook Form with Zod validation
- **HTTP Client:** Axios with interceptors
- **Real-time:** Socket.io client
- **Token Management:** localStorage + secure storage patterns

### Backend Architecture

- **FastAPI Framework:** Asynchronous request handling
- **Database:** MongoDB with ODM (Object Document Mapper)
- **Authentication:** JWT + bcrypt for password hashing
- **File Storage:** Server file system with proper validation
- **Real-time:** Socket.io server integration
- **Validation:** Pydantic models
- **Environment Variables:** python-dotenv for configuration

### Security Features

- Password hashing with bcrypt (12 salt rounds)
- JWT with 24-hour expiration and refresh tokens
- Role-based access control middleware
- File type and size validation
- HTTPS enforcement (production)
- CORS configuration

## 📂 Project Structure

### Frontend Structure

```text
freelancer-platform/
├── app/
│   ├── (auth)/           # Authentication pages
│   ├── (dashboard)/      # Authenticated dashboard routes
│   ├── api/              # Next.js API routes
│   └── ...
├── components/
│   ├── ui/               # Shadcn/UI components
│   └── custom/           # Custom components
├── lib/
│   ├── axios.ts          # API client
│   ├── socket.ts         # Socket.io client
│   └── utils.ts          # Utility functions
├── store/                # React context/state
└── types/
    └── index.ts          # TypeScript types
```

### Backend Structure

```text
backend/
├── api/
│   ├── v1/
│   │   ├── auth/         # Authentication endpoints
│   │   ├── projects/     # Project endpoints
│   │   ├── bids/         # Bidding endpoints
│   │   ├── messages/     # Chat endpoints
│   │   └── users/        # User profile endpoints
│   ├── dependencies.py
│   └── router.py
├── models/
│   ├── user.py
│   ├── project.py
│   ├── bid.py
│   └── message.py
├── services/
│   ├── auth.py
│   ├── project.py
│   └── ...
├── schemas/
│   └── ...
├── socket.py             # Socket.io server
├── config.py             # Configuration
├── database.py           # Database connection
└── main.py               # FastAPI entry point
```

## 🧪 API Endpoints

### Authentication

| Method | Endpoint                | Description                           |
| ------ | ----------------------- | ------------------------------------- |
| `POST` | `/api/v1/auth/register` | Register new user (freelancer/client) |
| `POST` | `/api/v1/auth/login`    | User login - returns JWT tokens       |
| `POST` | `/api/v1/auth/refresh`  | Refresh expired access token          |
| `POST` | `/api/v1/auth/logout`   | Logout user                           |
| `GET`  | `/api/v1/auth/me`       | Get current user profile              |

### Projects

| Method   | Endpoint                                | Description                           |
| -------- | --------------------------------------- | ------------------------------------- |
| `POST`   | `/api/v1/projects`                      | Create new project (client)           |
| `GET`    | `/api/v1/projects`                      | List all public projects with filters |
| `GET`    | `/api/v1/projects/{id}`                 | Get project details                   |
| `PUT`    | `/api/v1/projects/{id}`                 | Update project (client)               |
| `DELETE` | `/api/v1/projects/{id}`                 | Delete project (client)               |
| `POST`   | `/api/v1/projects/{id}/upload`          | Upload files to project               |
| `GET`    | `/api/v1/projects/{id}/bids`            | List all bids for project             |
| `POST`   | `/api/v1/projects/{id}/favorites`       | Toggle favorite                       |
| `GET`    | `/api/v1/projects/{id}/favorites/count` | Get favorite count                    |

### Bids

| Method   | Endpoint                                  | Description          |
| -------- | ----------------------------------------- | -------------------- |
| `POST`   | `/api/v1/bids`                            | Place bid on project |
| `GET`    | `/api/v1/bids`                            | List user's bids     |
| `GET`    | `/api/v1/bids/{id}`                       | Get bid details      |
| `PUT`    | `/api/v1/bids/{id}`                       | Update bid           |
| `DELETE` | `/api/v1/bids/{id}`                       | Delete bid           |
| `GET`    | `/api/v1/bids/{id}/attachments`           | List attachments     |
| `GET`    | `/api/v1/bids/{id}/attachments/{file_id}` | Download attachment  |
| `POST`   | `/api/v1/bids/{id}/accept`                | Accept bid (client)  |
| `POST`   | `/api/v1/bids/{id}/reject`                | Reject bid (client)  |

### Messages

| Method | Endpoint                | Description          |
| ------ | ----------------------- | -------------------- |
| `POST` | `/api/v1/messages`      | Send message         |
| `GET`  | `/api/v1/messages`      | List user's messages |
| `GET`  | `/api/v1/messages/{id}` | Get message details  |
