import React from "react";

const UserPanelTitle = ({ titleData }) => {
  return (
    <div>
      <div
        className="hidden font-semibold text-base text-[#1E1E1E]    dark:text-[#CCCCCC]
      md:flex"
      >
        <div className={`flex ${titleData.justify1} ${titleData.w1} `}>
          <span>{titleData.title1}</span>
        </div>
        <div className={`flex ${titleData.justify2} ${titleData.w2}`}>
          <span>{titleData.title2}</span>
        </div>
        <div className={`flex ${titleData.justify3} ${titleData.w3}`}>
          <span>{titleData.title3}</span>
        </div>
        <div className={`flex  ${titleData.justify4} ${titleData.w4}`}>
          <span>{titleData.title4}</span>
        </div>
        <div className={`flex ${titleData.justify5} ${titleData.w5}`}>
          <span>{titleData.title5}</span>
        </div>
        <div className={`flex ${titleData.justify6} ${titleData.w6}`}>
          <span>{titleData.title6}</span>
        </div>
      </div>
    </div>
  );
};

export default UserPanelTitle;
