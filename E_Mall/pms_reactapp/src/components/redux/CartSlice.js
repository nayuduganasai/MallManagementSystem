import { createSlice } from "@reduxjs/toolkit";
// import spacesData from "../../data/spaces";

const currentDate = new Date();
const endDate = new Date();
endDate.setDate(currentDate.getDate() + 7);


const initialState = {
  cart: [],
  items: {},
  totalPrice: 0,
  requestData: [],
  cartData: [],
  orderData: [],
  cartId:0,
  userId:localStorage.getItem("userId")

};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let find = state.cart.findIndex((item) => item.spaceId === action.payload.spaceId);
      if (find >= 0) {
        state.cart[find].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },

    addToRequestData:(state,action) => {
      // let find = state.requestData.findIndex((req)=> req.requestId === action.payload.requestId);
      // if (true){
        state.requestData.push(action.payload);
      // }
    }
    ,
    getCartTotal: (state) => {
        const { cart } = state;
        let totalPrice = 0;
        let totalQuantity = 0;
      
        cart.forEach((item) => {
          // console.log("cart total", item.rentType);
          totalPrice += (isNaN(item?.rentType?.cost)?0:item?.rentType?.cost);
        });
      
        state.totalPrice = parseFloat(totalPrice.toFixed(2));
        state.totalQuantity = totalQuantity;
      },
      setCartId:(state,action) => {
        state.cartId=action.payload
        console.log(action.payload,"line 59 slice")
      },
      setUserIdState:(state,action) => {
        state.userId=action.payload
        console.log(action.payload,"line 59 slice")
      },
      
      emptyTheCart: (state,action) => {
        state.cart=[]
      },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.spaceId !== action.payload);
    },
  },
});

export const {
  addToCart,
  getCartTotal,
  removeItem,
  addToRequestData,
  setCartId,
  emptyTheCart,
  setUserIdState
} = cartSlice.actions;

export default cartSlice.reducer;