import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/pages/Dashboard';
import { Products } from './components/pages/Products';
import { Orders } from './components/pages/Orders';
import { Customers } from './components/pages/Customers';
import { Analytics } from './components/pages/Analytics';
import { LearningHub } from './components/pages/LearningHub';
import { EventWorkshop } from './components/pages/EventWorkshop';
import { Community } from './components/pages/Community';
import { Wallet } from './components/pages/Wallet';
import { Messages } from './components/pages/Messages';
import { Settings } from './components/pages/Settings';
import { Support } from './components/pages/Support';
import { AIAssistant } from './components/AIAssistant';
import { AIRecommendationsModal } from './components/AIRecommendationsModal';
import { toast } from 'sonner';

export type PageType = 'dashboard' | 'products' | 'orders' | 'customers' | 'analytics' | 
  'learning-hub' | 'event-workshop' | 'community' | 'wallet' | 'messages' | 'settings' | 'support';

export default function VendorDashboard() {
  const [activePage, setActivePage] = useState<PageType>('dashboard');
  const [showRecommendationsModal, setShowRecommendationsModal] = useState(false);

  // Handle navigation from AI
  const handleAINavigate = (page: string) => {
    const pageMap: { [key: string]: PageType } = {
      'products': 'products',
      'analytics': 'analytics',
      'messages': 'messages',
      'settings': 'settings',
      'learning': 'learning-hub',
      'events': 'event-workshop',
    };
    
    if (pageMap[page]) {
      setActivePage(pageMap[page]);
      toast.success(`Navigated to ${pageMap[page].replace('-', ' ')}`);
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard onNavigate={setActivePage} />;
      case 'products':
        return <Products />;
      case 'orders':
        return <Orders />;
      case 'customers':
        return <Customers />;
      case 'analytics':
        return <Analytics />;
      case 'learning-hub':
        return <LearningHub />;
      case 'event-workshop':
        return <EventWorkshop />;
      case 'community':
        return <Community />;
      case 'wallet':
        return <Wallet />;
      case 'messages':
        return <Messages />;
      case 'settings':
        return <Settings />;
      case 'support':
        return <Support />;
      default:
        return <Dashboard onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>

      {/* AI Assistant - Floating on all pages */}
      <AIAssistant 
        onNavigate={handleAINavigate}
        onOpenRecommendations={() => setShowRecommendationsModal(true)}
      />

      {/* AI Recommendations Modal */}
      <AIRecommendationsModal
        open={showRecommendationsModal}
        onOpenChange={setShowRecommendationsModal}
        onNavigate={handleAINavigate}
      />
    </div>
  );
}
