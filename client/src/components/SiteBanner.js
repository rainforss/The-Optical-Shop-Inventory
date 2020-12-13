import React, { useState } from "react";
import {
  CarouselItem,
  Carousel,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Container,
} from "reactstrap";

export default function SiteBanner() {
  const items = [
    {
      src:
        "https://res.cloudinary.com/rainforss/image/upload/v1607290505/Banners/Slide14_rcuy7a.jpg",
      altText: "",
      caption: "",
    },
    {
      src:
        "https://res.cloudinary.com/rainforss/image/upload/v1607290495/Banners/Slide22_syz7o2.jpg",
      altText: "",
      caption: "",
    },
    {
      src:
        "https://res.cloudinary.com/rainforss/image/upload/v1607291226/Banners/Best_in_Edmonton_1080x_zectmx.jpg",
      altText: "",
      caption: "",
    },
    {
      src:
        "https://res.cloudinary.com/rainforss/image/upload/v1607374507/Banners/Slide6_jy6vas.jpg",
      altText: "",
      caption: "",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  return (
    <Container className="pt-2 pb-5">
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        interval={7000}
      >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {items.map((item) => (
          <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={item.src}
          >
            <img className="banner-image" src={item.src} alt={item.altText} />
            <CarouselCaption
              captionText={item.caption}
              captionHeader={item.caption}
            />
          </CarouselItem>
        ))}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </Container>
  );
}
