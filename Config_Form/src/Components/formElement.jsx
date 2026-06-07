const TextField = ({ name, label, isRequired, type, onChange }) => {
  const handleBlur = (e) => {
    onChange(e.target.value);
  };
  return (
    <div className="inputContainer">
      <label htmlFor={name}>
        {label}
        {isRequired && <span>*</span>}
      </label>

      <input onBlur={handleBlur} type={type} name={name} id={name} />
    </div>
  );
};
const CheckBox = ({ name, label, isRequired, type, onChange }) => {
  const handleBlur = (e) => {
    onChange(e.target.value);
  };
  return (
    <div className="inputContainer">
      <label htmlFor={name}>
        {label} {isRequired && <span>*</span>}
      </label>

      <input
        type="checkBox"
        name={name}
        id={name}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
};

const RadioButton = ({ name, label, isRequired, options, onChange }) => {
  return (
    <div className="inputContainer">
      <label>
        {label}
        {isRequired && <span>*</span>}
      </label>

      {options.map((optn) => {
        return (
          <div className="inputContainer" key={optn}>
            <input
              type="radio"
              name={name}
              id={optn}
              value={optn}
              onChange={(e) => onChange(e.target.value)}
            />
            <label htmlFor={optn}>{optn}</label>
          </div>
        );
      })}
    </div>
  );
};

const Slider = ({ name, label, isRequired, min, max, onChange }) => {
  return (
    <div className="inputContainer">
      <label htmlFor={name}>
        {label}
        {isRequired && <span>*</span>}
      </label>
      <input
        type="range"
        name={name}
        id={name}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
};

const DatePicker = ({ name, label, isRequired, onChange }) => {
  return (
    <div className="inputContainer">
      <label htmlFor={name}>
        {label} {isRequired && <span>*</span>}
      </label>

      <input
        type="date"
        name={name}
        id={name}
        onChange={(e) => onChange(e.target.value)}
        placeholder="MM/DD/YYYY"
      />
    </div>
  );
};

export { TextField, CheckBox, RadioButton, Slider, DatePicker };
