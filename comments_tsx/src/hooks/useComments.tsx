import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { CommentData, SortOrder, VoteAction } from "../types/comment";

const insertNode = (
  tree: CommentData[],
  commentId: string | number,
  newComment: CommentData
): CommentData[] => {
  return tree.map((comment) => {
    if (comment.id === commentId) {
      return {
        ...comment,
        replies: [...comment.replies, newComment],
      };
    }

    return {
      ...comment,
      replies: insertNode(comment.replies, commentId, newComment),
    };
  });
};

const editNode = (
  tree: CommentData[],
  id: string | number,
  content: string
): CommentData[] => {
  return tree.map((comment) => {
    if (comment.id === id) {
      return {
        ...comment,
        content,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      ...comment,
      replies: editNode(comment.replies, id, content),
    };
  });
};

const deleteNode = (
  tree: CommentData[],
  id: string | number
): CommentData[] => {
  return tree
    .filter((comment) => comment.id !== id)
    .map((comment) => ({
      ...comment,
      replies: deleteNode(comment.replies, id),
    }));
};
const changeVote = (
  tree: CommentData[],
  id: string | number,
  action: VoteAction
): CommentData[] => {
  return tree.map((comment) => {
    if (comment.id === id) {
      return {
        ...comment,
        votes: Math.max(0, comment.votes + (action === "up" ? 1 : -1)),
      };
    }
    return {
      ...comment,
      replies: changeVote(comment.replies, id, action),
    };
  });
};
const sortNodes = (tree: CommentData[], sortOrder: SortOrder): CommentData[] => {
  return [...tree]
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
      if (sortOrder === "oldest") {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      }
      if (sortOrder === "vote") {
        return b.votes - a.votes;
      }
      return 0;
    })
    .map((comment) => ({
      ...comment,
      replies: sortNodes(comment.replies, sortOrder),
    }));
};

const useComments = (initialComments: CommentData[]) => {
  const [comments, setComments] = useState<CommentData[]>(initialComments);

  const insertComment = (commentId: string | number | null, content: string): void => {
    const newComment: CommentData = {
      id: uuidv4(),
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (commentId) {
      setComments((prev) => insertNode(prev, commentId, newComment));
    } else {
      setComments((prev) => [newComment, ...prev]);
    }
  };

  const editComment = (id: string | number, content: string): void => {
    setComments((prev) => editNode(prev, id, content));
  };

  const deleteComment = (id: string | number): void => {
    setComments((prev) => deleteNode(prev, id));
  };
  const changeVoteCount = (id: string | number, action: VoteAction): void => {
    setComments((prev) => changeVote(prev, id, action));
  };
  const sortComments = (order: SortOrder): void => {
    setComments((prev) => sortNodes(prev, order));
  };
  return {
    comments,
    insertComment,
    editComment,
    deleteComment,
    sortComments,
    changeVoteCount,
  };
};

export default useComments;
