import { supabase } from "../../supabase/supabaseClient";
import { getGuestId } from "../utils/guestId";

export const saveOrder = async ({
  customerData,
  cartItems,
  subtotal,
  shipping,
}) => {
  const guest_id = getGuestId();
  const total = subtotal + shipping;

  const { error } = await supabase.from("orders").insert([
    {
      guest_id,
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      addres: customerData.address,
      city: customerData.city,
      country: customerData.country,
      province: customerData.province,
      items: cartItems,
      subtotal,
      shipping_cost: shipping,
      total,
    },
  ]);

  if (error) {
    console.error("Error al guardar el pedido:", error);
    throw error;
  }
};
