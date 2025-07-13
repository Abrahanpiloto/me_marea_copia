import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const Example = () => {
  return (
    <FlyoutLink href="#" FlyoutContent={categoryStore}>
      Tienda
    </FlyoutLink>
  );
};

const FlyoutLink = ({ children, href, FlyoutContent }) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit"
    >
      <a
        href={href}
        className="text-white hover:text-blue-900 transition font-bold text-base lg:font-normal"
      >
        {children}
        <span className="text-xs">{showFlyout}</span>
        {/* style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute origin-left scale-x-0 rounded-full  transition-transform duration-300 ease-out" */}
      </a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-black rounded-2xl"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const categoryStore = () => {
  return (
    <div className="w-64 bg-white p-6 shadow-2xl rounded-2xl">
      <div className="mb-3 space-y-3">
        <h3 className="font-semibold">Categorías</h3>
        <a href="#" className="block text-sm hover:underline">
          Dama
        </a>
        <a href="#" className="block text-sm hover:underline">
          Caballero
        </a>
        <a href="#" className="block text-sm hover:underline">
          Niños
        </a>
        <a href="#" className="block text-sm hover:underline">
          Mochilas
        </a>
        <a href="#" className="block text-sm hover:underline">
          Gorras
        </a>
      </div>

      <Link
        to="/storepage"
        className="w-full rounded-lg border-1 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-[#e2a555] hover:text-white"
      >
        Ir a la tienda
      </Link>
    </div>
  );
};

export default Example;
