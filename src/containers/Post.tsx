import { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Preloader from '../components/Preloader/Preloader';
import Footer from '../components/Footer/Footer';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ApiPost } from '../types';
import axiosApi from '../axiosApi';
import { FaBomb, FaEdit } from "react-icons/fa";
import {format} from 'date-fns';

const Post = () => {
  const params = useParams();
  const [post, setPost] = useState<ApiPost | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPost = useCallback( async () => {
    setLoading(true); 
    const response = await axiosApi.get<ApiPost | null>('/posts/' + params.id +'.json');
    setPost(response.data);
    setLoading(false); 

  }, [params.id]);

  useEffect(() => {
    void fetchPost();
  }, [fetchPost]);

  let postArea = <Preloader />;

  if (!loading && post) {
    document.title = post.title;

    postArea = (
      <div className="post-item"> 
          <h2 className="post-title">{post.title}</h2>
          <p className="post-comment">{post.comment}</p>
          <div className="post-bottom">
            <div className="post-btns">
              <button className='tooltip-container'><FaBomb /><span className='tooltip'>Удалить</span></button>
              <Link className='tooltip-container' to={'/posts/' + params.id +'/edit'}><FaEdit /><span className='tooltip'>Изменить</span></Link>
            </div>
            <p className="post-time">{format(post.time, 'dd.MM.yyyy HH:mm' )}</p>
          </div>
      </div>
    )
  } else if (!loading && !post) {
    document.title = 'Пост не найдет';

    postArea = (
      <h1>Пост не найдет</h1>
    )
  }
   
  return (
    <div>
      <Header />
      <div className="container">
        <div className="page-body">
          {postArea}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Post;