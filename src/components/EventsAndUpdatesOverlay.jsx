import React, { useState, useEffect } from 'react';
import './EventsAndUpdatesOverlay.css';

/**
 * EventsAndUpdatesOverlay Component
 * Displays monthly events, upcoming updates, and player feedback options
 */

const EventsAndUpdatesOverlay = ({ isOpen, onClose, playerAge, currentEvent, onSubmitFeedback }) => {
  const [tab, setTab] = useState('events'); // 'events', 'updates', 'feedback'
  const [feedbackForm, setFeedbackForm] = useState({ type: 'bug', title: '', description: '', severity: 'low' });

  if (!isOpen) return null;

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitFeedback = () => {
    if (feedbackForm.title && feedbackForm.description) {
      onSubmitFeedback(feedbackForm);
      setFeedbackForm({ type: 'bug', title: '', description: '', severity: 'low' });
      setTab('events');
      alert('Thank you for your feedback! Our team will review it shortly.');
    }
  };

  return (
    <div className="events-updates-overlay">
      <div className="overlay-content">
        <button className="close-btn" onClick={onClose}>✕</button>

        <h1>Events & Updates</h1>

        <div className="tab-buttons">
          <button
            className={`tab-btn ${tab === 'events' ? 'active' : ''}`}
            onClick={() => setTab('events')}
          >
            🎉 Events
          </button>
          <button
            className={`tab-btn ${tab === 'updates' ? 'active' : ''}`}
            onClick={() => setTab('updates')}
          >
            📰 Updates
          </button>
          <button
            className={`tab-btn ${tab === 'feedback' ? 'active' : ''}`}
            onClick={() => setTab('feedback')}
          >
            💬 Feedback
          </button>
        </div>

        <div className="tab-content">
          {/* EVENTS TAB */}
          {tab === 'events' && (
            <div className="events-section">
              <h2>Current Event</h2>
              {currentEvent && (
                <div className="current-event-card">
                  <div className="event-icon">{currentEvent.icon}</div>
                  <h3>{currentEvent.name}</h3>
                  <p className="event-theme">Theme: {currentEvent.theme}</p>
                  <p className="event-description">{currentEvent.description}</p>
                  <div className="event-rewards">
                    <h4>Event Rewards:</h4>
                    <ul>
                      {currentEvent.rewards.xpMultiplier && (
                        <li>🎯 {currentEvent.rewards.xpMultiplier}x XP Multiplier</li>
                      )}
                      {currentEvent.rewards.coins && (
                        <li>💰 {currentEvent.rewards.coins} Bonus Coins</li>
                      )}
                      {currentEvent.rewards.cosmetics && (
                        <li>👕 Special Cosmetics: {currentEvent.rewards.cosmetics.join(', ')}</li>
                      )}
                      {currentEvent.questBonus && (
                        <li>⚔️ Quest Bonus: {currentEvent.questBonus}</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              <h2>Upcoming Events</h2>
              <p className="upcoming-notice">Check back next month for new events and challenges!</p>
              <div className="upcoming-events">
                {[
                  { month: 'Next Month', icon: '📅', name: 'Mysterious Event', description: 'Coming soon...' },
                  { month: 'In 2 Months', icon: '🔮', name: 'Secret Surprise', description: 'Stay tuned!' }
                ].map((event, idx) => (
                  <div key={idx} className="upcoming-event-card">
                    <span className="upcoming-icon">{event.icon}</span>
                    <div>
                      <p className="upcoming-month">{event.month}</p>
                      <p className="upcoming-name">{event.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* UPDATES TAB */}
          {tab === 'updates' && (
            <div className="updates-section">
              <h2>Latest Updates</h2>
              <p className="update-notice">We release updates every 2-3 weeks with bug fixes and new features!</p>

              <div className="updates-list">
                {[
                  {
                    version: '1.2.0',
                    date: 'Released Recently',
                    title: 'Stability & Performance',
                    changes: ['Optimized asset loading', 'Improved save system'],
                    bugFixes: ['Fixed boss cutscene crash', 'Resolved leaderboard bug']
                  },
                  {
                    version: '1.1.0',
                    date: 'Previous Update',
                    title: 'Seasonal Events Launch',
                    changes: ['Added monthly rotating events', 'New cosmetics'],
                    bugFixes: ['Fixed audio sync issue', 'Corrected XP calculation']
                  }
                ].map((update, idx) => (
                  <div key={idx} className="update-card">
                    <div className="update-header">
                      <h3>Version {update.version}</h3>
                      <span className="update-date">{update.date}</span>
                    </div>
                    <p className="update-title">{update.title}</p>

                    <div className="update-details">
                      <h4>✨ New Features:</h4>
                      <ul>
                        {update.changes.map((change, i) => <li key={i}>{change}</li>)}
                      </ul>

                      <h4>🐛 Bug Fixes:</h4>
                      <ul>
                        {update.bugFixes.map((fix, i) => <li key={i}>{fix}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="update-schedule">
                <h3>Update Schedule</h3>
                <p>📅 New updates every 2-3 weeks</p>
                <p>Our team is constantly working on improvements based on your feedback!</p>
              </div>
            </div>
          )}

          {/* FEEDBACK TAB */}
          {tab === 'feedback' && (
            <div className="feedback-section">
              <h2>Send Us Your Feedback</h2>
              <p>Help us improve the game! Report bugs, suggest features, or share your thoughts.</p>

              <div className="feedback-form">
                <div className="form-group">
                  <label htmlFor="feedback-type">Type:</label>
                  <select
                    id="feedback-type"
                    name="type"
                    value={feedbackForm.type}
                    onChange={handleFeedbackChange}
                  >
                    <option value="bug">🐛 Bug Report</option>
                    <option value="suggestion">💡 Suggestion</option>
                    <option value="complaint">😞 Complaint</option>
                    <option value="praise">😊 Praise</option>
                  </select>
                </div>

                {feedbackForm.type === 'bug' && (
                  <div className="form-group">
                    <label htmlFor="feedback-severity">Severity:</label>
                    <select
                      id="feedback-severity"
                      name="severity"
                      value={feedbackForm.severity}
                      onChange={handleFeedbackChange}
                    >
                      <option value="low">Low (minor issue)</option>
                      <option value="medium">Medium (noticeable)</option>
                      <option value="high">High (major problem)</option>
                      <option value="critical">Critical (game-breaking)</option>
                    </select>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="feedback-title">Title:</label>
                  <input
                    id="feedback-title"
                    type="text"
                    name="title"
                    placeholder="Brief summary"
                    value={feedbackForm.title}
                    onChange={handleFeedbackChange}
                    maxLength={100}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="feedback-description">Description:</label>
                  <textarea
                    id="feedback-description"
                    name="description"
                    placeholder="Tell us more details..."
                    value={feedbackForm.description}
                    onChange={handleFeedbackChange}
                    rows={5}
                    maxLength={500}
                  />
                  <span className="char-count">{feedbackForm.description.length}/500</span>
                </div>

                <button className="submit-feedback-btn" onClick={handleSubmitFeedback}>
                  📤 Submit Feedback
                </button>

                <p className="feedback-note">
                  ✨ All feedback is reviewed by our team every 2 weeks. Thank you for helping us improve!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsAndUpdatesOverlay;
