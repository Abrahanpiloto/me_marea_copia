import React from "react";

const Contact = () => {
  return (
    <div className="py-12 max-w-6xl mx-auto px-8">
      <h1 className="text-2xl font-bold mb-10 text-center">
        ¿Dónde estamos ubicados?
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Columna izquierda: información */}
        <div className="space-y-4 text-base">
          <p>
            📍 <strong>Valenciana Jesús María</strong>
          </p>
          <p>
            Tienda con vista a la calle y estacionamientos disponibles. Estamos
            en Calle Carabobo 101, Jesús María. Al lado del colegio Fe y
            Alegría. A una cuadra del cruce de la Av. Valencia con la Av. Páez.
          </p>
          <p>
            ⏰ <strong>Horario de Atención:</strong> Lunes a Sábados de 10 a.m.
            a 8 p.m. (horario corrido). Domingos con previa cita.
          </p>
          <p>
            🕒 <strong>Horario de apertura:</strong> De LUNES a DOMINGOS de 10
            a.m. a 8 p.m.
          </p>
          <p>
            📞 <strong>Información de contacto:</strong> +51 999 999 999 <br />
            📧 valencianastore@gmail.com
          </p>
        </div>

        {/* Columna derecha: mapa */}
        <div className="w-full h-[300px] md:h-[400px]">
          <iframe
            title="Ubicación de Valenciana"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.485845175711!2d-77.04419520000003!3d-12.078855799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8f0966b7c79%3A0xbe0c1d1d2640cb73!2sFe%20y%20Alegr%C3%ADa%20del%20Per%C3%BA!5e0!3m2!1ses!2spe!4v1753053792208!5m2!1ses!2spe"
            referrerPolicy="no-referrer-when-downgrade"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
