import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Carousel ({ children }) {
    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="w-full mx-auto mt-8 bg-slate-800 p-8">
      <Slider {...settings}>
        { children }
      </Slider>
    </div>
  )
}

Carousel.propTypes = {
    children: PropTypes.node.isRequired,
  };
  

export default Carousel;
