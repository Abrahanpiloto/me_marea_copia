import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { getGuestId } from "../utils/guestId";
import { Link, useNavigate } from "react-router-dom";
import fetchCartCount from "../utils/fetchCartCount";
import { FaRegTrashCan } from "react-icons/fa6";
import PaymentOptionsModal from "./PaymentOptionsModal";
import Contact from "./Contact";
import ContactModal from "./ContactModal";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const navigate = useNavigate();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const fetchCart_items = async () => {
      const guestId = getGuestId();
      console.log("guestId:", guestId);
      const { data, error } = await supabase
        .from("cart_items")
        .select("*")
        .eq("guest_id", guestId);

      if (!error) {
        // Añade cantidad si no esta:
        const itemsQuantity = data.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }));

        setItems(itemsQuantity);
      } else console.error(error);
    };
    fetchCart_items();
  }, []);

  // 🔼 INCREMENTAR cantidad
  const handleIncrease = async (itemId) => {
    const item = items.find((i) => i.id === itemId);
    const newQuantity = item.quantity + 1;

    // Actualiza en Supabase:
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: newQuantity })
      .eq("id", itemId);

    if (!error) {
      // Actualiza en el estado local para que se refleje en pantalla:
      setItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, quantity: newQuantity } : i))
      );
    } else {
      console.error("Error al actualizar cantidad:", error);
    }
  };

  // 🔽 DISMINUIR cantidad
  const handleDecrease = async (itemId) => {
    const item = items.find((i) => i.id === itemId);
    const newQuantity = Math.max(1, item.quantity - 1);

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: newQuantity })
      .eq("id", itemId);

    if (!error) {
      setItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, quantity: newQuantity } : i))
      );
    } else {
      console.error("Error al actualizar cantidad:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", itemId);

    if (!error) {
      // Actualiza la vista localmente:
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));

      // Actualiza el contador del icono carrito en el Navbar:
      const count = await fetchCartCount();
      window.dispatchEvent(
        new CustomEvent("cartCountUpdated", { detail: count })
      );
    } else {
      console.error("Error al eliminar el item:", error);
    }
  };

  return (
    <div className="lg:px-2 px-4 py-6 max-w-6xl mx-auto bg-white mt-22 flex flex-col lg:flex-row gap-2">
      {/* ------ Box Info ----- */}
      <div className=" lg:w-3/4 bg-[#dde2f5] px-2 py-2 rounded-lg">
        {items.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-6">
            <div className="mb-2 flex flex-col justify-center items-center">
              <h1 className="text-xl font-bold">
                {" "}
                {totalQuantity} articulos en tu carrito 🛒
              </h1>
            </div>
            <p className="flex justify-center text-black mb-4">
              No hay productos en el carrito
            </p>
            <Link
              to="/storepage"
              className="bg-[#E2A555] hover:bg-emerald-300 text-black px-4 py-2 rounded transition"
            >
              Ir a la tienda
            </Link>
          </div>
        ) : (
          <div className="lg:px-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="w-full rounded flex lg:flex-row gap-3 mb-5 items-end"
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-20 h-35 object-cover rounded lg:w-40 lg:h-55"
                />
                <div className="flex-col">
                  <div className="w-40 lg:w-70 flex-col p-2">
                    <h3 className="">{item.name}</h3>
                    <p className="font-light text-sm">Talla: {item.size}</p>
                    <p className="font-light text-sm">Color: {item.color}</p>

                    {/* Selector de cantidad */}
                    <div className="flex flex-row items-baseline gap-2">
                      <div className="flex  w-26">
                        <button
                          onClick={() => handleDecrease(item.id)}
                          className="px-2 border rounded mr-2 font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-md">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(item.id)}
                          className="px-2 border rounded ml-2 font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex lg:flex-row items-end w-26 ">
                        <p className="text-gray-700 font-bold flex-shrink-0 mt-2">
                          S/. {(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className=" p-1 text-gray-700 hover:text-red-500 cursor-pointer"
                          title="Eliminar"
                        >
                          <FaRegTrashCan />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ----- Box Izquierdo Subtotal ----- */}
      {items.length > 0 && (
        <div className="lg:w-1/2 flex lg:items-center ">
          <div className="flex flex-col justify-center items-center mt-6 p-4 bg-white rounded-lg shadow-lg w-full lg:w-md border border-gray-200">
            <h1 className="text-xl mb-2">Subtotal:</h1>
            <p className="text-xl font-semibold text-gray-600 mb-4">
              S/. {subtotal.toFixed(2)}
            </p>

            {/* Text despliegue del input */}
            <p
              onClick={() => setShowCouponInput(!showCouponInput)}
              className="text-sm text-blue-500 underline cursor-pointer hover:text-blue-800 mb-3"
            >
              Insertar cupón de descuento
            </p>

            {/* Input y boton para aplicar cupón */}
            {showCouponInput && (
              <div className="py-4">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Código"
                  className="w-2/3 max-w-[200px]  border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
                />
                <button
                  className="bg-[#E2A555] text-black px-3 py-2 rounded text-sm hover:bg-emerald-300 ml-2"
                  onClick={() => alert(`Cupón aplicado: ${couponCode}`)}
                >
                  Aplicar
                </button>
              </div>
            )}
            <button
              onClick={() => setShowPaymentModal(true)}
              className="cursor-pointer lg:w-3/4 w-full bg-[#E2A555] text-black py-3 rounded hover:bg-emerald-300 transition mb-3 flex justify-center "
            >
              Continuar con el pago →
            </button>

            <Link
              to="/storepage"
              className="text-center text-sm text-blue-500 underline cursor-pointer hover:text-blue-800"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      )}

      {/* ------- Modal de Metodos de pago ----------- */}
      {showPaymentModal && (
        <PaymentOptionsModal
          onSelectOption={(option) => {
            setShowPaymentModal(false);
            if (option === "tienda") {
              setShowContactModal(true);
            } else if (option === "online_retirar") {
              localStorage.setItem("tipoPago", "retiro");
              navigate("/checkoutpage");
            }

            console.log("Usuario eligió:", option);
            // Aquí puedes redirigir usando `navigate` o guardar en estado global
          }}
          onClose={() => setShowPaymentModal(false)}
        />
      )}

      {/* --------- Modal de Contacto -------- */}
      {showContactModal && (
        <ContactModal
          title="Puedes visitarnos en nuestra tienda física"
          onClose={() => setShowContactModal(false)}
        >
          <Contact />
        </ContactModal>
      )}
    </div>
  );
};

export default Cart;
