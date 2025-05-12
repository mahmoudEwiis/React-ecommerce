# 🛒 React Ecommerce App

A full-featured e-commerce web application built with React. It provides a seamless shopping experience for users, including authentication, cart and wishlist management, and an admin dashboard for product, category, and user management.

---

## 📌 Description

This project is a modern e-commerce frontend built using React. It allows users to register, log in, browse products, manage favorites and shopping carts, and update their profiles. Admin users have access to an advanced dashboard to manage the entire store content.

---

## 🚀 Features

- 🔐 Authentication (Register/Login)
- 🛍️ Product Listing & Details
- 📦 Add to Cart with Quantity Control
- ❤️ Favorite/Wishlist Functionality
- 👤 User Profile with Avatar Upload
- 🛠️ Admin Dashboard (Products, Categories, Users Management)
- 🔄 Protected Routes for Authenticated Users and Admins
- 🔄 Global error handling with Axios interceptors
- 📸 Image Upload for Products and Avatars
- 🎨 Responsive UI with Bootstrap & Custom Styling
- ⚡ Toast Notifications with `react-hot-toast`
- 🔄 Smooth animations using `framer-motion`

---

## 🧱 Built With

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hot Toast](https://react-hot-toast.com/)
- [Axios](https://axios-http.com/)
- [FontAwesome](https://fontawesome.com/)
- [Context API](https://react.dev/learn/passing-data-deeply-with-context/)

Please leave a ⭐ as motivation if you liked the implementation 😄

---

## 📡 Backend API

This project consumes the [Platzi Fake Store API](https://api.escuelajs.co/), which supports:

- ✅ `/api/v1/auth/login` — Login
- ✅ `/api/v1/users` — User CRUD
- ✅ `/api/v1/products` — Products CRUD
- ✅ `/api/v1/categories` — Categories CRUD
- ✅ `/api/v1/files/upload` — Image Upload

🧪 You can explore the full Swagger documentation here:  
https://api.escuelajs.co/docs/

---

## 🧪 Usage

```bash
# 1. Clone the repository
git clone https://github.com/mahmoudEwiis/React-ecommerce.git
cd React-ecommerce

# 2. create a .env file in the root directory
REACT_APP_API_URL = 

# 3. Install dependencies
npm install

# 4. Run the development server
npm run Start

# App will be available at http://localhost:5173