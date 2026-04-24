import { rise } from '@/lib/temporal'
import {
  LegalLayout,
  LegalSection,
  LegalP,
  LegalNote,
} from '@/components/legal/legal-layout'

const TOC = [
  { id: 's1', label: '1. General Disclaimer' },
  { id: 's2', label: '2. Physical Harm' },
  { id: 's3', label: '3. Outdoor & Traffic Incidents' },
  { id: 's4', label: '4. Workplace Incidents' },
  { id: 's5', label: '5. Medical Incidents' },
  { id: 's6', label: '6. The Liability Cap' },
  { id: 's7', label: '7. What We Are Liable For' },
  { id: 's8', label: '8. Acknowledgment' },
]

const RELATED = [
  { label: 'Terms of Service', href: '/legal/terms' },
  { label: 'Autonomous Navigation', href: '/legal/autonomous-navigation' },
]

export default function DisclaimerPage() {
  return (
    <main>

      <div className="pt-20">
        <LegalLayout
          title="General Disclaimer"
          version={rise.legalVersion()}
          lastUpdated={rise.legalLastUpdated()}
          toc={TOC}
          relatedDocs={RELATED}
        >
          <LegalSection id="s1" number="1." title="General Disclaimer">
            <LegalP>
              RISE™ Technologies, Inc. provides its products and services "as
              is." RISE™ makes no representations or warranties about the
              suitability of its products for any particular purpose, including
              the purpose of getting you to work on time, though the data
              suggests the product is quite good at this. RISE™ disclaims all
              liability for outcomes that deviate from the product's intended
              function, and accepts limited liability for outcomes that result
              directly from the product's intended function, as described in
              Section 6.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s2"
            number="2."
            title="Physical Harm — Domestic Navigation Incidents"
          >
            <LegalP>
              RISE™ is not liable for physical harm arising from domestic Push
              Mode navigation, including but not limited to: the user being
              pushed into a door, wall, appliance, piece of furniture, or other
              fixed object; the user being pushed into another household
              occupant; the user being pushed into a pet; the user being pushed
              toward a staircase, the user's momentum continuing beyond the
              device's navigation endpoint; spillage of hot beverages and
              resulting burns; glass objects on nightstands being disturbed
              during activation — specifically including water glasses the user
              intended to drink from but did not; and any physical contact
              between the device and the user's body during routing that the user
              experiences as uncomfortable, painful, or injurious.
            </LegalP>
            <LegalP>
              RISE™ notes that these scenarios have all occurred. RISE™ has
              documented them. They are in the incident database. They informed
              the design of current Push Mode. The current design reflects RISE™'s
              considered position on acceptable contact during routing.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s3"
            number="3."
            title="Outdoor & Traffic Incidents"
          >
            <LegalP>
              RISE™ is not liable for incidents occurring during outdoor
              navigation, including: the user being routed toward oncoming
              traffic during driveway navigation; the device making contact with
              a vehicle during docking; the device's solo return commute
              resulting in traffic delays, property damage, or interaction with
              law enforcement; the device entering a place of business during the
              solo commute; the device navigating into a body of water; and any
              encounter between the returning device and a third party on a
              public or semi-public thoroughfare.
            </LegalP>
            <LegalNote>
              RISE™ is aware of the scenario in which a user is delivered to an
              elevated surface — a platform, dock, or rooftop — if Push Mode
              activates in a non-residential location. RISE™ does not recommend
              activating Push Mode in such locations. RISE™ notes that the PM-1
              button does not know where it is. The button does what it does. The
              user chose to bring the device to that location.
            </LegalNote>
          </LegalSection>

          <LegalSection id="s4" number="4." title="Workplace Incidents">
            <LegalP>
              RISE™ is not liable for incidents occurring at the user's
              workplace, including: the device making contact with a colleague,
              colleague's property, or glass partition; Push Mode completing
              delivery at a location that is not the user's desk due to imprecise
              workplace navigation mapping; the device being present in a
              workplace that prohibits such devices; and any outcome arising from
              colleagues observing the device and drawing conclusions about the
              user's morning.
            </LegalP>
          </LegalSection>

          <LegalSection id="s5" number="5." title="Medical Incidents">
            <LegalP>
              RISE™ is not liable for medical incidents arising from Push Mode,
              including: cardiovascular events resulting from unexpected
              activation; aggravation of existing injuries during navigation;
              dependency on Push Mode resulting in an inability to self-initiate
              morning routines; psychological distress resulting from Push Mode
              operation; psychological distress resulting from the solo return
              commute; and any medical condition that the user attributes to Push
              Mode operation, unless that condition is directly and exclusively
              caused by a manufacturing defect in the device, which would be
              covered under the 5-year hardware warranty.
            </LegalP>
          </LegalSection>

          <LegalSection id="s6" number="6." title="The Liability Cap">
            <LegalP>
              RISE™'s total liability to any user, for any claim, under any
              theory of law, in any jurisdiction, shall not exceed the lesser of:
            </LegalP>
            <LegalP>
              (a) The original purchase price of the RISE™ product giving rise to
              the claim, exclusive of shipping, tax, and any accessories; or
            </LegalP>
            <LegalP>
              (b) The value of one morning's productive output as calculated by
              multiplying the user's RISE™ Index score at the time of the
              incident by the national average hourly wage in the user's
              jurisdiction, as published by the relevant government statistical
              body most recently before the incident date.
            </LegalP>
            <LegalP>
              RISE™ will perform the calculation under (b) using its proprietary
              RISE™ Index methodology. The methodology is not disclosed. Users
              may not challenge the calculation methodology — they may challenge
              the inputs, in writing, within 30 days of receiving the
              calculation. RISE™ will review written challenges and respond
              within 90 days.
            </LegalP>
            <LegalNote>
              RISE™ notes that clause (b) is typically lower than clause (a) for
              users with Index scores below the median. RISE™ further notes that
              users with below-median Index scores are, statistically, the users
              most likely to have incidents. RISE™ considers this a coincidence
              and not a structural feature of the liability cap design.
            </LegalNote>
          </LegalSection>

          <LegalSection
            id="s7"
            number="7."
            title="What RISE™ Is Liable For"
          >
            <LegalP>
              RISE™ is liable for manufacturing defects in the device hardware,
              within the 5-year warranty period, for the cost of repair or
              replacement at RISE™'s discretion. RISE™ is liable for Push Mode
              software failures that result in Push Mode not activating when the
              button is pressed, within the lifetime Push Mode warranty, for the
              cost of restoring Push Mode function. RISE™ is not liable for Push
              Mode activating when the button is pressed, as this is correct
              operation.
            </LegalP>
          </LegalSection>

          <LegalSection id="s8" number="8." title="Acknowledgment">
            <LegalP>
              By using RISE™ products, the user acknowledges having read this
              disclaimer, having understood it, and having accepted its terms.
              The user acknowledges that the liability cap may result in
              compensation that is lower than the harm sustained. The user
              acknowledges that they were informed of this before purchase, in
              these Terms, and that they purchased the product anyway. RISE™
              finds this, along with the button press referenced in the Terms of
              Service, meaningful.
            </LegalP>
          </LegalSection>
        </LegalLayout>
      </div>

    </main>
  )
}
