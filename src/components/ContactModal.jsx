import React from "react";

const ContactModal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-[#dde2f5] bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl py-12 rounded-xl shadow-lg relative overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold text-center">{title}</h2>
        <div>{children}</div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-lg lg:font-medium font-semibold"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ContactModal;
