<<<<<<< HEAD:frontend/src/components/course/AnswerCommentCourses/AnswerCommentCourses.jsx
import React, { useState, useEffect, useCallback } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NewsCommentVal } from "../../../utils/Validations/NewsCommentVal/NewsCommentVal";
import { PacmanLoader } from "react-spinners";
import GetCourseReplyComments from "../../../core/services/api/Get/GetCourseReplyComments";
import { addReplyCourseComments } from "../../../core/services/api/post/addReplyCourseComments";
import { addCourseCommentLike } from "../../../core/services/api/post/addCourseCommentLike";
import { addCourseCommentDisslike } from "../../../core/services/api/post/addCourseCommentDisslike";

const AnswerCommentCourses = ({
  commentId,
  parentId,
  image,
  date,
  text,
  title,
  name,
  initialLikeCount,
  initialDislikeCount,
  currentUserIsLike,
  currentUserIsDissLike,

  courseId,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [currentLikeStatus, setCurrentLikeStatus] = useState(0);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [dislikeCount, setDislikeCount] = useState(initialDislikeCount);

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showChildComments, setShowChildComments] = useState(false);

  const isLiked = currentLikeStatus === 1;
  const isDisliked = currentLikeStatus === -1;

  useEffect(() => {
    let initialStatus = 0;
    if (currentUserIsLike) initialStatus = 1;
    else if (currentUserIsDissLike) initialStatus = -1;

    setCurrentLikeStatus(initialStatus);
    setLikeCount(initialLikeCount);
    setDislikeCount(initialDislikeCount);
  }, [
    currentUserIsLike,
    currentUserIsDissLike,
    initialLikeCount,
    initialDislikeCount,
  ]);

  const { mutate: toggleLikeDislike } = useMutation({
    mutationFn: ({ id, isLike }) => {
      if (isLike) {
        return addCourseCommentLike(id);
      } else {
        return addCourseCommentDisslike(id);
      }
    },
    onSuccess: (data, variables) => {
      const action = variables.isLike ? "لایک" : "دیسلایک";
      toast.success(`پاسخ با موفقیت ${action} شد`);

      setCurrentLikeStatus((prevStatus) => {
        const newActionStatus = variables.isLike ? 1 : -1;
        let nextStatus = newActionStatus;

        if (prevStatus === newActionStatus) {
          nextStatus = 0;
        }

        queryClient.invalidateQueries(["replyComments", parentId]);

        return nextStatus;
      });
    },
    onError: (error, variables) => {
      const action = variables.isLike ? "لایک" : "دیسلایک";
      toast.error(`شما قبلاً آن نظر را ${action} کرده‌اید`);
      console.error(error);
    },
  });

  const handleToggleLikeDislike = useCallback(
    (id, isLike) => {
      if (!id) return;
      toggleLikeDislike({ id, isLike });
    },
    [toggleLikeDislike],
  );

  const {
    data: childCommentsResponse,
    isLoading: isLoadingChildren,
    refetch: refetchChildren,
  } = useQuery({
    queryKey: ["replyComments", commentId],
    queryFn: () => GetCourseReplyComments(courseId, commentId),

    enabled: Boolean(courseId),
  });

  const childComments = Array.isArray(childCommentsResponse)
    ? childCommentsResponse
    : Array.isArray(childCommentsResponse?.data)
      ? childCommentsResponse.data
      : [];

  const { mutate: addReply, isPending: isAddingReply } = useMutation({
    mutationFn: addReplyCourseComments,
    onSuccess: () => {
      toast.success(t("personalComment.replyForm.toastsuc"));
      setShowReplyForm(false);
      setShowChildComments(true);
      refetchChildren();
    },
    onError: () => {
      toast.error("خطا در ثبت پاسخ");
    },
  });

  const handleReplySubmit = (values, { resetForm }) => {
    const payload = {
      courseId: courseId,
      commentId: commentId,
      title: values.title,
      describe: values.answer,
    };

    if (!courseId || !commentId) {
      return;
    }

    addReply(payload);
    resetForm();
  };

  const replyValidationSchema = NewsCommentVal();

  return (
    <div className="flex flex-col w-full ">
      <div className="w-full bg-white shadow-md rounded-3xl p-5 mt-4 dark:bg-[#333] border border-gray-100 dark:border-[#333]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={image}
              className="w-10 h-10 rounded-full object-cover"
              alt="avatar"
            />
            <div>
              <p className="font-bold text-[#1E1E1E] text-[14px] dark:text-[white]">
                {name}
              </p>
              <p className="text-[12px] text-[#848484] mt-1  ">{date}</p>
            </div>
          </div>
        </div>

        <div className="mt-3 text-gray-700 text-sm leading-6">
          <p className="w-full break-words text-[#1E1E1E] text-[14px] mb-1 font-semibold dark:text-[white]">
            {title}
          </p>
          <p className="text-[#848484] break-words text-[13px]">{text}</p>
        </div>

        <div className="flex items-center flex-wrap justify-between mt-4 gap-y-4 sm:gap-y-0 ">
          <div className="flex items-center gap-2 sm:gap-4 text-gray-600 text-xs">
            <div
              onClick={() => handleToggleLikeDislike(commentId, false)}
              className={`flex items-center gap-1 cursor-pointer ${
                isDisliked
                  ? "text-[#008C78] dark:text-[#00BFA5]"
                  : "text-[#1E1E1E] dark:text-[#848484]"
              }`}
            >
              <ThumbDownOffAltOutlinedIcon
                fontSize="small"
                className={
                  isDisliked
                    ? "text-current"
                    : "text-[#1E1E1E] dark:text-[#848484]"
                }
              />

              <span>{dislikeCount}</span>
            </div>
            <div
              onClick={() => handleToggleLikeDislike(commentId, true)}
              className={`flex items-center gap-1 cursor-pointer ${
                isLiked
                  ? "text-[#008C78] dark:text-[#00BFA5]"
                  : "text-[#1E1E1E] dark:text-[#848484]"
              }`}
            >
              <ThumbUpOutlinedIcon
                fontSize="small"
                className={
                  isLiked
                    ? "text-current"
                    : "text-[#1E1E1E] dark:text-[#848484]"
                }
              />

              <span>{likeCount}</span>
            </div>
          </div>

          <div className="flex  items-center gap-3">
            <button
              onClick={() => setShowChildComments(!showChildComments)}
              className=" text-[12px] text-[#008C78]  cursor-pointer hover:underline"
            >
              {showChildComments ? "پنهان کردن پاسخ‌ها" : "مشاهده پاسخ‌ها"}
            </button>

            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center gap-1 text-[12px]  text-[#1E1E1E] dark:text-[#848484] cursor-pointer hover:text-[#008C78]"
            >
              <ChatBubbleOutlineIcon style={{ fontSize: 16 }} />
              {t("personalComment.actions.answer")}
            </button>
          </div>
        </div>
      </div>

      {showReplyForm && (
        <div className="mt-2 pr-5">
          <Formik
            initialValues={{ title: "", answer: "" }}
            validationSchema={replyValidationSchema}
            onSubmit={handleReplySubmit}
          >
            {() => (
              <Form className="bg-gray-50 dark:bg-[#444] p-4 rounded-2xl">
                <Field
                  type="text"
                  name="title"
                  className="w-full px-4 py-2 text-[13px] mb-3 rounded-xl outline-none border-none bg-white dark:bg-[#555] dark:text-white"
                  placeholder={t("personalComment.replyForm.titlePlaceholder")}
                />
                <div className="text-[red] text-xs mb-2">
                  <ErrorMessage name="title" />
                </div>

                <Field
                  type="text"
                  name="answer"
                  className="w-full px-4 py-2 text-[13px] h-[60px] mb-3 rounded-xl outline-none border-none bg-white dark:bg-[#555] dark:text-white"
                  placeholder={t("personalComment.replyForm.textPlaceholder")}
                />
                <div className="text-[red] text-xs mb-2">
                  <ErrorMessage name="answer" />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReplyForm(false)}
                    className="text-xs text-gray-500"
                  >
                    لغو
                  </button>
                  <button
                    type="submit"
                    disabled={isAddingReply}
                    className="bg-[#008C78] text-white text-xs px-4 py-1.5 rounded-full"
                  >
                    {isAddingReply
                      ? "..."
                      : t("personalComment.replyForm.reply")}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {showChildComments && (
        <div className="pr-5 md:pr-8 border-r-2 border-gray-300 dark:border-[#444] mt-2 mr-2">
          {isLoadingChildren ? (
            <div className="flex justify-center py-2">
              <PacmanLoader size={10} color="#848484" />
            </div>
          ) : childComments && childComments.length > 0 ? (
            childComments
              .sort((a, b) => new Date(b.inserDate) - new Date(a.inserDate))
              .map((child) => (
                <AnswerCommentCourses
                  key={child.id}
                  commentId={child.id}
                  parentId={commentId}
                  courseId={courseId}
                  initialLikeCount={child.likeCount}
                  initialDislikeCount={child.disslikeCount}
                  currentUserIsLike={child.currentUserIsLike}
                  currentUserIsDissLike={child.currentUserIsDissLike}
                  image={image}
                  name={` ${child.author}`}
                  date={
                    child.inserDate
                      ? new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }).format(new Date(child.inserDate))
                      : ""
                  }
                  title={child.title}
                  text={child.describe}
                />
              ))
          ) : (
            <p className="text-xs text-gray-400 py-2 mr-2">پاسخی وجود ندارد</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AnswerCommentCourses;
=======
import React, { useState, useEffect, useCallback } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NewsCommentVal } from "../../../utils/Validations/NewsCommentVal/NewsCommentVal";
import { PacmanLoader } from "react-spinners";
import GetCourseReplyComments from "../../../core/services/api/Get/GetCourseReplyComments";
import { addReplyCourseComments } from "../../../core/services/api/post/addReplyCourseComments";
import { addCourseCommentLike } from "../../../core/services/api/post/addCourseCommentLike";
import { addCourseCommentDisslike } from "../../../core/services/api/post/addCourseCommentDisslike";

const AnswerCommentCourses = ({
  commentId,
  parentId,
  image,
  date,
  text,
  title,
  name,
  initialLikeCount,
  initialDislikeCount,
  currentUserIsLike,
  currentUserIsDissLike,

  courseId,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [currentLikeStatus, setCurrentLikeStatus] = useState(0);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [dislikeCount, setDislikeCount] = useState(initialDislikeCount);

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showChildComments, setShowChildComments] = useState(false);

  const isLiked = currentLikeStatus === 1;
  const isDisliked = currentLikeStatus === -1;

  useEffect(() => {
    let initialStatus = 0;
    if (currentUserIsLike) initialStatus = 1;
    else if (currentUserIsDissLike) initialStatus = -1;

    setCurrentLikeStatus(initialStatus);
    setLikeCount(initialLikeCount);
    setDislikeCount(initialDislikeCount);
  }, [
    currentUserIsLike,
    currentUserIsDissLike,
    initialLikeCount,
    initialDislikeCount,
  ]);

  const { mutate: toggleLikeDislike } = useMutation({
    mutationFn: ({ id, isLike }) => {
      if (isLike) {
        return addCourseCommentLike(id);
      } else {
        return addCourseCommentDisslike(id);
      }
    },
    onSuccess: (data, variables) => {
      const action = variables.isLike ? "لایک" : "دیسلایک";
      toast.success(`پاسخ با موفقیت ${action} شد`);

      setCurrentLikeStatus((prevStatus) => {
        const newActionStatus = variables.isLike ? 1 : -1;
        let nextStatus = newActionStatus;

        if (prevStatus === newActionStatus) {
          nextStatus = 0;
        }

        queryClient.invalidateQueries(["replyComments", parentId]);

        return nextStatus;
      });
    },
    onError: (error, variables) => {
      const action = variables.isLike ? "لایک" : "دیسلایک";
      toast.error(`شما قبلاً آن نظر را ${action} کرده‌اید`);
      console.error(error);
    },
  });

  const handleToggleLikeDislike = useCallback(
    (id, isLike) => {
      if (!id) return;
      toggleLikeDislike({ id, isLike });
    },
    [toggleLikeDislike],
  );

  const {
    data: childCommentsResponse,
    isLoading: isLoadingChildren,
    refetch: refetchChildren,
  } = useQuery({
    queryKey: ["replyComments", commentId],
    queryFn: () => GetCourseReplyComments(courseId, commentId),

    enabled: Boolean(courseId),
  });

  const childComments = Array.isArray(childCommentsResponse)
    ? childCommentsResponse
    : Array.isArray(childCommentsResponse?.data)
      ? childCommentsResponse.data
      : [];

  const { mutate: addReply, isPending: isAddingReply } = useMutation({
    mutationFn: addReplyCourseComments,
    onSuccess: () => {
      toast.success(t("personalComment.replyForm.toastsuc"));
      setShowReplyForm(false);
      setShowChildComments(true);
      refetchChildren();
    },
    onError: () => {
      toast.error("خطا در ثبت پاسخ");
    },
  });

  const handleReplySubmit = (values, { resetForm }) => {
    const payload = {
      courseId: courseId,
      commentId: commentId,
      title: values.title,
      describe: values.answer,
    };

    if (!courseId || !commentId) {
      return;
    }

    addReply(payload);
    resetForm();
  };

  const replyValidationSchema = NewsCommentVal();

  return (
    <div className="flex flex-col w-full ">
      <div className="w-full bg-white shadow-md rounded-3xl p-5 mt-4 dark:bg-[#333] border border-gray-100 dark:border-[#333]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={image}
              className="w-10 h-10 rounded-full object-cover"
              alt="avatar"
            />
            <div>
              <p className="font-bold text-[#1E1E1E] text-[14px] dark:text-[white]">
                {name}
              </p>
              <p className="text-[12px] text-[#848484] mt-1  ">{date}</p>
            </div>
          </div>
        </div>

        <div className="mt-3 text-gray-700 text-sm leading-6">
          <p className="w-full break-words text-[#1E1E1E] text-[14px] mb-1 font-semibold dark:text-[white]">
            {title}
          </p>
          <p className="text-[#848484] break-words text-[13px]">{text}</p>
        </div>

        <div className="flex items-center flex-wrap justify-between mt-4 gap-y-4 sm:gap-y-0 ">
          <div className="flex items-center gap-2 sm:gap-4 text-gray-600 text-xs">
            <div
              onClick={() => handleToggleLikeDislike(commentId, false)}
              className={`flex items-center gap-1 cursor-pointer ${
                isDisliked
                  ? "text-[#008C78] dark:text-[#00BFA5]"
                  : "text-[#1E1E1E] dark:text-[#848484]"
              }`}
            >
              <ThumbDownOffAltOutlinedIcon
                fontSize="small"
                className={
                  isDisliked
                    ? "text-current"
                    : "text-[#1E1E1E] dark:text-[#848484]"
                }
              />

              <span>{dislikeCount}</span>
            </div>
            <div
              onClick={() => handleToggleLikeDislike(commentId, true)}
              className={`flex items-center gap-1 cursor-pointer ${
                isLiked
                  ? "text-[#008C78] dark:text-[#00BFA5]"
                  : "text-[#1E1E1E] dark:text-[#848484]"
              }`}
            >
              <ThumbUpOutlinedIcon
                fontSize="small"
                className={
                  isLiked
                    ? "text-current"
                    : "text-[#1E1E1E] dark:text-[#848484]"
                }
              />

              <span>{likeCount}</span>
            </div>
          </div>

          <div className="flex  items-center gap-3">
            <button
              onClick={() => setShowChildComments(!showChildComments)}
              className=" text-[12px] text-[#008C78]  cursor-pointer hover:underline"
            >
              {showChildComments ? "پنهان کردن پاسخ‌ها" : "مشاهده پاسخ‌ها"}
            </button>

            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center gap-1 text-[12px]  text-[#1E1E1E] dark:text-[#848484] cursor-pointer hover:text-[#008C78]"
            >
              <ChatBubbleOutlineIcon style={{ fontSize: 16 }} />
              {t("personalComment.actions.answer")}
            </button>
          </div>
        </div>
      </div>

      {showReplyForm && (
        <div className="mt-2 pr-5">
          <Formik
            initialValues={{ title: "", answer: "" }}
            validationSchema={replyValidationSchema}
            onSubmit={handleReplySubmit}
          >
            {() => (
              <Form className="bg-gray-50 dark:bg-[#444] p-4 rounded-2xl">
                <Field
                  type="text"
                  name="title"
                  className="w-full px-4 py-2 text-[13px] mb-3 rounded-xl outline-none border-none bg-white dark:bg-[#555] dark:text-white"
                  placeholder={t("personalComment.replyForm.titlePlaceholder")}
                />
                <div className="text-[red] text-xs mb-2">
                  <ErrorMessage name="title" />
                </div>

                <Field
                  type="text"
                  name="answer"
                  className="w-full px-4 py-2 text-[13px] h-[60px] mb-3 rounded-xl outline-none border-none bg-white dark:bg-[#555] dark:text-white"
                  placeholder={t("personalComment.replyForm.textPlaceholder")}
                />
                <div className="text-[red] text-xs mb-2">
                  <ErrorMessage name="answer" />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReplyForm(false)}
                    className="text-xs text-gray-500"
                  >
                    لغو
                  </button>
                  <button
                    type="submit"
                    disabled={isAddingReply}
                    className="bg-[#008C78] text-white text-xs px-4 py-1.5 rounded-full"
                  >
                    {isAddingReply
                      ? "..."
                      : t("personalComment.replyForm.reply")}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {showChildComments && (
        <div className="pr-5 md:pr-8 border-r-2 border-gray-300 dark:border-[#444] mt-2 mr-2">
          {isLoadingChildren ? (
            <div className="flex justify-center py-2">
              <PacmanLoader size={10} color="#848484" />
            </div>
          ) : childComments && childComments.length > 0 ? (
            childComments
              .sort((a, b) => new Date(b.inserDate) - new Date(a.inserDate))
              .map((child) => (
                <AnswerCommentCourses
                  key={child.id}
                  commentId={child.id}
                  parentId={commentId}
                  courseId={courseId}
                  initialLikeCount={child.likeCount}
                  initialDislikeCount={child.disslikeCount}
                  currentUserIsLike={child.currentUserIsLike}
                  currentUserIsDissLike={child.currentUserIsDissLike}
                  image={image}
                  name={` ${child.author}`}
                  date={
                    child.inserDate
                      ? new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }).format(new Date(child.inserDate))
                      : ""
                  }
                  title={child.title}
                  text={child.describe}
                />
              ))
          ) : (
            <p className="text-xs text-gray-400 py-2 mr-2">پاسخی وجود ندارد</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AnswerCommentCourses;
>>>>>>> b25c6f7f5eb54a940fdd4c9c6f9c064a3c961de5:src/components/course/AnswerCommentCourses/AnswerCommentCourses.jsx
