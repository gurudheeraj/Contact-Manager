import { useState } from "react";
import AddContactIcon from "../assets/addContact_icon.png";

const API_URL = "https://contact-manager-exc1.onrender.com/api/contacts";

const ContactForm = ({ addContact }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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

    if (name === "phone" && !/^\d*$/.test(value)) return;

    setForm({ ...form, [name]: value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to save contact");
      }

      const savedContact = await res.json();

      addContact(savedContact); // ✅ update UI with DB data
      setForm({ name: "", email: "", phone: "", message: "" });
      setSuccess("Contact added successfully ✅");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isValid = validate() === "";

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="section-title">
        <img src={AddContactIcon} alt="add contact" />
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
        placeholder="Email"
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

      <button disabled={!isValid || loading}>
        {loading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
};

export default ContactForm;
