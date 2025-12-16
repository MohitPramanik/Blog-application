// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import BlogCard from '../components/BlogCard';
// import type { Blog } from '../types';
// import '../styles/BlogList.css';

// const SavedBlogs: React.FC = () => {
//   const { user, isAuthenticated } = useAuth();
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [savedIds, setSavedIds] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/login');
//       return;
//     }

//     setLoading(true);
//     setTimeout(() => {
//       try {
//         const storedAll = JSON.parse(localStorage.getItem('blogs') || 'null');
//         const savedKey = `saved_blogs_${user?.id}`;
//         const storedSaved: string[] = JSON.parse(localStorage.getItem(savedKey) || '[]');

//         if (Array.isArray(storedAll) && storedAll.length > 0) {
//           const filtered = storedAll.filter((b: Blog) => storedSaved.includes(b.id));
//           setBlogs(filtered);
//         } else {
//           setBlogs([]);
//         }

//         setSavedIds(storedSaved || []);
//       } catch (err) {
//         setBlogs([]);
//       }
//       setLoading(false);
//     }, 400);
//   }, [isAuthenticated, navigate, user]);

//   const unsave = (id: string) => {
//     const key = `saved_blogs_${user?.id}`;
//     const newSaved = savedIds.filter((s) => s !== id);
//     localStorage.setItem(key, JSON.stringify(newSaved));
//     setSavedIds(newSaved);
//     setBlogs((prev) => prev.filter((b) => b.id !== id));
//   };

//   return (
//     <div className="blog-list-page">
//       <Container className="py-5">
//         <Row className="mb-5">
//           <Col md={8}>
//             <h1 className="mb-2 fw-bold">🔖 Saved Blogs</h1>
//             <p className="text-muted">Blogs you've saved to read later</p>
//           </Col>
//         </Row>

//         {loading ? (
//           <div className="text-center py-5">
//             <Spinner animation="border" role="status" variant="primary">
//               <span className="visually-hidden">Loading...</span>
//             </Spinner>
//           </div>
//         ) : (
//           <>
//             {blogs.length > 0 ? (
//               <Row className="g-4">
//                 {blogs.map((blog) => (
//                   <Col key={blog.id} xs={12} md={6} lg={4}>
//                     <div>
//                       <BlogCard blog={blog} />
//                       <div className="mt-2 text-end">
//                         <Button size="sm" variant="outline-danger" onClick={() => unsave(blog.id)}>
//                           Unsave
//                         </Button>
//                       </div>
//                     </div>
//                   </Col>
//                 ))}
//               </Row>
//             ) : (
//               <div className="text-center py-5">
//                 <h3 className="text-muted">No saved blogs</h3>
//                 <p className="text-muted">Save interesting articles from the feed to read later</p>
//               </div>
//             )}
//           </>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default SavedBlogs;

import React from 'react'

const SavedBlogs = () => {
  return (
    <div>
      
    </div>
  )
}

export default SavedBlogs

