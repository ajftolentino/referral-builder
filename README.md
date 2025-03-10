# Referral Builder

This app is built with a minimal **React + TypeScript** configuration, using **Babel** as the TypeScript to JavaScript transpiler. It leverages **Webpack** for asset bundling, optimization, and code splitting. The app is designed to take advantage of **@reduxjs/toolkit** for action and reducer generation and utilizes **redux-saga** for handling async API calls.

## 🚀 Getting Started

Follow these steps to set up and run the app locally:

### **1. Clone the Repository**

```sh
git clone git@github.com:ajftolentino/referral-builder.git
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

### **6. Install the dependencies**

```sh
npm install
```

### **7. Start the Development Server**

```sh
npm run start
```

### **8. Access the Web App**

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

---

## ℹ️ Post Script

This setup gives you quick access to a running API server on Heroku. However, if you'd like to run your own local API server and integrate it with this frontend app, go to [Referral Builder API](https://github.com/ajftolentino/referral-builder-api) and follow the setup instructions.
