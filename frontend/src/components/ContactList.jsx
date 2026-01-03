import { useState } from "react";
import contactListIcon from "../assets/contact_icon.png";

const ContactList = ({ contacts, deleteContact }) => {
  const [sortOrder, setSortOrder] = useState("default");

  if (contacts.length === 0) {
    return <p>No contacts added yet</p>;
  }

  const getSortedContacts = () => {
    if (sortOrder === "az") {
      return [...contacts].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      );
    }

    if (sortOrder === "za") {
      return [...contacts].sort((a, b) =>
        b.name.localeCompare(a.name, undefined, { sensitivity: "base" })
      );
    }

    return contacts; 
  };

  const sortedContacts = getSortedContacts();

  return (
    <div className="card list-card">
      {/* Title */}
      <div className="section-title1">
        <img src={contactListIcon} alt="contact list" />
        <h2>Contacts</h2>
      </div>

      {/* Sort dropdown */}
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="az">Name (A–Z)</option>
          <option value="za">Name (Z–A)</option>
        </select>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {sortedContacts.map((c) => (
            <tr key={c._id}>
              <td data-label="Name: ">{c.name}</td>
              <td data-label="Email: ">{c.email || "-"}</td>
              <td data-label="Phone: ">{c.phone}</td>
              <td data-label="Message: ">{c.message || "-"}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteContact(c._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
