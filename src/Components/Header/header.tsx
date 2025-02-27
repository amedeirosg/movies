import { useState } from "react";
import { MdMovie } from "react-icons/md";
import { FaTv } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="text-white flex items-center min-h-[80px] bg-gray-600 px-5 relative ">
      {/* MOBILE */}
      <div
        className="flex flex-col gap-1 md:hidden"
        onClick={() => setOpenMenu(true)}
      >
        <div className="w-10 h-[6px] rounded bg-black"></div>
        <div className="w-10 h-[6px] rounded bg-black"></div>
        <div className="w-10 h-[6px] rounded bg-black"></div>
      </div>
      <div className="flex-grow text-center md:hidden">
        <h1 className="text-2xl font-bold">FOND</h1>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex justify-between w-full px-10">
        <div className="flex gap-10 items-center">
          <h1 className="text-2xl font-bold">FOND</h1>
          <div className="flex gap-6">
            <h2 className="cursor-pointer">Filmes</h2>
            <h2 className="cursor-pointer">Series</h2>
            <h2 className="cursor-pointer">Mais</h2>
          </div>
        </div>
        <div className="flex gap-6 items-center ">
          <h2 className="cursor-pointer">Entrar</h2>
          <h2 className="cursor-pointer">Entrar no FOND</h2>
        </div>
      </div>

      <div
        className={` md:hidden transition-all duration-300 transform w-0 absolute bg-gray-700 overflow-hidden h-screen left-0 top-0 flex flex-col ${
          openMenu ? "w-[50%]" : ""
        }`}
      >
        <div className="mt-24 text-center font-2xl flex flex-col gap-4">
          <div className="flex items-center gap-2 ml-5">
            <h2>Filmes</h2>
            <MdMovie />
          </div>
          <div className="flex items-center gap-2  ml-5">
            <h2>Series</h2>
            <FaTv />
          </div>
          <div className="flex items-center gap-2  ml-5">
            <h2>Mais</h2>
            <CiCircleMore />
          </div>
          <div
            className="absolute top-0 mt-10 left-5"
            onClick={() => setOpenMenu(false)}
          >
            <IoMdClose size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
