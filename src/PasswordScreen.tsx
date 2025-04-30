import { useState } from 'react';

export default function PasswordScreen({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Macaroni!') {
      onSuccess();
    } else {
      alert('Wrong password');
    }
  };

  return (
    <div style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column', 
        padding: '20px'
      }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '300px' }}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', fontSize: '16px', width: '100%' }}
          />
          <button type="submit" style={{ padding: '10px', fontSize: '16px', width: '100%' }}>
            Login
          </button>
        </form>
      </div>
  );
}
