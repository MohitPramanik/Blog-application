import React, { createContext, useContext, useState } from "react";
import type { Blog, BlogCategoryType, BlogContextProps, BlogContextType } from "../types/index";
import api from "../api/axiosInstance";
import axios from "axios";
import { toast } from "react-toastify";

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw Error("The app must be wrapped inside BlogContext");
    }

    return context;
}

const BlogContextProvider: React.FC<BlogContextProps> = ({ children }) => {

    const [blogCategories, setBlogCategories] = useState<BlogCategoryType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getAllBlogsCategories = async () => {
        try {
            if (!blogCategories.length) {
                setLoading(true);
                let response = await api.get("/category");
                setBlogCategories(response.data.data);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error("Error fetching categories");
            }
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    const updateBlogCategoryCount = (categoryId: string, action: "created" | "deleted") => {
        setBlogCategories((prevCategories) =>
            prevCategories.map((category) =>
                category._id === categoryId
                    ? {
                        ...category,
                        categoryCount:
                            action === "created"
                                ? category.categoryCount + 1
                                : (category.categoryCount > 0 ? category.categoryCount - 1 : category.categoryCount) ,
                    }
                    : category
            )
        );
    };


    return (
        <BlogContext.Provider value={{ blogCategories, getAllBlogsCategories, loading, updateBlogCategoryCount }}>
            {children}
        </BlogContext.Provider>
    )
}

export default BlogContextProvider;