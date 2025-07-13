import { supabase } from "../../supabase/supabaseClient";
import { getGuestId } from "../../src/utils/guestId";

export const addToCart = async (item) => {
  const guest_id = getGuestId();
  // Buscar si ya existe un producto igual en el carrito:
  const { data: existingItems, error: fetchError } = await supabase
    .from("cart_items")
    .select("*")
    .eq("guest_id", guest_id)
    .eq("product_id", item.product_id)
    .eq("size", item.size)
    .eq("color", item.color);

  if (fetchError) {
    console.error("error buscando en el carrito:", fetchError);
    throw fetchError;
  }

  if (existingItems.length > 0) {
    // Ya existe el producto en el carrito -> solo actualiza su cantidad:
    const existingItem = existingItems[0];
    const newQuantity = existingItem.quantity + item.quantity;

    const { error: updateError } = await supabase
      .from("cart_items")
      .update({ quantity: newQuantity })
      .eq("id", existingItem.id);

    if (updateError) {
      console.error("Error actualizando la cantidad:", updateError);
      throw updateError;
    }
  } else {
    // No existe -> insertar nuevo:
    const { error: insertError } = await supabase.from("cart_items").insert([
      {
        ...item,
        guest_id,
      },
    ]);
    if (insertError) {
      console.error("error al agregar al carrito: ", insertError);
      throw insertError;
    }
  }
};
