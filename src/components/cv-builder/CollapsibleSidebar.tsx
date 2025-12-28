import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface CollapsibleSidebarProps {
  side: "left" | "right";
  storageKey: string;
  collapsedIcon: React.ReactNode;
  collapsedLabel: string;
  expandedWidth?: string;
  collapsedWidth?: string;
  children: React.ReactNode;
  className?: string;
}

export function CollapsibleSidebar({
  side,
  storageKey,
  collapsedIcon,
  collapsedLabel,
  expandedWidth = "w-72",
  collapsedWidth = "w-16",
  children,
  className,
}: CollapsibleSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(storageKey);
    return stored === "true";
  });

  useEffect(() => {
    localStorage.setItem(storageKey, String(isCollapsed));
  }, [isCollapsed, storageKey]);

  const toggleCollapsed = () => setIsCollapsed((prev) => !prev);

  const CollapseIcon = side === "left" ? ChevronLeft : ChevronRight;
  const ExpandIcon = side === "left" ? ChevronRight : ChevronLeft;

  return (
    <div
      className={cn(
        "relative flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? collapsedWidth : expandedWidth,
        side === "left" ? "border-r" : "border-l",
        "border-border bg-sidebar",
        className
      )}
    >
      {/* Toggle button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapsed}
              aria-label={isCollapsed ? `Expandir ${collapsedLabel.toLowerCase()}` : `Recolher ${collapsedLabel.toLowerCase()}`}
              className={cn(
                "absolute top-3 z-10 h-7 w-7 rounded-full border border-border bg-background shadow-sm hover:bg-accent",
                side === "left" ? "-right-3.5" : "-left-3.5"
              )}
            >
              {isCollapsed ? (
                <ExpandIcon className="h-4 w-4" />
              ) : (
                <CollapseIcon className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side === "left" ? "right" : "left"}>
            {isCollapsed ? "Expandir" : "Recolher"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Content */}
      {isCollapsed ? (
        <div className="flex flex-col items-center pt-14 pb-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleCollapsed}
                  className="h-10 w-10 text-muted-foreground hover:text-foreground"
                  aria-label={`Abrir ${collapsedLabel.toLowerCase()}`}
                >
                  {collapsedIcon}
                </Button>
              </TooltipTrigger>
              <TooltipContent side={side === "left" ? "right" : "left"}>
                {collapsedLabel}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : (
        <div className="flex-1 overflow-hidden">{children}</div>
      )}
    </div>
  );
}
