import * as Yup from "yup";
import i18n from "../../../utils/i18n/i18n";

export const NewsCommentVal = () => {
  return Yup.object().shape({
    title: Yup.string().required(i18n.t("newsComment.cmval.title")),
    answer: Yup.string().required(i18n.t("newsComment.cmval.des")),
  });
};

export const NewsCommentValcomment = () => {
  return Yup.object().shape({
    titlecomment: Yup.string().required(
      i18n.t("newsComment.cmval.commenttitle")
    ),
    description: Yup.string().required(i18n.t("newsComment.cmval.commentdes")),
  });
};
