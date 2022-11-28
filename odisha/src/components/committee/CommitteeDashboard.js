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

  async function resolveGovComplaints(ticketId) {
    console.log(ticketId);
    let tId = { ticketId };
    const res = await fetch("/api/resolveGovComplaints", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tId),
    });
    const d = await res.json();
    console.log(d);
    if (d.success) {
      console.log("reloading");
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
  }
  async function resolveGovComplaints(ticketId) {
    console.log(ticketId);
    let tId = { ticketId };
    const res = await fetch("/api/resolveGovComplaints", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tId),
    });
    const d = await res.json();
    console.log(d);
    if (d.success) {
      console.log("reloading");
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
  }
  const logout = async () => {
    localStorage.removeItem("committee");
    window.location.reload();
  };
  const renderList = data1.map((item, index) => (
    <tr>
      <td className="trackd">{item.ticketId}</td>
      <td className="trackd">{item.municipality}</td>
      <td className="trackd">{item.name}</td>
      <td className="trackd">{item.phone}</td>
      <td className="trackd">
        <button
          className="resbut"
          onClick={() => resolveGovComplaints(item.ticketId)}
        >
          Yes?
        </button>
      </td>
    </tr>
  ));

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    // console.log(index);
    setToggleState(index);
  };

  return (
    <>
      <div>
        <div id="gchead">
          <a href="/">
            <img src={require("../../Assets/logo.png")} alt="" />
          </a>
          <div>
            <h2>Governing Committee Dashboard</h2>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
        <div id="notelse">
          <div className="container">
            {/* <h2>
          <u>Industry Complaint :</u>
        </h2> */}
            <div className="bloc-tabs">
              <button
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
                id="bon1"
              >
                <u>
                  <b>Civilian Complaints</b>
                </u>
              </button>
              <button
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2)}
                id="bon2"
              >
                <u>
                  <b>Industry Complaints</b>
                </u>
              </button>
              <button
                className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(3)}
                id="bon3"
              >
                <u>
                  <b>Industry Complaints</b>
                </u>
              </button>
            </div>
            <div className="content-tabs">
              <div
                className={
                  toggleState === 1 ? "content  active-content" : "content"
                }
              >
                {data1.length !== 0 && (
                  <div id="Gov_complaints">
                    <table id="tabtab">
                      {/* {item.name} {item.address} */}
                      <tr>
                        <th class="trackh">TicketID</th>
                        <th class="trackh">Municipality</th>
                        <th class="trackh">Complainee</th>
                        <th class="trackh">Phone</th>
                        <th class="trackh">Resolution</th>
                      </tr>
                      {renderList}
                    </table>
                  </div>
                )}
                {data1.length === 0 && (
                  <div id="complaints1">No complaints so far!!</div>
                )}
              </div>
              <div
                className={
                  toggleState === 2 ? "content  active-content" : "content"
                }
              >
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
                nam ullam, incidunt iste illum consequatur aliquam laboriosam,
                reprehenderit quia dolor mollitia architecto nesciunt, quasi
                veniam similique sequi vel cupiditate sapiente?
              </div>
              <div
                className={
                  toggleState === 3 ? "content  active-content" : "content"
                }
              >
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
                nam ullam, incidunt iste illum consequatur aliquam laboriosam,
                reprehenderit quia dolor mollitia architecto nesciunt, quasi
                veniam similique sequi vel cupiditate sapiente?
              </div>
            </div>
          </div>
        </div>
      </div>
      {data1.length === 0 && <div id="complaints1">No complaints so far!!</div>}
    </>
  );
};

export default CommitteelDashboard;
