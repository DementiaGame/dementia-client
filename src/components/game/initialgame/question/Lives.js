import React from "react";
import { FaHeart } from "react-icons/fa";

const Lives = ({ totalCorrectAnswers }) => (
  <div className="lives">
    {Array.from({ length: totalCorrectAnswers }).map((_, index) => (
      <FaHeart key={index} color="red" />
    ))}
    {Array.from({ length: 10 - totalCorrectAnswers }).map((_, index) => (
      <FaHeart key={index} color="lightgrey" />
    ))}
  </div>
);

export default Lives;
