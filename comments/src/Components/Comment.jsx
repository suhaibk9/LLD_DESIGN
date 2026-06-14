import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Comment = ({
  comment: data,
  onEdit,
  onSubmit,
  onDelete,
  onVote,
  onSort,
  sortOrder,
  globalEditMode,
  setGlobalEditMode,
}) => {
  const [expand, setExpand] = useState(false);
  const [replyText, setReplyText] = useState("");
  const replyTextAreaRef = useRef();
  const editTextAreaRef = useRef();
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  useEffect(() => {
    if (editMode) editTextAreaRef.current.focus();
    if (expand) replyTextAreaRef.current.focus();
  }, [editMode, expand]);
  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onSubmit(data.id, replyText);
      setReplyText("");
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setGlobalEditMode(!globalEditMode);
    setEditedContent(data.content);
  };
  const handleEditChange = (e) => {
    setEditedContent(e.target.value);
  };
  const cancelEditMode = () => {
    toggleEditMode();
    setGlobalEditMode(false);
  };
  const saveEdit = () => {
    if (editedContent.trim().length) {
      onEdit(data.id, editedContent);
      toggleEditMode();
      setGlobalEditMode(false);
    }
  };

  const handleVote = (id, action) => {
    onVote(id, action);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleReplySubmit();
    }
  };
  return (
    <div className="comment">
      <>
        {editMode ? (
          <div className="add-comment">
            <textarea
              ref={editTextAreaRef}
              className="comment-textarea"
              placeholder="add new comment"
              value={editedContent}
              onChange={handleEditChange}
              onKeyDown={handleKeyDown}
              aria-label="Add A New Comment"
            />
            <button onClick={saveEdit} className="comment-btn">
              Save Edit
            </button>
            <button onClick={cancelEditMode} className="comment-btn">
              Cancel Edit
            </button>
          </div>
        ) : (
          <>
            <p className="comment-content">{data.content}</p>
            <p className="comment-info">Votes: {data.votes}</p>
            <p className="comment-info">
              {new Date(data.timestamp).toLocaleString()}
            </p>
          </>
        )}
      </>
      {!editMode && (
        <div className="comment-actions">
          <button
            className="comment-btn"
            onClick={() => {
              handleVote(data.id, "up");
              if (sortOrder === "vote") onSort();
            }}
          >
            👍🏻
          </button>
          <button
            disabled={data.votes === 0}
            className="comment-btn"
            onClick={() => {
              handleVote(data.id, "down");
              if (sortOrder === "vote") onSort();
            }}
          >
            👎🏻
          </button>
          <button
            className="comment-btn"
            onClick={() => {
              setExpand(!expand);
            }}
          >
            {expand ? "Hide Replies" : "Reply"}
          </button>
          <button
            onClick={() => {
              if (!globalEditMode) toggleEditMode();
            }}
            className="comment-btn"
          >
            Edit
          </button>
          <button
            onClick={() => {
              onDelete(data.id);
            }}
            className="comment-btn"
          >
            Delete
          </button>
        </div>
      )}
      {expand && (
        <div className="replies">
          <>
            <div className="add-comment">
              <textarea
                ref={replyTextAreaRef}
                className="comment-textarea"
                placeholder="add new comment"
                value={replyText}
                onKeyDown={handleKeyDown}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button onClick={handleReplySubmit} className="comment-btn">
                Add Comment
              </button>
            </div>
          </>
          {data.replies.length > 0 &&
            data.replies.map((reply) => (
              <Comment
                onSort={onSort}
                sortOrder={sortOrder}
                key={reply.id}
                comment={reply}
                onSubmit={onSubmit}
                onEdit={onEdit}
                onVote={onVote}
                onDelete={onDelete}
                globalEditMode={globalEditMode}
                setGlobalEditMode={setGlobalEditMode}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
