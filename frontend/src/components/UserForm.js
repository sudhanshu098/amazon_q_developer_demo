import React, { useState, useEffect } from 'react';

function UserForm({ onSubmit, editingUser, onCancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    } else {
      setName('');
      setEmail('');
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    onSubmit({ name, email });
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h3>{editingUser ? 'Edit User' : 'Add User'}</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '8px', marginRight: '10px', width: '200px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '8px', marginRight: '10px', width: '200px' }}
        />
      </div>
      <button type="submit" style={{ padding: '8px 16px', marginRight: '10px' }}>
        {editingUser ? 'Update' : 'Add'} User
      </button>
      {editingUser && (
        <button type="button" onClick={onCancel} style={{ padding: '8px 16px' }}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default UserForm;