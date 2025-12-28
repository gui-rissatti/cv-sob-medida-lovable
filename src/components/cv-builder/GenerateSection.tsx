import { Sparkles, Trash2, Save, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GenerateSectionProps {
  canGenerate: boolean;
  isGenerating: boolean;
  remainingCredits: number;
  onGenerate: () => void;
  onClear: () => void;
  onSaveDraft?: () => void;
  disabledReason?: string;
}

export function GenerateSection({
  canGenerate,
  isGenerating,
  remainingCredits,
  onGenerate,
  onClear,
  onSaveDraft,
  disabledReason,
}: GenerateSectionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-display text-lg font-semibold text-foreground">Gerar</h3>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <Button
          variant="hero"
          size="lg"
          onClick={onGenerate}
          disabled={!canGenerate || isGenerating}
          className={cn("gap-2 flex-1 sm:flex-none", !canGenerate && "opacity-50")}
        >
          <Sparkles className="h-5 w-5" />
          {isGenerating ? "Gerando…" : "Gerar CV sob medida"}
        </Button>

        <div className="flex gap-2">
          {onSaveDraft && (
            <Button variant="outline" size="lg" onClick={onSaveDraft} className="gap-2">
              <Save className="h-4 w-4" />
              Salvar rascunho
            </Button>
          )}
          <Button variant="ghost" size="lg" onClick={onClear} className="gap-2 text-muted-foreground">
            <Trash2 className="h-4 w-4" />
            Limpar
          </Button>
        </div>
      </div>

      {/* Disabled reason */}
      {!canGenerate && disabledReason && (
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <Info className="h-4 w-4" />
          {disabledReason}
        </p>
      )}

      {/* Usage info */}
      <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted/30 rounded-lg px-4 py-3">
        <p>
          <Info className="h-4 w-4 inline mr-1.5" />
          1 uso é descontado somente quando a geração for concluída com sucesso.
        </p>
        <p className="font-medium">
          <span className="text-foreground">{remainingCredits}</span> usos restantes
        </p>
      </div>
    </div>
  );
}
