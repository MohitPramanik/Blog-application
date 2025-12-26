import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import Editor from '../components/Editor';
import '../styles/WriteBlog.css';
import axios from 'axios';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { useBlog } from '../context/BlogContext';

type FormDateType = {
  title: string;
  content: string;
  category: string;
}

const WriteBlog: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormDateType>({
    title: "",
    content: "",
    category: ""
  });

  const [error, setError] = useState<string | null>(null);
  const { blogCategories, getAllBlogsCategories, updateBlogCategoryCount } = useBlog();

  useEffect(() => {
    getAllBlogsCategories();
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.category) {
      setError('Title, content, and category are required');
      return;
    }

    try {
      let response = await api.post("/blog", formData);
      toast.success(response.data.message);
      updateBlogCategoryCount(formData.category, "created");
      navigate("/blogs");
    }
    catch (error) {
      if (axios.isAxiosError(error))
        toast.error(error.response?.data.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  }

  return (
    <Container className="py-5">
      <h1 className="mb-3">✍️ Write a New Blog</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit} className="write-blog-form">

        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control value={formData.title} placeholder='Your Blog Title...' name='title' onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="content">
          <Form.Label>Content</Form.Label>
          {/* <Editor onChange={handleContentChange} /> */}
          <Form.Control as={'textarea'} placeholder='Write here...' rows={4} className='content-textarea' value={formData.content} name='content' onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Default select example" onChange={handleChange} name='category'>
              <option>Select</option>
              {
                blogCategories.map((category) => (
                  <option key={category?._id} value={category._id}>{category.name}</option>
                ))
              }
          </Form.Select>
        </Form.Group>



        <div className="d-flex gap-2">
          <Button type="submit" className='primary-btn'>Publish</Button>
          <Button variant="secondary" onClick={() => navigate('/blogs')}>Cancel</Button>
        </div>
      </Form>
    </Container >
  );
};

export default WriteBlog;
