import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  clearCart,
  sendOrder,
  updateCartQuantity
} from '../../asyncActions/cart';
import s from './BasketInfo.module.css'; 
import CartItem from '../CartItem/CartItem';

const BasketInfo = () => {
  const cartItems = useSelector(state => state.cart.items);
  const total = useSelector(state => state.cart.total);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = item => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = item => {
    dispatch(removeFromCart(item));
  };

  const handleSendOrder = () => {
    dispatch(sendOrder({ items: cartItems, total, name, phone, email }));
    setIsModalOpen(true);
    dispatch(clearCart()); // Очистка корзины
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateQuantity = (item, quantity) => {
     dispatch(updateCartQuantity(item, quantity));
  };

  return (
    <div className={s.basketInfoContainer}>
          <div>
      <h1 style={{padding:'25px'}}>Shopping Cart</h1>

      {cartItems.map((item, index )=> (
        <CartItem
          key={index} 
          item={item}
          handleRemove={handleRemoveFromCart}
          handleAdd={handleAddToCart}
          handleUpdateQuantity={handleUpdateQuantity}
        />
      ))}
    </div>
      <form className={s.form_cart}>
        <h1 style={{marginRight:'250px', marginBottom:'50px'}}>Order details</h1>
        <div className={s.descr_order}>
          <h2 className={s.title_total}>
            4 items<br/>
            total
          </h2>
        <span className={s.total_order}>${total}</span>
        </div>
        <div className={s.input_fields}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          className={s.inputField}
        />
        <input
          type="text"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone"
          className={s.inputField}
        />
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className={s.inputField}
        />
        </div>
        <button
          type="button"
          onClick={handleSendOrder}
          className={s.sendOrderBtn}
        >
        Order
        </button>
      </form>
      {isModalOpen && (
        <div className={s.modalContent}>
          <h2 style={{fontSize:'40px', fontWeight:'600', marginBottom:'21px'}}>Congratulations!</h2>
          <p>Your order has been successfully placed on the website. <br/>
          <p></p>
          A manager will contact you shortly to confirm your order.</p>
          <button onClick={closeModal} className={s.closeBtn}>
            <div className={s.close}>Close</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default BasketInfo;
