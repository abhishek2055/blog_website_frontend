import React, { useContext, useEffect, useState } from "react";
import "./single.css";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";


const Single = () => {
  const [posti, setPosti] = useState([]);
  const navigate = useNavigate()
  const location = useLocation();
  const pid = location.pathname.split("/")[2];
  const {currentUser} = useContext(AuthContext)
  console.log("-------posti-------------",posti);
  console.log(location);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${pid}`);
        setPosti(res.data)

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [pid]);

  const handleDelete = async()=>{
    const userId = currentUser.id;
    try{
     {userId&& await axios.delete(`http://localhost:8800/api/posts/${pid}/${userId}`);}
     {!userId&& await axios.delete(`http://localhost:8800/api/posts/${pid}`);}
      navigate("/")
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div className="single">
      <div className="contentLeft"> 
         <img
          // src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
          src={`/upload/${posti.postImg}`}
          alt=""
        />
       <div className="postLeft">
          <img
            src={`/dps/${posti.userImg}`}
            alt=""
          />
          <div className="posted_by">
            <p style={{ fontSize: "22px", fontWeight: "bold" }}>{posti.username}</p>
            <p style={{ fontWeight: "bold" }}>Posted {moment(posti.date).fromNow()}</p>
          </div>

         {currentUser&&currentUser.id===posti.uid && <span className="edit_btn">
         <Link to={`/write?edit=${posti.id}`} state={posti}>

            <AiOutlineEdit size={25} />
           </Link>

          </span>}

          {currentUser&&currentUser.id===posti.uid&&<span className="delete_btn">
              <MdDeleteOutline size={25} onClick={handleDelete} />
          </span>}
        </div>

        <h1>
          {posti.title}
        </h1>
        <p
          style={{
            lineHeight: "30px",
            textAlign: "justify",
            marginTop: "1rem",
            fontSize: "18px",
          }}
        >
          {posti.description}
        </p>

        <h1></h1>
      </div>
      <div className="menu">
          <Menu cat = {posti.cat}/>
      </div>
    </div>
  );
};

export default Single;
