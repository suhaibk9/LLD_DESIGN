import type { JSX } from "react/jsx-runtime";
import type { PollProps } from "../types";
import type { Option } from "../types";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";
const PollWidget = ({
  pollId,
  title,
  options,
  isMultiple = false,
  onVote,
  onVoteRemove,
  styles,
}: PollProps): JSX.Element => {
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [currentOptions, setCurrentOptions] = useState<Option[]>(options);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const totalVotes = currentOptions.reduce((acc, curr) => acc + curr.votes, 0);
  useEffect(() => {
    setCurrentOptions(options);
  }, [options]);
  useEffect(() => {
    const storedVotes = getLocalStorage(`poll-${pollId}`);
    setSelectedOptions(storedVotes || []);
  }, [pollId]);

  const handleVote = async (optionId: number): Promise<void> => {
    let updatedOptions: Option[];
    let newSelection: number[];

    if (isMultiple) {
      if (selectedOptions.includes(optionId)) {
        // Toggle selection off -> remove vote
        updatedOptions = await onVoteRemove(pollId, [optionId]);
        newSelection = selectedOptions.filter((id) => id !== optionId);
      } else {
        // Toggle selection on -> submit vote
        updatedOptions = await onVote(pollId, [optionId]);
        newSelection = [...selectedOptions, optionId];
      }
    } else {
      // Single select
      if (selectedOptions.includes(optionId)) {
        return; // Do nothing if clicking already selected option
      }
      let tempOptions = currentOptions;
      if (selectedOptions.length > 0) {
        // Remove old vote first
        tempOptions = await onVoteRemove(pollId, selectedOptions);
      }
      // Submit new vote
      updatedOptions = await onVote(pollId, [optionId]);
      newSelection = [optionId];
    }

    setCurrentOptions(updatedOptions);
    setSelectedOptions(newSelection);
    setLocalStorage(`poll-${pollId}`, newSelection);
  };

  const handleRemoveVote = async (): Promise<void> => {
    if (selectedOptions.length === 0) return;
    const updatedOptions = await onVoteRemove(pollId, selectedOptions);
    setCurrentOptions(updatedOptions);
    setSelectedOptions([]);
    setLocalStorage(`poll-${pollId}`, []);
  };

  return (
    <fieldset className="p-4 rounded-lg max-w-md" style={styles?.container}>
      <legend className="text-lg font-semibold">{title}</legend>
      <div
        className="space-y-2 overflow-y-auto"
        style={{
          ...styles?.optionsContainer,
          maxHeight: currentOptions.length > 4 ? "200px" : "auto",
        }}
      >
        {currentOptions.length > 0 &&
          currentOptions.map((option) => {
            const votePercentage =
              totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
            return (
              <div key={option.id}>
                <div>
                  <label
                    style={styles?.optionLabel}
                    htmlFor={`option-${option.id}`}
                  >
                    <input
                      id={`option-${option.id}`}
                      style={styles?.optionInput}
                      type={isMultiple ? "checkbox" : "radio"}
                      checked={selectedOptions.includes(option.id)}
                      onChange={() => handleVote(option.id)}
                    />
                    <span>{option.title}</span>
                  </label>
                  {selectedOptions.length > 0 && (
                    <span style={styles?.optionVotes}>
                      {option.votes} Votes {votePercentage.toFixed(2)}%
                    </span>
                  )}
                </div>
                <div
                  className="w-full bg-gray-200 rounded-full h-2"
                  style={styles?.progressBar}
                >
                  <div
                    style={{
                      ...styles?.progressBarFill,
                      transform: `scaleX(${votePercentage / 100})`,
                    }}
                    className="bg-blue-500 h-full rounded-full transform origin-left"
                  ></div>
                </div>
              </div>
            );
          })}
      </div>
      {selectedOptions.length > 0 && (
        <button
          type="button"
          className="mt-4 bg-red-400 px-1 py-3"
          onClick={handleRemoveVote}
          style={styles?.removeButton}
        >
          Remove Vote
        </button>
      )}
    </fieldset>
  );
};

export default PollWidget;
