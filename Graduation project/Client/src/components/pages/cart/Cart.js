import React from "react";

import "./cart.css";

const Cart = ({ items, AddItem, RemoveItem }) => {
  const totalPrice = items.reduce(
    (price, cartItem) => price + cartItem.quantity * cartItem.price,
    0
  );

  const goCheckout = () => {
    window.location.href = "/checkout/detail";
  };

  return (
    <div className="lis">
      <div className="lihs">
        <span className="lihts"> CART DETAIL </span>
      </div>

      {items.length === 0 && (
        <div className="els">
          <div className="elfls"> NO ITEMS IN HERE!!! </div>
          <div className="elels">
            {" "}
            " Waiting to serve you is our pleasure! "{" "}
          </div>
        </div>
      )}

      <div>
        {items.map((cartItem) => (
          <div key={cartItem.id} className="als">
            <div className="iins">
              <img
                className="iis"
                width="100"
                height="100"
                src={cartItem.img}
                alt={cartItem.name}
              />

              <div className="ins">{cartItem.name}</div>
            </div>

            <table className="ilss">
              <tr>
                <td>
                  <button className="abs" onClick={() => AddItem(cartItem)}>
                    +
                  </button>
                  <button className="rbs" onClick={() => RemoveItem(cartItem)}>
                    -
                  </button>
                </td>
                <td>
                  {cartItem.quantity} * ${cartItem.price} = $
                  {cartItem.quantity * cartItem.price}
                </td>
              </tr>
            </table>
          </div>
        ))}
      </div>

      {items.length !== 0 && (
        <div>
          <div className="tps">
            <div> TOTAL </div>
            <div> ${totalPrice} </div>
          </div>

          <div className="cobas">
            <button className="cobs" onClick={() => goCheckout()}>
              <span>GO TO CHECK OUT</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
