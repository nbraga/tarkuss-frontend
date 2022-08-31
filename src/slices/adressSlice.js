import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adressService from "../services/adressService";

const initialState = {
  adress: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Get user details, for edit data
export const adress = createAsyncThunk(
  "adress/register",
  async (adress, thunkAPI) => {
    const token = thunkAPI.getState().auth.adress.token;

    const data = await adressService.profile(adress, token);

    return data;
  }
);

// Update user details
export const updateAdress = createAsyncThunk(
  "adress/update",
  async (adress, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await adressService.updateAdress(adress, token);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);


export const adressSlice = createSlice({
  name: "adress",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(updateAdress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.adress = action.payload;
        state.message = "Usuário atualizado com sucesso!";
      })
      .addCase(updateAdress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.adress = null;
      })
  },
});

export const { resetMessage } = adressSlice.actions;
export default adressSlice.reducer;