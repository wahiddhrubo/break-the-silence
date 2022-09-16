import Image from "next/image";
import Slider from "react-slick";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Link from "next/link";

export default function SliderComponent({ divs }) {
  const styles = {
    icondiv: " cursor-pointer  hover:!text-green-dark my-5 ",
    icons: " slick-arrow  top-1/2   !relative  !h-[30px] !w-[30px]",
  };
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <div>
      <div className={styles.icondiv}>
        <AiOutlineLeft
          {...props}
          size={50}
          className={
            styles.icons +
            "slick-arrow-left left-[-70px] top-[320px] z-10" +
            (currentSlide === 0 ? " slick-disabled" : "")
          }
          aria-disabled={currentSlide === 0 ? true : false}
          type="button"
        />
      </div>
    </div>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <div className={styles.icondiv}>
      <AiOutlineRight
        {...props}
        size={50}
        className={
          styles.icons +
          "slick-arrow-right relative left-[325px] top-[-250px]" +
          (currentSlide === slideCount - 1 ? " slick-disabled" : "")
        }
        aria-disabled={currentSlide === slideCount - 1 ? true : false}
        type="button"
      />
    </div>
  );

  const settings = {
    dots: true,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  };
  return (
    <div className="w-[300px]">
      <Slider {...settings}>
        {divs &&
          divs.map((b) => (
            <div key={b.id}>
              <div key={b.id} className="w-[300px]">
                <Link
                  key={b.id}
                  href={{
                    pathname: `/album/${b.id}`,
                  }}
                >
                  <Image
                    src={b.attributes.potraitImg}
                    width={300}
                    height={500}
                    className="object-cover cursor-pointer"
                  />
                </Link>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}
