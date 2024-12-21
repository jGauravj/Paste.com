import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { MdContentPasteSearch } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="flex w-full min-w-full justify-center py-2 sticky top-0 z-20">
      <div className="md:w-[300px] bg-[#111111] shadow-sm w-full mx-2  flex justify-center py-1.5 border  border-white/5 rounded-full">
        <ul className="flex gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-[#171717] flex md:text-base text-sm items-center gap-2 justify-center border border-white/5 shadow-slate-700 shadow-sm w-28 text-center text-gray-300 py-1.5 rounded-full"
                : "bg-[#171717] border border-white/5 w-28 text-center py-1.5 text-gray-300 rounded-full flex items-center gap-2 justify-center hover:shadow-sm hover:shadow-slate-700 transition-all ease-linear md:text-base text-sm "
            }
          >
            <GoHome className="text-gray-300 md:text-xl text-lg" />
            Home
          </NavLink>

          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              isActive
                ? "bg-[#171717] flex items-center md:text-base text-sm gap-2 justify-center border border-white/5 shadow-slate-700 shadow-sm w-28 text-center text-gray-300 py-1.5 rounded-full "
                : "bg-[#171717] border border-white/5 w-28 text-center py-1.5 text-gray-300 rounded-full hover:shadow-sm flex items-center gap-2 justify-center hover:shadow-slate-700 transition-all ease-linear md:text-base text-sm "
            }
          >
            <MdContentPasteSearch className="text-gray-300 md:text-xl text-lg" />
            Paste
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
