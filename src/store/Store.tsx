import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";

import usersApi from "../service/usersApi";
import blogsApi from "../service/blogsApi";
import commentsApi from "../service/commentApi";
import productsApi from "../service/productsApi";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    // [getProducts.reducerPath]: getProducts.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [blogsApi.reducerPath]: blogsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // getProducts.middleware,
      usersApi.middleware,
      blogsApi.middleware,
      commentsApi.middleware,
      productsApi.middleware
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
