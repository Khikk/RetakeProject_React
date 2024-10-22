import React from "react";
import s from "./CartItem.module.css";
import { base_url } from "../..";

const CartItem = ({ item, handleRemove, handleAdd, handleUpdateQuantity }) => {
  const base_img_url = base_url + "/" + item.image;

  return (
    <div className={s.cartItem}>
      <img src={base_img_url} alt={'cartItem'} className={s.productImage} />
      <div className={s.cart_info}>
        <h2 className={s.item_name}>{item.name}</h2>
        <div className={s.count_price_item}>
        <div className={s.counter}>
          <button className={s.minus_item} onClick={() => handleRemove(item)}>-</button>
          <input className={s.input_item}
            value='1'
            onChange={(e) => handleUpdateQuantity(item, e.target.value)}
          />
          <button className={s.plus_item} onClick={() => handleAdd(item)}>+</button>
        </div>
        <p className={s.price_cart}> ${item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
