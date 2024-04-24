import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthProvider";

import { useParams } from "react-router-dom";

import { useAddcommentMutation } from "../service/commentApi";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from 'yup'; // Import Yup for validation

const reviwtitle = "Add a Review";

const Review = () => {
  const [addcomment] = useAddcommentMutation();

  const { id } = useParams();
  const { userStorage, comments, randomID } = useContext(AuthContext);

  const commentID = randomID;
  const ReviewList = comments?.filter((item) => item.productID === id);

  const [reviewShow, setReviewShow] = useState(true);

  const [comment, setComment] = useState({
    id: commentID,
    ratingValue: 2,

    desc: "",
    productID: id,
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (userStorage) {
      const newComment = {
        ...comment,
        userID: userStorage.id,
        userPhotoURL: userStorage.imgUrl,
        userName: userStorage.fullname,
      };

      addcomment(newComment);
      setComment({
        id: commentID,
        ratingValue: 2,

        desc: "",
        productID: id,
      });
      toast.success("Comment Success");
      console.log("success");
    } else {
      console.log("something wrong about updateComment");
    }
  };

  return (
    <>
      {" "}
      <ToastContainer />
      <ul
        className={`review-nav lab-ul ${
          reviewShow ? "RevActive" : "DescActive"
        }`}
      >
        <li onClick={() => setReviewShow(!reviewShow)} className="desc">
          Description
        </li>
        <li onClick={() => setReviewShow(!reviewShow)} className="rev">
          Reviews 4
        </li>
      </ul>
      <div
        className={`review-content ${
          reviewShow ? "review-content-show" : "description-show"
        }`}
      >
        <div className="review-showing">
          <ul className="content lab-ul">
            {ReviewList?.map((review, i) => (
              <li key={i}>
                <div className="post-thumb">
                  <img
                    src={`${review.userPhotoURL}`}
                    alt={`${review.imgAlt}`}
                  />
                </div>
                <div className="post-content">
                  <div className="entry-meta">
                    <div className="posted-on">
                      <a href="#">{review.userName}</a>
                      <p>{review.timestamp}</p>
                    </div>
                    <Box
                      sx={{
                        "& > legend": { mt: 2 },
                      }}
                    >
                      <Rating
                        name="read-only"
                        value={review.ratingValue}
                        readOnly
                      />
                    </Box>
                  </div>
                  <div className="entry-content">
                    <p>{review.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="client-review">
            <div className="review-form">
              <div className="review-title">
                <h5>{reviwtitle}</h5>
              </div>
              <form
                action="action"
                className="row"
                onSubmit={handleSubmitReview}
              >
                {!userStorage && (
                  <>
                    <div className="col-md-4 col-12">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name *"
                      />
                    </div>
                    <div className="col-md-4 col-12">
                      <input
                        type="text"
                        name="email"
                        placeholder="Your Email *"
                      />
                    </div>
                  </>
                )}
                <div className="col-md-4 col-12">
                  <div className="rating">
                    <span className="rating-title">Your Rating : </span>
                    <Box
                      sx={{
                        "& > legend": { mt: 2 },
                      }}
                    >
                      <Rating
                        name="simple-controlled"
                        value={comment.ratingValue}
                        onChange={(event, newValue) => {
                          setComment((prev) => ({
                            ...prev,
                            ratingValue: newValue,
                          }));
                        }}
                      />
                    </Box>
                  </div>
                </div>
                <div className="col-md-12 col-12">
                  <textarea
                    rows="8"
                    type="text"
                    name="message"
                    placeholder="Type Here Message"
                    value={comment.desc}
                    onChange={(e) =>
                      setComment((prev) => ({
                        ...prev,
                        desc: e.target.value,
                      }))
                    }
                  ></textarea>
                </div>
                <div className="col-12">
                  <button className="default-button" type="submit">
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="post-item">
            <div className="post-thumb">
              <img src="/src/assets/images/shop/01.jpg" alt="shop" />
            </div>
            <div className="post-content">
              <ul className="lab-ul">
                <li>Donec non est at libero vulputate rutrum.</li>
                <li>Morbi ornare lectus quis justo gravida semper.</li>
                <li>Pellentesque aliquet, sem eget laoreet ultrices.</li>
                <li>
                  Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id
                  nulla.
                </li>
                <li>Donec a neque libero.</li>
                <li>Pellentesque aliquet, sem eget laoreet ultrices.</li>
                <li>Morbi ornare lectus quis justo gravida semper..</li>
              </ul>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </>
  );
};

export default Review;
