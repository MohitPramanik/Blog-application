import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';
import type { Blog } from '../types';
import { useParams } from 'react-router-dom';
import axios from 'axios';

type EditBlogProps = {
    blog: Blog | null;
    setBlog: React.Dispatch<React.SetStateAction<Blog | null>>;
    onCancel: () => void;
    onSuccess: () => void;
};

const EditBlog: React.FC<EditBlogProps> = ({
    blog,
    setBlog,
    onCancel,
    onSuccess
}) => {
    const [formData, setFormData] = useState({
        title: blog?.title || "",
        content: blog?.content || "",
        category: blog?.category || ""
    });

    const { id: blogId } = useParams();


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.content || !formData.category) {
            toast.error("All fields are required");
            return;
        }

        try {
            const response = await api.put(`/blog/${blogId}`, formData);

            setBlog(response.data.data);
            toast.success('Blog updated successfully');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }

        onSuccess();
    };

    return (
        <Container className="py-5">
            <h1>Edit Blog</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </Form.Group>

                <div className="d-flex gap-2">
                    <Button type="submit">Update</Button>
                    <Button variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default EditBlog;
