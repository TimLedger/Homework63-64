import React, { useState, useEffect } from 'react';
import { ApiPost } from '../../types';
import axiosApi from '../../axiosApi';
import './FormPosts.css';
import { useNavigate, useParams } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

const FormPosts: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatchTime = new Date().toISOString();
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState<ApiPost>({
    title: '',
    comment: '',
    time: '',
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axiosApi.get('/posts/' + params.id + '.json');
        const postData = response.data;
        setDescription({
          title: postData.title,
          comment: postData.comment,
          time: '',
        });
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      void fetchPost();
    }
  }, [params.id]);

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
      title: description.title,
      comment: description.comment,
      time: dispatchTime 
    };

    try {
      if (params.id) {
        await axiosApi.put('/posts/' + params.id + '.json', post);
      } else {
        await axiosApi.post('/posts.json', post);
      }
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  let button = (
    <button type="submit" className="form-submit-btn">Сохранить</button>
  );

  if (loading) {
    button = <Preloader />;
  }

  return (
    <div className="form-frame">
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
        {button}
      </form>  
    </div>
  );
};

export default FormPosts;