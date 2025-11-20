# Lord of the Mysteries (LOTM) Explorer

> **🚀 Live Demo:** [https://sitolotm.onrender.com](https://sitolotm.onrender.com)

A comprehensive Single Page Application (SPA) designed to explore the intricate world of **Lord of the Mysteries**. This project leverages a modern tech stack to provide a rich, interactive experience for fans, featuring detailed lore, character dossiers, and community discussions.

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | Vue 3, Vite, Vue Router | Reactive UI, State Management (Composition API), Routing |
| **Styling** | Bootstrap 5, LESS, CSS3 | Responsive Design, Custom Theming |
| **Backend** | Node.js, Express.js | RESTful API, Static File Serving |
| **Database** | MongoDB Atlas (Mongoose) | Data Persistence (Users, Threads, Lore) |
| **Security** | JWT, Bcrypt, Helmet, CORS | Authentication, Password Hashing, API Security |

## 📂 Project Structure

The project follows a monolithic structure where the backend serves the frontend static files in production.

```
sito/
└── backend/                 # Root of the application
    ├── src/
    │   ├── config/          # Database & Env configuration
    │   ├── controllers/     # API Logic (Auth, Threads, etc.)
    │   ├── models/          # Mongoose Schemas
    │   ├── routes/          # API Endpoints
    │   └── server.js        # Entry point
    └── frontend/            # Vue 3 Source Code
        ├── src/
        │   ├── components/  # Reusable Vue Components
        │   ├── services/    # Axios API Client
        │   ├── stores/      # Pinia Auth Store
        │   └── views/       # Main Pages (Home, Paths, etc.)
        └── dist/            # Compiled Production Build
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB Atlas** account (or local MongoDB instance)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/FrancescoFalcon/Sito.git
   cd Sito/backend
   ```

2. **Install Dependencies**
   ```bash
   # Install backend dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   ```

3. **Configuration**
   - Create a `.env` file in the `backend` folder based on `.env.example`.
   - Add your **MongoDB Connection String** and **JWT Secret**.

   ```env
   PORT=10000
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster...
   JWT_SECRET=your_secure_secret_key
   NODE_ENV=development
   ```

### Running the Application

#### Option A: Development Mode (Recommended for coding)
Run backend and frontend separately to enable Hot Module Replacement (HMR).

1. **Start Backend:**
   ```bash
   # In /backend
   npm run dev
   ```
2. **Start Frontend:**
   ```bash
   # In /backend/frontend
   npm run dev
   ```
   Access the site at `http://localhost:5173`.

#### Option B: Production Mode (Simulate deployment)
Build the frontend and let the backend serve it.

1. **Build Frontend:**
   ```bash
   # In /backend/frontend
   npm run build
   ```
2. **Start Server:**
   ```bash
   # In /backend
   npm start
   ```
   Access the site at `http://localhost:10000`.

## ✨ Key Features

- **📖 Beyonder Paths**: Interactive grid of the 22 divine pathways, featuring detailed sequence pyramids and domain information.
- **👥 Character Dossiers**: Comprehensive profiles for Tarot Club members, Gods, and key figures, complete with dynamic description panels.
- **💬 Community Hub**: A fully functional forum system where users can:
  - **Register & Login** (Secure JWT Authentication).
  - **Create Threads** to discuss theories and lore.
  - **Reply** to discussions.
  - **React** (Like/Dislike) to threads and comments.
- **🎨 Immersive UI**: Custom "Dark Fantasy" theme with dynamic backgrounds that change based on the section (Home, Paths, Characters).

## 🛡️ Security & Best Practices

- **No "Fake DB"**: The project runs exclusively on a real MongoDB database.
- **Clean Architecture**: Separation of concerns between Controllers, Services, and Views.
- **Code Quality**: Linting with ESLint (Standard Style) to ensure code consistency.
- **Secure Auth**: Passwords are never stored in plain text (bcrypt) and sessions are managed via stateless JWTs.

## 📜 License

Educational project inspired by *Lord of the Mysteries* by Cuttlefish That Loves Diving.
Created for academic purposes.
