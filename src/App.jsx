import { Suspense, lazy } from 'react'
import ExperienceItem from './components/ExperienceItem.jsx'
import DraggableFooter from './components/DraggableFooter.jsx'

const Hero3D = lazy(() => import('./components/Hero3D.jsx'))

const work = [
  {
    title: 'Content strategy, Santa Cruz Dragon Boat',
    role: 'Social Chair',
    period: '2025 — present',
    tags: ['social', 'strategy'],
    summary:
      "Took over Instagram from a predecessor who posted about twice a month, all carousels. In my first year I scaled to ~7 posts a month, adding reels (which pulled 3.5x the reach of carousels) — total account reach grew 5.3x (28K to 150K) and total engagement nearly tripled. Average reach per post was still up 64% even with the higher volume, so it wasn't just posting more, it was posting better, more often. Also secured $600+ in sponsor support from proposals I wrote myself.",
  },
  {
    title: 'Mini Campus Explorer',
    role: 'Game design & dev, team of 4',
    period: '2025',
    tags: ['dev', 'product'],
    summary:
      "Built a top-down exploration game in GDevelop with a small team, start to shipped demo in one quarter. I owned the NPC interaction and quest logic, ran playtests with classmates, filed the bugs we found as GitHub issues, and cut scope where it didn't serve the deadline.",
  },
  {
    title: 'Extracurriculars & academic outcomes',
    role: 'Research + design, PSYC 100',
    period: '2025',
    tags: ['research', 'social'],
    summary:
      'Surveyed 200 students, reviewed the existing literature, then designed the infographic that turned the dataset into something a non-technical reader could actually take in at a glance.',
  },
  {
    title: 'Human memory research',
    role: 'Research Assistant, Storm Memory Lab',
    period: '2025 — present',
    tags: ['research'],
    summary:
      'Run sessions for 100+ participants across two active studies, keep the protocol tight enough that the data holds up, and sit in on weekly lab meetings where the actual study designs get debated.',
  },
]

const experience = [
  {
    org: 'Santa Cruz Dragon Boat',
    role: 'Social Chair',
    period: 'Jun 2025 — present',
    posts: [
      'https://www.instagram.com/reel/DQ4pAzXknRJ/',
      'https://www.instagram.com/reel/DPco3SsjYvu/',
      'https://www.instagram.com/reel/DXBWDQ9tEFG/',
    ],
  },
  {
    org: 'Storm Memory Lab, UCSC',
    role: 'Research Assistant',
    period: 'Mar 2025 — present',
    note: [
      'Principal Investigator: Melissa Chen',
      'Person Above the PI: Dr. Benjamin Storm',
    ],
  },
  {
    org: 'UCSC Blueprint',
    role: 'External Vice President',
    period: 'Mar 2025 — present',
    bullets: [
      'Led brand strategy and communications for Blueprint, using analytics to grow audiences across Instagram, LinkedIn, Medium, and newsletter.',
      'Created content on all platforms to increase engagement.',
      'Spearheaded corporate and campus partnerships with UCSC clubs and nonprofits, synthesizing data for executive decisions.',
      'Drove data-driven outreach for fundraisers and the annual summit, maximizing attendance through audience analytics.',
    ],
  },
  {
    org: 'College Leadership and Engagement Office',
    role: 'Programs Assistant',
    period: 'Sep 2026 — present',
    bullets: [
      'Planned, implemented, and evaluated 10+ community-building programs (100–400+ attendees) addressing college theme and learning goals, managing full event lifecycle from outreach through teardown.',
      "Served as academic and social resource for new students through small-group facilitation and 1:1 support, while partnering with ResLife, Student Government, and the Provost's Office on campus-wide events like Move-In and Welcome Week.",
      'Designed programs and outreach materials centered on social justice, diversity, and belonging, using participant feedback to iteratively improve engagement and program design.',
    ],
  },
]

const skillGroups = [
  { label: 'Social & content', items: ['Instagram & TikTok strategy', 'Canva', 'Adobe Illustrator', 'Copywriting'] },
  { label: 'Build & code', items: ['Python', 'C', 'React', 'GDevelop', 'Git/GitHub'] },
  { label: 'Research & product thinking', items: ['Survey design', 'User testing', 'Data visualization', 'Scoping & prioritization'] },
  { label: 'Other', items: ['Mandarin — professional fluency', 'Google Workspace', 'WordPress'] },
]

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="section">
      <div className="section-head">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

export default function App() {
  return (
    <div className="page">
      <header className="topbar">
        <span className="wordmark">Anna Zhang</span>
        <nav>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Santa Cruz, CA · UC Santa Cruz, class of 2028</p>
          <h1>
            I make things people <em>actually</em> use, tell, or play —
            across social, product, and code.
          </h1>
          <p className="hero-sub">
            Cognitive Science &amp; Computer Science student who grew a club's
            audience with real content strategy, shipped a small game with a
            team, and runs research studies that need to hold up. Looking for
            roles in social media, product, or development where I can keep
            doing all three.
          </p>
          <div className="hero-actions">
            <a className="btn-primary" href="#contact">Get in touch</a>
            <a className="btn-secondary" href="/Anna_Zhang_Resume.pdf" target="_blank" rel="noreferrer">
              View resume
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <Suspense fallback={<div className="hero3d-fallback" />}>
            <Hero3D />
          </Suspense>
        </div>
      </section>

      <Section id="work" eyebrow="Selected work" title="A few things I've built">
        <div className="work-list">
          {work.map((item) => (
            <article className="work-item" key={item.title}>
              <div className="work-meta">
                <span className="work-period">{item.period}</span>
                <div className="work-tags">
                  {item.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="work-body">
                <h3>{item.title}</h3>
                <p className="work-role">{item.role}</p>
                <p>{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="experience" eyebrow="Experience" title="Where I've spent my time">
        <ul className="experience-list">
          {experience.map((job) => (
            <ExperienceItem job={job} key={job.org + job.role} />
          ))}
        </ul>
      </Section>

      <Section id="skills" eyebrow="Skills" title="What I bring">
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.label}>
              <h3>{group.label}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact" eyebrow="Contact" title="Let's talk">
        <div className="contact-block">
          <p>
            I'm open to social media, product, and development roles —
            internships or entry-level. Reach me directly, it's the fastest way.
          </p>
          <a className="btn-primary" href="mailto:annaz94264@gmail.com">
            annaz94264@gmail.com
          </a>
          <a className="btn-secondary" href="https://www.linkedin.com/in/annazhang06" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </Section>

      <DraggableFooter />
    </div>
  )
}
