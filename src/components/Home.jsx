import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import '../App.css';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { setBlogs } from "../redux/slice/formSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const Blogs = JSON.stringify(useSelector((state) => state.blogs));
  const dispatch = useDispatch();


  return (
    <div className="Home">
      <h1 className="app-heading" Style="margin-top: 0px">Blog-App</h1>
      <div className="App" Style="display: flex; justify-content:space-evenly">
         <NavLink to="blogs-list" Style="text-decoration:none">
        <div className="categoryWrapper">
          <h1>Read <br></br> Blogs</h1>
        </div>
         </NavLink>
         <NavLink to="create-blog" Style="text-decoration:none">
        <div className="categoryWrapper">
          <h1>Create <br></br> Blog</h1>
        </div>
         </NavLink>
      </div>
    </div>
  );

};

export default Home;
