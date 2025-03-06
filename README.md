# Referral Builder

This app is built with a minimal **React + TypeScript** configuration, using **Babel** as the TypeScript to JavaScript transpiler. It leverages **Webpack** for asset bundling, optimization, and code splitting. The app is designed to take advantage of **@reduxjs/toolkit** for action and reducer generation and utilizes **redux-saga** for handling async API calls.

## 🚀 Getting Started

Follow these steps to set up and run the app locally:

### **1. Clone or Fork the Repository**

```sh
git clone <repo-url>
```

### **2. Navigate to the Project Directory**

```sh
cd referral-builder
```

### **3. Create an `.env` File**

Inside the project root, create a new `.env` file:

```sh
touch .env
```

### **4. Copy Environment Variables**

Copy the contents of `.env.example` into `.env` and configure it as needed.

### **5. Set the API URL**

Assign the following value to the `API_URL` variable in the `.env` file:

```sh
API_URL=https://referral-builder-api-1d1d57f1a7a7.herokuapp.com/
```

**(Make sure to include the `/` at the end.)**

### **6. Start the Development Server**

```sh
npm run start
```

### **7. Access the Web App**

Open your browser and go to:

```
http://localhost:3001
```

This will load the application in your browser.

---

## 📜 License

This project is licensed under the **MIT License**.

---

For any issues, feel free to open a ticket or reach out to the maintainers. 🚀
