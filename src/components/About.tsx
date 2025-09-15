import { Card, CardContent } from "@/components/ui/card";
import { Code, Palette, Rocket, Users } from "lucide-react";

export const About = () => {
  const skills = [
    {
      icon: <Code className="w-8 h-8 text-primary" />,
      title: "Desenvolvimento",
      description: "React, Next.js, Node.js, TypeScript, Python"
    },
    {
      icon: <Palette className="w-8 h-8 text-primary" />,
      title: "Design",
      description: "UI/UX Design, Figma, Adobe Creative Suite"
    },
    {
      icon: <Rocket className="w-8 h-8 text-primary" />,
      title: "DevOps",
      description: "AWS, Docker, CI/CD, Terraform, Kubernetes"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Metodologias",
      description: "Agile, Scrum, Design Thinking, Clean Code"
    }
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Sobre Mim</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Desenvolvedor apaixonado por tecnologia com mais de 5 anos de experiência 
              criando soluções digitais inovadoras e centradas no usuário.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Minha jornada na tecnologia começou com a curiosidade de entender como as 
                coisas funcionam. Hoje, combino expertise técnica com sensibilidade de design 
                para criar experiências digitais que realmente fazem a diferença.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Especializo-me em desenvolvimento full-stack moderno, com foco em React, 
                Node.js e arquiteturas escaláveis. Acredito que o melhor código é aquele 
                que resolve problemas reais de forma elegante e eficiente.
              </p>
              <div className="flex flex-wrap gap-3">
                {["React", "TypeScript", "Node.js", "Python", "AWS", "Figma"].map((tech) => (
                  <span 
                    key={tech}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <Card 
                  key={index} 
                  className="card-gradient shadow-card hover:shadow-elegant transition-smooth hover:scale-105 border-0"
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      {skill.icon}
                    </div>
                    <h3 className="font-semibold mb-2 text-foreground">{skill.title}</h3>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};