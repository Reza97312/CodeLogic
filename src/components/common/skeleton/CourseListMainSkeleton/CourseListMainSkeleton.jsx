import React from "react";
import CourseCardView1Skeleton from "../CourseCardView1Skeleton/CourseCardView1Skeleton";

const CourseListMainSkeleton = ({ count = 6 }) => {
  return (
    <div className="flex flex-row justify-center flex-wrap gap-y-8 gap-x-4">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <CourseCardView1Skeleton key={index} />
        ))}
    </div>
  );
};

export default CourseListMainSkeleton;
