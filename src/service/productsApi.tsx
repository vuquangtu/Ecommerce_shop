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

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery(),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    fetchproducts: builder.query({
      queryFn: async () => {
        try {
          const productsRef = collection(db, "products");
          const querySnapshot = await getDocs(productsRef);

          const listproducts = [];
          querySnapshot?.forEach((doc) => {
            listproducts.push({ id: doc.id, ...doc.data() });
          });
      
          return { data: listproducts };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["products"],
    }),
    fetchproduct: builder.query({
      queryFn: async (id) => {
        try {
          const productRef = doc(db, "products", id);
          const snapshot = await getDoc(productRef);

          return { data: snapshot.data() };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["products"],
    }),

    addproduct: builder.mutation({
      queryFn: async (product) => {
        try {
          await addDoc(collection(db, "products"), {
            ...product,
            timestamp: isoString,
          });

          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["products"],
    }),
    updateproduct: builder.mutation({
      queryFn: async ({ id, product }) => {
        try {
          await updateDoc(doc(db, "products", id), {
            ...product,
            timestamp: isoString,
          });

          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["products"],
    }),
    deleteproduct: builder.mutation({
      queryFn: async (id) => {
        try {
          await deleteDoc(doc(db, "products", id));
          return { status: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useFetchproductQuery,
  useFetchproductsQuery,
  useAddproductMutation,
  useDeleteproductMutation,
  useUpdateproductMutation,
} = productsApi;

export default productsApi;
