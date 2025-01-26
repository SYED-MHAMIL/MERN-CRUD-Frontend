
// // "use client";

// // import React, { useState, useEffect } from "react";

// // import axios from "axios";
// // import { useSearchParams } from "next/navigation";

// // const VerifyEmail = () => {

// //                      const token= useSearchParams().get('token')
// //   const [message, setMessage] = useState("");

// //   useEffect(() => {
// //     const verifyToken = async () => {
// //       if (token) {
// //         try {
// //           // Make API call to verify the token
// //           const response = await axios.post("http://localhost:4000/auth/verify-email", { token });
// //           setMessage(response.data.message);
// //           console.log("verify",response?.data);
          
// //         } catch (error) {
// //           console.error("Error verifying token:", error);
// //           setMessage("Failed to verify email.");
// //         }
// //       }
// //     };

// //     verifyToken();
// //   }, [token]);

// //   return (
// //     <div className="p-4">
// //       <h1 className="text-xl font-bold">Email Verification</h1>
// //       {message ? <p>{message}</p> : <p>Verifying...</p>}
// //     </div>
// //   );
// // };

// // export default VerifyEmail;










// "use client"; // Mark this component as a client component

// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import axios from "axios";

// const VerifyEmail = () => {
//   const [token, setToken] = useState(null);
//   const [message, setMessage] = useState("");
//   const [isExpired, setIsExpired] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

//   const searchParams = useSearchParams(); // Client-side only

//   useEffect(() => {
//     // Extract token from query params
//     const tokenFromUrl = searchParams.get("token");
//     setToken(tokenFromUrl);
//   }, [searchParams]);

//   useEffect(() => {
//     if (token && !isExpired) {
//       const verifyToken = async () => {
//         try {
//           const response = await axios.post("http://localhost:4000/auth/verify-email", { token });
//           setMessage(response.data.message || "Email verified successfully.");
//         } catch (error) {
//           setMessage("Failed to verify email.");
//           console.error("Verification error:", error);
//         }
//       };

//       verifyToken();
//     }
//   }, [token, isExpired]);

//   useEffect(() => {
//     // Timer to expire token after 1 hour
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           setIsExpired(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs.toString().padStart(2, "0")}:${mins
//       .toString()
//       .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//           Email Verification
//         </h1>
//         {!isExpired ? (
//           <>
//             <p className="text-gray-600 text-center">
//               {message || "Verifying email..."}
//             </p>
//             <p className="text-sm text-gray-500 text-center mt-4">
//               Token expires in:
//             </p>
//             <p className="text-xl font-bold text-red-600 text-center">
//               {formatTime(timeLeft)}
//             </p>
//           </>
//         ) : (
//           <p className="text-red-600 font-medium text-center">
//             Token has expired. Please request a new verification email.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VerifyEmail;
