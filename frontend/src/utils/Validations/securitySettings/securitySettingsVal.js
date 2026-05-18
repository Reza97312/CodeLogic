import * as Yup from 'yup';
import i18n from '../../i18n/i18n';
export const securitySettingsVal = () => {
    return Yup.object({
        oldPassword: Yup.string().required(() => i18n.t('loginVal.requiredPass')),
        newPassword: Yup.string()
            .required(() => i18n.t('loginVal.requiredPass'))
            .matches(/\d/, () => i18n.t('securitySetting.minNumbers')),
    });
};
