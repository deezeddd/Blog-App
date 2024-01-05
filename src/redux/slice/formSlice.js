import { createSlice } from "@reduxjs/toolkit";

export const initialState = [
  {
    title: "Working in Himalayas",
    category: "Work",
    content:
      "Lormeadsasdad dasdadsf sfdsa dsafjndafn kjasdf nadsnfkabsd kfbadskjfbakjds fkjdsabf kjabfja hfa",
    id: 1,
  },
  {
    title: "Women saved a dog",
    category: "Comedy",
    content:
      "ettsts dasnjkj adkjasdj bewehbr hewb babds hb abx damxsam asdjmxjai jdadjmajdojsaddjasdjiwidja",
    id: 2,
  },
];

const initData = JSON.parse(localStorage.getItem("key")) || initialState;

export const formSlice = createSlice({
  name: "formSlice",
  initialState: initData,
  reducers: {
    addBlog: (state, action) => {
      console.log("Action", action);
      const newBlog = action.payload.newBlog;
      state.push(newBlog);
      localStorage.setItem("key", JSON.stringify(state)); //storing the state
    },
    editBlog: (state, action) => {
      const { title, category, content } = action.payload.editedBlog;
      const id = action.payload.id;
      const index = state.findIndex((blog) => blog.id == id);
      if (index !== -1) {
        // Update the Redux state
        state[index] = {
          ...state[index],
          title,
          category,
          content,
        };

        // Update the local storage
        const updatedBlogs = [...state];
        localStorage.setItem("key", JSON.stringify(updatedBlogs));
      }
    },
    deleteBlog: (state, action) => {
      const id = action.payload;
      const index = state.findIndex((blog) => blog.id == id);
      if (index !== -1) {
        state.splice(index, 1);
        localStorage.setItem("key", JSON.stringify(state));
      }
    },
  },
});

export const { addBlog, editBlog, deleteBlog } = formSlice.actions;
export default formSlice.reducer;
