import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { HistorySidebar } from "@/components/cv-builder/HistorySidebar";
import { SinglePageGenerator } from "@/components/cv-builder/SinglePageGenerator";
import { GenerationProgress } from "@/components/cv-builder/GenerationProgress";
import { CVEditor } from "@/components/cv-builder/CVEditor";
import { CVPreview } from "@/components/cv-builder/CVPreview";
import { AuthModal } from "@/components/auth/AuthModal";
import { PlansSelection } from "@/components/plans/PlansSelection";
import { useToast } from "@/hooks/use-toast";
import {
  CVHistoryItem,
  GeneratedCV,
} from "@/types/cv";

const HISTORY_KEY = "cv-sob-medida-history";
const DEFAULT_CV_KEY = "cv-sob-medida-default";

type FlowStep = "generator" | "auth" | "plans" | "generating" | "editor" | "preview";

interface DefaultCVData {
  fileName: string;
  updatedAt: string;
}

export default function CVBuilder() {
  const { toast } = useToast();
  const [flowStep, setFlowStep] = useState<FlowStep>("generator");
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
  const [defaultCV, setDefaultCV] = useState<DefaultCVData | undefined>();

  // Load history and default CV
  useEffect(() => {
    try {
      const historyData = localStorage.getItem(HISTORY_KEY);
      if (historyData) {
        setHistory(JSON.parse(historyData));
      }
      const defaultData = localStorage.getItem(DEFAULT_CV_KEY);
      if (defaultData) {
        setDefaultCV(JSON.parse(defaultData));
      }
    } catch (e) {
      console.error("Failed to load data:", e);
    }
  }, []);

  const handleGenerate = () => {
    // Trigger auth gate (for now, simulate logged in)
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
            headline: "Seu Nome",
            contact: "email@exemplo.com • (11) 99999-9999 • São Paulo, SP",
            summary: "Profissional experiente com sólida formação e histórico de resultados. Especializado em entregar valor através de soluções inovadoras e liderança de equipes multidisciplinares.",
            experienceBlocks: [
              {
                id: "1",
                company: "Empresa Exemplo",
                role: "Cargo Sênior",
                period: "Jan 2020 - Atual",
                bullets: [
                  "Liderou equipe de 10 pessoas em projeto estratégico",
                  "Aumentou receita em 35% através de novas iniciativas",
                  "Implementou processos que reduziram custos em 20%",
                ],
              },
            ],
            educationBlocks: [
              {
                id: "1",
                institution: "Universidade Exemplo",
                degree: "Graduação",
                field: "Administração de Empresas",
                year: "2018",
              },
            ],
            skills: ["Liderança", "Gestão de Projetos", "Análise de Dados", "Excel Avançado"],
            languages: [
              { name: "Português", level: "Nativo" },
              { name: "Inglês", level: "Fluente" },
            ],
          });
          
          setCvName("CV sob medida — " + new Date().toLocaleDateString("pt-BR"));
          setTimeout(() => setFlowStep("editor"), 500);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    setFlowStep("plans");
  };

  const handlePlanContinue = () => {
    handleGenerate();
  };

  const handleNewCV = () => {
    setActiveHistoryId(null);
    setGeneratedCV(null);
    setFlowStep("generator");
  };

  const handleSelectHistoryItem = (id: string) => {
    const item = history.find((h) => h.id === id);
    if (item) {
      setActiveHistoryId(id);
      if (item.generatedContent) {
        setGeneratedCV(item.generatedContent);
        setCvName(item.name);
        setFlowStep("editor");
      }
    }
  };

  const handleLoginClick = () => {
    setAuthModalTab("login");
    setIsAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthModalTab("register");
    setIsAuthModalOpen(true);
  };

  // Plans view
  if (flowStep === "plans") {
    return (
      <div className="min-h-screen bg-background">
        <Header onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
        <main className="container py-8">
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
        <GenerationProgress
          status={generationStatus}
          currentStep={generationStep}
          onRetry={() => {
            setGenerationStep(1);
            setGenerationStatus("generating");
            handleGenerate();
          }}
          onCancel={() => setFlowStep("generator")}
        />
      </div>
    );
  }

  // Editor view
  if (flowStep === "editor" && generatedCV) {
    return (
      <div className="h-screen flex flex-col bg-background">
        <Header onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
        <div className="flex-1 flex overflow-hidden">
          <CVEditor
            generatedCV={generatedCV}
            cvName={cvName}
            onCVChange={setGeneratedCV}
            onNameChange={setCvName}
            onPreview={() => setFlowStep("preview")}
            onExport={() => toast({ title: "PDF exportado com sucesso!" })}
            onSaveVersion={() => toast({ title: "Versão salva!" })}
            onRegenerate={() => {
              setFlowStep("generating");
              setGenerationStep(1);
              handleGenerate();
            }}
            onBack={() => setFlowStep("generator")}
            isSaving={false}
          />
        </div>
      </div>
    );
  }

  // Preview view
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

  // Main generator layout (3 columns)
  return (
    <div className="h-screen flex flex-col bg-background">
      <Header onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />

      <div className="flex-1 flex overflow-hidden">
        {/* Left: History Sidebar */}
        <div className="w-64 hidden lg:block flex-shrink-0">
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

        {/* Center: Single Page Generator */}
        <div className="flex-1 overflow-hidden">
          <SinglePageGenerator
            onGenerate={handleGenerate}
            isGenerating={false}
            remainingCredits={remainingCredits}
            defaultCV={defaultCV}
          />
        </div>
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
