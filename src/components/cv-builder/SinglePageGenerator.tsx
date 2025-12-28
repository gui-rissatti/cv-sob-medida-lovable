import { useState, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SourceUpload, SourceType, UploadStatus } from "./SourceUpload";
import { JobTargetInput } from "./JobTargetInput";
import { SettingsCompact } from "./SettingsCompact";
import { UpToDateConfirmation, useUpToDateConfirmation } from "./UpToDateConfirmation";
import { GenerateSection } from "./GenerateSection";
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
}

export function SinglePageGenerator({
  onGenerate,
  isGenerating,
  remainingCredits,
  defaultCV,
}: SinglePageGeneratorProps) {
  // Source state
  const [sourceType, setSourceType] = useState<SourceType>("upload");
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadError, setUploadError] = useState<string | undefined>();

  // Job target state
  const [jobUrl, setJobUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");

  // Settings state
  const [settings, setSettings] = useState<GenerationSettings>(initialSettings);

  // Confirmation state
  const [confirmations, setConfirmations] = useState({
    experiencesUpdated: false,
    skillsUpdated: false,
    contactUpdated: false,
  });
  const [saveAsDefault, setSaveAsDefault] = useState(false);
  const [useDefaultCV, setUseDefaultCV] = useState(false);

  const { allConfirmed } = useUpToDateConfirmation();

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

  const handleConfirmationChange = (
    key: keyof typeof confirmations,
    value: boolean
  ) => {
    setConfirmations((prev) => ({ ...prev, [key]: value }));
  };

  const handleClear = () => {
    setUploadedFile(null);
    setLinkedinUrl("");
    setUploadStatus("idle");
    setJobUrl("");
    setJobDescription("");
    setCompanyName("");
    setSettings(initialSettings);
    setConfirmations({
      experiencesUpdated: false,
      skillsUpdated: false,
      contactUpdated: false,
    });
    setSaveAsDefault(false);
    setUseDefaultCV(false);
  };

  const handleUseDefault = () => {
    setUseDefaultCV(true);
    setUploadStatus("success");
  };

  const handleUploadNew = () => {
    setUseDefaultCV(false);
    setUploadedFile(null);
    setUploadStatus("idle");
  };

  // Validation
  const hasSource =
    (sourceType === "upload" && (uploadedFile !== null || useDefaultCV)) ||
    (sourceType === "linkedin" && linkedinUrl.includes("linkedin.com/in/"));

  const isConfirmed = useDefaultCV || allConfirmed(confirmations);

  const canGenerate = hasSource && isConfirmed && uploadStatus === "success";

  const getDisabledReason = () => {
    if (!hasSource) {
      return sourceType === "upload"
        ? "Envie um CV para continuar."
        : "Forneça uma URL válida do LinkedIn.";
    }
    if (!isConfirmed) {
      return "Confirme que seu CV está atualizado.";
    }
    return undefined;
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-8 max-w-3xl mx-auto">
        {/* Page title */}
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Gerar CV sob medida
          </h1>
          <p className="text-muted-foreground">
            Envie seu CV ou perfil do LinkedIn e personalize para a vaga.
          </p>
        </div>

        {/* Section A: Source */}
        <SourceUpload
          sourceType={sourceType}
          onSourceTypeChange={setSourceType}
          uploadedFile={uploadedFile}
          linkedinUrl={linkedinUrl}
          uploadStatus={uploadStatus}
          onFileUpload={handleFileUpload}
          onFileRemove={handleFileRemove}
          onLinkedinChange={setLinkedinUrl}
          errorMessage={uploadError}
        />

        <Separator />

        {/* Section B: Job Target */}
        <JobTargetInput
          jobUrl={jobUrl}
          jobDescription={jobDescription}
          companyName={companyName}
          onJobUrlChange={setJobUrl}
          onJobDescriptionChange={setJobDescription}
          onCompanyNameChange={setCompanyName}
        />

        <Separator />

        {/* Section C: Settings */}
        <SettingsCompact settings={settings} onChange={setSettings} />

        <Separator />

        {/* Section D: Up-to-date Confirmation */}
        {hasSource && (
          <UpToDateConfirmation
            hasDefaultCV={!!defaultCV && !uploadedFile}
            defaultCV={defaultCV}
            confirmations={confirmations}
            onConfirmationChange={handleConfirmationChange}
            saveAsDefault={saveAsDefault}
            onSaveAsDefaultChange={setSaveAsDefault}
            onUseDefault={handleUseDefault}
            onUploadNew={handleUploadNew}
          />
        )}

        {hasSource && <Separator />}

        {/* Section E: Generate */}
        <GenerateSection
          canGenerate={canGenerate}
          isGenerating={isGenerating}
          remainingCredits={remainingCredits}
          onGenerate={onGenerate}
          onClear={handleClear}
          disabledReason={getDisabledReason()}
        />
      </div>
    </ScrollArea>
  );
}
