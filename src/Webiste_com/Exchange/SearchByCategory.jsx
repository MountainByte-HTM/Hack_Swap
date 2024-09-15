// import React, { useState } from "react";
// import axios from "axios";

// const SearchByCategory = () => {
//   const [categories, setCategory] = useState("");
//   const [responseData, setResponseData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [showFullDescription, setShowFullDescription] = useState(false);  // State for toggling full description

//   const searchByCategory = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post("https://f680-119-160-199-91.ngrok-free.app/search_by_category", {
//         categories: categories,
//       });
//       setResponseData(response.data);
//     } catch (err) {
//       setError("Error fetching data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBookClick = (book) => {
//     setSelectedBook(book);  // Set the clicked book as selected
//     setShowFullDescription(false);  // Reset description view
//   };

//   const handleCloseModal = () => {
//     setSelectedBook(null);  // Close the modal
//   };

//   const toggleDescription = () => {
//     setShowFullDescription(!showFullDescription);  // Toggle between full and short description
//   };

//   const handleClick = async (bookTitle) => {
//     const email = localStorage.getItem('userEmail');
//     if (!email) {
//       console.error('User email not found in localStorage');
//       return;
//     }
//     try {
//       await axios.post('https://f680-119-160-199-91.ngrok-free.app/add_to_library', {
//         book_title: bookTitle,
//         user_uuid: email,
//       });
//       console.log("Success");
//     } catch (error) {
//       console.error('Error adding to library:', error);
//     }
//   };

//   const renderDescription = (description) => {
//     const wordLimit = 30;  // Define the word limit for the truncated description
//     const words = description.split(' ');

//     if (words.length > wordLimit) {
//       const truncatedDescription = words.slice(0, wordLimit).join(' ');
//       return (
//         <div>
//           <p>{showFullDescription ? description : `${truncatedDescription}...`}</p>
//           <button className="bg-brown-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-brown-600 transition" onClick={toggleDescription}>
//             {showFullDescription ? "Show Less" : "Read More"}
//           </button>
//         </div>
//       );
//     }
//     return <p>{description}</p>;
//   };

//   return (
//     <div className="p-6 bg-skin-light min-h-screen">
//       <h1 className="text-3xl font-bold text-brown-800 mb-6">Search Books by Category</h1>
//       <div className="mb-4">
//         <input
//           className="border border-brown-300 rounded-md p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-brown-500"
//           type="text"
//           value={categories}
//           onChange={(e) => setCategory(e.target.value)}
//           placeholder="Enter category name"
//         />
//         <button
//           className="bg-brown-600 text-white px-6 py-2 rounded-md hover:bg-brown-700 transition"
//           onClick={searchByCategory}
//         >
//           Search
//         </button>
//       </div>

//       {loading && <p className="text-brown-600 mt-4">Loading...</p>}
//       {error && <p className="text-red-600 mt-4">{error}</p>}
//       {responseData && (
//         <div className="mt-6">
//           <h2 className="text-2xl font-semibold text-brown-700 mb-4">Search Results:</h2>
//           {responseData.map((data, index) => (
//             <div
//               key={index}
//               className="bg-white border border-gray-300 rounded-md p-4 mb-4 shadow-md cursor-pointer hover:shadow-lg transition"
//               onClick={() => handleBookClick(data)}
//             >
//               <img src={data.image_links.thumbnail} alt={`${data.title} cover`} className="w-32 h-48 object-cover rounded-md mb-4" />
//               <div className="text-brown-800">
//                 <h3 className="text-lg font-bold mb-1">Title: {data.title}</h3>
//                 <p className="mb-1">Author: {data.authors}</p>
//                 <p className="mb-1">Category: {data.categories?.join(', ')}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal for showing book details */}
//       {selectedBook && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg p-6 w-full md:w-4/5 lg:w-1/2 max-h-screen overflow-y-auto">
//             <span className="text-xl cursor-pointer float-right" onClick={handleCloseModal}>&times;</span>
//             <h2 className="text-2xl font-bold text-brown-800 mb-4">{selectedBook.title}</h2>
//             <img src={selectedBook.image_links.thumbnail} alt={`${selectedBook.title} cover`} className="w-40 h-60 object-cover rounded-md mb-4" />
//             <p className="mb-2"><strong>Author(s):</strong> {selectedBook.authors}</p>

//             <div className="mb-4">
//               <strong>Description:</strong>
//               {renderDescription(selectedBook.description)}
//             </div>

//             <p className="mb-2"><strong>Categories:</strong> {selectedBook.categories?.join(', ')}</p>
//             <p className="mb-2"><strong>Page Count:</strong> {selectedBook.page_count}</p>
//             <p className="mb-2"><strong>Language:</strong> {selectedBook.language}</p>
//             <button
//               className="bg-brown-600 text-white px-6 py-2 rounded-md hover:bg-brown-700 transition"
//               onClick={() => handleClick(selectedBook.title)}
//             >
//               ADD TO QUEUE
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchByCategory;


import React, { useState } from "react";
import axios from "axios";

const SearchByCategory = () => {
  const [categories, setCategory] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); 

  const searchByCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://2ba3-2401-4900-50ab-a2ec-f1dc-b1b5-e703-2f8c.ngrok-free.app/search_by_category", {
        categories: categories,
      });
      console.log(response.data)
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
      alert("books added successfully")
      setSuccessMessage("Book added to queue successfully!");  // Set success message
    } catch (error) {
      console.error('Error adding to library:', error);
      setSuccessMessage("Failed to add book to queue.");  // Optionally handle failure message
    }
  };
  
  const handleBookClick = (book) => {
    setSelectedBook(book);  
    setShowFullDescription(false);  
    setSuccessMessage("");
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
      <h1 className="text-4xl font-bold text-center text-brown-800 mb-8">Search Books by Category</h1>
      <div className="flex justify-center mb-4">
        <input
          className="w-1/2 p-3 border border-brown-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
          type="text"
          value={categories}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter title name"
        />
        <button 
          className="bg-brown-600 text-black bg-yellow-300 font-bold px-6 py-3 rounded-r-lg hover:bg-brown-700 transition hover:text-white"
          onClick={searchByCategory}
        >
          Search
        </button>
      </div>

      {loading && <p className="text-brown-600 mt-4">Loading...</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
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
        className="bg-brown-600 text-black hover:text-white px-6 py-2 rounded-md hover:bg-brown-700 transition"
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

export default SearchByCategory;
