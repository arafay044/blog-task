import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition mb-6">
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-3">By {post.authorId?.name || "Unknown"}</p>
      <Link
        to={`/post/${post._id}`}
        className="text-blue-600 hover:underline font-medium"
      >
        Read More
      </Link>
    </div>
  );
};

export default BlogCard;
