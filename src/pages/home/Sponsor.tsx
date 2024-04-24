import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import required modules
import { Autoplay } from "swiper/modules";

const sponsorList = [
  {
    imgUrl: "/src/assets/images/sponsor/01.png",
  },
  {
    imgUrl: "/src/assets/images/sponsor/02.png",
  },
  {
    imgUrl: "/src/assets/images/sponsor/03.png",
  },
  {
    imgUrl: "/src/assets/images/sponsor/04.png",
  },
  {
    imgUrl: "/src/assets/images/sponsor/05.png",
  },
  {
    imgUrl: "/src/assets/images/sponsor/06.png",
  },
];

function Sponsor() {
  return (
    <div className="sponsor-section section-bg ">
      <div className="section-wrapper ">
        <div className="sponsor-slider">
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            // loop={"true"}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            breakpoints={{
              0: {
                width: 0,
                slidesPerView: 1,
              },
              768: {
                width: 768,
                slidesPerView: 3,
              },
              1200: {
                width: 1200,
                slidesPerView: 5.5,
              },
            }}
          >
            {sponsorList.map((sponsor, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="sponsor-iten">
                    <div className="sponsor-thumb">
                      <img src={`${sponsor.imgUrl}`} alt="" />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Sponsor;
