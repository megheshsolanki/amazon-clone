import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";

function Subtotal() {
    const [{ basket }, dispatch] = useStateValue();
    let subtotal = 0;
    basket.forEach((item) => {
      subtotal += item.price;
    });
  
    return (
      <div className="subtotal">
        <CurrencyFormat
          renderText={(value) => (
            <>
              <p>
                {/* Part of the homework */}
                Subtotal ({basket?.length} items): <strong>${subtotal}</strong>
              </p>
              <small className="subtotal__gift">
                <input type="checkbox" /> This order contains a gift
              </small>
            </>
          )}
          decimalScale={2}
          value={subtotal} // Part of the homework
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
        <button>Proceed to checkout</button>
      </div>
    );
}

export default Subtotal;
