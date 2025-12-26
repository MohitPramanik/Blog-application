import { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';
import type { Blog, BlogCategoryType } from '../types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useBlog } from '../context/BlogContext';

type EditBlogProps = {
    blog: Blog | null;
    setBlog: React.Dispatch<React.SetStateAction<Blog | null>>;
    onCancel: () => void;
    onSuccess: () => void;
};

type formDataType = {
    title: string;
    content: string;
    categoryId: string | BlogCategoryType;
}

const EditBlog: React.FC<EditBlogProps> = ({
    blog,
    setBlog,
    onCancel,
    onSuccess
}) => {
    const [formData, setFormData] = useState<formDataType>({
        title: blog?.title || "",
        content: blog?.content || "",
        categoryId: blog?.category || ""
    });

    const { id: blogId } = useParams();

    const { blogCategories, getAllBlogsCategories, updateBlogCategoryCount } = useBlog();

    useEffect(() => {
        getAllBlogsCategories();
    }, [])


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

        if (!formData.title || !formData.content || !formData.categoryId) {
            toast.error("All fields are required");
            return;
        }

        try {
            const response = await api.put(`/blog/${blogId}`, formData);

            setBlog(response.data.data);
            toast.success('Blog updated successfully');

            if (blog?.category !== formData.categoryId) {
                console.log("Blog category", blog?.category);
                console.log("formdata category", formData.categoryId);
                updateBlogCategoryCount(String(formData?.categoryId), "created");
                updateBlogCategoryCount(String(blog?.category), "deleted");
            }


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
                    <Form.Select aria-label="Default select example" onChange={handleChange} name='categoryId' value={formData?.categoryId.toString()}>
                        <option>Select</option>
                        {
                            blogCategories.map((category) => (
                                <option key={category?._id} value={category._id}>{category.name}</option>
                            ))
                        }
                    </Form.Select>
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
