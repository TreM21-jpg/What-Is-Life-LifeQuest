import React, { useState, useEffect } from 'react';
import './AgeGatedStagesOverlay.css';

/**
 * AgeGatedStagesOverlay Component
 * Displays age-appropriate stages and progression
 */

const AgeGatedStagesOverlay = ({ isOpen, onClose, playerAge, completedStages, onSelectStage }) => {
  const [stages, setStages] = useState([]);
  const [selectedStage, setSelectedStage] = useState(null);

  useEffect(() => {
    // Mock: In production, fetch from backend
    const mockStages = {
      4: [
        { id: 'elem_intro', name: 'Forest of Beginnings', difficulty: 1, theme: 'gentle', duration: '10-15 min' }
      ],
      7: [
        { id: 'elem_1', name: 'Forest of Beginnings', difficulty: 1, theme: 'discovery', duration: '20-30 min' },
        { id: 'elem_2', name: 'Mountain of Trials', difficulty: 2, theme: 'challenge', duration: '30-45 min' }
      ],
      10: [
        { id: 'middle_1', name: 'Forest of Discovery', difficulty: 2, theme: 'growth', duration: '30-45 min' },
        { id: 'middle_2', name: 'Mountain of Trials', difficulty: 3, theme: 'perseverance', duration: '45-60 min' },
        { id: 'middle_3', name: 'The Abyss', difficulty: 4, theme: 'courage', duration: '60-90 min' }
      ],
      13: [
        { id: 'hs_1', name: 'The Crossroads', difficulty: 3, theme: 'choice', duration: '45-60 min' },
        { id: 'hs_2', name: 'Mountain of Trials', difficulty: 4, theme: 'mastery', duration: '60-90 min' },
        { id: 'hs_3', name: 'The Abyss', difficulty: 5, theme: 'reflection', duration: '90-120 min' },
        { id: 'hs_4', name: 'Sanctuary of Truth', difficulty: 6, theme: 'wisdom', duration: '120-150 min' }
      ],
      18: [
        { id: 'adult_1', name: 'The Crossroads Revisited', difficulty: 4, theme: 'reflection', duration: '60-90 min' },
        { id: 'adult_2', name: 'The Abyss Deep', difficulty: 5, theme: 'philosophy', duration: '90-120 min' },
        { id: 'adult_3', name: 'Sanctuary of Truth - Ultimate', difficulty: 6, theme: 'transcendence', duration: '150-200 min' }
      ]
    };

    // Find appropriate bracket
    let bracket = null;
    if (playerAge <= 6) bracket = mockStages[4];
    else if (playerAge <= 9) bracket = mockStages[7];
    else if (playerAge <= 12) bracket = mockStages[10];
    else if (playerAge <= 17) bracket = mockStages[13];
    else bracket = mockStages[18];

    setStages(bracket || []);
  }, [playerAge]);

  if (!isOpen) return null;

  const getAgeBracketName = () => {
    if (playerAge <= 6) return 'Littles (Ages 4-6)';
    if (playerAge <= 9) return 'Elementary (Ages 7-9)';
    if (playerAge <= 12) return 'Middle School (Ages 10-12)';
    if (playerAge <= 17) return 'High School (Ages 13-17)';
    return 'Adult (Ages 18+)';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = ['#90EE90', '#FFD700', '#FFA500', '#FF6347', '#8B0000', '#4B0082'];
    return colors[difficulty - 1] || '#FFD700';
  };

  const isStageCompleted = (stageId) => completedStages && completedStages.includes(stageId);
  const isStageUnlocked = (index) => index === 0 || isStageCompleted(stages[index - 1]?.id);

  return (
    <div className="age-gated-overlay">
      <div className="overlay-content">
        <button className="close-btn" onClick={onClose}>✕</button>

        <h1>📚 Story Stages</h1>
        <p className="age-bracket-info">
          Your Age: {playerAge} years old · Bracket: {getAgeBracketName()}
        </p>

        <div className="stages-container">
          {stages.map((stage, index) => {
            const completed = isStageCompleted(stage.id);
            const unlocked = isStageUnlocked(index);

            return (
              <div
                key={stage.id}
                className={`stage-card ${completed ? 'completed' : ''} ${!unlocked ? 'locked' : ''}`}
                onClick={() => unlocked && setSelectedStage(stage)}
              >
                <div className="stage-number">
                  {completed && '✓'}
                  {!completed && !unlocked && '🔒'}
                  {!completed && unlocked && index + 1}
                </div>

                <h3>{stage.name}</h3>

                <div className="stage-meta">
                  <span className="difficulty" style={{ borderColor: getDifficultyColor(stage.difficulty) }}>
                    {'★'.repeat(stage.difficulty)}
                  </span>
                  <span className="theme">{stage.theme}</span>
                  <span className="duration">⏱️ {stage.duration}</span>
                </div>

                {!unlocked && (
                  <p className="locked-msg">
                    🔒 Complete the previous stage to unlock
                  </p>
                )}

                {completed && (
                  <p className="completed-msg">✅ Completed</p>
                )}

                {unlocked && !completed && (
                  <button className="play-btn">Play Now</button>
                )}
              </div>
            );
          })}
        </div>

        {selectedStage && (
          <div className="stage-detail-modal">
            <div className="detail-content">
              <button className="close-detail" onClick={() => setSelectedStage(null)}>✕</button>
              <h2>{selectedStage.name}</h2>
              <p className="detail-theme">Theme: {selectedStage.theme}</p>
              <p className="detail-duration">Expected Duration: {selectedStage.duration}</p>
              <div className="detail-difficulty">
                Difficulty: {'★'.repeat(selectedStage.difficulty)} ({selectedStage.difficulty}/6)
              </div>
              <button
                className="start-btn"
                onClick={() => {
                  onSelectStage(selectedStage);
                  setSelectedStage(null);
                }}
              >
                🎮 Start Stage
              </button>
            </div>
          </div>
        )}

        <div className="progression-info">
          <h3>Your Progress</h3>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${Math.round((completedStages?.length || 0) / stages.length * 100)}%` }}
            />
          </div>
          <p>
            {completedStages?.length || 0} of {stages.length} stages completed
          </p>
        </div>

        <div className="age-info">
          <h3>ℹ️ Age-Appropriate Design</h3>
          <p>
            Your journey is tailored to your age. The game grows with you, offering age-appropriate challenges,
            themes, and stories. As you age up, new stages and features become available!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgeGatedStagesOverlay;
