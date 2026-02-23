import { useEffect, useState, useCallback, useMemo } from "react";
import { getBlogs } from "../services/api";
import "./blog.css";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [slide, setSlide] = useState(0);

  // Fetch blogs
  useEffect(() => {
    getBlogs()
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Slider posts
  const sliderPosts = useMemo(() => blogs.slice(0, 5), [blogs]);

  const nextSlide = useCallback(() => {
    if (!sliderPosts.length) return;
    setSlide((prev) => (prev + 1) % sliderPosts.length);
  }, [sliderPosts.length]);

  const prevSlide = useCallback(() => {
    if (!sliderPosts.length) return;
    setSlide((prev) =>
      prev === 0 ? sliderPosts.length - 1 : prev - 1
    );
  }, [sliderPosts.length]);

  // Auto slide
  useEffect(() => {
    if (!sliderPosts.length) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, sliderPosts.length]);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">AndroidStories</div>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/">Articles</a>
            <a href="/">About</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <h1>AndroidStories</h1>
        <p>Solution for all Android problems</p>
      </section>

      {/* Slider */}
      {sliderPosts.length > 0 && (
        <div className="slider">
          {sliderPosts.map((blog, index) => (
            <a
              key={blog.id}
              href={`/post/${blog.slug}`}
              className={`slide ${index === slide ? "active" : ""}`}
            >
              <img src={blog.image} alt={blog.title} />

              <div className="slide-overlay">
                <div className="slide-content">
                  <span className="slide-category">{blog.category}</span>
                  <h2 className="slide-title">{blog.title}</h2>
                  <p className="slide-text">
                    {blog.text.substring(0, 160)}...
                  </p>
                </div>
              </div>
            </a>
          ))}

          <button className="slider-btn prev" onClick={prevSlide}>‹</button>
          <button className="slider-btn next" onClick={nextSlide}>›</button>
        </div>
      )}

      {/* Latest Header */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">Latest Posts</div>
        </div>
      </nav>

      {/* Layout */}
      <div className="container">
        <div className="layout">

          {/* LEFT COLUMN */}
          <div className="main">
            <div className="grid">
              {blogs.length === 0 && <p>Loading posts...</p>}

              {blogs.map((blog) => (
                <div className="card" key={blog.id}>
                  <img src={blog.image} alt={blog.title} />

                  <div className="card-body">
                    <span className="category">{blog.category}</span>

                    <h3>
                      <a href={`/post/${blog.slug}`}>
                        {blog.title}
                      </a>
                    </h3>

                    <p className="text">
                      {blog.text.substring(0, 160)}...
                    </p>

                    <div className="meta">
                      <span>👁 {blog.views}</span>
                      <span>
                        {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — TRENDING */}
          <aside className="sidebar">
            <h3>🔥 Trending</h3>

            {blogs.slice(0, 5).map((blog) => (
              <a
                key={blog.id}
                href={`/post/${blog.slug}`}
                className="trend-item"
              >
                <img src={blog.image} alt={blog.title} />
                <p>{blog.title}</p>
              </a>
            ))}
          </aside>

        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        © 2026 AnuragBlogs · Full Stack Project
      </footer>
    </>
  );
};

export default BlogList;
