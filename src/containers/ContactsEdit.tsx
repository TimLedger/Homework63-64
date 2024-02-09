import React, { useState, useEffect } from 'react';
import axiosApi from '../axiosApi';
import { ApiPageContacts } from '../types';
import '../components/FormPosts/FormPosts.css';
import Preloader from '../components/Preloader/Preloader';
import { useNavigate } from 'react-router-dom';

const ContactsEdit: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ApiPageContacts>({
    title: '',
    text: '',
    address: '', 
    phone: '', 
    email: '',
  });

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axiosApi.get<ApiPageContacts>('/pages/contact.json');
        setFormData(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  const formChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axiosApi.put('/pages/contact.json', formData);
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
          <input 
            type="text" 
            name="title" 
            required
            value={formData.title} 
            onChange={formChange} 
            className="form-control"
          />
          <label htmlFor="title" className="form-label">Заголовок</label>
        </div>
        <div className="form-group">
          <textarea 
            name="text" 
            rows= {10}
            required
            value={formData.text} 
            onChange={formChange} 
            className="form-control"
          />
          <label htmlFor="text" className="form-label">Описание</label>
        </div>
        <div className="form-bottom">
          <div className="form-group">
            <input 
                type="text" 
                name="email" 
                required
                value={formData.email} 
                onChange={formChange} 
                className="form-control"
            />
            <label htmlFor="email" className="form-label">Email</label>
          </div>
          <div className="form-group">
            <input 
                type="text" 
                name="phone" 
                required
                value={formData.phone} 
                onChange={formChange} 
                className="form-control"
            />
            <label htmlFor="phone" className="form-label">Номер телефона</label>
          </div>
          <div className="form-group">
            <input 
                type="text" 
                name="address" 
                required
                value={formData.address} 
                onChange={formChange} 
                className="form-control"
            />
            <label htmlFor="address" className="form-label">Адрес</label>
          </div>
        </div>
        <button type="submit" className="form-submit-btn">Сохранить</button>
      </form>
    </div>
  );
};

export default ContactsEdit;
