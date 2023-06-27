import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { AuthContext } from "../context/authContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className="nav">
      <div className="logo">
        <Link style={{ textDecoration: "none" }} to="/">
          <h4 style={{background:"none"}}>Abhi Blog</h4>
        </Link>
      </div>
      <div className="btn-links">
        <div
          onClick={() => {
            if(isMobile){
              setIsMobile(!isMobile);
            }
          }}
          className={`${isMobile ? "links-mobile" : "links"}`}
        >
          <Link className="link" to="/?cat=politics">
            <h4>Politics</h4>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h4>Technology</h4>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h4>Cinema</h4>
          </Link>
          <Link className="link" to="/?cat=food">
            <h4>Food</h4>
          </Link>
         

          {currentUser ? (
            <h4 onClick={logout}>Logout</h4>
          ) : (
            <Link className="link" to="/login">
              <h4>LOGIN</h4>
            </Link>
          )}

          <Link className="link" to={currentUser?`/write`:`/login`}>
            <h4 className="write">Write Blogs</h4>
          </Link>
          
          {currentUser && 
           <div className="login-user">
            <img src={`../../public/dps/${currentUser.img}`} alt="logged-in-user" />
             <h4 style={{fontSize:'0.4rem'}}>{currentUser.username}</h4>
           </div>
           }
        </div>
        <button onClick={() => setIsMobile(!isMobile)} className="ham-and-cut">
          {isMobile ? (
            <AiOutlineCloseCircle color="white" size={"1.5rem"} />
          ) : (
            <GiHamburgerMenu color="white" size="1.5rem" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
