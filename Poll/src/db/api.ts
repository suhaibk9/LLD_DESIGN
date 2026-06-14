import type { Option, Poll } from "../types/types";
//http://localhost:3000/polls
const BASE_URL = "http://localhost:3000/";
const calculateTotal = (arr: Option[]): number => {
  return arr.reduce(function (acc, curr) {
    return acc + curr["votes"];
  }, 0);
};

//Fetch api/poll/:id
export const fetchPoll = async (pollId: number): Promise<Poll> => {
  const res = await fetch(BASE_URL + `polls/${pollId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return await res.json();
};
//Post api/vote
export const submitPoll = async (
  pollId: number,
  selectedOptions: number[],
): Promise<Option[]> => {
  const poll = await fetchPoll(pollId);
  const updatedOptions = poll.options.map((option) => {
    if (selectedOptions.includes(option.id))
      return { ...option, votes: (option.votes || 0) + 1 };
    return option;
  });
  await fetch(BASE_URL + "polls/" + pollId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      options: updatedOptions,
      totalCount: calculateTotal(updatedOptions),
    }),
  });
  return updatedOptions;
};
//Remove Vote
export const removeVote = async (
  pollId: number,
  selectedOptions: number[],
): Promise<Option[]> => {
  const poll = await fetchPoll(pollId);
  const updatedOptions = poll.options.map((option) => {
    if (selectedOptions.includes(option.id))
      return {
        ...option,
        votes: option.votes === 0 ? 0 : option.votes - 1,
      };
    return option;
  });
  await fetch(BASE_URL + "polls/" + pollId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      options: updatedOptions,
      totalCount: calculateTotal(updatedOptions),
    }),
  });
  return updatedOptions;
};
