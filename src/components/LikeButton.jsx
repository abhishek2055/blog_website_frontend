import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { AuthContext } from "../context/authContext";

const LikeButton = ({ post_id,liked_uid,likedState }) => {
  const [liked, setLiked] = useState(liked_uid);
  const [changeState,setChangeState] = useState(1);
  const { currentUser } = useContext(AuthContext);
  const curr_id = currentUser && currentUser.id;

  const handleLike =  async () => {
    setChangeState(changeState=>changeState+1)
    await setLiked(!liked);
    likedState(changeState)

      if (!liked) {
          await axios.post(`http://localhost:8800/api/likes/add`, {
          curr_id,
          post_id,
        });
      } 
      else {
        await axios.delete(`http://localhost:8800/api/likes/delete`, {
        data: {
          curr_id,
          post_id,
        },
      });
      }
  };

  return (
    <div>
      {!liked ? (
        <AiOutlineHeart onClick={handleLike} size={`1.9rem`} />
      ) : (
        <AiTwotoneHeart onClick={handleLike} size={`1.9rem`} />
      )}
    </div>
  );
};

export default LikeButton;
