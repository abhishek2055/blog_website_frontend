import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./home.css";
import axios from "axios";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { BsBookmark, BsSend } from "react-icons/bs";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import Comments from "../components/Comments";
import CommentCard from "../components/CommentCard";
import LikeButton from "../components/LikeButton";

const Home = () => {
  const [post, setPost] = useState([]);
  const [insertId,setInsertId] = useState(10)
  const cat = useLocation().search;
  const [dataFromChild,setDataFromChild] = useState()

  const { currentUser } = useContext(AuthContext);
  const current_loginUserId = currentUser&&currentUser.id
  console.log(post,"posssssssssstttt");
  console.log(current_loginUserId,"current_loginUserId");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${cat}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  },[cat,dataFromChild]);

const likedState = (data)=>{
  setDataFromChild(data)
}
console.log(dataFromChild,"++++++++++++++");
const focusComment = ()=>{

}
  return (
    <div className="posts">
      <div className="search">
        <input
          className="search-box"
          placeholder="Search..."
          type="search"
          name=""
          id=""
        />
        <span>
          <BsSearch className="search-icon" />
        </span>
      </div>
      <h3>Recent Blogs</h3>
      {post.map((data, index) => {
        return (
          <div className="post" key={data.id}>
            <div className="post_user">
              <div className="user">
                <img src={`/dps/${data.userImg}`} alt="postman dp" />
                <h3>
                  {data.username}
                  <br /> <span>Butwal, Nepal</span>
                </h3>
              </div>
              <div className="dots">
                <BsThreeDotsVertical size={`2rem`} />
              </div>
            </div>

            <div className="image-boxx">
              <img
                src={
                  data.postImg
                    ? `/upload/${data.postImg}`
                    : "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
                }
                className="image"
                alt="post image"
              />
            </div>

            <div className="actions">
              <div className="luv_cmt_share">
                <div className="love-action">
                <LikeButton likedState={likedState} post_id={data.id} liked_uid=  {
                  data.liked_uid.split(",").map((str)=>parseInt(str)).includes(current_loginUserId)                  
                } />
              
                </div>
                <div className="comment-action">
                  <FaRegComment onClick={focusComment} size={`1.5rem`} />
                </div>
                <div className="share-action">
                  <BsSend size={`1.5rem`} />
                </div>
              </div>
              <div className="bookmark">
                <BsBookmark size={`2rem`} />
              </div>
            </div>
            <h2>{data.liked_id} likes</h2>

            <div className="post-title">
              <span>
                <b>{data.username}</b> {data.title}{" "}
              </span>
            </div>
            <div className="post-learn-more-btn">
              <Link to={`/post/${data.id}`}>
                <button className="post-learn-more">Learn More{data.id}</button>
              </Link>
            </div>

            
               {currentUser&& <Comments post_id ={data.id} currentUser={currentUser} insertId={insertId} setInsertId={setInsertId} />}
               <CommentCard insertId={insertId}  postId={data.id} />

            <div>{moment(data.date).fromNow()}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
