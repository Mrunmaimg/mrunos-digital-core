import { Github } from "lucide-react";
import { Button } from "../ui/button";

const projects = [
  {
    title: "SkillCiti – AI-Powered Smart Hiring Platform",
    tech: ["React.js", "TypeScript", "Node.js", "Firebase", "LangChain", "Gemini"],
    description: [
      "Architected scalable microservices using Node.js and Firebase for real-time candidate processing and AI-driven shortlisting with 95% accuracy.",
      "Implemented an AI interview engine on Vapi and Gemini to generate interviews and auto-score performance.",
      "Finalist in Citi Ada Lovelace 2025 Hackathon for developing an AI-powered, bias-free recruitment platform leveraging distributed backend services."
    ],
    status: "Hackathon Finalist",
    github: "https://github.com/Mrunmaimg/Citi-Hackathon---SkillCiti--AI-powered-smart-hiring-platform"
  },
  {
    title: "Realtime Chat Application",
    tech: ["Node.js", "Express.js", "Socket.io", "JavaScript"],
    description: [
      "Built a real-time messaging application using WebSocket protocol with Socket.io for instant bidirectional communication.",
      "Implemented user authentication and message persistence with efficient event-driven architecture.",
      "Created responsive UI with real-time typing indicators and online/offline status updates."
    ],
    status: "Completed",
    github: "https://github.com/Mrunmaimg/Realtime-chat-nodejs-express-socketio"
  },
  {
    title: "Multiprogramming Operating System Simulation",
    tech: ["Java", "Operating System Concepts"],
    description: [
      "Simulated a multiprogramming OS in Java, executing 50 jobs with control cards ($AMJ, $DTA, $END).",
      "Implemented fixed-partition memory management with 4 partitions, incorporating paging and address translation.",
      "Handled instruction execution, I/O, and interrupt-driven events using status flags (SI, PI, TI) for efficient resource management."
    ],
    status: "Completed",
    github: "https://github.com/Mrunmaimg"
  },
  {
    title: "Brain Tumor Classification Using CNN",
    tech: ["Python", "TensorFlow", "Keras", "CNN", "OpenCV"],
    description: [
      "Developed a deep learning model using Convolutional Neural Networks for medical image classification.",
      "Achieved high accuracy in detecting and classifying brain tumors from MRI scans.",
      "Implemented data augmentation and preprocessing techniques to improve model performance."
    ],
    status: "Completed",
    github: "https://github.com/Mrunmaimg/Brain-Tumor-Classification-Using-CNN"
  },
  {
    title: "AI-Based System for Legal Proceedings",
    tech: ["Python", "NLP", "Transformers"],
    description: [
      "Built a real-time AI pipeline for legal transcription and multilingual translation (92% accuracy).",
      "Translated complex legal terminology into English, Hindi, and Marathi with 90% accuracy.",
      "Automated judgment analysis to summarize and predict outcomes, extracting actionable insights (88% accuracy)."
    ],
    status: "In Production",
    github: "https://github.com/Mrunmaimg"
  },
  {
    title: "Client-Server Food Ordering System",
    tech: ["C", "Socket Programming", "Client-Server Architecture"],
    description: [
      "Implemented a multi-threaded client-server application using TCP/IP sockets in C.",
      "Designed efficient communication protocol for real-time order processing and management.",
      "Handled concurrent client connections with proper synchronization and error handling."
    ],
    status: "Completed",
    github: "https://github.com/Mrunmaimg/Client-Server-Food-Ordering-System"
  },
  {
    title: "IoT Automated Street Light System",
    tech: ["Arduino", "IoT", "C++", "IR Sensors"],
    description: [
      "Developed IoT-based street lighting with IR sensors for vehicle and pedestrian detection.",
      "Implemented energy-saving brightness adjustment and blind turn indicators for enhanced safety.",
      "Created server-client architecture for real-time monitoring and control of street light network."
    ],
    status: "Completed",
    github: "https://github.com/Mrunmaimg/IoT-Automated-street-light-with-indicator-for-blind-turns-using-server-client"
  },
];

export const ProjectsWindow = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">Featured Projects</h2>
        <p className="text-xs md:text-sm text-muted-foreground">Building innovative solutions with AI and modern technologies</p>
      </div>

      {projects.map((project, index) => (
        <div key={index} className="glass p-4 md:p-6 rounded-lg space-y-3 md:space-y-4 hover:border-primary/50 transition-all">
          <div className="flex flex-col md:flex-row items-start justify-between gap-3 md:gap-4">
            <div className="flex-1 w-full">
              <h3 className="text-lg md:text-xl font-semibold text-primary mb-2 md:mb-3">{project.title}</h3>
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-2 py-0.5 md:py-1 text-xs bg-muted/50 text-primary rounded border border-primary/30">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <span className="px-2 md:px-3 py-1 text-xs bg-secondary/20 text-secondary rounded-full whitespace-nowrap">
              {project.status}
            </span>
          </div>

          <ul className="space-y-2">
            {project.description.map((desc, i) => (
              <li key={i} className="text-xs md:text-sm text-foreground/80 flex gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>

          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs gap-1"
              onClick={() => window.open(project.github, '_blank')}
            >
              <Github className="w-3 h-3" />
              Source Code
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
