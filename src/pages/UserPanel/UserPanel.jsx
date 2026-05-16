import React from "react";
import { Outlet } from "react-router-dom";
import UserPanelRight from "./UserPanelRight";
import UserPanelHeader from "./UserPanelHeader";

const UserPanel = () => {
  return (
    <div className="  flex min-h-screen md:h-screen w-full items-center justify-between px-6 dark:bg-[#1e1e1e]">
      <UserPanelRight />
      <div className="  mx-auto sm:mx-0 py-5 md:py-0 h-[93.75%] w-[100%] md:w-[68%] lg:w-[74.04%] flex flex-col justify-between">
        <UserPanelHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default UserPanel;
