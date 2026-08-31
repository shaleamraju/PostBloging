import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './blog.css';
import { useRef } from 'react';

const API_BASE_URL = `https://postbloging.onrender.com/api/posts`;


function BlogModule() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Technology');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const fileInputRef = useRef(null);
  const [Image, setImage] = useState(null);

  const categories = ['Technology', 'Lifestyle', 'Business', 'Travel', 'Food', 'Health', 'Education', 'Entertainment'];

  useEffect(()=>{
    if(!token){
      navigate('/auth')
    } else {
      const name = localStorage.getItem('userName') || 'User';
      setUserName(name);
    }
  },[token, navigate]);

  useEffect(() => {
    // Apply dark mode
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    // Filter and search posts
    let result = [...posts];

    if (filterCategory !== 'All') {
      result = result.filter(post => post.category === filterCategory);
    }

    if (searchTerm) {
      result = result.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(result);
  }, [searchTerm, filterCategory, posts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('author', author);
      formData.append('content', content);
      formData.append('category', category);
      if (Image) {
        formData.append('image', Image);
      }
    const url = editingPostId ? `${API_BASE_URL}/${editingPostId}` : API_BASE_URL;
    const method = editingPostId ? 'PUT' : 'POST';
    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        setTitle('');
        setAuthor('');
        setContent('');
        setCategory('Technology');
        setEditingPostId(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
        setImage(null);
        fetchPosts();
        alert(editingPostId ? 'Post updated successfully!' : 'Post created successfully!');
      } else {
        console.error('Failed to submit post');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/${postId}`, { method: 'DELETE' });
        if (response.ok) {
          fetchPosts();
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setAuthor(post.author);
    setContent(post.content);
    setCategory(post.category || 'Technology');
    setEditingPostId(post._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${postId}/like`, { method: 'POST' });
      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleLogout = ()=>{
   localStorage.removeItem('token');
   localStorage.removeItem('userName');
   navigate('/auth');
  }

  return (
    <div className="App-container">
      <header className="blog-header">
        <div className="header-left">
          <h1>📝 PostBloging</h1>
          <p className="welcome-msg">Welcome back, {userName}! 👋</p>
        </div>
        <div className="header-right">
          <button 
            className="dark-mode-toggle" 
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </header>

      <div className="form-section">
        <h2>{editingPostId ? '✏️ Edit Post' : '✨ Create a New Post'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              placeholder="👤 Author Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="category-select"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <input
            type="text"
            placeholder="📰 Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="✍️ Post Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <div className="file-upload-container">
            <label htmlFor="file-upload" className="file-upload-label">
              📷 {Image ? Image.name : "Upload Image (Optional)"}
            </label>
            <input 
              id="file-upload"
              type="file" 
              ref={fileInputRef} 
              onChange={(e)=>setImage(e.target.files[0])} 
              accept='image/png, image/jpg, image/jpeg'
              style={{display: 'none'}}
            />
          </div>
          <button type="submit" className="submit-btn">
            {editingPostId ? '💾 Update Post' : '🚀 Create Post'}
          </button>
        </form>
      </div>

      <div className="controls-section">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <button 
            className={filterCategory === 'All' ? 'active' : ''}
            onClick={() => setFilterCategory('All')}
          >
            All
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              className={filterCategory === cat ? 'active' : ''}
              onClick={() => setFilterCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="posts-section">
        <h2>📚 Latest Posts ({filteredPosts.length})</h2>
        {filteredPosts.length === 0 ? (
          <div className="no-posts">
            <p>No posts found. {searchTerm || filterCategory !== 'All' ? 'Try adjusting your filters.' : 'Create your first post!'}</p>
          </div>
        ) : (
          <div className="posts-grid">
            {filteredPosts.map((post) => (
              <div key={post._id} className="post-card">
                {post?.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className='post-image'
                  />
                )}
                <div className='post-content'>
                  <div className="post-header">
                    <span className="post-category">{post.category || 'Uncategorized'}</span>
                    <span className="post-date">{formatDate(post.createdAt)}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p className="post-author">by {post.author}</p>
                  <p className="post-text">{post.content}</p>
                  <div className="post-meta">
                    <span className="read-time">⏱️ {calculateReadTime(post.content)}</span>
                    <span className="like-count">❤️ {post.likes || 0}</span>
                  </div>
                </div>
                <div className="post-actions">
                  <button onClick={() => handleLike(post._id)} className="like-btn">
                    👍 Like
                  </button>
                  <button onClick={() => handleEdit(post)} className="edit-btn">
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDelete(post._id)} className="delete-btn">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default BlogModule;
