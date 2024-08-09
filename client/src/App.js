import React, { useEffect, useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import Homepage from './components/HomePage';
import Dashboard from './components/Dashboard';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ManageOrders from './components/ManageOrders';
import OrderDetails from './components/OrderDetails';
import Search from './components/Search';
import adminLogo from './assets/images/favicon.ico';

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [theParcels, setTheParcels] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch parcels on page load
  useEffect(() => {
    fetch('/parcels')
      .then((response) => {
        if (!response.ok) {
          throw Error('Issue fetching parcels');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setTheParcels(data);
      })
      .catch((error) => {
        console.error('Error fetching parcels:', error);
      });
  }, []);

  return (
    <>
      <header>
        <div className='admin-logo'>
          <img src={adminLogo} alt='admin-logo'/>
          <h2>SENDIT</h2>
        </div>
        <NavBar isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Navigate to='/manage/orders' />} />
          <Route path='manage/orders' element={<ManageOrders parcels={theParcels} setTheParcels={setTheParcels} />} />
          <Route path='order/:id/details' element={<OrderDetails parcels={theParcels} setTheParcels={setTheParcels} />} />
          <Route path='search' element={<Search parcels={theParcels} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
