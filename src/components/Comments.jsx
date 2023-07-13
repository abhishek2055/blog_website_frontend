import React,{ useEffect, useState,useRef} from "react";
import './comments.css'
import axios from "axios";

const Comments = ({ currentUser,post_id,getData,setInsertId}) => {
  const [comment,setComment] = useState()
    const curr_uid = currentUser.id;
  const handleCommentChange = (e)=>{
    setComment(e.target.value);

  }
  const commentInputRef = useRef(null);

  const handleCommentSubmit = async (e)=>{
    const res = await axios.post("http://localhost:8800/api/comment/add",{
      comment,
      curr_uid,
      post_id
    })
    setInsertId(res.data.insertId)
    setComment("")
    

  }
  return (
    <div className="comment-section">

      <div className="user-add-comment-box">
        <img
          src={`/dps/${currentUser.img}`}
          alt=""
          className="login-user-profile"
        />
        <input
        ref={commentInputRef}
          type="text"
          className="add-comment-box"
          placeholder="Add a Comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <button className="post-comment" onClick={handleCommentSubmit} >post</button>
      </div>
    </div>
  );
};

export default Comments;
