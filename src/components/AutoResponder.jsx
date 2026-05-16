import { useState } from 'react';
import { Mail, Settings, Eye } from 'lucide-react';
import './AutoResponder.css';

export default function AutoResponder() {
  const [autoResponders, setAutoResponders] = useState([
    {
      id: 1,
      formName: 'Contact Form',
      subject: 'We received your inquiry',
      isActive: true,
      bodyPreview: 'Thank you for reaching out to us. We will get back to you...',
      sentCount: 156
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedResponder, setSelectedResponder] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    formName: '',
    subject: '',
    fromName: 'FormFlow',
    body: ''
  });

  const handleAddResponder = (e) => {
    e.preventDefault();
    const newResponder = {
      id: Date.now(),
      ...formData,
      isActive: true,
      bodyPreview: formData.body.substring(0, 50) + '...',
      sentCount: 0
    };
    setAutoResponders([...autoResponders, newResponder]);
    setFormData({
      formName: '',
      subject: '',
      fromName: 'FormFlow',
      body: ''
    });
    setShowForm(false);
  };

  const toggleResponder = (id) => {
    setAutoResponders(autoResponders.map(r =>
      r.id === id ? { ...r, isActive: !r.isActive } : r
    ));
  };

  const deleteResponder = (id) => {
    setAutoResponders(autoResponders.filter(r => r.id !== id));
  };

  const previewResponder = (responder) => {
    setSelectedResponder(responder);
    setShowPreview(true);
  };

  return (
    <div className="auto-responder">
      <div className="responder-header">
        <div className="header-title">
          <Mail size={28} />
          <h2>Auto-Responder Emails</h2>
          <span className="badge">{autoResponders.length} Active</span>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-add-responder"
        >
          + New Auto-Responder
        </button>
      </div>

      {showForm && (
        <div className="responder-form">
          <h3>Create Auto-Responder Email</h3>
          <form onSubmit={handleAddResponder}>
            <div className="form-group">
              <label>Form Name *</label>
              <select
                value={formData.formName}
                onChange={(e) => setFormData({ ...formData, formName: e.target.value })}
                required
              >
                <option value="">Select a form...</option>
                <option value="Contact Form">Contact Form</option>
                <option value="Quote Request">Quote Request</option>
                <option value="Event Registration">Event Registration</option>
              </select>
            </div>

            <div className="form-group">
              <label>From Name *</label>
              <input
                type="text"
                value={formData.fromName}
                onChange={(e) => setFormData({ ...formData, fromName: e.target.value })}
                placeholder="Your Business Name"
                required
              />
            </div>

            <div className="form-group">
              <label>Subject Line *</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g., Thank you for your inquiry"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Body *</label>
              <textarea
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                placeholder="Write your auto-responder email here..."
                rows="8"
                required
              />
              <p className="helper-text">💡 Tip: Use {{name}}, {{email}}, {{date}} for dynamic content</p>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setShowForm(false)} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn-save">
                Create Auto-Responder
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Responders List */}
      <div className="responders-list">
        {autoResponders.length === 0 ? (
          <p className="empty-state">No auto-responders yet. Create one to send automatic replies!</p>
        ) : (
          autoResponders.map(responder => (
            <div key={responder.id} className={`responder-card ${responder.isActive ? 'active' : 'inactive'}`}>
              <div className="responder-main">
                <div className="responder-toggle">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={responder.isActive}
                      onChange={() => toggleResponder(responder.id)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="responder-content">
                  <p className="form-name">{responder.formName}</p>
                  <p className="subject">Subject: {responder.subject}</p>
                  <p className="preview">{responder.bodyPreview}</p>
                  <p className="sent-count">Sent: {responder.sentCount} times</p>
                </div>

                <div className="responder-actions">
                  <button
                    onClick={() => previewResponder(responder)}
                    title="Preview email"
                    className="btn-preview"
                  >
                    <Eye size={18} /> Preview
                  </button>
                  <button
                    onClick={() => deleteResponder(responder.id)}
                    title="Delete"
                    className="btn-delete"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && selectedResponder && (
        <div className="modal-overlay" onClick={() => setShowPreview(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Email Preview</h3>
              <button onClick={() => setShowPreview(false)} className="close-btn">
                ✕
              </button>
            </div>

            <div className="email-preview">
              <div className="email-meta">
                <p><strong>From:</strong> {selectedResponder.fromName}</p>
                <p><strong>Subject:</strong> {selectedResponder.subject}</p>
                <p><strong>Form:</strong> {selectedResponder.formName}</p>
              </div>

              <div className="email-body">
                <h4>Email Content</h4>
                <div className="body-text">
                  {selectedResponder.body.split('\n').map((line, i) => (
                    <p key={i}>{line || <br />}</p>
                  ))}
                </div>
              </div>

              <div className="modal-footer">
                <button onClick={() => setShowPreview(false)} className="btn-close">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
