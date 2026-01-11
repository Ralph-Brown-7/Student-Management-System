// src/pages/Index.jsx

// REMOVE the BrowserRouter and Routes imports here
const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-primary mb-4">
        Welcome to Student Management System
      </h1>
      <p className="text-gray-600 mb-8">Please login to manage your dashboard.</p>
      <div className="flex gap-4">
        <a href="/login" className="px-6 py-2 bg-blue-600 text-white rounded-md">
          Login
        </a>
        <a href="/register" className="px-6 py-2 border border-gray-300 rounded-md">
          Register
        </a>
      </div>
    </div>
  );
};

export default Index; // Ensure this is a DEFAULT export