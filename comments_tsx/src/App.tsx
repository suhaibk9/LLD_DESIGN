import NestedComments from "./Components/NestedComments";
import commentsData from "./Data/comment.json";
import type { CommentData } from "./types/comment";

const App = () => {
  return (
    <div>
      <h1>Nested Comments</h1>
      <NestedComments
        commentsData={commentsData as CommentData[]}
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
