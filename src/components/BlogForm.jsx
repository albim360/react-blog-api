import React, { useState, useEffect } from 'react';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState(false);
  const [image, setImage] = useState('');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Recupera la lista dei post dal backend al caricamento dell'applicazione
    fetch('http://localhost:3001/posts')
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArticle = {
      title,
      content,
      category,
      tags,
      status,
      image,
    };

    // Invia il nuovo articolo al backend
    fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newArticle),
    })
      .then(response => response.json())
      .then(data => setArticles([...articles, data]))
      .catch(error => console.error('Error adding post:', error));

    // Reset dei campi del form
    setTitle('');
    setContent('');
    setCategory('');
    setTags([]);
    setStatus(false);
    setImage('');
  };

  const handleDelete = (id) => {
    const updatedArticles = articles.filter((article) => article.id !== id);
    setArticles(updatedArticles);
  };

  const handleTagsChange = (tag) => {
    const updatedTags = tags.includes(tag)
      ? tags.filter((t) => t !== tag)
      : [...tags, tag];
    setTags(updatedTags);
  };

  return (
    <div style={formContainerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>
          Titolo:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Contenuto:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Categoria:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Tags:
          <input
            type="checkbox"
            value="Tag1"
            onChange={() => handleTagsChange("Tag1")}
          />
          Tag1
          <input
            type="checkbox"
            value="Tag2"
            onChange={() => handleTagsChange("Tag2")}
          />
          Tag2
        </label>
        <label style={labelStyle}>
          Stato:
          <input
            type="checkbox"
            checked={status}
            onChange={() => setStatus(!status)}
          />
          Pubblicato
        </label>
        <label style={labelStyle}>
          Immagine:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={inputStyle}
          />
        </label>
        <button type="submit" style={submitButtonStyle}>
          Aggiungi
        </button>
      </form>

      <ul style={listStyle}>
        {articles.map((article) => (
          <li key={article.id} style={listItemStyle}>
            <div>
              <strong>{article.title}</strong>
              <p>{article.content}</p>
              <p><strong>Categoria:</strong> {article.category}</p>
              <p><strong>Tags:</strong> {article.tags.join(', ')}</p>
              <p><strong>Stato:</strong> {article.status ? 'Pubblicato' : 'Non pubblicato'}</p>
              <p><strong>Immagine:</strong> {article.image}</p>
            </div>
            <span
              style={deleteIconStyle}
              onClick={() => handleDelete(article.id)}
            >
              ❌
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const formContainerStyle = {
  maxWidth: '900px',
  backgroundColor: '#333',
  color: '#fff',
  padding: '35px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
};

const formStyle = {
  marginBottom: '20px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '10px',
  fontSize: '16px',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  fontSize: '16px',
  backgroundColor: '#555',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
};

const submitButtonStyle = {
  background: '#4CAF50',
  color: 'white',
  padding: '10px',
  fontSize: '16px',
  border: 'none',
  cursor: 'pointer',
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
};

const listItemStyle = {
  marginBottom: '10px',
  fontSize: '18px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const deleteIconStyle = {
  marginLeft: '10px',
  cursor: 'pointer',
  fontSize: '18px',
  color: 'red',
};

export default BlogForm;
