import React, { useContext } from 'react';
import { CartContext } from '../CartContext';

function Cart() {
  const { state, dispatch } = useContext(CartContext);

  const removeFromCart = id => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_ITEM', id, quantity });
  };

  return (
    <div className="Cart">
      {state.map(item => (
        <div key={item.id} className="CartItem">
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>{item.price}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={e => updateQuantity(item.id, e.target.value)}
          />
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default Cart;