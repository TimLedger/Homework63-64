import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import About from './containers/About';
import Contacts from './containers/Contacts';
import AddPost from './containers/AddPost';
import Post from './containers/Post';
import NotFound from './containers/NotFound';
import './App.css'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<Home />}/>
      <Route path="/posts/:id" element={<Post/>}/>
      <Route path="/posts/:id/edit" element={<AddPost/>}/>
      <Route path="/new-post" element={<AddPost />} />
      <Route path="/about" element={<About />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;