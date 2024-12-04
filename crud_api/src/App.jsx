import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [data, setData] = useState([]); // State to store data
  const [searchQuery, setSearchQuery] = useState(""); // State for search
  const [form, setForm] = useState({ id: null, name: "", age: "" }); // State for form inputs

  const API_URL = "https://jsonplaceholder.typicode.com/users"; // Fake API URL

  // Fetch initial data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        // Transform data to match the structure
        const transformedData = result.map((user, index) => ({
          id: index + 1,
          name: user.name,
          age: Math.floor(Math.random() * 30) + 20, // Generate a mock age
        }));
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Add a new item
  const handleAdd = () => {
    if (!form.name || !form.age) {
      alert("Please fill in all fields.");
      return;
    }

    const newItem = {
      id: data.length ? data[data.length - 1].id + 1 : 1,
      name: form.name,
      age: parseInt(form.age),
    };

    setData([...data, newItem]);
    clearForm();
  };

  // Edit an item
  const handleEdit = (id) => {
    const item = data.find((d) => d.id === id);
    if (item) setForm(item);
  };

  // Update an item
  const handleUpdate = () => {
    if (!form.name || !form.age) {
      alert("Please fill in all fields.");
      return;
    }

    const updatedData = data.map((d) =>
      d.id === form.id ? { ...d, name: form.name, age: parseInt(form.age) } : d
    );

    setData(updatedData);
    clearForm();
  };

  // Delete an item
  const handleDelete = (id) => {
    setData(data.filter((d) => d.id !== id));
  };

  // Clear form
  const clearForm = () => {
    setForm({ id: null, name: "", age: "" });
  };

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <h1>CRUD Table with Search (React + JSONPlaceholder API)</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Add/Edit Form */}
      <div className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleInputChange}
        />
        {form.id ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App
