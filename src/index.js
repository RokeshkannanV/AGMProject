/* eslint-disable */
import React from "react";
// import ReactDOM from "react-dom/client";
import ReactDOM from 'react-dom';

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import {initializeApp} from "firebase/app"; // Import Firebase core module
import { createRoot } from 'react-dom/client';
// Initialize Firebase with your configuration
const firebaseConfig = {
  // Your Firebase config object
  apiKey: "AIzaSyDpKf7LcVyz8uPbhHzojfVq7WmbSE_Xkts",
  authDomain: "firstagm-b0094.firebaseapp.com",
  projectId: "firstagm-b0094",
  storageBucket: "firstagm-b0094.appspot.com",
  messagingSenderId: "37339568694",
  appId: "1:37339568694:web:746209597a08606ea8d697",
  measurementId: "G-NT1Z9B5XHZ",
};

initializeApp(firebaseConfig); // Initialize Firebase

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
