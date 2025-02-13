export default function Header(
    { cart = {},
        deleteFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isCartEmpty,
        itemNum,
        cartTotal
    }) {

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div className="carrito">
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />
                            {!isCartEmpty && <p className="item-number">{itemNum}</p>}

                            <div id="carrito" className="bg-white p-3">
                                {isCartEmpty ? (
                                    <p className="text-center">El carrito esta vacio</p>
                                ) : (
                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map((item) => {
                                                    return (
                                                        <tr key={item.id}>
                                                            <td>
                                                                <img
                                                                    className="img-fluid"
                                                                    src={`/img/${item?.image ?? 'default'}.jpg`}
                                                                    alt="guitar image"
                                                                />
                                                            </td>
                                                            <td>{item.name}</td>
                                                            <td className="fw-bold">
                                                                ${item.price}
                                                            </td>
                                                            <td className="flex align-items-start gap-4">
                                                                <button
                                                                    onClick={() => decreaseQuantity(item.id)}
                                                                    type="button"
                                                                    className="btn btn-dark">
                                                                    -
                                                                </button>
                                                                {item.quantity}
                                                                <button
                                                                    onClick={() => { increaseQuantity(item.id) }}
                                                                    type="button"
                                                                    className="btn btn-dark">
                                                                    +
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    type="button"
                                                                    onClick={() => deleteFromCart(item.id)}>
                                                                    X
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </table>

                                        <p className="text-end">Total pagar: <span className="fw-bold">{cartTotal}</span></p>
                                        <button
                                            onClick={clearCart}
                                            className="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>
                                    </>
                                )}

                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}
