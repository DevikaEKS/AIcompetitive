import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';

export default function SwiperCard3D() {
  const videos = [
    "https://www.youtube.com/embed/iifT9X6uIyA?rel=0&modestbranding=1&controls=1",
    "https://www.youtube.com/embed/JKqM9XkZ17k?rel=0&modestbranding=1&controls=1",
    "https://www.youtube.com/embed/dveQrSg4HQU?rel=0&modestbranding=1&controls=1",
    "https://www.youtube.com/embed/jpneMtcNM5E?rel=0&modestbranding=1&controls=1",
    "https://www.youtube.com/embed/R6lvatKwFMM?rel=0&modestbranding=1&controls=1",
    "https://www.youtube.com/embed/-BhjTRU20dw?rel=0&modestbranding=1&controls=1",
  ];

  // Function to extract video ID from YouTube embed URL
  const getVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|\S+\/\S+\/)([A-Za-z0-9_-]{11}))|(?:youtu\.be\/([A-Za-z0-9_-]{11}))/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
  };

  return (
    <div className="pb-5">
      <h1 className="subhead2 py-3">Video Library</h1>
      <Swiper
        spaceBetween={10} // Minimized space for mobile
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3500, // Delay between slides in milliseconds
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
        centeredSlides={false} // Don't center the slides; start from left
        breakpoints={{
          0: {
            slidesPerView: 1, // Show 1 slide fully
            spaceBetween: 0, // No gap between slides
          },
          768: {
            slidesPerView: 2, // Show 2 slides
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3, // Show 3 slides
            spaceBetween: 20,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {videos.map((video, index) => {
          const videoId = getVideoId(video); // Extract video ID for the YouTube link

          return (
            <SwiperSlide key={index} className="swiper-slide-custom">
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <iframe
                  className="responsive-iframe"
                  src={video}
                  title={`Video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <style jsx>{`
        .swiper-slide-custom {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%; /* Occupy full width */
        }

        .responsive-iframe {
          width: 100%;
          height: 250px; /* Define the height you want */
          margin: 10px;
          border-radius: 8px; /* Optional for rounded corners */
        }

        /* Add margin to the Swiper pagination indicators */
        .swiper-pagination {
          margin-top: 90px !important; 
        }
      `}</style>
    </div>
  );
}
