export default function Guitar({ guitar = {}, addToCart }) {

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${guitar?.image ?? 'default'}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{guitar?.name ?? 'no name'}</h3>
                <p>{guitar?.description ?? 'no description'}</p>
                <p className="fw-black text-primary fs-3">${guitar?.price ?? 'no price'}</p>
                <button
                    onClick={() => { addToCart(guitar) }}
                    type="button"
                    className="btn btn-dark w-100">
                    Agregar al Carrito
                </button>
            </div>
        </div>
    )
}

