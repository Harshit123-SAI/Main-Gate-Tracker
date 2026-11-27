# GateTrack – Main Gate Visitor Management System

<p align="center">
  <strong>A modern, responsive frontend-based visitor management system for tracking visitor entries and exits.</strong>
</p>

<p align="center">
  <a href="https://main-gate-tracker-plxw.onrender.com">Live Demo</a> •
  <a href="https://github.com/Harshit123-SAI/Main-Gate-Tracker">GitHub Repository</a>
</p>

---

## Overview

GateTrack is a web-based Main Gate Visitor Management System designed to simplify and digitize visitor registration, entry tracking, exit management, and record monitoring. It provides a centralized dashboard where visitor activities can be managed efficiently through a clean and user-friendly interface.

The application includes role-based demo login functionality for Administrators and Students, visitor record management, search and filtering, data export, and persistent data storage using LocalStorage.

## Features

- **Demo Login System** – Separate login access for Admin and Student roles.
- **Dashboard** – Overview of visitor statistics and gate activity.
- **Visitor Registration** – Register visitors with details such as name, phone number, purpose, organization, and person to meet.
- **Entry & Exit Tracking** – Track visitor entry and exit statuses.
- **Visitor Records** – View and manage visitor records.
- **Search Functionality** – Search visitor records using available visitor details.
- **Date Filtering** – Filter visitor records based on dates.
- **Sorting** – Organize visitor records for easier viewing.
- **CSV Export** – Export visitor data for record keeping.
- **Role-Based UI Restrictions** – Admin-only management actions in the demo interface.
- **Delete Records** – Remove visitor entries.
- **Logout** – Logout from the current demo session.
- **LocalStorage Persistence** – Preserve visitor records in the browser.
- **Responsive UI** – Interface designed to adapt to different screen sizes.
- **Toast Notifications** – Feedback for user interactions.

## Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Building the user interface |
| JavaScript | Application logic |
| HTML5 | Structure |
| CSS3 | Styling and responsive design |
| Vite | Development server and build tool |
| LocalStorage | Client-side data persistence |
| Git & GitHub | Version control |
| Render | Deployment |

## Demo Credentials

### Administrator

| Field | Credential |
|---|---|
| Username | `admin` |
| Password | `admin123` |

<details>
<summary>Student Demo Credentials</summary>

| Field | Credential |
|---|---|
| Username | `student` |
| Password | `student123` |

</details>

> **Note:** These are demonstration credentials implemented on the frontend. This project does not use server-side authentication. The role restrictions are UI-level only and are not suitable for securing sensitive data in a production environment.

## Project Structure

```text
Main-Gate-Tracker/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── DashboardStats.jsx
│   │   ├── Header.jsx
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   ├── StatsCard.jsx
│   │   ├── Toast.jsx
│   │   ├── VisitorForm.jsx
│   │   ├── VisitorSearch.jsx
│   │   ├── VisitorTable.jsx
│   │   └── sidebar.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Harshit123-SAI/Main-Gate-Tracker.git
```

### 2. Navigate to the project folder

```bash
cd Main-Gate-Tracker
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Open the application

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173
```

## Production Build

To generate the production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Application Workflow

1. User opens the GateTrack application.
2. User logs in using the demo credentials.
3. The dashboard displays visitor-related statistics.
4. Administrator registers new visitors.
5. Visitor records are displayed in the records table.
6. Administrator manages entry and exit status.
7. Records can be searched, filtered, sorted and exported.
8. The user logs out from the application.

## Data Storage

GateTrack currently uses browser LocalStorage to store visitor records.

- Data is saved within the browser.
- Visitor records persist across browser refreshes on the same browser.
- Data is not stored in a centralized database.
- Records are not automatically synchronized across different devices or browsers.

## Limitations

- Frontend-only implementation.
- No backend server or database.
- Demo login credentials are not secure authentication.
- LocalStorage data is browser-specific.
- No real-time synchronization between users.

## Future Enhancements

- Backend integration using Node.js and Express.
- Database integration using MongoDB.
- Secure authentication and authorization.
- QR-based visitor identification.
- Visitor pass generation.
- Real-time entry and exit updates.
- Email notifications for visitor arrivals.
- Admin analytics and reporting.
- Cloud-based centralized data storage.

## Deployment

The application is deployed using Render.

**Live Application:**  
https://main-gate-tracker-plxw.onrender.com

## Author

**Harshit Saini**/////
**Murli Rathi**

Computer Science Engineering – Artificial Intelligence & Machine Learning

GitHub: https://github.com/Harshit123-SAI

---

<p align="center">
  <strong>GateTrack – Smarter Visitor Management, Simplified.</strong>
</p>
