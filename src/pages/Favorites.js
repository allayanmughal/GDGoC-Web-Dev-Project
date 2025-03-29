import React, { useEffect, useState } from "react";

function Favorites() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteBooks(storedFavorites);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to body and save preference
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const removeFromFavorites = (bookId) => {
    const updatedFavorites = favoriteBooks.filter((book) => book.id !== bookId);
    setFavoriteBooks(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Styles with dark mode variants
  const containerStyle = {
    maxWidth: "1200px",
    margin: "80px auto 20px",
    padding: "20px",
    background: darkMode ? "#1e293b" : "white",
    color: darkMode ? "#e2e8f0" : "#1e293b",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    textAlign: "center",
    transition: "background 0.3s ease, color 0.3s ease",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  };

  const cardStyle = {
    background: darkMode ? "#334155" : "#f8fafc",
    color: darkMode ? "#e2e8f0" : "#1e293b",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out, background 0.3s ease, color 0.3s ease",
    textAlign: "center",
  };

  const imgStyle = {
    width: "120px",
    height: "180px",
    objectFit: "cover",
    borderRadius: "5px",
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "10px",
    color: darkMode ? "#93c5fd" : "#1e3a8a",
  };

  const authorStyle = {
    fontSize: "14px",
    color: darkMode ? "#9ca3af" : "#4b5563",
    marginTop: "5px",
  };

  const removeButtonStyle = {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: darkMode ? "#991b1b" : "#dc2626",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s ease",
  };

  const toggleButtonStyle = {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "8px 12px",
    backgroundColor: darkMode ? "#4b5563" : "#e2e8f0",
    color: darkMode ? "#f8fafc" : "#1e293b",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s ease, color 0.3s ease",
    zIndex: 1000,
  };

  return (
    <div style={containerStyle}>
      <button style={toggleButtonStyle} onClick={toggleDarkMode}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      
      <h1 style={{ fontSize: "24px", fontWeight: "bold", color: darkMode ? "#93c5fd" : "#1e3a8a" }}>
        Favorite Books
      </h1>

      {favoriteBooks.length === 0 ? (
        <p style={{ marginTop: "20px", color: darkMode ? "#9ca3af" : "#4b5563" }}>
          No favorite books added yet.
        </p>
      ) : (
        <div style={gridStyle}>
          {favoriteBooks.map((book) => (
            <div key={book.id} style={cardStyle}>
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
                alt={book.volumeInfo.title}
                style={imgStyle}
              />
              <h2 style={titleStyle}>{book.volumeInfo.title}</h2>
              <p style={authorStyle}>
                {book.volumeInfo.authors
                  ? book.volumeInfo.authors.join(", ")
                  : "Unknown Author"}
              </p>
              <button
                style={removeButtonStyle}
                onClick={() => removeFromFavorites(book.id)}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;