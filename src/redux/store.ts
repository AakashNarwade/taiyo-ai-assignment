import { configureStore } from "@reduxjs/toolkit";
import contactsReducer, { ContactState } from "./contactSlice";

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

export type RootState = {
  contacts: ContactState;
};
export type AppDispatch = typeof store.dispatch;
export default store;
