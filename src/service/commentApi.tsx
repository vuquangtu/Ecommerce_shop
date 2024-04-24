import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import moment from "moment";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";

import { db } from "../fireBase/config";

const timestamp = new Date();
const isoString = moment(timestamp).format("DD/MM/YYYY HH:mm:ss");

const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery(),
  tagTypes: ["comments"],
  endpoints: (builder) => ({
    fetchcomments: builder.query({
      queryFn: async () => {
        try {
          const commentsRef = collection(db, "comments");
          const querySnapshot = await getDocs(commentsRef);
          const listcomments = [];
          querySnapshot?.forEach((doc) => {
            listcomments.push({ idFireBase: doc.id, ...doc.data() });
          });
          return { data: listcomments };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["comments"],
    }),

    addcomment: builder.mutation({
      queryFn: async (comment) => {
        try {
          await addDoc(collection(db, "comments"), {
            ...comment,
            timestamp: isoString,
          });

          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["comments"],
    }),

    deletecomment: builder.mutation({
      queryFn: async (id) => {
        try {
          await deleteDoc(doc(db, "comments", id));
          return { status: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["comments"],
    }),
  }),
});

export const {
  useFetchcommentsQuery,
  useAddcommentMutation,
  useDeletecommentMutation,
} = commentsApi;
export default commentsApi;
