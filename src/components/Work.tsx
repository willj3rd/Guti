import { company } from "@/data/company";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { Icon } from "./Icon";

export function Work() {
  return (
    <section
      id="our-work"
      className="work section-light"
      aria-labelledby="work-title"
    >
      <div className="container">
        <div className="section-top">
          <div>
            <div className="eyebrow">
              <span className="small-rule" />
              The finished result
            </div>
            <h2 id="work-title">
              See the
              <br />
              difference.
            </h2>
          </div>
          <p>
            Good work speaks for itself.
            <br />
            From the first cut to the final detail.
          </p>
        </div>
        {company.projects.length ? (
          <div className="projects">
            {company.projects.map((project) => (
              <article key={project.id}>
                <BeforeAfterSlider project={project} />
                <div className="project-meta">
                  <div>
                    {project.location && (
                      <span className="eyebrow">{project.location}</span>
                    )}
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  <ul>
                    {project.workPerformed.map((work) => (
                      <li key={work}>{work}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="work-placeholder">
            <div className="work-lines" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="work-placeholder-copy">
              <span className="eyebrow">Our work, up close</span>
              <h3>
                Real properties.
                <br />
                Real transformations.
              </h3>
              <p>
                We’re getting our project photos ready. Check back for
                before-and-after stories from our work.
              </p>
              <a className="text-link" href="#contact">
                Let’s talk about your property <Icon name="arrow-up" />
              </a>
            </div>
            <div className="work-placeholder-mark" aria-hidden="true">
              <span>BEFORE</span>
              <div className="work-line">
                <i>↔</i>
              </div>
              <span>AFTER</span>
              <small>PROJECT STORIES COMING SOON</small>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
