import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api';

export const loadCategories = createAsyncThunk('products/loadCategories', api.getCategories);

export const loadAllProducts = createAsyncThunk('products/loadAllProducts', api.getProducts);

export const loadCategoryProducts = createAsyncThunk('products/loadCategoryProducts', async (id) => {
  const response = await api.getCategory(id);
  if (response.status === 'ERR') {
    throw new Error(response.message);
  }
  return response;
});

export const loadProduct = createAsyncThunk('products/loadProduct', async (id) => {
  const response = await api.getProduct(id);
  if (response.status === 'ERR' || !response.length) {
    throw new Error('Product not found');
  }
  return response[0];
});

const initialState = {
  categories: [],
  categoriesStatus: 'idle',
  products: [],
  productsStatus: 'idle',
  category: null,
  categoryProducts: [],
  categoryStatus: 'idle',
  product: null,
  productStatus: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.categoriesStatus = 'loading';
        state.error = null;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.categoriesStatus = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.categoriesStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(loadAllProducts.pending, (state) => {
        state.productsStatus = 'loading';
        state.error = null;
      })
      .addCase(loadAllProducts.fulfilled, (state, action) => {
        state.productsStatus = 'succeeded';
        state.products = action.payload;
      })
      .addCase(loadAllProducts.rejected, (state, action) => {
        state.productsStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(loadCategoryProducts.pending, (state) => {
        state.categoryStatus = 'loading';
        state.error = null;
      })
      .addCase(loadCategoryProducts.fulfilled, (state, action) => {
        state.categoryStatus = 'succeeded';
        state.category = action.payload.category;
        state.categoryProducts = action.payload.data;
      })
      .addCase(loadCategoryProducts.rejected, (state, action) => {
        state.categoryStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(loadProduct.pending, (state) => {
        state.productStatus = 'loading';
        state.error = null;
      })
      .addCase(loadProduct.fulfilled, (state, action) => {
        state.productStatus = 'succeeded';
        state.product = action.payload;
      })
      .addCase(loadProduct.rejected, (state, action) => {
        state.productStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectCategories = (state) => state.products.categories;
export const selectAllProducts = (state) => state.products.products;
export const selectCategory = (state) => state.products.category;
export const selectCategoryProducts = (state) => state.products.categoryProducts;
export const selectProduct = (state) => state.products.product;
export const selectError = (state) => state.products.error;

export default productsSlice.reducer;
