import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Preloader from '../components/Preloader/Preloader';
import Footer from '../components/Footer/Footer';
import axiosApi from '../axiosApi';
import { ApiPage } from '../types';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";

const Contacts: React.FC = () => {
  useEffect(() => {
    document.title = 'Контакты';
  }, []);

  const location = useLocation();
  const [contactData, setContactData] = useState<ApiPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axiosApi.get<ApiPage | null>('/pages/contact.json'); 
        setContactData(response.data);
      } finally {
        setLoading(false);
      }
    };

    void fetchContactData();
  }, [location.pathname]);

  let info = <Preloader />;

  if (loading) {
    info = <Preloader />;
  } else if (contactData) {
    info = (
      <div>
        <h2>{contactData.title}</h2>
        <p>{contactData.text}</p>
      </div>
    );
  } else {
    info = <h3>Тут ничего нет(</h3>;
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

export default Contacts;  