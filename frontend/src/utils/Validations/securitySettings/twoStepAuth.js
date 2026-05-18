import * as Yup from "yup";
import i18n from "../../i18n/i18n";
export const twpStepAuthValidation = () => {
  return Yup.object({
    twoStepAuth: Yup.boolean(),
    telegramUsername: Yup.string().required(() =>
      i18n.t("securitySetting.required")
    ),
  });
};
