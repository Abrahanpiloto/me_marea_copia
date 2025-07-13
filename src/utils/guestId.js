export const getGuestId = () => {
  let guestId = localStorage.getItem("guest_id");
  if (!guestId) {
    guestId = crypto.randomUUID(); // genera un ID unico
    localStorage.setItem("guest_id", guestId);
  }
  return guestId;
};
