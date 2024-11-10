// src/App.jsx
import React, { useState } from "react";
import axios from "axios";
import { SiSpotify } from "react-icons/si";

function App() {
  const [URL, setURL] = useState("");

  const handleURL = (e) => {
    setURL(e.target.value);
  };

  const downloadSong = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify-downloader6.p.rapidapi.com/spotify',
      params: {
        spotifyUrl: URL
      },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_KEY, // Using environment variable
        'x-rapidapi-host': 'spotify-downloader6.p.rapidapi.com'
      }
    };
  
    try {
      const response = await axios.request(options);
      console.log(response.data.downLoadLink);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.log("Rate limit exceeded. Retrying in 5 seconds...");
        setTimeout(downloadSong, 5000); // Retry after 5 seconds
      } else {
        console.log(error);
      }
    }
  };
  

  return (
    <div className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-8 flex items-center">
        <SiSpotify className="mr-2" /> Spotify Song Downloader
      </h1>
      <input
        type="text"
        placeholder="Paste Spotify Song URL here"
        value={URL}
        onChange={handleURL}
        className="px-4 py-2 mb-4 rounded-lg text-gray-800 w-80"
      />
      <button
        onClick={downloadSong}
        className="px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition"
      >
        Download Song
      </button>
    </div>
  );
}

export default App;
