import { Briefcase, Users, Trophy } from "lucide-react";

const experiences = [
  {
    role: "Vice President",
    organization: "ISA VIT Pune Students Section",
    location: "Vishwakarma Institute of Technology, Pune, MH",
    period: "July 2024 — July 2025",
    description: [
      "Led CV and robotics projects with 90 students, fostering innovation and technical excellence.",
      "Organized 5+ workshops including 'Ingenious' and 'ROSception', providing hands-on learning experiences.",
      "Hosted 3 industry talks including a cybersecurity session by an ex-Google speaker, connecting students with industry experts."
    ],
    icon: Trophy,
  },
  {
    role: "Robotics Mentor",
    organization: "Catalyst",
    location: "Vishwakarma Institute of Technology, Pune, MH",
    period: "Aug 2023 — June 2024",
    description: [
      "Mentored 100+ first-year students in robotics and programming fundamentals.",
      "Spearheaded initiatives that guided 30+ students to achieve top rankings in competitions.",
      "Developed comprehensive curriculum covering Arduino, sensors, and robotic systems."
    ],
    icon: Users,
  },
];

export const ExperienceWindow = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
          <Briefcase className="w-6 h-6" />
          Leadership & Experience
        </h2>
        <p className="text-sm text-muted-foreground">Mentoring, organizing, and leading technical initiatives</p>
      </div>

      {experiences.map((exp, index) => (
        <div key={index} className="glass p-6 rounded-lg space-y-4 hover:border-primary/50 transition-all">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <exp.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-primary">{exp.role}</h3>
              <p className="text-foreground font-medium">{exp.organization}</p>
              <p className="text-sm text-muted-foreground">{exp.location}</p>
              <p className="text-sm text-secondary mt-1">{exp.period}</p>
            </div>
          </div>

          <ul className="space-y-2">
            {exp.description.map((desc, i) => (
              <li key={i} className="text-sm text-foreground/80 flex gap-2">
                <span className="text-primary">▸</span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="glass p-6 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
        <h3 className="text-lg font-semibold text-primary mb-3">Impact Metrics</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-primary">190+</div>
            <div className="text-sm text-muted-foreground">Students Mentored</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-secondary">8+</div>
            <div className="text-sm text-muted-foreground">Events Organized</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent">30+</div>
            <div className="text-sm text-muted-foreground">Top Rankings</div>
          </div>
        </div>
      </div>
    </div>
  );
};
