import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../Blog.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useContext } from "react";
import { useLikeContext } from "../context/Like";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog } from "../redux/slice/formSlice";


const Blog = () => {
  const { id } = useParams();
  const { likes, toggleLike } = useLikeContext();
  const isLiked = likes[id] || false;

  const handleLikeClick = () => {
    toggleLike(id);
  };

  const blogs = useSelector((state) => state.blogs);
  const existingBlog = blogs.find((f) => f.id == id);
  const { title, category, content } = existingBlog;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
    navigate('/blogs-list')

  };
  return (
    <div>
      <div className="Create-Blog">
        <NavLink className="nav" to="/">
          <h1>Blog-App</h1>
        </NavLink>
        <div Style="display:flex; justify-content:space-between">
          <h1 Style="font-size:20px ;color:rgb(20, 170, 0) ;margin-left:47%">
            {title}{" "}
            {isLiked ? (
              <FaHeart
                Style="margin-top:300px;"
                onClick={handleLikeClick}
              />
            ) : (
              <FaRegHeart onClick={handleLikeClick} />
            )}
          </h1>

          <NavLink Style="text-decoration:none" to="/blogs-list">
            <h2>Back</h2>
          </NavLink>
        </div>
        {/* <small>Date</small> */}
        <h3>
          Category: <span Style="color: grey">{category}</span>
        </h3>
        <div Style="width:20%;display:flex; margin-bottom:5px; color:blue">
          <NavLink className="edit-button" to={`/edit-blog/${id}`}>
            Edit
          </NavLink>
          <button className="btn-delete" onClick={() => handleDelete(id)}>
            Delete
          </button>
        </div>
        <div className="content">
          <h3>{content}</h3>
        </div>
        <footer className="footer">End</footer>
      </div>
    </div>
  );
};

export default Blog;
