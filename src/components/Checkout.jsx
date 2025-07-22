import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { getGuestId } from "../utils/guestId";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import fetchCartCount from "../utils/fetchCartCount";

const Checkout = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name: "",
    user_email: "",
    phone: "",
    address: "",
    province: "",
    country: "",
    district: "",
  });

  const navigate = useNavigate();

  // Para la opcion de retiro en tienda:
  const [tipoPago, setTipoPago] = useState(
    () => localStorage.getItem("tipoPago") || ""
  );
  const isRetiro = tipoPago === "retiro";

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = isRetiro ? 0 : 10;
  const total = subtotal + shipping;

  useEffect(() => {
    const fetchCart_items = async () => {
      const guestId = getGuestId();

      const { data, error } = await supabase
        .from("cart_items")
        .select("*")
        .eq("guest_id", guestId);

      if (!error) {
        const withQuantity = data.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }));
        setItems(withQuantity);
      } else {
        console.error("Error al traer el carrito:", error);
      }
      setLoading(false);
    };
    fetchCart_items();
  }, []);

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
    <div className="max-w-6xl mx-auto px-4 py-4 mt-20">
      {items.length === 0 ? (
        <div className="flex flex-col justify-center items-center bg-[#dde2f5] py-6 mt-18">
          <div className="mb-2 flex flex-col justify-center items-center"></div>
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
        <div className="flex flex-col lg:flex-row gap-10">
          {/* --------------------- LADO IZQUIERDO --------------------- */}
          <div className="w-full lg:w-2/3 bg-[#dde2f5] p-6 rounded shadow-sm">
            {/* Tabs (solo visuales por ahora) */}
            <div className="flex border-b mb-6">
              <button className="pb-2 px-4 border-b-2 border-orange-600 font-semibold text-sm">
                Datos del cliente
              </button>
              <button className="pb-2 px-4 text-sm text-gray-500">
                Datos de facturación
              </button>
            </div>

            <form className="space-y-5">
              <div>
                <label className="block text-sm mb-1 font-semibold">
                  Nombre completo
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-400 rounded px-3 py-2 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 font-semibold">
                  Dirección de e-mail{" "}
                  <span className="text-gray-700 font-light">
                    (no lo usaremos para enviarte publicidad o spam molestos)
                  </span>
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-400 rounded px-3 py-2 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 font-semibold">
                  Teléfono{" "}
                  <span className="text-gray-700 font-light">
                    (no lo usaremos para enviarte publicidad o spam molestos)
                  </span>
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-400 rounded px-3 py-2 bg-gray-50"
                  placeholder=""
                />
              </div>
              <p className="text-sm mt-1">
                ¿Ya tienes una cuenta?{" "}
                <span className="text-blue-600 cursor-pointer">
                  Iniciar sesión
                </span>
              </p>

              {!isRetiro && (
                <>
                  <div>
                    <label className="block text-sm mb-1">Dirección</label>
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-sm mb-1">Distrito</label>
                      <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm mb-1">País</label>
                      <select className="w-full border rounded px-3 py-2">
                        <option>Perú</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Provincia</label>
                    <select className="w-full border rounded px-3 py-2">
                      <option value="Amazonas">Amazonas</option>
                      <option value="Áncash">Áncash</option>
                      <option value="Apurímac">Apurímac</option>
                      <option value="Arequipa">Arequipa</option>
                      <option value="Ayacucho">Ayacucho</option>
                      <option value="Cajamarca">Cajamarca</option>
                      <option value="Callao">Callao</option>
                      <option value="Cusco">Cusco</option>
                      <option value="Huancavelica">Huancavelica</option>
                      <option value="Huánuco">Huánuco</option>
                      <option value="Ica">Ica</option>
                      <option value="Junín">Junín</option>
                      <option value="La Libertad">La Libertad</option>
                      <option value="Lambayeque">Lambayeque</option>
                      <option value="Lima">Lima</option>
                      <option value="Loreto">Loreto</option>
                      <option value="Madre de Dios">Madre de Dios</option>
                      <option value="Moquegua">Moquegua</option>
                      <option value="Pasco">Pasco</option>
                      <option value="Piura">Piura</option>
                      <option value="Puno">Puno</option>
                      <option value="San Martín">San Martín</option>
                      <option value="Tumbes">Tumbes</option>
                      <option value="Ucayali">Ucayali</option>
                    </select>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">
                    Utilizar una dirección de facturación diferente
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">
                    ¿Quieres crear una cuenta para futuras compras?
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#E2A555] hover:bg-emerald-300 text-black py-3 rounded mt-4 cursor-pointer"
              >
                Continuar →
              </button>
            </form>
          </div>

          {/* --------------------- RESUMEN --------------------- */}

          <div className="w-full lg:w-1/3 lg:mt-32">
            <div className="bg-white border border-gray-200 shadow-md p-5 rounded relative lg:-mt-14">
              <h2 className="text-md text-gray-600 font-semibold mb-4">
                Resumen de la compra
              </h2>

              <div>
                {items.map((item) => (
                  <div key={item.id} className="flex items-end gap-4 mb-4">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-18 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Talla: {item.size} • Color: {item.color}
                      </p>
                      <p className="text-xs text-gray-500">
                        Cantidad: {item.quantity}
                      </p>
                      <button
                        className="inline-block mt-1 text-xs text-blue-500 hover:text-blue-700 cursor-pointer"
                        onClick={() =>
                          navigate(`/productdetailspage/${item.product_id}`, {
                            state: {
                              quantity: item.quantity,
                              fromCheckout: true,
                              cartItemId: item.id,
                              size: item.size,
                              color: item.color,
                            },
                          })
                        }
                      >
                        Cambiar
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="ml-4 p-1 text-gray-700 hover:text-red-500 cursor-pointer text-sm"
                        title="Eliminar"
                      >
                        <FaRegTrashCan />
                      </button>
                    </div>

                    <div className="ml-auto text-sm font-semibold">
                      S/. {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}

                <div className="text-sm space-y-2 border-t pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>S/. {subtotal.toFixed(2)}</span>
                  </div>

                  {!isRetiro && (
                    <div className="flex justify-between">
                      <span>Envío:</span>
                      <span>S/. {shipping.toFixed(2)}</span>
                    </div>
                  )}

                  <p className="text-blue-500 underline text-xs cursor-pointer">
                    Insertar código promocional
                  </p>
                  <div className="flex justify-between font-bold text-lg pt-3">
                    <span>Total:</span>
                    <span>S/. {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
