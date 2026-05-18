import React from 'react'
import { useTranslation } from 'react-i18next';

const BeWithUsCard = ({item}) => {

  const {t} = useTranslation();

  const CategoryIcon = item.icon;

  return (
    <div className='flex flex-col items-center gap-2 min-w-[280px] px-4 py-8 bg-[#FFFFFF] rounded-2xl duration-300 snap-center 
    dark:bg-[#606060]
    hover:scale-[1.02] hover:shadow-[0px_0px_10px_1px_#008c78]'>
      <CategoryIcon/>  
      <h2 className='max-w-[239px] font-bold text-base text-center   dark:text-[#EEEEEE]'>{item.title}</h2>
      <p className='max-w-[287px] font-regular text-sm text-center leading-6   dark:text-[#DDDDDD]'>{item.desc}</p>
    </div>
  )
}

export default BeWithUsCard