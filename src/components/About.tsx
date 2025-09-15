import { Card, CardContent } from "@/components/ui/card";
import { Code, Palette, Rocket, Users } from "lucide-react";

export const About = () => {
  const skills = [
    {
      icon: <Code className="w-6 h-6 text-primary" />,
      title: "Planejamento",
      description: "Estratégias patrimoniais personalizadas"
    },
    {
      icon: <Palette className="w-6 h-6 text-primary" />,
      title: "Estruturação",
      description: "Soluções financeiras sofisticadas"
    },
    {
      icon: <Rocket className="w-6 h-6 text-primary" />,
      title: "Gestão",
      description: "Administração ativa de portfólios"
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Relacionamento",
      description: "Atendimento exclusivo e confidencial"
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
              Especialização consolidada em gestão patrimonial e consultoria estratégica, 
              com histórico comprovado de resultados excepcionais.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-base text-muted-foreground leading-relaxed font-light">
                Construí uma trajetória sólida fundamentada em relacionamentos duradouros 
                e resultados consistentes. Nossa abordagem privilegia a discrição e a 
                personalização de cada estratégia.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed font-light">
                Atendemos exclusivamente famílias e empresas que valorizam tradição, 
                confidencialidade e excelência na gestão de seus ativos. Cada cliente 
                recebe atenção dedicada e soluções sob medida.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Gestão Patrimonial", "Private Banking", "Family Office", "Sucessão", "Investimentos", "Planejamento"].map((expertise) => (
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