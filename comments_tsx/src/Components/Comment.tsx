import { useEffect, useRef, useState, type KeyboardEvent, type ChangeEvent } from "react";
import type { CommentData, SortOrder, VoteAction } from "../types/comment";

interface CommentProps {
  comment: CommentData;
  onEdit: (id: string | number, content: string) => void;
  onSubmit: (id: string | number, content: string) => void;
  onDelete: (id: string | number) => void;
  onVote: (id: string | number, action: VoteAction) => void;
  onSort: () => void;
  sortOrder: SortOrder;
  globalEditMode: boolean;
  setGlobalEditMode: (mode: boolean) => void;
}

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
}: CommentProps) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>("");
  const replyTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const editTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>("");
  useEffect(() => {
    if (editMode) editTextAreaRef.current?.focus();
    if (expand) replyTextAreaRef.current?.focus();
  }, [editMode, expand]);
  const handleReplySubmit = (): void => {
    if (replyText.trim()) {
      onSubmit(data.id, replyText);
      setReplyText("");
    }
  };

  const toggleEditMode = (): void => {
    setEditMode(!editMode);
    setGlobalEditMode(!globalEditMode);
    setEditedContent(data.content);
  };
  const handleEditChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setEditedContent(e.target.value);
  };
  const cancelEditMode = (): void => {
    toggleEditMode();
    setGlobalEditMode(false);
  };
  const saveEdit = (): void => {
    if (editedContent.trim().length) {
      onEdit(data.id, editedContent);
      toggleEditMode();
      setGlobalEditMode(false);
    }
  };

  const handleVote = (id: string | number, action: VoteAction): void => {
    onVote(id, action);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
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
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setReplyText(e.target.value)}
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
