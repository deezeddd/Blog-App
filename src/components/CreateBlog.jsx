import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../CreateBlog.css";
import { addBlog } from "../redux/slice/formSlice";

const CreateBlog = () => {
  const [num, setNum] = useState(0);
  const [blog, setBlog] = useState({
    title: "",
    category: "",
    content: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value; // title,content,category

    //char length
    if (e.target.name === "content") setNum(value.length);
    setBlog({ ...blog, [name]: value });
  };

  //Redux dispatch
  const existingBlogs = useSelector((state) => state.blogs);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Generating a unique ID as a string
    if (!blog.title || !blog.category || !blog.content) {
      alert("All fields are required."); 
      return;
    }
    let newBlog;
    if (existingBlogs.length > 0) {
      newBlog = { ...blog, id: existingBlogs[existingBlogs.length - 1].id + 1 };
    } else {
      newBlog = { ...blog, id: 1 };
    }
    dispatch(addBlog({ newBlog }));

    // Clear the form
    setBlog({
      title: "",
      category: "",
      content: "",
    });
    navigate("/blogs-list");
  };

  return (
    <div className="Create-Blog">
      <NavLink className="nav" to="/">
        <h1>Blog-App</h1>
      </NavLink>
      <div Style="display:flex; justify-content:space-between">
        <h1 Style="color:rgb(20, 170, 0)">Create New Blog </h1>
        <NavLink Style="text-decoration:none" to="/">
          <h2>Back</h2>
        </NavLink>
      </div>
      <form>
        <label>Title</label>
        <input
          name="title"
          value={blog.title}
          onChange={handleInput}
          required
        ></input>
        <label>Category</label>
        <input
          name="category"
          value={blog.category}
          onChange={handleInput}
          required
        ></input>
        <label>Content</label>
        <textarea
          name="content"
          value={blog.content}
          onChange={handleInput}
          rows="8"
          required
        ></textarea>
        <small>Total Char: {num}</small>
        <div Style="display: flex; justify-content:space-evenly">
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="submit-btn"
          >
            Submit
          </button>

          <Link to="/blogs-list">
            <button className="cancel-btn">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
