import React, { useState } from 'react';
import { Description } from '../../types';
import axiosApi from '../../axiosApi';
import './FormPosts.css';
import { useNavigate } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

const FormPosts: React.FC = () => {
  const navigate = useNavigate();
  const dispatchTime = new Date().toLocaleString();
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState<Description>({
    title: '',
    comment: '',
    time: '',
  });

  const descriptionChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    setDescription(prevState => ({
        ...prevState,
        [name]: value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const post = {
      description: {
        ...description,
        time: dispatchTime 
      },
    };

    try {
      await axiosApi.post('/posts.json', post);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  let form = (
    <form onSubmit={onFormSubmit} autoComplete="off" className='form'>
          <div className="form-group">
            <textarea 
              id="title" 
              name="title" 
              className="form-control"
              rows={1}
              required
              value={description.title}
              onChange={descriptionChanged}
            />
            <label htmlFor="title" className="form-label">Заголовок</label>
          </div>
          <div className="form-group">
            <textarea 
              id="comment"
              name="comment"
              className="form-control"
              rows= {10}
              required
              value={description.comment}
              onChange={descriptionChanged}
            />
            <label htmlFor="comment" className="form-label">Описание</label>
          </div>
          <button type="submit" className="form-submit-btn">Сохранить</button>
    </form>
  );

  if (loading) {
    form = <Preloader />;
  }

  return (
    <div className="form-frame">
        {form}
    </div>
  );
};

export default FormPosts;



  
