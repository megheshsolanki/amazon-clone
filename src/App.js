import "./App.css";
import Payment from './components/Payment'
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { useStateValue } from "./StateProvider";
import { useEffect } from "react";
import { auth } from "./firebase";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe("pk_test_51NBtNDSDJVqAknE0znhUOYyvVE0gKKQ9BFcvazJtvNvAj1LAduYsiMwmiGPrzjLFM0raQIp2FybeOVBn3gqr2V80003lTcaxVU");

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

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
          <Checkout />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <Register />
        </>
      ),
    },
    {
      path: "/payment",
      element: (
        <>
          <Header />
          <Payment />
        </>
      ),
    },
  ]);
  return (
    <div className="app">
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
