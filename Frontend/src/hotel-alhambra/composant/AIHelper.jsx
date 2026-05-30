import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import axios from 'axios';

export default function AIHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm Alhambra's AI assistant. How can I help you today?", sender: 'ai', time: new Date() }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user', time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post('/api/ai/chat', { message: input });
      const aiMsg = { id: Date.now() + 1, text: res.data.reply, sender: 'ai', time: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg = { id: Date.now() + 1, text: "I'm sorry, I'm having trouble connecting right now. Please try again later.", sender: 'ai', time: new Date() };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .ai-widget {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 2000;
          font-family: 'Jost', sans-serif;
        }
        .ai-toggle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #b8965a;
          color: white;
          border: none;
          box-shadow: 0 10px 25px rgba(184,150,90,0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .ai-toggle:hover { transform: scale(1.1); }
        
        .ai-chat-window {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 350px;
          height: 500px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 15px 50px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.4s ease-out;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ai-header {
          padding: 1.2rem;
          background: #1a1208;
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ai-header-info { display: flex; align-items: center; gap: 10px; }
        .ai-status { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; }

        .ai-messages {
          flex: 1;
          padding: 1.2rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: #fdfaf6;
        }
        .msg-bubble {
          max-width: 80%;
          padding: 0.8rem 1rem;
          border-radius: 12px;
          font-size: 0.85rem;
          line-height: 1.5;
          position: relative;
        }
        .msg-ai {
          align-self: flex-start;
          background: white;
          color: #1a1208;
          border: 1px solid #eee;
          border-bottom-left-radius: 2px;
        }
        .msg-user {
          align-self: flex-end;
          background: #b8965a;
          color: white;
          border-bottom-right-radius: 2px;
        }

        .ai-input-area {
          padding: 1rem;
          background: white;
          border-top: 1px solid #eee;
          display: flex;
          gap: 10px;
        }
        .ai-input {
          flex: 1;
          border: 1px solid #ddd;
          border-radius: 20px;
          padding: 0.6rem 1.2rem;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .ai-input:focus { border-color: #b8965a; }
        .ai-send {
          background: #b8965a;
          color: white;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .typing-dot {
          width: 6px;
          height: 6px;
          background: #ccc;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
      `}</style>

      <div className="ai-widget">
        {isOpen && (
          <div className="ai-chat-window">
            <div className="ai-header">
              <div className="ai-header-info">
                <Bot size={20} />
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Alhambra Concierge</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div className="ai-status" />
                    <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div className="ai-messages" ref={scrollRef}>
              {messages.map(msg => (
                <div key={msg.id} className={`msg-bubble ${msg.sender === 'ai' ? 'msg-ai' : 'msg-user'}`}>
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className="msg-bubble msg-ai" style={{ display: 'flex', gap: '4px', padding: '12px' }}>
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              )}
            </div>

            <form className="ai-input-area" onSubmit={handleSend}>
              <input 
                className="ai-input" 
                placeholder="Type your message..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="ai-send" type="submit">
                <Send size={16} />
              </button>
            </form>
          </div>
        )}

        <button className="ai-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </button>
      </div>
    </>
  );
}
