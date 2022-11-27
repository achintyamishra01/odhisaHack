import React,{useState} from "react";

const Track = () => {
  var ticket,status,address,name,phone
  const [ticketId, setticketId] = useState("")
  const handleChange=(e)=>{
    if(e.target.name==="complaint_Ticket"){
      setticketId(e.target.value);
    }
  }
  const handleSubmit=async (e) => {
    e.preventDefault();
    
    const ele = { ticketId };
    console.log(ticketId)
    const res = await fetch("/api/ticketStatus", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ele),
    });
    const c = await res.json();
    console.log(c.data);
    ticket=c.data.ticketId
    status=c.data.status
    name=c.data.name
    address=c.data.address
    phone=c.data.phone
    let fetching =document.getElementById("fetching");
    console.log(fetching)
    fetching.innerHTML=`<b>${name} and ${phone} and ${address} and${ticket} and status is ${status}</b>`
  };
  return (
    <>
    <div className="form-container">
      <form className="Form">
        
        <input type="text" name="complaint_Ticket" id="complaint_Ticket" placeholder="Enter ticket id u want to track" onChange={handleChange} />
        <button onClick={handleSubmit}>Track</button>
      </form>
    </div>
    <div id ="fetching"></div>
    </>
  );
};

export default Track;
