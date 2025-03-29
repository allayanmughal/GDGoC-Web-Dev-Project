import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [darkMode, setDarkMode] = useState(false);

  // Load favorites and dark mode preference from localStorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoriteIdsSet = new Set(favorites.map(fav => fav.id));
    setFavoriteIds(favoriteIdsSet);
    
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const fetchBooks = async (query, setBooks) => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}`
        );
        setBooks(response.data.items || []);
      } catch (err) {
        setError("Failed to fetch books.");
      }
    };

    fetchBooks("bestsellers", setBooks);
    fetchBooks("new releases", setNewReleases);
    fetchBooks("top rated", setTopRated);
    fetchBooks("recommended books", setRecommended);
    setLoading(false);
  }, []);

  const addToFavorites = (book) => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorite = storedFavorites.some((fav) => fav.id === book.id);

    if (!isAlreadyFavorite) {
      const updatedFavorites = [...storedFavorites, book];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      setFavoriteIds((prev) => new Set([...prev, book.id]));
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getStarRating = (averageRating) => {
    if (!averageRating) return null;
    
    const stars = [];
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`}>★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half">½</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`}>☆</span>);
    }
    
    return (
      <div style={{ margin: "5px 0", color: "#f59e0b" }}>
        {stars} ({averageRating.toFixed(1)})
      </div>
    );
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "80px auto 20px",
    padding: "20px",
    background: darkMode ? "#1e293b" : "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    textAlign: "center",
    color: darkMode ? "#f8fafc" : "#1e293b",
    transition: "all 0.3s ease",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  };

  const cardStyle = {
    background: darkMode ? "#334155" : "#f8fafc",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out",
    textAlign: "center",
    color: darkMode ? "#f8fafc" : "#1e293b",
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
    color: darkMode ? "#cbd5e1" : "#4b5563",
    marginTop: "5px",
  };

  const linkStyle = {
    display: "inline-block",
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: darkMode ? "#3b82f6" : "#2563eb",
    color: "white",
    borderRadius: "5px",
    textDecoration: "none",
    transition: "background 0.3s ease",
  };

  const favoriteButtonStyle = {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#f59e0b",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s ease",
  };

  const darkModeToggleStyle = {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "8px 12px",
    backgroundColor: darkMode ? "#4b5563" : "#1e293b",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    zIndex: 1000,
  };

  const renderBookSection = (title, books) => (
    <div style={containerStyle}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", color: darkMode ? "#93c5fd" : "#1e3a8a" }}>
        {title}
      </h1>
      <div style={gridStyle}>
        {books.map((book) => (
          <div key={book.id} style={cardStyle}>
            <img
              src={
                book.volumeInfo.imageLinks?.thumbnail ||
                "https://via.placeholder.com/150"
              }
              alt={book.volumeInfo.title}
              style={imgStyle}
            />
            <h2 style={titleStyle}>{book.volumeInfo.title}</h2>
            <p style={authorStyle}>
              {book.volumeInfo.authors
                ? book.volumeInfo.authors.join(", ")
                : "Unknown Author"}
            </p>
            
            {getStarRating(book.volumeInfo.averageRating)}
            
            <Link to={`/book/${book.id}`} style={linkStyle}>
              View Details
            </Link>
            
            {book.volumeInfo.previewLink && (
              <a
                href={book.volumeInfo.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...linkStyle,
                  backgroundColor: darkMode ? "#10b981" : "#059669",
                  marginLeft: "10px",
                }}
              >
                Preview Book
              </a>
            )}
            
            <button
              style={{
                ...favoriteButtonStyle,
                backgroundColor: favoriteIds.has(book.id) ? "#10b981" : "#f59e0b",
              }}
              onClick={() => addToFavorites(book)}
            >
              {favoriteIds.has(book.id) ? "✔ Added" : "⭐ Add to Favorites"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "20px", color: darkMode ? "#f8fafc" : "#1e293b" }}>Loading...</p>;
  if (error)
    return (
      <p style={{ textAlign: "center", color: "#ef4444", marginTop: "20px" }}>
        {error}
      </p>
    );

  return (
    <>
      <button onClick={toggleDarkMode} style={darkModeToggleStyle}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      
      {renderBookSection("Trending Books", books)}
      {renderBookSection("New Releases", newReleases)}
      {renderBookSection("Top Rated", topRated)}
      {renderBookSection("Recommended Books", recommended)}
    </>
  );
}

export default Home;