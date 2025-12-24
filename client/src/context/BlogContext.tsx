import React, { createContext, useContext, useState } from "react";
import type { BlogContextProps, BlogContextType } from "../types/index";
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

    const [blogCategories, setBlogCategories] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getAllBlogsCategories = async () => {
        try {
            if (!blogCategories.length) {
                let response = await api.get("/blog/category");
                setBlogCategories(response.data.data);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error("Error fetching categories");
            }
            console.log(error);
        }
    }

    return (
        <BlogContext.Provider value={{ blogCategories, getAllBlogsCategories, loading }}>
            {children}
        </BlogContext.Provider>
    )
}

export default BlogContextProvider;