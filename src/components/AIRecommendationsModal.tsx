import { CheckCircle2, AlertCircle, Image as ImageIcon, MessageSquare, Calendar, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface AIRecommendationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate?: (page: string) => void;
}

const recommendations = [
  {
    id: 1,
    title: 'Improve Product Titles',
    description: 'Add relevant keywords to 5 products to increase search visibility by up to 35%',
    priority: 'high',
    icon: TrendingUp,
    color: '#F2994A',
    action: 'products',
    impact: '+35% visibility',
    effort: '10 mins',
  },
  {
    id: 2,
    title: 'Update 3 Low-Quality Photos',
    description: 'Products with professional photos sell 3x faster. Update images with better lighting and backgrounds.',
    priority: 'high',
    icon: ImageIcon,
    color: '#4A90E2',
    action: 'products',
    impact: '3x faster sales',
    effort: '30 mins',
  },
  {
    id: 3,
    title: 'Respond to Pending Messages',
    description: 'You have 2 customer messages waiting. Quick responses increase conversion by 40%.',
    priority: 'urgent',
    icon: MessageSquare,
    color: '#F5C33C',
    action: 'messages',
    impact: '+40% conversion',
    effort: '5 mins',
  },
  {
    id: 4,
    title: 'Join the Next Workshop',
    description: '"Social Media Marketing" workshop starts today at 2 PM. Learn strategies to boost your sales.',
    priority: 'medium',
    icon: Calendar,
    color: '#56A45E',
    action: 'events',
    impact: 'Learn new skills',
    effort: '2 hours',
  },
];

const priorityConfig = {
  urgent: { label: 'Urgent', color: '#F2994A', bgColor: '#FFF4E6' },
  high: { label: 'High Priority', color: '#F5C33C', bgColor: '#FFFBEA' },
  medium: { label: 'Medium', color: '#56A45E', bgColor: '#F0F9F4' },
};

export function AIRecommendationsModal({ open, onOpenChange, onNavigate }: AIRecommendationsModalProps) {
  const handleApply = (action: string) => {
    if (onNavigate) {
      onNavigate(action);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#4A90E2' }}>
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Recommended Actions For Your Store</DialogTitle>
              <DialogDescription>
                Vendoura AI has analyzed your store and found these opportunities to boost your sales
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Stats Summary */}
          <Card style={{ backgroundColor: '#F0F8FF', borderColor: '#4A90E2' }}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-[#4A90E2] mt-0.5" />
                <div>
                  <p className="text-sm">
                    <strong>Potential Impact:</strong> Implementing these recommendations could increase your monthly sales by up to <strong className="text-[#4A90E2]">₦45,000</strong> and improve customer satisfaction by <strong className="text-[#4A90E2]">60%</strong>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations List */}
          {recommendations.map((rec) => {
            const priority = priorityConfig[rec.priority as keyof typeof priorityConfig];
            return (
              <Card key={rec.id} className="border-2 hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div 
                      className="h-12 w-12 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: rec.color + '20' }}
                    >
                      <rec.icon className="h-6 w-6" style={{ color: rec.color }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                          <Badge 
                            variant="outline"
                            style={{ 
                              color: priority.color,
                              backgroundColor: priority.bgColor,
                              borderColor: priority.color
                            }}
                          >
                            {priority.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{rec.description}</p>
                      </div>

                      {/* Metrics */}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>Impact: <strong>{rec.impact}</strong></span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>Time: <strong>{rec.effort}</strong></span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApply(rec.action)}
                          size="sm"
                          style={{ backgroundColor: rec.color }}
                        >
                          Apply Now
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            // Could open learning hub or detailed guide
                            if (onNavigate) {
                              onNavigate('learning');
                              onOpenChange(false);
                            }
                          }}
                        >
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Footer Info */}
          <Card style={{ backgroundColor: '#F9FAFB' }}>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 text-center">
                💡 These recommendations are updated daily based on your store performance and market trends. Check back tomorrow for new insights!
              </p>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Dismiss
          </Button>
          <Button 
            style={{ backgroundColor: '#4A90E2' }}
            onClick={() => onOpenChange(false)}
          >
            Got It
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
