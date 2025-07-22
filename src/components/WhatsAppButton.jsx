import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "51916058633"; // ← Reemplaza con tu número (con código de país, sin "+")
  const message = "¡Hola! Estoy interesado en un producto de tu tienda 😊";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 right-4 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all flex items-center justify-center"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppButton;
