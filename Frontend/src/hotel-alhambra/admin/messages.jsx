import React, { useState, useEffect } from "react";
import axios from "axios";
import { Mail, Reply, Trash2, Search, CheckCircle, MessageSquare } from "lucide-react";

const GOLD = "#b8965a";
const DARK = "#1a1208";
const CREAM = "#fdf6ec";

export default function MessagesInboxPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // "all" | "unread" | "replied"
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [submittingReply, setSubmittingReply] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/contact-messages");
      setMessages(res.data);
    } catch (err) {
      console.error("Error loading messages inbox", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedMsg) return;
    setSubmittingReply(true);
    try {
      await axios.put(`/api/contact-messages/${selectedMsg.id}/reply`, { reply: replyText });
      setReplyText("");
      setSelectedMsg(null);
      fetchMessages();
    } catch (err) {
      alert("Failed to send reply: " + (err.response?.data?.message || err.message));
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleDelete = async (msgId) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`/api/contact-messages/${msgId}`);
      if (selectedMsg?.id === msgId) setSelectedMsg(null);
      fetchMessages();
    } catch (err) {
      alert("Failed to delete message: " + (err.response?.data?.message || err.message));
    }
  };

  const filtered = messages.filter(m => {
    const matchStatus = filterStatus === "all" || m.status === filterStatus;
    const term = search.toLowerCase();
    const matchSearch = m.name.toLowerCase().includes(term) ||
      m.email.toLowerCase().includes(term) ||
      m.subject.toLowerCase().includes(term) ||
      m.message.toLowerCase().includes(term);
    return matchStatus && matchSearch;
  });

  return (
    <>
      <style>{`
        body { font-family: 'Jost', sans-serif; background: #f4efe6; color: ${DARK}; margin: 0; }
        .page-wrap { padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .header-row { display: flex; justify-content: space-between; align-items: center; }
        .header-title h1 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 400; margin: 0; }
        .header-title p { font-size: 0.8rem; color: #888; margin: 4px 0 0; }
        .search-input { padding: 10px 16px 10px 38px; border: 1px solid #e5ddd2; border-radius: 4px; background: white; outline: none; width: 260px; font-family: inherit; }
        .search-input:focus { border-color: ${GOLD}; }

        /* Filter strip */
        .filter-bar { display: flex; gap: 0.5rem; align-items: center; }
        .filter-btn { padding: 8px 16px; border: 1px solid rgba(184,150,90,0.25); background: white; font-family: inherit; font-size: 0.75rem; letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; border-radius: 4px; color: #7a6a58; transition: all 0.2s; }
        .filter-btn:hover { border-color: ${GOLD}; color: ${DARK}; }
        .filter-btn.active { background: ${DARK}; color: white; border-color: ${DARK}; }

        /* Inbox columns splitting */
        .inbox-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; min-height: 500px; }

        .list-panel { background: white; border: 1px solid rgba(184,150,90,0.15); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; }
        .msg-item { padding: 1.2rem; border-bottom: 1px solid #f0eae1; cursor: pointer; transition: all 0.2s; display: flex; flex-direction: column; gap: 6px; }
        .msg-item:hover { background: #faf8f5; }
        .msg-item.active { background: #fdf6ec; border-left: 3px solid ${GOLD}; }
        .msg-meta { display: flex; justify-content: space-between; font-size: 0.72rem; color: #888; }
        .msg-sender { font-weight: 600; color: ${DARK}; }
        .msg-subject { font-size: 0.88rem; font-weight: 500; color: #3b2e1e; }
        .msg-snippet { font-size: 0.78rem; color: #7a6a58; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .badge { padding: 2px 7px; border-radius: 3px; font-size: 0.6rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block; }
        .badge.unread { background: rgba(220,38,38,0.1); color: #dc2626; }
        .badge.replied { background: rgba(22,163,74,0.1); color: #16a34a; }

        /* Details side panel */
        .detail-panel { background: white; border: 1px solid rgba(184,150,90,0.15); border-radius: 8px; padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .detail-header { border-bottom: 1px solid #f0eae1; padding-bottom: 1rem; }
        .detail-title { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; margin-bottom: 8px; color: ${DARK}; }
        .detail-sender { font-size: 0.82rem; color: #555; margin-bottom: 4px; }
        .detail-body { font-size: 0.88rem; color: #444; line-height: 1.6; white-space: pre-line; }

        .reply-box { margin-top: 1rem; display: flex; flex-direction: column; gap: 8px; }
        .reply-textarea { width: 100%; padding: 12px; font-family: inherit; font-size: 0.85rem; border: 1px solid #e5ddd2; border-radius: 4px; outline: none; resize: vertical; min-height: 100px; }
        .reply-textarea:focus { border-color: ${GOLD}; }
        .btn-reply { padding: 10px 16px; background: ${DARK}; color: white; border: none; border-radius: 4px; font-family: inherit; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: background 0.2s; }
        .btn-reply:hover { background: ${GOLD}; }

        .reply-history { background: #faf8f5; border-radius: 4px; padding: 1rem; border-left: 3px solid #16a34a; font-size: 0.82rem; }
        .reply-history-title { font-weight: 600; color: #16a34a; margin-bottom: 4px; display: flex; align-items: center; gap: 6px; }

        .empty-state { text-align: center; padding: 4rem; color: #aaa; font-size: 0.9rem; }
      `}</style>

      <div className="page-wrap">
        <div className="header-row">
          <div className="header-title">
            <h1>Customer Messages Inbox</h1>
            <p>Read and reply to guest inquiries from the contact forms</p>
          </div>
          <div style={{ position: "relative" }}>
            <Search size={16} color="#bbb" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              className="search-input"
              placeholder="Search message text..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-bar">
          {[
            { key: "all", label: "All Messages" },
            { key: "unread", label: "Unread" },
            { key: "replied", label: "Replied" }
          ].map(f => (
            <button
              key={f.key}
              className={`filter-btn ${filterStatus === f.key ? "active" : ""}`}
              onClick={() => setFilterStatus(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="list-panel" style={{ padding: "4rem", textAlign: "center" }}>Loading inbox records...</div>
        ) : (
          <div className="inbox-layout">
            {/* LEFT Panel: Message List */}
            <div className="list-panel">
              {filtered.length === 0 ? (
                <div className="empty-state">No messages found.</div>
              ) : (
                filtered.map(m => (
                  <div
                    key={m.id}
                    className={`msg-item ${selectedMsg?.id === m.id ? "active" : ""}`}
                    onClick={() => setSelectedMsg(m)}
                  >
                    <div className="msg-meta">
                      <span className="msg-sender">{m.name} ({m.email})</span>
                      <span>{new Date(m.created_at).toLocaleDateString()}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="msg-subject">{m.subject}</span>
                      <span className={`badge ${m.status}`}>{m.status}</span>
                    </div>
                    <p className="msg-snippet">{m.message}</p>
                  </div>
                ))
              )}
            </div>

            {/* RIGHT Panel: Details & Actions */}
            <div className="detail-panel">
              {selectedMsg ? (
                <>
                  <div className="detail-header">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <h2 className="detail-title">{selectedMsg.subject}</h2>
                      <button
                        onClick={() => handleDelete(selectedMsg.id)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626" }}
                        title="Delete inquiry"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="detail-sender">From: <strong>{selectedMsg.name}</strong> ({selectedMsg.email})</p>
                    {selectedMsg.phone && <p className="detail-sender">Phone: {selectedMsg.phone}</p>}
                    <p className="detail-sender" style={{ fontSize: "0.75rem", color: "#aaa" }}>
                      Received: {new Date(selectedMsg.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="detail-body">
                    {selectedMsg.message}
                  </div>

                  {selectedMsg.reply ? (
                    <div className="reply-history">
                      <p className="reply-history-title"><CheckCircle size={14} /> Reply Sent</p>
                      <p>{selectedMsg.reply}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleReplySubmit} className="reply-box">
                      <p style={{ fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: GOLD }}>Compose Reply</p>
                      <textarea
                        className="reply-textarea"
                        placeholder="Write your email response here..."
                        value={replyText}
                        onChange={e => setReplyText(e.target.value)}
                        required
                      />
                      <button type="submit" className="btn-reply" disabled={submittingReply}>
                        <Reply size={14} />
                        {submittingReply ? "Sending..." : "Send Reply"}
                      </button>
                    </form>
                  )}
                </>
              ) : (
                <div style={{ margin: "auto", textAlign: "center", color: "#aaa" }}>
                  <Mail size={48} strokeWidth={1} style={{ marginBottom: "1rem", color: GOLD }} />
                  <p>Select an inquiry from the inbox to read details and reply.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
