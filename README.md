🛒 SwiftCart – E-Commerce Platform
SwiftCart is a full-stack e-commerce web application built using React.js, Firebase, Node.js, Express.js, and MongoDB. It offers a seamless user experience for browsing products, user authentication (including Google login), adding items to a cart, and placing orders — all in a clean and modern UI.

🚀 Features
🔐 User Authentication

Email/password signup & login

Google sign-in via Firebase

JWT-based session management with secure cookies

🛍️ Product Management

View all products

Filter by categories

Detailed product pages

🛒 Cart Functionality

Add/remove items to cart

Quantity management

Save cart to DB per user

👨‍💼 Admin Panel

Admin login with environment-secured credentials

Add/edit/delete products (optional feature)

📦 Checkout Flow

Place orders (logic placeholder)

Order history per user (optional)

🧑‍💻 Tech Stack
Technology	Purpose
React.js	Frontend SPA
Tailwind CSS	UI design
Firebase Auth	Google login
Node.js + Express.js	Backend APIs
MongoDB + Mongoose	Database
Axios	HTTP requests
JWT + Cookies	Auth sessions

📁 Project Structure
arduino
Copy
Edit
e-commerce/
├── backend/
│   ├── controller/
│   ├── routes/
│   ├── model/
│   ├── config/
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── assets/
│   │   └── App.jsx
│   └── public/
└── utils/
    └── Firebase.js
⚙️ Installation Steps
1. Clone the Repo
bash
Copy
Edit
git clone https://github.com/yourusername/swiftcart.git
cd swiftcart
2. Backend Setup
bash
Copy
Edit
cd backend
npm install
# Create a .env file
cp .env.example .env
# Add MongoDB URI and admin credentials in .env

npm run dev
3. Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
npm run dev
🔐 Environment Variables
Backend (backend/.env)
ini
Copy
Edit
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=yourpassword
🔑 Firebase Config (Frontend)
Create a Firebase.js file in /utils/ with your Firebase credentials:

js
Copy
Edit
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
📸 Screenshots
Login Page	Product Page	Cart

✅ TODO (Optional Improvements)
 Add Stripe or Razorpay payment integration

 Add product reviews and ratings

 Implement order placement and tracking

 Improve admin dashboard UI

📜 License
This project is licensed under the MIT License.

🙌 Acknowledgments
Firebase for authentication

MongoDB for flexible NoSQL database

Tailwind CSS for rapid UI styling

Inspired by Flipkart, Amazon UX patterns

Would you like me to create the .env.example file, or generate Markdown badges and deploy instructions too?

