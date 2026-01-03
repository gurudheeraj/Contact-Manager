import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import "./App.css";
import contactManager from "./assets/contactManager.png";

const API_URL = "https://contact-manager-exc1.onrender.com/api/contacts";

function App() {
  const [contacts, setContacts] = useState([]);

  // ✅ Fetch contacts from backend on page load
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error("Failed to fetch contacts", err);
    }
  };

  // ✅ Add contact (POST → MongoDB)
  const addContact = (savedContact) => {
  setContacts((prev) => [...prev, savedContact]);
};


  // ✅ Delete contact (DELETE → MongoDB)
  const deleteContact = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Failed to delete contact", err);
    }
  };

  return (
    <div className="page">
      <header className="app-header">
        <div className="title-with-icon">
          {/* ✅ LOGO UNCHANGED */}
          <img src={contactManager} alt="contact manager" />
          <h1>Contact Manager</h1>
        </div>
      </header>

      <div className="center-wrapper">
        <ContactForm addContact={addContact} />
        <ContactList
          contacts={contacts}
          deleteContact={deleteContact}
        />
      </div>
    </div>
  );
}

export default App;
