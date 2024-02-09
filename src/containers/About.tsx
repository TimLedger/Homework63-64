import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Preloader from '../components/Preloader/Preloader';
import Footer from '../components/Footer/Footer';
import axiosApi from '../axiosApi';
import { ApiPage } from '../types';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";


const About: React.FC = () => {
  useEffect(() => {
    document.title = 'О нас';
  }, []);

  const location = useLocation();
  const [aboutData, setAboutData] = useState<ApiPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axiosApi.get<ApiPage | null>('/pages/about.json'); 
        setAboutData(response.data);
      } finally {
        setLoading(false);
      }
    };

    void fetchAboutData();
  }, [location.pathname]);

  let info = <Preloader />;

  if (loading) {
    info = <Preloader />;
  } else if (aboutData) {
    info = (
      <div>
        <h2>{aboutData.title}</h2>
        <p>{aboutData.text}</p>
      </div>
    );
  } else {
    info = (
    <div>
      <h3>Тут ничего нет(</h3>
    </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="page-body">
          {info}
          <Link className='tooltip-container' to="edit"><FaEdit /><span className='tooltip'>Изменить</span></Link>
          <Outlet/>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;