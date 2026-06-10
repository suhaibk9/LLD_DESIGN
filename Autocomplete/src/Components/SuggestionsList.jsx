import React from "react";

const SuggestionsList = ({
  suggestions,
  highlight,
  selectedId,
  setSelectedId,
  dataKey,
  onSuggestionClick,
}) => {
  const getHighlightedText = (text) => {
    if (!highlight) return text;

    const index = text.toLowerCase().indexOf(highlight.toLowerCase());

    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + highlight.length);
    const after = text.slice(index + highlight.length);

    return (
      <>
        {before}
        <span className="highlight">{match}</span>
        {after}
      </>
    );
  };
  return (
    <>
      {suggestions.map((currSugg) => {
        const name = currSugg[dataKey];
        return (
          <li
            id={`suggestion-${currSugg.id}`}
            className="sugesstion-item"
            key={currSugg.id}
            onMouseDown={(e) => onSuggestionClick(e, currSugg)}
            aria-selected={selectedId === currSugg.id}
          >
            {getHighlightedText(name)}
          </li>
        );
      })}
    </>
  );
};

export default SuggestionsList;
