"use client"
import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { v4 as uuidv4 } from 'uuid';
import {toast} from 'react-toastify'
import Link from 'next/link'
import { ApiRoutes } from "../constant/url.js";
import axios from 'axios'
import DelButton from "../../components/buttun.jsx";






const Dashboard = () => {
  const [metrics, setMetrics] = useState({ dailyVisitors: 0, newBeneficiaries: 0, returningBeneficiaries: 0, departmentActivity: {} });
  const [searchTerm, setSearchTerm] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const [beneficaryData, setBeneficaryData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

const getAllBeneficary=async()=>{
     
  try {

  const data=  await axios.get(ApiRoutes.beneficary)
    setBeneficaryData(data?.data?.data)
    
   
    
  } catch (error) {
    toast.error(error)
  }

}


//  deparment countwork  . . . . . .
const departmentCount = beneficaryData.reduce((acc, person) => {
  if (person.history && person.history.length > 0) {
    // Extract unique departments for this person
    const uniqueDepartments = new Set(person.history.map(entry => entry.department)); 
    // Increase count for each unique department
    uniqueDepartments.forEach(dept => {
      acc[dept] = (acc[dept] || 0) + 1;
    });
  }
  return acc;
}, {});












const returningBeneficiariesSet = new Set();
beneficaryData.forEach((person) => {
  if (person.history && person.history.length > 2) {
    returningBeneficiariesSet.add(person._id);  // Assuming `_id` is unique for each person
  }
});
const returningBeneficiariesCount = returningBeneficiariesSet.size;




  useEffect(() => {
    let mounteed=true
    if (mounteed) {
      fetchMetrics();
    }

  return()=>{
    mounteed=false
  }

  }, [beneficaryData]);


  useEffect(()=>{
  getAllBeneficary()
  },[])

  const fetchMetrics = async () => {
    try {
      // Fetching mock data for now
      const data = {
        dailyVisitors:beneficaryData?.length,
        newBeneficiaries: beneficaryData?.length,
        returningBeneficiaries: returningBeneficiariesCount,
        departmentActivity: {
          Medical: departmentCount["financial aid"],
          Financial: departmentCount["medical assistance"],
          IT: 30,
        },
      };
      setMetrics(data);
    } catch (error) {
      console.error("Error fetching metrics", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/beneficiaries/cnic/${searchTerm}`);
      if (!response.ok) throw new Error("Beneficiary not found");
      const data = await response.json();
      setSearchResults([data]);
    } catch (error) {
      setSearchResults([]);
      console.error("Error fetching beneficiary", error);
    }
  };

  const barData = {
    labels: Object.keys(metrics.departmentActivity),
    datasets: [
      {
        label: "Department Activity",
        data: Object.values(metrics.departmentActivity),
        backgroundColor: ["#3f51b5", "#e91e63", "#ff9800"],
      },
    ],
  };

  const pieData = {
    labels: ["New Beneficiaries", "Returning Beneficiaries"],
    datasets: [
      {
        data: [metrics.newBeneficiaries, metrics.returningBeneficiaries],
        backgroundColor: ["#4caf50", "#ff5722"],
      },
    ],
  };

  return (
   <div className="mb-10">
     <Container>
   <Typography variant="h4" gutterBottom>
     Admin Dashboard
   </Typography>
   <Grid container spacing={3}>
     <Grid item xs={12} sm={4}>
       <Card>
         <CardContent>
           <Typography variant="h6">Daily Visitors</Typography>
           <Typography variant="h4">{metrics.dailyVisitors}</Typography>
         </CardContent>
       </Card>
     </Grid>
     <Grid item xs={12} sm={4}>
       <Card>
         <CardContent>
           <Typography variant="h6">New Beneficiaries</Typography>
           <Typography variant="h4">{metrics.newBeneficiaries}</Typography>
         </CardContent>
       </Card>
     </Grid>
     <Grid item xs={12} sm={4}>
       <Card>
         <CardContent>
           <Typography variant="h6">Returning Beneficiaries</Typography>
           <Typography variant="h4">{metrics.returningBeneficiaries}</Typography>
         </CardContent>
       </Card>
     </Grid>
   </Grid>
   <Grid container spacing={3} style={{ marginTop: 20 }}>
     <Grid item xs={12} md={6}>
       <Bar data={barData} />
     </Grid>
     <Grid item xs={12} md={6}>
       <Pie data={pieData} />
     </Grid>
   </Grid>
   <TextField
     label="Search by  Name & CNIC"
     variant="outlined"
     fullWidth
     margin="normal"
     value={searchTerm}
     onChange={(e) => setSearchTerm(e.target.value)}
     onKeyDown={(e) => e.key === "Enter" && handleSearch()}
   />
   <TableContainer component={Paper}>
     <Table>
       <TableHead>
         <TableRow className="text-xl">
           <TableCell>CNIC</TableCell>
           <TableCell>Name</TableCell>
           <TableCell>Email </TableCell>
           <TableCell>Address</TableCell>
           <TableCell>Purpose</TableCell>
           <TableCell>History</TableCell>
           <TableCell>action</TableCell>
           

         </TableRow>
       </TableHead>
       <TableBody className="mb-10">
         {beneficaryData.length >  0  && beneficaryData.filter(user =>{
     
          return user.name.toLowerCase().includes(searchTerm.toLowerCase())  ||
            user.cnic.toLowerCase().includes(searchTerm.toLowerCase())
      
           
           })
           .map((beneficiary,i) => (
           <TableRow key={uuidv4() +i}>
             <TableCell>{beneficiary.cnic}</TableCell>
             <TableCell>{beneficiary.name}</TableCell>
             <TableCell>{beneficiary.email}</TableCell>
             <TableCell>{beneficiary.address}</TableCell>
             <TableCell>{beneficiary.purpose}</TableCell>
             <TableCell>
               {beneficiary.history?.map((data)=>{

                 return  <ul key={uuidv4()}>
                    <li>{new Date(data.date).toLocaleString()}</li>
                 </ul>
                 
             })

}
             </TableCell>
             <TableCell>
 
           <div className="flex gap-3 text-white">
             <Link href={`/admin/edituser/${beneficiary._id}`}><button className="bg-green-500 hover:bg-green-500 px-3 py-2 rounded-md" >edit</button>  
             </Link>
             <DelButton id={beneficiary._id} />
           </div>

           <Link href="/admin/add">
         <button
           type="button"
           className="flex items-center fixed z-10 bottom-2 right-0 m-2 rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-lg font-medium uppercase leading-normal text-neutral-50 shadow-lg transition-all duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-md focus:bg-neutral-700 focus:shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-600 active:bg-neutral-900 active:shadow-md motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-lg dark:focus:shadow-lg dark:active:shadow-lg"
         >
           Add <span className="ml-2 text-2xl font-bold">+</span>
         </button>
       </Link>
             </TableCell>

           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
 </Container></div>
  );
};

export default Dashboard;
