import "./App.css";
import Checkout from "./components/Checkout";
import Header from './components/Header'
import Home from "./components/Home";
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
          <Checkout/>
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
