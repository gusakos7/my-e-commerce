import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocument,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import { getSnapProps, UserState } from "./user.types";

const getSnapshotFromUserAuth = createAsyncThunk(
  "user/getSnapshotFromUserAuth",
  async (
    { userAuth, additionalInformation = {} }: getSnapProps,
    { rejectWithValue }
  ) => {
    try {
      console.log(
        "🚀 ~ file: userSlice.js ~ line 23 ~ {userAuth,additionalInformation}",
        { userAuth, additionalInformation }
      );
      const userSnapshot = await createUserDocument(
        userAuth as User,
        additionalInformation
        // {additionalInformation}
      );
      console.log(
        "🚀 ~ file: userSlice.js ~ line 23 ~ userSnapshot",
        userSnapshot
      );

      return userSnapshot;
    } catch (error) {
      console.log(userAuth);
      rejectWithValue(error as Error);
    }
  }
);

export const googleSignIn = createAsyncThunk(
  "user/googleSignIn",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const userAuth = await signInWithGooglePopup();
      dispatch(getSnapshotFromUserAuth({ userAuth }));
    } catch (error) {
      rejectWithValue(error as Error);
    }
  }
);

export type emailSignInProps = {
  email: string;
  password: string;
};

export const emailSignIn = createAsyncThunk(
  "user/emailSignIn",
  async (
    { email, password }: emailSignInProps,
    { dispatch, rejectWithValue }
  ) => {
    try {
      const user = await signInAuthUserWithEmailAndPassword(email, password);
      const userAuth = user && user.user;
      dispatch(getSnapshotFromUserAuth({ userAuth }));
    } catch (error) {
      rejectWithValue(error as Error);
    }
  }
);

export type emailSignUpProps = emailSignInProps & {
  displayName: string;
};

export const emailSignUp = createAsyncThunk(
  "user/emailSignUp",
  async (
    { email, password, displayName }: emailSignUpProps,
    { dispatch, rejectWithValue }
  ) => {
    try {
      const user = await createAuthUserWithEmailAndPassword(email, password);

      const userAuth = user && user.user;
      const additionalInformation = { displayName };
      // There was no additionalInformation,
      // before the func below accepted as input:
      // {userAuth,displayName}
      dispatch(getSnapshotFromUserAuth({ userAuth, additionalInformation }));
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const checkUserSession = createAsyncThunk(
  "user/checkUserSession",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const userAuth = await getCurrentUser();
      if (!userAuth) return;
      dispatch(getSnapshotFromUserAuth({ userAuth }));
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
      dispatch(getSnapshotFromUserAuth({ userAuth } as getSnapProps));
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUserSession.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(checkUserSession.fulfilled, (state) => ({ ...state }))
      .addCase(
        checkUserSession.rejected,
        (state, { payload }: PayloadAction<any>) => ({
          ...state,
          isLoading: false,
          error: payload,
        })
      )
      .addCase(getSnapshotFromUserAuth.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(
        getSnapshotFromUserAuth.fulfilled,
        (state, { payload }: PayloadAction<any>) => ({
          ...state,
          isLoading: false,
          currentUser: payload,
        })
      )
      .addCase(
        getSnapshotFromUserAuth.rejected,
        (state, { payload }: PayloadAction<any>) => ({
          ...state,
          error: payload,
          isLoading: false,
        })
      )
      .addCase(googleSignIn.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(googleSignIn.fulfilled, (state) => ({ ...state }))
      .addCase(
        googleSignIn.rejected,
        (state, { payload }: PayloadAction<any>) => ({
          ...state,
          isLoading: false,
          error: payload,
        })
      )
      .addCase(emailSignIn.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(emailSignIn.fulfilled, (state) => ({ ...state }))
      .addCase(
        emailSignIn.rejected,
        (state, { payload }: PayloadAction<any>) => ({
          ...state,
          isLoading: false,
          error: payload,
        })
      )
      .addCase(emailSignUp.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(emailSignUp.fulfilled, (state) => ({ ...state }))
      .addCase(
        emailSignUp.rejected,
        (state, { payload }: PayloadAction<any>) => ({
          ...state,
          isLoading: false,
          error: payload,
        })
      )
      .addCase(signOutUserAuth.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(signOutUserAuth.fulfilled, (state) => ({
        ...state,
        isLoading: false,
      }))
      .addCase(
        signOutUserAuth.rejected,
        (state, { payload }: PayloadAction<any>) => ({
          ...state,
          isLoading: false,
          error: payload,
        })
      );
  },
});

export default userSlice.reducer;
