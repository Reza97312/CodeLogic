import React, { useState, useCallback, useEffect } from "react";
import img1 from "../../../../assets/Images/commentUser.png";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import { Dialog } from "@mui/material";
import AnswerComment from "../AnswerComment/AnswerComment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import getNewsDetailComment from "../../../../core/services/api/Get/getNewsDetailComment";
import { NewsCommentVal } from "../../../../utils/Validations/NewsCommentVal/NewsCommentVal";
import Lottie from "lottie-react";
import empty from "../../../../assets/Images/empty.json";
import GetNewsDetailsReplyComment from "../../../../core/services/api/Get/GetNewsDetailsReplyComment";
import AddNewsDetailsCommentReply from "../../../../core/services/api/post/AddNewsDetailsCommentReply";
import { PacmanLoader } from "react-spinners";
import { toast } from "react-toastify";
import { CommentLikeDislike } from "../../../../core/services/api/post/CommentLikeDislike";

const PersonalComment = ({ newsId }) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [showReplyById, setShowReplyById] = useState({});
  const [showAllComments, setShowAllComments] = useState(false);

  const [repliesCountByComment, setRepliesCountByComment] = useState({});

  const [userLikeStatus, setUserLikeStatus] = useState({});

  const toggleReplyFor = useCallback((commentId) => {
    setShowReplyById((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  }, []);

  const replyInitialValues = { title: "", answer: "" };
  const replyValidationSchema = NewsCommentVal();

  const handleOpenReplies = useCallback(async (cid) => {
    setSelectedCommentId(cid);
    handleOpen();

    try {
      const replies = await GetNewsDetailsReplyComment(cid);
      setRepliesCountByComment((prev) => ({
        ...prev,
        [cid]: replies.length,
      }));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const { mutate: addReply, isPending: isAddingReply } = useMutation({
    mutationFn: AddNewsDetailsCommentReply,
  });

  const handleFormSubmit = (values, comment, formikHelpers) => {
    const payload = {
      newsId: newsId,
      title: values.title,
      describe: values.answer,
      parentId: comment.id,
    };

    addReply(payload, {
      onSuccess: () => {
        toast.success(t("personalComment.replyForm.toastsuc"));

        formikHelpers.resetForm();

        setRepliesCountByComment((prev) => ({
          ...prev,
          [comment.id]: (prev[comment.id] ?? 0) + 1,
        }));

        setShowReplyById((prev) => ({ ...prev, [comment.id]: false }));

        queryClient.invalidateQueries(["replyComments", comment.id]);
      },
      onError: (err) => {
        console.error(err);
        toast.error("خطا در ثبت پاسخ");
      },
    });
  };

  const { mutate: toggleLikeDislike } = useMutation({
    mutationFn: ({ commentId, isLike }) =>
      CommentLikeDislike(commentId, isLike),
    onSuccess: (data, variables) => {
      const action = variables.isLike ? "لایک" : "دیسلایک";
      toast.success(`کامنت با موفقیت ${action} شد.`);

      setUserLikeStatus((prev) => {
        const newActionStatus = variables.isLike ? 1 : -1;
        const currentStatus = prev[variables.commentId];

        const toggledStatus =
          currentStatus === newActionStatus ? 0 : newActionStatus;

        return {
          ...prev,
          [variables.commentId]: toggledStatus,
        };
      });

      queryClient.invalidateQueries(["newsComments", newsId]);
    },
    onError: (error, variables) => {
      const action = variables.isLike ? "لایک" : "دیسلایک";
      toast.error(`شما قبلا این نظر را ${action} کرده اید`);
      console.error(error);
    },
  });

  const handleToggleLikeDislike = useCallback(
    (commentId, isLike) => {
      if (!commentId) return;
      toggleLikeDislike({ commentId, isLike });
    },
    [toggleLikeDislike],
  );

  const { data: commentsResponse } = useQuery({
    queryKey: ["newsComments", newsId],
    queryFn: () => getNewsDetailComment(newsId),
    enabled: Boolean(newsId),
  });

  let commentsList = Array.isArray(commentsResponse)
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

  commentsList = commentsList.sort(
    (a, b) => new Date(b.inserDate) - new Date(a.inserDate),
  );

  const toggleShowAllComments = () => setShowAllComments((prev) => !prev);

  const { data: repliesResponse, isLoading } = useQuery({
    queryKey: ["replyComments", selectedCommentId],
    queryFn: () => GetNewsDetailsReplyComment(selectedCommentId),
    enabled: Boolean(selectedCommentId),
  });

  useEffect(() => {
    if (commentsList.length > 0) {
      let initialLikeStatus = {};

      commentsList.forEach((comment) => {
        let status = 0;

        if (comment.currentUserIsLike) {
          status = 1;
        } else if (comment.currentUserIsDissLike) {
          status = -1;
        }
        initialLikeStatus[comment.id] = status;
      });

      if (Object.keys(initialLikeStatus).length > 0) {
        setUserLikeStatus((prev) => ({ ...prev, ...initialLikeStatus }));
      }

      commentsList.forEach(async (comment) => {
        try {
          const replies = await GetNewsDetailsReplyComment(comment.id);
          setRepliesCountByComment((prev) => ({
            ...prev,
            [comment.id]: replies.length,
          }));
        } catch (err) {
          console.log(err);
        }
      });
    }
  }, [commentsList]);

  return (
    <div className="!w-full  mx-auto bg-white  p-5  dark:bg-[#333] rounded-b-3xl   ">
      {commentsList && commentsList.length > 0 ? (
        (showAllComments ? commentsList : commentsList.slice(0, 3)).map(
          (comment) => {
            const cid = comment.id;

            const persistentStatus = comment.currentUserIsLike
              ? 1
              : comment.currentUserIsDissLike
                ? -1
                : 0;

            const currentLikeStatus =
              userLikeStatus[cid] !== undefined
                ? userLikeStatus[cid]
                : persistentStatus;

            const isLiked = currentLikeStatus === 1;
            const isDisliked = currentLikeStatus === -1;

            return (
              <div
                key={cid}
                className="  w-full max-w-3xl mx-auto bg-[white] rounded-4xl p-5 mt-8 dark:bg-[#454545] "
              >
                <div className="flex items-start justify-between ">
                  <div className="flex flex-wrap items-center justify-center gap-3 ">
                    <img
                      src={img1}
                      className="w-12 h-12 rounded-full object-cover"
                      alt="avatar"
                    />
                    <div>
                      <p className="font-bold text-[#1E1E1E] text-[16px] dark:text-white text-center sm:text-start">
                        {`User ${comment.userId}`}
                      </p>
                      <p className="text-[14px] text-[#848484] mt-1 text-center sm:text-start">
                        {comment.inserDate
                          ? new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }).format(new Date(comment.inserDate))
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-gray-700 text-sm leading-7  ">
                  <p className="w-full text-[#1E1E1E] text-[14px] mb-1 dark:text-white break-words">
                    {comment.title}
                  </p>
                  <p className="text-[#848484] text-[14px] break-words">
                    {comment.describe}
                  </p>
                </div>

                <div className="flex flex-wrap items-center  sm:justify-start gap-5 sm:gap-5 mt-4 text-gray-600 text-sm ">
                  <div
                    onClick={() => handleToggleLikeDislike(cid, false)}
                    className={`flex items-center gap-1 cursor-pointer ${
                      isDisliked
                        ? "text-[#008C78] dark:text-[#00BFA5]"
                        : "text-[#1E1E1E] dark:text-[#848484]"
                    }`}
                  >
                    <ThumbDownOffAltOutlinedIcon
                      className={
                        isDisliked
                          ? "text-current !text-[20px] sm:!text-[25px]"
                          : "text-[#1E1E1E] dark:text-[#848484] !text-[20px] sm:!text-[25px]"
                      }
                    />
                    <span
                      className={
                        isDisliked ? "text-current" : "dark:text-[#848484]"
                      }
                    >
                      {comment.dissLikeCount}
                    </span>
                  </div>

                  <div
                    onClick={() => handleToggleLikeDislike(cid, true)}
                    className={`flex items-center gap-1 cursor-pointer ${
                      isLiked
                        ? "text-[#008C78] dark:text-[#00BFA5]"
                        : "text-[#1E1E1E] dark:text-[#848484]"
                    }`}
                  >
                    <ThumbUpOutlinedIcon
                      className={
                        isLiked
                          ? "text-current !text-[20px] sm:!text-[25px]"
                          : "text-[#1E1E1E] dark:text-[#848484] !text-[20px] sm:!text-[25px]"
                      }
                    />
                    <span
                      className={
                        isLiked ? "text-current" : "dark:text-[#848484]"
                      }
                    >
                      {comment.likeCount}
                    </span>
                  </div>

                  <div
                    onClick={() => handleOpenReplies(cid)}
                    className="cursor-pointer flex items-center "
                  >
                    <ChatIcon className="text-[#1E1E1E] text-[12px] ml-1 dark:text-[#848484]" />
                    <button className="text-[#1E1E1E] text-[16px] cursor-pointer dark:text-[#848484]">
                      <span className="text-[#1E1E1E] text-[14px] ml-1 dark:text-[#848484]">
                        {repliesCountByComment[cid] ?? 0}
                      </span>
                      {t("personalComment.actions.answer")}
                    </button>
                  </div>

                  <button
                    onClick={() => toggleReplyFor(cid)}
                    className="cursor-pointer text-[#008C78] hover:underline decoration-1 transition"
                  >
                    {t("personalComment.actions.replyButton")}
                  </button>
                </div>

                {showReplyById[cid] && (
                  <div className="mt-6 space-y-3 relative ">
                    <Formik
                      initialValues={replyInitialValues}
                      validationSchema={replyValidationSchema}
                      onSubmit={(values, formikHelpers) => {
                        handleFormSubmit(values, comment, formikHelpers);
                      }}
                    >
                      {() => (
                        <Form>
                          <Field
                            type="text"
                            name="title"
                            className="w-full px-5 py-3 text-[#848484] text-[14px] sm:text-[16px] mb-10 rounded-4xl outline-none border-none bg-[#F3F4F6] dark:bg-[#9d9d9d] dark:text-black"
                            placeholder={t(
                              "personalComment.replyForm.titlePlaceholder",
                            )}
                          />
                          <div className="text-[red] absolute right-3 top-13 sm:right-5 sm:top-14 text-[14px] sm:text-[16px]">
                            <ErrorMessage name="title" />
                          </div>

                          <Field
                            type="text"
                            name="answer"
                            className="w-full px-5 pb-15 text-[14px] sm:text-[16px] text-[#848484] h-[100px] mb-7  rounded-4xl outline-none border-none bg-[#F3F4F6] dark:bg-[#9d9d9d] dark:text-[black]  "
                            placeholder={t(
                              "personalComment.replyForm.textPlaceholder",
                            )}
                          />
                          <div className="text-[red] absolute right-3 sm:right-5 top-48 text-[14px] sm:text-[16px] ">
                            <ErrorMessage name="answer" />
                          </div>

                          <div className="flex items-center gap-3 mt-2">
                            <button
                              type="submit"
                              className="bg-[#008C78] text-white px-2 py-1 sm:px-4 sm:py-2 text-[14px] whitespace-nowrap sm:text-[16px] cursor-pointer rounded-full"
                              disabled={isAddingReply}
                            >
                              {isAddingReply
                                ? "در حال ارسال..."
                                : t("personalComment.replyForm.reply")}
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleReplyFor(cid)}
                              className="text-[#1E1E1E] text-[12px] sm:text-[16px] mr-3 cursor-pointer hover:text-[#008C78] dark:text-[#848484]"
                            >
                              {t("personalComment.actions.closeReply")}
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                )}
              </div>
            );
          },
        )
      ) : (
        <div className="w-full ">
          <Lottie
            className="w-[150px] sm:w-[200px] h-[170px] my-10 mx-auto  "
            animationData={empty}
            loop={true}
          />
          <p className="font-semibold text-[black] text-[20px] text-center dark:text-[#848484]">
            {t("personalComment.actions.noComments")}
          </p>
        </div>
      )}

      {commentsList.length > 3 && (
        <div className="mt-4 text-center">
          <button
            onClick={toggleShowAllComments}
            className="text-[#008C78] font-semibold cursor-pointer"
          >
            {showAllComments ? "نمایش کمتر" : "نمایش بیشتر"}
          </button>
        </div>
      )}

      <Dialog
        maxWidth={false}
        PaperProps={{
          sx: (theme) => ({
            backgroundColor:
              theme.palette.mode === "dark" ? "#000000ff" : "#fff",
            color: theme.palette.mode === "dark" ? "#f3f3f3" : "#1e1e1e",
            borderRadius: "16px",
            padding: "24px",
            maxHeight: "80vh",
            width: "70%",
            overflowX: "hidden",
            overflowY: "auto",
            "&::-webkit-scrollbar": { width: "10px" },
            "&::-webkit-scrollbar-track": {
              backgroundColor:
                theme.palette.mode === "dark" ? "#444" : "#f3f4f6",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor:
                theme.palette.mode === "dark" ? "#00bfa5" : "#008c78",
              borderRadius: "8px",
            },
          }),
        }}
        disableScrollLock
        open={open}
        onClose={handleClose}
      >
        {isLoading ? (
          <div className="w-[200px] sm:w-[500px] flex items-center justify-between sm:justify-evenly mx-auto py-10 font-semibold text-[#848484]">
            <p> {t("answerComment.loading")} </p>
            <PacmanLoader size={18} color="#848484" />
          </div>
        ) : (repliesResponse?.length ?? 0) > 0 ? (
          [...repliesResponse]
            .sort((a, b) => new Date(b.inserDate) - new Date(a.inserDate))
            .map((reply) => (
              <AnswerComment
                key={reply.id}
                commentId={reply.id}
                parentId={selectedCommentId}
                newsId={newsId}
                initialLikeCount={reply.likeCount}
                initialDislikeCount={reply.dissLikeCount}
                currentUserIsLike={reply.currentUserIsLike}
                currentUserIsDissLike={reply.currentUserIsDissLike}
                image={img1}
                name={`User ${reply.userId}`}
                date={
                  reply.inserDate
                    ? new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(reply.inserDate))
                    : ""
                }
                title={reply.title}
                text={reply.describe}
              />
            ))
        ) : (
          <div className=" w-[150px] sm:w-[400px] md:w-[500px] mx-auto ">
            <Lottie
              className=" w-[150px] sm:w-[200px] h-[170px] my-10 mx-auto"
              animationData={empty}
              loop={true}
            />
            <p className="font-semibold text-[black] text-[20px] text-center dark:text-[#848484]">
              {t("personalComment.actions.noComments")}
            </p>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default PersonalComment;
