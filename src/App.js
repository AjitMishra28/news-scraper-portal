// App.js
import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/news");
      setNews(res.data.data); // Array of news items
    } catch (err) {
      console.error("Error fetching news:", err);
      alert("Error fetching news. Check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId="511275225199-nqquilnts99jprct4opfbcscm3982vo6.apps.googleusercontent.com">
      <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <h1>📰 News Scraper Portal</h1>

        {!isLoggedIn ? (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log("Login success:", credentialResponse);
              setIsLoggedIn(true);
            }}
            onError={() => {
              alert("Login Failed");
            }}
          />
        ) : (
          <>
            <button onClick={fetchNews} disabled={loading} style={{ padding: '10px', fontSize: '16px' }}>
              {loading ? "Fetching..." : "Fetch News"}
            </button>

            <div style={{ marginTop: "2rem" }}>
              {news.length === 0 ? (
                <p>No news available. Click the button above to fetch.</p>
              ) : (
                news.map((item, idx) => (
                  <div key={idx} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </a>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
