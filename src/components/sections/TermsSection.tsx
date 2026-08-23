import { FileText } from 'lucide-react';
import { LegalPage, LegalSection } from './LegalPage';

export function TermsSection() {
  return (
    <LegalPage title="Terms & Conditions" subtitle="Terms of use for the UrjaGrid platform" icon={<FileText className="w-4 h-4" />}>
      <LegalSection heading="Platform Description">
        <p>
          UrjaGrid is an energy monitoring and analytics platform. It provides dashboards, charts, and insights
          based on connected grid data sources.
        </p>
      </LegalSection>
      <LegalSection heading="Intended Use">
        <p>
          Information displayed on UrjaGrid is intended for monitoring, analysis and decision-support purposes.
          The platform helps operators understand grid conditions, identify anomalies, and prioritize areas
          for investigation.
        </p>
      </LegalSection>
      <LegalSection heading="No Guarantee of Predictions">
        <p>
          Users should not treat dashboard insights as guaranteed predictions or official operational instructions.
          AI-generated insights are summaries of available data and should be verified through appropriate
          operational procedures before taking action.
        </p>
      </LegalSection>
      <LegalSection heading="Demo Data">
        <p>
          Demo and sample data must not be represented as actual live grid conditions. Cities marked as
          "Demo / Prototype" use simulated values for demonstration purposes only. Real data is clearly
          labeled as "Data Available."
        </p>
      </LegalSection>
      <LegalSection heading="Platform Evolution">
        <p>
          The platform may be updated as data sources and features evolve. This includes adding new cities,
          replacing demo data with real datasets, and introducing new monitoring capabilities. Users should
          check back periodically for the latest information.
        </p>
      </LegalSection>
      <LegalSection heading="Accuracy Disclaimer">
        <p>
          While UrjaGrid strives to present data accurately, the availability, accuracy, and update frequency
          of displayed information may vary depending on the connected data source. Users should verify critical
          information through independent channels when necessary.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
