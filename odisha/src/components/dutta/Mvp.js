import React, { useState } from "react";
import "./mvp.css";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

const Mvp = () => {
  const [result, setResult] = useState("");

  const [loader, setLoader] = useState(true);

  const [isSelected, setIsSelected] = useState(false);
  const [flag, setflag] = useState(false);
  const [name, setname] = useState("");
  const [imageUpload, setImageUpload] = useState(null);

  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");

  const changeHandler = (event) => {
    console.log(event.target.files[0]);
    setImageUpload(event.target.files[0]);

    setIsSelected(true);
  };
  const uploadFile = () => {
    console.log(imageUpload);

    if (imageUpload == null) {
      setflag(false);
      return;
    }
    let fileuuidname = `${imageUpload.name + v4()}`;
    setname(fileuuidname);
    const imageRef = ref(storage, `images/${fileuuidname}`);
    console.log(imageRef);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
    setflag(true);
  };

  const predict = () => {
    setLoader(false);

    let data = {
      name,
    };
    // const blog = { title, body, author };
    fetch("https://aef2-45-127-46-179.in.ngrok.io/dutta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(name),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <div className="parent3 ">
        <section className="left3 border-2">
          <p></p>
          <i class="fa-solid fa-arrow-down"></i>
          <input type="file" onChange={changeHandler} accept="image/"></input>

          <button onClick={uploadFile}>U P L O A D</button>

          <button onClick={predict}>Predict dish</button>
        </section>
      </div>
    </div>
  );
};

export default Mvp;
