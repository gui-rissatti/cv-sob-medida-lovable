import { FileText, Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface FormStepSummaryProps {
  data: {
    professionalSummary: string;
  };
  onChange: (data: { professionalSummary: string }) => void;
}

export function FormStepSummary({ data, onChange }: FormStepSummaryProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Resumo Profissional
        </h2>
        <p className="text-muted-foreground">
          Um breve resumo das suas qualificações e objetivos (opcional — pode ser gerado automaticamente).
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="summary" className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Seu Resumo
          </Label>
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs h-7" disabled>
            <Sparkles className="h-3.5 w-3.5" />
            Gerar com IA (em breve)
          </Button>
        </div>
        <Textarea
          id="summary"
          placeholder="Profissional com X anos de experiência em [área], especializado em [competências principais]. Histórico comprovado em [realizações]. Busco contribuir com [objetivo]."
          value={data.professionalSummary}
          onChange={(e) => onChange({ professionalSummary: e.target.value })}
          className="min-h-[150px]"
        />
        <p className="text-xs text-muted-foreground">
          Dica: Mantenha entre 3-5 linhas. Destaque suas principais conquistas e diferenciais.
        </p>
      </div>

      {/* Example */}
      <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
        <p className="text-sm font-medium text-foreground">Exemplo:</p>
        <p className="text-sm text-muted-foreground italic">
          "Analista de Dados com 5 anos de experiência em empresas de tecnologia e varejo. 
          Expertise em Python, SQL e Power BI, com histórico de projetos que geraram economia 
          de R$ 2M+ em processos. Busco posição desafiadora em empresa orientada a dados."
        </p>
      </div>
    </div>
  );
}
