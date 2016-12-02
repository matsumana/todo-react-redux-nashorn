import React from "react";

const Link = ({active, children, onClick}) => {

  if (active) {
    return <span>{children}</span>
  }

  const clickHandler = (e) => {
    e.preventDefault();
    onClick()
  };

  return (
      <a href="#" onClick={clickHandler}>
        {children}
      </a>
  )

};

export default Link
