import { FileText, HelpCircle, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export function Header({ onLoginClick, onRegisterClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            CV Sob Medida
          </span>
        </a>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            <HelpCircle className="h-4 w-4" />
            Ajuda
          </Button>
          
          <div className="h-6 w-px bg-border hidden sm:block" />
          
          <Button variant="ghost" size="sm" onClick={onLoginClick}>
            <LogIn className="h-4 w-4" />
            Entrar
          </Button>
          
          <Button variant="default" size="sm" onClick={onRegisterClick}>
            <UserPlus className="h-4 w-4" />
            Criar conta
          </Button>
        </nav>
      </div>
    </header>
  );
}
