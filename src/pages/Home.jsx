import React, { useEffect,useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './home.css'
import axios from 'axios';
import {BsSearch,BsThreeDotsVertical} from 'react-icons/bs'
import {AiOutlineHeart,AiTwotoneHeart} from 'react-icons/ai'
 import {FaRegComment} from 'react-icons/fa'
 import { BsBookmark,BsSend } from 'react-icons/bs'
import moment from 'moment';

const Home = () => {
  const [post,setPost] = useState([]);
  console.log(post);
  const cat = useLocation().search;
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get(`http://localhost:8800/api/posts/${cat}`);
        setPost(res.data);
        
      } catch(error){
        console.log(error);
      }
    }
    fetchData();
  },[cat])



  // const post = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet consectetur",
  //     description: "Lorem Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur",
  //     img: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet consectetur",
  //     description: "Lorem Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur",
  //     img: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit amet consectetur",
  //     description: "Lorem Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur",
  //     img: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor sit amet consectetur",
  //     description: "Lorem Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur",
  //     img: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //   },
  //   {
  //     id: 5,
  //     title: "Lorem ipsum dolor sit amet consectetur",
  //     description: "Lorem Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur",
  //     img: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //   },
  //   {
  //     id: 6,
  //     title: "Lorem ipsum dolor sit amet consectetur",
  //     description: "Lorem Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur",
  //     img: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //   },
  //   {
  //     id: 7,
  //     title: "Lorem ipsum dolor sit amet consectetur",
  //     description: "Lorem Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur",
  //     img: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //   },
  // ]
  return (
    
      <div className="posts">
        <div className="search">
           <input className='search-box' placeholder='Search...' type="search" name="" id="" />
           <span><BsSearch className='search-icon' /></span>
        </div>
        <h3>Recent Blogs</h3>
        {
          post.map((data, index) => {
            return (
              <div className="post" key={index}>

                <div className="post_user">
                  <div className="user">
                    <img src={`/dps/${data.userImg}`} alt="postman dp" />
                    <h3>{data.username}<br /> <span>Butwal, Nepal</span></h3>
                  </div>
                  <div className="dots">
                  <BsThreeDotsVertical size={`2rem`} />
                  </div>
                </div> 


                    <div className="image-boxx">
                      <img
                       src={data.postImg ? `/upload/${data.postImg}`:"https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"}
                       className='image'
                       alt="post image" />
                    </div>

                    <div className='actions'>
                      <div className="luv_cmt_share">
                        <div className="love-action">
                          <AiOutlineHeart size={`1.9rem`} />
                        </div>
                        <div className="comment-action">
                          <FaRegComment size={`1.5rem`}/>
                        </div>
                        <div className="share-action">
                          <BsSend size={`1.5rem`}/>
                        </div>
                      </div>
                      <div className="bookmark">
                        <BsBookmark size={`2rem`}/>
                      </div>
                    </div>
                    <h2>2,324 likes</h2>

                    <div className='post-title'>
                      <span><b>{data.username}</b> {data.title} </span>
                    </div>
                    <div className="post-learn-more-btn">
                    <Link to={`/post/${data.id}`}>
                      <button className='post-learn-more'>Learn More</button>
                    </Link>
                    </div>
                    <div>comment sections</div>
                    <div>{moment(data.date).fromNow()}</div>


              </div>
            )
          })
        }
      </div>

    
  )
}

export default Home
