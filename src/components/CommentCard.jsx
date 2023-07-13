import React,{useEffect, useState} from 'react'
import axios from 'axios';

const CommentCard = ({postId,insertId}) => {
    
    const [cmtData,setCmtData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const t_data = await axios.get(`http://localhost:8800/api/comment/get/${postId}`);
        setCmtData(t_data.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  },[insertId]);
  return (
    <div>
            <div className="all-post-comments">
        <div className="comment-cards">            
          {cmtData&&cmtData.map((data, idx) => {
            return (
              <div className="comment" key={idx}>
                <div className="comment-image-container">
                  <img
                    // src="https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg"
                    src={`dps/${data.img}`}
                    alt="cmnt hanni user ko dp"                    
                   />
                </div>
                <div className="comment-right-part">
                  <div className="comment-content">
                    <div className="comment-author">{data.username}</div>
                    <div className="time-of-comment">18m</div>
                  </div>    
                  <div className="comment-text">{data.comment}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default CommentCard
