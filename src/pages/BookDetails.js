import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookDetails() {
  const { id } = useParams(); // Get book ID from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        setBook(response.data);
      } catch (err) {
        setError("Book not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      {book ? (
        <>
          <h1 className="text-2xl font-bold">{book.volumeInfo.title}</h1>
          <p className="text-gray-700 mt-2">
            Author: {book.volumeInfo.authors?.join(", ") || "Unknown"}
          </p>
          <img
            src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
            alt={book.volumeInfo.title}
            className="mt-4 w-48 h-auto"
          />
          <p className="mt-4 text-gray-600">{book.volumeInfo.description || "No description available."}</p>
          {book.volumeInfo.infoLink && (
            <a
              href={book.volumeInfo.infoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-blue-500 underline"
            >
              View on Google Books
            </a>
          )}
        </>
      ) : (
        <p className="text-center text-red-500">Book details not available.</p>
      )}
    </div>
  );
}

export default BookDetails;
