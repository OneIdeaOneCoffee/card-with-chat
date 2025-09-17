import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export const Portfolio = () => {
  const projects = [
    {
      title: "Aquisição Corporativa",
      description: "Assessoria jurídica em operação de M&A envolvendo empresa multinacional e target nacional de grande porte.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      technologies: ["M&A", "Due Diligence", "Contratos"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Reestruturação Societária",
      description: "Reorganização complexa de grupo empresarial com múltiplas jurisdições e otimização de estrutura corporativa.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
      technologies: ["Societário", "Reestruturação", "Governança"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Compliance Regulatório",
      description: "Implementação de programa de compliance abrangente para instituição financeira de grande porte.",
      image: "https://images.unsplash.com/photo-1554224154-26032fced8bd?w=600&h=400&fit=crop",
      technologies: ["Compliance", "Regulatório", "Financeiro"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Joint Venture Internacional",
      description: "Estruturação de joint venture complexa entre grupos brasileiros e estrangeiros no setor de tecnologia.",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop",
      technologies: ["Joint Venture", "Internacional", "Tecnologia"],
      demoUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-8 tracking-wide">
              <span className="gradient-text">Resultados</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Casos selecionados que demonstram nossa excelência técnica e 
              capacidade de execução em operações complexas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={index}
                className="group card-gradient shadow-card hover:shadow-elegant transition-smooth hover:scale-105 border-0 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-smooth group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-smooth" />
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-smooth">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90 transition-smooth"
                      asChild
                    >
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};