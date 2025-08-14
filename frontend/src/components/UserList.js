import React from 'react';

function UserList({ users, onEdit, onDelete }) {
  return (
    <div>
      <h3>Users List</h3>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map(user => (
          <div key={user.id} style={{ 
            padding: '10px', 
            margin: '10px 0', 
            border: '1px solid #eee',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <strong>{user.name}</strong> - {user.email}
            </div>
            <div>
              <button 
                onClick={() => onEdit(user)}
                style={{ padding: '5px 10px', marginRight: '5px' }}
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(user.id)}
                style={{ padding: '5px 10px', backgroundColor: '#ff4444', color: 'white' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UserList;