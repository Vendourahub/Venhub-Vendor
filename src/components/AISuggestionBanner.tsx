import { Sparkles, X, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useState } from 'react';

interface Suggestion {
  id: string;
  type: 'insight' | 'tip' | 'alert';
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface AISuggestionBannerProps {
  suggestions: Suggestion[];
}

export function AISuggestionBanner({ suggestions }: AISuggestionBannerProps) {
  const [dismissedSuggestions, setDismissedSuggestions] = useState<string[]>([]);

  const activeSuggestions = suggestions.filter(s => !dismissedSuggestions.includes(s.id));

  const handleDismiss = (id: string) => {
    setDismissedSuggestions([...dismissedSuggestions, id]);
  };

  if (activeSuggestions.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'insight':
        return <TrendingUp className="w-5 h-5" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getGradient = (type: string) => {
    switch (type) {
      case 'insight':
        return 'from-[#4A90E2]/10 to-[#56A45E]/10 border-[#4A90E2]/20';
      case 'alert':
        return 'from-[#F2994A]/10 to-[#F5C33C]/10 border-[#F2994A]/20';
      default:
        return 'from-[#56A45E]/10 to-[#4A90E2]/10 border-[#56A45E]/20';
    }
  };

  return (
    <div className="space-y-3 mb-6">
      {activeSuggestions.map((suggestion) => (
        <Card 
          key={suggestion.id}
          className={`bg-gradient-to-r ${getGradient(suggestion.type)} border p-4`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="p-2 rounded-lg bg-white/50 text-[#4A90E2]">
                {getIcon(suggestion.type)}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#4A90E2]" />
                  <h4 className="text-sm font-medium">{suggestion.title}</h4>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-white/50"
                  onClick={() => handleDismiss(suggestion.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{suggestion.description}</p>
              {suggestion.action && (
                <Button
                  size="sm"
                  onClick={suggestion.action.onClick}
                  className="bg-[#4A90E2] hover:bg-[#3A7BC8] text-white h-8"
                >
                  {suggestion.action.label}
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
