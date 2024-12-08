import '../login.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function Login (props) {

  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const[res,setRes]=useState([]);
  // setRes([1,2,3,4])
  // console.log(res)
  // const [errMsg,setErrMsg] = useState('');
  // console.log(props.Api)
  
  const  handleLogin = async () => {
  
    await axios.post(`${props.Api}api/auth/login`, {
    
    mode:'cors',
    headers: new Headers({
      "ngrok-skip-browser-warning": "69420",
    }),
    username : user,
    password :pwd,

  })
  .then(function (response) {
    console.log(response)

    if (response.headers.jwt) {
      const token=JSON.stringify(response.headers.jwt);
      // console.log(token)
      // const AuthStr="Bearer ".concat(token)
      localStorage.setItem("user",token);
      
      console.log(response.headers.jwt)
    }

    Swal.fire({
      icon: 'success',
      
      text: 'Login Successfull',
      footer: 'Ok!!'
    })
    // if (response.headers.jwt) {
    //   const token=JSON.stringify(response.headers.jwt);
    //   // console.log(token)
    //   // const AuthStr="Bearer ".concat(token)
    //   localStorage.setItem("user",token);
      
    //   console.log(response.headers.jwt)
    // }
    // console.log(response.headers.jwt);
    console.log(response.data);
    setRes(response.data);
    console.log(res)
  })
  .catch(function (error) {
    Swal.fire({
      icon: 'error',
      
      text: 'Invalid Credentials',
      footer: 'Try again !!'
    })
    

  }); 
  
  }
  if(res.id==1){
    navigate('/owner')
  }
else if(res.length!=0){
    navigate('/customer',{state:{cust_id:res.id,resp:res}})
  }

  // console.log(res)
  

  return (
    <>
    <section className="vh-100 bg-info">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark text-white" >
            <div className="card-body p-5 text-center">
  
              <div className="mb-md-5 mt-md-4 pb-5">
  
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">Please enter your login and password!</p>
  
                <div className="form-outline form-white mb-4">
                  <input type="username" id="usenameX" className="form-control form-control-lg"  autoComplete="off" 
                        onChange={(e)=>setUser(e.target.value)}
                        value={user}
                        required 
                        placeholder="Username" />
                  <label className="form-label" htmlFor="usernameX">Username</label>
                </div>
  
                <div className="form-outline form-white mb-4">
                  <input type="password" id="typePasswordX" className="form-control form-control-lg" onChange={(e)=>setPwd(e.target.value)}
                        value={pwd}
                        required 
                        placeholder="Password"/>
                  <label className="form-label" htmlFor="typePasswordX">Password</label>
                </div>
  
                {/* <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p> */}
  
                <button className="btn btn-outline-light btn-lg px-5" type="click" onClick={handleLogin}>Login</button>
  
                {/* <div className="d-flex justify-content-center text-center mt-4 pt-1">
                  <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                  <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                  <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                </div> */}
  
              </div>
  
              <div>
                <p className="mb-0">Don't have an account? <a href="/register" className="text-white-50 fw-bold">Register</a>
                </p>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
  );
}

export default Login;


