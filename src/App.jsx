import { useEffect, useState } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db";

function App() {

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

  return (
    <>
      <Header
        cart={cart}
        deleteFromCart={deleteFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
            />
          )
          )
          }
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
