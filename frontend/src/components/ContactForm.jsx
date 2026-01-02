import { useState } from "react";
import AddContactIcon from "../assets/addContact_icon.png";
const ContactForm = ({ addContact }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validate = () => {
    if (!form.name.trim()) return "Name is required";

    if (!form.phone.trim()) return "Phone number is required";

    if (!/^\d{10}$/.test(form.phone))
      return "Phone number must be exactly 10 digits";

    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    )
      return "Invalid email format";

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // allow only digits for phone
    if (name === "phone" && !/^\d*$/.test(value)) return;

    setForm({ ...form, [name]: value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    addContact(form);
    setForm({ name: "", email: "", phone: "", message: "" });
    setSuccess("Contact added successfully ✅");
  };

  const isValid = validate() === "";

  return (
    <form className="card" onSubmit={handleSubmit}>
        <div className="section-title">
            <img src={AddContactIcon} alt="add contact"/>
            <h2>Add Contact</h2>
        </div>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <input
        name="name"
        placeholder="Name *"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email *"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone (10 digits) *"
        value={form.phone}
        onChange={handleChange}
        maxLength={10}
      />

      <textarea
        name="message"
        placeholder="Message (optional)"
        value={form.message}
        onChange={handleChange}
      />

      <button disabled={!isValid}>Submit</button>
    </form>
  );
};

export default ContactForm;
