import {
  LegalLayout,
  LegalSection,
  LegalP,
  LegalNote,
} from '@/components/legal/legal-layout'

const TOC = [
  { id: 's1', label: '1. Grant of License' },
  { id: 's2', label: '2. License Restrictions' },
  { id: 's3', label: '3. Push Mode Operation' },
  { id: 's4', label: '4. Permitted Use' },
  { id: 's5', label: '5. Prohibited Modifications' },
  { id: 's6', label: '6. Accidental Activation' },
  { id: 's7', label: '7. Over-the-Air Updates' },
  { id: 's8', label: '8. The Off Switch (Software)' },
  { id: 's9', label: '9. Data License' },
  { id: 's10', label: '10. Telemetry' },
  { id: 's11', label: '11. The Remote' },
  { id: 's12', label: '12. Guest and Secondary Occupants' },
  { id: 's13', label: '13. Termination' },
  { id: 's14', label: '14. Acknowledgment — Iteration 1' },
  { id: 's15', label: '15. Acknowledgment — Iteration 2' },
  { id: 's16', label: '16. Acknowledgment — Iteration 3' },
  { id: 's17', label: '17. Acknowledgment — Final' },
  { id: 's18', label: '18. Governing Law' },
  { id: 's19', label: '19. Severability' },
]

const RELATED = [
  { label: 'Terms of Service', href: '/legal/terms' },
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Sleep Data Policy', href: '/legal/sleep-data-policy' },
]

export default function EulaPage() {
  return (
    <main>

      <div className="pt-20">
        <LegalLayout
          title="Push Mode End User License Agreement"
          version="Version 4.2"
          lastUpdated="March 1, 2025"
          toc={TOC}
          relatedDocs={RELATED}
        >
          <LegalSection id="s1" number="1." title="Grant of License">
            <LegalP>
              RISE grants you a non-exclusive, non-transferable,
              non-sublicensable, non-revocable license to use Push Mode on a
              single RISE Smart Adjustable Base registered to your account. The
              license is non-revocable. This is noted here in Section 1 because
              it is the most important characteristic of the license and RISE
              wants it established early.
            </LegalP>
          </LegalSection>

          <LegalSection id="s2" number="2." title="License Restrictions">
            <LegalP>
              You may not: transfer your Push Mode license to another person or
              device; use Push Mode on more than one device without purchasing
              additional licenses; sublicense Push Mode to third parties; or
              attempt to revoke your own license. The license does not expire. It
              cannot be returned. RISE does not offer license refunds after Push
              Mode has been activated.
            </LegalP>
          </LegalSection>

          <LegalSection id="s3" number="3." title="Push Mode Operation">
            <LegalP>
              Push Mode is a software system that activates the base's autonomous
              morning routing sequence. When initiated, Push Mode transitions the
              base to vertical, activates the self-making mechanism, and
              navigates the user through a pre-mapped morning routine until
              departure. Push Mode operates without requiring input from the user
              after the initial button press. This is correct. This is the
              product.
            </LegalP>
          </LegalSection>

          <LegalSection id="s4" number="4." title="Permitted Use">
            <LegalP>
              Push Mode is licensed for personal residential morning use. It is
              designed for use in private dwellings. Use of Push Mode in hotels,
              vehicles, offices, or other non-residential environments is not
              recommended and is not covered by warranty. RISE is aware that
              Push Mode has been used in all of these environments. RISE does
              not encourage this. RISE also does not prevent it.
            </LegalP>
          </LegalSection>

          <LegalSection id="s5" number="5." title="Prohibited Modifications">
            <LegalP>
              You may not modify Push Mode in any way. This includes: installing
              third-party software on the device; attempting to intercept Push
              Mode navigation signals; physically modifying the caster base,
              motor, or control circuitry; and placing objects in the base's path
              with the intent of stopping it. RISE considers the last item a
              prohibited modification to the navigation environment rather than
              the software, but includes it here for completeness.
            </LegalP>
          </LegalSection>

          <LegalSection id="s6" number="6." title="Accidental Activation">
            <LegalP>
              Push Mode initiated by accidental contact with the PM-1 button,
              including contact during sleep, constitutes activation. Accidental
              activation is activation. The user's intent at the moment of button
              contact is not a factor in determining whether Push Mode has been
              initiated. Push Mode has been initiated. The morning has begun.
            </LegalP>
            <LegalNote>
              RISE has received feedback that accidental activation is a
              concern. RISE has reviewed this feedback. The PM-1 remote will not
              be redesigned to prevent accidental activation. Users who are
              concerned about accidental activation should store the remote in a
              location not accessible during sleep. RISE notes that the remote's
              glow is designed to make it findable in darkness, which may
              conflict with this recommendation.
            </LegalNote>
          </LegalSection>

          <LegalSection id="s7" number="7." title="Over-the-Air Updates">
            <LegalP>
              RISE reserves the right to modify Push Mode at any time via
              over-the-air update. Updates may alter routing patterns, activation
              timing, Push Mode intensity, self-making mechanism behavior, and
              audio classification thresholds. Updated Push Mode behavior
              constitutes the product after the update. Continued use following
              an update constitutes acceptance of the updated behavior. Updates
              will not add an off switch.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s8"
            number="8."
            title="The Off Switch (Software)"
          >
            <LegalP>
              Push Mode does not have a software off switch. This is not a bug,
              an oversight, or an opportunity for a workaround. It is a
              deliberate architectural decision made by RISE's engineering team,
              reviewed by RISE's product team, approved by RISE's board, and
              stated in every version of this EULA since version 1.0. No update
              will add an off switch. No version of Push Mode has ever had an off
              switch. No version of Push Mode will ever have an off switch. RISE
              considers this section complete.
            </LegalP>
          </LegalSection>

          <LegalSection id="s9" number="9." title="Data License">
            <LegalP>
              By activating Push Mode, you grant RISE a perpetual, worldwide,
              royalty-free license to use all data generated during Push Mode
              sessions for product improvement, research, and any other purpose
              described in the Privacy Policy, the Sleep & Environmental Data
              Policy, and the documents those documents reference. This license
              is irrevocable. It persists after account deletion.
            </LegalP>
          </LegalSection>

          <LegalSection id="s10" number="10." title="Telemetry">
            <LegalP>
              Push Mode transmits telemetry data to RISE servers during and
              after each session. Telemetry includes navigation route data,
              compliance metrics, resistance index, environmental sensor
              readings, and audio classification results. Telemetry is
              transmitted encrypted. It cannot be disabled. Disabling telemetry
              would prevent Push Mode from functioning, as the navigation
              algorithm relies on server-side computation. RISE considers
              telemetry part of the product, not an optional feature.
            </LegalP>
          </LegalSection>

          <LegalSection id="s11" number="11." title="The Remote">
            <LegalP>
              The PM-1 remote is a single-function device. Its function is to
              initiate Push Mode. It has one button. Pressing the button
              initiates Push Mode. Pressing the button again does not stop Push
              Mode — it provides a second confirmation of the original input,
              which the system has already received and acted upon. The remote is
              working correctly in all scenarios in which it has ever been
              reported to be malfunctioning.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s12"
            number="12."
            title="Guest and Secondary Occupants"
          >
            <LegalP>
              Secondary occupants of the sleep environment — persons who did not
              press the PM-1 button but are present on the mattress surface when
              Push Mode initiates — are subject to Push Mode for the duration of
              the session. Their data is collected. Their physical experience of
              the session is their own responsibility and the primary account
              holder's legal responsibility as described in the Terms of Service.
            </LegalP>
          </LegalSection>

          <LegalSection id="s13" number="13." title="Termination">
            <LegalP>
              This EULA terminates when you stop using Push Mode. After
              termination, data collected during Push Mode sessions continues to
              be used under the perpetual license granted in Section 9. The RISE
              Index score derived from your usage continues to exist. Inferred
              data derived from your sessions continues to exist. Termination
              means you have stopped pressing the button. It does not mean RISE
              has stopped using what pressing the button produced.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s14"
            number="14."
            title="Acknowledgment — Iteration 1"
          >
            <LegalP>
              By using Push Mode you acknowledge that Push Mode cannot be
              manually interrupted once initiated. This is a feature, not a
              limitation. You were informed of this before purchase.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s15"
            number="15."
            title="Acknowledgment — Iteration 2"
          >
            <LegalP>
              You were informed of this on the back of the PM-1 remote, which
              you received with your purchase and have had in your possession
              since.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s16"
            number="16."
            title="Acknowledgment — Iteration 3"
          >
            <LegalP>
              You were informed of this in this document, which you are currently
              reading, in Section 3, Section 7, Section 8, and now Section 16.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s17"
            number="17."
            title="Acknowledgment — Final"
          >
            <LegalP>
              You are being informed of this again now. Continuing to read this
              document constitutes acknowledgment of all prior acknowledgments.
              RISE considers this section the most important section in any of
              its legal documents and thanks you for reaching it.
            </LegalP>
          </LegalSection>

          <LegalSection id="s18" number="18." title="Governing Law">
            <LegalP>
              This EULA is governed by the laws of the State of Delaware.
              Disputes are subject to binding arbitration as described in the
              Terms of Service, Section 19.
            </LegalP>
          </LegalSection>

          <LegalSection id="s19" number="19." title="Severability">
            <LegalP>
              If any provision of this EULA is found unenforceable, the remaining
              provisions remain in full force. Specifically: if the
              non-revocability of the license in Section 1 is found
              unenforceable, Push Mode will continue to operate pending legal
              resolution. RISE does not anticipate that the distinction between
              an enforceable and unenforceable non-revocability clause will be
              meaningful in practice, as the product will continue to function
              either way.
            </LegalP>
          </LegalSection>
        </LegalLayout>
      </div>

    </main>
  )
}
