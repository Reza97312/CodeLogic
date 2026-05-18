import * as Yup from "yup";
import { checkNumber } from "../common/common.validation.js";
import i18n from "../../i18n/i18n.js";

export const RegisterValidation = () => {
  return Yup.object().shape({
    email: Yup.string()
      .email(i18n.t("registerStepOne.validation.invalid"))
      .required(i18n.t("registerStepOne.validation.required")),
  });
};

export const RegisterStepTwo = () =>
  Yup.object().shape({
    code: Yup.array().of(
      Yup.string().required(i18n.t("registerStepTwo.validation.required")),
    ),
  });

export const RegisterStepThree = () =>
  Yup.object().shape({
    phoneNumber: Yup.string()
      .required(i18n.t("registerStepThree.validation.phone_required"))
      .test(
        "phoneNumber",
        i18n.t("registerStepThree.validation.phone_invalid"),
        (value) => checkNumber(value),
      ),
    password: Yup.string()
      .required(i18n.t("registerStepThree.validation.password_required"))
      .min(8, i18n.t("registerStepThree.validation.password_min"))
      .matches(/[0-9]/, i18n.t("registerStepThree.validation.password_number"))
      .matches(/[a-z]/, i18n.t("registerStepThree.validation.password_lower"))
      .matches(/[A-Z]/, i18n.t("registerStepThree.validation.password_upper"))
      .matches(/[^\w]/, i18n.t("registerStepThree.validation.password_symbol")),
    confirmPassword: Yup.string()
      .required(i18n.t("registerStepThree.validation.confirmPassword_required"))
      .oneOf(
        [Yup.ref("password")],
        i18n.t("registerStepThree.validation.confirmPassword_match"),
      ),
  });
