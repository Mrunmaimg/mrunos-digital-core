import { Code2, Database, Terminal, Wrench, BookOpen, FileCode, Server, Box, GitBranch, Braces } from "lucide-react";

const skillIcons: Record<string, any> = {
  "Java": Code2,
  "Python": FileCode,
  "C/C++": Terminal,
  "SQL": Database,
  "JavaScript": Braces,
  "HTML/CSS": Code2,
  "R": FileCode,
  "Springboot": Server,
  "Hibernate": Database,
  "Flask": Server,
  "TensorFlow-Keras": Box,
  "Scikit-learn": Box,
  "Hugging Face": Box,
  "NLTK": BookOpen,
  "Numpy": Box,
  "Pandas": Database,
  "Git": GitBranch,
  "Linux/Unix": Terminal,
  "VS Code": Code2,
  "IntelliJ": Code2,
  "Postman": Server,
  "Data Structures & Algorithms": BookOpen,
  "Distributed Systems": Server,
  "Computer Networks (TCP/IP)": Server,
  "Operating Systems": Terminal,
};

const skillCategories = [
  {
    category: "Languages",
    skills: ["Java", "Python", "C/C++", "SQL", "JavaScript", "HTML/CSS", "R"],
    color: "primary",
  },
  {
    category: "Frameworks & Libraries",
    skills: ["Springboot", "Hibernate", "Flask", "TensorFlow-Keras", "Scikit-learn", "Hugging Face", "NLTK", "Numpy", "Pandas"],
    color: "secondary",
  },
  {
    category: "Developer Tools",
    skills: ["Git", "Linux/Unix", "VS Code", "IntelliJ", "Postman"],
    color: "accent",
  },
  {
    category: "CS Fundamentals",
    skills: ["Data Structures & Algorithms", "Distributed Systems", "Computer Networks (TCP/IP)", "Operating Systems"],
    color: "primary",
  },
];

export const SkillsWindow = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">Technical Skills</h2>
        <p className="text-xs md:text-sm text-muted-foreground">My technology stack and expertise</p>
      </div>

      <div className="space-y-4 md:space-y-6">
        {skillCategories.map((category, index) => (
          <div key={index} className="glass p-4 md:p-6 rounded-lg">
            <h3 className={`text-base md:text-lg font-semibold text-${category.color} mb-3 md:mb-4 flex items-center gap-2`}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => {
                const SkillIcon = skillIcons[skill] || Code2;
                const colorClass = category.color === "primary" ? "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20" :
                                  category.color === "secondary" ? "bg-secondary/10 text-secondary border-secondary/30 hover:bg-secondary/20" :
                                  "bg-accent/10 text-accent border-accent/30 hover:bg-accent/20";
                
                return (
                  <span
                    key={i}
                    className={`group px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm ${colorClass} rounded-lg border hover:scale-105 transition-all cursor-default flex items-center gap-2`}
                  >
                    <SkillIcon className="w-0 h-4 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                    <span>{skill}</span>
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="glass p-4 md:p-6 rounded-lg">
        <h3 className="text-base md:text-lg font-semibold text-primary mb-3 md:mb-4">Proficiency Levels</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs md:text-sm mb-1">
              <span>Full-Stack Development</span>
              <span className="text-primary">95%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary w-[95%] rounded-full glow-cyan"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Machine Learning & AI</span>
              <span className="text-secondary">90%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-secondary to-accent w-[90%] rounded-full glow-purple"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>DSA & Problem Solving</span>
              <span className="text-accent">88%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-accent to-primary w-[88%] rounded-full glow-magenta"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
