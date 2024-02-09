import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import About from './containers/About';
import AboutEdit from './containers/AboutEdit';
import Contacts from './containers/Contacts';
import ContactsEdit from './containers/ContactsEdit';
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
      <Route path="/about" element={<About />} >
        <Route path="edit" element={<AboutEdit />} />
      </Route>
      <Route path="/contacts" element={<Contacts />} >
        <Route path="edit" element={<ContactsEdit />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;