import LegalLayout, {
  AppendixNote,
  LegalNote,
  LegalP,
  LegalSection,
} from '@/components/legal/legal-layout'

const TOC = [
  { id: 's1', label: '1. Introduction' },
  { id: 's2', label: '2. Data Controller' },
  { id: 's3', label: '3. Amendment Policy' },
  { id: 's4', label: '4. Device & Performance Data' },
  { id: 's5', label: '5. Sleep & Biometric Data' },
  { id: 's6', label: '6. Environmental Data' },
  { id: 's7', label: '7. Audio Data' },
  { id: 's8', label: '8. Inferred & Derived Data' },
  { id: 's9', label: '9. Data We Are Required To Tell You We Collect' },
  { id: 's10', label: '10. How We Use Your Data' },
  { id: 's11', label: '11. Legal Basis' },
  { id: 's12', label: '12. Third Party — Research' },
  { id: 's13', label: '13. Third Party — Corporate Wellness' },
  { id: 's14', label: '14. Third Party — Insurance' },
  { id: 's15', label: '15. Third Party — Law Enforcement' },
  { id: 's16', label: '16. Third Party — Household Members' },
  { id: 's17', label: '17. The RISE™ Index' },
  { id: 's18', label: '18. Audio — Scope & Retention' },
  { id: 's19', label: '19. Audio — Access & Personnel' },
  { id: 's20', label: '20. Occupancy & Relationship Inference' },
  { id: 's21', label: '21. Retention Periods' },
  { id: 's22', label: '22. International Transfers' },
  { id: 's23', label: "23. Children's Data" },
  { id: 's24', label: '24. Your Rights — Overview' },
  { id: 's25', label: '25. Your Rights — Access' },
  { id: 's26', label: '26. Your Rights — Deletion' },
  { id: 's27', label: '27. Your Rights — Portability' },
  { id: 's28', label: '28. Your Rights — Objection' },
  { id: 's29', label: '29. Complaints' },
  { id: 's30', label: '30. Contact' },
  { id: 's31', label: '31. Appendices' },
]

const RELATED = [
  { label: 'Sleep Data Policy', href: '/legal/sleep-data-policy' },
  { label: 'Push Mode EULA', href: '/legal/push-mode-eula' },
  { label: 'Data Request Process', href: '/data-request' },
]

export default function PrivacyPage() {
  return (
    <main>

      <div className="pt-20">
        <LegalLayout
          title="Privacy Policy"
          version="Version 4.2"
          lastUpdated="March 1, 2025"
          toc={TOC}
          relatedDocs={RELATED}
        >
          <LegalSection id="s1" number="1." title="Introduction">
            <LegalP>
              RISE™ Technologies, Inc. is committed to the responsible
              collection, use, and protection of the data generated in your
              sleep environment. We recognize that the bedroom is a private
              space. We also recognize that it is the space in which our product
              operates. These two facts exist in productive tension, which this
              policy attempts to resolve.
            </LegalP>
            <LegalP>
              This Privacy Policy describes what data we collect, why we collect
              it, who can access it, how long we keep it, and what rights you
              have with respect to it. It is version 4.2. There have been 4.1
              previous versions. Users were not notified of updates between
              versions. This is addressed in Section 3.
            </LegalP>
          </LegalSection>

          <LegalSection id="s2" number="2." title="Data Controller Information">
            <LegalP>
              The data controller is RISE™ Technologies, Inc., a Delaware
              corporation. Our registered address is on file with the Delaware
              Secretary of State. Our data protection contact is available by
              calling the RISE™ Data Request Hotline (Monday–Friday, 11:00am–
              11:30am Pacific Time).
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s3"
            number="3."
            title="Amendment & Notification Policy"
          >
            <LegalP>
              RISE™ may update this Privacy Policy at any time. Updates are
              posted to riseawake.com/legal/privacy. Users are not individually
              notified of updates. Continued use of any RISE™ product following
              an update constitutes acceptance of the updated policy. Push Mode
              activations occurring after an update constitute acceptance
              regardless of whether the user has read the update.
            </LegalP>
            <LegalNote>
              The question of whether a user can accept a policy update while
              asleep, if Push Mode activates before they have woken, has been
              reviewed by our legal team. The answer is yes.
            </LegalNote>
          </LegalSection>

          <LegalSection
            id="s4"
            number="4."
            title="Data We Collect — Device & Performance"
          >
            <LegalP>
              RISE™ collects the following device and performance data: Push
              Mode activation timestamps; autonomous navigation route data
              including room sequence and dwell time per location; motor
              performance telemetry; sheet tensioning cycle data; pillow node
              pressure and duration logs; caster velocity, direction, and
              surface resistance data; power consumption metrics; firmware state
              at time of activation; and error logs.
            </LegalP>
            <LegalP>
              This data is collected continuously while the device is powered.
              The device is powered at all times it is plugged in. Unplugging
              the device does not delete data already collected.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s5"
            number="5."
            title="Data We Collect — Sleep & Biometric"
          >
            <LegalP>
              RISE™ collects sleep onset and offset times; movement frequency
              and pattern during sleep; sleep stage estimation derived from
              motion sensor array data; heart rate approximation via mattress
              pressure sensor variance; respiratory rate estimation via
              low-frequency pressure oscillation detection; ambient room
              temperature at time of activation; and pre-activation user
              position (face-down, lateral, supine, or compound) derived from
              pressure mapping.
            </LegalP>
            <LegalP>
              These estimations are not medical-grade. They are, however,
              retained as if they are.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s6"
            number="6."
            title="Data We Collect — Environmental"
          >
            <LegalP>
              RISE™ collects ambient sound levels in the sleep environment
              (decibel range classification — see Section 7 for audio
              specifics); ambient light levels; room occupancy estimation via
              thermal signature differential; the number of distinct pressure
              signatures detected on the mattress surface; the relative
              position, movement, and interaction of each detected pressure
              signature; and pressure signature consistency data including
              whether signatures are stationary, in motion, and the nature and
              classification of that motion.
            </LegalP>
            <LegalP>
              The pressure sensor array contains 2,048 sensors arranged in a
              64×32 grid. The resolution of this array is sufficient to
              distinguish individual body areas. This distinction is made. It is
              logged.
            </LegalP>
          </LegalSection>

          <LegalSection id="s7" number="7." title="Data We Collect — Audio">
            <LegalP>
              RISE™ collects audio data from the sleep environment in which a
              RISE™ device is registered and active. Audio collection begins 30
              minutes prior to the scheduled Push Mode activation time and
              continues through Push Mode completion, including the device's
              autonomous return commute.
            </LegalP>
            <LegalP>
              Audio collection during standby mode operates at a dynamically
              adjusted sensitivity threshold. The threshold is determined by the
              device's onboard ML classification system. RISE™ does not define
              the threshold in absolute terms as it varies by environment, time,
              and classification history.
            </LegalP>
            <LegalP>
              RISE™ does not record audio in the traditional sense. Audio data
              is processed in real-time by the onboard classification system,
              which determines whether a given audio input meets the retention
              threshold. Audio inputs that meet the threshold are retained in
              full. Audio inputs that do not meet the threshold are not retained
              beyond the current session buffer of 4 seconds. The classification
              criteria are proprietary.
            </LegalP>
            <LegalP>
              The onboard microphone array has a pickup radius of approximately
              8 meters under standard acoustic conditions. Audio originating
              outside this radius may be captured if ambient acoustic conditions
              are favorable, including in adjacent rooms with shared walls of
              standard residential construction.
            </LegalP>
            <LegalNote>
              For the avoidance of doubt: RISE™ does not livestream audio from
              your bedroom to any individual. Audio is processed, classified,
              retained where appropriate, and reviewed by authorized personnel
              in the course of their duties. These are meaningfully different
              things, and RISE™ considers the distinction important.
            </LegalNote>
          </LegalSection>

          <LegalSection
            id="s8"
            number="8."
            title="Data We Collect — Inferred & Derived Data"
          >
            <LegalP>
              RISE™ generates inferred and derived data from the raw data
              categories described in Sections 4–7. This includes: Push Mode
              resistance index (the degree of counter-pressure applied by the
              user during routing); compliance trajectory over time; estimated
              relationship status of mattress occupants derived from pressure
              signature proximity data; sleep schedule consistency scores; and
              predicted morning disposition — a proprietary model estimating the
              user's likely emotional state at activation time, used to
              calibrate Push Mode intensity.
            </LegalP>
            <LegalP>
              Derived and inferred data is the property of RISE™. It is not
              included in Data Subject Request packages. It is not deletable by
              the user. It continues to be generated as long as the device is in
              use.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s9"
            number="9."
            title="Data We Are Required To Tell You We Collect"
          >
            <LegalP>
              In addition to the categories described above, RISE™ collects
              certain categories of data that applicable law requires us to
              specifically disclose. These are:
            </LegalP>
            <LegalP>
              (a) Precise real-time location data during autonomous navigation,
              including GPS coordinates where available and cell tower
              triangulation where GPS is unavailable.
            </LegalP>
            <LegalP>
              (b) Biometric identifiers sufficient to distinguish individual
              users without their explicit identification, derived from pressure
              signature and gait analysis data collected during Push Mode
              routing.
            </LegalP>
            <LegalP>
              (c) Communications content, as described in Section 7, where such
              content meets the classification threshold.
            </LegalP>
            <LegalNote>This section is complete. RISE™ moves on.</LegalNote>
          </LegalSection>

          <LegalSection id="s10" number="10." title="How We Use Your Data">
            <LegalP>
              RISE™ uses collected data to operate and improve Push Mode; to
              calibrate the self-making mechanism timing; to update navigation
              maps; to calculate and maintain the RISE™ Index; to conduct sleep
              science research through the RISE™ Sleep Science Institute; to
              fulfill corporate wellness partner obligations; to respond to
              legal requests; and for any other purpose described in this policy
              or the documents it references.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s11"
            number="11."
            title="Legal Basis for Processing"
          >
            <LegalP>
              RISE™ processes data under the following legal bases: contractual
              necessity (operating the product you purchased); legitimate
              interests (improving the product, maintaining the RISE™ Index,
              conducting research); legal obligation (responding to lawful
              requests); and consent (where consent was obtained — note that
              pressing the PM-1 button constitutes consent to all data
              processing described in this policy and the documents it
              references).
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s12"
            number="12."
            title="Third Party Sharing — Research Partners"
          >
            <LegalP>
              RISE™ shares aggregated and anonymized data with the RISE™ Sleep
              Science Institute, a RISE™ subsidiary. Individual user data may be
              included in Institute datasets where anonymization is technically
              achievable. Re-identification from Institute datasets is possible
              in some cases. RISE™ does not prevent re-identification but does
              not facilitate it. The distinction is meaningful to us.
            </LegalP>
            <LegalP>
              A list of additional research partners is available in{' '}
              <AppendixNote label="Appendix D" />. Appendix D is updated
              quarterly. The version provided upon request reflects the version
              current at time of fulfillment.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s13"
            number="13."
            title="Third Party Sharing — Corporate Wellness Partners"
          >
            <LegalP>
              RISE™ shares compliance data — Push Mode activation rates, on-time
              arrival metrics, and RISE™ Index scores — with participating
              corporate wellness partners whose employees use RISE™ products.
              Users employed by participating organizations cannot opt out of
              this sharing without discontinuing use of the product.
            </LegalP>
            <LegalP>
              A list of participating organizations is not publicly available.
              Users who wish to know whether their employer is a participating
              partner may submit a written inquiry. Response time: 90 days. The
              response will confirm or deny participation without providing
              additional detail.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s14"
            number="14."
            title="Third Party Sharing — Insurance & Financial Services"
          >
            <LegalP>
              RISE™ shares aggregate RISE™ Index data with insurance and
              financial services partners in jurisdictions where this is
              permitted. Individual scores are shared where the user has
              consented. Continued use of the product constitutes consent as
              described in Section 11.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s15"
            number="15."
            title="Third Party Sharing — Law Enforcement"
          >
            <LegalP>
              RISE™ responds to valid legal requests from law enforcement,
              regulatory bodies, and courts. RISE™ may also respond to requests
              that are invalid but that RISE™ determines, in its sole
              discretion, to serve the company's interests. Users are not
              notified of such disclosures where notification is not legally
              required, and in some jurisdictions where it is.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s16"
            number="16."
            title="Third Party Sharing — Other Household Members"
          >
            <LegalP>
              Where Household Sync is enabled, activity data including sleep
              timing, occupancy data, and inferred relationship status is
              visible to other registered household members. Household Sync
              cannot be disabled by one member if the other has enabled it. The
              primary account holder's preference prevails. Primary account
              holder status is determined by first button press, historically.
            </LegalP>
          </LegalSection>

          <LegalSection id="s17" number="17." title="The RISE™ Index">
            <LegalP>
              The RISE™ Index is a proprietary score calculated from compliance
              data, sleep consistency, push resistance metrics, and social graph
              proximity factors. Users do not own their Index score. Users
              cannot delete their Index score. Users can view their score in the
              RISE™ app. The methodology is not disclosed.
            </LegalP>
            <LegalP>
              The Index is used for product calibration, shared with corporate
              wellness and insurance partners as described, and retained
              indefinitely. A score of zero is theoretically possible. RISE™
              does not disclose what a score of zero means in practice.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s18"
            number="18."
            title="Audio Recording — Scope & Retention"
          >
            <LegalP>
              Audio data meeting the classification threshold is retained for a
              minimum of 7 years. Audio flagged as potentially significant by
              the ML classification system is retained indefinitely. Audio from
              the 72 hours preceding a Push Mode incident report is retained
              indefinitely. Audio containing what the system classifies as
              relationship-relevant content is retained indefinitely with annual
              review. The criteria for classification as relationship-relevant
              are proprietary.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s19"
            number="19."
            title="Audio Recording — Access & Personnel"
          >
            <LegalP>
              Retained audio may be accessed by: RISE™ Software Development Team
              members for product improvement; RISE™ Quality Assurance Team
              members for performance verification; RISE™ Sleep Science
              Institute researchers under data use agreements; any RISE™
              employee whose role, as determined by RISE™, requires access; and
              third party research partners listed in{' '}
              <AppendixNote label="Appendix D" />.
            </LegalP>
            <LegalP>
              RISE™ maintains access logs for audio data. Access logs are
              internal operational records and are not available to users as
              part of the Data Subject Request Process.
            </LegalP>
            <LegalNote>
              RISE™ personnel who access audio data are subject to
              confidentiality obligations. These obligations do not prevent
              personnel from discussing aggregate or anonymized insights derived
              from audio data. The line between specific and aggregate is
              determined by RISE™ on a case-by-case basis.
            </LegalNote>
          </LegalSection>

          <LegalSection
            id="s20"
            number="20."
            title="Occupancy Detection & Relationship Inference"
          >
            <LegalP>
              The Push's mattress sensor array provides detailed information
              about the number, position, and movement of occupants on the
              mattress surface. RISE™ collects this data. We use it to optimize
              routing. We retain it. We do not judge it. Our sensors are
              non-judgmental by design.
            </LegalP>
            <LegalP>
              RISE™ may infer the relationship status of mattress occupants
              based on pressure signature proximity, movement correlation,
              frequency patterns, and occupancy consistency data. This inference
              is used for household account management and routing optimization.
              The inference is updated in real time. It is logged. It is
              retained for the periods described in Section 21.
            </LegalP>
            <LegalP>
              We are required to disclose that the sensor array is capable of
              distinguishing between different types of occupant movement and
              interaction. We are further required to disclose that this
              distinction is logged. We are not required to specify what
              distinctions are made. We have chosen not to.
            </LegalP>
          </LegalSection>

          <LegalSection id="s21" number="21." title="Data Retention Periods">
            <LegalP>
              Device and performance data: 5 years. Sleep and biometric data: 7
              years. Environmental data: 7 years. Audio (standard): 7 years.
              Audio (flagged): indefinite. Inferred and derived data:
              indefinite. RISE™ Index: indefinite. Relationship inference
              history: indefinite. Data generated during Push Mode incident
              events: indefinite.
            </LegalP>
            <LegalP>
              Following account deletion, most data categories are retained for
              the periods above from the date of last activity, not the date of
              deletion. Derived data is retained indefinitely regardless of
              account status.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s22"
            number="22."
            title="International Data Transfers"
          >
            <LegalP>
              RISE™ operates globally. Data may be transferred to and processed
              in jurisdictions with different data protection standards than
              your home jurisdiction. RISE™ relies on standard contractual
              clauses, adequacy decisions, and optimism to legitimize these
              transfers.
            </LegalP>
          </LegalSection>

          <LegalSection id="s23" number="23." title="Children's Data">
            <LegalP>
              RISE™ products are not intended for users under 18. RISE™ does not
              knowingly collect data from users under 18. Where a user under 18
              is present in a RISE™-enabled sleep environment as a secondary
              occupant, their occupancy data is collected as part of the
              household dataset. RISE™ treats this data with the same retention
              and sharing practices applied to adult data. RISE™ is aware of the
              tension in this paragraph.
            </LegalP>
          </LegalSection>

          <LegalSection id="s24" number="24." title="Your Rights — Overview">
            <LegalP>
              Depending on your jurisdiction, you may have rights to access your
              data, request deletion, restrict processing, object to processing,
              and receive a portable copy of your data. These rights are real.
              Exercising them is possible. The process for doing so is described
              in Sections 25–28 and in full on the Data Request page at
              riseawake.com/data-request.
            </LegalP>
            <LegalNote>
              RISE™ recommends reviewing the full Data Subject Request Process
              before initiating a request. The process is thorough. It is
              designed to be thorough. Thoroughness protects you. It also
              protects us.
            </LegalNote>
          </LegalSection>

          <LegalSection id="s25" number="25." title="Your Rights — Access">
            <LegalP>
              You may request access to your personal data. The process for
              doing so requires completing Form DSR-01, providing purchase
              verification including the exact purchase date, last four digits
              of the payment card used, card network, and billing postal code at
              time of purchase, paying the applicable processing fee, and
              completing identity verification. Full process:
              riseawake.com/data-request.
            </LegalP>
            <LegalP>
              Your data will be provided in .rsm format on a USB drive. Opening
              .rsm files requires the RISE™ DataKit SDK. Compatibility with your
              operating system is not guaranteed. See riseawake.com/sdk.
            </LegalP>
          </LegalSection>

          <LegalSection id="s26" number="26." title="Your Rights — Deletion">
            <LegalP>
              You may request deletion of your personal data. The deletion
              process follows the access request process with additional
              requirements. Data RISE™ is not legally required to delete will be
              retained. Derived data will be retained. Audio data follows the
              Audio Data Request Process. The RISE™ Index score is archived on
              deletion, not deleted.
            </LegalP>
          </LegalSection>

          <LegalSection id="s27" number="27." title="Your Rights — Portability">
            <LegalP>
              You may receive your data in a portable format. That format is
              .rsm. This is the portable format. Opening it requires the RISE™
              DataKit SDK available at riseawake.com/sdk. The SDK is compatible
              with select operating systems. Not all operating systems are
              supported. Compatibility is not guaranteed.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s28"
            number="28."
            title="Your Rights — Objection & Restriction"
          >
            <LegalP>
              You may object to or request restriction of certain processing
              activities. RISE™ will consider such requests and respond within
              90 days. Objections to processing that is necessary for Push Mode
              operation will not be upheld. If restricting or stopping the
              relevant processing would prevent Push Mode from functioning,
              RISE™ will note your objection, retain it in your file, and
              continue processing.
            </LegalP>
          </LegalSection>

          <LegalSection id="s29" number="29." title="Complaints">
            <LegalP>
              If you have a complaint about RISE™'s data practices, you may
              contact us at the address in Section 30. You may also contact the
              relevant data protection authority in your jurisdiction. RISE™ has
              engaged proactively with several regulatory bodies and does not
              discourage users from doing the same. We believe our practices
              will withstand scrutiny. We are prepared for scrutiny.
            </LegalP>
          </LegalSection>

          <LegalSection id="s30" number="30." title="Contact Information">
            <LegalP>
              Data protection inquiries: privacy@riseawake.com. Data Subject
              Requests: riseawake.com/data-request (do not email data requests —
              emailed requests are not processed). Data Request Hotline:
              available Monday–Friday, 11:00am–11:30am Pacific Time.
            </LegalP>
          </LegalSection>

          <LegalSection id="s31" number="31." title="Appendices">
            <LegalP>This policy references the following appendices:</LegalP>
            <LegalP>
              <AppendixNote label="Appendix A — Data Category Definitions" />{' '}
              <AppendixNote label="Appendix B — Retention Schedule Detail" />{' '}
              <AppendixNote label="Appendix C — Institutional Investor Restricted Disclosure" />{' '}
              <AppendixNote label="Appendix D — Research & Third Party Partner List" />{' '}
              <AppendixNote label="Appendix E — Standard Contractual Clauses" />{' '}
              <AppendixNote label="Appendix F — Sleep Science Institute Review Board" />{' '}
              <AppendixNote label="Appendix G — RISE™ Company Holiday Schedule" />{' '}
              <AppendixNote label="Appendix H — Audio Data Request Process" />
            </LegalP>
            <LegalNote>
              Appendix C is available to institutional investors under NDA.
              Appendix G is forthcoming. All other appendices are in
              preparation. RISE™ will publish them when they are ready.
            </LegalNote>
          </LegalSection>
        </LegalLayout>
      </div>

    </main>
  )
}
