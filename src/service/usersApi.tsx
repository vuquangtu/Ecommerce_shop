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

const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery(),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    fetchusers: builder.query({
      queryFn: async () => {
        try {
          const usersRef = collection(db, "users");
          const querySnapshot = await getDocs(usersRef);
          const listUsers = [];
          querySnapshot?.forEach((doc) => {
            listUsers.push({ id: doc.id, ...doc.data() });
          });
          return { data: listUsers };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["users"],
    }),
    fetchuser: builder.query({
      queryFn: async (id) => {
        try {
          const userRef = doc(db, "users", id);
          const snapshot = await getDoc(userRef);

          return { data: snapshot.data() };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["users"],
    }),

    adduser: builder.mutation({
      queryFn: async (user) => {
        try {
          await addDoc(collection(db, "users"), {
            ...user,
            timestamp: isoString,
          });

          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["users"],
    }),
    updateuser: builder.mutation({
      queryFn: async ({ id, user }) => {
        try {
          await updateDoc(doc(db, "users", id), {
            ...user,
            timestamp: isoString,
          });

          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["users"],
    }),
    deleteuser: builder.mutation({
      queryFn: async (id) => {
        try {
          await deleteDoc(doc(db, "users", id));
          return { status: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useFetchuserQuery,
  useFetchusersQuery,
  useAdduserMutation,
  useDeleteuserMutation,
  useUpdateuserMutation,
} = usersApi;
export default usersApi;
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   getDoc,
//   getDocs,
//   doc,
//   updateDoc,
// } from "firebase/firestore";

// import { db } from "../fireBase/config";

// const usersApi = createApi({
//   reducerPath: "usersApi",
//   baseQuery: fetchBaseQuery(),
//   tagTypes: ["users"],
//   endpoints: (builder) => ({
//     fetchusers: builder.query({
//       queryFn: async () => {
//         const usersRef = collection(db, "users");
//         const querySnapshot = await getDocs(usersRef);
//         const listUsers = [];
//         querySnapshot.forEach((doc) => {
//           listUsers.push({ id: doc.id, ...doc.data() });
//         });
//         return listUsers;
//       },
//       providesTags: ["users"],
//     }),
//     fetchuser: builder.query({
//       queryFn: async (id) => {
//         const userRef = doc(db, "users", id);
//         const snapshot = await getDoc(userRef);
//         return snapshot.data();
//       },
//       providesTags: ["users"],
//     }),

//     adduser: builder.mutation({
//       queryFn: async (user) => {
//         const timestamp = new Date()
//           .toLocaleString("en-US", {
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//             hour: "2-digit",
//             minute: "2-digit",
//             second: "2-digit",
//           })
//           .replace(",", "");
//         await addDoc(collection(db, "users"), {
//           ...user,
//           timestamp: timestamp.replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3"),
//         });
//         return "ok";
//       },
//       invalidatesTags: ["users"],
//     }),
//     updateuser: builder.mutation({
//       queryFn: async ({ id, user }) => {
//         const timestamp = new Date()
//           .toLocaleString("en-US", {
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//             hour: "2-digit",
//             minute: "2-digit",
//             second: "2-digit",
//           })
//           .replace(",", "");
//         await updateDoc(doc(db, "users", id), {
//           ...user,
//           timestamp: timestamp.replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3"),
//         });
//         return "ok";
//       },
//       invalidatesTags: ["users"],
//     }),
//     deleteuser: builder.mutation({
//       queryFn: async (id) => {
//         await deleteDoc(doc(db, "users", id));
//         return "ok";
//       },
//       invalidatesTags: ["users"],
//     }),
//   }),
// });

// export const {
//   useFetchuserQuery,
//   useFetchusersQuery,
//   useAdduserMutation,
//   useDeleteuserMutation,
//   useUpdateuserMutation,
// } = usersApi;
// export default usersApi;
