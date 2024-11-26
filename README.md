# Project Documentation

Project is vite + tailwind css
created custom components and branding

create .env file

```shall
cp .env.example .env
```

This document provides an overview of the project structure, including the purpose of each folder and its contents.

## **Folder Structure**
```
├── assets
├── components
├── contexts
├── hooks
├── middlewares
├── pages
├── providers
├── router
└── utils
```

---

### **1. assets**
This folder contains static assets such as images, fonts, and other media files. These resources are used throughout the project.

### **2. components**
Contains reusable UI components like buttons, forms, modals, etc., that can be used throughout the application to build different views.

### **3. contexts**
Contains context providers that manage global state for things like authentication, themes, or other shared data. For example, the `AuthContext` would handle the login state across the app.

### **4. hooks**
Custom React hooks used to encapsulate reusable logic across the application. These hooks can be used by different components to perform actions such as fetching data or handling form inputs.

### **5. middlewares**
Contains protected files for basic checks 

### **6. pages**
Contains the main views or pages for the application. For example, pages like `Login`, `Register`, `Dashboard`, etc., would be found here. These are rendered based on the routing configuration.

### **7. providers**
Contains wrapper components or providers that pass down necessary props, such as context providers or theme providers, to the rest of the application.

### **8. router**
Contains the routing configuration and all the routes related to navigation within the application. This includes creating the routes, defining protected routes, and setting up the routing logic.

### **9. utils**
Contains utility functions and helpers that can be used throughout the application. These can include things like date formatting functions, API request utilities, or custom validation functions.
