import React from "react";
import gif from "../../assets/Images/Error 404.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-wrap items-center justify-center ">
      <Lottie className="h-[85vh] w-screen" animationData={gif} loop={true} />
      <Link
        className="bg-[#008C78] font-semibold rounded-3xl p-3 text-[white]"
        to="/"
      >
        بازگشت به صفحه اصلی{" "}
      </Link>
    </div>
  );
};

export default NotFound;
