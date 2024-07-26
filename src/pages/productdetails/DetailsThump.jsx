import React from "react";
import "./details.css"; // Ensure this file has styles for the `thumb` and `active` class

const DetailsThumb = ({ myRef, images, tab }) => {
  return (
    <div className="thumb" ref={myRef}>
      {images.map((img, index) => (
        <img
          src={img}
          alt={`Thumbnail ${index}`}
          key={index}
          onClick={() => tab(index)}
        />
      ))}
    </div>
  );
};

export default DetailsThumb;
