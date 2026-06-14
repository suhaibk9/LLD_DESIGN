import useComments from "../hooks/useComments";
import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import Comment from "./Comment";
import "./styles.css";
import type { CommentData, SortOrder } from "../types/comment";

interface NestedCommentsProps {
  commentsData?: CommentData[];
  onSubmit?: (content: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onMove?: () => void;
  onUpvote?: () => void;
  onDownvote?: () => void;
}

const NestedComments = ({
  commentsData = [],
  onSubmit = () => {},
  onEdit: _onEdit = () => {},
  onDelete: _onDelete = () => {},
  onMove: _onMove = () => {},
  onUpvote: _onUpvote = () => {},
  onDownvote: _onDownvote = () => {},
}: NestedCommentsProps) => {
  const {
    comments,
    insertComment,
    editComment,
    deleteComment,
    changeVoteCount,
    sortComments,
  } = useComments(commentsData);

  const [inputText, setInputText] = useState<string>("newest");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [globalEditMode, setGlobalEditMode] = useState<boolean>(false);
  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setInputText(e.target.value);
  };
  const handleSubmit = (): void => {
    if (inputText.trim()) {
      insertComment(null, inputText);
      setInputText("");
    }
  };
  const handleReply = (id: string | number, content: string): void => {
    if (content.trim()) {
      insertComment(id, content);
      onSubmit(content);
    }
  };
  const handleEdit = (id: string | number, content: string): void => {
    editComment(id, content);
  };
  const handleDelete = (id: string | number): void => {
    deleteComment(id);
  };
  const handleVotes = (id: string | number, action: "up" | "down"): void => {
    changeVoteCount(id, action);
  };
  const sortHandler = (): void => {
    sortComments(sortOrder);
  };
  const handleSort = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSortOrder(e.target.value as SortOrder);
    sortHandler();
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
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
