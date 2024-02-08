import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import PostList from '../components/PostList/PostList';
import Footer from '../components/Footer/Footer';
import axiosApi from '../axiosApi';
import { ApiPosts } from '../types'

const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'Мой Блог';
  }, []);
  
  const [posts, setPosts] = useState<ApiPosts | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosApi.get<ApiPosts>('/posts.json');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    void fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="page-body">
          <PostList posts={posts} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
