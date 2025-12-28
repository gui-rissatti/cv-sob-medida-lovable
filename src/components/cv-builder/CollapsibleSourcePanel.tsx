import { useState, useEffect } from "react";
import { ChevronDown, FileText, Linkedin, Check, RefreshCw, Eye, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { SourceUpload, SourceType, UploadStatus } from "./SourceUpload";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

interface DefaultCV {
  fileName: string;
  updatedAt: string;
}

interface CollapsibleSourcePanelProps {
  sourceType: SourceType;
  onSourceTypeChange: (type: SourceType) => void;
  uploadedFile: UploadedFile | null;
  linkedinUrl: string;
  uploadStatus: UploadStatus;
  onFileUpload: (file: File) => void;
  onFileRemove: () => void;
  onLinkedinChange: (url: string) => void;
  errorMessage?: string;
  defaultCV?: DefaultCV;
  useDefaultCV: boolean;
  onUseDefault: () => void;
  onUploadNew: () => void;
}

const STORAGE_KEY = "cv-source-collapsed";

export function CollapsibleSourcePanel({
  sourceType,
  onSourceTypeChange,
  uploadedFile,
  linkedinUrl,
  uploadStatus,
  onFileUpload,
  onFileRemove,
  onLinkedinChange,
  errorMessage,
  defaultCV,
  useDefaultCV,
  onUseDefault,
  onUploadNew,
}: CollapsibleSourcePanelProps) {
  // Initialize collapsed state based on whether there's a default CV
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === "undefined") return !defaultCV;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return stored !== "true";
    // Default: collapsed if has default CV, open otherwise
    return !defaultCV;
  });

  // Auto-collapse when default CV exists and nothing is uploaded
  useEffect(() => {
    if (defaultCV && !uploadedFile && !linkedinUrl) {
      setIsOpen(false);
      onUseDefault();
    }
  }, [defaultCV]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(!isOpen));
  }, [isOpen]);

  const hasSource = uploadedFile !== null || useDefaultCV || 
    (sourceType === "linkedin" && linkedinUrl.includes("linkedin.com/in/"));

  const getSourceSummary = () => {
    if (useDefaultCV && defaultCV) {
      return {
        type: "default",
        label: `CV padrão — ${defaultCV.fileName}`,
        sublabel: `Atualizado em ${defaultCV.updatedAt}`,
        icon: FileText,
      };
    }
    if (uploadedFile) {
      return {
        type: "upload",
        label: uploadedFile.name,
        sublabel: "Novo arquivo enviado",
        icon: FileText,
      };
    }
    if (linkedinUrl && linkedinUrl.includes("linkedin.com/in/")) {
      const username = linkedinUrl.split("linkedin.com/in/")[1]?.split("/")[0] || "";
      return {
        type: "linkedin",
        label: `LinkedIn — /in/${username}`,
        sublabel: "Perfil vinculado",
        icon: Linkedin,
      };
    }
    return null;
  };

  const summary = getSourceSummary();

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className={cn(
        "transition-colors",
        !isOpen && hasSource && "bg-accent/30 border-accent"
      )}>
        <CollapsibleTrigger asChild>
          <button
            className="w-full flex items-center justify-between p-4 text-left hover:bg-accent/50 transition-colors rounded-t-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-expanded={isOpen}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "h-9 w-9 rounded-lg flex items-center justify-center",
                hasSource ? "bg-primary/10" : "bg-muted"
              )}>
                {summary ? (
                  <summary.icon className="h-5 w-5 text-primary" />
                ) : (
                  <Upload className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">Fonte do CV</span>
                  {useDefaultCV && defaultCV && (
                    <Badge variant="secondary" className="text-[10px]">Padrão</Badge>
                  )}
                  {hasSource && !isOpen && (
                    <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                      <Check className="h-3 w-3 mr-1" />
                      Pronto
                    </Badge>
                  )}
                </div>
                {!isOpen && summary && (
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    Usando: {summary.label}
                  </p>
                )}
                {!isOpen && !summary && (
                  <p className="text-sm text-muted-foreground">
                    Envie um CV ou forneça seu LinkedIn
                  </p>
                )}
              </div>
            </div>
            <ChevronDown className={cn(
              "h-5 w-5 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )} />
          </button>
        </CollapsibleTrigger>

        {/* Collapsed actions */}
        {!isOpen && hasSource && (
          <div className="px-4 pb-3 flex items-center gap-2 border-t border-border/50 pt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
              className="text-xs gap-1.5"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Trocar fonte
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs gap-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              <Eye className="h-3.5 w-3.5" />
              Ver detalhes
            </Button>
          </div>
        )}

        <CollapsibleContent>
          <div className="px-4 pb-4 pt-2 border-t border-border/50">
            {/* Show default CV option if available */}
            {defaultCV && !useDefaultCV && (
              <div className="mb-4 p-3 rounded-lg bg-accent/50 border border-accent flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Usar CV padrão?</p>
                    <p className="text-xs text-muted-foreground">
                      {defaultCV.fileName} • Atualizado em {defaultCV.updatedAt}
                    </p>
                  </div>
                </div>
                <Button size="sm" onClick={() => { onUseDefault(); setIsOpen(false); }}>
                  Usar padrão
                </Button>
              </div>
            )}

            <SourceUpload
              sourceType={sourceType}
              onSourceTypeChange={onSourceTypeChange}
              uploadedFile={uploadedFile}
              linkedinUrl={linkedinUrl}
              uploadStatus={uploadStatus}
              onFileUpload={(file) => {
                onUploadNew();
                onFileUpload(file);
              }}
              onFileRemove={onFileRemove}
              onLinkedinChange={onLinkedinChange}
              errorMessage={errorMessage}
            />
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
