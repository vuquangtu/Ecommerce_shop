import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../fireBase/config";

import moment from "moment";

const timestamp = new Date();
const isoString = moment(timestamp).format("DD/MM/YYYY HH:mm:ss");

const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery(),
  tagTypes: ["blogs"],
  endpoints: (builder) => ({
    fetchblogs: builder.query({
      queryFn: async () => {
        try {
          const blogsRef = collection(db, "blogs");
          const querySnapshot = await getDocs(blogsRef);
          const listBlogs = [];
          querySnapshot?.forEach((doc) => {
            listBlogs.push({ id: doc.id, ...doc.data() });
          });
          return { data: listBlogs };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["blogs"],
    }),
    fetchblog: builder.query({
      queryFn: async (id) => {
        try {
          const blogRef = doc(db, "blogs", id);
          const snapshot = await getDoc(blogRef);

          return { data: snapshot.data() };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["blogs"],
    }),

    addblog: builder.mutation({
      queryFn: async (blog) => {
        try {
          const timestamp = new Date()
            .toLocaleString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
            .replace(",", "");
          await addDoc(collection(db, "blogs"), {
            ...blog,
            timestamp: timestamp.replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3"),
          });

          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["blogs"],
    }),
    updateblog: builder.mutation({
      queryFn: async ({ id, blog }) => {
        try {
          const timestamp = new Date()
            .toLocaleString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
            .replace(",", "");

          await updateDoc(doc(db, "blogs", id), {
            ...blog,
            timestamp: timestamp.replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3"),
          });

          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["blogs"],
    }),
    deleteblog: builder.mutation({
      queryFn: async (id) => {
        try {
          await deleteDoc(doc(db, "blogs", id));
          return { status: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const {
  useFetchblogsQuery,
  useAddblogMutation,
  useDeleteblogMutation,
  useFetchblogQuery,
  useUpdateblogMutation,
} = blogsApi;
export default blogsApi;
