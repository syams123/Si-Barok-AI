'use client';
import { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hai, aku Si Barok! Ada Yang Bisa Dibantu?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { from: 'user', text: input }]);
    const userMessage = input;
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setMessages(m => [...m, { from: 'bot', text: data.reply || 'Ups, ada error 😅' }]);
    } catch {
      setMessages(m => [...m, { from: 'bot', text: '⚡ Gagal nyambung ke server' }]);
    }
  };

  return (
    <div style={{ background: '#fff', borderRadius: '10px', padding: '1rem', maxWidth: '500px', margin: 'auto' }}>
      {messages.map((msg, i) => (
        <div key={i} style={{
          background: msg.from === 'bot' ? '#d4fc79' : '#fda085',
          padding: '0.5rem',
          borderRadius: '8px',
          marginBottom: '0.5rem',
          textAlign: msg.from === 'bot' ? 'left' : 'right'
        }}>
          <strong>{msg.from === 'bot' ? 'Si Barok' : 'Anda'}:</strong> {msg.text}
        </div>
      ))}
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Tulis pesanmu di sini..."
          style={{ flex: 1, padding: '0.5rem', borderRadius: '5px' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: '5px', background: '#28a745', color: 'white' }}>
          🚀
        </button>
      </form>
    </div>
  );
}

