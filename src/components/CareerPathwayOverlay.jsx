import React, { useState } from 'react';
import './CareerPathwayOverlay.css';

/**
 * CareerPathwayOverlay Component
 * Displays career pathways for High School and Adult players
 */

const CareerPathwayOverlay = ({ isOpen, onClose, playerAge, playerLevel, currentPathway, onSelectPathway, onCompleteMilestone }) => {
  const [selectedPathway, setSelectedPathway] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  if (!isOpen) return null;

  const allPathways = [
    {
      id: 'gang',
      name: 'The Street Path',
      icon: '🔥',
      description: 'Join a street gang and navigate the underworld',
      minAge: 13,
      minLevel: 5,
      theme: 'power through numbers',
      rating: 'R',
      months: 24
    },
    {
      id: 'business',
      name: 'The Business Path',
      icon: '💼',
      description: 'Start and grow your own business empire',
      minAge: 13,
      minLevel: 8,
      theme: 'build wealth and influence',
      rating: 'PG-13',
      months: 20
    },
    {
      id: 'employment',
      name: 'The Working Path',
      icon: '🏢',
      description: 'Build a career working for established employers',
      minAge: 13,
      minLevel: 6,
      theme: 'climb the corporate ladder',
      rating: 'PG',
      months: 24
    },
    {
      id: 'college',
      name: 'The Academic Path',
      icon: '🎓',
      description: 'Pursue higher education and specialized knowledge',
      minAge: 17,
      minLevel: 10,
      theme: 'knowledge is power',
      rating: 'PG',
      months: 48
    },
    {
      id: 'trade_school',
      name: 'The Trade Path',
      icon: '🔧',
      description: 'Master a skilled trade and build a practical career',
      minAge: 16,
      minLevel: 8,
      theme: 'hands-on expertise',
      rating: 'PG',
      months: 36
    },
    {
      id: 'freelance',
      name: 'The Independent Path',
      icon: '🚀',
      description: 'Work independently as a freelancer or contractor',
      minAge: 16,
      minLevel: 10,
      theme: 'freedom and flexibility',
      rating: 'PG',
      months: 18
    },
    {
      id: 'military',
      name: 'The Service Path',
      icon: '⚔️',
      description: 'Join the military and serve your country',
      minAge: 17,
      minLevel: 12,
      theme: 'honor and duty',
      rating: 'PG-13',
      months: 60
    }
  ];

  const availablePathways = allPathways.filter(p => playerAge >= p.minAge && playerLevel >= p.minLevel);
  const lockedPathways = allPathways.filter(p => playerAge < p.minAge || playerLevel < p.minLevel);

  const handleSelectPathway = (pathway) => {
    setSelectedPathway(pathway);
    setShowDetails(true);
  };

  const handleConfirmChoice = (pathway) => {
    onSelectPathway(pathway.id);
    setShowDetails(false);
    setSelectedPathway(null);
  };

  return (
    <div className="career-overlay">
      <div className="overlay-content">
        <button className="close-btn" onClick={onClose}>✕</button>

        <h1>🚀 Choose Your Career Path</h1>
        <p className="intro-text">
          Your life journey branches into multiple paths. Choose wisely—each path has different challenges, rewards, and endings.
        </p>

        {currentPathway && (
          <div className="current-pathway-banner">
            <p>📌 You are currently on: <strong>{currentPathway.name}</strong></p>
          </div>
        )}

        <div className="pathways-grid">
          {availablePathways.map(pathway => (
            <div
              key={pathway.id}
              className="pathway-card available"
              onClick={() => handleSelectPathway(pathway)}
            >
              <div className="pathway-icon">{pathway.icon}</div>
              <h3>{pathway.name}</h3>
              <p className="pathway-description">{pathway.description}</p>
              <div className="pathway-meta">
                <span className="theme">{pathway.theme}</span>
                <span className="duration">⏱️ {pathway.months} months</span>
              </div>
              <button className="explore-btn">Explore Path</button>
            </div>
          ))}

          {lockedPathways.map(pathway => (
            <div
              key={pathway.id}
              className="pathway-card locked"
              title={`Unlock at age ${pathway.minAge}, Level ${pathway.minLevel}`}
            >
              <div className="pathway-icon">{pathway.icon}</div>
              <h3>{pathway.name}</h3>
              <p className="lock-requirement">
                🔒 Unlock at Age {pathway.minAge}, Level {pathway.minLevel}
              </p>
              <p className="current-status">
                {playerAge < pathway.minAge ? `Current Age: ${playerAge}` : `Current Level: ${playerLevel}`}
              </p>
            </div>
          ))}
        </div>
      </div>

      {showDetails && selectedPathway && (
        <div className="pathway-detail-modal">
          <div className="detail-content">
            <button className="close-detail" onClick={() => setShowDetails(false)}>✕</button>

            <div className="detail-header">
              <span className="detail-icon">{selectedPathway.icon}</span>
              <h2>{selectedPathway.name}</h2>
            </div>

            <div className="detail-section">
              <h3>Path Overview</h3>
              <p>{selectedPathway.description}</p>
              <p className="detail-theme">Theme: <strong>{selectedPathway.theme}</strong></p>
            </div>

            <div className="detail-section">
              <h3>⏱️ Estimated Journey</h3>
              <p>Approximately <strong>{selectedPathway.months} months</strong> to complete main milestones</p>
            </div>

            <div className="detail-section">
              <h3>🎯 Career Milestones</h3>
              <div className="milestones-list">
                {selectedPathway.id === 'gang' && (
                  <>
                    <div className="milestone">
                      <span className="milestone-number">1</span>
                      <div>
                        <h4>Join a Gang</h4>
                        <p>Complete initiation to join your first gang</p>
                      </div>
                    </div>
                    <div className="milestone">
                      <span className="milestone-number">2</span>
                      <div>
                        <h4>Rise to Lieutenant</h4>
                        <p>Earn respect and become a lieutenant</p>
                      </div>
                    </div>
                    <div className="milestone">
                      <span className="milestone-number">3</span>
                      <div>
                        <h4>Lead Your Gang</h4>
                        <p>Become the leader of your territory</p>
                      </div>
                    </div>
                    <div className="milestone secret">
                      <span className="milestone-number">?</span>
                      <div>
                        <h4>Walk Away (Secret)</h4>
                        <p>Leave the gang life and pursue redemption</p>
                      </div>
                    </div>
                  </>
                )}
                {selectedPathway.id === 'business' && (
                  <>
                    <div className="milestone">
                      <span className="milestone-number">1</span>
                      <div>
                        <h4>Start a Business</h4>
                        <p>Launch your first small business venture</p>
                      </div>
                    </div>
                    <div className="milestone">
                      <span className="milestone-number">2</span>
                      <div>
                        <h4>Grow Your Business</h4>
                        <p>Expand operations and increase income</p>
                      </div>
                    </div>
                    <div className="milestone">
                      <span className="milestone-number">3</span>
                      <div>
                        <h4>Build an Empire</h4>
                        <p>Establish a multi-venture business empire</p>
                      </div>
                    </div>
                  </>
                )}
                {selectedPathway.id === 'college' && (
                  <>
                    <div className="milestone">
                      <span className="milestone-number">1</span>
                      <div>
                        <h4>Enroll in College</h4>
                        <p>Start your university education</p>
                      </div>
                    </div>
                    <div className="milestone">
                      <span className="milestone-number">2</span>
                      <div>
                        <h4>Declare Major</h4>
                        <p>Choose your area of specialization</p>
                      </div>
                    </div>
                    <div className="milestone">
                      <span className="milestone-number">3</span>
                      <div>
                        <h4>Graduate</h4>
                        <p>Earn your Bachelor's degree</p>
                      </div>
                    </div>
                    <div className="milestone">
                      <span className="milestone-number">4</span>
                      <div>
                        <h4>Advanced Degree</h4>
                        <p>Pursue Master's or PhD studies</p>
                      </div>
                    </div>
                  </>
                )}
                {/* Add other pathway milestones similarly */}
              </div>
            </div>

            <div className="detail-section">
              <h3>⚠️ Impact & Consequences</h3>
              <div className="consequences">
                <p>Choosing this path will affect your character's stats and life quality in specific ways.</p>
              </div>
            </div>

            <div className="detail-section">
              <h3>🎬 Possible Endings</h3>
              <p>Different choices lead to different outcomes. Your decisions matter!</p>
            </div>

            <button
              className="commit-btn"
              onClick={() => handleConfirmChoice(selectedPathway)}
              disabled={currentPathway?.id === selectedPathway.id}
            >
              {currentPathway?.id === selectedPathway.id ? '✓ Current Path' : '🎯 Choose This Path'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerPathwayOverlay;
