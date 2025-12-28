import { Plus, Clock, FileText, MoreVertical, Trash2, Copy, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CVHistoryItem } from "@/types/cv";

interface HistorySidebarProps {
  items: CVHistoryItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDuplicate: (id: string) => void;
  onRename: (id: string) => void;
  onDelete: (id: string) => void;
}

export function HistorySidebar({
  items,
  activeId,
  onSelect,
  onNew,
  onDuplicate,
  onRename,
  onDelete,
}: HistorySidebarProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "Agora há pouco";
    if (diffHours < 24) return `há ${diffHours}h`;
    if (diffDays === 1) return "ontem";
    if (diffDays < 7) return `há ${diffDays} dias`;
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  };

  const statusConfig: Record<CVHistoryItem["status"], { label: string; variant: "default" | "secondary" | "outline" }> = {
    draft: { label: "Rascunho", variant: "secondary" },
    generated: { label: "Gerado", variant: "default" },
    exported: { label: "Exportado", variant: "outline" },
  };

  return (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 className="font-display text-lg font-semibold text-sidebar-foreground">
          Histórico
        </h2>
        <Button size="sm" variant="default" onClick={onNew} className="gap-1.5">
          <Plus className="h-4 w-4" />
          Novo
        </Button>
      </div>

      {/* List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {items.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              <FileText className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p>Nenhum CV ainda.</p>
              <p className="text-xs mt-1">Clique em "Novo" para começar.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "group relative flex flex-col gap-1 rounded-lg p-3 cursor-pointer transition-colors",
                  "hover:bg-sidebar-accent",
                  activeId === item.id && "bg-sidebar-accent"
                )}
                onClick={() => onSelect(item.id)}
              >
                {/* Title row */}
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium text-sm text-sidebar-foreground line-clamp-1">
                    {item.name || "CV sem nome"}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => onRename(item.id)}>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Renomear
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDuplicate(item.id)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(item.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Meta row */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(item.updatedAt)}</span>
                  <Badge variant={statusConfig[item.status].variant} className="text-[10px] px-1.5 py-0">
                    {statusConfig[item.status].label}
                  </Badge>
                </div>

                {/* Target job */}
                {item.targetJob && (
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    {item.targetJob}
                    {item.companyName && ` — ${item.companyName}`}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-border p-3">
        <p className="text-[11px] text-muted-foreground text-center">
          {items.length} {items.length === 1 ? "CV" : "CVs"} no histórico
        </p>
      </div>
    </div>
  );
}
