# ADRDE Agra - MAC Meeting Agenda Dashboard

A professional, enterprise-grade internal dashboard developed for ADRDE (DRDO). This system handles meeting agenda management, document workflows, letter dispatches, inventory tracking, and reporting. 

## Tech Stack
* **Frontend:** React (Vite), Tailwind CSS v4, Recharts, Lucide Icons
* **Backend:** Node.js, Express.js, Socket.IO, Multer
* **Database:** MongoDB Atlas (Mongoose)
* **Auth:** JSON Web Tokens (JWT), bcrypt

## Features
* **Enterprise Dashboard:** Real-time analytics, status metrics, and timeline charts.
* **Meeting & Agenda Workflows:** Create, schedule, and track meeting workflows.
* **Document Repository:** Secure Multer-based file uploads (PDF, DOCX, XLSX).
* **Inventory Tracking:** Real-time asset counts and low-stock alerts.
* **Dispatch/Letters:** Manage Incoming, Outgoing, and Drafted mail communications.
* **Automated Reports:** Generate summary PDFs dynamically.

## Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas cluster (with your IP whitelisted in Network Access)

### 2. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your environment variables in `backend/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster0...
   JWT_SECRET=adrde_super_secret_jwt_key
   ```
4. Start the backend:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a separate terminal in the root folder (`ADRDE_AY`):
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```

### 4. Admin Credentials
Use the pre-seeded admin account to log in:
* **Email:** `abhijeet@adrde.gov.in`
* **Password:** `password123`

## Deployment Guidelines
- **Frontend (Vercel/Netlify):** Run `npm run build` to generate static files.
- **Backend (Render/Heroku):** Deploy the `backend/` folder and attach standard environment variables.
- Ensure the `api.js` base URL points to your deployed backend domain in production.
