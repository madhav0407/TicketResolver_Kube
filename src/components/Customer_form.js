import React, { useEffect, useState } from 'react';
import "../Customer.css";
import Multiselect from "multiselect-react-dropdown";
import { Link, useLocation, useNavigate,  } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';





function Customer_form(props){

  const [id, setId] = useState('');
  const [nump, setVehnum] = useState("");
  const [vtype, setVehtype] = useState("Two-Wheeler");
  const [serv, setServices] = useState(["Cleaning", "Deep Cleaning", "Painting","Engine Repair","A/C repair","Tyre repair","Changing Oil"]);
  const [servf, setServicess] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [Add, setAdd] = useState("");
  const navigate = useNavigate()

  const {state} = useLocation();
  const {cust_id,resp} = state;
console.log(resp)


axios.interceptors.request.use( config => {
  const user = JSON.parse(localStorage.getItem('user'));

  if(user){
    const token = 'Bearer ' + user;
    config.headers.Authorization =  token;
  }
  return config;
});


  async function save(event)
  {
      event.preventDefault();
  try
      {
       await axios.post(`${props.Api}api/customer/${cust_id}`,
      {
      
      vehicleNo: nump,
      vehicleType : vtype,
      services : servf,
      remark:remarks,
      address: Add         
      
      });

      Swal.fire({
        icon: 'success',
        
        text: 'Ticket successfully created',
        footer: 'OK!!'
      })
        // setId("");
        // setName("");
        // setAddress("");
        // setMobile("");
    navigate("/customer",{state:{cust_id:cust_id,resp:resp}})
      
      
      }
  catch(err)
      {
        console.log(err)
        Swal.fire({
          icon: 'error',
          
          text: 'Ticket not created!!',
          footer: 'Try again!!'
        })      }
 }


 


return(
<>
<div className="container mt-4">
  
  <h1>Register your Request</h1>
<form noValidate>
        <div className="form-group">
            <label>Vehicle Registration Number</label>
            <input type="text" className="form-control" placeholder="Enter Vehicle Registration Number"
             value={nump}
             onChange={(event) =>
               {
                setVehnum(event.target.value);      
               }}
            required/>
        </div>


        <div className="form-group">
        <label>Select Vehicle Type</label>
        <select onChange={(event) =>
              {
                setVehtype(event.target.value);      
              }} placeholder='Select Vehicle Type' className="form-control" value={vtype}  required>
          <option>Two-Wheeler</option>
          <option>Four-Wheeler</option>
        </select>
        </div>

        <div className="form-group">
            <label>Select Services</label>
            <Multiselect
        isObject={false}
        onRemove={(event) => {
          console.log(event);
          setServicess(event)
        }}
        onSelect={(event) => {
          console.log(event);
          setServicess(event)
        }}

        onChange={(event) =>
          {
            setServices(event.target.value);      
          }}
        options={serv}
        selectedValues={["Cleaning"]}
        showCheckbox
      required/>
         </div> 
      
         <div className="form-group">
            <label>Remarks</label>
            <input type="text" className="form-control" placeholder="Enter Remarks"
            value={remarks}
            onChange={(event) =>
              {
                setRemarks(event.target.value);      
              }}
           />
        </div>  

        <div className="form-group" required>
            <label>Address</label>
            <input type="text" className="form-control" placeholder="Enter Address"
            value={Add}
            onChange={(event) =>
              {
                setAdd(event.target.value);      
              }}
           required />
        </div>
        
        <button className="btn btn-primary mt-4"  onClick={save} >Register</button>
        </form>


</div>

</>
);
    
      
    
  }
  
  export default Customer_form;