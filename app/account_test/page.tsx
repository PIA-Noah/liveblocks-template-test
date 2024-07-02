"use client";

// pages/login.tsx
import React from "react";

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    // Replace with your Django backend URL
    const djangoAuthUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
    window.location.href = djangoAuthUrl;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button
        onClick={handleLogin}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Login with Django Allauth
      </button>
    </div>
  );
};

export default LoginPage;
