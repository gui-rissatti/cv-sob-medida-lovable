import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#como-funciona", label: "Como funciona" },
    { href: "#beneficios", label: "Benefícios" },
    { href: "#planos", label: "Planos" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-bold text-sm">
            CV
          </div>
          <span className="font-display font-semibold text-foreground">
            CV Sob Medida
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Entrar
          </Button>
          <Button variant="outline" size="sm">
            Criar conta
          </Button>
          <Button asChild size="sm">
            <Link to="/app">Construir meu CV</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="outline" size="sm" className="w-full">
                Entrar
              </Button>
              <Button variant="secondary" size="sm" className="w-full">
                Criar conta
              </Button>
              <Button asChild size="sm" className="w-full">
                <Link to="/app">Construir meu CV</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
