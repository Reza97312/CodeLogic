import React from 'react'
import BigArrowRight from '../../../assets/Icons/BigArrowRight'
import BigArrowLeft from '../../../assets/Icons/BigArrowLeft'
import Arrow from '../../../assets/Icons/Arrow'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'


const ButtonsSeeMore = ({seeAllText, sliderRef, to}) => {
  
  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };
  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };
  
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";


  return (
    <div className='flex justify-between w-full px-10'>
      <div className='flex gap-4'>
        <button onClick={scrollRight} className={`${isRtl ? '' : 'rotate-180'} cursor-pointer`} >
          <BigArrowRight/>
        </button>
        <button onClick={scrollLeft} 
        className={`${isRtl ? '' : 'rotate-180'} px-[7px] py-2 bg-[#008C78] rounded-[50px] cursor-pointer`}>
          <BigArrowLeft/>
        </button>
      </div>
      <Link to={to} className='flex items-center gap-2 cursor-pointer'>
        <span className='font-regular text-sm text-[#848484]'>{seeAllText}</span> 
        <span className={`${isRtl ? '' : 'rotate-180'}`}>
          <Arrow/>
        </span> 
      </Link>
    </div>
  )
}

export default ButtonsSeeMore