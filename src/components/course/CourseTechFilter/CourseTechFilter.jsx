// import { useState, useEffect } from "react";
// import Arrow from "../../../assets/Icons/Arrow";
// import getCourseTechnologies from "../../../core/services/api/get/getCourseTechnologies";
// import { useTranslation } from "react-i18next";

// const CourseTechFilter = ({ handleSetTechnologies }) => {
//   const { t } = useTranslation();

//   const [isOpen, setIsOpen] = useState(false);
//   const [technologies, setTechnologies] = useState([]);
//   const [selected, setSelected] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getCourseTechnologies();

//       const unique = Array.from(
//         new Map(data.map((item) => [item.techName, item])).values()
//       );

//       setTechnologies(unique);
//     };
//     fetchData();
//   }, []);

//   const handleChange = (id) => {
//     const updated = selected.includes(id)
//       ? selected.filter((x) => x !== id)
//       : [...selected, id];

//     setSelected(updated);
//     handleSetTechnologies(updated.join(","));
//   };

//   return (
//     <div className="flex flex-col gap-4 w-full p-4 bg-white rounded-[15px] dark:bg-[#454545] md:w-[284px]">
//       <div
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex justify-between items-center w-full cursor-pointer   dark:text-[#DDDDDD]"
//       >
//         <span className="font-bold text-[18px]">
//           {t("courseTechFilter.title")}
//         </span>
//         <button className={`${isOpen ? "rotate-90" : "rotate-270"}`}>
//           <Arrow />
//         </button>
//       </div>

//       {isOpen && (
//         <div className="flex flex-col gap-4">
//           {technologies.map((item) => (
//             <label key={item.id} className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={selected.includes(item.id)}
//                 onChange={() => handleChange(item.id)}
//                 className="w-[26px] h-[26px] rounded-2xl border-gray-300"
//               />
//               <span className="dark:text-[#CCCCCC]">{item.techName}</span>
//             </label>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseTechFilter;

import { useState, useEffect } from "react";
import Arrow from "../../../assets/Icons/Arrow";
import getCourseTechnologies from "../../../core/services/api/get/getCourseTechnologies";
import { useTranslation } from "react-i18next";

const CourseTechFilter = ({ handleSetTechnologies }) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [technologies, setTechnologies] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCourseTechnologies();
      const unique = Array.from(
        new Map(data.map((item) => [item.techName, item])).values(),
      );
      setTechnologies(unique);
    };
    fetchData();
  }, []);

  const handleChange = (techName) => {
    const updated = selected.includes(techName)
      ? selected.filter((item) => item !== techName)
      : [...selected, techName];

    setSelected(updated);
    handleSetTechnologies(updated.join(","));
  };

  return (
    <div className="flex flex-col gap-4 w-full p-4 bg-white rounded-[15px] dark:bg-[#454545] md:w-[100%] lg:w-[284px]">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full cursor-pointer dark:text-[#DDDDDD]"
      >
        <span className="font-bold text-[18px]">
          {t("courseTechFilter.title")}
        </span>
        <button className={`${isOpen ? "rotate-90" : "rotate-270"}`}>
          <Arrow />
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-4">
          {technologies.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(item.techName)}
                onChange={() => handleChange(item.techName)}
                className="w-[26px] h-[26px] rounded-2xl border-gray-300"
              />
              <span className="dark:text-[#CCCCCC]">{item.techName}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseTechFilter;
