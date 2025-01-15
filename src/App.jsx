import { useState } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db";

function App() {

  const [data, setData] = useState(db); // eslint-disable-line no-unused-vars

  const [cart, setCart] = useState([]);

  function addToCart(newItem = {}) {
    // returns the index of the item or -1 if it doesnt exist in the array
    const exits = cart.findIndex(item => item.id === newItem.id)

    if (exits >= 0) {
      // create a shallow copy of the array and update the quantity
      const updatedCart = [...cart];
      updatedCart[exits].quantity++;
      //set the state
      setCart(updatedCart);
    } else {
      // set quantity when first added
      newItem.quantity = 1;
      setCart([...cart, newItem])
    }
  }

  return (
    <>
      <Header
        cart={cart}
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
