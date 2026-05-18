<<<<<<< HEAD:frontend/src/pages/Landing/Landing.jsx
import React, { useEffect } from "react";
import HeroSection from "../../components/landing/HeroSection/HeroSection";
import Section1 from "../../components/landing/Section1/Section1";
import BeWithUs from "../../components/landing/BeWithUs/BeWithUs";
import SliderCourses from "../../components/landing/SliderCourses/SliderCourses";
import WhyUs from "../../components/landing/WhyUs/WhyUs";
import SliderTeachers from "../../components/landing/Sliderteachers/SliderTeachers";
import JoinTeachers from "../../components/landing/JoinTeachers/JoinTeachers";
import NewsListSection from "../../components/landing/NewsListSection/NewsListSection";

const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F3F4F6]   dark:bg-[#1E1E1E]">
      <HeroSection />
      <Section1 />
      <BeWithUs />
      <SliderCourses />
      <WhyUs />
      <SliderTeachers />
      <JoinTeachers />
      <NewsListSection />
    </div>
  );
};

export default Landing;
=======
import React, { useEffect } from "react";
import HeroSection from "../../components/landing/HeroSection/HeroSection";
import Section1 from "../../components/landing/Section1/Section1";
import BeWithUs from "../../components/landing/BeWithUs/BeWithUs";
import SliderCourses from "../../components/landing/SliderCourses/SliderCourses";
import WhyUs from "../../components/landing/WhyUs/WhyUs";
import SliderTeachers from "../../components/landing/Sliderteachers/SliderTeachers";
import JoinTeachers from "../../components/landing/JoinTeachers/JoinTeachers";
import NewsListSection from "../../components/landing/NewsListSection/NewsListSection";

const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F3F4F6]   dark:bg-[#1E1E1E]">
      <HeroSection />
      <Section1 />
      <BeWithUs />
      <SliderCourses />
      <WhyUs />
      <SliderTeachers />
      <JoinTeachers />
      <NewsListSection />
    </div>
  );
};

export default Landing;
>>>>>>> b25c6f7f5eb54a940fdd4c9c6f9c064a3c961de5:src/pages/Landing/Landing.jsx
