/**
 * Update & Feedback System
 * Tracks bi-weekly updates, player feedback, and bug reports
 * Players can submit complaints/suggestions; team tracks them
 */

const UpdateSystem = {
  // Define bi-weekly update cycles (every 2-3 weeks)
  updates: [
    {
      id: 1,
      date: "2024-01-08",
      version: "1.1.0",
      type: "feature",
      title: "Seasonal Events Launch",
      changes: [
        "Added monthly rotating events",
        "New cosmetics and themed rewards",
        "Event-specific quest bonuses"
      ],
      bugFixes: [
        "Fixed audio sync issue on mobile",
        "Corrected experience point calculation"
      ],
      status: "released",
      playerRating: 4.5
    },
    {
      id: 2,
      date: "2024-01-22",
      version: "1.2.0",
      type: "bugfix",
      title: "Stability & Performance",
      changes: [
        "Optimized asset loading",
        "Improved save system reliability"
      ],
      bugFixes: [
        "Fixed crash on boss intro cutscene",
        "Resolved leaderboard sorting bug",
        "Fixed inventory display on tablets"
      ],
      status: "released",
      playerRating: 4.8
    }
  ],

  // Feedback/bug tracking system
  playerFeedback: [],

  // Submit feedback or bug report
  submitFeedback(sessionId, type, title, description, severity = "low") {
    const feedback = {
      id: `FB-${Date.now()}`,
      sessionId,
      type, // "bug", "suggestion", "complaint", "praise"
      title,
      description,
      severity, // "low", "medium", "high", "critical"
      submittedAt: new Date().toISOString(),
      status: "open", // "open", "reviewed", "acknowledged", "fixing", "resolved"
      upvotes: 0,
      responses: []
    };

    this.playerFeedback.push(feedback);
    return feedback;
  },

  // Get feedback statistics
  getFeedbackStats() {
    const stats = {
      total: this.playerFeedback.length,
      byType: {},
      bySeverity: {},
      byStatus: {}
    };

    this.playerFeedback.forEach(fb => {
      stats.byType[fb.type] = (stats.byType[fb.type] || 0) + 1;
      stats.bySeverity[fb.severity] = (stats.bySeverity[fb.severity] || 0) + 1;
      stats.byStatus[fb.status] = (stats.byStatus[fb.status] || 0) + 1;
    });

    return stats;
  },

  // Get open/critical issues
  getCriticalIssues() {
    return this.playerFeedback.filter(
      fb => fb.severity === "critical" && fb.status !== "resolved"
    );
  },

  // Mark feedback as reviewed/fixing/resolved
  updateFeedbackStatus(feedbackId, newStatus, note = "") {
    const feedback = this.playerFeedback.find(fb => fb.id === feedbackId);
    if (feedback) {
      feedback.status = newStatus;
      if (note) {
        feedback.responses.push({
          timestamp: new Date().toISOString(),
          message: note,
          type: "admin"
        });
      }
    }
    return feedback;
  },

  // Get all updates
  getAllUpdates() {
    return this.updates.sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  // Get latest update
  getLatestUpdate() {
    return this.updates[this.updates.length - 1] || null;
  },

  // Add new update (called every 2-3 weeks by admin)
  addUpdate(version, title, changes, bugFixes) {
    const newUpdate = {
      id: this.updates.length + 1,
      date: new Date().toISOString().split('T')[0],
      version,
      type: bugFixes && bugFixes.length > 0 ? "bugfix" : "feature",
      title,
      changes,
      bugFixes: bugFixes || [],
      status: "released",
      playerRating: 0
    };

    this.updates.push(newUpdate);
    return newUpdate;
  },

  // Calculate schedule for next update (roughly 2-3 weeks)
  getNextUpdateDate() {
    const lastUpdate = this.getLatestUpdate();
    if (!lastUpdate) return new Date();

    const lastDate = new Date(lastUpdate.date);
    const daysToAdd = 14 + Math.floor(Math.random() * 7); // 2-3 weeks randomness
    const nextDate = new Date(lastDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

    return nextDate;
  }
};

module.exports = UpdateSystem;
