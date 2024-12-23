import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../../assets/pages/Shop.css';

import banner1 from '../../assets/img/Shop/Slider/banner1.jpg';
import banner2 from '../../assets/img/Shop/Slider/banner2.jpg';
import banner3 from '../../assets/img/Shop/Slider/banner3.jpg';

const ImageSlider: React.FC = () => {
    const settings = {
        dots: true, 
        infinite: true, 
        speed: 500, 
        slidesToShow: 1, 
        slidesToScroll: 1,
        autoplay: true, 
        autoplaySpeed: 10000, 
      };

  return (
    <Slider {...settings} className='slider-container'>

        <img src={banner1} alt="Image 1" />
        <img src={banner2} alt="Image 2" />
        <img src={banner3} alt="Image 2" />

    </Slider>
  );
};

export default ImageSlider;
