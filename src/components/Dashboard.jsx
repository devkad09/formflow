import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Folder, 
  FileText, 
  CreditCard, 
  LogOut, 
  File, 
  ClipboardList, 
  Link as LinkIcon, 
  Plus, 
  Check,
  X,
  TrendingUp,
  MoreVertical,
  Receipt,
  ChevronLeft,
  Settings,
  Circle,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout, userForms, addForm } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newFormName, setNewFormName] = useState('');
  const [selectedForm, setSelectedForm] = useState(null);
  const [formTab, setFormTab] = useState('overview');
  const [quickStartTab, setQuickStartTab] = useState('preview');
  const [openSnippet, setOpenSnippet] = useState(null);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here later
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const name = newFormName.trim() || 'New Form';
    const date = new Date().toLocaleDateString('en-GB');
    addForm({ name, date, submissions: 0, status: 'Active' });
    setNewFormName('');
    setShowCreateModal(false);
    navigate('/builder');
  };

  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <header className="dashboard-topbar">
        <div className="topbar-logo" onClick={() => navigate('/')}>
          <div className="topbar-logo-icon">
            <div className="lines"></div>
          </div>
          <span className="topbar-brand">FormFlow</span>
        </div>
        <div className="topbar-right">
          <div className="topbar-avatar">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kelvin" alt="Avatar" />
          </div>
        </div>
      </header>

      <div className="dashboard-body">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-profile">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kelvin" alt="Profile" className="sidebar-avatar" />
            <div className="sidebar-user-info">
              <span className="sidebar-name">KELVIN DJAYOURI</span>
              <span className="sidebar-email">kelvinatsu213@gmail.com</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            <button className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
              <Folder size={18} /> Dashboard
            </button>
            <button className={`nav-item ${activeTab === 'forms' ? 'active' : ''}`} onClick={() => setActiveTab('forms')}>
              <FileText size={18} /> Forms
            </button>
            <button className={`nav-item ${activeTab === 'billing' ? 'active' : ''}`} onClick={() => setActiveTab('billing')}>
              <CreditCard size={18} /> Billing
            </button>
          </nav>

          <div className="sidebar-footer">
            <button className="signout-btn" onClick={handleLogout}>
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </aside>

        <main className="dashboard-main">
          <div className="dashboard-content-wrapper">
            
            {selectedForm ? (
               <div className="form-details-view">
                 <div className="fdc-header">
                   <button className="btn-back-link" onClick={() => { setSelectedForm(null); setFormTab('overview'); }}>
                     <ChevronLeft size={16}/> Back to Forms
                   </button>
                   <h1>{selectedForm.name || 'kaddev'}</h1>
                    <div className="fdc-tabs">
                      <button className={`fdc-tab ${formTab === 'overview' ? 'active' : ''}`} onClick={() => setFormTab('overview')}><Folder size={14}/> Overview</button>
                      <button className={`fdc-tab ${formTab === 'submissions' ? 'active' : ''}`} onClick={() => setFormTab('submissions')}><FileText size={14}/> Submissions</button>
                      <button className={`fdc-tab ${formTab === 'integrations' ? 'active' : ''}`} onClick={() => setFormTab('integrations')}><LinkIcon size={14}/> Integrations</button>
                      <button className={`fdc-tab ${formTab === 'settings' ? 'active' : ''}`} onClick={() => setFormTab('settings')}><Settings size={14}/> Settings</button>
                   </div>
                 </div>
                 
                 <div className="fdc-content">
                    {formTab === 'overview' && (
                      <>
                        <div className="fdc-card">
                           <h3>Form Builder</h3>
                           <p>Build your form with drag-and-drop. Share a link instantly; no coding needed.</p>
                           <button className="btn-dark-create" onClick={() => navigate('/builder')} style={{marginTop: '16px'}}>
                             Open Builder &rarr;
                           </button>
                        </div>

                        <div className="fdc-card">
                           <h3>Quick Start Checklist</h3>
                           <p>Get your form live and collecting submissions in minutes.</p>
                           <ul className="checklist">
                             <li className="checklist-item done"><Check size={18} /> <span>Form Created</span></li>
                             <li className="checklist-item"><Circle size={18} /> <span>Copy a Template or HTML Snippet</span></li>
                             <li className="checklist-item"><Circle size={18} /> <span>Add Form to Live Website</span></li>
                             <li className="checklist-item"><Circle size={18} /> <span>Receive First Submission</span></li>
                           </ul>
                        </div>

                        <div className="fdc-card stats-card">
                           <h3>Form Statistics</h3>
                           <div className="fdc-stats-grid">
                              <div className="fdc-stat"><h2>{selectedForm.submissions || 0}</h2><span>Total Submissions</span></div>
                              <div className="fdc-stat"><h2>0</h2><span>This Week</span></div>
                              <div className="fdc-stat"><h2>0.0%</h2><span>Spam Rate</span></div>
                              <div className="fdc-stat"><h2>{selectedForm.date ? 'N/A' : 'N/A'}</h2><span>Created</span></div>
                           </div>
                        </div>

                        {/* Additional Cards per UX design */}
                        
                        <div className="fdc-card" style={{padding: '0', overflow: 'hidden'}}>
                           <div style={{padding: '24px', borderBottom: '1px solid #e5e7eb'}}>
                             <div style={{background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '6px', padding: '12px 16px', marginBottom: '24px', fontSize: '0.9rem', color: '#92400e'}}>
                               Most customers using this template hit 50+ submissions during internship campaigns.
                             </div>
                             <h3 style={{fontSize: '1.2rem', margin: '0 0 8px'}}>Quick Start Template</h3>
                             <p style={{fontWeight: '600', color: '#111827', margin: '0 0 4px'}}>Popular: Internship / Job Application Form</p>
                             <p style={{color: '#6b7280', fontSize: '0.9rem', margin: '0 0 24px'}}>Running a hiring or internship campaign? Use this ready-made application template with resume upload and spam protection.</p>
                             <div style={{display: 'flex', gap: '12px'}}>
                               <button className="btn-bhi-dark">Copy HTML Code</button>
                               <button className="btn-bhi-outline">Download .html File</button>
                             </div>
                           </div>
                           
                           <div style={{background: '#f9fafb', padding: '0 24px 24px'}}>
                             <div style={{display: 'flex', gap: '24px', borderBottom: '1px solid #e5e7eb', paddingTop: '16px'}}>
                               <span 
                                 onClick={() => setQuickStartTab('preview')}
                                 style={{paddingBottom: '12px', borderBottom: `2px solid ${quickStartTab === 'preview' ? '#111827' : 'transparent'}`, fontWeight: quickStartTab === 'preview' ? '600' : '400', color: quickStartTab === 'preview' ? '#111827' : '#6b7280', fontSize: '0.9rem', cursor: 'pointer'}}
                               >Preview</span>
                               <span 
                                 onClick={() => setQuickStartTab('code')}
                                 style={{paddingBottom: '12px', borderBottom: `2px solid ${quickStartTab === 'code' ? '#111827' : 'transparent'}`, fontWeight: quickStartTab === 'code' ? '600' : '400', color: quickStartTab === 'code' ? '#111827' : '#6b7280', fontSize: '0.9rem', cursor: 'pointer'}}
                               >Code</span>
                             </div>
                             
                             <div style={{background: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb', margin: '24px 0 0', padding: '32px'}}>
                               {quickStartTab === 'preview' ? (
                                 <>
                                   <h2 style={{fontSize: '1.5rem', margin: '0 0 8px', fontWeight: '700', color: '#111827'}}>Senior Product Designer</h2>
                                   <p style={{color: '#6b7280', fontSize: '0.9rem', margin: '0 0 32px'}}>Design &middot; San Francisco, CA &middot; Full-time</p>
                                   
                                   <div style={{display: 'flex', gap: '24px', borderBottom: '1px solid #e5e7eb', marginBottom: '24px'}}>
                                     <span style={{paddingBottom: '12px', borderBottom: '2px solid #3b82f6', color: '#3b82f6', fontWeight: '500', fontSize: '0.9rem'}}>Job Description</span>
                                     <span style={{paddingBottom: '12px', color: '#6b7280', fontSize: '0.9rem'}}>Apply</span>
                                   </div>
                                   
                                   <div>
                                     <h4 style={{fontSize: '1.05rem', margin: '0 0 12px', fontWeight: '700', color: '#111827'}}>About the role</h4>
                                     <p style={{color: '#4b5563', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px'}}>We're looking for a Senior Product Designer to help shape the future of our product. You'll work closely with engineering and product to deliver intuitive, beautiful experiences that our customers love.</p>
                                     <h4 style={{fontSize: '1.05rem', margin: '0 0 12px', fontWeight: '700', color: '#111827'}}>What you'll do</h4>
                                     <ul style={{color: '#4b5563', fontSize: '0.95rem', lineHeight: '1.6', paddingLeft: '20px', margin: '0'}}>
                                       <li style={{marginBottom: '8px'}}>Lead design for core product areas from discovery to launch</li>
                                       <li>Create wireframes, prototypes, and high-fidelity designs</li>
                                     </ul>
                                   </div>
                                 </>
                               ) : (
                                 <pre style={{background: '#f8fafc', padding: '16px', borderRadius: '6px', fontSize: '0.85rem', color: '#334155', overflowX: 'auto', margin: 0}}>
{`<!-- FormFlow Application Code -->
<form action="https://formflow.dev/api/f/${selectedForm?.id || '2qc65suj'}" method="POST">
  <div>
    <label>Name</label>
    <input type="text" name="name" required />
  </div>
  <div>
    <label>Email</label>
    <input type="email" name="email" required />
  </div>
  <button type="submit">Submit Application</button>
</form>`}
                                 </pre>
                               )}
                             </div>
                           </div>
                        </div>

                        <div className="fdc-card">
                           <h3 style={{fontSize: '1.1rem', margin: '0 0 8px'}}>Endpoint Information</h3>
                           <p style={{color: '#6b7280', fontSize: '0.9rem', margin: '0 0 24px'}}>Use this endpoint in any HTML form.</p>
                           
                           <div className="form-group" style={{marginBottom: '20px'}}>
                             <label style={{display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '8px'}}>Endpoint URL</label>
                             <div style={{display: 'flex', gap: '12px'}}>
                               <input type="text" value={`https://formflow.dev/api/f/${selectedForm?.id || '2qc65suj'}`} readOnly style={{flex: 1, padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '0.95rem', color: '#4b5563', background: '#fdfdfd'}} />
                               <button className="btn-bhi-dark" onClick={() => handleCopy(`https://formflow.dev/api/f/${selectedForm?.id || '2qc65suj'}`)}>Copy</button>
                             </div>
                           </div>
                           
                           <div className="form-group">
                             <label style={{display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '8px'}}>Form ID</label>
                             <div style={{display: 'flex', gap: '12px'}}>
                               <input type="text" value={selectedForm?.id || '89c11e88-e4a2-44e1-a74e-83ac6f3751c1'} readOnly style={{flex: 1, padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '0.95rem', color: '#4b5563', background: '#fdfdfd'}} />
                               <button className="btn-bhi-dark" onClick={() => handleCopy(selectedForm?.id || '89c11e88-e4a2-44e1-a74e-83ac6f3751c1')}>Copy</button>
                             </div>
                           </div>
                        </div>

                        <div className="fdc-card">
                           <h3 style={{fontSize: '1.1rem', margin: '0 0 8px'}}>Code Snippets</h3>
                           <p style={{color: '#6b7280', fontSize: '0.9rem', margin: '0 0 16px'}}>Expand the option you need. Copy and paste into your site.</p>
                           
                           <div style={{display: 'flex', flexDirection: 'column'}}>
                             {/* Embed widget */}
                             <div style={{padding: '16px 0', borderBottom: '1px solid #e5e7eb'}}>
                               <div onClick={() => setOpenSnippet(openSnippet === 'embed' ? null : 'embed')} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '600', color: '#111827', fontSize: '0.95rem'}}>
                                 <span style={{fontSize: '0.6rem', transform: openSnippet === 'embed' ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s'}}>▶</span> Embed widget
                               </div>
                               {openSnippet === 'embed' && <div style={{marginTop: '16px', background: '#f1f5f9', padding: '16px', borderRadius: '6px', fontSize: '0.85rem', color: '#475569'}}>&lt;script src="https://formflow.dev/embed.js"&gt;&lt;/script&gt;</div>}
                             </div>
                             
                             {/* Basic HTML */}
                             <div style={{padding: '16px 0', borderBottom: '1px solid #e5e7eb'}}>
                               <div onClick={() => setOpenSnippet(openSnippet === 'basic' ? null : 'basic')} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '600', color: '#111827', fontSize: '0.95rem'}}>
                                 <span style={{fontSize: '0.6rem', transform: openSnippet === 'basic' ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s'}}>▶</span> Basic HTML Snippet
                               </div>
                               {openSnippet === 'basic' && <div style={{marginTop: '16px', background: '#f1f5f9', padding: '16px', borderRadius: '6px', fontSize: '0.85rem', color: '#475569'}}>&lt;form action="https://formflow.dev/api/f/xyz" method="POST"&gt;...&lt;/form&gt;</div>}
                             </div>
                             
                             {/* Async JS */}
                             <div style={{padding: '16px 0', borderBottom: '1px solid #e5e7eb'}}>
                               <div onClick={() => setOpenSnippet(openSnippet === 'async' ? null : 'async')} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '600', color: '#111827', fontSize: '0.95rem'}}>
                                 <span style={{fontSize: '0.6rem', transform: openSnippet === 'async' ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s'}}>▶</span> Async JavaScript Version
                               </div>
                               {openSnippet === 'async' && <div style={{marginTop: '16px', background: '#f1f5f9', padding: '16px', borderRadius: '6px', fontSize: '0.85rem', color: '#475569'}}>fetch('https://formflow.dev/api/f/...', &#123; method: 'POST' &#125;)</div>}
                             </div>
                             
                             {/* File Upload Example */}
                             <div style={{padding: '16px 0 0'}}>
                               <div onClick={() => setOpenSnippet(openSnippet === 'file' ? null : 'file')} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '600', color: '#111827', fontSize: '0.95rem'}}>
                                 <span style={{fontSize: '0.6rem', transform: openSnippet === 'file' ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s'}}>▶</span> File Upload Example
                               </div>
                               {openSnippet === 'file' && <div style={{marginTop: '16px', background: '#f1f5f9', padding: '16px', borderRadius: '6px', fontSize: '0.85rem', color: '#475569'}}>&lt;input type="file" name="resume" /&gt;</div>}
                             </div>
                           </div>
                        </div>
                      </>
                    )}

                    {formTab === 'submissions' && (
                      <div className="fdc-card" style={{padding: '0'}}>
                        <div style={{padding: '24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                          <div>
                            <h3 style={{margin: '0 0 8px'}}>Lead Pipeline</h3>
                            <p style={{margin: '0', color: '#6b7280', fontSize: '0.9rem'}}>Manage your submissions, add notes, and set follow-ups.</p>
                          </div>
                          <button className="btn-bhi-outline"><FileText size={16}/> Export CSV</button>
                        </div>
                        
                        <div className="submissions-table-wrap">
                           <table className="submissions-table" style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem'}}>
                             <thead>
                               <tr style={{background: '#f9fafb', borderBottom: '1px solid #e5e7eb', color: '#4b5563'}}>
                                 <th style={{padding: '12px 24px', fontWeight: '600'}}>Lead / Contact</th>
                                 <th style={{padding: '12px 24px', fontWeight: '600'}}>Date</th>
                                 <th style={{padding: '12px 24px', fontWeight: '600'}}>Status</th>
                                 <th style={{padding: '12px 24px', fontWeight: '600'}}>Follow-up / Notes</th>
                               </tr>
                             </thead>
                             <tbody>
                               {/* Mock Lead 1 */}
                               <tr style={{borderBottom: '1px solid #f3f4f6'}}>
                                 <td style={{padding: '16px 24px'}}>
                                   <div style={{fontWeight: '600', color: '#111827'}}>Alex Chen</div>
                                   <div style={{color: '#6b7280', fontSize: '0.85rem'}}>alex.chen@example.com</div>
                                 </td>
                                 <td style={{padding: '16px 24px', color: '#4b5563'}}>May 16, 2026</td>
                                 <td style={{padding: '16px 24px'}}>
                                    <select className="status-select new" style={{padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '0.8rem', fontWeight: '600', background: '#eff6ff', color: '#2563eb'}}>
                                      <option>New</option>
                                      <option>Contacted</option>
                                      <option>Converted</option>
                                    </select>
                                 </td>
                                 <td style={{padding: '16px 24px'}}>
                                    <button className="btn-text" style={{marginRight: '12px'}}>+ Add Note</button>
                                    <button className="btn-text" style={{color: '#8b5cf6'}}>Set Reminder</button>
                                 </td>
                               </tr>
                               {/* Mock Lead 2 */}
                               <tr style={{borderBottom: '1px solid #f3f4f6'}}>
                                 <td style={{padding: '16px 24px'}}>
                                   <div style={{fontWeight: '600', color: '#111827'}}>Sarah Jenkins</div>
                                   <div style={{color: '#6b7280', fontSize: '0.85rem'}}>sarah@techflow.io</div>
                                 </td>
                                 <td style={{padding: '16px 24px', color: '#4b5563'}}>May 15, 2026</td>
                                 <td style={{padding: '16px 24px'}}>
                                    <select className="status-select contacted" defaultValue="Contacted" style={{padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '0.8rem', fontWeight: '600', background: '#fef3c7', color: '#d97706'}}>
                                      <option>New</option>
                                      <option value="Contacted">Contacted</option>
                                      <option>Converted</option>
                                    </select>
                                 </td>
                                 <td style={{padding: '16px 24px'}}>
                                    <div style={{fontSize: '0.8rem', color: '#6b7280', marginBottom: '4px'}}>Follow up: Tomorrow</div>
                                    <div style={{fontSize: '0.85rem', color: '#111827'}}><em>"Requested premium pricing"</em></div>
                                 </td>
                               </tr>
                             </tbody>
                           </table>
                        </div>
                      </div>
                    )}

                    {formTab === 'integrations' && (
                      <div className="fdc-card">
                        <h3>Integrations & Workflows</h3>
                        <p style={{marginTop: '8px', color: '#6b7280', marginBottom: '24px'}}>Connect your form to your favorite tools. Every submission can trigger an action instantly.</p>
                        
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                          <div style={{border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                             <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                               <div style={{width: '40px', height: '40px', background: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><LinkIcon size={20} color="#10b981"/></div>
                               <div>
                                 <h4 style={{margin: '0 0 4px', fontSize: '0.95rem'}}>Google Sheets</h4>
                                 <span style={{fontSize: '0.8rem', color: '#6b7280'}}>Sync leads instantly</span>
                               </div>
                             </div>
                             <button className="btn-bhi-outline">Connect</button>
                          </div>
                          
                          <div style={{border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                             <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                               <div style={{width: '40px', height: '40px', background: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Zap size={20} color="#eab308"/></div>
                               <div>
                                 <h4 style={{margin: '0 0 4px', fontSize: '0.95rem'}}>Zapier</h4>
                                 <span style={{fontSize: '0.8rem', color: '#6b7280'}}>Automate workflows</span>
                               </div>
                             </div>
                             <button className="btn-bhi-outline">Connect</button>
                          </div>

                          <div style={{border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                             <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                               <div style={{width: '40px', height: '40px', background: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><LinkIcon size={20} color="#3b82f6"/></div>
                               <div>
                                 <h4 style={{margin: '0 0 4px', fontSize: '0.95rem'}}>Webhooks</h4>
                                 <span style={{fontSize: '0.8rem', color: '#6b7280'}}>Send JSON data</span>
                               </div>
                             </div>
                             <button className="btn-bhi-outline">Configure</button>
                          </div>

                          <div style={{border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                             <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                               <div style={{width: '40px', height: '40px', background: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>📧</div>
                               <div>
                                 <h4 style={{margin: '0 0 4px', fontSize: '0.95rem'}}>Auto-responder</h4>
                                 <span style={{fontSize: '0.8rem', color: '#6b7280'}}>Email the submitter</span>
                               </div>
                             </div>
                             <button className="btn-bhi-dark">Upgrade</button>
                          </div>
                        </div>
                      </div>
                    )}

                    {formTab === 'settings' && (
                      <div className="fdc-card">
                        <h3>Form Settings</h3>
                        <div className="form-group" style={{marginTop: '24px'}}>
                          <label style={{display: 'block', marginBottom: '8px', fontWeight: '500'}}>Form Name</label>
                          <input type="text" value={selectedForm.name || ''} readOnly className="setting-input" style={{maxWidth: '400px'}} />
                        </div>
                        <div className="form-group" style={{marginTop: '20px'}}>
                          <label style={{display: 'block', marginBottom: '8px', fontWeight: '500'}}>Form Status</label>
                          <select className="setting-input" style={{maxWidth: '200px'}}>
                            <option>Active</option>
                            <option>Draft</option>
                            <option>Archived</option>
                          </select>
                        </div>
                        <button className="btn-delete-field" style={{maxWidth: '200px', marginTop: '32px'}}>
                           Archive Form
                        </button>
                      </div>
                    )}
                 </div>
               </div>
            ) : (
              <>
                {activeTab === 'dashboard' && (
              <>
                <div className="dashboard-header">
                  <h1>Dashboard Overview</h1>
                  <p>Welcome back! Here's what's happening with your forms.</p>
                  <div className={`plan-badge ${plan.toLowerCase()}`}>
                    <BadgeCheck size={14} /> {plan} Plan
                  </div>
                </div>

                <div className="stats-grid">
                  {/* Stat Card 1 */}
                  <div className="stat-card">
                    <div className="stat-info">
                      <span className="stat-label">Total Forms Created</span>
                      <span className="stat-value">{userForms.length}</span>
                      {userForms.length > 0 && (
                        <span className="stat-trend"><TrendingUp size={14}/> All time</span>
                      )}
                    </div>
                    <div className="stat-icon-wrapper">
                      <File size={20} />
                    </div>
                  </div>

                  {/* Stat Card 2 */}
                  <div className="stat-card">
                    <div className="stat-info">
                      <span className="stat-label">Submissions Received Today</span>
                      <span className="stat-value">0</span>
                    </div>
                    <div className="stat-icon-wrapper">
                      <ClipboardList size={20} />
                    </div>
                  </div>

                  {/* Stat Card 3 */}
                  <div className="stat-card">
                    <div className="stat-info">
                      <span className="stat-label">Active Endpoints</span>
                      <span className="stat-value">{userForms.length}</span>
                      {userForms.length > 0 && (
                        <span className="stat-trend"><TrendingUp size={14}/> Live</span>
                      )}
                    </div>
                    <div className="stat-icon-wrapper">
                      <LinkIcon size={20} />
                    </div>
                  </div>
                </div>

                <div className="recent-forms-section">
                  <div className="recent-forms-header">
                    <h2>Recent Forms</h2>
                    <a href="#all" className="view-all-link" onClick={(e) => { e.preventDefault(); setActiveTab('forms'); }}>View all forms &rarr;</a>
                  </div>

                  <div className="recent-forms-box">
                    <div className="recent-forms-header-inner">
                      <h3>Recent Forms</h3>
                      <p>Your latest form configurations</p>
                    </div>
                    
                    {userForms.length === 0 ? (
                      <div className="empty-state">
                        <div className="empty-icon-wrapper">
                          <FileText size={24} />
                        </div>
                        <h4>No forms created yet</h4>
                        <p>Create your first form to get started</p>
                        <button className="btn-dark-create" onClick={() => setShowCreateModal(true)}>
                          <Plus size={16} /> Create New Form
                        </button>
                      </div>
                    ) : (
                      <div className="populated-state">
                        {userForms.map((form) => (
                          <div key={form.id} className="recent-form-item" onClick={() => setSelectedForm(form)}>
                            <div className="rfi-left">
                               <div className="rfi-icon"><FileText size={16}/></div>
                               <div className="rfi-details">
                                 <h4>{form.name}</h4>
                                 <span>Created {form.date}</span>
                               </div>
                            </div>
                            <div className="rfi-right">
                               <div className="rfi-stats">
                                 <span className="rfi-count">{form.submissions}</span>
                                 <span className="rfi-label">submissions</span>
                               </div>
                               <span className="rfi-status">Active</span>
                               <button className="rfi-menu" onClick={(e) => e.stopPropagation()}><MoreVertical size={16}/></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {userForms.length > 0 && (
                     <div className="dashboard-bottom-action">
                       <button className="btn-dark-create" onClick={() => setShowCreateModal(true)}>
                         <Plus size={16} /> Create New Form
                       </button>
                     </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'forms' && (
              <>
                <div className="dashboard-header">
                  <h1>My Forms</h1>
                  <p>Manage and organize your forms.</p>
                </div>
                <div className="forms-list-container">
                   <button className="btn-dark-create" onClick={() => setShowCreateModal(true)} style={{marginBottom: '24px'}}>
                      <Plus size={16} /> Create New Form
                   </button>
                   <div className="forms-list">
                      {userForms.length === 0 ? (
                        <div className="empty-state-card">
                           <FileText size={40} color="#e5e7eb" />
                           <p>You haven't created any forms yet.</p>
                        </div>
                      ) : (
                        userForms.map((f, i) => (
                          <div key={i} className="form-list-item" onClick={() => setSelectedForm(f)}>
                             <div className="fli-left">
                                <FileText size={20} color="#9ca3af" />
                                <div className="fli-info">
                                  <h4>{f.name}</h4>
                                  <span>Updated {f.date}</span>
                                </div>
                             </div>
                             <div className="fli-right">
                                <span className="fli-resp">{f.submissions} Responses</span>
                                <span className="fli-status">{f.status || 'Active'}</span>
                             </div>
                          </div>
                        ))
                      )}
                   </div>
                </div>
              </>
            )}

              </>
            )}

            {activeTab === 'billing' && (
              <>
                <div className="dashboard-header">
                  <h1>Billing Overview</h1>
                  <p>Manage your billing, subscription plan, and payment methods.</p>
                </div>

                <div className="billing-grid">
                  <div className="billing-left">
                     <div className="settings-card">
                       <div className="settings-card-header">
                         <h3>Current Plan</h3>
                         <span className={`plan-badge-green ${plan.toLowerCase()}`}>{plan}</span>
                       </div>
                       <div className="plan-details-box">
                         <div className="plan-details-top">
                           <div>
                             <h4>{plan} Plan</h4>
                             <p>{plan === 'Free' ? 'Basic form features and standard limits.' : 'Professional features for growing teams.'}</p>
                           </div>
                           <div className="plan-price">
                             <span className="price-amount">${plan === 'Free' ? '0' : (plan === 'Premium' ? '7' : '25')}</span>
                             <span className="price-interval">/mo</span>
                           </div>
                         </div>
                         <div className="plan-usage">
                           <div className="usage-header">
                             <span>Form Submissions</span>
                             <span>{plan === 'Free' ? '82' : '142'} / {plan === 'Free' ? '100' : (plan === 'Premium' ? '5,000' : 'Unlimited')}</span>
                           </div>
                           <div className="usage-progress-bar">
                             <div className="usage-fill" style={{width: plan === 'Free' ? '82%' : '2.8%'}}></div>
                           </div>
                           <p className="usage-reset">Resets on June 1st, 2026</p>
                         </div>
                       </div>
                       <div className="settings-card-footer" style={{padding: '24px', borderTop: '1px solid #e5e7eb', background: '#f9fafb'}}>
                         <button className="btn-dark-create" onClick={() => navigate('/')}>
                           {plan === 'Business' ? 'Manage Enterprise' : 'Change Plan'}
                         </button>
                       </div>
                     </div>

                     <div className="settings-card">
                       <div className="settings-card-header">
                         <h3>Billing History</h3>
                       </div>
                       <div className="billing-history-list">
                         {plan === 'Free' ? (
                           <div className="empty-state-small">
                              <Receipt size={24} color="#9ca3af" />
                              <h5>No billing history</h5>
                              <p>You haven't made any payments yet. Upgrade to see your invoices here.</p>
                           </div>
                         ) : (
                           <div className="invoice-list">
                             {[
                               { id: 'INV-001', date: 'May 16, 2026', amount: '$7.00', status: 'Paid' },
                             ].map((inv) => (
                               <div key={inv.id} className="invoice-item">
                                 <div className="inv-info">
                                   <strong>{inv.id}</strong>
                                   <span>{inv.date}</span>
                                 </div>
                                 <div className="inv-amount">{inv.amount}</div>
                                 <div className="inv-status"><Check size={14} /> {inv.status}</div>
                                 <button className="btn-download-inv">Download</button>
                               </div>
                             ))}
                           </div>
                         )}
                       </div>
                     </div>
                  </div>

                  <div className="billing-right">
                     <div className="settings-card">
                       <div className="settings-card-header">
                         <h3>Payment Method</h3>
                         {plan !== 'Free' && <button className="btn-text">Edit</button>}
                       </div>
                       <div className="payment-method-box">
                         {plan === 'Free' ? (
                           <div className="empty-state-small">
                              <CreditCard size={24} color="#9ca3af" />
                              <h5>No payment method</h5>
                              <p>Add a payment method to easily upgrade your plan.</p>
                           </div>
                         ) : (
                           <div className="active-card-view">
                              <div className="visa-card-mock">
                                <div className="visa-chip"></div>
                                <div className="visa-number">•••• •••• •••• 4242</div>
                                <div className="visa-bottom">
                                  <span>JANE DOE</span>
                                  <span>12/28</span>
                                </div>
                                <div className="visa-logo">VISA</div>
                              </div>
                              <p className="card-expiry-note">Mastercard ending in 4242</p>
                           </div>
                         )}
                       </div>
                     </div>

                     <div className="settings-card promo-card">
                        <Sparkles size={24} color="#6366f1" />
                        <h4>Refer a friend</h4>
                        <p>Get $10 credit for every friend who signs up for a paid plan.</p>
                        <button className="btn-outline-small">Get Referral Link</button>
                     </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Create Form Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Form</h3>
              <button className="close-modal-btn" onClick={() => setShowCreateModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Form Name <span>*</span></label>
                <input 
                  type="text" 
                  placeholder="e.g., Contact Form, Newsletter Signup" 
                  value={newFormName}
                  onChange={(e) => setNewFormName(e.target.value)}
                  autoFocus 
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Optional description for your form" rows="3"></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowCreateModal(false)}>Cancel</button>
              <button className="btn-create" onClick={handleCreateSubmit}>Create Form</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
