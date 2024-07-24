import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Contact {
  id: string;
  fName: string;
  lName: string;
  isActive: boolean;
}

export interface ContactState {
  contacts: Contact[];
}

// Initial State using type
const initialState: ContactState = {
  contacts: [],
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(
        (contact) => contact.id === action.payload.id
      );
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
    toggleActive: (state, action: PayloadAction<string>) => {
      const contact = state.contacts.find(
        (contact) => contact.id === action.payload
      );
      if (contact) {
        contact.isActive = !contact.isActive;
      }
    },
  },
});

export const { addContact, editContact, deleteContact, toggleActive } =
  contactSlice.actions;
export default contactSlice.reducer;
