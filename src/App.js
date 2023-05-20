import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const Router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <Home />
        </>
      ),
    },
    {
      path: "/checkout",
      element: (
        <>
          <Header />
          <h1>Checkout, to be continued</h1>
        </>
      ),
    },
  ]);
  return (
      <div className="app">
        <RouterProvider router={Router}/>
      </div>
  );
}

export default App;
