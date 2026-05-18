import i18n from "../../i18n/i18n";
import * as Yup from "yup";
import { checkNumber } from "../common/common.validation";
export const ContactVal = () => {
  return Yup.object({
    email: Yup.string()
      .required(() => i18n.t("forgotVal1.required"))
      .email(() => i18n.t("forgotVal1.email")),
    name: Yup.string()
      .required(() => i18n.t("loginVal.requiredName"))
      .min(4, () => i18n.t("loginVal.nameMin")),
    number: Yup.string()
      .required(() => i18n.t("registerStepOne.validation.required"))
      .test(
        "phoneNumber",
        () => i18n.t("registerStepOne.validation.invalid"),
        (value) => checkNumber(value)
      ),
    text: Yup.string().required(() => i18n.t("securitySetting.required")),
  });
};
