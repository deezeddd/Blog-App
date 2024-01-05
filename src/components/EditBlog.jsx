import React, { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../CreateBlog.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editBlog } from "../redux/slice/formSlice";
const EditBlog = () => {
  //fetching values of user
  const { id } = useParams();
  const blogs = useSelector((state) => state.blogs);

  const existingBlog = blogs.find((f) => f.id == id);
  const { title, category, content } = existingBlog;

  const [num, setNum] = useState(content.length);
  const [blog, setBlog] = useState({
    title: title,
    category: category,
    content: content,
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (e.target.name === "content") setNum(value.length); //character count
    setBlog({ ...blog, [name]: value });
  };

 

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleEdit = (e) => {
    e.preventDefault(); //prevents form from submitting
    if (!blog.title || !blog.category || !blog.content) {
      alert("All fields are required.");
      return;
    }
    dispatch(
      editBlog({
        id: id,
        editedBlog: {
          title: blog.title,
          category: blog.category,
          content: blog.content,
        },
      })
    );
    navigate("/blogs-list");
  };

  return (
    <div className="Create-Blog">
      <NavLink className="nav" to="/">
        <h1>Blog-App</h1>
      </NavLink>
      <div Style="display:flex; justify-content:space-between">
        <h1 Style="color:red">Edit Blog </h1>
        <NavLink Style="text-decoration:none" to="/blogs-list">
          <h2>Back</h2>
        </NavLink>
      </div>
      <form>
        <label>Title</label>
        <input
          required
          name="title"
          value={blog.title}
          onChange={handleInput}
        ></input>
        <label>Category</label>
        <input
        required
          name="category"
          value={blog.category}
          onChange={handleInput}
        ></input>
        <label>Content</label>
        <textarea
        required
          name="content"
          value={blog.content}
          onChange={handleInput}
          rows="8"
        ></textarea>
        <small>Total Char: {num}</small>
        <div Style="display: flex; justify-content:space-evenly">
          <button
            type="submit"
            onClick={(e) => handleEdit(e)}
            className="edit-btn"
          >
            Edit
          </button>

          <Link to="/blogs-list">
            <button className="cancel-btn">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
