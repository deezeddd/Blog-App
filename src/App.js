import "./App.css";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import BlogsList from "./components/BlogsList";
import CreateBlog from "./components/CreateBlog";
import Blog from "./components/Blog";
import EditBlog from "./components/EditBlog";
import { LikeProvider } from "./context/Like";
import { Provider } from "react-redux";
import { store } from "./redux/store";
function App() {
  return (
    <LikeProvider>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="blogs-list" element={<BlogsList />} />
          <Route path="create-blog" element={<CreateBlog />} />
          <Route path="edit-blog/:id" element={<EditBlog />} />
          <Route path="blog/:id" element={<Blog />} />
        </Routes>
      </Provider>
    </LikeProvider>
  );
}

export default App;
