<<<<<<< HEAD:frontend/src/components/course/CourseLevelFilter/CourseLevelFilter.jsx
import { useState, useEffect } from "react";
import Arrow from "../../../assets/Icons/Arrow";
import getCourseLevel from "../../../core/services/api/get/getCourseLevel";
import { useTranslation } from "react-i18next";

const CourseLevelFilter = ({ handleSetCourseLevel }) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleRadioChange = (id) => {
    setSelectedLevel(id);
    handleSetCourseLevel(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCourseLevel();
      setLevels(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full p-4 bg-white rounded-[15px] dark:bg-[#454545] md:w-[100%] lg:w-[284px]">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full cursor-pointer dark:text-[#DDDDDD]"
      >
        <span className="font-bold text-[18px]">
          {t("courseLevelFilter.title")}
        </span>
        <button className={`${isOpen ? "rotate-90" : "rotate-270"}`}>
          <Arrow />
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-4">
          {levels.map((item) => (
            <label key={item.id} className="flex items-center gap-2">
              <input
                type="radio"
                name="course-level"
                checked={selectedLevel === item.id}
                onChange={() => handleRadioChange(item.id)}
                className="w-[20px] h-[20px] accent-[#008C78]"
              />
              <span className="dark:text-[#CCCCCC]">{item.levelName}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseLevelFilter;
=======
import { useState, useEffect } from "react";
import Arrow from "../../../assets/Icons/Arrow";
import getCourseLevel from "../../../core/services/api/get/getCourseLevel";
import { useTranslation } from "react-i18next";

const CourseLevelFilter = ({ handleSetCourseLevel }) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleRadioChange = (id) => {
    setSelectedLevel(id);
    handleSetCourseLevel(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCourseLevel();
      setLevels(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full p-4 bg-white rounded-[15px] dark:bg-[#454545] md:w-[100%] lg:w-[284px]">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full cursor-pointer dark:text-[#DDDDDD]"
      >
        <span className="font-bold text-[18px]">
          {t("courseLevelFilter.title")}
        </span>
        <button className={`${isOpen ? "rotate-90" : "rotate-270"}`}>
          <Arrow />
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-4">
          {levels.map((item) => (
            <label key={item.id} className="flex items-center gap-2">
              <input
                type="radio"
                name="course-level"
                checked={selectedLevel === item.id}
                onChange={() => handleRadioChange(item.id)}
                className="w-[20px] h-[20px] accent-[#008C78]"
              />
              <span className="dark:text-[#CCCCCC]">{item.levelName}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseLevelFilter;
>>>>>>> b25c6f7f5eb54a940fdd4c9c6f9c064a3c961de5:src/components/course/CourseLevelFilter/CourseLevelFilter.jsx
