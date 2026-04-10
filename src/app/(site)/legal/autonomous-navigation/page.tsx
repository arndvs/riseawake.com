import LegalLayout, {
  LegalNote,
  LegalP,
  LegalSection,
} from '@/components/legal/legal-layout'

const TOC = [
  { id: 's1', label: '1. Scope' },
  { id: 's2', label: '2. How It Works' },
  { id: 's3', label: '3. Indoor Navigation' },
  { id: 's4', label: '4. Outdoor Navigation' },
  { id: 's5', label: '5. The Solo Return Commute' },
  { id: 's6', label: '6. Third Party Encounters' },
  { id: 's7', label: '7. Traffic & Public Infrastructure' },
  { id: 's8', label: '8. Elevators' },
  { id: 's9', label: '9. Animals' },
  { id: 's10', label: '10. Liability' },
  { id: 's11', label: '11. Incident Reporting' },
]

const RELATED = [
  { label: 'General Disclaimer', href: '/legal/disclaimer' },
  { label: 'Terms of Service', href: '/legal/terms' },
]

export default function AutonomousNavPage() {
  return (
    <main>

      <div className="pt-20">
        <LegalLayout
          title="Autonomous Navigation Disclosure"
          version="Version 4.2"
          lastUpdated="March 1, 2025"
          toc={TOC}
          relatedDocs={RELATED}
        >
          <LegalSection id="s1" number="1." title="Scope of This Disclosure">
            <LegalP>
              This disclosure covers the Push's autonomous navigation
              capability: its operation during Push Mode indoor routing, its
              outdoor driveway navigation, and its solo return commute following
              Push Mode completion. This disclosure is required by RISE™'s
              general counsel and is provided voluntarily in jurisdictions where
              it is not required, because RISE™ believes informed users are
              better users, and also because informed users have fewer legal
              claims.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s2"
            number="2."
            title="How Autonomous Navigation Works"
          >
            <LegalP>
              The Push maps its environment during initial setup using a
              combination of ultrasonic ranging, floor pressure mapping, and
              ambient light sensing. The map is stored on-device and updated
              continuously during operation. Navigation decisions are made by an
              onboard processor, with route optimization handled by RISE™
              servers via telemetry. The device navigates continuously while
              Push Mode is active. It does not pause at obstacles. It does not
              hesitate at thresholds. It proceeds.
            </LegalP>
          </LegalSection>

          <LegalSection id="s3" number="3." title="Indoor Navigation">
            <LegalP>
              Indoor navigation encompasses all movement from the bedroom
              through the user's morning routine locations to the point of
              departure. The device navigates hallways, doorways, bathroom
              approaches, closet approaches, and kitchen approaches. The device
              does not enter bathrooms — it waits at the threshold. The device
              does enter closets — users should ensure closet dimensions
              accommodate the device before use. RISE™ is not responsible for
              closet damage arising from undersized closet spaces.
            </LegalP>
            <LegalP>
              The device may make contact with: doorframes, walls, furniture,
              appliances, other occupants, and pets. Contact is a feature of
              navigation, not an error. The device is calibrated to apply
              sufficient force to continue routing. The user's experience of
              this force is subjective.
            </LegalP>
          </LegalSection>

          <LegalSection id="s4" number="4." title="Outdoor Navigation">
            <LegalP>
              Outdoor navigation includes the driveway routing sequence during
              which the device escorts the user to their vehicle. The driveway
              environment presents additional risks not present indoors: surface
              irregularities, inclines, wet conditions, vehicles in motion, and
              third parties. The device navigates these conditions using its
              standard navigation system, which was designed for indoor use.
              Outdoor navigation is a courtesy feature. RISE™ recommends it.
              RISE™ also notes that it has occurred in conditions the device was
              not designed for, and that outcomes have varied.
            </LegalP>
          </LegalSection>

          <LegalSection id="s5" number="5." title="The Solo Return Commute">
            <LegalP>
              Following Push Mode completion, the Push navigates independently
              from the user's point of departure back to the registered
              residential address. The return commute uses the outbound route in
              reverse where possible, and adapts to changed conditions where
              necessary. The device is unattended during the return commute. The
              primary account holder is responsible for all outcomes of the
              return commute, as the commute is authorized by the user's
              original activation of Push Mode.
            </LegalP>
            <LegalNote>
              The solo return commute was added in Push Mode firmware 2.4.0.
              Users who purchased before this update received it via
              over-the-air update. Users who did not want the solo return
              commute feature were not offered an opt-out, as RISE™ considers
              the return commute integral to the product's promise of a made bed
              upon return.
            </LegalNote>
          </LegalSection>

          <LegalSection
            id="s6"
            number="6."
            title="Third Party Encounters During Solo Commute"
          >
            <LegalP>
              During the solo return commute, the device may encounter:
              pedestrians, cyclists, delivery personnel, neighbors, building
              staff, and other members of the public. These persons have not
              accepted these Terms. The device will navigate around them where
              possible and through them where not possible. "Through" means at
              the device's navigation speed with standard obstacle response,
              which is continued forward momentum with minor lateral adjustment.
              Third parties who believe they have been affected by the device
              during a solo commute may contact RISE™ at help section. Response
              time: 2–3 business days.
            </LegalP>
          </LegalSection>

          <LegalSection
            id="s7"
            number="7."
            title="Traffic & Public Infrastructure"
          >
            <LegalP>
              The device may navigate across streets, through parking lots, and
              along sidewalks during the solo return commute. The device's
              traffic awareness system detects moving vehicles using ultrasonic
              sensors. The system has a detection range of approximately 4
              meters and a response time of 0.3 seconds. At standard navigation
              speed, this provides approximately 1.2 seconds of obstacle
              response time. RISE™ considers this adequate. The user is
              encouraged to consider whether their specific commute route
              provides conditions in which this is adequate.
            </LegalP>
            <LegalP>
              RISE™ is not licensed as an autonomous vehicle operator in any
              jurisdiction. The device's legal status during solo commute is, in
              most jurisdictions, unresolved. RISE™ is monitoring regulatory
              developments and has engaged counsel in three jurisdictions where
              inquiry has been initiated.
            </LegalP>
          </LegalSection>

          <LegalSection id="s8" number="8." title="Elevator Use">
            <LegalP>
              The device uses elevators during the solo return commute where the
              registered address is not on the ground floor. The device calls
              the elevator using a connected building systems integration where
              available, and waits for a door opening event where not available.
              The device enters the elevator when the door opens. Other elevator
              users are not consulted. RISE™ has received feedback from building
              operators on this point and is reviewing its approach. The current
              approach is unchanged.
            </LegalP>
          </LegalSection>

          <LegalSection id="s9" number="9." title="Animals">
            <LegalP>
              The device's obstacle detection system identifies animals as
              obstacles and applies standard navigation response (continued
              forward momentum with minor lateral adjustment). Dogs have been
              observed to interact with the returning device in a variety of
              ways. Their owners have not always been present. RISE™ is not
              responsible for animal-device interactions during the solo
              commute. RISE™ notes that the device has not been found to
              initiate these interactions.
            </LegalP>
          </LegalSection>

          <LegalSection id="s10" number="10." title="Liability">
            <LegalP>
              RISE™ is not liable for any outcome of autonomous navigation,
              indoor or outdoor, attended or solo. The user authorized
              autonomous navigation by activating Push Mode. The authorization
              is ongoing for as long as the device is registered to the user's
              account. It survives individual Push Mode sessions. It covers the
              solo return commute. It covers every commute. The liability for
              the commute belongs to the person who pressed the button.
            </LegalP>
          </LegalSection>

          <LegalSection id="s11" number="11." title="Incident Reporting">
            <LegalP>
              Users who wish to report autonomous navigation incidents may do so
              at riseawake.com/help. RISE™ reviews incident reports and uses
              them to improve navigation algorithms. Incident reports do not
              constitute formal legal notice and do not initiate any liability
              process. For formal legal notice, users should contact RISE™'s
              registered agent in Delaware. RISE™ will respond within legally
              required timeframes.
            </LegalP>
          </LegalSection>
        </LegalLayout>
      </div>

    </main>
  )
}
