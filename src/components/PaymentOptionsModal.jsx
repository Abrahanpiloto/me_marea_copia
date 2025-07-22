import React from "react";
import { FaStore, FaMoneyBillWave, FaHome, FaTruck } from "react-icons/fa";

const PaymentOptionsModal = ({ onSelectOption, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#dde2f5] p-6 lg:px-20 lg:py-10 rounded-md w-full lg:max-w-4xl shadow-xl text-center">
        <h2 className="text-xl font-semibold mb-6">
          Por favor elige una forma de pago
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <button
            onClick={() => onSelectOption("tienda")}
            className="rounded-lg p-4 flex flex-col items-center bg-[#E2A555] hover:bg-emerald-300 cursor-pointer"
          >
            <FaStore className="text-3xl mb-2 text-gray-700" />
            <span>Ir personalmente a la tienda y pagar</span>
          </button>

          <button
            onClick={() => onSelectOption("online_retirar")}
            className="rounded-lg p-4 flex flex-col items-center bg-[#E2A555] hover:bg-emerald-300 cursor-pointer"
          >
            <FaMoneyBillWave className="text-3xl mb-2 text-gray-700" />
            <span>Pagar en línea y retirar personalmente en la tienda</span>
          </button>

          <button
            onClick={() => onSelectOption("online_envio")}
            className="rounded-lg p-4 flex flex-col items-center bg-[#E2A555] hover:bg-emerald-300 cursor-pointer"
          >
            <FaHome className="text-3xl mb-2 text-gray-700" />
            <span>Pagar en línea y recibirlo en mi dirección</span>
          </button>

          <button
            onClick={() => onSelectOption("contraentrega")}
            className="rounded-lg p-4 flex flex-col items-center bg-[#E2A555] hover:bg-emerald-300 cursor-pointer"
          >
            <FaTruck className="text-3xl mb-2 text-gray-700" />
            <span>Pago contraentrega (recibo el producto y pago)</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 text-sm text-black lg:font-semibold hover:underline cursor-pointer"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default PaymentOptionsModal;
