import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../complain/complain.css";

const CommitteelDashboard = () => {
  const [data1, setdata1] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("committee")) {
      navigate("/committee");
    }
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const res = await fetch("/api/fetchGovComplaints", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    const c = await res.json();

    if (c.data) {
      console.log(c.data);
      setdata1(c.data);
    } else {
      document.getElementById("Gov_complaints").innerHTML =
        "No complaints so far!!!";
    }
  };

  async function resolveGovComplaints(ticketId){
    console.log(ticketId)
    let tId={ticketId}
    const res = await fetch("/api/resolveGovComplaints", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body:JSON.stringify(tId)
    });
    const d=await res.json();
    console.log(d)
    if(d.success){
      console.log("reloading")
      window.location.reload();
    }
    else{
      alert("Something went wrong")
    }

  }

  const renderList = data1.map((item, index) => (
    <tr>
      <td className="trackd">{item.ticketId}</td>
      <td className="trackd">{item.municipality}</td>
      <td className="trackd">{item.name}</td>
      <td className="trackd">{item.phone}</td>
      <td className="trackd">
      <button className="resbut" onClick={()=>resolveGovComplaints(item.ticketId)}>Yes?</button>
      </td>
    </tr>
  ));
  return (
    <>
    <div>
      {renderList}
    </div>
    {
          data1.length===0 && <div id ="complaints1">No complaints so far!!</div>
        }
    </>
  );
};

export default CommitteelDashboard;
