import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FileText, Mail, ArrowRight, Shield, Scale, Globe, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Terms of Service | XC Global Limited",
  description:
    "Review the Terms of Service governing your access to and use of XC Global Limited website, portals, and platforms (including GrowthOS and TalentOS).",
};

export default function TermsOfServicePage() {
  const sections = [
    { id: "acceptance-of-terms", title: "1. Acceptance of Terms" },
    { id: "eligibility", title: "2. Eligibility" },
    { id: "user-accounts", title: "3. User Accounts" },
    { id: "roles-and-access", title: "4. Roles and Access" },
    { id: "acceptable-use", title: "5. Acceptable Use" },
    { id: "intellectual-property", title: "6. Intellectual Property" },
    { id: "user-generated-content", title: "7. User-Generated Content" },
    { id: "service-availability", title: "8. Service Availability" },
    { id: "limitation-of-liability", title: "9. Limitation of Liability" },
    { id: "termination", title: "10. Termination" },
    { id: "governing-law", title: "11. Governing Law" },
    { id: "changes-to-terms", title: "12. Changes to These Terms" },
    { id: "contact-information", title: "13. Contact Information" },
  ];

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 pt-20">
        {/* Header Banner */}
        <section className="bg-surface-white border-b border-border py-14 lg:py-18">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-text-muted mb-4 font-medium">
              <Link href="/" className="hover:text-text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-text-secondary">Legal</span>
              <span>/</span>
              <span className="text-text-primary font-semibold">Terms of Service</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-badge-gold-bg text-badge-gold-text text-xs font-semibold mb-4">
              <Scale className="w-3.5 h-3.5" />
              <span>User Agreement &amp; Platform Terms</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-text-primary mb-3">
              Terms of Service
            </h1>
            <p className="text-text-secondary text-sm lg:text-base leading-relaxed">
              <strong>XC Global Limited</strong> &bull; Website:{" "}
              <a href="https://xcglobalhq.com" className="text-secondary hover:underline font-medium">
                xcglobalhq.com
              </a>{" "}
              &bull; <span>Last Updated: November 2026</span>
            </p>

            {/* Quick Switcher */}
            <div className="mt-6 pt-6 border-t border-border flex items-center gap-4 text-xs font-semibold">
              <Link
                href="/privacy"
                className="text-text-secondary hover:text-text-primary transition-colors pb-1 flex items-center gap-1 group"
              >
                <span>Privacy Policy</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <span className="text-text-primary border-b-2 border-secondary pb-1">
                Terms of Service
              </span>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            {/* Quick Navigation Card */}
            <div className="p-6 rounded-2xl bg-surface-white border border-border mb-12 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-secondary" />
                <span>Table of Contents</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="text-text-secondary hover:text-secondary transition-colors py-1"
                  >
                    {sec.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Document Body */}
            <div className="space-y-12 text-sm lg:text-base text-text-secondary leading-relaxed">
              {/* Introduction */}
              <div className="p-5 rounded-xl bg-surface-container-low border border-border/70 text-text-primary">
                <p>
                  Welcome to <strong>XC Global Limited</strong>. By accessing or using our website and platforms
                  (including <strong>GrowthOS</strong> and <strong>TalentOS</strong>), you agree to be bound by
                  these Terms of Service.
                </p>
                <p className="mt-3 text-xs text-text-secondary">
                  If you do not agree with these terms, please do not use our services.
                </p>
              </div>

              {/* Section 1 */}
              <div id="acceptance-of-terms" className="scroll-mt-28 space-y-3">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>Acceptance of Terms</span>
                </h2>
                <p>
                  These Terms of Service govern your access to and use of the XC Global website, portals, and
                  related services. By creating an account or using any part of our platform, you accept these
                  terms in full.
                </p>
              </div>

              {/* Section 2 */}
              <div id="eligibility" className="scroll-mt-28 space-y-3">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>Eligibility</span>
                </h2>
                <p>
                  You must be at least 18 years old to use our services. By using the platform, you represent
                  that you meet this requirement.
                </p>
              </div>

              {/* Section 3 */}
              <div id="user-accounts" className="scroll-mt-28 space-y-3">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>User Accounts</span>
                </h2>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                  <li>You are responsible for all activities that occur under your account.</li>
                  <li>
                    You agree to provide accurate and complete information when registering or submitting forms.
                  </li>
                  <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div id="roles-and-access" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span>Roles and Access</span>
                </h2>
                <p>Our platform supports different user roles:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-surface-white border border-border">
                    <p className="font-semibold text-text-primary text-sm mb-1">Business Users</p>
                    <p className="text-xs text-text-secondary">Access to GrowthOS workspace &amp; hiring requests</p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-white border border-border">
                    <p className="font-semibold text-text-primary text-sm mb-1">Talent Users</p>
                    <p className="text-xs text-text-secondary">Access to TalentOS profile &amp; placement opportunities</p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-white border border-border">
                    <p className="font-semibold text-text-primary text-sm mb-1">Administrators</p>
                    <p className="text-xs text-text-secondary">Full administrative &amp; platform management access</p>
                  </div>
                </div>
                <p className="text-xs text-text-secondary">
                  You may only access the areas of the platform that correspond to your assigned role.
                </p>
              </div>

              {/* Section 5 */}
              <div id="acceptable-use" className="scroll-mt-28 space-y-3">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    5
                  </span>
                  <span>Acceptable Use</span>
                </h2>
                <p>You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>Use the platform for any unlawful purpose</li>
                  <li>Submit false, misleading, or fraudulent information</li>
                  <li>Upload malicious files or content</li>
                  <li>Attempt to gain unauthorized access to other accounts or systems</li>
                  <li>Interfere with the proper functioning of the platform</li>
                  <li>Use the platform to harass, abuse, or harm others</li>
                </ul>
              </div>

              {/* Section 6 */}
              <div id="intellectual-property" className="scroll-mt-28 space-y-3">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    6
                  </span>
                  <span>Intellectual Property</span>
                </h2>
                <p>
                  All content on the XC Global website and platforms, including text, graphics, logos, and
                  software, is the property of XC Global Limited or its licensors and is protected by
                  intellectual property laws.
                </p>
                <p>
                  You may not copy, reproduce, distribute, or create derivative works from our content without
                  prior written permission.
                </p>
              </div>

              {/* Section 7 */}
              <div id="user-generated-content" className="scroll-mt-28 space-y-3">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    7
                  </span>
                  <span>User-Generated Content</span>
                </h2>
                <p>
                  By submitting content (including profiles, CVs, and form responses), you grant XC Global a
                  non-exclusive, worldwide license to use, store, and process that content for the purpose of
                  providing our services.
                </p>
                <p>
                  You retain ownership of your content, but you are solely responsible for its accuracy and
                  legality.
                </p>
              </div>

              {/* Section 8 */}
              <div id="service-availability" className="scroll-mt-28 space-y-3">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    8
                  </span>
                  <span>Service Availability</span>
                </h2>
                <p>
                  We strive to keep the platform available and secure. However, we do not guarantee
                  uninterrupted or error-free access. We may suspend or modify the service for maintenance,
                  updates, or other reasons.
                </p>
              </div>

              {/* Section 9 */}
              <div id="limitation-of-liability" className="scroll-mt-28 space-y-3">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    9
                  </span>
                  <span>Limitation of Liability</span>
                </h2>
                <p>
                  To the maximum extent permitted by law, XC Global Limited shall not be liable for any
                  indirect, incidental, special, or consequential damages arising from your use of the platform.
                </p>
                <p>
                  Our total liability for any claim related to the services shall not exceed the amount you have
                  paid us (if any) in the twelve (12) months preceding the claim.
                </p>
              </div>

              {/* Section 10 */}
              <div id="termination" className="scroll-mt-28 space-y-3">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    10
                  </span>
                  <span>Termination</span>
                </h2>
                <p>
                  We may suspend or terminate your access to the platform at any time if you breach these Terms
                  of Service or for any other reason at our discretion.
                </p>
                <p>
                  You may stop using the platform at any time. Upon termination, your right to use the platform
                  will cease immediately.
                </p>
              </div>

              {/* Section 11 */}
              <div id="governing-law" className="scroll-mt-28 space-y-3">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    11
                  </span>
                  <span>Governing Law</span>
                </h2>
                <div className="p-4 rounded-xl bg-surface-white border border-border">
                  <p className="text-text-primary font-medium">
                    These Terms of Service shall be governed by and construed in accordance with the laws of
                    the <strong>Federal Republic of Nigeria</strong>.
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the
                    courts in Nigeria.
                  </p>
                </div>
              </div>

              {/* Section 12 */}
              <div id="changes-to-terms" className="scroll-mt-28 space-y-3">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    12
                  </span>
                  <span>Changes to These Terms</span>
                </h2>
                <p>
                  We reserve the right to update these Terms of Service at any time. Continued use of the
                  platform after changes are posted constitutes acceptance of the revised terms.
                </p>
              </div>

              {/* Section 13 */}
              <div id="contact-information" className="scroll-mt-28 space-y-3">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    13
                  </span>
                  <span>Contact Information</span>
                </h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us at:
                </p>

                <div className="p-6 rounded-2xl bg-surface-white border border-border shadow-sm space-y-3">
                  <p className="font-bold text-text-primary text-base">XC Global Limited</p>
                  <p className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-secondary shrink-0" />
                    <span>Email: </span>
                    <a
                      href="mailto:legal@xcglobalhq.com"
                      className="text-secondary hover:underline font-semibold"
                    >
                      legal@xcglobalhq.com
                    </a>
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-secondary shrink-0" />
                    <span>Website: </span>
                    <a
                      href="https://xcglobalhq.com"
                      className="text-secondary hover:underline font-semibold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://xcglobalhq.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

