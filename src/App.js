import Login from './components/Login'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Customer from './components/Customer';
import Customer_form from './components/Customer_form';
import Owner from './components/Owner';
import Customer_reg from './components/Customer_reg';
import Navbar_head from './components/Navbar_head';
import About from './About'
import Contact from './Contact'
import { useEffect } from 'react';

function App() {
  let h="http://spring-boot-service:8081/"
  const location = useLocation()

  useEffect(() => {
    
  }, [location])


  return (
  
    <div>
      
      <Navbar_head path={location} />
      <Routes>
        
        <Route path='/' element={<Login Api={h}/>}/>
        <Route path='/customer' element={<Customer Api={h}/>}/>
        <Route path='/customer/custform' element={<Customer_form Api={h}/>}/>
        <Route path='/owner' element={<Owner Api={h}/>}/>
        <Route path='/register' element={<Customer_reg Api={h}/>}/>
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />

      </Routes>
    
    </div>
  );
}
  
export default App;