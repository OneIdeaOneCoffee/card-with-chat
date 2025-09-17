import { Card, CardContent } from "@/components/ui/card";
import { Code, Palette, Rocket, Users } from "lucide-react";

export const About = () => {
  const skills = [
    {
      icon: <Code className="w-6 h-6 text-primary" />,
      title: "M&A",
      description: "Fusões e aquisições corporativas"
    },
    {
      icon: <Palette className="w-6 h-6 text-primary" />,
      title: "Reestruturação",
      description: "Reorganizações societárias complexas"
    },
    {
      icon: <Rocket className="w-6 h-6 text-primary" />,
      title: "Compliance",
      description: "Conformidade regulatória corporativa"
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Governança",
      description: "Governança corporativa estratégica"
    }
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-8 tracking-wide">
              <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Especialização consolidada em direito corporativo e transações complexas, 
              com histórico comprovado de sucesso em operações institucionais.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-base text-muted-foreground leading-relaxed font-light">
                Construímos uma trajetória sólida fundamentada em relacionamentos duradouros 
                e execução impecável. Nossa abordagem privilegia a discrição e a 
                customização de cada solução jurídica.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed font-light">
                Atendemos exclusivamente clientes institucionais que valorizam excelência, 
                confidencialidade e precisão técnica. Cada mandato recebe atenção 
                dedicada e estratégias jurídicas sob medida.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Fusões & Aquisições", "Direito Societário", "Contratos Complexos", "Reestruturação", "Compliance", "Governança"].map((expertise) => (
                  <span 
                    key={expertise}
                    className="px-4 py-2 bg-primary/8 text-primary rounded-full text-sm font-light"
                  >
                    {expertise}
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