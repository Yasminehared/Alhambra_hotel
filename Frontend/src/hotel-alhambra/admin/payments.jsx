import React, { useState, useEffect } from "react";
import axios from "axios";

const GOLD = "#b8965a";
const DARK = "#1a1208";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/payments");
      setPayments(res.data);
    } catch (err) {
      console.error("Error fetching payments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const totalAmount = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);

  const filtered = payments.filter(p => {
    const term = search.toLowerCase();
    const ref = p.transaction_reference ? p.transaction_reference.toLowerCase() : "";
    const method = p.payment_method ? p.payment_method.toLowerCase() : "";
    const notes = p.notes ? p.notes.toLowerCase() : "";
    const guest = p.reservation?.customer ? `${p.reservation.customer.first_name} ${p.reservation.customer.last_name}`.toLowerCase() : "";
    return ref.includes(term) || method.includes(term) || notes.includes(term) || guest.includes(term);
  });

  return (
    <>
      <style>{`
        body { font-family: 'Jost', sans-serif; background: #f4efe6; color: ${DARK}; margin: 0; }
        .page-wrap { padding: 2rem; }
        .header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .header-title h1 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 400; margin: 0; }
        .header-title p { font-size: 0.8rem; color: #888; margin: 4px 0 0; }
        .search-input { padding: 10px 16px; border: 1px solid #e5ddd2; border-radius: 4px; background: white; outline: none; width: 260px; font-family: inherit; }
        .search-input:focus { border-color: ${GOLD}; }
        
        .kpi-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
        .kpi-card { background: white; border: 1px solid rgba(184,150,90,0.15); border-radius: 8px; padding: 1.5rem; }
        .kpi-val { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; color: ${DARK}; margin-bottom: 4px; }
        .kpi-label { font-size: 0.7rem; color: #aaa; text-transform: uppercase; letter-spacing: 0.1em; }
        
        .table-wrap { background: white; border: 1px solid rgba(184,150,90,0.15); border-radius: 8px; overflow: hidden; }
        table { width: 100%; border-collapse: collapse; text-align: left; }
        th { background: #faf8f5; padding: 16px 20px; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #888; border-bottom: 1px solid #e5ddd2; }
        td { padding: 16px 20px; font-size: 0.85rem; border-bottom: 1px solid #f0eae1; color: #444; }
        tr:hover td { background: #fdfcfa; }
        
        .badge { padding: 4px 10px; border-radius: 4px; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block; }
        .badge.paid { background: rgba(22,163,74,0.1); color: #16a34a; }
        .badge.partial { background: rgba(217,119,6,0.1); color: #d97706; }
        .badge.unpaid { background: rgba(220,38,38,0.1); color: #dc2626; }
        .badge.refunded { background: rgba(107,114,128,0.1); color: #6b7280; }
        
        .empty-state { text-align: center; padding: 4rem; color: #aaa; }
      `}</style>

      <div className="page-wrap">
        <div className="header-row">
          <div className="header-title">
            <h1>Finance & Payments Ledger</h1>
            <p>Real-time transaction history from hotel records</p>
          </div>
          <input
            className="search-input"
            placeholder="Search reference, guest, method..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="kpi-cards">
          <div className="kpi-card">
            <div className="kpi-val">MAD {totalAmount.toLocaleString()}</div>
            <div className="kpi-label">Total Revenue Collected</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-val">{payments.length}</div>
            <div className="kpi-label">Total Transactions</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-val">MAD {(totalAmount / Math.max(1, payments.length)).toFixed(0)}</div>
            <div className="kpi-label">Average Transaction Value</div>
          </div>
        </div>

        {loading ? (
          <div className="table-wrap" style={{ padding: "2rem", textAlign: "center" }}>Loading payments history...</div>
        ) : (
          <div className="table-wrap">
            {filtered.length === 0 ? (
              <div className="empty-state">No transactions match your search.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Ref</th>
                    <th>Reservation</th>
                    <th>Guest</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => {
                    const status = p.payment_status || "paid";
                    return (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 600, color: DARK }}>{p.transaction_reference}</td>
                        <td>{p.reservation?.reference || `RES-${p.reservation_id}`}</td>
                        <td>
                          {p.reservation?.customer 
                            ? `${p.reservation.customer.first_name} ${p.reservation.customer.last_name}`
                            : "Guest"}
                        </td>
                        <td style={{ textTransform: "capitalize" }}>{p.payment_method}</td>
                        <td>
                          <span className={`badge ${status}`}>{status}</span>
                        </td>
                        <td>{p.paid_at ? new Date(p.paid_at).toLocaleDateString() : new Date(p.created_at).toLocaleDateString()}</td>
                        <td style={{ fontWeight: 600, color: GOLD }}>MAD {parseFloat(p.amount).toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </>
  );
}
