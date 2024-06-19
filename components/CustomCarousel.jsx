import React from 'react';
import Slider from 'react-slick';

const CustomCarousel = ({ children }) => {
  const settings = {
    dots: true, // Show dots navigation
    infinite: true, // Enable infinite looping
    speed: 500, // Transition speed
    slidesToShow: 3, // Number of slides to show at a time
    slidesToScroll: 1 // Number of slides to scroll at a time
  };

  return (
    <Slider {...settings}>
      {children}
    </Slider>
  );
};

export default CustomCarousel;
