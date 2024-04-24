import React from "react";
import { Link } from "react-router-dom";

const title = "Most Popular Post";

const postList = [
  {
    id: 1,
    imgUrl: "/src/assets/images/blog/10.jpg",
    imgAlt: "rajibraj91",
    title: "Poor People Campaign Our Resources",
    date: "Jun 05,2022",
  },
  {
    id: 2,
    imgUrl: "/src/assets/images/blog/11.jpg",
    imgAlt: "rajibraj91",
    title: "Poor Peoples Campaign Our Resources",
    date: "Jun 05,2022",
  },
  {
    id: 3,
    imgUrl: "/src/assets/images/blog/12.jpg",
    imgAlt: "rajibraj91",
    title: "Poor Peoples Campaign Our Resources",
    date: "Jun 05,2022",
  },
  {
    id: 4,
    imgUrl: "/src/assets/images/blog/09.jpg",
    imgAlt: "rajibraj91",
    title: "Poor Peoples Campaign Our Resources",
    date: "Jun 05,2022",
  },
];

function PopularPost() {
  return (
    <div className="widget widget-post">
      <div className="widget-header">
        <h5 className="title">{title}</h5>
      </div>
      <ul className="widget-wrapper">
        {postList.map((item, index) => (
          <li key={index}>
            <div className="post-thumb mb-2">
              <Link to={`/blog/${item.id}`}>
                <img src={item.imgUrl} alt={item.imgAlt} />
              </Link>
            </div>
            <div className="post-content">
              <Link to={`/blog/${item.id}`}>
                <h6>{item.title}</h6>
              </Link>
              <p>{item.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopularPost;
