const Loading = ({ message = "Loading images..." }) => {
  return (
    <section className="loading-state" aria-live="polite" aria-busy="true">
      <div className="loading-state__status">
        <span className="loading-state__spinner" aria-hidden="true" />
        <p>{message}</p>
      </div>

      <div className="loading-state__cards" aria-hidden="true">
        {Array.from({ length: 3 }, (_, index) => (
          <div className="loading-state__card" key={index}>
            <span className="loading-state__image" />
            <span className="loading-state__line loading-state__line--long" />
            <span className="loading-state__line loading-state__line--short" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Loading;
