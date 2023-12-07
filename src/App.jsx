import React, { useState, useEffect } from 'react';
import BlogForm from './components/BlogForm.jsx';

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Recupera la lista dei post dal backend al caricamento dell'applicazione
    fetch('http://localhost:3001/posts')
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []); 

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Il mio Blog</h1>
      <BlogForm articles={articles} setArticles={setArticles} />
    </div>
  );
}

const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#333',
  color: '#fff',
  margin: 0,
  padding: 0,
  height: '100vh',
};

const titleStyle = {
  fontSize: '24px',
  marginBottom: '20px',
};

export default App;
