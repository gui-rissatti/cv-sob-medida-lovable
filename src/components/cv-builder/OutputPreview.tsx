import { FileText, Check, Sparkles, Target, BarChart3, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GenerationSettings } from "@/types/cv";

interface OutputPreviewProps {
  settings: GenerationSettings;
  hasJobDescription: boolean;
  companyName?: string;
}

export function OutputPreview({ settings, hasJobDescription, companyName }: OutputPreviewProps) {
  const lengthLabel = settings.length === "1page" ? "1 página" : "2 páginas";
  const languageLabel = settings.language === "pt-BR" ? "Português" : "Inglês";

  const highlights = [
    { icon: Check, label: "ATS-friendly", active: true },
    { icon: Target, label: hasJobDescription ? "Alinhado à vaga" : "Estrutura profissional", active: true },
    { icon: BarChart3, label: "Bullets com impacto", active: settings.focus === "impacto" },
    { icon: FileText, label: lengthLabel, active: true },
    { icon: Globe, label: languageLabel, active: true },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 text-primary">
          <Sparkles className="h-5 w-5" />
          <h2 className="font-display text-xl font-semibold text-foreground">
            Seu CV sob medida
          </h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {hasJobDescription
            ? `Geramos um CV otimizado ${companyName ? `para ${companyName}` : "para a vaga"}, pronto para editar e exportar.`
            : "Geramos um CV profissional e bem estruturado, pronto para personalizar."}
        </p>
      </div>

      {/* Preview skeleton + highlights */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* CV Preview skeleton */}
        <Card className="p-4 bg-card relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="text-[10px]">Prévia</Badge>
          </div>
          
          {/* Mini CV skeleton */}
          <div className="space-y-3 pt-4">
            {/* Header */}
            <div className="space-y-1.5 pb-2 border-b border-border">
              <div className="h-3 w-24 bg-primary/20 rounded animate-pulse" />
              <div className="h-2 w-36 bg-muted rounded" />
            </div>

            {/* Summary */}
            <div className="space-y-1">
              <div className="h-2 w-16 bg-primary/30 rounded" />
              <div className="space-y-0.5">
                <div className="h-1.5 w-full bg-muted/60 rounded" />
                <div className="h-1.5 w-4/5 bg-muted/60 rounded" />
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-1">
              <div className="h-2 w-20 bg-primary/30 rounded" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                  <div className="h-1.5 w-3/4 bg-muted/60 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                  <div className="h-1.5 w-2/3 bg-muted/60 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                  <div className="h-1.5 w-4/5 bg-muted/60 rounded" />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-1">
              <div className="h-2 w-18 bg-primary/30 rounded" />
              <div className="flex gap-1 flex-wrap">
                <div className="h-3 w-12 bg-accent rounded-full" />
                <div className="h-3 w-10 bg-accent rounded-full" />
                <div className="h-3 w-14 bg-accent rounded-full" />
                <div className="h-3 w-8 bg-accent rounded-full" />
              </div>
            </div>
          </div>

          {/* Second page indicator */}
          {settings.length === "2pages" && (
            <div className="mt-2 pt-2 border-t border-dashed border-border">
              <div className="h-2 w-12 bg-muted/40 rounded mx-auto" />
            </div>
          )}
        </Card>

        {/* Highlights */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">O que você vai receber:</h3>
          <div className="space-y-2">
            {highlights.filter(h => h.active).map((highlight, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <highlight.icon className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-foreground">{highlight.label}</span>
              </div>
            ))}
          </div>

          {/* Expected impact */}
          {hasJobDescription && (
            <Card className="p-3 bg-accent/30 border-accent mt-4">
              <p className="text-xs font-medium text-accent-foreground mb-1.5">
                Ajustes para esta vaga:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-primary" />
                  Palavras-chave alinhadas à descrição
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-primary" />
                  Experiências priorizadas por relevância
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-primary" />
                  Resumo personalizado para o cargo
                </li>
              </ul>
            </Card>
          )}

          {!hasJobDescription && (
            <p className="text-xs text-muted-foreground italic">
              Cole a descrição da vaga para aumentar a relevância do CV.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
