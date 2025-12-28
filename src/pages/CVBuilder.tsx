import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Sparkles, FileText, AlertCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { WizardProgress } from "@/components/cv-builder/WizardProgress";
import { FormStepObjective } from "@/components/cv-builder/FormStepObjective";
import { FormStepJobDescription } from "@/components/cv-builder/FormStepJobDescription";
import { FormStepExperience } from "@/components/cv-builder/FormStepExperience";
import { FormStepSkills } from "@/components/cv-builder/FormStepSkills";
import { AutosaveIndicator } from "@/components/cv-builder/AutosaveIndicator";
import { AuthModal } from "@/components/auth/AuthModal";
import { PlansSelection } from "@/components/plans/PlansSelection";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "cv-sob-medida-draft";

const WIZARD_STEPS = [
  { id: 1, title: "Objetivo", description: "Cargo alvo" },
  { id: 2, title: "Vaga", description: "Descrição opcional" },
  { id: 3, title: "Experiência", description: "Histórico profissional" },
  { id: 4, title: "Formação", description: "Educação e skills" },
];

interface FormData {
  // Step 1: Objective
  targetRole: string;
  seniority: string;
  location: string;
  // Step 2: Job Description
  jobDescription: string;
  // Step 3: Experience
  experiences: Array<{
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    achievements: string;
  }>;
  // Step 4: Skills & Education
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    endYear: string;
  }>;
  skills: string[];
  languages: Array<{ name: string; level: string }>;
}

const initialFormData: FormData = {
  targetRole: "",
  seniority: "",
  location: "",
  jobDescription: "",
  experiences: [
    {
      id: crypto.randomUUID(),
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      achievements: "",
    },
  ],
  education: [
    {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      field: "",
      endYear: "",
    },
  ],
  skills: [],
  languages: [],
};

type FlowStep = "builder" | "auth" | "plans" | "generating";

export default function CVBuilder() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [autosaveStatus, setAutosaveStatus] = useState<"saving" | "saved" | "error">("saved");
  const [flowStep, setFlowStep] = useState<FlowStep>("builder");
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("register");

  // Load draft from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed.formData || initialFormData);
        setCurrentStep(parsed.currentStep || 1);
      }
    } catch (e) {
      console.error("Failed to load draft:", e);
    }
  }, []);

  // Autosave to localStorage
  const saveDraft = useCallback(() => {
    setAutosaveStatus("saving");
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ formData, currentStep, savedAt: new Date().toISOString() })
      );
      setTimeout(() => setAutosaveStatus("saved"), 500);
    } catch (e) {
      setAutosaveStatus("error");
    }
  }, [formData, currentStep]);

  useEffect(() => {
    const timeout = setTimeout(saveDraft, 1000);
    return () => clearTimeout(timeout);
  }, [formData, saveDraft]);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.targetRole.trim().length > 0;
      case 2:
        return true; // Optional step
      case 3:
        return formData.experiences.some((exp) => exp.company.trim() && exp.role.trim());
      case 4:
        return true; // Optional but nice to have
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < WIZARD_STEPS.length) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleGenerate = () => {
    // Validate minimum requirements
    if (!formData.targetRole.trim()) {
      toast({
        title: "Preencha o cargo alvo",
        description: "O cargo alvo é obrigatório para gerar seu CV.",
        variant: "destructive",
      });
      setCurrentStep(1);
      return;
    }

    const hasExperience = formData.experiences.some(
      (exp) => exp.company.trim() && exp.role.trim()
    );
    if (!hasExperience) {
      toast({
        title: "Adicione uma experiência",
        description: "Adicione pelo menos uma experiência profissional.",
        variant: "destructive",
      });
      setCurrentStep(3);
      return;
    }

    // Trigger auth gate
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    setFlowStep("plans");
  };

  const handlePlanContinue = () => {
    setFlowStep("generating");
    // Simulate generation
    setTimeout(() => {
      toast({
        title: "CV gerado com sucesso!",
        description: "Seu CV está pronto para revisão.",
      });
      // In real app, navigate to editor
      setFlowStep("builder");
    }, 3000);
  };

  const handleLoginClick = () => {
    setAuthModalTab("login");
    setIsAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthModalTab("register");
    setIsAuthModalOpen(true);
  };

  // Plans selection view
  if (flowStep === "plans") {
    return (
      <div className="min-h-screen bg-background">
        <Header onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
        <main className="container py-8 md:py-12">
          <PlansSelection
            selectedPlan={selectedPlan}
            onSelectPlan={setSelectedPlan}
            onContinue={handlePlanContinue}
          />
        </main>
      </div>
    );
  }

  // Generation loading view
  if (flowStep === "generating") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 p-8 max-w-md animate-fade-in">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <FileText className="h-8 w-8 text-primary animate-pulse-subtle" />
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-semibold">Gerando seu CV...</h2>
            <p className="text-muted-foreground">
              Estamos organizando suas informações e otimizando para ATS.
            </p>
          </div>
          <div className="space-y-3">
            {[
              "Organizando suas informações…",
              "Ajustando para a vaga…",
              "Otimizando para ATS…",
            ].map((step, i) => (
              <div
                key={step}
                className="flex items-center gap-3 text-sm text-muted-foreground animate-fade-in"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />

      <main className="container py-6 md:py-10">
        {/* Hero section */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Crie um CV sob medida para a vaga
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Preencha seus dados e gere uma versão otimizada em minutos.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <WizardProgress
              steps={WIZARD_STEPS}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />
          </div>

          {/* Autosave indicator */}
          <div className="mb-6">
            <AutosaveIndicator status={autosaveStatus} />
          </div>

          {/* Form content */}
          <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-card mb-8">
            {currentStep === 1 && (
              <FormStepObjective
                data={{
                  targetRole: formData.targetRole,
                  seniority: formData.seniority,
                  location: formData.location,
                }}
                onChange={updateFormData}
              />
            )}

            {currentStep === 2 && (
              <FormStepJobDescription
                data={{ jobDescription: formData.jobDescription }}
                onChange={updateFormData}
              />
            )}

            {currentStep === 3 && (
              <FormStepExperience
                data={{ experiences: formData.experiences }}
                onChange={updateFormData}
              />
            )}

            {currentStep === 4 && (
              <FormStepSkills
                data={{
                  education: formData.education,
                  skills: formData.skills,
                  languages: formData.languages,
                }}
                onChange={updateFormData}
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Voltar
            </Button>

            <div className="flex items-center gap-3">
              {currentStep < WIZARD_STEPS.length ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="gap-2"
                >
                  Continuar
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleGenerate}
                  disabled={!canProceed()}
                  className="gap-2"
                >
                  <Sparkles className="h-5 w-5" />
                  Gerar CV
                </Button>
              )}
            </div>
          </div>

          {/* Quality warning */}
          {currentStep === WIZARD_STEPS.length && !formData.jobDescription && (
            <div className="mt-6 flex items-start gap-3 rounded-lg border border-warning/30 bg-warning/5 p-4 text-sm">
              <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Dica para melhores resultados</p>
                <p className="text-muted-foreground">
                  Cole a descrição da vaga na etapa 2 para um CV ainda mais personalizado.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border sm:hidden">
        {currentStep === WIZARD_STEPS.length ? (
          <Button
            variant="hero"
            size="lg"
            onClick={handleGenerate}
            disabled={!canProceed()}
            className="w-full gap-2"
          >
            <Sparkles className="h-5 w-5" />
            Gerar CV
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full"
          >
            Continuar
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        defaultTab={authModalTab}
      />
    </div>
  );
}
