import React,{useState,useEffect} from 'react'
import axios from 'axios';

const post = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet consectetur",
      description:
        "Lorem Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur",
      img: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet consectetur",
      description:
        "Lorem Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur",
      img: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet consectetur",
      description:
        "Lorem Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur",
      img: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet consectetur",
      description:
        "Lorem Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur",
      img: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 5,
      title: "Lorem ipsum dolor sit amet consectetur",
      description:
        "Lorem Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur",
      img: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

const Menu = ({cat}) => {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/?cat=${cat}`);
        setPosts(res.data)
        console.log(posts,"----------postssssssss");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat]);
  return (
    <div>
        <h2>Other posts you may like</h2>
        {posts.map((data, index) => {
          return (
            <div className="right_card" key={index}>
              <img
                src="https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg"
                alt=""
              />
              <p style={{ fontWeight: "bold", padding: "2px" }}>{data.title}</p>
              <button>Read More</button>
            </div>
          );
        })}
    </div>
  )
}

export default Menu
