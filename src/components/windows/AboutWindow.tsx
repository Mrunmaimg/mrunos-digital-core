import { GraduationCap, MapPin, Mail, Phone } from "lucide-react";

export const AboutWindow = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl md:text-4xl font-bold glow-cyan">
          MG
        </div>
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Mrunmai Manoj Girame</h2>
          <p className="text-sm md:text-base text-muted-foreground mb-4">Software Developer | AI Enthusiast | Java Spring Boot Backend Developer</p>
          
          <div className="space-y-2 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <span>+91 9179495787</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>mrunmaimg@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Pune, Maharashtra</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass p-4 rounded-lg">
        <h3 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          Education
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground">Bachelor of Technology - Information Technology</h4>
            <p className="text-sm text-muted-foreground">Vishwakarma Institute of Technology, Pune</p>
            <p className="text-sm text-primary">CGPA: 8.73 | Nov 2022 – May 2026</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">12th Standard (PCMB)</h4>
            <p className="text-sm text-muted-foreground">St. Theresa's Girls' School, Bhopal</p>
            <p className="text-sm text-primary">Percentage: 92.4% | May 2021 – May 2022</p>
          </div>
        </div>
      </div>

      <div className="glass p-4 rounded-lg">
        <h3 className="text-xl font-semibold text-secondary mb-3">About Me</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">
          I'm a passionate software developer specializing in AI, full-stack development, and robotics. 
          With a strong foundation in computer science fundamentals and hands-on experience in building 
          scalable applications, I love creating innovative solutions that make a difference. Currently 
          pursuing my B.Tech at VIT Pune, I've led multiple robotics initiatives and won several national 
          hackathons. I'm always eager to learn new technologies and contribute to impactful projects.
        </p>
      </div>
    </div>
  );
};
