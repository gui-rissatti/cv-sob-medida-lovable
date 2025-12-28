import { Check, Cloud, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AutosaveIndicatorProps {
  status: "saving" | "saved" | "error";
  className?: string;
}

export function AutosaveIndicator({ status, className }: AutosaveIndicatorProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm transition-opacity",
        status === "saved" && "text-muted-foreground",
        status === "saving" && "text-muted-foreground",
        status === "error" && "text-destructive",
        className
      )}
      role="status"
      aria-live="polite"
    >
      {status === "saving" && (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Salvando rascunho...</span>
        </>
      )}
      {status === "saved" && (
        <>
          <Cloud className="h-4 w-4" />
          <span>Rascunho salvo neste dispositivo</span>
        </>
      )}
      {status === "error" && (
        <>
          <span>Erro ao salvar</span>
        </>
      )}
    </div>
  );
}
