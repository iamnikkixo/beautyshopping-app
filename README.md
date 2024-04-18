![Beauty Shopping Banner](banner.png)

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" width="50" style="margin-right: 5px;" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" width="50" style="margin-right: 5px;" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg" width="50"  style="margin-right: 5px;"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg" width="50"  />

</p>

<br/>

This project is built with Node.js and uses Express for the backend. MongoDB is utilized as the database.

## 📋 Table of Contents

1. 📖 [Introduction](#introduction)
2. 🛠️ [Tech Stacks](#tech-stacks)
3. ✨ [Features](#features)
4. 🚀 [Quick Start](#quick-start)
5. 📡 [API Endpoints](#api-endpoints)
6. 📚 [Sources](#sources)
   - 🎨 [UX/UI Design](#uxui-design)
   - 📷 [Picture Sources](#picture-sources)
7. 📞 [Contact Information](#contact-information)

## 📖 Introduction

Athena is a mobile beauty shopping application created using React Native, focused on providing a platform for purchasing a variety of beauty products.

## 🛠️ Tech Stacks

This project is built using the following technologies:

- **React Native**
- **React Native Elements**
- **Expo**
- **Express**
- **MongoDB**

## ✨ Features

- **Complete Screens**: Covers Login, Register, Main Product Display, Cart Management, Checkout Process, Detailed Product View, Favorites, Search Functionality, and User Profile with logout option.
- **Redux State Management**: Utilizes Redux for efficient and centralized state management.
- **JWT Authentication**: Uses JWT tokens to ensure secure and reliable authentication
- **Platform Compatibility**: Android and iOS friendly for broad accessibility.
- **Modern Design**: Incorporates modern design elements for a sleek and user-friendly experience.

## 🚀 Quick Start

### Prerequisites

- Node.js installed
- MongoDB installed or accessible remotely
- A mobile device for testing or Android Studio for emulating the app

1. Clone this repository.
2. Install dependencies in the client and server directories using `npm install`.
3. In the client directory, navigate to `assets>shared>baseURL.js` and set the backend URL: `baseURL =`;
4. Create a `.env` file in server directy.
5. Add the following environment variables to the `.env` file:

   Server:

   - `DATABASE_URL=`
   - `SECRET_KEY =`

6. To start the client, navigate to the 'client' directory using `cd client`, then run `npm run android`.
7. Open a seperate terminal and navigate to the 'server' directory by `cd server` and then run `npm run dev`.

## 📡 API Endpoints

### Users

- **Endpoint:** `/api/users`
- **Description:** Manages login & registrations

### Products

- **Endpoint:** `/api/products`
- **Description:** Manages product listings.

### Cart

- **Endpoint:** `/api/cart`
- **Description:** Handles shopping cart CRUD operations.

### Checkout

- **Endpoint:** `/api/checkout`
- **Description:** Manages the checkout process.

### Orders

- **Endpoint:** `/api/orders`
- **Description:** Handles order details and status.

## 🎨 UX/UI Design
Inspired by the following designs:

- [Beauty Product eCommerce App](https://dribbble.com/shots/18352075-Beauty-Product-eCommerce-App)
- [Clarins Skincare Product Sales App](https://dribbble.com/shots/17736978-Clarins-Skincare-Product-Sales-App)

## 📷 Picture Sources

The pictures used in this project are sourced from [Pexels](https://www.pexels.com/) and [Unsplash](https://unsplash.com/), which provide free-to-use images. All images included in this repository are licensed for use in this project.

## 📞 Contact Information

For any questions, feedback, or collaboration opportunities, feel free to reach out!

- **Email:** [My Email Address](mailto:nikkielizatran@gmail.com)
- **GitHub:** [My GitHub Profile](https://github.com/iamnikkixo)
