import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const sections = ['Overview', 'Story', 'Characters', 'Locations', 'Scenes', 'Visuals', 'Breakdown', 'Schedule'];

const projects = [
  { name: 'Drown and Thirst It Is', type: 'Feature Film', progress: 72, status: 'In development', scenes: 46, characters: 12, locations: 8, pages: 91 },
  { name: 'Sentient Mass', type: 'Feature Film', progress: 48, status: 'Story development', scenes: 29, characters: 9, locations: 14, pages: 57 },
  { name: 'Engineered Fear', type: 'Feature Film', progress: 31, status: 'Concept', scenes: 18, characters: 7, locations: 6, pages: 34 }
];

const moduleCopy = {
  Overview: ['Project overview', 'The production desk for your film. Keep the creative decisions, development status, and next actions visible.'],
  Story: ['Story development', 'Build the narrative from premise through treatment, beats, structure, and screenplay.'],
  Characters: ['Character development', 'Track the people, relationships, motivations, arcs, and performance notes that drive the film.'],
  Locations: ['Locations', 'Develop the physical world of the film and keep production design decisions attached to place.'],
  Scenes: ['Scene inventory', 'Organize scenes by sequence, setting, time, characters, and production requirements.'],
  Visuals: ['Visual development', 'Collect the visual language, references, production design direction, and cinematography intent.'],
  Breakdown: ['Production breakdown', 'Turn creative decisions into practical requirements for cast, crew, locations, props, wardrobe, and departments.'],
  Schedule: ['Schedule', 'Move the film toward production readiness with dates, dependencies, and department milestones.']
};

function App() {
  const [active, setActive] = useState('Overview');
  const [projectIndex, setProjectIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const project = projects[projectIndex];
  const copy = moduleCopy[active];

  const filteredProjects = useMemo(
    () => projects.map((item, index) => ({ item, index })).filter(({ item }) => item.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">K</span>
          <div><b>The Blue Kargo</b><small>Film pre-production</small></div>
        </div>

        <div className="workspace-label">WORKSPACE</div>
        <nav>
          {sections.map((section, index) => (
            <button key={section} className={active === section ? 'active' : ''} onClick={() => setActive(section)}>
              <span>{section}</span><small>{String(index + 1).padStart(2, '0')}</small>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="new-project" onClick={() => setNewProjectOpen(true)}>＋ New project</button>
          <div className="profile"><span>NL</span><div><b>Director workspace</b><small>Local workspace</small></div></div>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div className="project-heading">
            <span>PROJECT / {project.type.toUpperCase()}</span>
            <h1>{project.name}</h1>
          </div>
          <div className="top-actions">
            <label className="search"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects" /></label>
            <button className="settings" onClick={() => setSettingsOpen(true)}>Project settings</button>
          </div>
        </header>

        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">{active.toUpperCase()}</span>
            <h2>{copy[0]}<br /><i>{active === 'Overview' ? 'before' : 'in one place'}.</i></h2>
            <p>{copy[1]}</p>
          </div>
          <div className="readiness">
            <span className="eyebrow">PRODUCTION READINESS</span>
            <strong>{project.progress}%</strong>
            <div className="meter"><i style={{ width: `${project.progress}%` }} /></div>
            <small>{project.status}</small>
          </div>
        </section>

        <section className="metrics">
          {[
            ['SCENES', project.scenes, 'inventory'],
            ['CHARACTERS', project.characters, 'profiles'],
            ['LOCATIONS', project.locations, 'world'],
            ['SCRIPT', project.pages, 'pages']
          ].map(([label, value, detail]) => (
            <button key={label} className="metric" onClick={() => setActive(label === 'SCENES' ? 'Scenes' : label === 'CHARACTERS' ? 'Characters' : label === 'LOCATIONS' ? 'Locations' : 'Story')}>
              <span>{label}</span><strong>{value}</strong><small>{detail} <b>↗</b></small>
            </button>
          ))}
        </section>

        <section className="workspace-panel">
          <div className="panel-heading">
            <div><span className="eyebrow">CURRENT WORK</span><h3>{active === 'Overview' ? 'Development desk' : copy[0]}</h3></div>
            <span className="panel-meta">{project.name}</span>
          </div>
          <div className="work-grid">
            <article className="feature-work">
              <span className="index">01</span>
              <h4>{active === 'Overview' ? 'Next production decision' : `${active} workspace`}</h4>
              <p>{active === 'Overview' ? 'Complete the treatment pass, lock the principal character relationships, and move the project toward a production-ready breakdown.' : copy[1]}</p>
              <button className="text-link" onClick={() => setActive(active === 'Overview' ? 'Story' : active)}>Open workspace <b>↗</b></button>
            </article>
            <article>
              <span className="index">02</span><h4>Project status</h4>
              <div className="status-line"><span>{project.status}</span><b>{project.progress}%</b></div>
              <div className="meter"><i style={{ width: `${project.progress}%` }} /></div>
              <small className="muted">Last updated today</small>
            </article>
            <article>
              <span className="index">03</span><h4>Production path</h4>
              <div className="path"><b>Concept</b><i /><b className="current">Development</b><i /><span>Pre-production</span></div>
            </article>
          </div>
        </section>

        <section className="projects">
          <div className="section-head"><div><span className="eyebrow">WORKSPACE</span><h3>Projects</h3></div><small>{filteredProjects.length} active</small></div>
          {filteredProjects.map(({ item, index }) => (
            <button key={item.name} className={`project-row ${index === projectIndex ? 'selected' : ''}`} onClick={() => setProjectIndex(index)}>
              <span className="row-index">0{index + 1}</span>
              <div><b>{item.name}</b><small>{item.type} · {item.status}</small></div>
              <div className="row-meter"><i style={{ width: `${item.progress}%` }} /></div>
              <strong>{item.progress}%</strong><em>→</em>
            </button>
          ))}
        </section>
      </main>

      {settingsOpen && <div className="overlay" onClick={() => setSettingsOpen(false)}><section className="modal" onClick={(e) => e.stopPropagation()}><span className="eyebrow">PROJECT SETTINGS</span><h3>{project.name}</h3><p>Project configuration will live here as the production system expands.</p><button onClick={() => setSettingsOpen(false)}>Close</button></section></div>}
      {newProjectOpen && <div className="overlay" onClick={() => setNewProjectOpen(false)}><section className="modal" onClick={(e) => e.stopPropagation()}><span className="eyebrow">NEW PROJECT</span><h3>Start a film</h3><p>Create a new production workspace for story, characters, locations, scenes, visuals, breakdown, and scheduling.</p><button onClick={() => setNewProjectOpen(false)}>Continue</button></section></div>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
