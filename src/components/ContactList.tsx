import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Contact, deleteContact, editContact } from "../redux/contactSlice";
import CreateContact from "./CreateContact";

const buttonStyle = "hover:bg-white outline m-2 p-1";

function ContactList() {
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [editedFname, setEditedFname] = useState<string>("");
  const [editedLname, setEditedLname] = useState<string>("");
  const [editedIsActive, setEditedIsActive] = useState<boolean | null>(null);
  const [viewingContactId, setViewingContactId] = useState<string | null>(null); // New state for view mode

  const contacts = useSelector(
    (state: { contacts: { contacts: Contact[] } }) => state.contacts.contacts
  );
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
  };

  const handleEdit = (id: string) => {
    const contact = contacts.find((contact) => contact.id === id);
    if (contact) {
      setEditingContactId(id);
      setEditedFname(contact.fName);
      setEditedLname(contact.lName);
      setEditedIsActive(contact.isActive);
    }
  };

  const handleSaveEdit = () => {
    if (editingContactId !== null && editedIsActive !== null) {
      dispatch(
        editContact({
          id: editingContactId,
          fName: editedFname,
          lName: editedLname,
          isActive: editedIsActive,
        })
      );
      setEditingContactId(null);
      setEditedFname("");
      setEditedLname("");
      setEditedIsActive(null);
    }
  };

  const handleView = (id: string) => {
    setViewingContactId(id);
  };

  const handleCloseView = () => {
    setViewingContactId(null);
  };

  const contactToView = contacts.find(
    (contact) => contact.id === viewingContactId
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap justify-center gap-5 mx-8">
        {contacts.map((contact) => (
          <div key={contact.id}>
            {editingContactId === contact.id ? (
              <div className="flex flex-col gap-4 p-7 bg-cadetblue">
                <label htmlFor="fName">
                  First Name:
                  <input
                    id="fName"
                    type="text"
                    className="px-2 ml-2"
                    placeholder="Enter your first name"
                    value={editedFname}
                    onChange={(e) => setEditedFname(e.target.value)}
                  />
                </label>

                <label htmlFor="lName">
                  Last Name:
                  <input
                    id="lName"
                    type="text"
                    className="px-2 ml-2"
                    value={editedLname}
                    placeholder="Enter your last name"
                    onChange={(e) => setEditedLname(e.target.value)}
                  />
                </label>

                <label>Status:</label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={editedIsActive === true}
                    onChange={() => setEditedIsActive(true)}
                    className="checked:bg-blue-500 indeterminate:bg-gray-300 default:ring-2 required:border-red-500 valid:border-green-500 invalid:border-red-500"
                  />
                  Active
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={editedIsActive === false}
                    onChange={() => setEditedIsActive(false)}
                    className="checked:bg-blue-500 indeterminate:bg-gray-300 default:ring-2 required:border-red-500 valid:border-green-500 invalid:border-red-500"
                  />
                  Inactive
                </label>

                <button
                  className="w-full text-white bg-black hover:bg-aliceblue"
                  onClick={handleSaveEdit}
                >
                  Update
                </button>
              </div>
            ) : (
              <div className="p-4 bg-white">
                <div className="flex flex-col items-center p-4 bg-aliceblue">
                  <h4 className="text-lg font-semibold capitalize">{`${contact.fName} ${contact.lName}`}</h4>
                  <p className="uppercase">
                    {contact.isActive ? "Active" : "Inactive"}
                  </p>

                  <div className="flex justify-center">
                    <button
                      className={buttonStyle}
                      onClick={() => handleView(contact.id)} // View button
                    >
                      View
                    </button>
                    <button
                      className={buttonStyle}
                      onClick={() => handleEdit(contact.id)}
                    >
                      Edit
                    </button>
                    <button
                      className={buttonStyle}
                      onClick={() => handleDelete(contact.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* View Contact Modal */}
      {viewingContactId && contactToView && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold">{`${contactToView.fName} ${contactToView.lName}`}</h3>
            <p>Status: {contactToView.isActive ? "Active" : "Inactive"}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleCloseView}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <CreateContact />
    </div>
  );
}

export default ContactList;
