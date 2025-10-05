import { Button } from "@/components/ui/button";
import { ArrowDown, Linkedin, Mail } from "lucide-react";

export const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 hero-gradient opacity-10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h2 className="text-5xl md:text-7xl font-light mb-8 tracking-wide">
            <span className="gradient-text">Advocacia</span>
          </h2>
          
          <h3 className="text-xl md:text-2xl text-muted-foreground mb-8 font-light tracking-wide">
            Consultoria Jurídica
          </h3>
          
          <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Assessoria jurídica para empresas, organizações e instituições,
            com foco em operações.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 shadow-elegant transition-smooth"
              onClick={() => scrollToSection('about')}
            >
              Ver Serviços
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
              onClick={() => scrollToSection('contact')}
            >
              Agende consulta estratégica
            </Button>
          </div>

          <div className="flex gap-6 justify-center">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card shadow-card hover:shadow-elegant transition-smooth hover:scale-110"
            >
              <Linkedin className="w-6 h-6 text-primary" />
            </a>
            <a 
              href="mailto:contato@sampaio.advs.br"
              className="p-3 rounded-full bg-card shadow-card hover:shadow-elegant transition-smooth hover:scale-110"
            >
              <Mail className="w-6 h-6 text-primary" />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown 
            className="w-6 h-6 text-primary cursor-pointer" 
            onClick={() => scrollToSection('about')}
          />
        </div>
      </div>
    </section>
  );
};
