import {
  LegalLayout,
  LegalNote,
  LegalP,
  LegalSection,
} from '@/components/legal/legal-layout'

const TOC = [
  { id: 's1', label: '1. Agreement to Terms' },
  { id: 's2', label: '2. Description of Service' },
  { id: 's3', label: '3. Push Mode' },
  { id: 's4', label: '4. Permitted Use' },
  { id: 's5', label: '5. Prohibited Use' },
  { id: 's6', label: '6. Account Registration' },
  { id: 's7', label: '7. Payment & Refunds' },
  { id: 's8', label: '8. Intellectual Property' },
  { id: 's9', label: '9. Data' },
  { id: 's10', label: '10. Physical Risk Acknowledgment' },
  { id: 's11', label: '11. Autonomous Navigation' },
  { id: 's12', label: '12. Third Party Encounters' },
  { id: 's13', label: '13. Audio Recording' },
  { id: 's14', label: '14. Occupancy & Guest Users' },
  { id: 's15', label: '15. Limitation of Liability' },
  { id: 's16', label: '16. Indemnification' },
  { id: 's17', label: '17. Warranty Disclaimer' },
  { id: 's18', label: '18. Governing Law' },
  { id: 's19', label: '19. Dispute Resolution' },
  { id: 's20', label: '20. Free Will Acknowledgment' },
  { id: 's21', label: '21. The Button' },
  { id: 's22', label: '22. Dependency' },
  { id: 's23', label: '23. The Off Switch' },
  { id: 's24', label: '24. Updates to These Terms' },
  { id: 's25', label: '25. Severability' },
]

const RELATED = [
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Push Mode EULA', href: '/legal/push-mode-eula' },
  { label: 'General Disclaimer', href: '/legal/disclaimer' },
  { label: 'Autonomous Navigation', href: '/legal/autonomous-navigation' },
]

export default function TermsPage() {
  return (
    <main>

      <div className="pt-20">
        <LegalLayout
          title="Terms of Service"
          version="Version 4.2"
          lastUpdated="March 1, 2025"
          toc={TOC}
          relatedDocs={RELATED}
        >
          <LegalSection id="s1" number="1." title="Agreement to Terms">
            <LegalP>
              By purchasing, registering, using, or being present in a space
              where a RISE Smart Adjustable Base is registered and active, you
              agree to these Terms of Service in their entirety. These Terms
              constitute a legally binding agreement between you and RISE
              Technologies, Inc.
            </LegalP>
            <LegalP>
              If you do not agree to these Terms, do not use the product. If the
              product is currently in Push Mode, these Terms apply regardless of
              whether you have read them. Proceeding through your morning
              routine constitutes acceptance.
            </LegalP>
          </LegalSection>

          <LegalSection id="s2" number="2." title="Description of Service">
            <LegalP>
              RISE provides a Smart Adjustable Base platform including the
              RISE Push hardware, Push Mode software, self-making mechanism,
              autonomous navigation system, the RISE Index, and related
              services. The platform is designed to activate on schedule,
              transition the base to vertical, and deliver the user through
              their morning routine to their point of departure. The platform
              does not offer a return journey, an alternative mode, or a pause
              function.
            </LegalP>
          </LegalSection>

          <LegalSection id="s3" number="3." title="Push Mode">
            <LegalP>
              Push Mode is the core feature of the RISE platform. Push Mode
              cannot be manually interrupted once initiated. This is a feature.
              It is stated on the back of the PM-1 remote. It is stated in the
              Push Mode EULA. It is stated here. It has been stated in every
              version of these Terms since version 1.0. Users are encouraged to
              reflect on how many times they have been told.
            </LegalP>
          </LegalSection>

          <LegalSection id="s4" number="4." title="Permitted Use">
            <LegalP>
              The RISE platform is licensed for personal residential morning
              use by the registered account holder. Use of Push Mode on third
              parties without their knowledge or prior written agreement is not
              recommended, though RISE notes that guests of primary account
              holders are covered under Section 14.
            </LegalP>
          </LegalSection>

          <LegalSection id="s5" number="5." title="Prohibited Use">
            <LegalP>
              Users may not: attempt to locate, install, or enable an off
              switch; reverse-engineer Push Mode navigation algorithms; use the
              platform for commercial routing of non-consenting third parties;
              or deploy the platform in a manner designed to cause harm. RISE
              notes that the platform may incidentally cause harm as described
              in Section 10, and that incidental harm is addressed in Section 15
              rather than this section.
            </LegalP>
          </LegalSection>

          <LegalSection id="s6" number="6." title="Account Registration">
            <LegalP>
              A RISE account is required to use Push Mode. Account registration
              requires a valid email address, a physical delivery address, and
              payment information. The name on the account must be the legal
              name of the account holder. RISE uses account information for the
              purposes described in the Privacy Policy, which the user has
              accepted by registering.
            </LegalP>
          </LegalSection>

          <LegalSection id="s7" number="7." title="Payment & Refunds">
            <LegalP>
              Payment for RISE products is due at time of purchase. RISE does
              not offer payment plans.
            </LegalP>
            <LegalP>
              RISE does not offer refunds after the device serial number has
              been registered and activation initiated at
              riseawake.com/activate. Initiating activation constitutes
              acceptance of the product and acknowledgment that the user&rsquo;s
              living environment is compatible with Push Mode operation. RISE
              considers the decision to enter a serial number a considered one.
            </LegalP>
            <LegalP>
              If a fundamental incompatibility between the user&rsquo;s
              environment and Push Mode operation is discovered during or after
              activation — including but not limited to staircase navigation
              requirements, insufficient ceiling height, inadequate hallway
              width, or any other environmental constraint described in the
              product specifications — this incompatibility was present at time
              of purchase and is not grounds for refund. RISE makes product
              specifications available at riseawake.com/products/push prior to
              purchase. The specifications include all known Push Mode
              environmental limitations. They have been available since launch.
            </LegalP>
            <LegalP>
              Pre-activation refund requests may be submitted in writing to
              RISE&rsquo;s customer service team. Response time: 15 business
              days. Pre-activation is defined as the period between delivery and
              the moment the user enters their serial number at
              riseawake.com/activate. Once the serial number field has been
              submitted, activation has begun and this window has closed.
            </LegalP>
            <LegalNote>
              RISE notes that the activation process includes a stage in which
              environmental incompatibilities — including staircase requirements
              — are disclosed by the user. This stage occurs after the serial
              number has been entered and activation has been initiated. RISE
              considers the placement of this disclosure to be reasonable, as
              the product specifications were available prior to purchase and
              the user had ample opportunity to assess compatibility before
              initiating activation. RISE understands this may be frustrating
              to discover at Stage 5 of 12.
            </LegalNote>
          </LegalSection>

          <LegalSection id="s8" number="8." title="Intellectual Property">
            <LegalP>
              All RISE technology, including Push Mode algorithms, the RISE
              Index methodology, the .rsm file format, REASCII encoding, the
              self-making mechanism, and any data derived from user activity, is
              the intellectual property of RISE Technologies, Inc. Users own
              the hardware they have purchased. They do not own anything that
              runs on it.
            </LegalP>
          </LegalSection>

          <LegalSection id="s9" number="9." title="Data">
            <LegalP>
              By activating Push Mode, the user grants RISE a perpetual,
              worldwide, royalty-free, irrevocable license to collect, store,
              process, analyze, share, and act upon all data generated during
              Push Mode sessions, standby periods, and autonomous navigation
              events. This license survives termination of the user's account.
              It survives deletion requests to the extent that derived data is
              not subject to deletion. It survives the user's decision to stop
              using the product. It is, in the clearest possible terms,
              perpetual.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s10"
            number="10."
            title="Physical Risk Acknowledgment"
          >
            <LegalP>
              The user acknowledges and accepts the following physical risks
              inherent in Push Mode operation: being pushed into doors, walls,
              furniture, appliances, other occupants, or pets; being pushed
              toward or over elevated surfaces if Push Mode activates in a
              non-residential location; being pushed into traffic during
              driveway routing if positioned ahead of the vehicle approach path;
              spillage of hot beverages and resulting burns; contact between the
              base and the user's shins, feet, or lower body during routing; and
              any other physical contact between the user and any surface,
              object, or entity that results from Push Mode navigation.
            </LegalP>
            <LegalP>
              The user further acknowledges that Push Mode does not distinguish
              between obstacles it can avoid and obstacles it cannot. The bed
              navigates by momentum. Momentum has consequences that are the
              user's responsibility.
            </LegalP>
          </LegalSection>

          <LegalSection id="s11" number="11." title="Autonomous Navigation">
            <LegalP>
              The Push navigates autonomously during Push Mode and during the
              solo return commute. Autonomous navigation is the product working
              as designed. RISE is not liable for the outcomes of autonomous
              navigation including but not limited to: property damage caused by
              the base; injuries to the user, household members, or third
              parties caused by the moving base; and encounters between the
              returning base and neighbors, building staff, animals, or
              municipal infrastructure.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s12"
            number="12."
            title="Third Party Encounters During Solo Commute"
          >
            <LegalP>
              During the autonomous return commute, the Push operates as an
              unattended autonomous device on public and semi-public
              thoroughfares. Third parties who encounter the returning Push have
              not accepted these Terms. Their encounters with the Push are the
              responsibility of the primary account holder, who by activating
              Push Mode authorized the solo commute.
            </LegalP>
            <LegalP>
              RISE maintains records of solo commute routes, encounters, and
              incidents. These records are available to RISE and, upon valid
              legal request, to law enforcement. They are not available to the
              primary account holder as part of the standard Data Subject
              Request Process.
            </LegalP>
          </LegalSection>

          <LegalSection id="s13" number="13." title="Audio Recording">
            <LegalP>
              The user acknowledges that Push Mode includes audio collection as
              described in the Privacy Policy, Section 7. The user consents to
              this collection for themselves. For other occupants of the sleep
              environment, the primary account holder accepts responsibility for
              obtaining any consent required by applicable law, or for
              determining that no such consent is required. RISE collects the
              audio regardless of the consent status of secondary occupants.
            </LegalP>
          </LegalSection>

          <LegalSection id="s14" number="14." title="Occupancy & Guest Users">
            <LegalP>
              Any person who occupies the mattress surface while the RISE
              device is in use is subject to Push Mode, to the data collection
              described in the Privacy Policy, and to the physical risk
              disclosures in Section 10, regardless of whether they have been
              informed of these facts. By activating Push Mode in the presence
              of another occupant, the primary account holder accepts all
              liability that would otherwise accrue to that occupant, to the
              extent such liability is not already allocated to RISE under
              applicable law. The extent to which such liability is allocated to
              RISE is described in Section 15, and is minimal.
            </LegalP>
          </LegalSection>

          <LegalSection id="s15" number="15." title="Limitation of Liability">
            <LegalP>
              RISE's total liability to any user, for any reason, under any
              theory of law, shall not exceed the lesser of: (a) the original
              purchase price of the product giving rise to the claim, or (b) the
              value of one morning's productive output as calculated by the
              user's RISE Index score at time of the incident, multiplied by
              the national average hourly wage in the user's jurisdiction.
            </LegalP>
            <LegalP>
              RISE notes that clause (b) is typically lower than clause (a).
              RISE further notes that the RISE Index methodology is
              proprietary and the calculation is performed by RISE. RISE will
              perform the calculation in good faith.
            </LegalP>
            <LegalNote>
              RISE is not liable for: productivity gains, career advancement,
              relationship changes, dependency, the solo commute's interactions
              with third parties, outcomes in jurisdictions where Push Mode's
              non-interruptible design has been found unlawful, or any outcome
              the user describes as "not what I expected." Users who expected
              something other than what the product does are directed to the
              back of the PM-1 remote, which they have had since purchase.
            </LegalNote>
          </LegalSection>

          <LegalSection id="s16" number="16." title="Indemnification">
            <LegalP>
              The user agrees to indemnify, defend, and hold harmless RISE and
              its officers, directors, employees, and contractors from any
              claims, damages, or expenses arising from: the user's use of the
              product; the user's guests' presence in the sleep environment; the
              user's activation of Push Mode in a location for which it was not
              designed; any claim by a third party arising from the solo return
              commute; and any claim that RISE's data practices caused harm to
              a person who did not consent to those practices but was present in
              a RISE-enabled environment.
            </LegalP>
          </LegalSection>

          <LegalSection id="s17" number="17." title="Warranty Disclaimer">
            <LegalP>
              The RISE platform is provided as-is. RISE warrants the hardware
              for five years against manufacturing defects. RISE warrants Push
              Mode for the lifetime of the device, where "warranty" means that
              Push Mode will continue to initiate when the button is pressed and
              will continue to not stop until it is complete. RISE does not
              warrant that Push Mode will route the user to every desired
              location, that the self-making mechanism will achieve hotel-grade
              results, or that the solo commute will occur without incident.
              These are aspirational outcomes, not contractual ones.
            </LegalP>
          </LegalSection>

          <LegalSection id="s18" number="18." title="Governing Law">
            <LegalP>
              These Terms are governed by the laws of the State of Delaware,
              without regard to conflict of law principles. Any dispute not
              resolved by arbitration (see Section 19) shall be brought
              exclusively in the courts of the State of Delaware. The user
              waives any objection to jurisdiction and venue in those courts,
              including the objection that they have never been to Delaware.
            </LegalP>
          </LegalSection>

          <LegalSection id="s19" number="19." title="Dispute Resolution">
            <LegalP>
              All disputes shall be resolved by binding arbitration administered
              by JAMS under its applicable rules. The arbitration shall be
              conducted in San Francisco, California. The user waives the right
              to a jury trial and the right to participate in a class action.
              Individual arbitration only. RISE considers class actions
              particularly contrary to the product's philosophy of individual
              accountability.
            </LegalP>
          </LegalSection>

          <LegalSection id="s20" number="20." title="Free Will Acknowledgment">
            <LegalP>
              The user acknowledges that Push Mode operates by removing the
              moment of choice from the morning routine. RISE takes no position
              on whether this constitutes a diminishment of free will or an
              expression of it. For legal purposes, the user's original decision
              to press the button is the relevant exercise of autonomy.
              Everything that follows is execution. RISE considers this
              distinction legally and philosophically sound.
            </LegalP>
          </LegalSection>

          <LegalSection id="s21" number="21." title="The Button">
            <LegalP>
              The user acknowledges having pressed the button. The user
              acknowledges that pressing the button initiates Push Mode. The
              user acknowledges that Push Mode cannot be interrupted. The user
              acknowledges that they knew this before pressing the button — it
              is stated on the remote, in the EULA, in this document, and in
              every piece of marketing material RISE has ever produced. The
              user acknowledges that they pressed it anyway. RISE finds this
              meaningful and records it in the user's file.
            </LegalP>
          </LegalSection>

          <LegalSection id="s22" number="22." title="Dependency">
            <LegalP>
              Some users report that extended Push Mode use reduces their
              capacity for self-initiated morning routines. RISE considers this
              an alignment of user behavior with product design intent. It is
              not a side effect. It is the effect. RISE is not liable for
              dependency on Push Mode, and does not consider dependency to be a
              compensable harm. A user who cannot function without Push Mode is
              a user for whom Push Mode is working.
            </LegalP>
          </LegalSection>

          <LegalSection id="s23" number="23." title="The Off Switch">
            <LegalP>
              There is no off switch. This has been stated in this document and
              in related documents. If the user is currently looking for an off
              switch in this document, there is not one. If the user is looking
              for an off switch in the product, there is not one. If the user
              has been told, across all RISE documentation, that there is no
              off switch a minimum of fourteen times and is still looking, RISE
              respectfully suggests that this energy would be better directed
              toward the morning.
            </LegalP>
          </LegalSection>

          <LegalSection id="s24" number="24." title="Updates to These Terms">
            <LegalP>
              RISE may update these Terms at any time. Updated Terms are posted
              at riseawake.com/legal/terms. Continued use of any RISE product
              after an update constitutes acceptance. Push Mode activations
              after an update constitute acceptance. Being asleep while Push
              Mode activates after an update constitutes acceptance. RISE does
              not accept the argument that sleeping through a Terms update is a
              meaningful distinction.
            </LegalP>
          </LegalSection>

          <LegalSection id="s25" number="25." title="Severability">
            <LegalP>
              If any provision of these Terms is found unenforceable, the
              remaining provisions continue in full force. In particular: if the
              non-interruptibility of Push Mode is found unenforceable in any
              jurisdiction, Push Mode will continue to be non-interruptible in
              that jurisdiction pending legal resolution, as RISE considers the
              feature fundamental to the product and will vigorously appeal any
              finding to the contrary.
            </LegalP>
          </LegalSection>
        </LegalLayout>
      </div>

    </main>
  )
}
