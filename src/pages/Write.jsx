import axios from "axios";
import "./write.css";
import React, { useState,useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation , useNavigate } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Write = () => {

  const state = useLocation().state;
  const [description,setDescription] = useState(state?state.description:"");
  const [title,setTitle] = useState(state?state.title:"");
  const [file,setFile] = useState(null);
  const [category,setCategory] = useState(state?state.cat:"")
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext)
  console.log("state",category);

  const upload = async ()=>{
    if(file){

      try{
        const formData = new FormData()
        formData.append("file",file);
        const res = await axios.post("http://localhost:8800/upload",formData);
        return res.data;
      }catch(error){
        console.log(error);
      }
    }
    
  }
  const handleClick = async (e)=>{       

    const plainText = document.createElement('div');
    plainText.innerHTML = description;
    const text = plainText.textContent || plainText.innerText;

    const userId = currentUser.id;
    console.log(currentUser);
    e.preventDefault()
   const imgUrl =await upload();
    try{
      state ? await axios.put(`http://localhost:8800/api/posts/${state.id}`,{
        title,
        description:text,
        cat : category,
        img: file ? imgUrl : ""
      }) 
      : await axios.post(`http://localhost:8800/api/posts`,{
        title,
        description:text,
        cat:category,
        userId,
        img: file ? imgUrl : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      }) 
      navigate('/');
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div className="write_container">
      <div className="input_area">
        <label htmlFor="title">Write title</label>
        <div className="category_input">
          <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
        </div>
        <div className="editorContainer">
          <label htmlFor="description">Write description</label>
          <ReactQuill
            theme="snow"
            className="editor"
            value={description}
            onChange={setDescription}
          />
        </div>
      </div>
      <div className="publish_category_container">
      <div className="category">
          <h1>Category</h1>
          <div>
            <input type="radio" checked={category==='politics'} name="category" value="politics" id="politics" onChange={(e)=>setCategory(e.target.value)} />
            <label htmlFor="science">Politics</label>
          </div>
          <div>
            <input type="radio" checked={category==='technology'}  name="category" value="technology" id="technology" onChange={(e)=>setCategory(e.target.value)} />
            <label htmlFor="technology">Technology</label>
          </div>
          <div>
            <input type="radio" checked={category==='cinema'} name="category" value="cinema" id="cinema" onChange={(e)=>setCategory(e.target.value)} />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div>
            <input type="radio" name="category" id="food" checked={category==='food'} value="food" onChange={(e)=>setCategory(e.target.value)} />
            <label htmlFor="food">Food</label>
          </div>
        </div>
        <div className="publish">
          <h1>Publish</h1>
          <div className="status">
            <b>Status:</b>
            <span>Draft</span>
          </div>
          <div className="visibility">
            <b>Visibility:</b>
            <span>true</span>
          </div>
          <div className="image">
            <input style={{ display: "none" }} type="file" id="file" name="" onChange={(e)=>{
             
             setFile(e.target.files[0])
              
            }} />
            <label
              style={{ textDecoration: "underline", cursor: "pointer" }}
              htmlFor="file"
            >
              upload image
            </label>
          </div>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
