import React from 'react'
import Working from '../../../assets/Images/working.svg'
import TextImage from '../../common/TextImage/TextImage'
import { useTranslation } from 'react-i18next'



const HeroSection = () => {

  const {t, i18n} = useTranslation();

  return (
    <div>
      <TextImage title1={t('heroSection.title1')} titleSpan={t('heroSection.titleSpan')}
        title2={t('heroSection.title2')}
        desc={t('heroSection.desc')}
        buttonText={t('heroSection.buttonText')} img={Working} bg={'#EEFFFC'} />
    </div>
  )
}

export default HeroSection