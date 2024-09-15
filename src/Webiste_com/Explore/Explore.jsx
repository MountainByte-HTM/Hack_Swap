import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Explore() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [queue, setQueue] = useState([]);
  const [isQueueVisible, setIsQueueVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal state
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Title,setTitle] = useState(null)
  const [userId1,setUserId] = useState(null)
  const handleChatNavigation = () => {
    navigate('/Chatting'); // Navigate to the ChatPage
  };

  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchBooks = async () => {
      if (!email) {
        setError('User email not found in local storage.');
        setLoading(false);
        return;
      }

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            try {
              const response = await axios.post(
                `https://2ba3-2401-4900-50ab-a2ec-f1dc-b1b5-e703-2f8c.ngrok-free.app/explore`,
                {
                  user_id: email,
                  latitude: latitude,
                  longitude: longitude,
                  radius: 500, // Default radius of 500 meters
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );

              setBooks(response.data);
            } catch (error) {
              console.error('Error fetching books:', error);
              setError('Error fetching books. Please try again later.');
            } finally {
              setLoading(false);
            }
          },
          (error) => {
            setError('Error accessing geolocation: ' + error.message);
            setLoading(false);
          }
        );
      } else {
        setError('Geolocation is not supported by your browser.');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleLibrary = async () => {
    if (!email) {
      console.log("Email is undefined or empty");
      return;
    }
    
    // Toggle the visibility of the modal
    if (isQueueVisible) {
      setIsQueueVisible(false);
      setQueue(null); // Clear the queue when hiding
    } else {
      try {
        const response = await axios.post(
          `https://2ba3-2401-4900-50ab-a2ec-f1dc-b1b5-e703-2f8c.ngrok-free.app/get_user_library`, 
          { user_uuid: email },
          { headers: { 'Content-Type': 'application/json' } }
        );
        
        console.log("Library data:", response.data.library); 
        setQueue(response.data.library);
        setIsQueueVisible(true); // Show the queue
        setIsModalVisible(true); // Show modal
      } catch (error) {
        console.error('Error fetching user library:', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleChange = async (bookTitle) => {
    console.log(bookTitle);
    console.log(Title, userId1, bookTitle); // Debugging line
    try {
      await axios.post('https://2ba3-2401-4900-50ab-a2ec-f1dc-b1b5-e703-2f8c.ngrok-free.app/exchange_books', {
        book_title_1: Title,
        book_title_2:bookTitle ,
        user_id_2: email,
        user_id_1:userId1
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Book exchange request sent successfully!');
    } catch (error) {
      console.error('Error exchanging books:', error);
    }
  };

  const toggleBookSelection = (book) => {
    setSelectedBooks((prevSelectedBooks) =>
      prevSelectedBooks.includes(book)
        ? prevSelectedBooks.filter((b) => b !== book) // Deselect book if already selected
        : [...prevSelectedBooks, book] // Add book to selection
    );
  };

  const handleExchangeSelectedBooks = () => {
    selectedBooks.forEach((book) => {
      handleChange({
        book_title: book.books,
        user_id_1: book.user_id,
      });
    });
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-8">
  <h1 className="text-3xl font-bold text-gray-800 mb-4">Steps:</h1>
  <p className="text-lg text-gray-700 mb-2">
    <span className="font-semibold">1. </span>
    Click on the <span className="text-blue-600 font-semibold">Exchange Book</span> button in front of the book you want to exchange.
  </p>
  <p className="text-lg text-gray-700">
    <span className="font-semibold">2. </span>
    Then finally click on <span className="text-blue-600 font-semibold">Buy Books</span> and select the book you want to exchange with.
  </p>
</div>

      <h1 className="text-4xl font-bold text-gray-800 mb-6">Explore Books</h1>
      {loading ? (
        <p className="text-lg text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-lg text-red-600">{error}</p>
      ) : (
        <div className="space-y-4">
          {books.map((book, index) => (
            <div key={index} className="p-6 border rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-2xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{book.books}</h2>
              <p className="text-gray-600 mb-1"><strong>Shared by:</strong> {book.name}</p>
              <p className="text-gray-600 mb-4"><strong>User ID:</strong> {book.user_id}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setTitle(book.books);
                    setUserId(book.user_id);
                  }}
                  className={`px-4 py-2 rounded-md transition 
                     bg-green-500 hover:bg-green-600
                   text-white`}
                >
                  Exchange Books
                </button>
                <button
                  onClick={handleLibrary}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  My Books
                </button>
                <button
                  onClick={handleChatNavigation}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Go to Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for My Library */}
{isModalVisible && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-auto">
      <h2 className="text-2xl font-bold mb-4">My Library Queue</h2>
      <ul className="list-disc list-inside mt-4 text-gray-700">
        {queue && queue.length > 0 ? (
          queue.map((book, index) => (
            <li key={index} className="mb-2">
              <h1>Author: {book.authors}</h1>
              <h1>Category: {book.categories}</h1>
              <h1>Title: {book.title}</h1>
              <h1>Book Id: {book.book_id}</h1>
              <h1>Language: {book.lang}</h1>
              <button
                onClick={() => handleChange(book.title)} // Pass the book title correctly
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Exchange This One
              </button>
            </li>
          ))
        ) : (
          <li>No books in library</li>
        )}
      </ul>
      <button
        onClick={closeModal}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}
