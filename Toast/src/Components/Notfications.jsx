import React from "react";
import { CiCircleInfo } from "react-icons/ci";
import { TiTick } from "react-icons/ti";
import { BiSolidError } from "react-icons/bi";
import { CiWarning } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import "./Notifications.css";
const iconStyles = { marginRight: "10px" };
const IconsFactory = (type) => {
  if (type === "info") return <CiCircleInfo style={iconStyles} />;
  else if (type === "success") return <TiTick style={iconStyles} />;
  else if (type === "error") return <BiSolidError style={iconStyles} />;
  else return <CiWarning style={iconStyles} />;
};
const animationFactory = { fade: "fadeIn", pop: "popup", slide: "slideIn" };
const Notfications = ({
  type = "info",
  message,
  onClose,
  animation = "slide",
}) => {
  if (!message) return;
  const iconCompoent = IconsFactory(type);
  return (
    <div className={`notfications ${type} ${animationFactory[animation] || animation || "slideIn"}`}>
      {iconCompoent}
      {message}
      <button className="closeBtn" onClick={onClose}>
        <IoCloseOutline />
      </button>
    </div>
  );
};

export default Notfications;
