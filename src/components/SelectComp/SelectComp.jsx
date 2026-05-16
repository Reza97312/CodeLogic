import React from "react";
import Select from "react-select";

const SelectComp = ({
  placeholder = "انتخاب کنید...",
  isRtl = true,
  onChange,
}) => {
  const options = [
    { value: "news", label: isRtl ? "اخبار" : "News" },
    { value: "courses", label: isRtl ? "دوره‌ها" : "Courses" },
  ];

  return (
    <div className={isRtl ? "text-right" : "text-left"}>
      <Select
        onChange={(selected) => onChange(selected ? selected.value : "")}
        defaultValue={options[0]}
        options={options}
        isClearable
        placeholder={placeholder}
        isRtl={isRtl}
        classNames={{
          control: ({ isFocused }) => {
            const classes = [
              "font-medium",
              "w-[150px] sm:w-[150px] md:w-[200px] lg:w-[150px] xl:w-[250px]",
              "border-none",
              "outline-none",
              "focus:outline-none",
              "focus:ring-0",
              "focus:border-none",
              "rounded-[28px]",
              "bg-transparent",
              "px-2",
              "py-1",
              "shadow-none",
              "cursor-pointer",
              "ml-10",
              "transition-all",
              "duration-200",
              "dark:bg-[#2a2a2a]",
              "dark:text-white",
            ];
            if (isFocused) classes.push("ring-2", "ring-[#008c78]");
            return classes.join(" ");
          },
          placeholder: () =>
            ["text-center", "text-[#7e7e7e]", "dark:text-[#aaa]"].join(" "),
          singleValue: () =>
            ["text-center", "text-[#7e7e7e]", "dark:text-[#aaa]"].join(" "),
          menu: () =>
            [
              "border",
              "border-[#008c778d]",
              "rounded-lg",
              "bg-white",
              "mt-1",
              "z-10",
              "dark:bg-[#2a2a2a]",
              "dark:border-[#008c78]",
            ].join(" "),
          option: ({ isFocused, isSelected }) => {
            const cls = [
              "px-3",
              "py-2",
              "cursor-pointer",
              "text-center",
              "bg-[#008c778d]",
            ];
            if (isFocused) cls.push("bg-[#008c778d]");
            if (isSelected)
              cls.push(
                "bg-white",
                "text-black",
                "dark:bg-[#333]",
                "dark:text-white",
              );
            return cls.join(" ");
          },
        }}
        styles={{
          control: (base) => ({
            ...base,
            direction: isRtl ? "rtl" : "ltr",
            textAlign: isRtl ? "right" : "left",
            border: "none",
            boxShadow: "none",
            outline: "none",
            backgroundColor: "transparent",
            "&:hover": {
              border: "none",
            },
          }),
          menu: (base) => ({
            ...base,
            direction: isRtl ? "rtl" : "ltr",
            textAlign: isRtl ? "right" : "left",
          }),
        }}
      />
    </div>
  );
};

export default SelectComp;
