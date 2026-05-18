import React from 'react'
import { t } from 'i18next'


const UserPanelFilter = ({handleFilter}) => {

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === 'true') handleFilter(true);
    else if (value === 'false') handleFilter(false);
  };


  return (
    <select
    onChange={handleChange} 
    className='py-[10px] px-4 font-regular text-base text-[#1E1E1E] bg-[#FFFFFF] border border-[#EAEAEA] rounded-2xl outline-0   
    dark:text-[#CCCCCC] dark:bg-[#454545]'>
      <option value={'true'}>{t('myReservedCoursesFilter.reserved')}</option>
      <option value={'false'}>{t('myReservedCoursesFilter.await')}</option>
    </select>
  )
}
 
export default UserPanelFilter