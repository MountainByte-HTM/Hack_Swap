import React, { useState } from "react";
import axios from "axios";

const SearchByTitle = () => {
  const [title, setTitle] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false); 

  const searchByTitle = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://2ba3-2401-4900-50ab-a2ec-f1dc-b1b5-e703-2f8c.ngrok-free.app/search_by_title", {
        title: title,
      });
      setResponseData(response.data);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (bookTitle) => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      console.error('User email not found in localStorage');
      return;
    }
    try {
      await axios.post('https://2ba3-2401-4900-50ab-a2ec-f1dc-b1b5-e703-2f8c.ngrok-free.app/add_to_library', {
        book_title: bookTitle,
        user_uuid: email,
      });
      console.log("Success");
    } catch (error) {
      console.error('Error adding to library:', error);
    }
  };
  
  const handleBookClick = (book) => {
    setSelectedBook(book);  
    setShowFullDescription(false);  
  };

  const handleCloseModal = () => {
    setSelectedBook(null);  
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);  
  };

  const renderDescription = (description) => {
    const wordLimit = 30;  
    const words = description.split(' ');

    if (words.length > wordLimit) {
      const truncatedDescription = words.slice(0, wordLimit).join(' ');
      return (
        <div>
          <p>{showFullDescription ? description : `${truncatedDescription}...`}</p>
          <button className="text-brown-500 underline" onClick={toggleDescription}>
            {showFullDescription ? "Show Less" : "Read More"}
          </button>
        </div>
      );
    }
    return <p>{description}</p>;
  };

  return (
    <div className="container mx-auto p-6 bg-brown-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-brown-800 mb-8">Search Books by Title</h1>
      <div className="flex justify-center mb-4">
        <input
          className="w-1/2 p-3 border border-brown-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title name"
        />
        <button 
          className="bg-brown-600 text-black bg-yellow-300 font-bold px-6 py-3 rounded-r-lg hover:bg-brown-700 transition hover:text-white"
          onClick={searchByTitle}
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center text-brown-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {responseData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {responseData.map((data, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-md rounded-lg cursor-pointer hover:shadow-xl transition"
              onClick={() => handleBookClick(data)}
            >
              <img src={data.image_links.thumbnail} alt={`${data.title} cover`} className="mx-24 w-50 h-60 object-cover rounded-md" />
              <div className="mt-4">
                <h3 className="text-lg font-bold text-brown-800">{data.title}</h3>
                <p className="text-brown-600">Author: {data.author}</p>
              </div>
            </div>
          ))}
        </div>
      )}
{selectedBook && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-6 w-4/5 md:w-2/3 lg:w-1/2 max-h-screen overflow-y-auto">
      <span className="text-xl cursor-pointer float-right" onClick={handleCloseModal}>&times;</span>
      <h2 className="text-2xl font-bold text-brown-800 mb-4">{selectedBook.title}</h2>
      <img src={selectedBook.image_links.thumbnail} alt={`${selectedBook.title} cover`} className="w-40 text-center h-40 object-cover rounded-md mb-4" />
      <p className="mb-2"><strong>Author(s):</strong> {selectedBook.author}</p>

      <div className="bookDescription mb-4">
        <strong>Description:</strong>
        {renderDescription(selectedBook.description)}
      </div>

      <p className="mb-2"><strong>Categories:</strong> {selectedBook.categories?.join(', ')}</p>
      <p className="mb-2"><strong>Page Count:</strong> {selectedBook.page_count}</p>
      <p className="mb-2"><strong>Language:</strong> {selectedBook.language}</p>
      <button
        className="bg-brown-600 text-black font-bold hover:text-white px-6 py-2 rounded-md hover:bg-brown-700 transition"
        onClick={() => handleClick(selectedBook.title)}
      >
        ADD TO QUEUE
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default SearchByTitle;
