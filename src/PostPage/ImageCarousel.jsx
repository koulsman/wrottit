import useEmblaCarousel from "embla-carousel-react";
import Next from "../images/next.svg";
import Previous from "../images/previous.svg";
import { Carousel } from "@mantine/carousel";
import classes from "./Post.module.css";
import NewWindow from "react-new-window";
import { useState, useRef } from "react";

export default function ImageCarousel({ images, allowPopup = true }) {
  const [imageCarouselWindow, setImageCarouselWindow] = useState(false);
  const [carouselKey, setCarouselKey] = useState(0);

  function openImageCarousel(event) {
  event.stopPropagation();
  setCarouselKey(prev => prev + 1); // Force re-render
  setImageCarouselWindow(true);
}
  function imageIndexHandler(image, index) {
    console.log(image + index);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {Array.isArray(images) && images.length > 1 ? (
          <Carousel key={carouselKey} withIndicators classNames={classes}>
  {images.map((image, index) => (
    <Carousel.Slide key={index}>
      <img
        onClick={allowPopup ? openImageCarousel : undefined}
        src={image}
        alt={`Slide ${index + 1}`}
        style={{
          width: "100%",
          height: "100%",
          margin: "auto",
          objectFit: "fill",
        }}
      />
    </Carousel.Slide>
  ))}
</Carousel>
        ) : (
          <img
            onLoad={(image, index) => imageIndexHandler(image, index)}
            onClick={allowPopup ? openImageCarousel : undefined}
            onUnload={() => setImageCarouselWindow(false)}
            src={images[0]}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
      </div>
      {imageCarouselWindow && (
        <NewWindow
          title="Image Carousel"
          features={{ innerWidth: 2400, innerHeight: 1366 }}
          onUnload={() => setImageCarouselWindow(false)}
          onLoad={(image, index) => imageIndexHandler(image, index)}
        >
          <ImageCarousel images={images} allowPopup={false} />
        </NewWindow>
      )}
    </>
  );
}
