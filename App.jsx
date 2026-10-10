import { useMemo, useState } from 'react';
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, Check, ChevronDown,
  CircleHelp, Command, FolderKanban, LayoutDashboard, Menu, Plus,
  Search, Settings, Users, X, MoreHorizontal, Clock3, CalendarDays
} from 'lucide-react';

const initialTasks = [
  { id: 1, title: 'Design system refresh', project: 'Website redesign', tag: 'Design', color: 'purple', due: 'Today', done: false },
  { id: 2, title: 'Review landing page copy', project: 'Marketing site', tag: 'Content', color: 'orange', due: 'Today', done: false },
  { id: 3, title: 'Set up authentication flow', project: 'Mobile app', tag: 'Development', color: 'blue', due: 'Tomorrow', done: true },
  { id: 4, title: 'Prepare sprint demo', project: 'Platform', tag: 'Planning', color: 'green', due: 'Oct 14', done: false },
];

const projects = [
  { name: 'Website redesign', short: 'WR', color: 'purple', progress: 72, tasks: '18/25 tasks', people: ['AM', 'JD', 'SK'] },
  { name: 'Mobile app', short: 'MA', color: 'blue', progress: 48, tasks: '12/25 tasks', people: ['JD', 'SK'] },
  { name: 'Marketing site', short: 'MS', color: 'orange', progress: 86, tasks: '19/22 tasks', people: ['AM', 'RK', 'JD'] },
];

function Avatar({ initials, color = '' }) {
  return <span className={`avatar ${color}`}>{initials}</span>;
}

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeNav, setActiveNav] = useState('Overview');
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [mobileNav, setMobileNav] = useState(false);

  const filteredTasks = useMemo(() => tasks.filter(t =>
    `${t.title} ${t.project} ${t.tag}`.toLowerCase().includes(search.toLowerCase())
  ), [tasks, search]);

  function addTask(e) {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([{ id: Date.now(), title: newTask.trim(), project: 'Personal workspace', tag: 'New', color: 'blue', due: 'Today', done: false }, ...tasks]);
    setNewTask('');
    setShowAdd(false);
  }

  function toggleTask(id) {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard },
    { label: 'My tasks', icon: Check, count: tasks.filter(t => !t.done).length },
    { label: 'Projects', icon: FolderKanban },
    { label: 'Team', icon: Users },
  ];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
        <div className="brand"><div className="brand-mark"><Command size={19} /></div><span>orbit<span className="brand-dot">.</span></span><button className="icon-button mobile-close" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={18}/></button></div>
        <div className="workspace-switch"><div className="workspace-icon">S</div><div className="workspace-copy"><strong>Studio Workspace</strong><span>Free plan</span></div><ChevronDown size={16}/></div>
        <div className="nav-label">WORKSPACE</div>
        <nav>{navItems.map(({ label, icon: Icon, count }) => <button key={label} onClick={() => { setActiveNav(label); setMobileNav(false); }} className={`nav-item ${activeNav === label ? 'active' : ''}`}><Icon size={18}/><span>{label}</span>{count !== undefined && <span className="nav-count">{count}</span>}</button>)}</nav>
        <div className="nav-label projects-label">YOUR PROJECTS <button className="tiny-add" onClick={() => setShowAdd(true)} aria-label="Add task"><Plus size={14}/></button></div>
        <div className="project-nav">{projects.map(p => <button key={p.name} className="nav-item project-link" onClick={() => setActiveNav('Projects')}><span className={`project-dot ${p.color}`}></span><span>{p.name}</span></button>)}</div>
        <div className="sidebar-bottom"><div className="upgrade-card"><div className="upgrade-icon"><Activity size={17}/></div><strong>Make room for big ideas</strong><p>Upgrade your workspace to unlock more projects.</p><button onClick={() => alert('Thanks for your interest! Upgrade options can be connected here.')}>Explore plans <span>↗</span></button></div><button className="nav-item"><Settings size={18}/><span>Settings</span></button><button className="nav-item"><CircleHelp size={18}/><span>Help & support</span></button><div className="profile"><Avatar initials="HK" color="profile-avatar"/><div className="profile-copy"><strong>Harikrishnan</strong><span>Free account</span></div><MoreHorizontal size={19}/></div></div>
      </aside>

      {mobileNav && <button className="mobile-backdrop" onClick={() => setMobileNav(false)} aria-label="Close navigation" />}
      <main className="main-area">
        <header className="topbar"><div className="breadcrumb"><button className="icon-button menu-toggle" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={20}/></button><span>Workspace</span><span className="crumb-slash">/</span><strong>{activeNav}</strong></div><div className="top-actions"><label className="search-box"><Search size={16}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..." /><kbd>⌘ K</kbd></label><button className="icon-button notification" aria-label="Notifications"><Bell size={18}/><i/></button><Avatar initials="HK" color="profile-avatar"/></div></header>
        <div className="content">
          <section className="welcome-row"><div><div className="eyebrow"><span className="status-pulse"></span> MONDAY, OCTOBER 12</div><h1>Good morning, Harikrishnan <span className="wave">✳</span></h1><p>Here's what's happening with your workspace today.</p></div><button className="primary-button" onClick={() => setShowAdd(true)}><Plus size={17}/> New task</button></section>

          <section className="stats-grid">
            <article className="stat-card"><div className="stat-top"><span>Tasks completed</span><span className="stat-icon mint"><Check size={17}/></span></div><div className="stat-number">24 <span className="stat-total">/ 36</span></div><div className="stat-foot"><span className="trend"><ArrowUpRight size={14}/> 12.8%</span><span>vs. last week</span></div><div className="mini-progress"><span style={{width:'67%'}}/></div></article>
            <article className="stat-card"><div className="stat-top"><span>Active projects</span><span className="stat-icon lavender"><FolderKanban size={17}/></span></div><div className="stat-number">08</div><div className="stat-foot"><span className="trend"><ArrowUpRight size={14}/> 2 new</span><span>this month</span></div><div className="mini-bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
            <article className="stat-card"><div className="stat-top"><span>Team productivity</span><span className="stat-icon peach"><Activity size={17}/></span></div><div className="stat-number">89<span className="stat-unit">%</span></div><div className="stat-foot"><span className="trend"><ArrowUpRight size={14}/> 4.6%</span><span>vs. last week</span></div><div className="sparkline"><svg viewBox="0 0 250 30" preserveAspectRatio="none"><path d="M0 25 C18 20, 22 24, 38 16 S62 23, 80 12 S105 18, 124 10 S149 18, 168 8 S190 15, 208 5 S232 10, 250 2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg></div></article>
            <article className="stat-card"><div className="stat-top"><span>Overdue tasks</span><span className="stat-icon rose"><Clock3 size={17}/></span></div><div className="stat-number">03</div><div className="stat-foot"><span className="downtrend"><ArrowDownRight size={14}/> 2 fewer</span><span>than last week</span></div><div className="overdue-dots"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
          </section>

          <section className="middle-grid">
            <article className="panel projects-panel"><div className="panel-heading"><div><h2>Projects</h2><p>Keep track of your team's progress</p></div><button className="text-button" onClick={() => setActiveNav('Projects')}>View all <span>↗</span></button></div><div className="project-list">{projects.map(p => <div className="project-row" key={p.name}><div className={`project-icon ${p.color}`}>{p.short}</div><div className="project-info"><div className="project-title-row"><strong>{p.name}</strong><span>{p.progress}%</span></div><div className="progress-track"><span className={p.color} style={{width:`${p.progress}%`}}/></div><div className="project-meta"><span>{p.tasks}</span><div className="avatar-stack">{p.people.map((person, i) => <Avatar key={person} initials={person} color={`avatar-${i}`}/>)}</div></div></div><button className="icon-button more-button" aria-label={`More options for ${p.name}`}><MoreHorizontal size={18}/></button></div>)}</div></article>
            <article className="panel activity-panel"><div className="panel-heading"><div><h2>Team activity</h2><p>What your team has been up to</p></div><button className="icon-button"><MoreHorizontal size={19}/></button></div><div className="activity-list"><div className="activity-item"><Avatar initials="AM" color="avatar-0"/><div><p><strong>Alex Morgan</strong> completed a task</p><span>Updated the homepage layout</span><small>12 min ago</small></div></div><div className="activity-item"><Avatar initials="JD" color="avatar-1"/><div><p><strong>Jamie Davis</strong> added a comment</p><span>“Looks great, ready for review!”</span><small>38 min ago</small></div></div><div className="activity-item"><Avatar initials="SK" color="avatar-2"/><div><p><strong>Sam Kim</strong> created a project</p><span>Mobile app · 4 tasks</span><small>2 hours ago</small></div></div><div className="activity-item"><Avatar initials="RK" color="avatar-3"/><div><p><strong>Riley Kumar</strong> shared a file</p><span>Brand-guidelines-v2.pdf</span><small>3 hours ago</small></div></div></div></article>
          </section>

          <section className="panel tasks-panel"><div className="panel-heading"><div><h2>My tasks <span className="heading-count">{filteredTasks.filter(t => !t.done).length}</span></h2><p>Your priorities, all in one place</p></div><div className="task-heading-actions"><button className="filter-button"><CalendarDays size={15}/> This week <ChevronDown size={14}/></button><button className="text-button" onClick={() => setActiveNav('My tasks')}>View all <span>↗</span></button></div></div><div className="task-table"><div className="task-table-head"><span>TASK NAME</span><span>PROJECT</span><span>PRIORITY</span><span>DUE DATE</span><span></span></div>{filteredTasks.length ? filteredTasks.map(task => <div className={`task-row ${task.done ? 'task-done' : ''}`} key={task.id}><button className={`task-check ${task.done ? 'checked' : ''}`} onClick={() => toggleTask(task.id)} aria-label={task.done ? 'Mark incomplete' : 'Mark complete'}>{task.done && <Check size={13}/>}</button><div className="task-name">{task.title}</div><div className="task-project"><span className={`project-dot ${task.color}`}></span>{task.project}</div><div><span className={`tag ${task.color}`}>{task.tag}</span></div><div className={`due-date ${task.due === 'Today' && !task.done ? 'due-today' : ''}`}>{task.due}</div><button className="icon-button row-more" aria-label="Task options"><MoreHorizontal size={17}/></button></div>) : <div className="empty-state">No tasks match your search.</div>}</div><div className="table-footer"><span>Showing {filteredTasks.length} tasks</span><button onClick={() => setShowAdd(true)}><Plus size={15}/> Add a task</button></div></section>
          <footer><span>© 2026 Orbit Workspace</span><span>Made for focused work <span className="footer-heart">♥</span></span></footer>
        </div>
      </main>

      {showAdd && <div className="modal-backdrop" onClick={() => setShowAdd(false)}><form className="task-modal" onSubmit={addTask} onClick={e => e.stopPropagation()}><div className="modal-title"><div><h2>Create a task</h2><p>Add a new item to your task list.</p></div><button type="button" className="icon-button" onClick={() => setShowAdd(false)} aria-label="Close"><X size={19}/></button></div><label className="field-label" htmlFor="task-title">Task name</label><input id="task-title" className="task-input" autoFocus value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="e.g. Prepare project proposal" maxLength={100}/><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowAdd(false)}>Cancel</button><button className="primary-button" type="submit"><Plus size={16}/> Create task</button></div></form></div>}
    </div>
  );
}

export default App;