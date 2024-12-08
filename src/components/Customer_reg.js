import React, { useEffect, useState } from 'react';
import "../Customer.css";
import axios from 'axios';
import Multiselect from "multiselect-react-dropdown";
import { Link, useLocation, useNavigate,  } from "react-router-dom";
import Swal from 'sweetalert2';





function Customer_reg(props){

  const [id, setId] = useState('');
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [uname, setUname] = useState("");
  const [pwd, setPass] = useState("");
  const navigate = useNavigate()

  const [formErrors, setFormErrors] = useState({});

  axios.interceptors.request.use( config => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if(user){
      const token = 'Bearer ' + user;
      config.headers.Authorization =  token;
    }
    return config;
  });



{/* <h1 style={{ color: 'red' }}>Hello world</h1> */}

const validateForm = () => {
  let errors = {};
  if (!fname) {
    errors.fname = '*FirstName is required'
  }
  if (!lname) {
    errors.lname = '*LastName is required';
  }
  
  if (!email) {
    errors.email = '*Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = '*Email is invalid';
  }
  if (!uname) {
    errors.uname = '*Username is required';
  } 

  if (!pwd) {
    errors.pwd = '*Username is required';
  } 


  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};





  async function save(event)
  {
      event.preventDefault();

  if(validateForm()){
  try
      {
       await axios.post(`${props.Api}api/auth/register/user`,
      {
      
      firstName: fname,
      lastName : lname,
      email:email,
      username:uname,
      password:pwd       
      });

        Swal.fire({
          icon: 'success',
          
          text: 'Customer Registration Successfull',
          footer: 'OK!!'
        })
        // setId("");
        // setName("");
        // setAddress("");
        // setMobile("");
    // console.log(name,nump,vname,vtype,servf,remarks,Add)
    navigate("/",{state:{}})
      
      
      }
  catch(err)
      {
        console.log(err)
        Swal.fire({
          icon: 'error',
          
          text: 'User Registation Failed',
          footer: 'Try again!!'
        })
      }
    }
 }


 


return(
<>
<div className="container mt-4">
  <h1>Register,here!</h1>
<form onSubmit={save}>
        <div className="form-group">
            <label>First Name</label>
            <input type="text" className="form-control" placeholder="Enter First Name"
             value={fname}
            onChange={(event) =>
              {
                setFname(event.target.value);      
              }}
            />
        {formErrors.fname && <span style={{color:"red",fontSize:15}}>{formErrors.fname}</span>}
        </div>

        <div className="form-group">
            <label>Last Name</label>
            <input type="text" className="form-control" placeholder="Enter Last Name"
             value={lname}
             onChange={(event) =>
               {
                setLname(event.target.value);      
               }}
            />
        {formErrors.lname && <span style={{color:"red",fontSize:15}}>{formErrors.lname}</span>}
        </div>

        <div className="form-group">
            <label>Email-ID</label>
            <input type="text" className="form-control" placeholder="Enter Email-id"
            value={email}
            onChange={(event) =>
              {
                setEmail(event.target.value);      
              }}
           />
      {formErrors.email && <span style={{color:"red",fontSize:15}}>{formErrors.email}</span>}
        </div>

        <div className="form-group">
            <label>User Name</label>
            <input type="text" className="form-control" placeholder="Enter User name"
            value={uname}
            onChange={(event) =>
              {
                setUname(event.target.value);      
              }}
           />
      {formErrors.uname && <span style={{color:"red",fontSize:15}}>{formErrors.uname}</span>}
        </div>

        
      
         <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter Password"
            value={pwd}
            onChange={(event) =>
              {
                setPass(event.target.value);      
              }}
           />
      {formErrors.pwd && <span style={{color:"red",fontSize:15}}>{formErrors.pwd}</span>}
        </div>  

        
        
        <button className="btn btn-primary mt-4"  type='submit' >Register</button>
        </form>


</div>

</>
);
    
      
    
  }
  
  export default Customer_reg;