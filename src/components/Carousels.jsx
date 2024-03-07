import { Carousel } from "@material-tailwind/react";


const Carousels = () => {
    return (
        <Carousel className="rounded-xl h-[400px] w-[400px]">
          <img
            src="https://w7.pngwing.com/pngs/895/199/png-transparent-spider-man-heroes-download-with-transparent-background-free-thumbnail.png"
            alt="image 1"
            className="max-h-[400px] max-w-[400px] object-cover"
          />
          <img
            src="https://pngimg.com/d/mario_PNG57.png"
            alt="image 2"
            className="max-h-[400px] max-w-[400px] object-cover"
          />
          <img
            src="https://pngimg.com/d/mario_PNG57.png"
            alt="image 3"
            className="max-h-[400px] max-w-[400px] object-cover"
          />
        </Carousel>
      );
        
}

export default Carousels