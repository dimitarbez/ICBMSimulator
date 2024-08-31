import React from 'react';
import './Info.css';

const ICBMInfo: React.FC = () => {
  return (
    <div className="row">
      <div className="col-12 mb-3">
        <div className="icbm-info">
          <h2>Intercontinental Ballistic Missiles (ICBMs)</h2>

          <section>
            <h3>Definition and Basics</h3>
            <p>
              ICBMs are long-range missiles primarily designed for nuclear weapons delivery. They have a minimum range of 5,500
              kilometers and can reach maximum speeds of over 20 times the speed of sound during their midcourse phase.
            </p>
          </section>

          <section>
            <h3>Historical Context</h3>
            <p>
              Developed during the Cold War, ICBMs became a key component of nuclear deterrence strategies. The first ICBM, the
              R-7 Semyorka, was deployed by the Soviet Union in 1959, followed by the US Atlas missile in 1960.
            </p>
          </section>

          <section>
            <h3>Technical Specifications</h3>
            <ul>
              <li>Range: 5,500 to 13,000 kilometers</li>
              <li>Speed: Up to Mach 23 (17,500 mph / 28,000 km/h)</li>
              <li>Payload: Single or multiple nuclear warheads (MIRVs)</li>
              <li>Guidance: Inertial guidance systems, sometimes aided by GPS or stellar navigation</li>
              <li>Launch platforms: Silos, mobile launchers, or submarines (SLBMs)</li>
            </ul>
          </section>

          <section>
            <h3>Flight Phases</h3>
            <ol>
              <li>Boost phase: Initial launch and acceleration (3-5 minutes)</li>
              <li>Midcourse phase: Ballistic trajectory through space (20-30 minutes)</li>
              <li>Terminal phase: Re-entry and approach to target (1-2 minutes)</li>
            </ol>
          </section>

          <section>
            <h3>Key Dangers and Global Impact</h3>
            <ul>
              <li>Massive destructive power: Modern ICBMs can carry warheads with yields of 300-800 kilotons or more</li>
              <li>Short response time: Due to their speed, they leave little time for decision-making in a crisis</li>
              <li>Difficult interception: High speed and potential countermeasures make defense challenging</li>
              <li>Environmental impact: Nuclear explosions can cause long-lasting radioactive contamination</li>
              <li>Escalation risks: Their use could trigger full-scale nuclear war</li>
              <li>Proliferation concerns: Technology spread increases global instability</li>
            </ul>
          </section>

          <section>
            <h3>Arms Control Efforts</h3>
            <p>
              Various treaties have aimed to limit ICBM proliferation and numbers, including SALT, START, and New START. However,
              modernization efforts and new technologies continue to pose challenges to arms control.
            </p>
          </section>

          <section>
            <h3>Current Global Situation</h3>
            <p>
              As of 2024, only a few nations possess ICBMs, primarily the United States, Russia, China, France, and the United
              Kingdom. However, other countries like North Korea and India have developed or are developing ICBM capabilities.
            </p>
          </section>

          <section>
            <h3>Conclusion</h3>
            <p>
              ICBMs remain one of the most potent and controversial military technologies, central to nuclear deterrence
              strategies but also representing an existential threat to humanity.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ICBMInfo;
