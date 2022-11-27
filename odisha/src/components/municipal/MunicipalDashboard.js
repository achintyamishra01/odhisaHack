import React,{useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";

const MunicipalDashboard = () => {
    const [data1, setdata1] = useState([])
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
          
          if(c.success){
            console.log(c.data)
            setdata1(c.data);
            
          }
          else{
            alert("something went wrong")
          }
        
    }
    
    const renderList = data1.map((item, index) => (
        
        <p>
            {item.name}  {item.address}
            
        </p>
      ));
  return (
    <>
    <div id='complaints'>{renderList}</div>
    </>
  )
}

export default MunicipalDashboard