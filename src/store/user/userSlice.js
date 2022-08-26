import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocument,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
} from "../../utils/firebase/firebase.utils";

const getSnapshotFromUserAuth = createAsyncThunk(
  "user/getSnapshotFromUserAuth",
  async ({ userAuth, additionalInformation = {} }, { rejectWithValue }) => {
    try {
      console.log(
        "🚀 ~ file: userSlice.js ~ line 23 ~ {userAuth,additionalInformation}",
        { userAuth, additionalInformation }
      );
      const userSnapshot = await createUserDocument(userAuth, {
        additionalInformation,
      });
      console.log(
        "🚀 ~ file: userSlice.js ~ line 23 ~ userSnapshot",
        userSnapshot
      );

      return userSnapshot;
    } catch (error) {
      console.log(userAuth);
      rejectWithValue(error);
    }
  }
);

export const googleSignIn = createAsyncThunk(
  "user/googleSignIn",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const userAuth = await signInWithGooglePopup();
      dispatch(getSnapshotFromUserAuth(userAuth));
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const emailSignIn = createAsyncThunk(
  "user/emailSignIn",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      const userAuth = user;
      dispatch(getSnapshotFromUserAuth({ userAuth }));
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const emailSignUp = createAsyncThunk(
  "user/emailSignUp",
  async ({ email, password, displayName }, { dispatch, rejectWithValue }) => {
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      const userAuth = user;
      dispatch(getSnapshotFromUserAuth({ userAuth, displayName }));
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const checkUserSession = createAsyncThunk(
  "user/checkUserSession",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const user = await getCurrentUser();
      if (!user) return;
      dispatch(getSnapshotFromUserAuth(user));
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const signOutUserAuth = createAsyncThunk(
  "user/signOutUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const userAuth = await signOutUser();
      dispatch(getSnapshotFromUserAuth({ userAuth }));
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(checkUserSession.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(checkUserSession.fulfilled, (state) => ({ ...state }))
      .addCase(checkUserSession.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))
      .addCase(getSnapshotFromUserAuth.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(getSnapshotFromUserAuth.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        currentUser: payload,
      }))
      .addCase(getSnapshotFromUserAuth.rejected, (state, { payload }) => ({
        ...state,
        error: payload,
        isLoading: false,
      }))
      .addCase(googleSignIn.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(googleSignIn.fulfilled, (state) => ({ ...state }))
      .addCase(googleSignIn.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))
      .addCase(emailSignIn.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(emailSignIn.fulfilled, (state) => ({ ...state }))
      .addCase(emailSignIn.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))
      .addCase(emailSignUp.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(emailSignUp.fulfilled, (state) => ({ ...state }))
      .addCase(emailSignUp.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))
      .addCase(signOutUserAuth.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(signOutUserAuth.fulfilled, (state) => ({
        ...state,
        isLoading: false,
      }))
      .addCase(signOutUserAuth.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }));
  },
});

export default userSlice.reducer;
