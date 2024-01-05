import React, { createContext, useContext, useState, useEffect } from "react";

export const LikeContext = createContext();
export const useLikeContext = () => {
  return useContext(LikeContext);

}
export const LikeProvider = ({ children }) => {
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem("likes");
    return savedLikes ? JSON.parse(savedLikes) : {};
  });

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  const toggleLike = (postId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: !prevLikes[postId],
    }));
  };

  return (
    <LikeContext.Provider value={{ likes, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};

// ...
