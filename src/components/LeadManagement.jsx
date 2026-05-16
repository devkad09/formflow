import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import './LeadManagement.css';
import { ChevronDown, Trash2, MessageSquare, Clock, TrendingUp } from 'lucide-react';

export default function LeadManagement({ formId }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [notes, setNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (formId) {
      fetchLeads();
    }
  }, [formId]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      // In real app, fetch from Supabase
      setLeads([
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          status: 'new',
          notes: '',
          followUpDate: null,
          submittedAt: new Date().toISOString(),
          data: { phone: '555-1234', message: 'Interested in demo' }
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          status: 'contacted',
          notes: 'Sent proposal on May 15',
          followUpDate: '2026-05-23',
          submittedAt: new Date(Date.now() - 86400000).toISOString(),
          data: { phone: '555-5678', message: 'Need pricing info' }
        },
        {
          id: 3,
          name: 'Bob Wilson',
          email: 'bob@example.com',
          status: 'converted',
          notes: 'Closed deal on May 14 - Premium plan',
          followUpDate: null,
          submittedAt: new Date(Date.now() - 172800000).toISOString(),
          data: { phone: '555-9012', message: 'Ready to sign' }
        }
      ]);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId, newStatus) => {
    setLeads(leads.map(lead =>
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
  };

  const updateLeadNote = async (leadId, note) => {
    setLeads(leads.map(lead =>
      lead.id === leadId ? { ...lead, notes: note } : lead
    ));
  };

  const openLeadDetail = (lead) => {
    setSelectedLead(lead);
    setNotes(lead.notes);
    setFollowUpDate(lead.followUpDate || '');
    setShowModal(true);
  };

  const saveLead = () => {
    if (selectedLead) {
      updateLeadNote(selectedLead.id, notes);
      setLeads(leads.map(lead =>
        lead.id === selectedLead.id
          ? { ...lead, notes, followUpDate }
          : lead
      ));
      setShowModal(false);
    }
  };

  const deleteLead = async (leadId) => {
    setLeads(leads.filter(lead => lead.id !== leadId));
  };

  const exportAsCSV = () => {
    const headers = ['Name', 'Email', 'Status', 'Submitted', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...leads.map(lead =>
        [
          lead.name,
          lead.email,
          lead.status,
          new Date(lead.submittedAt).toLocaleDateString(),
          `"${lead.notes}"`
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getStats = () => {
    const total = leads.length;
    const converted = leads.filter(l => l.status === 'converted').length;
    const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : 0;

    return { total, converted, conversionRate };
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = getStats();

  if (loading) {
    return <div className="lead-management"><p>Loading leads...</p></div>;
  }

  return (
    <div className="lead-management">
      {/* Stats Overview */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">
            <MessageSquare size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Leads</p>
            <p className="stat-value">{stats.total}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Conversion Rate</p>
            <p className="stat-value">{stats.conversionRate}%</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Converted</p>
            <p className="stat-value">{stats.converted}</p>
          </div>
        </div>
      </div>

      {/* Filters and Export */}
      <div className="lead-controls">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
          </select>
        </div>
        <button onClick={exportAsCSV} className="export-btn">
          📥 Export as CSV
        </button>
      </div>

      {/* Leads Table */}
      <div className="leads-table-container">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Submitted</th>
              <th>Follow-up</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map(lead => (
              <tr key={lead.id} className={`lead-row lead-${lead.status}`}>
                <td className="lead-name">{lead.name}</td>
                <td>{lead.email}</td>
                <td>
                  <select
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                  </select>
                </td>
                <td>{new Date(lead.submittedAt).toLocaleDateString()}</td>
                <td>
                  {lead.followUpDate ? (
                    <span className="followup-date">{lead.followUpDate}</span>
                  ) : (
                    <span className="no-followup">-</span>
                  )}
                </td>
                <td className="actions-cell">
                  <button
                    onClick={() => openLeadDetail(lead)}
                    title="Edit"
                    className="action-btn edit-btn"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => deleteLead(lead.id)}
                    title="Delete"
                    className="action-btn delete-btn"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lead Detail Modal */}
      {showModal && selectedLead && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Lead: {selectedLead.name}</h3>
              <button onClick={() => setShowModal(false)} className="close-btn">
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="lead-info">
                <p><strong>Email:</strong> {selectedLead.email}</p>
                <p><strong>Submitted:</strong> {new Date(selectedLead.submittedAt).toLocaleDateString()}</p>
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add private notes about this lead..."
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>Follow-up Date</label>
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                />
              </div>

              <div className="lead-data">
                <h4>Submission Data</h4>
                <div className="data-display">
                  {Object.entries(selectedLead.data).map(([key, value]) => (
                    <div key={key} className="data-item">
                      <span className="data-label">{key}:</span>
                      <span className="data-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowModal(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={saveLead} className="btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
