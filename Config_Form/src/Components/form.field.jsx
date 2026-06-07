import { componentMapping } from "./componentMap";
const FormField = ({ field, value, onChange }) => {
  const { component } = field;
  const Component = componentMapping[component];
  if (!Component) return;
  return (
    <>
      <Component {...field} onChange={(value) => onChange(field.name, value)} />
      {field?.error && <p style={{ color: "red" }}>{field.error}</p>}
    </>
  );
};
export default FormField;
