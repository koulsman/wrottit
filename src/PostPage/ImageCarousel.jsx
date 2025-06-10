import useEmblaCarousel from "embla-carousel-react";
import Next from "../images/next.svg"
import Previous from "../images/previous.svg"


export default function ImageCarousel({images}) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" });

    function handleImageModal(e, index,image) {
    // e.preventDefault();
    console.log(index + "index");
    console.log(image)
  }

  function imageIndexHandler(image,index) {
      console.log(image + index)
  }

  function previousSlideHandler() {
    console.log(images + "im,ages")
    // console.log(index)
  }
  function nextSlideHandler() {
    console.log(images + "im,ages")
  }
    return (
        <>
        {Array.isArray(images) && images.length > 1 && <div style={{display:"flex", justifyContent: "flexEnd", width:"2em", height: "2em", overflow:"visible", margin: "auto"}}>
            <img src={Previous} onClick={previousSlideHandler}/>
        </div>}
        <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            
              <div style={{ overflow: "hidden",display: "flex" }} ref={emblaRef}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {images.map((image, index) => (
                    <div
                      key={index}
                      style={{
                        flex: "0 0 auto",
                        width: "100%",
                        maxWidth: "100%",
                        padding: "0 10px",
                      }}
                      
                    >
                      <img
                      onLoad={(image,index) => imageIndexHandler(image,index)}
                        onClick={(image, index, e,images) =>
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
                    </div>
                  ))}
                </div>
              </div>
        
          </div>
          
            <div
              style={{
                display: "flex",
                justifyContent: "flexEnd",
                width: "2em",
                height: "2em",
                overflow: "visible",
                margin: "auto",
              }}
            >
              {Array.isArray(images) && images.length > 1 && <div style={{display:"flex", justifyContent: "flexEnd", width:"2em", height: "2em", overflow:"visible", margin: "auto"}}>
            <img src={Next} />
        </div>}
            </div>
      
        </>
    )
}