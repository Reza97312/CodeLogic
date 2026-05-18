import * as Yup from "yup";
import i18n from "../../i18n/i18n"


export const Login1Val = () => {
    return Yup.object({
        password: Yup.string().required(() => i18n.t('loginVal.requiredPass'))
            .min(8, () => i18n.t('loginVal.minPass')),
        phoneOrGmail: Yup.string().required(() => i18n.t('loginVal.requiredName'))
            .min(4, () => i18n.t('loginVal.nameMin'))
    })
}