import Chatbot from './Chatbot';

export default function Page() {
  return (
    <main style={{ background: 'linear-gradient(135deg, #a8e063, #56ab2f)', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', color: 'white' }}>💬 Si Barok AI</h1>
      <Chatbot />
      <footer style={{ textAlign: 'center', marginTop: '2rem', color: 'white' }}>
        Copyright © Si Barok AI
      </footer>
    </main>
  );
}
