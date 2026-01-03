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

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name, value) => {
    let error = "";

    if (name === "name" && !value.trim()) {
      error = "Name is required";
    }

    if (name === "phone") {
      if (!value.trim()) error = "Phone number is required";
      else if (!/^\d{10}$/.test(value))
        error = "Phone number must be exactly 10 digits";
    }

    if (name === "email" && value && !emailRegex.test(value)) {
      error = "Invalid email format";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && !/^\d*$/.test(value)) return;

    setForm({ ...form, [name]: value });
    validateField(name, value);
    setSuccess("");
  };

  const isFormValid =
    form.name.trim() &&
    /^\d{10}$/.test(form.phone) &&
    (!form.email || emailRegex.test(form.email)) &&
    Object.values(errors).every((e) => !e);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      setLoading(true);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save contact");

      const savedContact = await res.json();
      addContact(savedContact);

      setForm({ name: "", email: "", phone: "", message: "" });
      setErrors({});
      setSuccess("Contact added successfully ✅");
    } catch {
      setErrors({ submit: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="section-title">
        <img src={AddContactIcon} alt="add contact" />
        <h2>Add Contact</h2>
      </div>

      {success && <p className="success">{success}</p>}
      {errors.submit && <p className="error">{errors.submit}</p>}

      <input
        name="name"
        placeholder="Name *"
        value={form.name}
        onChange={handleChange}
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <input
        name="phone"
        placeholder="Phone (10 digits) *"
        value={form.phone}
        onChange={handleChange}
        maxLength={10}
      />
      {errors.phone && <p className="error">{errors.phone}</p>}

      <textarea
        name="message"
        placeholder="Message (optional)"
        value={form.message}
        onChange={handleChange}
      />

      <button disabled={!isFormValid || loading}>
        {loading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
};

export default ContactForm;
