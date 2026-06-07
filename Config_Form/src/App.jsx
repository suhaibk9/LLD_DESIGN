import { schema } from "./schema";
import Form from "./Components/Form";

const App = () => {
  const handleSubmit = (formData) => {

    console.log("Form data", formData);
  };
  return (
    <div className="app">
      <h1>Config Driven Form</h1>
      <Form schema={schema} onSubmit={handleSubmit} />
    </div>
  );
};
export default App;
