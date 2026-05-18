import { useGetBlogsQuery } from "../../store/services/blogApi"
import PaginationSection from "../../components/PaginationSection";
import BlogHeader from "./BlogHeader";
import BlogsSection from "./BlogsSection";
import { useState } from "react";

export default function Blogs() {

  const [activePage, setActivePage] = useState(1);

  const { data, isLoading, isError } = useGetBlogsQuery({ page: activePage, limit: 12 });
  const blogs = data?.data || [];
  const totalBlogsCount = data?.total_records_count || 0;

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Something went wrong</div>

  return (
    <>
      <BlogHeader />
      <BlogsSection blogs={blogs} />
      <PaginationSection
        pageCount={totalBlogsCount / 12}
        activePage={activePage}
        setActivePage={setActivePage}
      />
    </>
  )
}
