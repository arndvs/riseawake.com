import { Link } from '@/components/link'

const TOC = [
  'Getting Started',
  'Installation',
  'License Activation',
  'Opening Your First .rsm File',
  'Core Concepts',
  'The .rsm Format',
  'Data Categories',
  'API Reference',
  'Troubleshooting',
  'Known Issues',
  'Contacting Support',
]

const SECTIONS = [
  {
    title: '1. Getting Started',
    content: null,
  },
  {
    title: '2. Installation',
    content: `Download the DataKit SDK installer from the link provided in your license confirmation email. Run the installer and follow the on-screen instructions. Installation requires administrator privileges.

If you encounter an error during installation, refer to Error Code Reference in Appendix B.

Appendix B is available to Enterprise customers.`,
  },
  {
    title: '3. License Activation',
    content: `Launch DataKit SDK. You will be prompted to activate your license. Enter your license key exactly as provided — the key is case-sensitive and contains no ambiguous characters, though several characters may appear similar depending on your display font. If activation fails, ensure your internet connection is active and that your firewall is not blocking RISE™ license servers.

A list of RISE™ license server IP addresses for firewall configuration is available upon written request to the RISE™ Developer Support team. Response time: 15 business days.

The SDK phones home on every launch for license verification. This is disclosed in the EULA, Section 31. It cannot be disabled.`,
  },
  {
    title: '4. Opening Your First .rsm File',
    content: `Once activated, select File > Open and navigate to your .rsm file. .rsm files are typically located on the USB drive delivered with your RISE™ Standard Data Package. If the USB drive is not recognized by your system, ensure your operating system is compatible with the DataKit SDK.

The Compatibility Matrix is available to registered DataKit SDK customers.

Allow 4–8 minutes for initial file loading on non-recommended hardware configurations. This is expected behavior.`,
  },
  {
    title: '5. Core Concepts — The .rsm Format',
    content: null,
  },
  {
    title: '6. Data Categories',
    content: `Your RSDP contains data in the following categories, visible in the DataKit SDK Data Category Browser:

— Sleep & Biometric Data
— Device & Performance Data
— Environmental Data
— Navigation Route Data
— Push Mode Session Logs
— RISE™ Index History
— Occupancy Data (currently unavailable — see Known Issues)
— Relationship Inference Data (access varies by package tier)
— Audio Classification Results (Pro and Enterprise only)
— Restricted Categories (visible as "Restricted" — DataKit Enterprise required)

Categories marked Restricted contain data RISE™ collects but is not currently providing access to. The categories exist. Their contents are not available at this time.`,
  },
  {
    title: '7. API Reference',
    content: `Coming soon.

The DataKit SDK API Reference will be published in a future documentation update. An estimated publication date is not available.

Enterprise customers may submit API reference questions to the Developer Support email. Response time: 15 business days.`,
  },
  {
    title: '8. Known Issues',
    content: `— Date filter displays incorrect results for dates after January 1, 2019. Workaround: filter by session ID instead. Session ID format documentation is forthcoming.

— Application may take 4–8 minutes to load on some systems. This is expected behavior.

— The RISE™ Index Viewer may display a score of 0 on first launch. This resolves after the application has been open for 24 hours. Do not close the application during this period.

— Audio files (.rsma) opened in DataKit Pro may play at incorrect speeds on certain hardware. The playback speed control is located in the View menu (DataKit Pro v1.4.2 and above). Version 1.4.2 release date: not yet available.

— The application crashes when navigating to the Occupancy Data category. Workaround: do not navigate to the Occupancy Data category. A fix is planned. No timeline is available.

— On macOS, the application may request microphone access during installation. This is unrelated to any functional feature. Decline or approve — behavior is identical either way.`,
  },
  {
    title: '9. Contacting Support',
    content: `Developer support is available to registered DataKit SDK customers via email.

Support email: developer-support@riseawake.com
Response time: 15 business days
Enterprise: 15 business days (prioritized)

When contacting support, please include: your license key, DataKit SDK version number, your operating system name and version (if unsupported, this information updates the Compatibility Matrix), a detailed description of the issue, and your RISE™ account number.

Support tickets submitted without all required information will be closed and the customer asked to resubmit. This resets the 15 business day response clock.`,
  },
]

export default function SDKDocsPage() {
  return (
    <main>
      <div className="px-6 pt-32 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 flex items-center gap-3 text-xs text-foreground-muted">
            <Link
              href="/sdk"
              className="transition-colors hover:text-foreground-secondary"
            >
              DataKit SDK
            </Link>
            <span>/</span>
            <span className="text-foreground-secondary">Documentation</span>
          </div>

          <p className="mb-4 text-xs tracking-[0.2em] text-foreground-muted uppercase">
            DataKit SDK
          </p>
          <h1 className="mb-2 font-display text-[clamp(2.5rem,5vw,4rem)] tracking-tight text-foreground">
            Documentation
          </h1>
          <p className="mb-12 text-xs text-foreground-muted/60">
            SDK v1.4.1 · Documentation v1.2 · Last updated February 2025
          </p>

          <div className="mb-12 rounded-sm border border-accent/15 bg-accent/6 p-4">
            <p className="text-xs leading-relaxed text-accent/75">
              <strong className="text-accent">Note:</strong> This documentation
              is available without a DataKit SDK license. Usefulness of this
              documentation without a license is limited. The SDK itself
              requires a license key delivered after purchase.{' '}
              <Link href="/sdk" className="text-accent/60 underline">
                Purchase DataKit SDK →
              </Link>
            </p>
          </div>

          <div className="mb-12 rounded-xl border border-edge bg-surface p-6">
            <p className="mb-4 text-xs font-medium text-foreground-secondary">
              Contents
            </p>
            {TOC.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 py-1.5 ${i > 0 ? 'border-t border-edge-subtle/30' : ''}`}
              >
                <span className="min-w-5 text-xs text-foreground-muted/50">
                  {i + 1}.
                </span>
                <span
                  className={`text-xs ${
                    item === 'API Reference' || item === 'Session Architecture'
                      ? 'text-foreground-muted/50'
                      : 'text-foreground-secondary'
                  }`}
                >
                  {item}
                  {item === 'API Reference' && (
                    <span className="ml-2 rounded bg-foreground/4 px-1.5 py-0.5 text-[10px] text-foreground-muted/50">
                      Coming Soon
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>

          {SECTIONS.map((section, i) => (
            <div key={i} className="mb-10 scroll-mt-24">
              <h2 className="mb-4 text-sm font-medium text-foreground-secondary">
                {section.title}
              </h2>
              {section.content ? (
                <div className="text-sm leading-8 whitespace-pre-line text-foreground-muted">
                  {section.content}
                </div>
              ) : (
                <p className="text-sm text-foreground-muted/60 italic">
                  See section above.
                </p>
              )}
              <div className="mt-6 border-t border-edge-subtle/30" />
            </div>
          ))}

          <div className="mt-12 rounded-xl border border-edge-subtle bg-foreground/2 p-6">
            <p className="text-xs leading-8 text-foreground-muted">
              This documentation is provided as-is. RISE™ makes no warranty that
              following these instructions will result in successful SDK
              operation. Compatibility with your specific operating system
              configuration cannot be confirmed without the Compatibility
              Matrix, which is available to registered customers. To become a
              registered customer,{' '}
              <Link href="/sdk" className="text-accent/50 underline">
                purchase DataKit SDK
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
