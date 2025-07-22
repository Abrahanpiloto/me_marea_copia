import React, { useState, useRef, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import {
  FaInstagram,
  FaTiktok,
  FaFacebookF,
  FaShoppingCart,
} from "react-icons/fa";
import useClickOutside from "../hooks/useClickOutside";
import FlyOutLink from "./FlyOutLink";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { getGuestId } from "../utils/guestId";
import fetchCartCount from "../utils/fetchCartCount";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showSubMenuDesktop, setShowSubMenuDesktop] = useState(false);
  const [showSubMenuMobile, setShowSubMenuMobile] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const location = useLocation();
  const menuRef = useRef();

  const subMenuDesktopRef = useRef();
  const subMenuMobileRef = useRef();

  useClickOutside(menuRef, () => setMenuOpen(false));

  useClickOutside(subMenuDesktopRef, () => setShowSubMenuDesktop(false));
  useClickOutside(subMenuMobileRef, () => setShowSubMenuMobile(false));

  useEffect(() => {
    const loadCartCount = async () => {
      const total = await fetchCartCount();

      setCartCount(total);
    };
    loadCartCount();

    const guestId = getGuestId();

    // Suscribirse a cambios en tiempo real:
    const channel = supabase
      .channel("realtime-cart")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "cart_items",
          filter: `guest_id=eq.${guestId}`,
        },
        () => {
          //Cada vez que algo cambia volvemos a contar:
          loadCartCount();
        }
      )
      .subscribe();

    // Limppieza al desmontar:
    return () => supabase.removeChannel(channel);
  }, []);

  // listener global para que el contador se actualice cuando se borre un items desde el carrito:
  useEffect(() => {
    const handleCartCountUpdate = (e) => {
      setCartCount(e.detail);
    };
    window.addEventListener("cartCountUpdated", handleCartCountUpdate);
    return () => {
      window.removeEventListener("cartCountUpdated", handleCartCountUpdate);
    };
  }, []);

  // Para el menu desplegable:
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"; //desactiva el scroll de body si el menu lateral esta abierto
    } else {
      document.body.style.overflow = "auto"; //reactiva el scroll
    }

    // por si el componente se desmonta con el menu abierto:
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 w-full h-18 bg-[#e2a555] shadow-md flex items-center px-4 z-50 justify-between lg:justify-around">
      {/* Botón hamburguesa - solo se muestra cuando el menú está cerrado */}
      {!menuOpen && (
        <button
          onClick={toggleMenu}
          className="lg:hidden relative z-50 text-4xl text-white focus:outline-none cursor-pointer hover:text-blue-900 transition"
        >
          ☰
        </button>
      )}

      {/* Logo centrado en móvil */}
      <div className="flex-grow text-center lg:flex-grow-0">
        <Link
          to="/"
          className="text-4xl font-extrabold font-dancing italic text-[#008184]"
        >
          Valenciana
        </Link>
      </div>

      {/* Menú para pantallas grandes (laptop y escritorio) */}
      <nav className="hidden lg:flex items-center gap-6 text-white font-bold text-base lg:font-normal">
        {/* ... (resto del menú para pantallas grandes) */}
        <div className="relative" ref={subMenuDesktopRef}>
          <FlyOutLink />
        </div>
        <Link to="/aboutpage" className="hover:text-blue-900 transition">
          Quiénes somos
        </Link>
        <a href="#" className="hover:text-blue-900 transition">
          Contacto
        </a>
      </nav>

      {/* ---- Icono de carrito 🛒 */}
      {location.pathname !== "/cartpage" && cartCount > 0 && (
        <Link
          to="/cartpage"
          className="relative text-white hover:text-emerald-300 transition"
        >
          <FaShoppingCart className="text-2xl mr-3.5" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      )}

      {/* Input de búsqueda para pantallas grandes */}
      <div className="hidden lg:block relative w-64">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full pl-3 pr-10 py-2 border bg-white border-gray-300 rounded-md text-sm outline-none text-black"
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          <span className="text-gray-500 text-base cursor-pointer">🔍</span>
        </div>
      </div>

      {/* Menú lateral para móvil y tablet */}
      <aside
        ref={subMenuMobileRef}
        className={`fixed top-0 left-0 h-screen w-64 bg-[#e2a555] shadow-2xl transform lg:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 overflow-y-auto border-r border-orange-900`}
      >
        <div className="p-4">
          <button
            onClick={toggleMenu}
            className="text-1xl mb-6 text-white cursor-pointer font-extrabold hover:text-blue-900 transition"
          >
            ✕
          </button>

          <nav className="flex flex-col gap-4 text-white font-bold text-base mb-4">
            {/* ... (resto del menú lateral) */}
            <div>
              <Link to="/storepage" className="hover:text-blue-900 transition">
                Tienda
              </Link>
              <button
                className="text-sm focus:outline-none ml-2 cursor-pointer lg:hidden"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSubMenu(!showSubMenu);
                }}
              >
                {showSubMenu ? "▲" : "▼"}
              </button>
            </div>
            {showSubMenu && (
              <div className="ml-4 flex flex-col gap-2 text-sm text-white ">
                <a href="#" className="hover:text-blue-900 transition">
                  Dama
                </a>
                <a href="#" className="hover:text-blue-900 transition">
                  Caballero
                </a>
                <a href="#" className="hover:text-blue-900 transition">
                  Niño
                </a>
                <a href="#" className="hover:text-blue-900 transition">
                  Mochilas
                </a>
                <a href="#" className="hover:text-blue-900 transition">
                  Gorras
                </a>
                {showSubMenu && (
                  <div className="mt-4 flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center">
                      <img
                        src="/caballero.jpg"
                        alt="Producto 1"
                        className="w-50 h-64 object-cover rounded-md"
                      />
                      <button className="mt-2 w-42 bg-white text-indigo-700 font-semibold px-3 py-1 text-sm rounded hover:bg-blue-200 transition cursor-pointer">
                        <span className="text-black font-light">Sudadera</span>{" "}
                        <br />
                        Comprar
                      </button>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="/dama.jpg"
                        alt="Producto 2"
                        className="w-50 h-64 object-cover rounded-md"
                      />
                      <button className="mt-2 w-42 bg-white text-indigo-700 font-semibold px-3 py-1 text-sm rounded hover:bg-blue-200 transition cursor-pointer">
                        <span className="text-black font-light">
                          Conjunto gym
                        </span>{" "}
                        <br />
                        Comprar
                      </button>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="/gorra.jpg"
                        alt="Producto 3"
                        className="w-50 h-64 object-cover rounded-md"
                      />
                      <button className="mt-2 w-42 bg-white text-indigo-700 font-semibold px-3 py-1 text-sm rounded hover:bg-blue-200 transition cursor-pointer">
                        <span className="text-black font-light">Gorra</span>{" "}
                        <br />
                        Comprar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            <a href="#" className="hover:text-blue-900 transition">
              Quiénes somos
            </a>
            <a href="#" className="hover:text-blue-900 transition">
              Contacto
            </a>
          </nav>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-3 pr-10 py-2 border bg-white border-gray-300 rounded-md text-sm outline-none"
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              <span className="text-gray-500 text-base cursor-pointer">🔍</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center cursor-pointer">
            <a className="text-white font-bold hover:text-blue-900 transition">
              +51 999 999 999
            </a>
          </div>
        </div>
      </aside>
    </header>
  );
};

export default Navbar;
