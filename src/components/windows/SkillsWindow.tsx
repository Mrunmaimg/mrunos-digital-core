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
              {category.skills.map((skill, i) => (
                <span
                  key={i}
                  className={`px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm bg-${category.color}/10 text-${category.color} rounded-lg border border-${category.color}/30 hover:scale-105 transition-transform cursor-default`}
                >
                  {skill}
                </span>
              ))}
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
