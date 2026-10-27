import { useEffect, useMemo, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, ArrowRight, Search, Menu, X, Leaf, FileText, Download, ExternalLink, Sprout, Bookmark } from 'lucide-react'
import { siteConfig } from './data/siteConfig'
import { submissions, type SubmissionCategory } from './data/submissions'
import { artworkSources } from './data/artworkSources'

const filters = ['All', 'ISA', 'ESE', 'Extras'] as const
type Filter = typeof filters[number]

function resolveAttachmentUrl(url: string) {
  // Absolute external links stay untouched. Local static files need Vite's base
  // prefix because GitHub Pages project sites are served from /<repo>/.
  if (/^(https?:)?\/\//i.test(url)) return url
  return `${import.meta.env.BASE_URL}${url.replace(/^\/+/, '')}`
}

function IntroAnimation() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const wasSeen = sessionStorage.getItem('fieldnotes-intro-seen')
    if (!wasSeen && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      const start = performance.now()
      let raf = 0
      const tick = (now: number) => {
        const p = Math.min(100, Math.round(((now - start) / 2200) * 100))
        setProgress(p)
        if (p < 100) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
      const timeout = window.setTimeout(() => {
        setVisible(false)
        sessionStorage.setItem('fieldnotes-intro-seen', '1')
      }, 2450)
      return () => {
        cancelAnimationFrame(raf)
        window.clearTimeout(timeout)
      }
    }
  }, [])

  const skip = () => {
    sessionStorage.setItem('fieldnotes-intro-seen', '1')
    setVisible(false)
  }

  if (!visible) return null
  return (
    <div className="intro-screen" role="status" aria-label="Opening illustrated portfolio">
      <div className="intro-paper-grain" />
      <p className="intro-kicker">FIELDNOTES / ECO <span>·</span> AN ENVIRONMENTAL ARCHIVE</p>
      <div className="intro-globe-wrap">
        <div className="intro-orbit orbit-one" />
        <div className="intro-orbit orbit-two" />
        <img className="intro-globe" src="https://upload.wikimedia.org/wikipedia/commons/0/07/Vintage_globe_stand_illustration_%2839820333443%29.jpg" alt="Vintage engraved globe illustration" />
        <div className="intro-leaf-note">a little more life<br />in every cycle</div>
      </div>
      <div className="intro-footer">
        <span>RESTORING BALANCE</span>
        <div className="intro-progress"><span style={{ width: `${progress}%` }} /></div>
        <button onClick={skip}>Skip intro <ArrowUpRight size={13} /></button>
      </div>
    </div>
  )
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    { href: '#overview', label: 'Overview' },
    { href: '#about', label: 'About' },
    { href: '#submissions', label: 'Submissions' },
    { href: '#course', label: 'Course' },
  ]
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Fieldnotes Eco home">
        <span className="wordmark-mark"><Leaf size={15} strokeWidth={1.5} /></span>
        <span>{siteConfig.brand}</span>
      </a>
      <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
        {links.map(link => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
        <a className="nav-contact" href="#submissions" onClick={() => setMenuOpen(false)}>Explore archive <ArrowUpRight size={14} /></a>
      </nav>
      <button className="mobile-menu-toggle" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero section-shell" id="top">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot" /> ENVIRONMENTAL STUDIES <span className="eyebrow-slash">/</span> DIGITAL PORTFOLIO</div>
        <h1>Small actions.<br /><em>A more circular</em><br />future.</h1>
        <p className="hero-description">A digital collection of academic work exploring e-waste, resource recovery, environmental responsibility and the systems that make a more sustainable future possible.</p>
        <a className="text-link hero-link" href="#submissions">Explore the submissions <ArrowDownRight size={17} /></a>
        <div className="hero-hand-note">less waste,<br /><span>more life</span><i>↙</i></div>
      </div>
      <div className="hero-art" aria-label="Vintage globe illustration and botanical artwork">
        <span className="art-index">FIG. 01 <i>—</i> OUR SHARED HOME</span>
        <div className="art-paper art-paper-back" />
        <div className="hero-art-frame">
          <img className="hero-globe" src="https://upload.wikimedia.org/wikipedia/commons/0/07/Vintage_globe_stand_illustration_%2839820333443%29.jpg" alt="A vintage engraved globe on a stand" />
          <div className="globe-annotation annotation-top">a world<br />in the making</div>
          <div className="globe-annotation annotation-bottom">every resource<br />has a story</div>
          <span className="art-circle art-circle-one" />
          <span className="art-circle art-circle-two" />
        </div>
        <div className="hero-botanical">
          <img src="https://api.nga.gov/iiif/2e493964-a0ff-49ad-a160-735bdf6e3516/full/1000,/0/default.jpg" alt="Vintage botanical illustration of an orchid and leaves" />
          <span>PLATE 7 <i>·</i> RENEWAL</span>
        </div>
        <div className="hero-stamp"><span>KEEP</span><span>IT</span><span>CIRCULAR</span><Leaf size={19} strokeWidth={1.2} /></div>
        <div className="art-caption"><span>01 /</span> SMALLER FOOTPRINTS, LONGER STORIES</div>
      </div>
      <div className="hero-bottom-line">
        <div className="hero-meta-item"><span>PREPARED BY</span><strong>{siteConfig.studentName}</strong></div>
        <div className="hero-meta-item"><span>ROLL NUMBER</span><strong>{siteConfig.rollNumber}</strong></div>
        <div className="hero-meta-item"><span>CLASS / DIVISION</span><strong>{siteConfig.classDivision}</strong></div>
        <div className="hero-meta-item"><span>INSTITUTE</span><strong>{siteConfig.institute}</strong></div>
        <div className="meta-course"><span>COURSE</span><strong>{siteConfig.courseName}</strong></div>
      </div>
      <a className="scroll-cue" href="#overview"><span>SCROLL TO EXPLORE</span><span className="scroll-cue-line" /></a>
    </section>
  )
}

function Overview() {
  const actualSubmissions = submissions.filter(item => item.attachments.length > 0)
  const counts = {
    all: actualSubmissions.length,
    ISA: actualSubmissions.filter(item => item.category === 'ISA').length,
    ESE: actualSubmissions.filter(item => item.category === 'ESE').length,
    Extras: actualSubmissions.filter(item => item.category === 'Extras').length,
  }
  const localFileCount = actualSubmissions.reduce((total, item) => total + item.attachments.filter(attachment => !attachment.external).length, 0)
  return (
    <section className="overview section-shell section-block" id="overview">
      <div className="section-side-label"><span>01</span><span>THE COLLECTION</span></div>
      <div className="overview-main">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">A STUDY IN RESPONSIBILITY</p>
            <h2>The work,<br /><em>in one place.</em></h2>
          </div>
          <p className="overview-intro">Coursework, research, reports and practical activities collected into one quiet corner of the internet. A record of learning, ideas and small steps toward a more thoughtful relationship with the things we make and use.</p>
        </div>
        <div className="stat-strip">
          <div className="stat-item"><span>ASSIGNMENTS</span><strong>{String(counts.all).padStart(2, '0')}</strong><small>grouped activities</small></div>
          <div className="stat-item"><span>ISA</span><strong>{String(counts.ISA).padStart(2, '0')}</strong><small>internal assessment</small></div>
          <div className="stat-item"><span>ESE</span><strong>{String(counts.ESE).padStart(2, '0')}</strong><small>end-semester work</small></div>
          <div className="stat-item"><span>EXTRAS</span><strong>{String(counts.Extras).padStart(2, '0')}</strong><small>supporting material</small></div>
          <div className="stat-note"><span className="note-asterisk">✳</span><p>{localFileCount} uploaded files across {counts.all} assignments.<br /><em>Every assignment has a place.</em></p></div>
        </div>
      </div>
      <div className="overview-botanical" aria-hidden="true">
        <img src="https://api.nga.gov/iiif/2e493964-a0ff-49ad-a160-735bdf6e3516/full/1000,/0/default.jpg" alt="" loading="lazy" />
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="about-section section-shell section-block" id="about">
      <div className="section-side-label"><span>02</span><span>ABOUT THIS PORTFOLIO</span></div>
      <div className="about-main">
        <div className="about-heading-row">
          <div>
            <p className="section-kicker">A PERSONAL FIELD GUIDE</p>
            <h2>Learning to think<br /><em>in circles.</em></h2>
          </div>
          <div className="about-copy">
            <p>{siteConfig.aboutIntro}</p>
            <p>{siteConfig.aboutDetail}</p>
            <p className="about-closing">{siteConfig.aboutClosing}</p>
          </div>
        </div>
        <div className="about-record">
          <div className="about-record-heading"><span>STUDENT RECORD</span><span>FIELDNOTE · 02</span></div>
          <div className="about-record-grid">
            <div><span>NAME</span><strong>{siteConfig.studentName}</strong></div>
            <div><span>ROLL NUMBER</span><strong>{siteConfig.rollNumber}</strong></div>
            <div><span>CLASS / DIVISION</span><strong>{siteConfig.classDivision}</strong></div>
            <div><span>INSTITUTE</span><strong>{siteConfig.institute}</strong></div>
          </div>
        </div>
      </div>
      <div className="about-margin-note" aria-hidden="true"><span>care for the things<br />we make and use</span><i>↙</i></div>
    </section>
  )
}

function CategoryIcon({ category }: { category: SubmissionCategory }) {
  if (category === 'ISA') return <Bookmark size={16} strokeWidth={1.4} />
  if (category === 'ESE') return <FileText size={16} strokeWidth={1.4} />
  return <Sprout size={16} strokeWidth={1.4} />
}

function SubmissionArchive() {
  const [filter, setFilter] = useState<Filter>('All')
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => submissions.filter(item => {
    const inCategory = filter === 'All' || item.category === filter
    const haystack = [item.id, item.title, item.category, item.description, ...item.tags, ...item.attachments.map(attachment => attachment.label), ...item.attachments.map(attachment => attachment.fileType)].join(' ').toLowerCase()
    return inCategory && haystack.includes(query.trim().toLowerCase())
  }), [filter, query])

  return (
    <section className="archive section-shell section-block" id="submissions">
      <div className="section-side-label"><span>03</span><span>SUBMISSION ARCHIVE</span></div>
      <div className="archive-main">
        <div className="archive-heading">
          <div>
            <p className="section-kicker">COLLECTED WITH CARE</p>
            <h2>Open the<br /><em>fieldnotes.</em></h2>
          </div>
          <p className="archive-description">Browse the 14 activities by assessment, open their supporting files, or search the collection. Related campaign artefacts are grouped together under one assignment.</p>
        </div>
        <div className="archive-controls">
          <div className="filter-tabs" role="tablist" aria-label="Filter submissions by category">
            {filters.map(item => <button key={item} className={`filter-tab ${filter === item ? 'active' : ''}`} onClick={() => setFilter(item)} role="tab" aria-selected={filter === item}>{item}<span>{item === 'All' ? submissions.length : submissions.filter(s => s.category === item).length}</span></button>)}
          </div>
          <label className="search-field">
            <Search size={17} strokeWidth={1.5} />
            <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search the archive..." aria-label="Search submissions" />
            {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}
          </label>
        </div>
        <div className="archive-results-line"><span>{filtered.length} {filtered.length === 1 ? 'ENTRY' : 'ENTRIES'} VISIBLE</span><span>ISA / ESE / EXTRAS <i>—</i> A LIVING ARCHIVE</span></div>
        {filtered.length > 0 ? (
          <div className="submission-grid">
            {filtered.map((item, index) => (
              <article className="submission-card" key={item.id} style={{ animationDelay: `${index * 45}ms` }}>
                <div className="card-top-line"><span className="submission-id">{item.id}</span><span className="category-label"><CategoryIcon category={item.category} /> {item.category}</span></div>
                <div className="card-illustration-mark"><span className="card-mark-circle"><CategoryIcon category={item.category} /></span><span className="card-mark-dash" /></div>
                <h3>{item.title}</h3>
                <p className="card-description">{item.description}</p>
                <div className="tag-row">{item.tags.map(tag => <span key={tag}>#{tag}</span>)}</div>
                <div className="attachment-header"><span className="file-status file-ready"><span className="status-dot" />{item.attachments.filter(attachment => !attachment.external).length} FILE{item.attachments.filter(attachment => !attachment.external).length === 1 ? '' : 'S'} ATTACHED</span><span className="attachment-count">{item.attachments.length} LINK{item.attachments.length === 1 ? '' : 'S'}</span></div>
                <div className="attachment-list">
                  {item.attachments.map(attachment => (
                    <a className="card-action" key={attachment.url} href={resolveAttachmentUrl(attachment.url)} target="_blank" rel="noreferrer" aria-label={`${attachment.label} (${attachment.fileType})`}>
                      <span>{attachment.label}</span>
                      {attachment.external ? <ExternalLink size={13} /> : <Download size={13} />}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state"><Search size={22} strokeWidth={1.2} /><h3>No fieldnotes found</h3><p>Try another keyword or choose a different category.</p><button onClick={() => { setFilter('All'); setQuery('') }}>Reset filters <ArrowRight size={14} /></button></div>
        )}
        <div className="archive-footnote"><span className="footnote-star">✳</span><p>Fourteen assignments are organized into 5 ISA activities, 7 ESE activities and 2 extras. Fifteen local files are included; the campaign poster and comic are grouped together, and the state tracker also links to its interactive dashboard.</p></div>
      </div>
    </section>
  )
}

function CircularEconomy() {
  const steps = [
    { num: '01', title: 'Use', text: 'Choose, care for and maintain devices for longer.' },
    { num: '02', title: 'Collect', text: 'Keep old electronics out of ordinary household waste.' },
    { num: '03', title: 'Disassemble', text: 'Separate components through responsible processes.' },
    { num: '04', title: 'Recover', text: 'Recover useful materials where safe and feasible.' },
    { num: '05', title: 'Renew', text: 'Return materials to new products and useful cycles.' },
  ]
  return (
    <section className="cycle-section section-shell section-block" id="cycle">
      <div className="section-side-label"><span>04</span><span>THE CIRCULAR IDEA</span></div>
      <div className="cycle-main">
        <div className="cycle-heading-row">
          <div><p className="section-kicker">FROM OBJECT TO OPPORTUNITY</p><h2>From discarded<br /><em>to renewed.</em></h2></div>
          <p className="cycle-intro">Electronic products hold materials, components and stories. A circular approach asks how we can keep their value in use for longer — and handle the end of a product's life more responsibly.</p>
        </div>
        <div className="cycle-art-panel">
          <div className="cycle-art-copy"><span className="art-index">FIG. 02 <i>—</i> THE SECOND LIFE OF THINGS</span><p>A line doesn't have to end<br /><em>where the product does.</em></p><span className="cycle-handwritten">keep the loop open ↗</span></div>
          <div className="cycle-circuit-art"><img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Circuit_diagram.svg" alt="Simple circuit diagram illustration" loading="lazy" /><span>COMPONENTS / CONNECTIONS / POSSIBILITY</span></div>
          <div className="cycle-flower-art"><img src="https://api.nga.gov/iiif/2e493964-a0ff-49ad-a160-735bdf6e3516/full/1000,/0/default.jpg" alt="Historic botanical illustration" loading="lazy" /></div>
        </div>
        <div className="cycle-steps">
          {steps.map((step, index) => <div className="cycle-step" key={step.num}><div className="step-num">{step.num}</div><div className="step-title-row"><h3>{step.title}</h3>{index < steps.length - 1 && <span className="step-arrow">↗</span>}</div><p>{step.text}</p></div>)}
        </div>
        <p className="cycle-disclaimer">A conceptual learning model — not a claim that this website performs recycling or measures environmental impact.</p>
      </div>
    </section>
  )
}

function CourseSection() {
  const focusAreas = ['Responsible e-waste disposal', 'Resource recovery and recycling', 'Environmental impact', 'Circular economy', 'Sustainable technology']
  return (
    <section className="course-section section-shell section-block" id="course">
      <div className="section-side-label"><span>05</span><span>COURSE NOTES</span></div>
      <div className="course-main">
        <div className="course-heading"><p className="section-kicker">THE CONTEXT AROUND THE WORK</p><h2>About the<br /><em>course.</em></h2><p>A place for the course details behind this collection. Keep the information editable as your academic submission comes together.</p></div>
        <div className="course-detail-sheet">
          <div className="sheet-header"><span>COURSE RECORD</span><span>NO. 05 / 05</span></div>
          <div className="course-detail-row"><span>COURSE NAME</span><strong>{siteConfig.courseName}</strong></div>
          <div className="course-detail-row"><span>COURSE CODE</span><strong>{siteConfig.courseCode}</strong></div>
          <div className="course-detail-row"><span>SEMESTER</span><strong>{siteConfig.semester}</strong></div>
          <div className="course-detail-row"><span>CREDITS</span><strong>{siteConfig.courseCredits}</strong></div>
          <div className="course-detail-row"><span>LECTURE PLAN</span><strong>{siteConfig.lectureHours}</strong></div>
          <div className="course-detail-row"><span>FACULTY</span><strong>{siteConfig.facultyName}</strong></div>
          <div className="course-detail-row"><span>INSTITUTE</span><strong>{siteConfig.institute}</strong></div>
          <div className="course-detail-row"><span>ACADEMIC YEAR</span><strong>{siteConfig.academicYear}</strong></div>
          <div className="course-focus"><span className="course-focus-label">FOCUS AREAS <i>↘</i></span>{focusAreas.map((area, i) => <div className="focus-item" key={area}><span>{String(i + 1).padStart(2, '0')}</span><strong>{area}</strong><ArrowUpRight size={14} /></div>)}</div>
        </div>
      </div>
      <div className="course-bottom-note"><div className="small-leaf-doodle"><Leaf size={26} strokeWidth={1.1} /></div><p>Thoughtfully documented.<br /><em>Open to what comes next.</em></p><span>END OF FIELDNOTES <i>·</i> KEEP GROWING</span></div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-top"><a className="wordmark" href="#top"><span className="wordmark-mark"><Leaf size={15} strokeWidth={1.5} /></span><span>{siteConfig.brand}</span></a><p>A more sustainable future begins<br />with what we do today.</p><a href="#top" className="back-top">BACK TO TOP <ArrowUpRight size={14} /></a></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} FIELDNOTES / ECO</span><span>EWEM · SEMESTER V · 2026–27</span><a href="#credits">ARTWORK SOURCES ↗</a></div>
    </footer>
  )
}

function ArtworkCredits() {
  return (
    <section className="credits-section section-shell" id="credits">
      <details>
        <summary>Illustration credits & source notes <ArrowUpRight size={14} /></summary>
        <div className="credits-grid">
          {artworkSources.map(source => <article className="credit-item" key={source.name}><strong>{source.name}</strong><span>{source.creator}</span><p>{source.license}</p><a href={source.source} target="_blank" rel="noreferrer">View original source <ExternalLink size={12} /></a></article>)}
        </div>
        <p className="credits-note">These are existing artworks, not AI-generated images. They are loaded from the original hosting sources so this ZIP remains lightweight. You need an internet connection for the remote artwork to appear. Review the source page before any redistribution beyond the permissions stated there.</p>
      </details>
    </section>
  )
}

export default function App() {
  useEffect(() => {
    const revealTargets = document.querySelectorAll('.section-block, .site-footer')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      revealTargets.forEach(target => target.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })
    revealTargets.forEach(target => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <IntroAnimation />
      <Navbar />
      <main>
        <Hero />
        <Overview />
        <AboutSection />
        <SubmissionArchive />
        <CircularEconomy />
        <CourseSection />
        <ArtworkCredits />
      </main>
      <Footer />
    </>
  )
}
