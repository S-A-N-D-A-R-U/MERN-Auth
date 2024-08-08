// import React, { useState } from "react";
// import {Link} from "react-router-dom";

// function SignUp() {
//   const [formData, setFormData] = useState({});
//   const handleChange = (event) => {
//     setFormData({...formData, [event.target.id]: event.target.value})
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const res = await fetch('/api/auth/signup', {
//   //     method:'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify(formData)
//   //   });
//   //   const data = await res.json();
//   //   console.log(data);
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
  
//       // Check if the response status is OK (200-299)
//       if (!res.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       // Attempt to parse JSON, but handle the case where the body might be empty
//       const text = await res.text();
//       console.log(text)
//       const data = text ? JSON.parse(text) : {};
  
//       console.log(data);
//     } catch (error) {
//       console.error('There was an error with the fetch operation:', error);
//     }
//   };
  
//   return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl text-center font-semibold my-7 ">Sign UP</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           placeholder="Username"
//           id="username"
//           className="bg-slate-100 p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           id="email"
//           className="bg-slate-100 p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           id="password"
//           className="bg-slate-100 p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">Sign up</button>
//       </form>
//       <div className="flex gap-2 mt-5">
//       <p>Have an acoount?</p>
//       <Link to ='/sign-in'>
//       <span className="text-blue-500">Sign in</span>
//       </Link>
      
//       </div>
      
//     </div>
//   );
// }

// export default SignUp;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      const res = await axios.post('http://localhost:3000/api/auth/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      // The response data is automatically parsed as JSON by Axios
      console.log(res.data);
    } catch (error) {
      setLoading(true);
      setError(true);
      console.error('There was an error with the sign-up operation:', error);
      // Optionally, you can handle different error scenarios here
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response error:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request error:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign UP</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
          {loading ? 'Loading..' : 'Sign Up'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5 ">{error && "Something went wrong!"}</p>
    </div>
  );
}

export default SignUp;
