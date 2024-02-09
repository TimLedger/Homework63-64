import React, { useEffect } from 'react';
import Header from '../components/Header/Header';
import FormPosts from '../components/FormPosts/FormPosts';
import Footer from '../components/Footer/Footer';
import { useParams } from 'react-router-dom';

const AddPost: React.FC = () => {
  useEffect(() => {
    document.title = 'Добавить пост';
  }, []);

  const params = useParams();

  console.log(params.id)
  return (
    <div>
      <Header />
      <div className="container">
        <div className="page-body">
          <h2>Добавить пост</h2>
          {params.id ? 'edit' : 'new'}
          <FormPosts />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddPost;