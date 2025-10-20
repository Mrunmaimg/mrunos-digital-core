import { Trophy, Award, Star, Code } from "lucide-react";

const achievements = [
  {
    title: "ACM TCET Code Warz '25",
    award: "Winner",
    description: "Secured 1st place among 600+ participants in a competitive programming competition",
    icon: Trophy,
    color: "primary",
    participants: "600+ participants",
  },
  {
    title: "Citi Ada Lovelace 2025 Hackathon",
    award: "Finalist",
    description: "Competed with 400+ teams in a national hackathon, developing SkillCiti - an AI-powered hiring platform",
    icon: Award,
    color: "secondary",
    participants: "400+ teams",
  },
  {
    title: "LeetCode Excellence",
    award: "500+ Problems Solved",
    description: "Earned 13 badges demonstrating strong Data Structures and Algorithms fundamentals",
    icon: Code,
    color: "accent",
    participants: "13 badges",
  },
];

export const AchievementsWindow = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
          <Star className="w-6 h-6 animate-pulse" />
          Achievements & Recognition
        </h2>
        <p className="text-sm text-muted-foreground">Competitive programming wins and technical milestones</p>
      </div>

      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="glass p-6 rounded-lg hover:glow-cyan transition-all">
            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 rounded-xl bg-${achievement.color}/20 flex items-center justify-center glow-${achievement.color}`}>
                <achievement.icon className={`w-8 h-8 text-${achievement.color}`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-xl font-semibold text-primary">{achievement.title}</h3>
                  <span className={`px-3 py-1 text-xs bg-${achievement.color}/20 text-${achievement.color} rounded-full font-semibold whitespace-nowrap`}>
                    {achievement.award}
                  </span>
                </div>
                
                <p className="text-sm text-foreground/80 mb-2">{achievement.description}</p>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="w-3 h-3" />
                  <span>{achievement.participants}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass p-6 rounded-lg bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <h3 className="text-lg font-semibold text-primary mb-4">Achievement Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">3</div>
            <div className="text-xs text-muted-foreground">Major Awards</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">1000+</div>
            <div className="text-xs text-muted-foreground">Competitors Beaten</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">500+</div>
            <div className="text-xs text-muted-foreground">Problems Solved</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">13</div>
            <div className="text-xs text-muted-foreground">LeetCode Badges</div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Users } from "lucide-react";
