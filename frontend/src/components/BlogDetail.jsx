import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./blog.css";

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/blogging/${slug}/`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }, [slug]);

  if (!post) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="detail-container">

      {/* Hero Image */}
      <div className="detail-hero">
        <img src={`http://127.0.0.1:8000${post.image}`} alt={post.title} />
      </div>

      {/* Content */}
      <div className="detail-content">
        <span className="detail-category">{post.category}</span>

        <h1 className="detail-title">{post.title}</h1>

        <div className="detail-meta">
          <span>🗓 {new Date(post.created_at).toDateString()}</span>
          <span>👁 {post.views} views</span>
        </div>

        <div className="detail-text">
          {post.text}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
