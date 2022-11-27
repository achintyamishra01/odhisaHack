import React,{useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";

const MunicipalDashboard = () => {
    const [first, setfirst] = useState(second)
    const navigate = useNavigate();
    useEffect(() => {
      if(!localStorage.getItem("municipal")){
        navigate("/municipal")
      }
      fetchComplaints()
   
    }, [])
    
    const fetchComplaints=async()=>{
        const d=localStorage.getItem("municipal");
        const municipal={d};
        const res = await fetch("/api/fetchComplaints", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(municipal),
          });
          const c=await res.json();
          console.log(c.data)
          if(c.success){
            document.getElementById("complaints").innerHTML
          }
          else{
            alert("something went wrong")
          }
    }
  return (
    <>
    <div id='complaints'>M</div>
    </>
  )
}

export default MunicipalDashboard