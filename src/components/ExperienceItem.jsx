import { useState, useEffect } from 'react'
import InstagramEmbed, { processInstagramEmbeds } from './InstagramEmbed.jsx'

export default function ExperienceItem({ job }) {
  const [expanded, setExpanded] = useState(false)
  const hasDetail = Boolean(job.posts || job.bullets || job.note)

  useEffect(() => {
    if (expanded && job.posts) {
      processInstagramEmbeds()
    }
  }, [expanded, job.posts])

  return (
    <li className={`exp-item ${expanded ? 'is-expanded' : ''}`}>
      <button
        type="button"
        className="exp-row"
        onClick={() => hasDetail && setExpanded((v) => !v)}
        aria-expanded={expanded}
        disabled={!hasDetail}
      >
        <span className="exp-period">{job.period}</span>
        <span className="exp-org">{job.org}</span>
        <span className="exp-role">{job.role}</span>
        {hasDetail && (
          <span className="exp-chevron" aria-hidden="true">
            {expanded ? '−' : '+'}
          </span>
        )}
      </button>

      {expanded && job.posts && (
        <div className="exp-panel">
          <p className="exp-panel-label">Top posts by reach, from a full year of account data</p>
          <div className="exp-posts">
            {job.posts.map((url) => (
              <InstagramEmbed url={url} key={url} />
            ))}
          </div>
        </div>
      )}

      {expanded && job.note && (
        <div className="exp-panel">
          {job.note.map((line) => (
            <p className="exp-panel-note" key={line}>{line}</p>
          ))}
        </div>
      )}

      {expanded && job.bullets && (
        <div className="exp-panel">
          <ul className="exp-panel-bullets">
            {job.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}
