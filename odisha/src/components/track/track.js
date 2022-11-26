import React from "react";

const track = () => {
  return (
    <div>
      <form action="/" method="get">
        <label htmlFor="complaint_Ticket"> Enter the Ticket ID</label>
        <input type="text" name="complaint_Ticket" id="complaint_Ticket" />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default track;
