import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";

const ViewPaste = () => {
  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log("Final paste", paste);

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center md:w-[70%] w-[95%]">
        <div className="mt-5 flex gap-4 w-full justify-center ">
          <div className="w-full relative">
            <div className="text-gray-200 absolute top-1/2 left-3 transform -translate-y-1/2">
              <IoSearchOutline size={18} />
            </div>
            <input
              type="text"
              placeholder="Enter title here"
              value={paste.title}
              disabled
              className="py-2 outline-none border border-white/5 focus:ring-1 focus:ring-white/10  w-full pl-10 rounded-2xl bg-[#171717] text-gray-200 cursor-not-allowed"
            />
          </div>
        </div>
        <div className="mt-5 border border-white/5 flex flex-col justify-between w-full h-[600px]  px-2 pb-2 rounded-2xl bg-[#171717]">
          <div className="flex gap-1 mt-5 ml-2">
            <div className="w-3  rounded-full h-3 bg-[#FF3B30]"></div>
            <div className="w-3 rounded-full h-3 bg-[#34C759]"></div>
            <div className="w-3 rounded-full h-3 bg-[#FF9500]"></div>
          </div>
          <div className="w-full flex items-end">
            <textarea
              placeholder="Enter content here"
              value={paste.content}
              disabled
              className="bg-[#111111] p-3 border outline-none border-white/10 rounded-xl text-[#E2E2E2] h-full w-full  min-h-[544px] max-h-[544px] cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
