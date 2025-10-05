import { Card, CardContent } from "@/components/ui/card";
import { Code, Palette, Rocket, Users } from "lucide-react";

export const About = () => {
  const skills = [
    {
      icon: <Palette className="w-6 h-6 text-primary" />,
      title: "Contratos empresariais",
      description: "Reorganizações contratuais e societárias"
    },
    {
      icon: <Rocket className="w-6 h-6 text-primary" />,
      title: " Auditoria e LGPD",
      description: "Conformidade regulatória"
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Planejamento de negócios",
      description: "Atuação estratégica"
    }
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-8 tracking-wide">
              <span className="gradient-text">Serviços</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Direito de empresas e transações complexas.
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto mt-4 font-light">
              Os serviços incluem assessoria em todas as áreas do direito de empresas.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-base text-muted-foreground leading-relaxed font-light">
                A abordagem privilegia a discrição e a 
                customização de cada solução jurídica.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed font-light">
                Atendimento para clientes institucionais que valorizam excelência, 
                confidencialidade e precisão técnica. Cada mandato recebe atenção 
                dedicada e estratégias jurídicas sob medida.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Direito Societário", "Contratos Complexos", "Reestruturação", "Compliance"].map((expertise) => (
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
