import React, { useState, useEffect } from 'react';
import axiosApi from '../axiosApi';
import { ApiPage } from '../types';
import '../components/FormPosts/FormPosts.css';
import Preloader from '../components/Preloader/Preloader';
import { useNavigate } from 'react-router-dom';

const AboutEdit: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ApiPage>({
    title: '',
    text: '',
  });

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axiosApi.get<ApiPage>('/pages/about.json');
        setFormData(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
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
      await axiosApi.put('/pages/about.json', formData);
      navigate('/about');
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
        <button type="submit" className="form-submit-btn">Сохранить</button>
      </form>
    </div>
  );
};

export default AboutEdit;