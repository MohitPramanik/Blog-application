import { Container } from "react-bootstrap";
import CommentSection from "./CommentSection";
import BlogDetailsHeader from "./BlogDetailsHeader";
import BlogContent from "./BlogContent";
import { useGetIndividualBlogQuery } from "../../store/services/blogApi";
import { useParams } from "react-router";

export default function BlogDetailsPage() {

  const { id } = useParams();

  const { data, isLoading, isError } = useGetIndividualBlogQuery(id || '')

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Something went wrong</div>

  const blog = data?.data || {};

  return (
    <Container fluid="lg" className="py-5">
      <BlogDetailsHeader
        title={blog.title}
        author={blog.author.username}
        createdAt={blog.createdAt}
        content={blog.content} />
      <BlogContent content={blog.content} />
      <CommentSection blogId={blog._id} />
    </Container>
  );
}