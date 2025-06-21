import useEmblaCarousel from "embla-carousel-react";
import Next from "../images/next.svg";
import Previous from "../images/previous.svg";
import { Carousel } from '@mantine/carousel';
import classes from './Post.module.css';

export default function ImageCarousel({ images }) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" });

  function handleImageModal(e, index, image) {
    // e.preventDefault();
    console.log(index + "index");
    console.log(image);
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
     {Array.isArray(images) && images.length > 1  ?
           <Carousel withIndicators height={300} classNames={classes}>
            {images.map((image, index) => (
            
               <Carousel.Slide>
                <img
                  onLoad={(image, index) => imageIndexHandler(image, index)}
                  onClick={(image, index, e, images) =>
                    handleImageModal(image, index, e, images)
                  }
                  key={index}
                  src={image}
                  alt={`Slide ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                  }}
                />
              </Carousel.Slide>
            ))}
            </Carousel>
         
      : <img
                  // onLoad={(image, index) => imageIndexHandler(image, index)}
                  // onClick={(image, index, e, images) =>
                  //   handleImageModal(image, index, e, images)
                  // }
                  
                  src={images[0]}
                 
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                  }}
                />}
                </div>
      
    </>
  );
}
