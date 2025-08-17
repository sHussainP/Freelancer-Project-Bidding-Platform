# Freelancer Project Bidding Platform  

A full-featured **marketplace for freelancers and clients** where jobs can be posted, bids submitted, and projects managed via integrated **chat, milestone tracking, payment status, and review systems**.  
This platform encourages **transparency, accountability, and smooth collaboration** between clients and freelancers.  

---

## Features  

### User Management  
- User Registration & Authentication (Clients & Freelancers)  
- Login / Logout  
- Profile Management (View & Edit)  

### Project Management (Clients)  
- Post New Projects  
- View & Manage Posted Projects  
- Edit / Delete Projects  
- Accept Bids  

### Bidding System (Freelancers)  
- Browse Available Projects  
- Submit Bids  
- Track Bid Status  

### Communication & Collaboration  
- Integrated Real-Time Chat  
- Milestone Tracking  

### Rating & Review System  
- Leave Reviews (Clients → Freelancers)  
- View Reviews  

### Payment & Withdrawal  
- Make Payments  
- Track Earnings (Freelancers)  
- Withdraw Funds  

---

## System Architecture  

The platform is structured into **Frontend, Backend, and Database** components with service-based modularity.  

- **Frontend**: React.js  
- **Backend**: Node.js + Express  
- **Database**: MongoDB  
- **CI/CD Pipeline**: AWS (EC2 Instance)  

---

## Current Project Structure

```
Freelancer-Project-Bidding-Platform
├─ backend
│  ├─ config
│  │  └─ db.js
│  ├─ controllers
│  │  └─ (authController.js)depreciated.example
│  ├─ middleware
│  │  └─ authMiddleware.js
│  ├─ models
│  │  ├─ Bid.js
│  │  ├─ Project.js
│  │  └─ User.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ routes
│  │  ├─ (authRoutes.js)depreciated.example
│  │  └─ api
│  │     ├─ projects.js
│  │     └─ users.js
│  └─ server.js
├─ frontend
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  ├─ logo192.png
│  │  ├─ logo512.png
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  ├─ README.md
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.js
│  │  ├─ App.test.js
│  │  ├─ axiosConfig.jsx
│  │  ├─ components
│  │  │  ├─ Auth
│  │  │  │  ├─ Login.jsx
│  │  │  │  └─ Register.jsx
│  │  │  ├─ ClientDashboard.jsx
│  │  │  ├─ FreelancerDashboard.jsx
│  │  │  ├─ PrivateRoute.jsx
│  │  │  └─ ProjectList.jsx
│  │  ├─ context
│  │  │  └─ AuthContext.js
│  │  ├─ index.css
│  │  ├─ index.js
│  │  ├─ logo.svg
│  │  ├─ pages
│  │  │  └─ Profile.jsx
│  │  ├─ reportWebVitals.js
│  │  └─ setupTests.js
│  └─ tailwind.config.js
├─ package-lock.json
├─ package.json
└─ README.md
```

---

## Techincal Stack Info

- **Frontend**: React.js  
- **Backend**: Node.js + Express  
- **Database**: MongoDB  
- **Cloud Deployment**: AWS (EC2, CI/CD pipeline)  

---

## Getting Started  

### Prerequisites  
- Node.js & npm  
- MongoDB  
- AWS Account (for deployment)  

### Installation  

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/Freelancer-Project-Bidding-Platform.git
   cd Freelancer-Project-Bidding-Platform
   ```

2. Install dependencies:  
   ```bash
   npm run install-all
   ```

3. Start backend server & frontend concurrently:  
   ```bash
   npm start
   ```

---

## License  
This project is licensed under the **MIT License** – feel free to use and modify.  

---

## Useful Links  
- 🌐 [Project Website](http://3.26.96.188:5001)
