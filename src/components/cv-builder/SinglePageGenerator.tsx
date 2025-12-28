import { useState, useCallback, useEffect } from "react";
import { Wand2, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SourceType, UploadStatus } from "./SourceUpload";
import { CollapsibleSourcePanel } from "./CollapsibleSourcePanel";
import { JobTargetInput } from "./JobTargetInput";
import { OutputPreview } from "./OutputPreview";
import { GenerationSettings, initialSettings } from "@/types/cv";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

interface DefaultCV {
  fileName: string;
  updatedAt: string;
}

interface SinglePageGeneratorProps {
  onGenerate: () => void;
  isGenerating: boolean;
  remainingCredits: number;
  defaultCV?: DefaultCV;
  settings: GenerationSettings;
  onSettingsChange: (settings: GenerationSettings) => void;
}

export function SinglePageGenerator({
  onGenerate,
  isGenerating,
  remainingCredits,
  defaultCV,
  settings,
  onSettingsChange,
}: SinglePageGeneratorProps) {
  // Source state
  const [sourceType, setSourceType] = useState<SourceType>("upload");
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadError, setUploadError] = useState<string | undefined>();
  const [useDefaultCV, setUseDefaultCV] = useState(false);

  // Job target state
  const [jobUrl, setJobUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");

  // Auto-use default CV if available
  useEffect(() => {
    if (defaultCV && !uploadedFile && !linkedinUrl) {
      setUseDefaultCV(true);
      setUploadStatus("success");
    }
  }, [defaultCV]);

  // Handlers
  const handleFileUpload = useCallback((file: File) => {
    setUploadStatus("uploading");
    setUploadError(undefined);

    // Simulate upload and parsing
    setTimeout(() => {
      setUploadStatus("parsing");
      setTimeout(() => {
        setUploadedFile({
          name: file.name,
          size: file.size,
          type: file.type,
        });
        setUploadStatus("success");
      }, 1000);
    }, 800);
  }, []);

  const handleFileRemove = useCallback(() => {
    setUploadedFile(null);
    setUploadStatus("idle");
    setUploadError(undefined);
  }, []);

  const handleUseDefault = () => {
    setUseDefaultCV(true);
    setUploadedFile(null);
    setUploadStatus("success");
  };

  const handleUploadNew = () => {
    setUseDefaultCV(false);
  };

  const handleClear = () => {
    setUploadedFile(null);
    setLinkedinUrl("");
    setUploadStatus("idle");
    setUseDefaultCV(false);
    setJobUrl("");
    setJobDescription("");
    setCompanyName("");
    onSettingsChange(initialSettings);
  };

  // Validation
  const hasSource =
    useDefaultCV ||
    (sourceType === "upload" && uploadedFile !== null) ||
    (sourceType === "linkedin" && linkedinUrl.includes("linkedin.com/in/"));

  const hasJobDescription = jobDescription.trim().length > 20;

  const canGenerate = hasSource && uploadStatus === "success";

  const getDisabledReason = () => {
    if (!hasSource) {
      return "Envie um CV ou forneça seu LinkedIn para continuar.";
    }
    return undefined;
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6 max-w-2xl mx-auto">
        {/* Page title */}
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">
            Gerar CV sob medida
          </h1>
          <p className="text-sm text-muted-foreground">
            Personalize seu CV para cada vaga em segundos
          </p>
        </div>

        {/* OUTPUT FIRST: Preview of what user will receive */}
        <OutputPreview
          settings={settings}
          hasJobDescription={hasJobDescription}
          companyName={companyName || undefined}
        />

        {/* CTA near the output preview */}
        <div className="flex flex-col items-center gap-3 py-2">
          <Button
            size="lg"
            onClick={onGenerate}
            disabled={!canGenerate || isGenerating}
            className="gap-2 px-8 shadow-glow"
          >
            <Wand2 className="h-5 w-5" />
            {isGenerating ? "Gerando..." : "Gerar CV sob medida"}
          </Button>
          
          {!canGenerate && (
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5" />
              {getDisabledReason()}
            </p>
          )}
          
          <p className="text-[11px] text-muted-foreground">
            1 uso é descontado somente quando a geração for concluída com sucesso
          </p>
        </div>

        <Separator />

        {/* INPUTS: Source (collapsible) */}
        <CollapsibleSourcePanel
          sourceType={sourceType}
          onSourceTypeChange={setSourceType}
          uploadedFile={uploadedFile}
          linkedinUrl={linkedinUrl}
          uploadStatus={uploadStatus}
          onFileUpload={handleFileUpload}
          onFileRemove={handleFileRemove}
          onLinkedinChange={setLinkedinUrl}
          errorMessage={uploadError}
          defaultCV={defaultCV}
          useDefaultCV={useDefaultCV}
          onUseDefault={handleUseDefault}
          onUploadNew={handleUploadNew}
        />

        {/* Job Target - compact */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground text-sm">
                Vaga alvo
                <span className="text-muted-foreground font-normal ml-1">(recomendado)</span>
              </h3>
              <p className="text-xs text-muted-foreground">
                Aumenta a relevância e melhora a aprovação no ATS
              </p>
            </div>
          </div>
          
          <JobTargetInput
            jobUrl={jobUrl}
            jobDescription={jobDescription}
            companyName={companyName}
            onJobUrlChange={setJobUrl}
            onJobDescriptionChange={setJobDescription}
            onCompanyNameChange={setCompanyName}
          />

          {!hasJobDescription && (
            <p className="text-xs text-muted-foreground italic">
              Sem vaga → geramos uma versão geral bem estruturada.
            </p>
          )}
        </div>

        {/* Clear action */}
        <div className="flex justify-center pt-2">
          <Button variant="ghost" size="sm" onClick={handleClear} className="text-muted-foreground">
            Limpar tudo
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}
