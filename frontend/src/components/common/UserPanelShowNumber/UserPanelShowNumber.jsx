import React from 'react'
import { useTranslation } from 'react-i18next'



const UserPanelShowNumber = () => {

    const {t} = useTranslation();

    return (
        <select className='py-[10px] px-4 bg-[#FFFFFF] border border-[#EAEAEA] rounded-2xl outline-0   
        dark:text-[#CCCCCC] dark:bg-[#454545]'>
            <option>{t('userPanelShowNumber.showNumber')}</option>
            <option></option>
            <option></option>
            <option></option>
            <option></option>
            <option></option>
        </select>
  )
}

export default UserPanelShowNumber