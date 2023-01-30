import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cardService from "./cardService";

const initialState = {
  campaign: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};




//Create new campaign
export const createCard = createAsyncThunk(
  "campaigns",
  async (campaignData, thunkAPI) => {
    try {
      return await campaignService.createCampaign(campaignData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get all campaigns
export const getCampaigns = createAsyncThunk(
  "campaigns/all",
  async (_, thunkAPI) => {
    try {
      return await cardService.getCampaigns();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get campaigns
export const getCampaign = createAsyncThunk(
  "campaigns",
  async (campaignData, thunkAPI) => {
    try {
      return await cardService.getCampaign(campaignData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCampaign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cards = action.payload;
      })
      .addCase(createCampaign.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createCampaign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCampaigns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cards = action.payload;
      })
      .addCase(getCampaigns.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCampaigns.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCampaigns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cards = action.payload;
      })
      .addCase(getCampaign.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCampaign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCampaign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cards = [...action.payload];
      })
      .addCase(getCampaign.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = cardSlice.actions;
export default cardSlice.reducer;
