import React from "react";
import NestedComments from "./Components/NestedComments";
import commentsData from "./Data/comment.json";
const App = () => {
  return (
    <div>
      <h1>Nested Comments</h1>
      <NestedComments
        commentsData={commentsData}
        onSubmit={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
        onMove={() => {}}
        onUpvote={() => {}}
        onDownvote={() => {}}
      />
    </div>
  );
};

export default App;
