import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";

export const useCart = () => {

    const initialCartState = () => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db);

    const [cart, setCart] = useState(initialCartState);

    const MAX_PER_ITEM = 5;
    const MIN_PER_ITEM = 1;

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    function addToCart(newItem = {}) {
        // returns the index of the item or -1 if it doesnt exist in the array
        const exits = cart.findIndex(item => item.id === newItem.id)

        if (exits >= 0) {
            // create a shallow copy of the array and update the quantity
            const updatedCart = [...cart];
            if (updatedCart[exits].quantity < MAX_PER_ITEM) {
                updatedCart[exits].quantity++;
                //set the state
                setCart(updatedCart);
            }
        } else {
            // set quantity when first added
            newItem.quantity = 1;
            setCart([...cart, newItem])
        }
    }

    function decreaseQuantity(itemId = {}) {
        const item = cart.find(cartItem => cartItem.id === itemId);
        if (item.quantity <= MIN_PER_ITEM) return;

        const updatedCart = cart.map(cartItem => {
            if (cartItem.id === itemId) {
                return { ...cartItem, quantity: cartItem.quantity - 1 }
            }
            return cartItem;
        })
        setCart(updatedCart);
    }

    function increaseQuantity(itemId = {}) {
        const item = cart.find(cartItem => cartItem.id === itemId);
        if (item.quantity >= MAX_PER_ITEM) return;

        const updatedCart = cart.map(cartItem => {
            if (cartItem.id === itemId) {
                return { ...cartItem, quantity: cartItem.quantity + 1 }
            }
            return cartItem;
        })
        setCart(updatedCart);
    }

    function deleteFromCart(itemId = {}) {
        setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
    }

    function clearCart() {
        setCart([]);
    }

    //derived states
    const isCartEmpty = useMemo(() => cart.length === 0, [cart]);
    const itemNum = useMemo(() => cart.length, [cart]);
    const cartTotal = useMemo(() => cart.reduce((accumulator, item) => accumulator + (item.price * item.quantity), 0), [cart]);

    return {
        data,
        cart,
        addToCart,
        decreaseQuantity,
        increaseQuantity,
        deleteFromCart,
        clearCart,
        isCartEmpty,
        itemNum,
        cartTotal
    }
}
