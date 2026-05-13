import React, { useState, useEffect } from "react";
import ImageInfo from "../ImageInfo/ImageInfo";
import CourseCommentsTab from "../CourseCommentsTab/CourseCommentsTab";
import CourseDetailSection from "../CourseDetailSection/CourseDetailSection";
import CourseDesc from "../CourseDesc/CourseDesc";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import getCourseCommnets from "../../../core/services/api/get/getCourseComments";
import { addCommentCourses } from "../../../core/services/api/post/addCommentCourses";
import { NewsCommentValcomment } from "../../../utils/Validations/NewsCommentVal/NewsCommentVal";
import PersonalCommentCourses from "../PersonalCommentCourses/PersonalCommentCourses";

const CourseDetailMain = ({ course, courseId }) => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("courseActiveTab") || "detail",
  );

  useEffect(() => {
    localStorage.setItem("courseActiveTab", activeTab);
  }, [activeTab]);

  const { t } = useTranslation();

  const { data: commentsResponse } = useQuery({
    queryKey: ["CourseCommnets", courseId],
    queryFn: () => getCourseCommnets(courseId),
    enabled: Boolean(courseId),
  });

  const commentsList = Array.isArray(commentsResponse)
    ? commentsResponse
    : Array.isArray(commentsResponse?.data)
      ? commentsResponse.data
      : Array.isArray(commentsResponse?.result)
        ? commentsResponse.result
        : Array.isArray(commentsResponse?.comments)
          ? commentsResponse.comments
          : Array.isArray(commentsResponse?.value)
            ? commentsResponse.value
            : Array.isArray(commentsResponse?.data?.items)
              ? commentsResponse.data.items
              : (() => {
                  if (!commentsResponse) return [];
                  const firstArray = Object.values(commentsResponse).find((v) =>
                    Array.isArray(v),
                  );
                  return Array.isArray(firstArray) ? firstArray : [];
                })();

  const totalCommentCount = commentsList.length;

  const queryClient = useQueryClient();

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: (payload) => addCommentCourses(payload),

    onSuccess: () => {
      toast.success(
        t("نظر شما با موفقیت ارسال شد. لطفا منتظر تایید ادمین باشید"),
      );
      queryClient.invalidateQueries(["CourseCommnets", courseId]);
    },
    onError: (error) => {
      if (error?.response?.status === 401) return;
      toast.error(t("خطا در ارسال پیام"));
    },
  });

  const handleSubmit = (values, { resetForm }) => {
    if (!courseId) {
      toast.error("آی‌دی دوره یافت نشد");
      return;
    }

    const payload = {
      id: courseId,
      title: values.titlecomment,
      describe: values.description,
    };

    addComment(payload);
    resetForm();
  };

  const [initialValues] = useState({ titlecomment: "", description: "" });
  const [validationSchema, setValidationSchema] = useState(
    NewsCommentValcomment(),
  );

  return (
    <div
      className="flex flex-col gap-4 
    md:w-[55%]
    lg:w-[55%]
    xl:w-[65%]
    2xl:w-[950px]"
    >
      <ImageInfo course={course} />
      <CourseCommentsTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "detail" && (
        <>
          <CourseDetailSection course={course} />
          <CourseDesc course={course} />
        </>
      )}
      {activeTab === "comment" && (
        <div className=" w-[85%] md:w-full  mx-auto md:mx-0 ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="">
                <div className="w-full bg-[white] rounded-t-3xl px-6 py-4 flex justify-center md:justify-start flex-wrap dark:bg-[#333] relative ">
                  <p className="text-[black] font-bold text-[18px] w-full mb-7 dark:text-[white]">
                    {t("newsComment.comments.allComments")}
                    <span className="text-[#1E1E1E] mr-3 bg-[#EAEAEA] rounded-full px-3 py-1 font-bold text-[16px] dark:bg-[#1e1e1e] dark:text-[white]">
                      {totalCommentCount}
                    </span>
                  </p>

                  <p className="text-[black] font-bold text-[16px] mb-3 dark:text-[white]">
                    {t("newsComment.comments.titleLabel")}
                  </p>
                  <Field
                    name="titlecomment"
                    type="text"
                    className="w-full px-5 py-3 text-[#848484] mb-10 rounded-4xl outline-none border-none bg-[#F3F4F6] dark:bg-[#9d9d9d] dark:text-[black]"
                    placeholder={t("newsComment.comments.titlePlaceholder")}
                  />
                  <div className="text-[red] absolute right-10 top-40">
                    <ErrorMessage name="titlecomment" />
                  </div>

                  <p className="text-[black] font-bold text-[16px] mb-3 dark:text-[white]">
                    {t("newsComment.comments.textLabel")}
                  </p>
                  <Field
                    name="description"
                    type="text"
                    className="w-full px-5 pb-38 text-[#848484] mb-10 h-[200px] rounded-4xl outline-none border-none bg-[#F3F4F6] dark:bg-[#9d9d9d] dark:text-[black]"
                    placeholder={t("newsComment.comments.textPlaceholder")}
                  />

                  <div className="text-[red] absolute right-10 top-110">
                    <ErrorMessage name="description" />
                  </div>

                  <button
                    className="bg-[#008C78] text-white w-full md:w-auto mt-4 md:mr-3 px-9 py-2.5 md:py-2 cursor-pointer rounded-full   "
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending
                      ? "در حال ارسال..."
                      : t("personalComment.replyForm.reply")}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <PersonalCommentCourses courseId={courseId} newsId={course} />
        </div>
      )}
    </div>
  );
};

export default CourseDetailMain;
