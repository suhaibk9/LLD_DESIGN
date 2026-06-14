import React from "react";
import useComments from "../hooks/useComments";
import { useState, useRef } from "react";
import Comment from "./Comment";
import "./styles.css";
const NestedComments = ({
  commentsData = [],
  onSubmit = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onMove = () => {},
  onUpvote = () => {},
  onDownvote = () => {},
}) => {
  const {
    comments,
    insertComment,
    editComment,
    deleteComment,
    changeVoteCount,
    sortComments,
  } = useComments(commentsData);

  const [inputText, setInputText] = useState("newest");
  const [sortOrder, setSortOrder] = useState();
  const [globalEditMode, setGlobalEditMode] = useState(false);
  const handleChangeTextArea = (e) => {
    setInputText(e.target.value);
  };
  const handleSubmit = () => {
    if (inputText.trim()) {
      insertComment(null, inputText);
      setInputText("");
    }
  };
  const handleReply = (id, content) => {
    if (content.trim()) {
      insertComment(id, content);
      onSubmit(content);
    }
  };
  const handleEdit = (id, content) => {
    editComment(id, content);
  };
  const handleDelete = (id) => {
    deleteComment(id);
  };
  const handleVotes = (id, action) => {
    changeVoteCount(id, action);
  };
  const sortHandler = () => {
    sortComments(sortOrder);
  };
  const handleSort = (e) => {
    setSortOrder(e.target.value);
    sortHandler();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };
  return (
    <>
      <div className="add-comment">
        <textarea
          className="comment-textarea"
          placeholder="add new comment"
          value={inputText}
          onKeyDown={handleKeyDown}
          onChange={handleChangeTextArea}
          aria-label="Add A Reply"
        />
        <button onClick={handleSubmit} className="comment-btn">
          Add Comment
        </button>
      </div>
      <div>
        <label htmlFor="sortOrder">Sort By</label>
        <select id="sortOrder" value={sortOrder} onChange={handleSort}>
          <option value={"newest"}>Newest</option>
          <option value={"oldest"}>Oldest</option>
          <option value={"vote"}>Most Voted</option>
        </select>
      </div>
      {comments?.map((commentItem) => {
        return (
          <Comment
            comment={commentItem}
            key={commentItem.id}
            onSubmit={handleReply}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onVote={handleVotes}
            onSort={sortHandler}
            sortOrder={sortOrder}
            globalEditMode={globalEditMode}
            setGlobalEditMode={setGlobalEditMode}
          />
        );
      })}
    </>
  );
};

export default NestedComments;

<div className="Greeting">
  <p>Hello</p>
  <p>How are you?</p>
</div>;
React.createElement("div", { className: "Greeting" }, [
  React.createElement("p", {}, "Hello"),
  React.createElement("p", {}, "How are you?"),
]);
