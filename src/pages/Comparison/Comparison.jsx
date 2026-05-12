import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getCourseById from "../../core/services/api/Get/getCourseById";
import GradeIcon from "@mui/icons-material/Grade";
import PeopleIcon from "@mui/icons-material/People";
import TagIcon from "@mui/icons-material/Tag";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Lottie from "lottie-react";
import infinity from "../../assets/Images/Infinity Loader.json";
import compare from "../../assets/Images/Compare.json";
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import img2 from "../../assets/Images/Rectanglee.png";

const ApiData = (Data) => {
  const categories = Array.isArray(Data.courseTech)
    ? Data.courseTech.map((t) => t.tech.techName)
    : "بدون دسته‌بندی";

  const startDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(Data.startTime));

  const endDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(Data.endTime));

  return {
    courseId: Data.courseId,
    imageAddress: Data.imageAddress || img2,
    title: Data.title,
    currentRate: String(Data.currentRate).slice(0, 3),
    categories: categories,
    courseLevelName: Data.courseLevelName,
    courseStatusName: Data.courseStatusName,
    teacherName: Data.teacherName,
    startDate: startDate,
    endTime: endDate,
    studentsCount: Data.studentCount,
    capacity: Data.capacity,
    cost: Data.cost,
  };
};

const CourseCard = ({ title, data }) => {
  const {
    currentRate,
    categories,
    capacity,
    cost,
    courseLevelName,
    courseStatusName,
    teacherName,
    imageAddress,
    startDate,
    endTime,
    courseId,
    studentsCount,
  } = data;

  const details = [
    {
      label: "امتیاز دوره",

      value: currentRate,
      icon: <GradeIcon className="text-yellow-500" />,
      highlight: true,
    },
    {
      label: "سطح دوره",
      value: courseLevelName,
      icon: <PsychologyIcon className="text-[#008C78]" />,
    },
    {
      label: "وضعیت ثبت نام",
      value: courseStatusName,
      icon: <CheckCircleIcon className="text-[#008C78]" />,
    },
    {
      label: "استاد",
      value: teacherName,
      icon: <AssignmentIndIcon className="text-[#008C78]" />,
    },
    {
      label: "تاریخ شروع",
      value: startDate,
      icon: <CalendarMonthIcon className="text-[#008C78]" />,
    },
    {
      label: "تاریخ پایان",
      value: endTime,
      icon: <CalendarMonthIcon className="text-[#008C78]" />,
    },
    {
      label: "ظرفیت دوره",
      value: capacity,
      icon: <ReduceCapacityIcon className="text-[#008C78]" />,
    },
  ];

  return (
    <div
      className="
      group
      w-full
      max-w-[19rem]
      sm:max-w-[22rem]
      md:max-w-[24rem]
      lg:max-w-[26rem]
      xl:max-w-[28rem]
      2xl:max-w-[30rem]
      mx-auto
      overflow-hidden
      rounded-2xl
      bg-white dark:bg-[#2f2f2f]
      shadow-lg
      hover:shadow-2xl
      transition-all duration-500
      hover:-translate-y-1
    "
    >
      <div className="relative overflow-hidden">
        <img
          className="
          w-full
          h-[180px]
          sm:h-[210px]
          md:h-[230px]
          lg:h-[250px]
          xl:h-[270px]
          2xl:h-[290px]
          object-cover
          transition-transform duration-700
          group-hover:scale-105
        "
          src={imageAddress || img2}
          onError={(e) => {
            e.currentTarget.src = img2;
          }}
          alt={title}
        />

        <div
          className="
          absolute inset-0
          bg-gradient-to-t
          from-black/40
          via-black/10
          to-transparent
        "
        />
      </div>

      <div
        className="
        px-4
        sm:px-5
        md:px-6
        pt-4
        sm:pt-5
        md:pt-6
      "
      >
        <h3
          className="
          text-center
          font-extrabold
          leading-snug
          tracking-tight
          text-black dark:text-[#e2e2e2]
          text-[1rem]
          sm:text-[1.1rem]
          md:text-[1.2rem]
          lg:text-[1.3rem]
        "
        >
          {title}
        </h3>
      </div>

      <div
        className="
        px-4
        sm:px-5
        md:px-6
        pt-5
        min-h-[90px]
        sm:min-h-[100px]
      "
      >
        <h4
          className="
          mb-3
          flex items-center
          font-semibold
          text-gray-700 dark:text-[#bdbdbd]
          text-xs
          sm:text-sm
        "
        >
          <TagIcon
            className="
            ml-1
            w-4 h-4
            shrink-0
            text-gray-600 dark:text-[#bdbdbd]
          "
          />
          تکنولوژی ها:
        </h4>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat, index) => (
            <span
              key={index}
              className="
              px-2.5
              sm:px-3
              py-1
              rounded-full
              bg-green-100
              text-green-700
              text-[10px]
              sm:text-xs
              md:text-sm
              font-semibold
              whitespace-nowrap
            "
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div
        className="
        px-4
        sm:px-5
        md:px-6
        pt-5
        space-y-3
      "
      >
        {details.map((item, index) => (
          <div
            key={index}
            className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-2
            border-b
            border-gray-200 dark:border-[#444]
            pb-4
          "
          >
            <div
              className="
              flex
              items-center
              text-gray-700 dark:text-[#bdbdbd]
              font-medium
              text-xs
              sm:text-sm
              md:text-[15px]
            "
            >
              <span
                className="
                ml-2
                flex
                w-5 h-5
                items-center
                justify-center
                shrink-0
              "
              >
                {item.icon}
              </span>

              <span className="break-words">{item.label}:</span>
            </div>

            <div
              className={`
              font-bold
              text-xs
              sm:text-sm
              md:text-[15px]
              break-words
              ${
                item.highlight
                  ? "text-yellow-600"
                  : "text-gray-800 dark:text-[#e5e5e5]"
              }
            `}
            >
              {item.value}
            </div>
          </div>
        ))}

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-3
          pt-3
        "
        >
          <div
            className="
            rounded-xl
            border border-gray-100 dark:border-[#444]
            bg-gray-50 dark:bg-[#262626]
            p-3
            sm:p-4
          "
          >
            <p
              className="
              flex items-center
              text-gray-600 dark:text-[#bdbdbd]
              text-[11px]
              sm:text-xs
              md:text-sm
            "
            >
              <PeopleIcon className="w-4 h-4 ml-1 shrink-0" />
              تعداد دانشجو:
            </p>

            <p
              className="
              mt-3
              font-extrabold
              text-[#008C78]
              text-lg
              sm:text-xl
              md:text-2xl
              break-words
            "
            >
              {studentsCount} نفر
            </p>
          </div>

          <div
            className="
            rounded-xl
            border border-gray-100 dark:border-[#444]
            bg-gray-50 dark:bg-[#262626]
            p-3
            sm:p-4
          "
          >
            <p
              className="
              flex items-center
              text-gray-600 dark:text-[#bdbdbd]
              text-[11px]
              sm:text-xs
              md:text-sm
            "
            >
              <AttachMoneyIcon className="w-4 h-4 ml-1 shrink-0" />
              قیمت دوره:
            </p>

            <p
              className="
              mt-3
              font-extrabold
              text-[#008C78]
              text-lg
              sm:text-xl
              md:text-2xl
              break-words
            "
            >
              {cost} تومان
            </p>
          </div>
        </div>

        <Link to={`/courseDetail/${courseId}`} className="block">
          <div
            className="
            mt-6
            sm:mt-7
            md:mt-8
            mb-4
            rounded-xl
            bg-[#008C78]
            py-3
            sm:py-3.5
            text-center
            text-white
            font-bold
            text-sm
            sm:text-base
            cursor-pointer
            transition-all
            duration-300
            hover:bg-[#007565]
            hover:shadow-lg
            active:scale-[0.98]
          "
          >
            <button>جزئیات دوره</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

const Comparison = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [searchParams] = useSearchParams();
  const courseId1 = searchParams.get("course1");
  const courseId2 = searchParams.get("course2");

  const { data: courseData1, isLoading: loading1 } = useQuery({
    queryKey: ["courseDetail", courseId1],
    queryFn: () => getCourseById(courseId1),

    enabled: !!courseId1,
  });

  const { data: courseData2, isLoading: loading2 } = useQuery({
    queryKey: ["courseDetail", courseId2],
    queryFn: () => getCourseById(courseId2),

    enabled: !!courseId2,
  });

  const isLoading = loading1 || loading2;

  const course1 = courseData1 ? ApiData(courseData1) : null;
  const course2 = courseData2 ? ApiData(courseData2) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#F3F4F6] dark:bg-[#1e1e1e] ">
        <Lottie animationData={infinity} />
        <h2 className=" text-lg sm:text-2xl text-[black] dark:text-[white]">
          درحال بارگذاری اطلاعات دوره‌ها...
        </h2>
      </div>
    );
  }

  return (
    <div
      className="
      relative
      min-h-screen
      overflow-hidden
      bg-[#F3F4F6]
      dark:bg-[#1e1e1e]

      px-3
      py-6

      sm:px-5
      sm:py-8

      md:px-8
      md:py-10

      lg:px-10
      lg:py-12

      xl:px-14
      xl:py-14

      2xl:px-20
      2xl:py-16
    "
    >
      <div
        className="
        absolute
        top-[-120px]
        right-[-120px]
        w-[250px]
        h-[250px]
        sm:w-[320px]
        sm:h-[320px]
        md:w-[380px]
        md:h-[380px]
        rounded-full
        bg-[#008C78]/20
        blur-3xl
        pointer-events-none
      "
      />
      <div
        className="
        absolute
        top-[-120px]
        left-[-120px]
        w-[250px]
        h-[250px]
        sm:w-[320px]
        sm:h-[320px]
        md:w-[380px]
        md:h-[380px]
        rounded-full
        bg-[#008C78]/20
        blur-3xl
        pointer-events-none
      "
      />

      <div className=" z-10">
        <h2
          className="
          text-center
          font-extrabold
          tracking-tight
          leading-snug
          text-[#1E1E1E]
          dark:text-white

          text-2xl
          sm:text-3xl
          md:text-4xl
          lg:text-5xl

          mb-8
          sm:mb-10
          md:mb-12
          lg:mb-14
        "
        >
          مقایسه دوره‌ها
        </h2>
      </div>

      <div
        className="
    absolute
    inset-0
   
    flex
    items-center
    justify-center

    pointer-events-none

    z-0
    
  "
      >
        <Lottie
          className=" lg:!w-[200px]  lg:!h-[200px] xl:!w-[300px] xl:!h-[300px] 2xl:!w-[400px] 2xl:!h-[400px]  hidden lg:block"
          animationData={compare}
        />
      </div>

      <div
        className="
        relative
        z-10

        flex
        flex-col
        sm:flex-col
        md:flex-row
        lg:flex-row
        xl:flex-row
        2xl:flex-row

        items-center
        justify-center

        gap-5
        sm:gap-6
        md:gap-8
        lg:gap-10
        xl:gap-12

        max-w-[1800px]
        mx-auto
      "
      >
        <CourseCard title={course1.title} data={course1} />

        <CourseCard title={course2.title} data={course2} />
      </div>
    </div>
  );
};

export default Comparison;
