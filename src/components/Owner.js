import React, { useEffect, useState } from 'react';
import "../Customer.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';


function Owner(props){
  const navigate = useNavigate()
  const [active, setActive] = useState(false);
  const [ack, setAck] = useState("");
  
  // let [res,setRes]=useState([{id:2,vehicleNo:'MH-02-2449',vehicleType:'Yamaha',services:["Cleaning"," , ","A/C Repair"," , ","Painting"],address:"IIIT Banglore",status:"Pending",remark:"Please deliver by today"},{id:5,vehicleNo:'MH-05-4304',vehicleType:'Honda',services:["Deep Cleaning"," , ","Tyre Repair"," , ","Oiling"],address:"IIIT Banglore",status:"Pending",remark:"Please deliver by tomorrow"}]);
  let [res,setRes]=useState([]);


  axios.interceptors.request.use( config => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if(user){
      const token = 'Bearer ' + user;
      config.headers.Authorization =  token;
    }
    return config;
  });


  const Fetch_data = async()=>{
    await axios.get(`${props.Api}api/complaints/1`, 
    
    {
      mode:'cors',
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
      
  })
    .then((response)=>{
        console.log(response.data);
        setRes(response.data);
    })
    .catch(function(error)
    {
        console.log(error);
    });
    
}

  useEffect(()=>{
    Fetch_data();
},[]);
console.log(res)

const Acknow = async (cid,ack)=>{

  await axios.post(`${props.Api}api/owner/aknow/${cid}/${ack}`, 
    
    {
      mode:'cors',
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),      
  })
    .then((response)=>{


      Swal.fire({
        icon: 'success',
        
        text: 'Acknowledgement Sended to customer',
        footer: 'OK!!'
      })

    setAck("")
        // console.log(response.data);
        // setRes(response.data);
    })
    .catch(function(error)
    {
      Swal.fire({
        icon: 'error',
        
        text: 'Unable to send acknowledgement',
        footer: 'Try again!!'
      })

        console.log(error);
    });


}

const mark = async (cid)=>{
  

await axios.post(`${props.Api}api/owner/status/${cid}`, 
    
    {
      mode:'cors',
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
      
  })
    .then((response)=>{
    Swal.fire({
      icon: 'success',
      
      text: 'Ticket resolved',
      footer: 'OK!!'
    })

        // console.log(response.data);
        // setRes(response.data);
        setActive(!active);
for(let i=0;i<res.length;i++){
if(res[i].id==cid){
  res[i].status='Done'
}
}
    })
    .catch(function(error)
    {
      Swal.fire({
        icon: 'error',
        
        text: 'Unable to resolve ticket',
        footer: 'Try again!!'
      })
      console.log(error)
    
    });

}
// console.log(res.services)

for(let i=0;i<res.length;i++){
  console.log(res[i])
  for(let j=1;j<res[i].services.length;j++){
    if(res[i].services[j][0]!==','){
    res[i].services[j]="," + res[i].services[j]
    }
  }
}


  return (
    <>
    <div className='heading'>
      <h1>Customer Requests</h1>
    </div>
      <div className='container'>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
              <th>Customer_ID</th>
                <th>Vehicle_Id</th>
                <th>Vehicle_Type</th>
                <th>Services</th>
                <th>Address</th>
                <th>Remarks</th>
                <th>Response</th>
                <th>Acknowledgement</th>
              </tr>
            </thead>
            <tbody>
            {res.map((val, key) => {
        return (
          <tr key={key}>
            <td>{val.id}</td>
            <td>{val.vehicleNo}</td>
            <td>{val.vehicleType}</td>
            {/* <td>{val.age}</td> */}
            <td>{val.services}</td>
            <td>{val.address}</td>
            <td>{val.remark}</td>
            <td>
                      <Button
                        type="click"
                        variant="primary"
                        onClick={() => mark(val.id)}
                        style={{ backgroundColor: val.status=='Pending' ? "Blue" : "Red" }}
                        >
                        Mark as Done
                      </Button>
                      {/* <input type="text" className="form-control" placeholder="Enter Email-id"></input>  */}
            </td>

            <td>
              
            <input type="text" className="option1" placeholder="Type acknowledgement" 
            onChange={(event) =>
              {
                setAck(event.target.value);
            
              }}/>
                      <Button
                        type="click"
                        variant="primary"
                        style={{ backgroundColor:"Blue" }}
                        className="option1"
                        onClick={() => Acknow(val.id,ack)}
                        >
                        Send
                      </Button>
            </td>

          </tr> 
        );
      })}
            </tbody>
          </table>
        {/* <a href="#" onClick={this.showStudentList}>StudentList</a> */}
        </div>
      </div>
    </>
    );
}

export default Owner;