const DATA_URL = "https://dummyjson.com/products?limit=100";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useFetch } from "./useFetch";
import Home from "./Components/Home";
import AppLayout from "./Components/AppLayout";
import Context from "./context/context";
import "./App.css";
import Cart from "./Components/Cart";
const App = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/cart", element: <Cart /> },
      ],
    },
  ]);
  return (
    <Context>
      <RouterProvider router={router} />
    </Context>
  );
};
export default App;
