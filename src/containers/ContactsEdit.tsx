import React, { useState, useEffect } from 'react';
import axiosApi from '../axiosApi';
import { ApiPage } from '../types';
import '../components/FormPosts/FormPosts.css';
import Preloader from '../components/Preloader/Preloader';
import { useNavigate } from 'react-router-dom';

const ContactsEdit: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axiosApi.get<ApiPage>('/pages/contact.json');
        const contactData = response.data;
        setTitle(contactData.title);
        setText(contactData.text);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosApi.put('/pages/contact.json', { title, text });
      navigate('/contacts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className='form-frame'>
      <form onSubmit={handleSubmit} className='form'>
        <div className="form-group">
          <input type="text" value={title} onChange={handleTitleChange} className="form-control"/>
          <label htmlFor="title" className="form-label">Заголовок</label>
        </div>
        <div className="form-group">
          <textarea value={text} onChange={handleTextChange} className="form-control"/>
          <label htmlFor="text" className="form-label">Описание</label>
        </div>
        <button type="submit" className="form-submit-btn">Сохранить</button>
      </form>
    </div>
  );
};

export default ContactsEdit;