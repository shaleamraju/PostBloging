import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const API_URL = 'https://postbloging.onrender.com/api/posts';

function BlogModule() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(()=>{
    if(!token){
      navigate('/auth')
    }
  })

  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { title, author, content };
    const url = editingPostId ? `${API_URL}/${editingPostId}` : API_URL;
    const method = editingPostId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        setTitle('');
        setAuthor('');
        setContent('');
        setEditingPostId(null);
        fetchPosts();
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/${postId}`, { method: 'DELETE' });
      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setAuthor(post.author);
    setContent(post.content);
    setEditingPostId(post._id);
  };

  const handleLogout = ()=>{
   localStorage.removeItem('token')
   navigate('/auth')
  }

  return (
    <div className="App-container">
       <button onClick={handleLogout} style={{float:"right", padding:"10px", marhing:"10px"}}>logout</button>
      <div className="form-section">
        <h2>{editingPostId ? 'Edit Post' : 'Create a New Post'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          /><br />
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          /><br />
          <textarea
            placeholder="Post Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea><br />
          <button type="submit">{editingPostId ? 'Update Post' : 'Create Post'}</button>
        </form>
      </div>

      <div className="posts-section">
        <h2>Latest Posts</h2>
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <h3>{post.title}</h3>
            <p className="post-author">by {post.author}</p>
            <p>{post.content}</p>
            <div className="post-actions">
              <button onClick={() => handleEdit(post)}>Edit</button>
              <button onClick={() => handleDelete(post._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogModule;
