import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../BlogsList.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../redux/slice/formSlice";
import { useLikeContext } from "../context/Like";

const BlogsList = () => {
  const [blogRecord, setBlogRecord] = useState([]);
  // const existingBlogs = JSON.parse(localStorage.getItem("key")) || [];
  const existingBlogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const { likes, toggleLike } = useLikeContext();

  // let isLiked = likes[id] || false;
  const handleLikeClick = (id) => {
    toggleLike(id);
  };

  useEffect(() => {
    const blogs = [...existingBlogs];
    setBlogRecord(blogs);
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
  };

  const count = blogRecord.length;

  return (
    <div className="list">
      <h1>
        <NavLink className="nav" to="/">
          Blog-App
        </NavLink>
      </h1>
      <div Style="display:flex; justify-content:space-between">
        <h1 Style="color:brown">Blogs ({count})</h1>
        <NavLink Style="text-decoration:none" to="/">
          <h2>Back</h2>
        </NavLink>
      </div>
      <div className="border-custom">
        {count === 0 ? (
          <h1>No Blog Available</h1>
        ) : (
          <>
            {blogRecord.map((blog) => (
              <div
                className="blog-list"
                Style="display:flex; justify-content:space-between"
                key={blog.id}
              >
                <NavLink className="blog-name" to={`/blog/${blog.id}`}>
                  {blog.title}
                </NavLink>
                {likes[blog.id] ? (
                    <FaHeart
                      Style="margin-top:100px;"
                      onClick={(id)=>handleLikeClick(blog.id)}
                    />
                  ) : (
                    <FaRegHeart onClick={(id)=>handleLikeClick(blog.id)} />
                  )}
                {/* <div Style="width: 32%;display:flex; justify-content:flex-end"> */}
                  
                  <NavLink className="edit-button" to={`/edit-blog/${blog.id}`}>
                    Edit
                  </NavLink>
                {/* </div> */}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogsList;
