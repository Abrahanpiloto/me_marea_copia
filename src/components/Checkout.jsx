import React from "react";

const Checkout = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 mt-20">
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
              <label className="block text-sm mb-1">Nombre completo</label>
              <input type="text" className="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm mb-1">Dirección de e-mail</label>
              <input type="email" className="w-full border rounded px-3 py-2" />
              <p className="text-sm mt-1">
                ¿Ya tienes una cuenta?{" "}
                <span className="text-orange-600 cursor-pointer">
                  Iniciar sesión
                </span>
              </p>
            </div>

            <div>
              <label className="block text-sm mb-1">Teléfono (opcional)</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="🇵🇪"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Dirección</label>
              <input type="text" className="w-full border rounded px-3 py-2" />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm mb-1">Ciudad</label>
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
                <option>Lima</option>
              </select>
            </div>

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
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded mt-4"
            >
              Continuar →
            </button>
          </form>
        </div>

        {/* --------------------- LADO DERECHO --------------------- */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white shadow-md p-5 rounded relative lg:-mt-14">
            <h2 className="text-md font-semibold mb-4">Resumen del pedido</h2>

            <div className="flex items-start gap-4 mb-4">
              <img
                src="https://via.placeholder.com/60x80"
                alt="producto"
                className="w-16 h-20 object-cover rounded"
              />
              <div>
                <p className="text-sm font-semibold">
                  Set organizador de 4 pisos negro
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button className="border px-2">-</button>
                  <span>1</span>
                  <button className="border px-2">+</button>
                </div>
              </div>
              <div className="ml-auto text-sm font-semibold">S/.119.00</div>
            </div>

            <div className="text-sm space-y-2 border-t pt-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>S/.119.00</span>
              </div>
              <div className="flex justify-between">
                <span>Envío:</span>
                <span>S/.10.00</span>
              </div>
              <p className="text-orange-600 underline text-xs cursor-pointer">
                Insertar código promocional
              </p>
              <div className="flex justify-between font-bold text-lg pt-3">
                <span>Total:</span>
                <span>S/.129.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
