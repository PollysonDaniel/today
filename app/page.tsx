'use client';

import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      
      if (data.error) {
        console.error('API Error:', data.error);
        setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${data.error}` }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">🤖 Danson Q&A Assistant</h1>
      
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message, idx) => (
          <div key={idx} className={`p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 text-gray-800'} max-w-[80%] ${message.role === 'user' ? 'ml-auto' : 'mr-auto'}`}>
            <strong>{message.role === 'user' ? 'You:' : 'AI:'}</strong>
            <p className="mt-1">{message.content}</p>
          </div>
        ))}
        {loading && <div className="text-gray-500">AI is thinking...</div>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask me anything..." className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" disabled={loading}>Send</button>
      </form>
    </div>
  );
}