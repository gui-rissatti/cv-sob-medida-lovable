import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";

export function BeforeAfterSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Veja a diferença
          </h2>
          <p className="text-muted-foreground text-lg">
            Compare um CV genérico com um CV sob medida para a vaga.
          </p>
        </div>

        <Tabs defaultValue="before" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="before" className="gap-2">
              <XCircle className="h-4 w-4" />
              Antes (genérico)
            </TabsTrigger>
            <TabsTrigger value="after" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Depois (sob medida)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="before" className="animate-fade-in">
            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-border pb-4">
                  <h3 className="text-xl font-display font-semibold text-foreground">
                    João da Silva
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Desenvolvedor de Software
                  </p>
                </div>

                {/* Summary */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Resumo
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Profissional com experiência em desenvolvimento de software.
                    Trabalhei com diversas tecnologias e projetos variados.
                    Busco novas oportunidades para crescer na carreira.
                  </p>
                </div>

                {/* Experience */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Experiência
                  </h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Desenvolvi sistemas web</p>
                    <p>• Participei de reuniões de equipe</p>
                    <p>• Trabalhei com banco de dados</p>
                    <p>• Ajudei em projetos diversos</p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Habilidades
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["JavaScript", "Python", "Java", "C++", "PHP", "Ruby", "Go", "Swift"].map(
                      (skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      )
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-destructive text-sm">
                    <XCircle className="h-4 w-4" />
                    <span>Genérico, sem foco, difícil de filtrar pelo ATS</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="after" className="animate-fade-in">
            <div className="bg-card rounded-xl border-2 border-primary/30 p-6 md:p-8 shadow-lg">
              <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-border pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-display font-semibold text-foreground">
                      João da Silva
                    </h3>
                    <Badge className="text-xs">Otimizado</Badge>
                  </div>
                  <p className="text-primary font-medium text-sm">
                    Desenvolvedor Full Stack React + Node.js
                  </p>
                </div>

                {/* Summary */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Resumo
                  </h4>
                  <p className="text-foreground text-sm leading-relaxed">
                    Desenvolvedor Full Stack com <strong>4 anos de experiência</strong> em
                    aplicações web com <strong>React, Node.js e PostgreSQL</strong>.
                    Especialista em criar interfaces responsivas e APIs escaláveis.
                    Reduzi tempo de carregamento em <strong>40%</strong> no último projeto.
                  </p>
                </div>

                {/* Experience */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Experiência relevante
                  </h4>
                  <div className="space-y-2 text-sm text-foreground">
                    <p>
                      • Desenvolvi <strong>dashboard React</strong> com +50k usuários ativos
                    </p>
                    <p>
                      • Implementei <strong>API REST</strong> em Node.js com latência {"<"}100ms
                    </p>
                    <p>
                      • Otimizei queries <strong>PostgreSQL</strong>, reduzindo tempo de resposta em 60%
                    </p>
                    <p>
                      • Liderei migração para <strong>TypeScript</strong>, eliminando 80% dos bugs em produção
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Habilidades-chave para a vaga
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Node.js", "TypeScript", "PostgreSQL", "REST APIs"].map(
                      (skill) => (
                        <Badge key={skill} className="text-xs">
                          {skill}
                        </Badge>
                      )
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Focado, com métricas, alinhado à vaga e ATS-friendly</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
