import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId, allPastes]);

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(32) + Math.random().toString(32).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // update
      dispatch(updateToPaste(paste));
    } else {
      // create
      dispatch(addToPaste(paste));
    }

    // after createtion or updation

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center md:w-[70%] w-[95%]  ">
        <div className="mt-5 flex gap-4 w-full md:flex-row flex-col justify-between relative">
          <div className="w-full relative">
            <div className="text-gray-200 absolute top-1/2 left-3 transform -translate-y-1/2">
              <IoSearchOutline size={18} />
            </div>
            <input
              type="text"
              placeholder="Title your note..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="py-2 outline-none border border-white/5 focus:ring-1 focus:ring-white/10  w-full pl-10 rounded-2xl bg-[#171717] text-gray-200"
            />
          </div>
          <button
            onClick={createPaste}
            className=" md:w-48  md:py-1 py-2 bg-violet-500 shadow-sm  text-gray-200 rounded-2xl hover:bg-violet-600 transition-all ease-linear font-medium"
          >
            {pasteId ? "Update My Paste" : "Create My Paste"}
          </button>
        </div>

        <div className="mt-5 border border-white/5 flex flex-col justify-between w-full h-[600px]  px-2 pb-2 rounded-2xl bg-[#171717]">
          <div className="flex items-center justify-between mx-2 mt-4">
            <div className="flex gap-1 ">
              <div className="w-3  rounded-full h-3 bg-[#FF3B30]"></div>
              <div className="w-3 rounded-full h-3 bg-[#34C759]"></div>
              <div className="w-3 rounded-full h-3 bg-[#FF9500]"></div>
            </div>
            <MdOutlineContentCopy
              onClick={() => {
                navigator.clipboard.writeText(value);
                toast.success("Copied to Clipboard", {
                  position: "top-right",
                });
              }}
              size={20}
              className="text-gray-300 cursor-pointer hover:text-gray-100"
            />
          </div>
          <div className="w-full flex items-end">
            <textarea
              placeholder="Write Your Content Here . . ."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="bg-[#111111] p-3 border outline-none border-white/10 rounded-xl text-[#E2E2E2] h-full w-full  min-h-[544px] max-h-[544px] "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
