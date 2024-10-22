import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../UI/Button/Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { fetchSaleProducts } from "../../asyncActions/productList";
import s from "./SalesBlock.module.css";
import { base_url } from "../..";
import { addToCart } from "../../asyncActions/cart";

function SalesBlock() {
  const productInfo = useSelector((store) => store.productInfo);
  const dispatch = useDispatch();
  const { productList } = useSelector((store) => store.productList);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSaleProducts());
  }, []);

  // Function to handle both cart addition and navigation
  const handleProductClick = (event, element) => {
    event.preventDefault();

    if (event.target.tagName === "BUTTON") {
      dispatch(
        addToCart({
          id: element.id,
          name: element.title,
          price:
            element.discont_price !== null
              ? element.discont_price
              : element.price,
          image: element.image,
        })
      );
    } else {
      navigate(`/products/${element.id}`);
    }
  };

  const discountedProducts = productList.filter(
    (elem) => elem.discont_price !== null
  );
  const sortedDiscountedProducts = discountedProducts
    .sort((a, b) => b.discont_price - a.discont_price)
    .slice(0, 4);

  return (
    <div id="SalesBlock" className={s.sales_main}>
      <div className={s.navigate_sales}>
        <h1 className={s.title_sales}>Sale</h1>
        <div className={s.navigate_sales_btn}>
          <Link to="/products/sale">
            <Button theme="link_to" title="all sales >" />
          </Link>
        </div>
      </div>
      <div className={s.sales_grid_main}>
        {sortedDiscountedProducts.map((elem) => (
          <NavLink
            key={elem.id}
            to={`/products/${elem.id}`}
            onClick={(event) => handleProductClick(event, elem)}
            className={s.sales_card_link}
          >
            <div key={elem.id} className={s.sales_card_main}>
              <img
                className={s.sales_card_image}
                src={base_url + "/" + elem.image}
                alt={elem.title}
              />
              {elem.discont_price !== null && (
                <div className={s.discount_tag}>
                  {Math.round((1 - elem.discont_price / elem.price) * 100)}%
                </div>
              )}
              <div className={s.overlay_main}>
                <Button theme="green" title="Add to cart" />
              </div>
              <p className={s.sales_card_title}>{elem.title}</p>
              <div className={s.sales_card_price}>
                <p className={s.discounted_price}>${elem.discont_price}</p>
                <p className={s.original_price}>${elem.price}</p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default SalesBlock;