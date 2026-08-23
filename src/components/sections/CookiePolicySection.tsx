import { Cookie } from 'lucide-react';
import { LegalPage, LegalSection } from './LegalPage';

export function CookiePolicySection() {
  return (
    <LegalPage title="Cookie Policy" subtitle="How UrjaGrid uses cookies and similar technologies" icon={<Cookie className="w-4 h-4" />}>
      <LegalSection heading="Current Status">
        <p>
          The current version of UrjaGrid does not intentionally use cookies or similar tracking technologies
          for personal user tracking. The platform operates as a dashboard application without requiring
          authentication or personal data collection.
        </p>
      </LegalSection>
      <LegalSection heading="What Are Cookies">
        <p>
          Cookies are small text files stored on a user's device by websites they visit. They are commonly used
          to remember preferences, track sessions, and collect analytics data. UrjaGrid's current implementation
          does not require this functionality.
        </p>
      </LegalSection>
      <LegalSection heading="Future Changes">
        <p>
          If future versions of the platform introduce cookies for session management, analytics, or other
          purposes, this policy will be updated to clearly describe what cookies are used, why they are used,
          and how users can manage them.
        </p>
      </LegalSection>
      <LegalSection heading="Third-Party Services">
        <p>
          UrjaGrid may in the future integrate third-party services (such as analytics or mapping tools) that
          could use their own cookies. Any such integrations will be documented here with appropriate information
          about the third-party cookies involved.
        </p>
      </LegalSection>
      <LegalSection heading="Contact">
        <p>
          Questions about this cookie policy can be directed through the Contact page once official contact
          information is available.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
