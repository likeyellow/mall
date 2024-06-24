import { useDispatch, useSelector } from "react-redux";
import { getCartItemsAsync, postChangeCartAsync } from "../slices/cartSlice";
import { useRecoilState } from "recoil";
import { cartState } from "../atoms/cartState";
import { useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getCartItems, postChangeCart } from "../api/cartApi";

const useCustomCart = () => {

    //const cartItems = useSelector(state => state.cartSlice)
    const [cartItems, setCartItems] = useRecoilState(cartState)
    const queryClient = useQueryClient()
    const changeMutation = useMutation((param) => postChangeCart(param), {onSuccess: (result) => {
        setCartItems(result)
    }})

    const query = useQuery(["cart"], getCartItems, {staleTime: 1000*60*60}) // 1시간
    //const dispatch = useDispatch()

    useEffect(() => {
        if(query.isSuccess || changeMutation.isSuccess) {

            queryClient.invalidateQueries("cart")
            setCartItems(query.data)
        }
    }, [query.isSuccess, query.data])

    const changeCart = (param) => {
        //dispatch(postChangeCartAsync(param))
        changeMutation.mutate(param)
    }

    const refreshCart = () => {
        //dispatch(getCartItemsAsync())s
    }

    //return {cartItems, refreshCart, changeCart}
    return {cartItems, changeCart}
}

export default useCustomCart