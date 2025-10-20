import { Mail, Phone, Github, Linkedin, Code, ExternalLink, FileText } from "lucide-react";
import { Button } from "../ui/button";

const contacts = [
  {
    label: "Email",
    value: "mrunmaimg@gmail.com",
    icon: Mail,
    link: "mailto:mrunmaimg@gmail.com",
    color: "primary",
  },
  {
    label: "Phone",
    value: "+91 9179495787",
    icon: Phone,
    link: "tel:+919179495787",
    color: "secondary",
  },
  {
    label: "GitHub",
    value: "github.com/Mrunmaimg",
    icon: Github,
    link: "https://github.com/Mrunmaimg",
    color: "accent",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mrunmai-girame",
    icon: Linkedin,
    link: "https://www.linkedin.com/in/mrunmai-girame/",
    color: "primary",
  },
  {
    label: "LeetCode",
    value: "leetcode.com/mrunmaimg",
    icon: Code,
    link: "https://leetcode.com/mrunmaimg",
    color: "secondary",
  },
];

export const ContactWindow = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">Get In Touch</h2>
        <p className="text-sm text-muted-foreground">Feel free to reach out for collaborations, opportunities, or just to say hi!</p>
      </div>

      <div className="space-y-3">
        {contacts.map((contact, index) => (
          <a
            key={index}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-4 rounded-lg flex items-center gap-4 hover:border-primary/50 transition-all group"
          >
            <div className={`w-12 h-12 rounded-lg bg-${contact.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <contact.icon className={`w-6 h-6 text-${contact.color}`} />
            </div>
            
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">{contact.label}</div>
              <div className="text-foreground font-medium">{contact.value}</div>
            </div>
            
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        ))}
      </div>

      <div className="glass p-6 rounded-lg bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border border-primary/20">
        <h3 className="text-lg font-semibold text-primary mb-4">Quick Links</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="hover:bg-primary/20 hover:border-primary" asChild>
            <a href="https://github.com/Mrunmaimg" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-1" />
              GitHub Profile
            </a>
          </Button>
          <Button variant="outline" size="sm" className="hover:bg-primary/20 hover:border-primary" asChild>
            <a href="https://www.linkedin.com/in/mrunmai-girame/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4 mr-1" />
              LinkedIn Profile
            </a>
          </Button>
          <Button variant="outline" size="sm" className="hover:bg-primary/20 hover:border-primary" asChild>
            <a href="https://drive.google.com/file/d/1okz1Q_5hcRB2H69GJNP3EfwdlmRalZ7t/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
              <FileText className="w-4 h-4 mr-1" />
              View Resume
            </a>
          </Button>
          <Button variant="outline" size="sm" className="hover:bg-primary/20 hover:border-primary" asChild>
            <a href="mailto:mrunmaimg@gmail.com">
              <Mail className="w-4 h-4 mr-1" />
              Send Email
            </a>
          </Button>
        </div>
      </div>

      <div className="text-center p-4 glass rounded-lg">
        <p className="text-sm text-muted-foreground">
          Available for full-time opportunities and freelance projects
        </p>
        <p className="text-xs text-primary mt-2">Response time: Usually within 24 hours</p>
      </div>
    </div>
  );
};
