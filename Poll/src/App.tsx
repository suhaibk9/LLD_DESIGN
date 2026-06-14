import { useEffect, useState } from "react";

import type { Poll as PollType, Option } from "./types";

import { fetchPoll, submitPoll, removeVote } from "./db/api";
import PollWidget from "./Components/PollWidget";
const App = () => {
  const [pollData, setPollData] = useState<PollType | null>(null);
  const [pollLoading, setPollLoading] = useState<boolean>(false);
  const fetchPollDataById = async (pollId: number): Promise<void> => {
    setPollLoading(true);
    try {
      const data = await fetchPoll(pollId);
      setPollData(data);
    } catch (err) {
      throw err;
    } finally {
      setPollLoading(false);
    }
  };

  const handleVote = async (
    pollId: number,
    selectedOptions: number[],
  ): Promise<Option[]> => {
    const updatedOptions = await submitPoll(pollId, selectedOptions);
    return updatedOptions;
  };

  const handleVoteRemove = async (
    pollId: number,
    selectedOptions: number[],
  ): Promise<Option[]> => {
    const updatedOptions = await removeVote(pollId, selectedOptions);
    return updatedOptions;
  };

  useEffect(() => {
    try {
      fetchPollDataById(1);
    } catch (err) {
      console.error(err);
    }
  }, []);
  if (pollLoading) return <h1>Loading.....</h1>;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {pollData && (
        <PollWidget
          pollId={pollData.id}
          title={pollData.question}
          options={pollData.options}
          onVote={handleVote}
          onVoteRemove={handleVoteRemove}
          styles={{ container: {} }}
          isMultiple={true}
          
        />
      )}
    </div>
  );
};

export default App;
