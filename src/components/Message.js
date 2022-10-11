import React from "react";

const Message = ({ msg, bgColor }) => {
  let styles = {
    padding: ".1rem",
    margin: "0 15% 1rem",
    textAlign: "center",
    fontSize: "150%",
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: bgColor,
    borderRadius: "15px",
  };

  return (
    <div style={styles}>
      {/* <p>{msg}</p> */}
      <p dangerouslySetInnerHTML={{ __html: msg }} />
    </div>
  );
};

export default Message;
