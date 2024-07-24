import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Contact } from "../redux/contactSlice";

const buttonStyle =
  "bg-black hover:bg-white hover:text-black w-full p-2 text-white outline";

const CreateContact = () => {
  const contacts = useSelector(
    (state: { contacts: { contacts: Contact[] } }) => state.contacts.contacts
  );

  return (
    <div className="flex flex-col items-center p-5 text-center gap-8">
      <Link to="/contact-form">
        <button className={buttonStyle}>Create-New-Contact</button>
      </Link>
      {contacts.length === 0 && (
        <p>No Contact found. Please create New-contact </p>
      )}
    </div>
  );
};

export default CreateContact;
