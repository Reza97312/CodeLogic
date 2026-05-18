import React from 'react';
import leftIcon from '../../../../assets/Icons/A/left.png';
import rightIcon from '../../../../assets/Icons/A/right.png';


const SliderButtons = ({ sliderRef }) => {
    
    const scroll = (direction = 'left' | 'right') => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: direction === 'left' ? -150 : 150,
                behavior: 'smooth',
            });
        }
    };

    const buttonClassName = 
    'cursor-pointer shadow-lg text-center w-[45px] h-[45px] rounded-full bg-[#008C78] text-[#1E1E1E] bg-[center_center] bg-no-repeat   dark:bg-[#ffff] dark:text-[#ffff]'

    return (
        <div
        className="flex justify-between gap-5 visible md:invisible mx-auto mt-10 md:m-0 w-full "
        style={{ direction: 'ltr' }}>
            <button
            onClick={() => scroll('left')}
            style={{ backgroundImage: `url(${leftIcon})` }}
            className={buttonClassName}
            ></button>
            <button
            onClick={() => scroll('right')}
            style={{ backgroundImage: `url(${rightIcon})` }}
            className={buttonClassName}
            ></button>
        </div>
    );
};

export default SliderButtons;
