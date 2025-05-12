import React, { useState } from 'react';
export default function Dashboard() {
  const [form, setForm] = useState({ name: '', about: '', skills: '', contact: '' });
  const email = localStorage.getItem('email');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, email })
    });
    if (res.ok) {
      window.location.href = '/portfolio';
    } else {
      alert('Error saving portfolio');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Build Portfolio</h2>
      <input placeholder="Full Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <textarea placeholder="About" onChange={e => setForm({ ...form, about: e.target.value })} />
      <input placeholder="Skills" onChange={e => setForm({ ...form, skills: e.target.value })} />
      <input placeholder="Contact" onChange={e => setForm({ ...form, contact: e.target.value })} />
      <button type="submit">Submit</button>
    </form>
  );
}
