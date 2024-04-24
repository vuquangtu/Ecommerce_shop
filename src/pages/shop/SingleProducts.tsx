import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useGetProductQuery } from "../../service/productSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ProductDisplay from "./ProductDisplay";
import MostPopularPost from "./MostPopularPost";
import Tags from "./Tags";
import Review from "../../components/Review";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";

const inforPage = {
  title: "OUR SHOP SINGLE",
  curPage: "Shop / Single Product",
};
function SingleProducts() {
  const { id } = useParams();

  const { products } = useContext(AuthContext);

  if (products) {
    const singleProduct = products.find((item) => item.id === id);

    return (
      <div>
        <PageHeader inforPage={inforPage} />
        <div className="shop-single padding-tb aside-bg">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-12">
                <article>
                  <div className="product-details">
                    <div className="row align-content-center">
                      <div className="col-md-6 col-12">
                        <div className="product-thumb">
                          <div className="swiper-container pro-single-top ">
                            <Swiper
                              className="mySwiper"
                              spaceBetween={30}
                              slidesPerView={1}
                              autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                              }}
                              modules={[Autoplay]}
                              navigation={{
                                prevEl: ".pro-single-prev",
                                nextEl: ".pro-single-next",
                              }}
                            >
                              <SwiperSlide>
                                <div className="single-thumb">
                                  <img src={singleProduct.img} alt="" />
                                </div>
                              </SwiperSlide>
                              <SwiperSlide>
                                <div className="single-thumb">
                                  <img src={singleProduct.img} alt="" />
                                </div>
                              </SwiperSlide>
                              <div className="pro-single-next">
                                <i className="icofont-rounded-left"></i>
                              </div>
                              <div className="pro-single-prev">
                                <i className="icofont-rounded-right"></i>
                              </div>
                            </Swiper>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="post-content">
                          <div>
                            <ProductDisplay item={singleProduct} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="review">
                    <Review />
                  </div>
                </article>
              </div>
              <div className="col-lg-4 col-md-7 col-12">
                <aside className="ps-lg-4">
                  <MostPopularPost />
                  <Tags />
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleProducts;
