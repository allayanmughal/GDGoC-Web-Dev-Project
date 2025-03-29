import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import BookDetails from "./pages/BookDetails";

function App() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <Navbar />

        {/* Show offline message if the user is disconnected */}
        {!isOnline && (
          <div className="text-center bg-red-500 text-white py-2">
            ⚠️ You are offline. Some features may not work.
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-5xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// 404 Page Component
const NotFound = () => (
  <div className="text-center mt-10">
    <h2 className="text-2xl font-bold text-red-500">404 - Page Not Found</h2>
    <p className="text-gray-700 mt-2">Sorry, the page you're looking for doesn't exist.</p>
  </div>
);

export default App;
