import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import { UserContext } from '../UserContext';
import { createOrder, getProduct, updateProduct } from '../Services/api';

function Cart() {
  const { state, dispatch } = useContext(CartContext);
  const { userId, username } = useContext(UserContext);

  const removeFromCart = id => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_ITEM', id, quantity });
  };

  const placeOrder = () => {
    const total = state.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const items = state.map(item => ({ id: item.id, quantity: item.quantity }));

    if (!userId || !username || items.length === 0 || total <= 0) {
      console.error('Error: Invalid order data');
      return;
    }

    createOrder(userId, username, items, total)
      .then(response => {
        dispatch({ type: 'CLEAR_CART' });

        // Update the stock of each product in the order
        items.forEach(item => {
          getProduct(item.id)
          .then(product => {
            const updatedProduct = { 
              ...product, 
              stock: product.stock - item.quantity 
            };
            return updateProduct(item.id, updatedProduct)
              .then(() => updatedProduct); // <-- return updatedProduct here
          })
          .then(updatedProduct => console.log(updatedProduct)) // <-- receive updatedProduct here
          .catch(error => console.error('Error updating product:', error));
        });
      })
      .catch(error => {
        console.error('Error creating order:', error);
      });
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
      {state.length > 0 && <button onClick={placeOrder}>Place Order</button>}
    </div>
  );
}

export default Cart;