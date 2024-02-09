import { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Preloader from '../components/Preloader/Preloader';
import Footer from '../components/Footer/Footer';
import axiosApi from '../axiosApi';
import { Post, ApiPosts } from '../types';
import { Link } from 'react-router-dom';
import {format} from 'date-fns';
import '../components/PostList/PostList.css';


const Home = () => {
  useEffect(() => {
    document.title = 'Мой Блог';
  }, []);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get<ApiPosts | null>('/posts.json');
      const posts = response.data;

      if (posts) {
        const reversedPosts = Object.keys(posts).map(id => ({
          ...posts[id],
          id
        })).reverse();
        setPosts(reversedPosts);
      } else {
        setPosts([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  let load = <Preloader />;

  if (loading) {
    load = <Preloader />;
  } else if (posts.length > 0) {
    load = (
      <div>
        {posts.map(post => (
          <div key={post.id} className='post-item'>
            <h2 className="post-title">{post.title}</h2>
            <div className="post-bottom">
              <Link className="post-link" to={'/posts/' + post.id}>Читать больше...</Link>
              <p className="post-time">{format(post.time, 'dd.MM.yyyy HH:mm' )}</p>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    load = <h1>Постов пока нет...</h1>;
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="page-body">
          {load}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;