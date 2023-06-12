import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Blogs from './components/blogs/blogs';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Blog from './components/blogs/blog/blog';
import Transfer from './components/dashboard/transfer/transfer';
function App() {
  const dataSource = [
    {
      key: '16532d928df34130b4ec73e44ad0578a',
      Id: '16532d928df34130b4ec73e44ad0578a',
      title: 32,
      subTitle: '10 Downing Street',
      author: 'Ahsan',
    },
    {
      key: '165329028df34130b4ec73e44ad0578a',
      Id: '165329028df34130b4ec73e44ad0578a',
      title: 32,
      subTitle: '10 Downing Street',
      author: 'Ahsan',
    },
  ];
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState(dataSource);

  

  const addBlog = (blog) => {
    setBlogs([...blogs, blog]);
  }
  const removeBlog = (blogId) =>{
    const newBlogs = blogs.filter(b => b.Id!==blogId);
    setBlogs(newBlogs);
  }
  const updateBlog = (newBlog) => {
    const oldBlogIndex = blogs.findIndex(b => b.Id === newBlog.Id);
    blogs[oldBlogIndex] = newBlog;
    setBlogs(blogs);
  }
  const addUser = (user) => {
    setUsers([...users, user]);
  }
  const removeUser = (user) => {
    const newUsers = users.filter(u => u.name !== user.name);
    setUsers(newUsers);
  }
  return (
    <div className="App">
      <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Login users={users} removeUser={removeUser}/> }/>
          <Route path="/signup" element={<Signup addUser={addUser} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blogs" element={<Blogs blogs={blogs} removeBlog={removeBlog} />} />
          <Route path="/blog/:id" element={<Blog blogs={blogs} addBlog={addBlog} updateBlog={updateBlog}/>} />
          <Route path="/blog" element={<Blog  blogs={blogs} addBlog={addBlog} updateBlog={updateBlog} />} />
          <Route path="/transfer/:id" element={<Transfer/>} />
          <Route path="/transfer" element={<Transfer/>} />
        </Routes>
      </div>
    </Router>
      
    </div>
  );
}

export default App;
