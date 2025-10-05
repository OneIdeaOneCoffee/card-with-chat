import { Linkedin, Mail, Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary/5 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-xl font-light gradient-text tracking-wide">Sampaio</h3>
              <p className="text-muted-foreground font-light text-sm">
                Consultoria e Assessoria jurídica.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Links Rápidos</h4>
              <div className="space-y-2">
                {[
                  { label: "Início", id: "hero" },
                  { label: "Serviços", id: "about" },
                  { label: "Contato", id: "contact" }
                ].map((link) => (
                  <button
                    key={link.id}
                    onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="block text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Contato</h4>
              <div className="space-y-2 text-muted-foreground text-sm font-light">
                <p>contato@advogado.advs.br</p>
                <p>+55 (11) 3000-0000</p>
                <p>São Paulo, Brasil</p>
              </div>
            </div>
          </div>

          {/* Social Links & Copyright */}
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Desenvolvido por procedimento interno</span>
            </div>

            <div className="flex gap-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 transition-smooth"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
              <a 
                href="mailto:contato@advogado.advs.br"
                className="p-2 rounded-full hover:bg-primary/10 transition-smooth"
              >
                <Mail className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
            </div>

            <p className="text-muted-foreground text-sm font-light">
              © {currentYear} Consultoria Jurídica. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
