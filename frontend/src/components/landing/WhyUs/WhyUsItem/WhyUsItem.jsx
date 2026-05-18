import React from 'react'
import CircleTick from '../../../../assets/Icons/CircleTick'
import { useTranslation } from 'react-i18next'

const WhyUsItem = ({ item }) => {

  const { t } = useTranslation();

  return (
    <div className='flex gap-4 pt-8'>
      <CircleTick />
      <div className='flex flex-col gap-[14px]'>
        <span className='font-bold text-[#263238]   dark:text-[#EEEEEE] 
        text-xs   sm:text-sm   lg:text-base'>{t(`${item.title}`)}</span>
        <p className='font-regular text-[#848484]   dark:text-[#DDDDDD]
        text-xs   lg:text-sm'>{t(`${item.desc}`)}</p>
      </div>
    </div>
  )
}

export default WhyUsItem