import { supabase } from "../../supabase/supabaseClient";
import { getGuestId } from "./guestId";

const fetchCartCount = async () => {
  const guestId = getGuestId();
  const { data, error } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("guest_id", guestId);

  if (!error && data) {
    const totalQuantity = data.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );

    console.log("cantidad total:", totalQuantity);
    return totalQuantity;
  } else {
    console.error("Error al obtener el carrito:", error?.message);
  }
};

export default fetchCartCount;
