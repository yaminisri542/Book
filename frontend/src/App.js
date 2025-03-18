import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000/books"; // Adjust if needed

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", price: "" });

  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update a book
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form._id) {
        await axios.put(`${API_URL}/${form._id}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ title: "", author: "", price: "" });
      fetchBooks();
    } catch (error) {
      console.error("Error saving book", error);
    }
  };

  // Edit book
  const handleEdit = (book) => {
    setForm(book);
  };

  // Delete book
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h2>Bookstore</h2>
      
      {/* Book Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input type="text" name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <button type="submit">{form._id ? "Update" : "Add"} Book</button>
      </form>

      {/* Book List */}
      <ul>
        {books.map((book) => (
          <li key={book._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span>{book.title} by {book.author} - ${book.price}</span>
            <div>
              <button onClick={() => handleEdit(book)}>Edit</button>
              <button onClick={() => handleDelete(book._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
