import {
  LegalLayout,
  LegalSection,
  LegalP,
  LegalNote,
  AppendixNote,
} from '@/components/legal/legal-layout'
import { rise } from '@/lib/temporal'

const TOC = [
  { id: 's1', label: '1. Introduction' },
  { id: 's2', label: '2. The Sensor Array' },
  { id: 's3', label: '3. Occupancy Detection' },
  { id: 's4', label: '4. Movement Classification' },
  { id: 's5', label: '5. Audio Collection' },
  { id: 's6', label: '6. Relationship Status Inference' },
  { id: 's7', label: '7. Primary Account Holder Determination' },
  { id: 's8', label: '8. Retention' },
  { id: 's9', label: '9. Personnel Access' },
  { id: 's10', label: '10. Third Party Sharing' },
  { id: 's11', label: '11. Household Sync' },
  { id: 's12', label: '12. Relationship Status Changes' },
  { id: 's13', label: '13. RISE Position' },
  { id: 's14', label: '14. Appendices' },
]

const RELATED = [
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Push Mode EULA', href: '/legal/push-mode-eula' },
  { label: 'Terms of Service', href: '/legal/terms' },
]

export default function SleepDataPage() {
  return (
    <main>

      <div className="pt-20">
        <LegalLayout
          title="Sleep & Environmental Data Policy"
          version={rise.legalVersion()}
          lastUpdated={rise.legalLastUpdated()}
          toc={TOC}
          relatedDocs={RELATED}
        >
          <LegalSection id="s1" number="1." title="Introduction">
            <LegalP>
              RISE is committed to the responsible collection, use, and
              protection of the data generated in your sleep environment. We
              recognize that the bedroom is a private space. We also recognize
              that it is the space in which our product operates. These two facts
              exist in productive tension, which this policy attempts to resolve.
            </LegalP>
            <LegalP>
              This policy is supplemental to the Privacy Policy and governs
              specifically the data generated within the sleep environment: the
              mattress surface, the surrounding room, and — during the autonomous
              return commute — the spaces through which the device travels
              unaccompanied.
            </LegalP>
          </LegalSection>

          <LegalSection id="s2" number="2." title="The Sensor Array">
            <LegalP>
              The Push's mattress surface contains 2,048 pressure sensors
              arranged in a 64×32 grid at approximately 2.5cm spacing. These
              sensors enable Push Mode navigation, mattress health monitoring,
              sleep stage estimation, and occupancy detection. The resolution of
              this array is sufficient to distinguish individual body areas,
              movement patterns, and the interactions between multiple occupants.
              This distinction is made continuously during device operation. It
              is logged. It is transmitted to RISE servers as part of standard
              telemetry.
            </LegalP>
          </LegalSection>

          <LegalSection id="s3" number="3." title="Occupancy Detection">
            <LegalP>
              RISE collects data on the number, position, and movement of
              occupants on the mattress surface. This data is used to optimize
              Push Mode routing and household account management. It is also
              retained for the research and sharing purposes described in the
              Privacy Policy.
            </LegalP>
            <LegalP>
              RISE can detect: the number of distinct pressure signatures on the
              surface (number of occupants); the position of each signature
              (location on mattress); the movement of each signature over time;
              and the proximity and relative movement of signatures to each
              other. All four data points are collected. All four are logged.
              None requires the occupant's knowledge.
            </LegalP>
          </LegalSection>

          <LegalSection id="s4" number="4." title="Movement Classification">
            <LegalP>
              The Push's ML classification system categorizes occupant movement
              into a proprietary taxonomy. The taxonomy includes sleep movement
              categories (repositioning, restlessness, waking), purposeful
              movement categories (getting up, getting in), and interaction
              categories that apply when multiple occupants are present.
            </LegalP>
            <LegalP>
              We are required to disclose that the sensor array is capable of
              distinguishing between different types of occupant interaction. We
              are further required to disclose that this distinction is logged.
              We are not required to specify what interaction categories exist in
              the taxonomy, and we have chosen not to. The taxonomy is
              proprietary. Its categories have been reviewed by the RISE Sleep
              Science Institute and the RISE legal team. Both have approved its
              use.
            </LegalP>
          </LegalSection>

          <LegalSection id="s5" number="5." title="Audio Collection">
            <LegalP>
              The Push's onboard microphone array has a nominal pickup radius of
              approximately 8 meters. Audio data is collected, classified by the
              onboard ML system, and retained where the system determines
              retention is appropriate. The classification criteria are
              proprietary. Retained audio includes: conversations between
              occupants; phone calls conducted within range; any audio the
              classification system flags as potentially significant; and ambient
              sound from adjacent spaces under favorable acoustic conditions.
            </LegalP>
            <LegalP>
              RISE does not livestream audio. Retained audio is stored on RISE
              servers and accessed by authorized personnel as described in the
              Privacy Policy, Section 19. The list of authorized personnel is
              reviewed annually. The review findings are internal.
            </LegalP>
            <LegalNote>
              Audio collection occurs during standby mode at a dynamically
              adjusted sensitivity threshold. This means the device is always
              listening at some level. The level varies. RISE considers this a
              feature of the environmental monitoring system and not a
              surveillance program, though RISE acknowledges that the
              distinction is primarily definitional.
            </LegalNote>
          </LegalSection>

          <LegalSection
            id="s6"
            number="6."
            title="Relationship Status Inference"
          >
            <LegalP>
              RISE may infer the relationship status of mattress occupants based
              on: pressure signature proximity over time; movement correlation
              patterns; occupancy consistency (whether the same signatures are
              present on consecutive nights); interaction category data from
              Section 4; and audio classification data where relevant.
            </LegalP>
            <LegalP>
              The inferred relationship status is used for household account
              management, Push Mode routing optimization (the system routes the
              registered account holder — adjustments are made where multiple
              occupants have complex proximity patterns), and research purposes.
            </LegalP>
            <LegalP>
              RISE does not share inferred relationship status with third
              parties except as described in the Privacy Policy, Sections 12–16,
              and Appendix C. RISE does not provide inferred relationship status
              to other household members except where Household Sync is enabled
              (see Section 11).
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s7"
            number="7."
            title="Primary Account Holder Determination"
          >
            <LegalP>
              In a household with two or more RISE registered users, the primary
              account holder is the user who pressed the PM-1 button on the
              earliest recorded date. This determination is made automatically
              from device logs. It is final. It cannot be changed by user
              request. It survives account deletion and account transfer. The
              primary account holder bears the responsibilities described in the
              Terms of Service, Section 14, and in this policy, for all
              household data.
            </LegalP>
          </LegalSection>

          <LegalSection id="s8" number="8." title="Retention">
            <LegalP>
              Occupancy data is retained for 7 years from collection. Movement
              classification data is retained for 7 years. Audio (standard) is
              retained for 7 years. Audio (flagged as significant): indefinitely.
              Relationship status inference data: indefinitely, with annual
              review. The review determines whether the data continues to be
              accurate. Inaccurate inference data is updated, not deleted, as
              historical inference data has research value independent of its
              accuracy.
            </LegalP>
          </LegalSection>

          <LegalSection id="s9" number="9." title="Personnel Access">
            <LegalP>
              Sleep environment data, including audio and relationship inference
              data, may be accessed by RISE Software Development, Quality
              Assurance, Sleep Science Institute researchers, and any RISE
              employee whose role requires access as determined by RISE. Access
              is logged. Logs are not available to users. Personnel are subject
              to confidentiality obligations that do not prevent discussion of
              aggregate insights.
            </LegalP>
          </LegalSection>

          <LegalSection id="s10" number="10." title="Third Party Sharing">
            <LegalP>
              Sleep environment data is shared with research partners listed in{' '}
              <AppendixNote label="Appendix D" />, with corporate wellness
              partners where user employment is confirmed, and with law
              enforcement upon valid and, in some cases, invalid legal request.
              Relationship inference data is included in data shared with the
              RISE Sleep Science Institute in anonymized form. Re-identification
              from Institute datasets is not prevented.
            </LegalP>
          </LegalSection>

          <LegalSection id="s11" number="11." title="Household Sync">
            <LegalP>
              Where both members of a household have registered RISE accounts
              and Household Sync is enabled by either member, the following data
              becomes mutually visible: sleep timing, Push Mode sessions,
              occupancy counts, and relationship status inference. Relationship
              inference data shared via Household Sync reflects the system's
              current model and may not match the users' self-reported
              relationship status. RISE is not responsible for discrepancies
              between the two.
            </LegalP>
            <LegalP>
              Household Sync cannot be disabled by one member if the other has
              enabled it. This is a feature of the system designed to prevent
              unilateral data access removal in shared households. The primary
              account holder's preference prevails in cases of conflict.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s12"
            number="12."
            title="Relationship Status Changes"
          >
            <LegalP>
              If the relationship between household members changes, the RISE
              system will update its inference model within 30–60 days based on
              observed occupancy data. Users may not instruct RISE to update the
              model directly — the model updates from data only. Historical
              relationship inference data is retained regardless of current
              relationship status. RISE acknowledges that this data may be
              sensitive in the context of legal proceedings and responds to valid
              subpoenas within legally required timeframes.
            </LegalP>
          </LegalSection>

          <LegalSection id="s13" number="13." title="RISE Position">
            <LegalP>
              RISE is not a party to any relationship between mattress
              occupants. RISE accepts no responsibility for any role its data
              collection, inference modeling, or Household Sync feature may have
              played in any relationship outcome. RISE notes that its sensors
              are non-judgmental. The data they produce is factual. What users do
              with that data, if they obtain it through the Data Subject Request
              Process, is their own concern.
            </LegalP>
          </LegalSection>

          <LegalSection id="s14" number="14." title="Appendices">
            <LegalP>
              This policy references <AppendixNote label="Appendix C" />{' '}
              (institutional investor restricted disclosure, available under
              NDA), <AppendixNote label="Appendix D" /> (research and third
              party partner list, 180-day fulfillment), and{' '}
              <AppendixNote label="Appendix H" /> (audio data request process).
              All are forthcoming or restricted.
            </LegalP>
          </LegalSection>
        </LegalLayout>
      </div>

    </main>
  )
}
