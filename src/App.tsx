import { useState, useMemo } from 'react';
import { Sidebar, type NavSection } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { Footer } from '@/components/layout/Footer';
import { getCityData } from '@/data';
import type { CityId } from '@/data';
import { OverviewSection } from '@/components/sections/OverviewSection';
import { TransformerSection } from '@/components/sections/TransformerSection';
import { AlertsSection } from '@/components/sections/AlertsSection';
import { PowerLossSection } from '@/components/sections/PowerLossSection';
import { GridHealthSection } from '@/components/sections/GridHealthSection';
import { AnalyticsSection } from '@/components/sections/AnalyticsSection';
import { AIInsightsSection } from '@/components/sections/AIInsightsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { WhyUrjaGridSection } from '@/components/sections/WhyUrjaGridSection';
import { DemonstrationSection } from '@/components/sections/DemonstrationSection';
import { DataMethodologySection } from '@/components/sections/DataMethodologySection';
import { ContactSection } from '@/components/sections/ContactSection';
import { PrivacySection } from '@/components/sections/PrivacySection';
import { TermsSection } from '@/components/sections/TermsSection';
import { DataDisclaimerSection } from '@/components/sections/DataDisclaimerSection';
import { CookiePolicySection } from '@/components/sections/CookiePolicySection';

const dashboardSections: NavSection[] = [
  'overview', 'transformers', 'alerts', 'power-loss', 'grid-health', 'analytics', 'ai-insights',
];

function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('overview');
  const [selectedCity, setSelectedCity] = useState<CityId>('varanasi');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const dataset = useMemo(() => getCityData(selectedCity), [selectedCity]);
  const isDashboardSection = dashboardSections.includes(activeSection);

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <OverviewSection dataset={dataset} />;
      case 'transformers': return <TransformerSection dataset={dataset} />;
      case 'alerts': return <AlertsSection dataset={dataset} />;
      case 'power-loss': return <PowerLossSection dataset={dataset} />;
      case 'grid-health': return <GridHealthSection dataset={dataset} />;
      case 'analytics': return <AnalyticsSection dataset={dataset} />;
      case 'ai-insights': return <AIInsightsSection dataset={dataset} />;
      case 'about': return <AboutSection />;
      case 'why-urjagrid': return <WhyUrjaGridSection />;
      case 'demonstration': return <DemonstrationSection />;
      case 'data-methodology': return <DataMethodologySection />;
      case 'contact': return <ContactSection />;
      case 'privacy': return <PrivacySection />;
      case 'terms': return <TermsSection />;
      case 'data-disclaimer': return <DataDisclaimerSection />;
      case 'cookie-policy': return <CookiePolicySection />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex">
      <Sidebar
        active={activeSection}
        onNavigate={setActiveSection}
        isReal={dataset.city.isReal}
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          onMenuClick={() => setMobileSidebarOpen(true)}
          isReal={dataset.city.isReal}
        />
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          {renderSection()}
        </main>
        <Footer onNavigate={setActiveSection} />
      </div>
    </div>
  );
}

export default App;
