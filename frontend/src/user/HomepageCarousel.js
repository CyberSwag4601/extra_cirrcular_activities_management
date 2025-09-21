import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image_1 from "../assets/event.jpg";
import Image_2 from '../assets/placements.jpg';
import Image_3 from '../assets/college.jpg';

const HomepageCarousel=() =>{
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src={Image_1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h5 style={{color:'black'}}>Student Activities</h5>
          <p style={{color:'black'}}>Project Expo</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src={Image_2}
          alt="Second slide"
        />
        <Carousel.Caption>
        <h5 style={{color:'white'}}>Campus Placements</h5>
          <p style={{color:'white'}}>Final Year Student`s Placements</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src={Image_3}
          alt="Third slide"
        />
        <Carousel.Caption>
        <h5 style={{color:'white'}}>College Events</h5>
          <p style={{color:'white'}}>Active participation in college events</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomepageCarousel;