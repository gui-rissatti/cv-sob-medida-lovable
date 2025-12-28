import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Menu, X } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { HistorySidebar } from "@/components/cv-builder/HistorySidebar";
import { TailoringPanel } from "@/components/cv-builder/TailoringPanel";
import { WizardProgress } from "@/components/cv-builder/WizardProgress";
import { FormStepPersonalData } from "@/components/cv-builder/FormStepPersonalData";
import { FormStepObjective } from "@/components/cv-builder/FormStepObjective";
import { FormStepJobDescription } from "@/components/cv-builder/FormStepJobDescription";
import { FormStepExperience } from "@/components/cv-builder/FormStepExperience";
import { FormStepSkills } from "@/components/cv-builder/FormStepSkills";
import { FormStepSummary } from "@/components/cv-builder/FormStepSummary";
import { FormStepExtras } from "@/components/cv-builder/FormStepExtras";
import { AutosaveIndicator } from "@/components/cv-builder/AutosaveIndicator";
import { GenerationProgress } from "@/components/cv-builder/GenerationProgress";
import { CVEditor } from "@/components/cv-builder/CVEditor";
import { CVPreview } from "@/components/cv-builder/CVPreview";
import { AuthModal } from "@/components/auth/AuthModal";
import { PlansSelection } from "@/components/plans/PlansSelection";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  CVFormData,
  CVHistoryItem,
  GenerationSettings,
  GeneratedCV,
  initialFormData,
  initialSettings,
} from "@/types/cv";

const STORAGE_KEY = "cv-sob-medida-draft";
const HISTORY_KEY = "cv-sob-medida-history";

const WIZARD_STEPS = [
  { id: 1, title: "Dados", description: "Informações pessoais" },
  { id: 2, title: "Objetivo", description: "Cargo alvo" },
  { id: 3, title: "Vaga", description: "Descrição opcional" },
  { id: 4, title: "Experiência", description: "Histórico profissional" },
  { id: 5, title: "Formação", description: "Educação e skills" },
  { id: 6, title: "Resumo", description: "Resumo profissional" },
  { id: 7, title: "Extras", description: "Projetos e certificações" },
];

type FlowStep = "builder" | "auth" | "plans" | "generating" | "editor" | "preview";

export default function CVBuilder() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CVFormData>(initialFormData);
  const [settings, setSettings] = useState<GenerationSettings>(initialSettings);
  const [autosaveStatus, setAutosaveStatus] = useState<"saving" | "saved" | "error">("saved");
  const [flowStep, setFlowStep] = useState<FlowStep>("builder");
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("register");
  const [history, setHistory] = useState<CVHistoryItem[]>([]);
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null);
  const [generationStep, setGenerationStep] = useState(1);
  const [generationStatus, setGenerationStatus] = useState<"generating" | "success" | "error">("generating");
  const [generatedCV, setGeneratedCV] = useState<GeneratedCV | null>(null);
  const [cvName, setCvName] = useState("");
  const [remainingCredits, setRemainingCredits] = useState(3);
  const [showHistorySidebar, setShowHistorySidebar] = useState(true);
  const [showTailoringPanel, setShowTailoringPanel] = useState(true);

  // Load draft and history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed.formData || initialFormData);
        setSettings(parsed.settings || initialSettings);
        setCurrentStep(parsed.currentStep || 1);
      }
      const historyData = localStorage.getItem(HISTORY_KEY);
      if (historyData) {
        setHistory(JSON.parse(historyData));
      }
    } catch (e) {
      console.error("Failed to load draft:", e);
    }
  }, []);

  // Autosave
  const saveDraft = useCallback(() => {
    setAutosaveStatus("saving");
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ formData, settings, currentStep, savedAt: new Date().toISOString() })
      );
      setTimeout(() => setAutosaveStatus("saved"), 500);
    } catch {
      setAutosaveStatus("error");
    }
  }, [formData, settings, currentStep]);

  useEffect(() => {
    const timeout = setTimeout(saveDraft, 1000);
    return () => clearTimeout(timeout);
  }, [formData, saveDraft]);

  const updateFormData = (updates: Partial<CVFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.personalData.fullName.trim().length > 0;
      case 2: return formData.targetRole.trim().length > 0;
      case 3: return true;
      case 4: return formData.experiences.some((exp) => exp.company.trim() && exp.role.trim());
      default: return true;
    }
  };

  const handleNext = () => {
    if (currentStep < WIZARD_STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleGenerate = () => {
    if (!formData.targetRole.trim()) {
      toast({ title: "Preencha o cargo alvo", variant: "destructive" });
      setCurrentStep(2);
      return;
    }
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    setFlowStep("plans");
  };

  const handlePlanContinue = () => {
    setFlowStep("generating");
    setGenerationStep(1);
    setGenerationStatus("generating");
    
    // Simulate generation
    const interval = setInterval(() => {
      setGenerationStep((prev) => {
        if (prev >= 5) {
          clearInterval(interval);
          setGenerationStatus("success");
          // Create mock generated CV
          setGeneratedCV({
            headline: formData.personalData.fullName || "Seu Nome",
            contact: `${formData.personalData.email} • ${formData.personalData.phone} • ${formData.personalData.city}, ${formData.personalData.state}`,
            summary: formData.professionalSummary || "Profissional experiente com sólida formação...",
            experienceBlocks: formData.experiences.filter(e => e.company).map((exp) => ({
              id: exp.id,
              company: exp.company,
              role: exp.role,
              period: `${exp.startDate} - ${exp.isCurrent ? "Atual" : exp.endDate}`,
              bullets: exp.achievements.split("\n").filter(Boolean),
            })),
            educationBlocks: formData.education.filter(e => e.institution).map((edu) => ({
              id: edu.id,
              institution: edu.institution,
              degree: edu.degree,
              field: edu.field,
              year: edu.endYear,
            })),
            skills: [...formData.hardSkills, ...formData.softSkills],
            languages: formData.languages,
          });
          setCvName(`${formData.targetRole} — ${formData.jobDescription ? "Personalizado" : "Geral"}`);
          setTimeout(() => setFlowStep("editor"), 500);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  const handleNewCV = () => {
    setFormData(initialFormData);
    setSettings(initialSettings);
    setCurrentStep(1);
    setActiveHistoryId(null);
    setGeneratedCV(null);
    setFlowStep("builder");
  };

  const handleSelectHistoryItem = (id: string) => {
    const item = history.find((h) => h.id === id);
    if (item) {
      setFormData(item.formData);
      setSettings(item.settings);
      setActiveHistoryId(id);
      if (item.generatedContent) {
        setGeneratedCV(item.generatedContent);
        setCvName(item.name);
        setFlowStep("editor");
      }
    }
  };

  // Render based on flow step
  if (flowStep === "plans") {
    return (
      <div className="min-h-screen bg-background">
        <Header onLoginClick={() => {}} onRegisterClick={() => {}} />
        <main className="container py-8">
          <PlansSelection selectedPlan={selectedPlan} onSelectPlan={setSelectedPlan} onContinue={handlePlanContinue} />
        </main>
      </div>
    );
  }

  if (flowStep === "generating") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <GenerationProgress
          status={generationStatus}
          currentStep={generationStep}
          onRetry={() => { setGenerationStep(1); setGenerationStatus("generating"); }}
          onCancel={() => setFlowStep("builder")}
        />
      </div>
    );
  }

  if (flowStep === "editor" && generatedCV) {
    return (
      <div className="h-screen flex flex-col bg-background">
        <Header onLoginClick={() => {}} onRegisterClick={() => {}} />
        <div className="flex-1 flex overflow-hidden">
          <CVEditor
            generatedCV={generatedCV}
            cvName={cvName}
            onCVChange={setGeneratedCV}
            onNameChange={setCvName}
            onPreview={() => setFlowStep("preview")}
            onExport={() => toast({ title: "PDF exportado com sucesso!" })}
            onSaveVersion={() => toast({ title: "Versão salva!" })}
            onRegenerate={() => { setFlowStep("generating"); setGenerationStep(1); }}
            onBack={() => setFlowStep("builder")}
            isSaving={false}
          />
        </div>
      </div>
    );
  }

  if (flowStep === "preview" && generatedCV) {
    return (
      <div className="h-screen flex flex-col bg-background">
        <CVPreview
          generatedCV={generatedCV}
          cvName={cvName}
          onBack={() => setFlowStep("editor")}
          onExport={() => toast({ title: "PDF exportado com sucesso!" })}
        />
      </div>
    );
  }

  // Main builder layout
  return (
    <div className="h-screen flex flex-col bg-background">
      <Header onLoginClick={() => setIsAuthModalOpen(true)} onRegisterClick={() => setIsAuthModalOpen(true)} />

      <div className="flex-1 flex overflow-hidden">
        {/* History Sidebar */}
        {showHistorySidebar && (
          <div className="w-64 hidden lg:block">
            <HistorySidebar
              items={history}
              activeId={activeHistoryId}
              onSelect={handleSelectHistoryItem}
              onNew={handleNewCV}
              onDuplicate={() => {}}
              onRename={() => {}}
              onDelete={() => {}}
            />
          </div>
        )}

        {/* Center: Builder Form */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                  Crie um CV sob medida para a vaga
                </h1>
                <p className="text-muted-foreground">Preencha seus dados e gere uma versão otimizada.</p>
              </div>

              <WizardProgress steps={WIZARD_STEPS} currentStep={currentStep} onStepClick={setCurrentStep} />
              <AutosaveIndicator status={autosaveStatus} />

              <div className="bg-card rounded-xl border border-border p-6 shadow-card mt-6">
                {currentStep === 1 && <FormStepPersonalData data={formData.personalData} onChange={(d) => updateFormData({ personalData: { ...formData.personalData, ...d } })} />}
                {currentStep === 2 && <FormStepObjective data={{ targetRole: formData.targetRole, seniority: formData.seniority, location: formData.location }} onChange={updateFormData} />}
                {currentStep === 3 && <FormStepJobDescription data={{ jobDescription: formData.jobDescription }} onChange={updateFormData} />}
                {currentStep === 4 && <FormStepExperience data={{ experiences: formData.experiences }} onChange={updateFormData} />}
                {currentStep === 5 && <FormStepSkills data={{ education: formData.education, skills: formData.hardSkills, languages: formData.languages }} onChange={(d) => updateFormData({ ...d, hardSkills: d.skills || formData.hardSkills })} />}
                {currentStep === 6 && <FormStepSummary data={{ professionalSummary: formData.professionalSummary }} onChange={updateFormData} />}
                {currentStep === 7 && <FormStepExtras data={{ projects: formData.projects, certifications: formData.certifications }} onChange={updateFormData} />}
              </div>

              <div className="flex items-center justify-between gap-4 mt-6">
                <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> Voltar
                </Button>
                {currentStep < WIZARD_STEPS.length ? (
                  <Button onClick={handleNext} disabled={!canProceed()}>
                    Continuar <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <Button variant="hero" size="lg" onClick={handleGenerate}>
                    <Sparkles className="h-5 w-5 mr-2" /> Gerar CV
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tailoring Panel */}
        {showTailoringPanel && (
          <div className="w-72 hidden xl:block">
            <TailoringPanel settings={settings} onChange={setSettings} remainingCredits={remainingCredits} />
          </div>
        )}
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onSuccess={handleAuthSuccess} defaultTab={authModalTab} />
    </div>
  );
}
