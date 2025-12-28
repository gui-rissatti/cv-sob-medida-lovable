import { useState, useCallback } from "react";
import { Upload, FileText, Linkedin, X, Check, Loader2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export type SourceType = "upload" | "linkedin";
export type UploadStatus = "idle" | "uploading" | "parsing" | "success" | "error";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

interface SourceUploadProps {
  sourceType: SourceType;
  onSourceTypeChange: (type: SourceType) => void;
  uploadedFile: UploadedFile | null;
  linkedinUrl: string;
  uploadStatus: UploadStatus;
  onFileUpload: (file: File) => void;
  onFileRemove: () => void;
  onLinkedinChange: (url: string) => void;
  onPreviewParsed?: () => void;
  errorMessage?: string;
}

export function SourceUpload({
  sourceType,
  onSourceTypeChange,
  uploadedFile,
  linkedinUrl,
  uploadStatus,
  onFileUpload,
  onFileRemove,
  onLinkedinChange,
  onPreviewParsed,
  errorMessage,
}: SourceUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && isValidFileType(file)) {
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && isValidFileType(file)) {
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const isValidFileType = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    return validTypes.includes(file.type);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isLinkedinValid = (url: string) => {
    return url.trim() === "" || url.includes("linkedin.com/in/");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Fonte do CV
        </h3>
        <p className="text-sm text-muted-foreground">
          Envie seu CV atual ou forneça a URL do seu LinkedIn.
        </p>
      </div>

      <Tabs value={sourceType} onValueChange={(v) => onSourceTypeChange(v as SourceType)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="gap-2">
            <Upload className="h-4 w-4" />
            Enviar CV
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="gap-2">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-4">
          {!uploadedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "relative rounded-lg border-2 border-dashed p-8 transition-colors text-center",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-accent/50",
                uploadStatus === "error" && "border-destructive bg-destructive/5"
              )}
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploadStatus === "uploading" || uploadStatus === "parsing"}
              />

              <div className="flex flex-col items-center gap-3">
                {uploadStatus === "uploading" || uploadStatus === "parsing" ? (
                  <>
                    <Loader2 className="h-10 w-10 text-primary animate-spin" />
                    <p className="text-sm font-medium text-foreground">
                      {uploadStatus === "uploading" ? "Enviando…" : "Lendo seu CV…"}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        Arraste e solte aqui ou clique para selecionar
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, DOC ou DOCX (máx. 10MB)
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(uploadedFile.size)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {uploadStatus === "success" && (
                    <div className="flex items-center gap-1.5 text-success text-sm">
                      <Check className="h-4 w-4" />
                      <span>CV carregado</span>
                    </div>
                  )}

                  {onPreviewParsed && uploadStatus === "success" && (
                    <Button variant="ghost" size="sm" onClick={onPreviewParsed} className="gap-1">
                      <Eye className="h-4 w-4" />
                      Ver dados
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onFileRemove}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {uploadStatus === "error" && errorMessage && (
            <p className="text-sm text-destructive mt-2">{errorMessage}</p>
          )}
        </TabsContent>

        <TabsContent value="linkedin" className="mt-4 space-y-3">
          <div className="space-y-2">
            <Label htmlFor="linkedin-url">URL do perfil do LinkedIn</Label>
            <Input
              id="linkedin-url"
              type="url"
              placeholder="https://www.linkedin.com/in/seu-nome"
              value={linkedinUrl}
              onChange={(e) => onLinkedinChange(e.target.value)}
              className={cn(
                !isLinkedinValid(linkedinUrl) && "border-destructive focus-visible:ring-destructive"
              )}
            />
            <p className="text-xs text-muted-foreground">
              Cole o link do seu perfil público do LinkedIn.
            </p>
            {!isLinkedinValid(linkedinUrl) && (
              <p className="text-xs text-destructive">
                URL inválida. Use o formato: linkedin.com/in/seu-nome
              </p>
            )}
          </div>

          {linkedinUrl && isLinkedinValid(linkedinUrl) && uploadStatus === "success" && (
            <Card className="p-4 flex items-center gap-3 bg-success/5 border-success/20">
              <Check className="h-5 w-5 text-success" />
              <span className="text-sm text-foreground">Perfil do LinkedIn validado</span>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
