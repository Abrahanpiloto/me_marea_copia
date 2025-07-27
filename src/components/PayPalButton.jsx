import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalButton() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#DDE2F5]">
      <PayPalScriptProvider
        options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT }}
      >
        <div className="w-11/12 sm:w-96 lg:w-[500px]">
          <h1 className="text-2xl font-semibold mb-10">
            Por favor elige tu metodo de pago
          </h1>
          <PayPalButtons style={{ layout: "vertical" }} />
        </div>
      </PayPalScriptProvider>
    </div>
  );
}
