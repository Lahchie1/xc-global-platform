import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, Mail, ArrowRight, FileText, Lock, Globe } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | XC Global Limited",
  description:
    "Learn how XC Global Limited collects, uses, stores, and protects your personal information across our website and platforms including GrowthOS and TalentOS.",
};

export default function PrivacyPolicyPage() {
  const sections = [
    { id: "information-we-collect", title: "1. Information We Collect" },
    { id: "how-we-use-information", title: "2. How We Use Your Information" },
    { id: "how-we-share-information", title: "3. How We Share Your Information" },
    { id: "data-storage-and-security", title: "4. Data Storage and Security" },
    { id: "data-retention", title: "5. Data Retention" },
    { id: "your-rights", title: "6. Your Rights" },
    { id: "third-party-links", title: "7. Third-Party Links" },
    { id: "childrens-privacy", title: "8. Children’s Privacy" },
    { id: "changes-to-policy", title: "9. Changes to This Privacy Policy" },
    { id: "contact-us", title: "10. Contact Us" },
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
              <span className="text-text-primary font-semibold">Privacy Policy</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-badge-gold-bg text-badge-gold-text text-xs font-semibold mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Legal Policy</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-text-primary mb-3">
              Privacy Policy
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
              <span className="text-text-primary border-b-2 border-secondary pb-1">
                Privacy Policy
              </span>
              <Link
                href="/terms"
                className="text-text-secondary hover:text-text-primary transition-colors pb-1 flex items-center gap-1 group"
              >
                <span>Terms of Service</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
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
                  XC Global Limited (&ldquo;XC Global&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is
                  committed to protecting your privacy. This Privacy Policy explains how we collect, use,
                  store, and protect your personal information when you use our website and platforms
                  (including <strong>GrowthOS</strong> and <strong>TalentOS</strong>).
                </p>
                <p className="mt-3 text-xs text-text-secondary">
                  By using our website or services, you agree to the collection and use of information in
                  accordance with this policy.
                </p>
              </div>

              {/* Section 1 */}
              <div id="information-we-collect" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>Information We Collect</span>
                </h2>
                <p>We may collect the following types of information:</p>

                <div className="space-y-4 mt-3">
                  <div className="p-4 rounded-xl bg-surface-white border border-border">
                    <h3 className="font-semibold text-text-primary text-sm mb-2">
                      A. Information You Provide to Us
                    </h3>
                    <ul className="list-disc list-inside space-y-1.5 text-xs lg:text-sm text-text-secondary">
                      <li>Full name</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                      <li>Company name and details</li>
                      <li>Job title</li>
                      <li>Professional profile information (skills, experience, bio, CV/resume)</li>
                      <li>Any other information you submit through forms or portals</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-white border border-border">
                    <h3 className="font-semibold text-text-primary text-sm mb-2">
                      B. Automatically Collected Information
                    </h3>
                    <ul className="list-disc list-inside space-y-1.5 text-xs lg:text-sm text-text-secondary">
                      <li>IP address</li>
                      <li>Browser type and version</li>
                      <li>Device information</li>
                      <li>Pages visited and time spent on the website</li>
                      <li>Referring website</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-white border border-border">
                    <h3 className="font-semibold text-text-primary text-sm mb-2">
                      C. Cookies and Tracking Technologies
                    </h3>
                    <p className="text-xs lg:text-sm text-text-secondary">
                      We may use cookies and similar technologies to improve user experience, analyze traffic,
                      and understand how our services are used.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div id="how-we-use-information" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>How We Use Your Information</span>
                </h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>Provide and manage our services</li>
                  <li>Process business onboarding applications</li>
                  <li>Create and manage user accounts (Business and Talent)</li>
                  <li>Communicate with you regarding your application or account</li>
                  <li>Improve our website and services</li>
                  <li>Send important administrative or service-related messages</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div id="how-we-share-information" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>How We Share Your Information</span>
                </h2>
                <p className="font-medium text-text-primary">
                  We do not sell your personal information.
                </p>
                <p>We may share your information only in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>With authorized XC Global team members for service delivery</li>
                  <li>
                    With service providers who assist us in operating our platform (e.g., hosting, email
                    delivery), under strict confidentiality
                  </li>
                  <li>When required by law or to protect our legal rights</li>
                  <li>With your consent</li>
                </ul>

                <div className="p-4 rounded-xl bg-badge-gold-bg/40 border border-secondary/30 mt-4">
                  <p className="text-xs lg:text-sm font-semibold text-badge-gold-text flex items-center gap-2">
                    <Lock className="w-4 h-4 text-secondary shrink-0" />
                    <span>
                      Talent profiles are private by default and are only visible to XC Global administrators
                      and approved businesses.
                    </span>
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div id="data-storage-and-security" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span>Data Storage and Security</span>
                </h2>
                <p>
                  We take reasonable technical and organizational measures to protect your personal data
                  against unauthorized access, loss, or misuse. However, no method of transmission over the
                  internet is 100% secure.
                </p>
                <p>Your data is stored securely using trusted third-party infrastructure.</p>
              </div>

              {/* Section 5 */}
              <div id="data-retention" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    5
                  </span>
                  <span>Data Retention</span>
                </h2>
                <p>
                  We retain your personal information only for as long as necessary to fulfill the purposes
                  outlined in this policy, or as required by law. You may request deletion of your account and
                  associated data by contacting us.
                </p>
              </div>

              {/* Section 6 */}
              <div id="your-rights" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    6
                  </span>
                  <span>Your Rights</span>
                </h2>
                <p>Depending on your location, you may have the right to:</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to or restrict certain processing</li>
                  <li>Withdraw consent where processing is based on consent</li>
                </ul>
                <p className="text-xs pt-1">
                  To exercise any of these rights, please contact us using the details below.
                </p>
              </div>

              {/* Section 7 */}
              <div id="third-party-links" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    7
                  </span>
                  <span>Third-Party Links</span>
                </h2>
                <p>
                  Our website may contain links to third-party websites. We are not responsible for the privacy
                  practices or content of those websites.
                </p>
              </div>

              {/* Section 8 */}
              <div id="childrens-privacy" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    8
                  </span>
                  <span>Children’s Privacy</span>
                </h2>
                <p>
                  Our services are not intended for individuals under the age of 18. We do not knowingly
                  collect personal information from children.
                </p>
              </div>

              {/* Section 9 */}
              <div id="changes-to-policy" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    9
                  </span>
                  <span>Changes to This Privacy Policy</span>
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. The updated version will be posted on
                  this page with a revised &ldquo;Last Updated&rdquo; date.
                </p>
              </div>

              {/* Section 10 */}
              <div id="contact-us" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-low border border-border text-secondary flex items-center justify-center text-xs font-bold">
                    10
                  </span>
                  <span>Contact Us</span>
                </h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>

                <div className="p-6 rounded-2xl bg-surface-white border border-border shadow-sm space-y-3">
                  <p className="font-bold text-text-primary text-base">XC Global Limited</p>
                  <p className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-secondary shrink-0" />
                    <span>Email: </span>
                    <a
                      href="mailto:privacy@xcglobalhq.com"
                      className="text-secondary hover:underline font-semibold"
                    >
                      privacy@xcglobalhq.com
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

