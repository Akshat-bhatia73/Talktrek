import { RiChat3Line } from "react-icons/ri";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 cursor-default">
      <div className="bg-blue-600 shadow-lg text-white rounded-lg p-1">
        <RiChat3Line size={25} />
      </div>
      <h1 className="font-bold text-lg">Talktrek</h1>
    </div>
  );
};

export default Logo;
