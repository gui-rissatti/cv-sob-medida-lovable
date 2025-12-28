import { ChevronLeft, Download, Share2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GeneratedCV } from "@/types/cv";

interface CVPreviewProps {
  generatedCV: GeneratedCV;
  cvName: string;
  onBack: () => void;
  onExport: () => void;
}

export function CVPreview({ generatedCV, cvName, onBack, onExport }: CVPreviewProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4 bg-background">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Voltar para edição
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Share2 className="h-4 w-4" />
            Compartilhar
          </Button>
          <Button size="sm" onClick={onExport} className="gap-1.5">
            <Download className="h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* Preview */}
      <ScrollArea className="flex-1 bg-muted/50">
        <div className="flex justify-center p-8">
          {/* A4 Page simulation */}
          <Card className="w-[210mm] min-h-[297mm] bg-card shadow-lg p-12 space-y-6">
            {/* Header */}
            <div className="text-center pb-4 border-b border-border">
              <h1 className="font-display text-3xl font-bold text-foreground mb-1">
                {generatedCV.headline}
              </h1>
              <p className="text-sm text-muted-foreground">{generatedCV.contact}</p>
            </div>

            {/* Summary */}
            <section className="space-y-2">
              <h2 className="font-display text-lg font-semibold text-primary uppercase tracking-wide">
                Resumo Profissional
              </h2>
              <p className="text-sm text-foreground leading-relaxed">{generatedCV.summary}</p>
            </section>

            {/* Experience */}
            <section className="space-y-4">
              <h2 className="font-display text-lg font-semibold text-primary uppercase tracking-wide">
                Experiência Profissional
              </h2>
              {generatedCV.experienceBlocks.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="font-semibold text-foreground">{exp.role}</h3>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="text-sm text-foreground">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Education */}
            <section className="space-y-3">
              <h2 className="font-display text-lg font-semibold text-primary uppercase tracking-wide">
                Formação Acadêmica
              </h2>
              {generatedCV.educationBlocks.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {edu.degree} em {edu.field}
                    </h3>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{edu.year}</span>
                </div>
              ))}
            </section>

            {/* Skills */}
            <section className="space-y-2">
              <h2 className="font-display text-lg font-semibold text-primary uppercase tracking-wide">
                Habilidades
              </h2>
              <div className="flex flex-wrap gap-2">
                {generatedCV.skills.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Languages */}
            <section className="space-y-2">
              <h2 className="font-display text-lg font-semibold text-primary uppercase tracking-wide">
                Idiomas
              </h2>
              <div className="flex flex-wrap gap-4">
                {generatedCV.languages.map((lang, i) => (
                  <span key={i} className="text-sm text-foreground">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-muted-foreground"> — {lang.level}</span>
                  </span>
                ))}
              </div>
            </section>
          </Card>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-border p-4 bg-background flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Pronto! Seu PDF está otimizado para ATS.
        </p>
      </div>
    </div>
  );
}
