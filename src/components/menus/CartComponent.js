import useCustomLogin from "../../hooks/useCustomLogin";
import { useEffect, useMemo } from "react";
import { getCartItemsAsync } from "../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/CartItemComponent";
import { cartTotalState } from "../../atoms/cartState";
import { useRecoilValue } from "recoil";

const CartComponent = () => {

    const {isLogin, loginState} = useCustomLogin()
    const {cartItems, changeCart} = useCustomCart()
    const totalValue = useRecoilValue(cartTotalState)

    //const dispatch = useDispatch();
    //const cartItems = useSelector(state => state.cartSlice)

    // useEffect(() => {
    //     dispatch(getCartItemsAsync())
    // },[isLogin])
    
    //const {refreshCart, cartItems, changeCart} = useCustomCart()
    
    // const total = useMemo(() => {
    //     let total = 0

    //     for(const item of cartItems) {
    //         total += item.price * item.qty
    //     }
    //     return total
    // }, [cartItems])
    // useEffect(() => {
    //     if(isLogin) {
    //         refreshCart()
    //     }
    // }, [isLogin])


    return (
        <div className="w-full">
            {isLogin ?
            
            <div className="flex flex-col">

                <div className="w-full flex">
                    <div className="font-extrabold text-2xl w-4/5"> 
                        {loginState.nickname}'s Cart
                    </div>
                    <div className="bg-orange-600 text-center text-white font-bold w-1/5
                        rounded-full m-1">
                        {cartItems.length}
                    </div>
                </div>  
            
                <div>
                    <ul>
                        {cartItems.map(item => 
                            <CartItemComponent {...item} 
                            key={item.cino}
                            changeCart={changeCart}
                            email={loginState.email}/>
                        )}
                    </ul>
                </div>

  
                <div className="m-2 text-3xl">
                    {/* TOTAL: {total} */}
                        TOTAL: {totalValue}
                </div>    
            </div>       
            :
            <div></div>
            }    
        </div>
    );
}

export default CartComponent;