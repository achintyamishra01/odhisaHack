import React, { useState } from 'react'

function Industry() {

  const [issue,setIssue] = useState("");
  const [industry_name,setIndustry_name] = useState("");
  const [locality,setLocality] = useState("");
  const [pincode,setPincode] = useState("");
  const [image,setImage] = useState("");

  const handleSubmit = () => {

  };

  const handleChange = () => {
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Issue</label>
        <textarea type='text' />
      </form>
    </div>
  )
}

export default Industry