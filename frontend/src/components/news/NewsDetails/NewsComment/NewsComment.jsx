import React, { useState } from "react";
import PersonalComment from "../PersonalComment/PersonalComment";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NewsCommentValcomment } from "../../../../utils/Validations/NewsCommentVal/NewsCommentVal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddNewsDetailsComment from "../../../../core/services/api/post/AddNewsDetailsComment";
import getNewsDetailComment from "../../../../core/services/api/Get/getNewsDetailComment";
import { toast } from "react-toastify";
import getNewsDetails from "../../../../core/services/api/Get/NewsDetails";

const NewsComment = ({ newsId }) => {
  const [initialValues] = useState({ titlecomment: "", description: "" });
  const [validationSchema, setValidationSchema] = useState(
    NewsCommentValcomment(),
  );

  const { t } = useTranslation();

  const { data: commentsResponse } = useQuery({
    queryKey: ["newsComments", newsId],
    queryFn: () => getNewsDetailComment(newsId),
    enabled: Boolean(newsId),
  });

  const { data: response } = useQuery({
    queryKey: ["getnewsdetail", newsId],

    queryFn: () => getNewsDetails(newsId),
  });

  const newsDetail = response?.detailsNewsDto;

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

  const [activeTab, setActiveTab] = useState("details");

  const queryClient = useQueryClient();

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: (payload) => AddNewsDetailsComment(payload),
    onSuccess: () => {
      toast.success(t("newsComment.comments.toastsuc"));
      queryClient.invalidateQueries(["newsComments", newsId]);
    },
    onError: (error) => {
      if (error?.response?.status === 401) return;
      toast.error(t("newsComment.comments.toasterr"));
    },
  });

  const handleSubmit = (values, { resetForm }) => {
    if (!newsId) {
      return;
    }

    const payload = {
      newsId: newsId,
      title: values.titlecomment,
      describe: values.description,
    };

    addComment(payload);
    resetForm();
  };

  return (
    <div className="px-10 w-full   ">
      <div className="py-10 px-0 sm:px-4  ">
        <button
          onClick={() => setActiveTab("details")}
          className={` px-3 py-1.5 sm:px-6 sm:py-3 font-bold  text-[12px] sm:text-[16px] rounded-4xl transition-colors cursor-pointer dark:text-[white] ${
            activeTab === "details"
              ? "bg-[#008C78] text-white"
              : "text-[#1E1E1E] hover:text-[#008C78]"
          }`}
        >
          {t("newsComment.tabs.details")}
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className={`px-3 py-1.5 sm:px-6 sm:py-3 font-bold  text-[12px] sm:text-[16px] rounded-4xl transition-colors cursor-pointer dark:text-[white] ${
            activeTab === "comments"
              ? "bg-[#008C78] text-white"
              : "text-[#1E1E1E] hover:text-[#008C78]"
          }`}
        >
          {t("newsComment.tabs.comments")}
        </button>
      </div>

      {activeTab === "details" && (
        <div className="space-y-4 leading-8 text-gray-700 ">
          <div className="mb-10 ">
            <p className="font-[16px] text-[#848484] text-wrap break-words ">
              {newsDetail.describe}
            </p>
          </div>
        </div>
      )}

      {activeTab === "comments" && (
        <div className=" w-full  ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="">
                <div className="w-full bg-[white] rounded-t-3xl px-6 py-4 flex flex-wrap dark:bg-[#333] relative  ">
                  <p className="text-[black] font-bold text-[16px] sm:text-[18px] w-full mb-7 dark:text-[white]">
                    {t("newsComment.comments.allComments")}
                    <span className="text-[#1E1E1E] mr-3 bg-[#EAEAEA] rounded-full px-3 py-1 font-bold text-[14px] sm:text-[16px] dark:bg-[#1e1e1e] dark:text-[white]">
                      {totalCommentCount}
                    </span>
                  </p>

                  <p className="text-[black] font-bold text-[14px] sm:text-[16px] mb-3 dark:text-[white]">
                    {t("newsComment.comments.titleLabel")}
                  </p>
                  <Field
                    name="titlecomment"
                    type="text"
                    className="w-full px-2.5 py-1.5 sm:px-5 sm:py-3 text-[14px] sm:text-[16px] text-[#848484] mb-10 rounded-4xl outline-none border-none bg-[#F3F4F6] dark:bg-[#9d9d9d] dark:text-[black]"
                    placeholder={t("newsComment.comments.titlePlaceholder")}
                  />
                  <div className="text-[red] absolute top-35 right-7 sm:right-10 sm:top-40 text-[14px] sm:text-[16px] ">
                    <ErrorMessage name="titlecomment" />
                  </div>

                  <p className="text-[black] font-bold text-[14px] sm:text-[16px] mb-3 dark:text-[white]">
                    {t("newsComment.comments.textLabel")}
                  </p>
                  <Field
                    name="description"
                    type="text"
                    className="w-full px-2.5 sm:px-5 pb-16 sm:pb-38 text-[#848484] text-[14px] sm:text-[16px] mb-10 h-[100px] sm:h-[200px] rounded-4xl outline-none border-none bg-[#F3F4F6] dark:bg-[#9d9d9d] dark:text-[black]"
                    placeholder={t("newsComment.comments.textPlaceholder")}
                  />

                  <div className="text-[red] absolute top-78 right-7 sm:right-10 sm:top-110  text-[14px] sm:text-[16px]">
                    <ErrorMessage name="description" />
                  </div>

                  <button
                    className="bg-[#008C78] text-white mt-4 mr-5 sm:mr-3 px-4.5 py-1 sm:px-9 sm:py-2 cursor-pointer rounded-full text-[14px] sm:text-[16px] "
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

          <PersonalComment newsId={newsId} />
        </div>
      )}
    </div>
  );
};

export default NewsComment;
