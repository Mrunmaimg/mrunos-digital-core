import { ExternalLink, Award } from "lucide-react";
import { Button } from "../ui/button";

const certifications = [
  {
    title: "IBM DevOps and Software Engineering Specialization",
    issuer: "IBM",
    date: "April 2025",
    description: "Comprehensive specialization covering DevOps practices, CI/CD, containerization, and software engineering principles",
    link: "#",
    logo: "🔷",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford University and DeepLearning.AI",
    date: "March 2025",
    description: "In-depth course covering supervised learning, neural networks, and practical ML implementation strategies",
    link: "#",
    logo: "🎓",
  },
  {
    title: "NVIDIA Deep Learning",
    issuer: "NVIDIA",
    date: "September 2024",
    description: "Professional certification in deep learning frameworks, GPU computing, and neural network optimization",
    link: "#",
    logo: "🟢",
  },
];

export const CertificationsWindow = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
          <Award className="w-6 h-6" />
          Education & Certifications
        </h2>
        <p className="text-sm text-muted-foreground">Academic achievements and professional credentials</p>
      </div>

      {/* Education Section */}
      <div className="glass p-6 rounded-lg border border-primary/30">
        <h3 className="text-lg font-semibold text-primary mb-4">🎓 Education</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground">Secondary School Certificate (10th Standard)</h4>
            <p className="text-sm text-muted-foreground">CBSE Board</p>
            <p className="text-sm text-secondary mt-1">Percentage: 95.2%</p>
            <p className="text-xs text-muted-foreground mt-1">Completed in 2021</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {certifications.map((cert, index) => (
          <div key={index} className="glass p-6 rounded-lg hover:border-primary/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{cert.logo}</div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{cert.title}</h3>
                    <p className="text-sm text-foreground/80">{cert.issuer}</p>
                  </div>
                  <span className="text-xs text-secondary whitespace-nowrap">{cert.date}</span>
                </div>
                
                <p className="text-sm text-muted-foreground">{cert.description}</p>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs gap-1 mt-2"
                  onClick={() => window.open(cert.link, '_blank')}
                >
                  <ExternalLink className="w-3 h-3" />
                  View Certificate
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass p-6 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
        <h3 className="text-lg font-semibold text-primary mb-3">Certification Focus Areas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "DevOps & CI/CD",
            "Machine Learning",
            "Deep Learning",
            "Neural Networks",
            "Software Engineering",
            "GPU Computing",
          ].map((area, i) => (
            <div key={i} className="px-3 py-2 bg-muted/30 rounded text-sm text-center border border-primary/20">
              {area}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
