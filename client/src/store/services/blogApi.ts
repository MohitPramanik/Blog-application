import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        }
    }),
    tagTypes: ["Blog"],
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: ({ page, limit }: { page: number; limit: number }) => `blog?page=${page}&limit=${limit}`
        }),

        getIndividualBlog: builder.query({
            query: (blogId) => `blog/${blogId}`
        }),

        updateBlog: builder.mutation({
            query: (updatedBlog) => ({
                url: `blog/${updatedBlog._id}`,
                method: "PUT",
                body: updatedBlog
            })
        }),

        deleteBlog: builder.mutation({
            query: (blogId) => ({
                url: `blog/${blogId}`,
                method: "DELETE"
            })
        }),

        likeBlog: builder.mutation({
            query: (blogId) => ({
                url: `blog/${blogId}/like`,
                method: "POST"
            })
        }),

        unlikeBlog: builder.mutation({
            query: (blogId) => ({
                url: `blog/${blogId}/like`,
                method: "DELETE"
            })
        }),

        getBlogComments: builder.query({
            query: ({blogId}) => `comment/${blogId}`
        }),

        addComments: builder.mutation({
            query: ({ blogId, newComment }) => ({
                url: `comment/${blogId}`,
                method: "POST",
                body: newComment
            })
        }),

        updateComment: builder.mutation({
            query: ({ commentId, updatedComment }) => ({
                url: `comment/${commentId}`,
                method: "PUT",
                body: updatedComment
            })
        }),

        deleteComment: builder.mutation({
            query: (commentId) => ({
                url: `comment/${commentId}`,
                method: "DELETE"
            })
        }),

        likeComment: builder.mutation({
            query: (commentId) => ({
                url: `comment/${commentId}/like`,
                method: "PUT"
            })
        }),

        unlikeComment: builder.mutation({
            query: (commentId) => ({
                url: `comment/${commentId}/dislike`,
                method: "PUT"
            })
        })
    })
})

export const {
    useGetBlogsQuery,
    useGetIndividualBlogQuery,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
    useLikeBlogMutation,
    useUnlikeBlogMutation,
    useGetBlogCommentsQuery,
    useAddCommentsMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useLikeCommentMutation,
    useUnlikeCommentMutation } = blogApi;