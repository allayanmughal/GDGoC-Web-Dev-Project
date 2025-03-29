import React from "react";
import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <div
      style={{
        background: "#f8fafc",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease-in-out",
        textAlign: "center",
      }}
    >
      <img
        src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
        alt={book.volumeInfo.title}
        style={{
          width: "120px",
          height: "180px",
          objectFit: "cover",
          borderRadius: "5px",
        }}
      />
      <h2
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          marginTop: "10px",
          color: "#1e3a8a",
        }}
      >
        {book.volumeInfo.title}
      </h2>
      <p
        style={{
          fontSize: "14px",
          color: "#4b5563",
          marginTop: "5px",
        }}
      >
        {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author"}
      </p>
      <Link
        to={`/book/${book.id}`}
        style={{
          display: "inline-block",
          marginTop: "10px",
          padding: "8px 12px",
          backgroundColor: "#2563eb",
          color: "white",
          borderRadius: "5px",
          textDecoration: "none",
          transition: "background 0.3s ease",
        }}
      >
        View Details
      </Link>
    </div>
  );
}

export default BookCard;
