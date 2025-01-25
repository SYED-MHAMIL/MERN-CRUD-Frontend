
// "use client";

// import React, { useState, useEffect } from "react";

// import axios from "axios";
// import { useSearchParams } from "next/navigation";

// const VerifyEmail = () => {

//                      const token= useSearchParams().get('token')
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const verifyToken = async () => {
//       if (token) {
//         try {
//           // Make API call to verify the token
//           const response = await axios.post("http://localhost:4000/auth/verify-email", { token });
//           setMessage(response.data.message);
//           console.log("verify",response?.data);
          
//         } catch (error) {
//           console.error("Error verifying token:", error);
//           setMessage("Failed to verify email.");
//         }
//       }
//     };

//     verifyToken();
//   }, [token]);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold">Email Verification</h1>
//       {message ? <p>{message}</p> : <p>Verifying...</p>}
//     </div>
//   );
// };

// export default VerifyEmail;


























"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const VerifyEmail = () => {
  const token = useSearchParams().get("token");
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds (3600 seconds)
  const [isExpired, setIsExpired] = useState(false);

  // Start the timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          clearInterval(timer); // Stop the timer when it hits zero
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time (hh:mm:ss)
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const verifyToken = async () => {
      if (token && !isExpired) {
        try {
          const response = await axios.post("http://localhost:4000/auth/verify-email", { token });
          setMessage(response.data.message);
        } catch (error) {
          console.error("Error verifying token:", error);
          setMessage("Failed to verify email.");
        }
      }
    };

    verifyToken();
  }, [token, isExpired]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Email Verification
        </h1>
        {!isExpired ? (
          <>
            {message ? (
              <p className="text-green-600 font-medium text-center">{message}</p>
            ) : (
              <p className="text-gray-600 text-center">Verifying...</p>
            )}
            <div className="mt-4">
              <p className="text-sm text-gray-500 text-center">
                Token expires in:
              </p>
              <p className="text-xl font-bold text-red-600 text-center">
                {formatTime(timeLeft)}
              </p>
            </div>
          </>
        ) : (
          <p className="text-red-600 font-medium text-center">
            The token has expired. Please request a new verification email.
          </p>
        )}
         
<button className="rounded-md bg-blue-500 hover:bg-blue-600 text-center px-2 py-2 " onClick={()=>{

}}>Go home page</button>
      </div>
    </div>
  );
};

export default VerifyEmail;
