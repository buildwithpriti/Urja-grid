import { Shield } from 'lucide-react';
import { LegalPage, LegalSection } from './LegalPage';

export function PrivacySection() {
  return (
    <LegalPage title="Privacy Policy" subtitle="How UrjaGrid handles information" icon={<Shield className="w-4 h-4" />}>
      <LegalSection heading="Overview">
        <p>
          UrjaGrid is a platform designed for energy-grid information and monitoring. This privacy policy explains
          what information the platform does and does not collect.
        </p>
      </LegalSection>
      <LegalSection heading="Personal Information">
        <p>
          The current version of UrjaGrid does not collect personal user information. The platform does not require
          user accounts, authentication, or personal data submission to view the dashboard. The contact form on the
          Contact page is a UI placeholder and does not transmit any data to a server.
        </p>
      </LegalSection>
      <LegalSection heading="Grid Data">
        <p>
          UrjaGrid displays energy-grid monitoring data, including transformer counts, health scores, alert information,
          and power-loss metrics. This data pertains to electrical infrastructure and does not contain personal
          information about individuals.
        </p>
      </LegalSection>
      <LegalSection heading="Cookies & Tracking">
        <p>
          The current version of UrjaGrid does not intentionally use cookies or tracking technologies for personal
          user tracking. Please refer to the Cookie Policy page for more details.
        </p>
      </LegalSection>
      <LegalSection heading="Future Updates">
        <p>
          If future versions of the platform introduce user accounts, data collection, or tracking technologies,
          this privacy policy will be updated accordingly to reflect those changes transparently.
        </p>
      </LegalSection>
      <LegalSection heading="Contact">
        <p>
          Questions about this privacy policy can be directed through the Contact page once official contact
          information is available.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
