import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const insertNode = (tree, commentId, newComment) => {
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

const editNode = (tree, id, content) => {
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

const deleteNode = (tree, id) => {
  return tree
    .filter((comment) => comment.id !== id)
    .map((comment) => ({
      ...comment,
      replies: deleteNode(comment.replies, id),
    }));
};
const changeVote = (tree, id, action) => {
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
const sortNodes = (tree, sortOrder) => {
  return [...tree]
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.timestamp) - new Date(a.timestamp);
      }
      if (sortOrder === "oldest") {
        return new Date(a.timestamp) - new Date(b.timestamp);
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

const useComments = (initialComments) => {
  const [comments, setComments] = useState(initialComments);

  const insertComment = (commentId, content) => {
    const newComment = {
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

  const editComment = (id, content) => {
    setComments((prev) => editNode(prev, id, content));
  };

  const deleteComment = (id) => {
    setComments((prev) => deleteNode(prev, id));
  };
  const changeVoteCount = (id, action) => {
    setComments((prev) => changeVote(prev, id, action));
  };
  const sortComments = (order) => {
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
