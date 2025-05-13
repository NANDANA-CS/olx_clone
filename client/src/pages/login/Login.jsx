// import React from 'react';

// const Login = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
//       <div className="bg-white w-full max-w-md rounded-md shadow-md p-6">
//         <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">
//           Help us become one of the safest places to buy and sell
//         </h1>

//         <div className="mb-4">
//           <button
//             className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-50 transition"
//           >
//             <img
//               src="/images/transparent-google-logo-google-logo-with-colorful-letters-on-black-1710875297222.webp"
//               alt="Google Icon"
//               className="w-5 h-5"
//             />
//             Continue with Google
//           </button>
//         </div>

//         <div className="flex items-center my-6">
        
//           <span className="mx-50 text-md text-black-500">OR</span>

//         </div>

//         <div className="mb-4 text-center">
//           <button className="text-black-600 underline underline-offset-4 decoration-2 hover:no-underline text-lg font-medium">
//             Login with Email
//           </button>
//         </div>

//         <div className="text-center text-sm text-gray-600 mb-4">
//           <p className="mb-1">All your personal details are safe with us</p>
//           <p>
//             If you continue, you are accepting{' '}
//             <span className="text-blue-600 cursor-pointer hover:underline">
//               OLX Terms and Conditions
//             </span>{' '}
//             and{' '}
//             <span className="text-blue-600 cursor-pointer hover:underline">
//               Privacy Policy
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="underline underline-offset-4 decoration-3 text-xl hover:no-underline" onClick={() => loginWithRedirect()}>Login</button>;
};

export default LoginButton;