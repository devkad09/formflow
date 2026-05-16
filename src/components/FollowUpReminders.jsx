import { useState, useEffect } from 'react';
import { Clock, Bell, Trash2 } from 'lucide-react';
import './FollowUpReminders.css';

export default function FollowUpReminders() {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      leadName: 'Jane Smith',
      leadEmail: 'jane@example.com',
      date: '2026-05-23',
      time: '09:00',
      status: 'scheduled',
      notes: 'Sent proposal on May 15'
    },
    {
      id: 2,
      leadName: 'Mike Johnson',
      leadEmail: 'mike@example.com',
      date: '2026-05-20',
      time: '14:00',
      status: 'sent',
      notes: 'Follow up on demo feedback'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    leadName: '',
    leadEmail: '',
    date: '',
    time: '09:00',
    notes: ''
  });

  const upcomingReminders = reminders
    .filter(r => r.status === 'scheduled')
    .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

  const pastReminders = reminders.filter(r => r.status === 'sent');

  const handleAddReminder = (e) => {
    e.preventDefault();
    const newReminder = {
      id: Date.now(),
      ...formData,
      status: 'scheduled'
    };
    setReminders([...reminders, newReminder]);
    setFormData({
      leadName: '',
      leadEmail: '',
      date: '',
      time: '09:00',
      notes: ''
    });
    setShowForm(false);
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const completeReminder = (id) => {
    setReminders(reminders.map(r =>
      r.id === id ? { ...r, status: 'sent' } : r
    ));
  };

  const formatDateTime = (date, time) => {
    return new Date(`${date}T${time}`).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="followup-reminders">
      <div className="reminders-header">
        <div className="header-title">
          <Clock size={28} />
          <h2>Follow-up Reminders</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-add-reminder"
        >
          + New Reminder
        </button>
      </div>

      {showForm && (
        <div className="reminder-form">
          <h3>Schedule a Follow-up</h3>
          <form onSubmit={handleAddReminder}>
            <div className="form-group">
              <label>Lead Name *</label>
              <input
                type="text"
                value={formData.leadName}
                onChange={(e) => setFormData({ ...formData, leadName: e.target.value })}
                required
                placeholder="e.g., Jane Smith"
              />
            </div>

            <div className="form-group">
              <label>Lead Email *</label>
              <input
                type="email"
                value={formData.leadEmail}
                onChange={(e) => setFormData({ ...formData, leadEmail: e.target.value })}
                required
                placeholder="jane@example.com"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Time *</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add context for this follow-up..."
                rows="3"
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setShowForm(false)} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn-save">
                Schedule Reminder
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Upcoming Reminders */}
      <div className="reminders-section">
        <h3>Upcoming</h3>
        {upcomingReminders.length === 0 ? (
          <p className="empty-state">No upcoming reminders. Great job staying on top of leads!</p>
        ) : (
          <div className="reminders-list">
            {upcomingReminders.map(reminder => (
              <div key={reminder.id} className="reminder-card upcoming">
                <div className="reminder-icon">
                  <Bell size={24} />
                </div>
                <div className="reminder-content">
                  <p className="reminder-lead">{reminder.leadName}</p>
                  <p className="reminder-email">{reminder.leadEmail}</p>
                  <p className="reminder-datetime">
                    📅 {formatDateTime(reminder.date, reminder.time)}
                  </p>
                  {reminder.notes && (
                    <p className="reminder-notes">📝 {reminder.notes}</p>
                  )}
                </div>
                <div className="reminder-actions">
                  <button
                    onClick={() => completeReminder(reminder.id)}
                    className="btn-complete"
                    title="Mark as completed"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    className="btn-delete"
                    title="Delete"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Reminders */}
      {pastReminders.length > 0 && (
        <div className="reminders-section past">
          <h3>Sent Reminders</h3>
          <div className="reminders-list">
            {pastReminders.map(reminder => (
              <div key={reminder.id} className="reminder-card sent">
                <div className="reminder-icon">
                  <Bell size={24} />
                </div>
                <div className="reminder-content">
                  <p className="reminder-lead">{reminder.leadName}</p>
                  <p className="reminder-email">{reminder.leadEmail}</p>
                  <p className="reminder-datetime">
                    📅 {formatDateTime(reminder.date, reminder.time)}
                  </p>
                </div>
                <div className="reminder-status">
                  <span className="status-badge">Sent</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
