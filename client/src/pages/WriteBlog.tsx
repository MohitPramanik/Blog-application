import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import type { Blog } from '../types';
import '../styles/WriteBlog.css';
import Editor from '../components/Editor';


const WriteBlog: React.FC = () => {
  // const { user } = useAuth();
  const navigate = useNavigate();


  const [formData, setFormData] = useState<Blog>({
    title: '',
    content: '',
    category: ''
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || formData.content === "<p><br></p>" || !formData.content || !formData.category) {
      setError('Title, content, and category are required');
      return;
    }

    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev: Blog) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  }

  const handleContentChange = (value: string) => {
    setFormData(prev => ({ ...prev, content: value }));
  };

  return (
    <Container className="py-5">
      <h1 className="mb-3">✍️ Write a New Blog</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit} className="write-blog-form">

        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control value={formData.title} name='title' onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="content">
          <Form.Label>Content</Form.Label>
          <Editor onChange={handleContentChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Default select example" onChange={handleChange} name='category' value={formData.category}>
            <option>Select</option>
            <option value="Acedemics">Acedemics</option>
            <option value="Education">Education</option>
            <option value="Technology">Technology</option>
          </Form.Select>
        </Form.Group>



        <div className="d-flex gap-2">
          <Button type="submit">Publish</Button>
          <Button variant="secondary" onClick={() => navigate('/blogs')}>Cancel</Button>
        </div>
      </Form>
    </Container >
  );
};

export default WriteBlog;
