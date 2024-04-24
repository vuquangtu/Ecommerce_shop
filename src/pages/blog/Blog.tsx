import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";

import { Link } from "react-router-dom";
import {
  useFetchblogsQuery,
  useUpdateblogMutation,
} from "../../service/blogsApi";

import { useAddblogMutation } from "../../service/blogsApi";
import "react-toastify/dist/ReactToastify.css";

const inforPage = { title: "Our Blog Posts", curPage: "Blog" };
import { toast } from "react-toastify";

import { ToastContainer } from "react-toastify";
import { useDeleteblogMutation } from "../../service/blogsApi";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";

function Blog() {
  const { id } = useParams();

  const { data } = useFetchblogsQuery();
  const [deleteblog] = useDeleteblogMutation();
  const [updateBlog] = useUpdateblogMutation();
  const { uploadToFireBase } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    imgUrl: "",
    imgAlt: "Blog Thumb",
    title: "",
    desc: "",
    commentCount: "3",
    btnText: "Read More",
    metaList: [
      {
        iconName: "icofont-ui-user",
        text: "Rajib Raj",
      },
      {
        iconName: "icofont-calendar",
        text: "Jun 05,2022",
      },
    ],
  });

  const [file, setFile] = useState();

  const [setBlog] = useAddblogMutation();

  const [progress, setProgress] = useState(null);

  const handleSubmitBlog = async (e) => {
    e.preventDefault();

    try {
      await setBlog(formData);
      toast.success("Create blog success");
    } catch (err) {
      return { error: err };
    }
  };
  useEffect(() => {
    file && uploadToFireBase(file, setFormData);
  }, [file]);

  const handleDeleteBlog = async (id) => {
    try {
      await deleteblog(id);
      toast.info("blog Deleted Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <PageHeader inforPage={inforPage} />
      <div className="blog-section padding-tb section-bg">
        <div className="container">
          <div className="section-wrapper">
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-center g-4">
              {data &&
                data.map((blog, i) => (
                  <div className="col" key={i}>
                    <div className="post-item">
                      <div className="post-inner">
                        <div className="post-thumb">
                          <Link to={`/blog/${blog.id}`}>
                            <img
                              src={`${blog.imgUrl}`}
                              alt={`${blog.imgAlt}`}
                            />
                          </Link>
                        </div>
                        <div className="post-content">
                          <Link to={`/blog/${blog.id}`}>
                            <h4>{blog.title}</h4>
                          </Link>
                          <div className="meta-post">
                            <ul className="lab-ul">
                              {blog.metaList.map((val, i) => (
                                <li key={i}>
                                  <i className={val.iconName}></i>
                                  {val.text}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <p>{blog.desc}</p>
                        </div>
                        <div className="post-footer">
                          <div className="pf-left">
                            <Link
                              to={`/blog/${blog.id}`}
                              className="lab-btn-text"
                            >
                              {blog.btnText}{" "}
                              <i className="icofont-external-link"></i>
                            </Link>
                          </div>
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={(e) => handleDeleteBlog(blog.id)}
                          >
                            <i className="icofont-ui-delete" />
                          </span>
                          <div style={{ cursor: "pointer" }}>
                            <Link to={`/blog/update/${blog.id}`}>
                              <i className="icofont-edit" />
                            </Link>
                          </div>
                          <div style={{ cursor: "pointer" }}>
                            <i className="icofont-eye-alt" />
                          </div>
                          <div className="pf-right">
                            <i className="icofont-comment"></i>
                            <span className="comment-count">
                              {blog.commentCount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <div className="d-flex p-2 flex-col justify-content-center">
        <div className="w-50 p-3">
          <form>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Title</label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Title..."
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Description</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                name="desc"
                value={formData.desc}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="input-group mb-3"></div>

            <div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose file
                </label>
                <div className="input-group-prepend">
                  <button
                    className="input-group-text btn btn-primary my-4"
                    id="inputGroupFileAddon01"
                    onClick={handleSubmitBlog}
                  >
                    {id ? "Update" : "Create"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Blog;
