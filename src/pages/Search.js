import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [searchHistory, setSearchHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Load search history and favorites from localStorage on component mount
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(history);
    
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

  // Update suggestions when query changes
  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchHistory.filter(term =>
        term.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, searchHistory]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      setBooks(response.data.items || []);
      
      // Update search history
      const updatedHistory = [
        query,
        ...searchHistory.filter(term => term.toLowerCase() !== query.toLowerCase())
      ].slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    } catch (err) {
      setError("Failed to fetch books.");
    } finally {
      setLoading(false);
      setShowSuggestions(false);
    }
  };

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

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
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

  const searchBarStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
    position: "relative",
  };

  const inputStyle = {
    padding: "10px",
    width: "300px",
    border: `1px solid ${darkMode ? "#475569" : "#d1d5db"}`,
    borderRadius: "5px",
    backgroundColor: darkMode ? "#334155" : "white",
    color: darkMode ? "#f8fafc" : "#1e293b",
  };

  const buttonStyle = {
    backgroundColor: darkMode ? "#3b82f6" : "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease",
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
    backgroundColor: favoriteIds.has(books.id) ? "#10b981" : "#f59e0b",
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

  const suggestionsStyle = {
    position: "absolute",
    top: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "300px",
    backgroundColor: darkMode ? "#334155" : "white",
    border: `1px solid ${darkMode ? "#475569" : "#d1d5db"}`,
    borderRadius: "5px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 100,
    marginTop: "5px",
    maxHeight: "200px",
    overflowY: "auto",
  };

  const suggestionItemStyle = {
    padding: "10px",
    cursor: "pointer",
    textAlign: "left",
    borderBottom: `1px solid ${darkMode ? "#475569" : "#e5e7eb"}`,
    color: darkMode ? "#f8fafc" : "#1e293b",
    backgroundColor: darkMode ? "#334155" : "white",
    transition: "background 0.2s",
  };


  const historyContainerStyle = {
    margin: "20px 0",
    padding: "10px",
    background: darkMode ? "#334155" : "#f1f5f9",
    borderRadius: "5px",
  };

  const historyTitleStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: darkMode ? "#93c5fd" : "#1e3a8a",
  };

  const historyItemStyle = {
    display: "inline-block",
    margin: "5px",
    padding: "5px 10px",
    background: darkMode ? "#475569" : "#e2e8f0",
    borderRadius: "15px",
    cursor: "pointer",
    fontSize: "14px",
  };

  return (
    <div style={containerStyle}>
      <button onClick={toggleDarkMode} style={darkModeToggleStyle}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1 style={{ fontSize: "24px", fontWeight: "bold", color: darkMode ? "#93c5fd" : "#1e3a8a" }}>
        Search Books
      </h1>

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div style={historyContainerStyle}>
          <div style={historyTitleStyle}>Recent Searches:</div>
          {searchHistory.map((term, index) => (
            <div 
              key={index} 
              style={historyItemStyle}
              onClick={() => {
                setQuery(term);
                setShowSuggestions(false);
              }}
            >
              {term}
            </div>
          ))}
        </div>
      )}

      {/* Search Bar */}
      <form onSubmit={handleSearch} style={searchBarStyle}>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Enter book title..."
            style={inputStyle}
          />
          {showSuggestions && suggestions.length > 0 && (
            <div style={suggestionsStyle}>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  style={suggestionItemStyle}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = darkMode ? "#475569" : "#f3f4f6"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = darkMode ? "#334155" : "white"}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit" style={buttonStyle}>Search</button>
      </form>

      {/* Loading & Error Messages */}
      {loading && <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center", color: "#ef4444", marginTop: "20px" }}>{error}</p>}

      {/* Book Results */}
      <div style={gridStyle}>
        {books.map((book) => (
          <div key={book.id} style={cardStyle}>
            <img
              src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
              alt={book.volumeInfo.title}
              style={imgStyle}
            />
            <h2 style={titleStyle}>{book.volumeInfo.title}</h2>
            <p style={authorStyle}>
              {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author"}
            </p>
            
            {/* Book Rating */}
            {getStarRating(book.volumeInfo.averageRating)}
            
            {/* View Details Link */}
            <Link to={`/book/${book.id}`} style={linkStyle}>
              View Details
            </Link>
            
            {/* Preview Link */}
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
            
            {/* Add to Favorites Button */}
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
}

export default Search;