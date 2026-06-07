import { useState } from "react";
import FormField from "./form.field";
import * as yup from "yup";
const Form = ({ schema = [], onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const validateSchema = yup.object().shape(
    schema.reduce((acc, field) => {
      if (field.validate) {
        acc[field.name] = field.validate;
      }
      return acc;
    }, {}),
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validateSchema.validate(formData, { abortEarly: false });
      setErrors({});
      onSubmit(formData);
      e.target.reset();
      setFormData({});
    } catch (err) {
      const validateErrors = (err.inner || [err]).reduce((acc, curr) => {
        if (curr.path) {
          acc[curr.path] = curr.message;
        }
        return acc;
      }, {});
      setErrors(validateErrors);
    }
  };
  const handleChange = (name, value) => {
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {schema.map((field, idx) => (
        <FormField
          key={idx}
          field={{
            ...field,
            error: errors[field.name],
          }}
          value={formData[field.name] || ""}
          onChange={handleChange}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};
export default Form;
