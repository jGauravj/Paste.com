import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineContentCopy } from "react-icons/md";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { FormatDate } from "../utils/FormateDate";

const Paste = () => {
  const [serachTerm, setSearchTerm] = useState("");

  const pastes = useSelector((state) => state.paste.pastes);

  console.log(pastes);
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(serachTerm.toLowerCase())
  );

  // Delete paste
  const handleDelete = (pasteId) => {
    dispatch(removeFromPaste(pasteId));
  };

  // Copy paste
  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to Clipboard", {
      position: "top-right",
    });
  };

  //Share paste
  const handleShare = (pasteId) => {
    const shareUrl = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Share link copied successfully", {
      position: "top-right",
    });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center md:w-[70%] w-[95%] ">
        <div className="w-full mt-5 relative">
          <div className="text-gray-200 absolute top-1/2 left-3 transform -translate-y-1/2">
            <IoSearchOutline size={18} />
          </div>
          <input
            type="search"
            placeholder="Search here"
            value={serachTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 outline-none border border-white/5 focus:ring-1 focus:ring-white/10  w-full pl-10 rounded-2xl bg-[#171717] text-gray-200"
          />
        </div>
        <div className="mt-5 border border-white/5 flex flex-col w-full h-[600px] px-2 pb-2 rounded-2xl bg-[#171717] overflow-y-scroll my-scrollbar gap-3">
          {/* Sticky Header */}
          <div className="sticky top-0 bg-[#171717] z-10 border-b pb-2 border-white/5">
            <h1 className="pl-3 pt-3 text-gray-200 md:text-3xl font-semibold text-xl">
              All Pastes
            </h1>
          </div>

          {/* Scrollable Content */}
          <div className="flex flex-col gap-3">
            {filteredData.length > 0 &&
              filteredData.map((paste) => (
                <div
                  className="border border-white/5 bg-[#111111] rounded-xl text-[#E2E2E2] w-full px-3 relative py-4"
                  key={paste._id}
                >
                  <div className="flex md:flex-row flex-col items-start gap-2 md:items-center md:justify-between">
                    <div className="md:text-2xl text-xl font-semibold">
                      {paste.title}
                    </div>
                    <div className="flex items-center md:gap-3 gap-1">
                      {/* Edit Button */}
                      <button className="p-1 border border-gray-500/20 rounded-md transition-all hover:border-blue-500 hover:text-blue-500">
                        <Link to={`/?pasteId=${paste?._id}`}>
                          <AiTwotoneEdit />
                        </Link>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(paste?._id)}
                        className="p-1 border border-gray-500/20 rounded-md transition-all hover:border-red-500 hover:text-red-500"
                      >
                        <IoTrashOutline />
                      </button>

                      {/* Share Button */}
                      <button
                        onClick={() => handleShare(paste._id)}
                        className="p-1 border border-gray-500/20 rounded-md transition-all hover:border-green-500 hover:text-green-500"
                      >
                        <FaRegShareFromSquare />
                      </button>

                      {/* View Button */}
                      <button className="p-1 border border-gray-500/20 rounded-md transition-all hover:border-purple-500 hover:text-purple-500">
                        <Link to={`/pastes/${paste?._id}`}>
                          <IoEyeOutline />
                        </Link>
                      </button>

                      {/* Copy Button */}
                      <button
                        onClick={() => handleCopy(paste.content)}
                        className="p-1 border border-gray-500/20 rounded-md transition-all hover:border-yellow-500 hover:text-yellow-500"
                      >
                        <MdOutlineContentCopy />
                      </button>
                    </div>
                  </div>
                  <div className="flex w-full justify-between items-center mt-3">
                    <div className=" text-gray-300 text-sm md:text-base truncate md:w-1/2 w-11">
                      {paste.content}
                    </div>
                    <div className="flex text-gray-300 md:text-base text-xs ">
                      {FormatDate(paste?.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
