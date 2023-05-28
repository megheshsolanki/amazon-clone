import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useStateValue } from "../StateProvider";
import CheckoutProduct  from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import {
  useStripe,
  useElements,
  CardElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import axios from "../axios";

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  const navigate = useNavigate();

  // const stripe = useStripe();
  // const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(null);
  // const [clientSecret, setClientSecret] = useState(true);

  // useEffect(() => {
  //   const getClientSecret = async () => {
  //     try {
  //       const response = await axios({
  //         method: "post",
  //         url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
  //       });
  //       setClientSecret(response.data.clientSecret);
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   };

  //   getClientSecret();
  // }, [basket]);

  // console.log("secret ", clientSecret);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setProcessing(true);

  //   const payload = await stripe
  //     .confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card: elements.getElement(CardElement),
  //       },
  //     })
  //     .then(({ paymentIntent }) => {
  //       setSucceeded(true);
  //       setError(null);
  //       setProcessing(false);

  //       navigate("/", { replace: true });
  //     });
  // };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  const stripeButton = () => {
    fetch("http://127.0.0.1:5001/clone-462a7/us-central1/api/payments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
         ...basket
        ],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>House no.1, ABC Road</p>
            <p>New York, USA</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                image={item.image}
                title={item.title}
                price={item.price}
                id={item.id}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)} // Part of the homework
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </div>

              <button disabled={processing || disabled || succeeded}>
                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
              </button>
            </form> */}

            <button onClick={stripeButton}> Checkout</button>
          </div>

          {error && <div>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Payment;
