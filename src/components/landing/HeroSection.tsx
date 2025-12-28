import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, FileText, Sparkles, Download } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/30 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-6 animate-fade-in">
            <Badge variant="secondary" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              3 gerações grátis para testar
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground">
              Seu CV sob medida{" "}
              <span className="text-primary">para cada vaga.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Envie seu CV ou LinkedIn, cole a descrição da vaga e gere uma
              versão otimizada para ATS em minutos.
            </p>

            <ul className="space-y-3">
              {[
                "Destaque as experiências mais relevantes para a vaga",
                "Sugestões claras para melhorar impacto e palavras-chave",
                "Edite, salve versões e exporte em PDF",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="shadow-lg"><Link to="/app">Construir meu CV</Link></Button>
              <Button variant="outline" size="lg">
                Criar conta
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Comece sem cadastro. Crie conta apenas na hora de gerar.
            </p>
          </div>

          {/* Right: CV Preview Mock */}
          <div className="relative animate-slide-up hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl blur-3xl" />
            <div className="relative bg-card rounded-2xl shadow-lg border border-border p-6 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* Mock CV Preview */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="h-4 w-32 bg-foreground/80 rounded" />
                    <div className="h-3 w-24 bg-muted-foreground/40 rounded mt-1.5" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <div className="h-3 w-20 bg-primary/60 rounded" />
                    <div className="h-2.5 w-full bg-muted rounded" />
                    <div className="h-2.5 w-4/5 bg-muted rounded" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="h-3 w-24 bg-primary/60 rounded" />
                    <div className="flex gap-2">
                      {["Python", "React", "SQL"].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="h-3 w-28 bg-primary/60 rounded" />
                    <div className="h-2.5 w-full bg-muted rounded" />
                    <div className="h-2.5 w-3/4 bg-muted rounded" />
                    <div className="h-2.5 w-5/6 bg-muted rounded" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex gap-1.5">
                    <Badge variant="outline" className="text-xs">ATS-friendly</Badge>
                    <Badge variant="outline" className="text-xs">1 página</Badge>
                  </div>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
