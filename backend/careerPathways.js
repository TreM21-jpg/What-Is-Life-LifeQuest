/**
 * Career Pathway System
 * Allows High School and Adult players to choose and progress through different life paths
 * Paths include: Gang, Business, Employment, College, Trade School, Freelance, Military
 */

const CareerPathways = {
  // Define all career paths
  pathways: [
    {
      id: "gang",
      name: "The Street Path",
      minAge: 13,
      description: "Join a street gang and navigate the underworld",
      theme: "power through numbers",
      icon: "🔥",
      contentRating: "R",
      unlockLevel: 5,
      skills: ["streetwise", "persuasion", "stealth", "leadership"],
      startingRewards: { coins: 200, reputation: 50 },
      milestones: [
        {
          id: "gang_recruit",
          name: "Join a Gang",
          level: 5,
          description: "Complete initiation to join your first gang",
          requirements: { questsCompleted: 3, level: 5 },
          rewards: { coins: 300, reputation: 100, title: "Gang Member" }
        },
        {
          id: "gang_lieutenant",
          name: "Rise to Lieutenant",
          level: 15,
          description: "Earn respect and become a lieutenant",
          requirements: { questsCompleted: 15, reputation: 200, level: 15 },
          rewards: { coins: 1000, reputation: 250, title: "Lieutenant", specialAbility: "rally_crew" }
        },
        {
          id: "gang_leader",
          name: "Lead Your Gang",
          level: 25,
          description: "Become the leader of your territory",
          requirements: { questsCompleted: 30, reputation: 500, level: 25 },
          rewards: { coins: 3000, reputation: 500, title: "Gang Leader", specialAbility: "command_gang", uniqueWeapon: "gang_artifact" }
        },
        {
          id: "gang_redemption",
          name: "Walk Away (Secret Ending)",
          level: 30,
          description: "Leave the gang life and pursue redemption",
          requirements: { questsCompleted: 40, level: 30, leadership: 100 },
          rewards: { coins: 2000, spiritual_peace: 500, title: "Redeemed", unlockEnding: "redemption" }
        }
      ],
      questTypes: ["territory_defense", "rival_confrontation", "protect_turf", "street_justice"],
      consequences: { health: -0.1, morality: -0.3, streetSmarts: 0.5, danger: 0.8 },
      endingPaths: ["redemption", "imprisoned", "gang_leader"]
    },

    {
      id: "business",
      name: "The Business Path",
      minAge: 13,
      description: "Start and grow your own business empire",
      theme: "build wealth and influence",
      icon: "💼",
      contentRating: "PG-13",
      unlockLevel: 8,
      skills: ["negotiation", "accounting", "marketing", "leadership"],
      startingRewards: { coins: 100, reputation: 30 },
      milestones: [
        {
          id: "biz_startup",
          name: "Start a Business",
          level: 8,
          description: "Launch your first small business venture",
          requirements: { coins: 500, questsCompleted: 5, level: 8 },
          rewards: { coins: -500, monthlyIncome: 50, title: "Entrepreneur", business: "startup" }
        },
        {
          id: "biz_growth",
          name: "Grow Your Business",
          level: 16,
          description: "Expand operations and increase monthly income",
          requirements: { coins: 2000, questsCompleted: 20, level: 16, monthlyIncome: 200 },
          rewards: { coins: -2000, monthlyIncome: 500, title: "Business Owner", employees: 5, businessTier: "growing" }
        },
        {
          id: "biz_empire",
          name: "Build an Empire",
          level: 28,
          description: "Establish a business empire with multiple ventures",
          requirements: { coins: 10000, questsCompleted: 40, level: 28, monthlyIncome: 1000 },
          rewards: { coins: -10000, monthlyIncome: 2000, title: "CEO", employees: 50, businessTier: "empire", specialAbility: "acquire_rival" }
        },
        {
          id: "biz_philanthropy",
          name: "Give Back",
          level: 30,
          description: "Use your wealth to help the community",
          requirements: { coins: 5000, level: 30, charitable_donations: 100 },
          rewards: { coins: -5000, reputation: 500, title: "Philanthropist", unlockEnding: "legacy" }
        }
      ],
      questTypes: ["customer_acquisition", "manage_employees", "expand_market", "compete_rivals", "improve_product"],
      consequences: { wealth: 0.7, morality: 0.2, stress: 0.5, workLife: -0.3 },
      endingPaths: ["business_tycoon", "bankrupt", "philanthropist", "legacy"]
    },

    {
      id: "employment",
      name: "The Working Path",
      minAge: 13,
      description: "Build a career working for established employers",
      theme: "climb the corporate ladder",
      icon: "🏢",
      contentRating: "PG",
      unlockLevel: 6,
      skills: ["reliability", "professionalism", "teamwork", "expertise"],
      startingRewards: { coins: 0, reputation: 20, monthlyIncome: 100 },
      milestones: [
        {
          id: "emp_entry",
          name: "Get a Job",
          level: 6,
          description: "Secure your first entry-level position",
          requirements: { questsCompleted: 3, level: 6 },
          rewards: { monthlyIncome: 100, title: "Employee", workExperience: 1 }
        },
        {
          id: "emp_promotion",
          name: "First Promotion",
          level: 14,
          description: "Earn a promotion to supervisor/manager",
          requirements: { questsCompleted: 20, level: 14, workExperience: 2 },
          rewards: { monthlyIncome: 300, title: "Supervisor", managedEmployees: 5 }
        },
        {
          id: "emp_management",
          name: "Management Position",
          level: 22,
          description: "Rise to middle management or department lead",
          requirements: { questsCompleted: 35, level: 22, workExperience: 3, satisfaction: 80 },
          rewards: { monthlyIncome: 800, title: "Manager", managedEmployees: 20, bonuses: 500 }
        },
        {
          id: "emp_executive",
          name: "Executive Role",
          level: 30,
          description: "Reach executive level (VP, Director, etc.)",
          requirements: { questsCompleted: 50, level: 30, workExperience: 4, satisfaction: 90 },
          rewards: { monthlyIncome: 2000, title: "Executive", managedEmployees: 100, specialAbility: "company_decision", unlockEnding: "success" }
        }
      ],
      questTypes: ["complete_project", "mentor_subordinate", "improve_efficiency", "handle_crisis", "innovate_process"],
      consequences: { wealth: 0.4, stability: 0.9, stress: 0.3, creativity: -0.2 },
      endingPaths: ["executive_success", "burnout", "lateral_move", "early_retirement"]
    },

    {
      id: "college",
      name: "The Academic Path",
      minAge: 17,
      description: "Pursue higher education and specialized knowledge",
      theme: "knowledge is power",
      icon: "🎓",
      contentRating: "PG",
      unlockLevel: 10,
      skills: ["research", "critical_thinking", "expertise", "communication"],
      startingRewards: { coins: -5000, studentDebt: 5000, scholarships: 0 },
      milestones: [
        {
          id: "college_enroll",
          name: "Start College",
          level: 10,
          description: "Enroll in a university or college program",
          requirements: { level: 10, age: 17 },
          rewards: { studentDebt: 5000, scholarships: 0, studySkill: 50, title: "College Student" }
        },
        {
          id: "college_specialization",
          name: "Declare Major",
          level: 14,
          description: "Choose your area of specialization",
          requirements: { questsCompleted: 10, studySkill: 50, level: 14 },
          rewards: { expertise: 50, scholarships: 1000, title: "Major Student", specialization: "selected" }
        },
        {
          id: "college_graduate",
          name: "Graduate",
          level: 20,
          description: "Complete your degree program",
          requirements: { questsCompleted: 25, studySkill: 80, level: 20, gpa: 3.0 },
          rewards: { coins: 5000, title: "Bachelor's Degree Holder", expertise: 100, monthlyIncome: 400, unlockJobs: ["professional", "researcher"] }
        },
        {
          id: "college_postgrad",
          name: "Advanced Degree",
          level: 28,
          description: "Pursue graduate studies (Master's, PhD)",
          requirements: { questsCompleted: 40, studySkill: 90, level: 28, gpa: 3.5 },
          rewards: { coins: 3000, title: "Master's Degree Holder", expertise: 200, monthlyIncome: 600, unlockJobs: ["professor", "researcher", "specialist"] }
        }
      ],
      questTypes: ["study_subject", "complete_assignment", "thesis_research", "academic_competition", "networking_event"],
      consequences: { knowledge: 0.8, wealth: -0.6, stress: 0.4, socialLife: 0.3 },
      endingPaths: ["successful_professional", "academic_career", "student_debt_burden", "research_pioneer"]
    },

    {
      id: "trade_school",
      name: "The Trade Path",
      minAge: 16,
      description: "Master a skilled trade and build a practical career",
      theme: "hands-on expertise",
      icon: "🔧",
      contentRating: "PG",
      unlockLevel: 8,
      skills: ["craftsmanship", "problem_solving", "technical_expertise", "business_sense"],
      startingRewards: { coins: 0, tradeSkill: 30, monthlyIncome: 0 },
      milestones: [
        {
          id: "trade_apprentice",
          name: "Start Apprenticeship",
          level: 8,
          description: "Begin apprenticing under a master craftsperson",
          requirements: { level: 8, age: 16 },
          rewards: { tradeSkill: 30, monthlyIncome: 50, title: "Apprentice" }
        },
        {
          id: "trade_journeyman",
          name: "Become Journeyman",
          level: 16,
          description: "Complete apprenticeship and become a journeyman",
          requirements: { questsCompleted: 20, tradeSkill: 60, level: 16 },
          rewards: { tradeSkill: 60, monthlyIncome: 200, title: "Journeyman", canTrain: true }
        },
        {
          id: "trade_master",
          name: "Master Your Craft",
          level: 24,
          description: "Achieve mastery and master craftsperson status",
          requirements: { questsCompleted: 35, tradeSkill: 90, level: 24 },
          rewards: { tradeSkill: 90, monthlyIncome: 500, title: "Master Craftsperson", businessStartup: true, students: 0 }
        },
        {
          id: "trade_business",
          name: "Start Your Shop",
          level: 28,
          description: "Open your own trade business",
          requirements: { coins: 3000, questsCompleted: 45, tradeSkill: 90, level: 28 },
          rewards: { coins: -3000, monthlyIncome: 1000, title: "Shop Owner", employees: 5, unlockEnding: "legacy" }
        }
      ],
      questTypes: ["practice_skill", "complete_job", "perfect_technique", "teach_apprentice", "innovate_method"],
      consequences: { wealth: 0.5, job_security: 0.9, creativity: 0.7, education: 0.3 },
      endingPaths: ["master_craftsman", "shop_owner", "famous_artisan", "legacy_business"]
    },

    {
      id: "freelance",
      name: "The Independent Path",
      minAge: 16,
      description: "Work independently as a freelancer or contractor",
      theme: "freedom and flexibility",
      icon: "🚀",
      contentRating: "PG",
      unlockLevel: 10,
      skills: ["self_discipline", "marketing", "specialized_skills", "negotiation"],
      startingRewards: { coins: 0, reputation: 20, monthlyIncome: 0 },
      milestones: [
        {
          id: "freelance_start",
          name: "Go Freelance",
          level: 10,
          description: "Start your first freelance project",
          requirements: { level: 10, expertise: 40 },
          rewards: { coins: 100, monthlyIncome: 50, title: "Freelancer", reputation: 20 }
        },
        {
          id: "freelance_established",
          name: "Establish Reputation",
          level: 18,
          description: "Build solid client base and positive reviews",
          requirements: { questsCompleted: 25, reputation: 80, level: 18 },
          rewards: { monthlyIncome: 300, reputation: 150, title: "Established Freelancer", clients: 10 }
        },
        {
          id: "freelance_agency",
          name: "Build an Agency",
          level: 26,
          description: "Grow into a small agency with contractors",
          requirements: { questsCompleted: 40, reputation: 200, level: 26, monthlyIncome: 600 },
          rewards: { monthlyIncome: 800, reputation: 300, title: "Agency Owner", contractors: 5, specialAbility: "delegate" }
        },
        {
          id: "freelance_enterprise",
          name: "Build Enterprise",
          level: 32,
          description: "Establish a full enterprise from your freelance roots",
          requirements: { questsCompleted: 55, reputation: 500, level: 32, monthlyIncome: 1500 },
          rewards: { monthlyIncome: 3000, reputation: 500, title: "Entrepreneur", employees: 20, unlockEnding: "empire" }
        }
      ],
      questTypes: ["land_client", "complete_project", "build_portfolio", "market_services", "scale_operations"],
      consequences: { wealth: 0.6, freedom: 0.9, stress: 0.6, job_security: 0.3 },
      endingPaths: ["successful_freelancer", "agency_owner", "industry_leader", "work_life_balance"]
    },

    {
      id: "military",
      name: "The Service Path",
      minAge: 17,
      description: "Join the military and serve your country",
      theme: "honor and duty",
      icon: "⚔️",
      contentRating: "PG-13",
      unlockLevel: 12,
      skills: ["discipline", "leadership", "combat", "strategy"],
      startingRewards: { coins: 1000, monthlyIncome: 150, reputation: 100 },
      milestones: [
        {
          id: "mil_recruit",
          name: "Join Military",
          level: 12,
          description: "Enlist and complete basic training",
          requirements: { level: 12, age: 17 },
          rewards: { coins: 5000, monthlyIncome: 150, title: "Enlisted Soldier", rank: "E1" }
        },
        {
          id: "mil_nco",
          name: "Non-Commissioned Officer",
          level: 18,
          description: "Earn your stripes as a sergeant/corporal",
          requirements: { questsCompleted: 20, level: 18, discipline: 80 },
          rewards: { coins: 2000, monthlyIncome: 300, title: "Sergeant", rank: "E5", leadership: 50 }
        },
        {
          id: "mil_officer",
          name: "Become Officer",
          level: 26,
          description: "Earn commission as an officer",
          requirements: { questsCompleted: 40, level: 26, leadership: 100, education: 80 },
          rewards: { coins: 5000, monthlyIncome: 800, title: "Officer", rank: "O1", authority: 50, unlockAbility: "command_squad" }
        },
        {
          id: "mil_retire",
          name: "Retire with Honor",
          level: 32,
          description: "Complete service and retire with pension",
          requirements: { questsCompleted: 60, level: 32, yearsOfService: 20 },
          rewards: { coins: 50000, monthlyPension: 400, title: "Veteran", veteranBenefits: true, unlockEnding: "honored_service" }
        }
      ],
      questTypes: ["training_exercise", "combat_mission", "leadership_challenge", "strategic_planning", "defend_territory"],
      consequences: { discipline: 0.9, danger: 0.7, leadership: 0.8, civilian_skills: -0.3 },
      endingPaths: ["military_hero", "decorated_officer", "peacetime_career", "honored_veteran"]
    }
  ],

  // Get all available pathways for a player
  getAvailablePathways(playerAge, playerLevel) {
    return this.pathways.filter(p => playerAge >= p.minAge && playerLevel >= p.unlockLevel);
  },

  // Get pathway details
  getPathway(pathwayId) {
    return this.pathways.find(p => p.id === pathwayId) || null;
  },

  // Check if player can unlock a pathway
  canUnlockPathway(playerAge, playerLevel, pathwayId) {
    const pathway = this.getPathway(pathwayId);
    if (!pathway) return false;
    return playerAge >= pathway.minAge && playerLevel >= pathway.unlockLevel;
  },

  // Get next milestone for player
  getNextMilestone(pathwayId, currentProgress = 0) {
    const pathway = this.getPathway(pathwayId);
    if (!pathway) return null;
    return pathway.milestones[currentProgress] || null;
  },

  // Calculate consequences of a pathway choice
  getPathwayConsequences(pathwayId) {
    const pathway = this.getPathway(pathwayId);
    if (!pathway) return null;
    return pathway.consequences;
  },

  // Get all possible endings for a pathway
  getPathwayEndings(pathwayId) {
    const pathway = this.getPathway(pathwayId);
    if (!pathway) return [];
    return pathway.endingPaths;
  },

  // Track player pathway choice
  choosePathway(player, pathwayId) {
    const pathway = this.getPathway(pathwayId);
    if (!pathway) return null;

    player.careerPathway = {
      id: pathwayId,
      name: pathway.name,
      chosenAt: new Date().toISOString(),
      level: 0,
      milestones: [],
      consequences: pathway.consequences,
      monthlyIncome: pathway.startingRewards.monthlyIncome || 0,
      specialAbilities: [],
      possibleEndings: pathway.endingPaths
    };

    if (pathway.startingRewards.coins) {
      player.coins = (player.coins || 0) + pathway.startingRewards.coins;
    }

    return player.careerPathway;
  },

  // Complete a milestone in a career
  completeMilestone(player, pathwayId, milestoneId) {
    if (!player.careerPathway || player.careerPathway.id !== pathwayId) return null;

    const pathway = this.getPathway(pathwayId);
    const milestone = pathway.milestones.find(m => m.id === milestoneId);

    if (!milestone || player.careerPathway.milestones.includes(milestoneId)) return null;

    // Apply rewards
    player.careerPathway.milestones.push(milestoneId);
    if (milestone.rewards.coins) {
      player.coins = (player.coins || 0) + milestone.rewards.coins;
    }
    if (milestone.rewards.monthlyIncome) {
      player.careerPathway.monthlyIncome = milestone.rewards.monthlyIncome;
    }
    if (milestone.rewards.title) {
      player.title = milestone.rewards.title;
    }
    if (milestone.rewards.specialAbility) {
      player.careerPathway.specialAbilities.push(milestone.rewards.specialAbility);
    }

    return player.careerPathway;
  }
};

module.exports = CareerPathways;
