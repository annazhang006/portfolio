let scriptPromise = null

// Loads Instagram's embed.js once and reuses the same promise for every
// embed on the page, so we never inject the script twice.
function loadInstagramEmbedScript() {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (window.instgrm) return Promise.resolve(window.instgrm)
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    script.onload = () => resolve(window.instgrm || null)
    script.onerror = () => resolve(null)
    document.body.appendChild(script)
  })
  return scriptPromise
}

export function processInstagramEmbeds() {
  loadInstagramEmbedScript().then((instgrm) => {
    if (instgrm) instgrm.Embeds.process()
  })
}

export default function InstagramEmbed({ url }) {
  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{
        background: '#FFF',
        border: 0,
        borderRadius: '12px',
        margin: 0,
        width: '100%',
      }}
    />
  )
}
