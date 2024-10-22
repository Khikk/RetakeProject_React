import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { productListReducer } from "./productListReducer";
import { categoriesReducer } from "./categoriesReducer";
import { productInfoReducer } from "./productInfoReducer";
import cartReducer from "./cartReducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
// Настраиваем persist для корзины (cart)
const persistConfig = {
  key: "cart",
  storage,
};
const rootReducer = combineReducers({
  productList: productListReducer,
  categoriesList: categoriesReducer,
  productInfo: productInfoReducer,
  cart: persistReducer(persistConfig, cartReducer),
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
