"use client";


import { useState } from "react";
import type { FormEvent, ReactNode } from "react";



type View =
  | "landing"
  | "signin"
  | "signup"
  | "dashboard"
  | "library"
  | "setup"
  | "plan"
  | "chat"
  | "practice"
  | "resources"
  | "settings";

type IconName =
  | "arrow"
  | "book"
  | "brain"
  | "calendar"
  | "chat"
  | "check"
  | "chevron"
  | "clock"
  | "dashboard"
  | "download"
  | "eye"
  | "file"
  | "folder"
  | "menu"
  | "more"
  | "plus"
  | "search"
  | "settings"
  | "spark"
  | "target"
  | "upload"
  | "user"
  | "x";

const iconPaths: Record<IconName, ReactNode> = {
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z" /><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z" /></>,
  brain: <><path d="M9.5 4.5A3 3 0 0 0 4.8 7a3.2 3.2 0 0 0-.3 6A3.5 3.5 0 0 0 9 18.5V5" /><path d="M14.5 4.5A3 3 0 0 1 19.2 7a3.2 3.2 0 0 1 .3 6 3.5 3.5 0 0 1-4.5 5.5V5M8 9h2M14 12h3M7 15h3" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  chat: <><path d="M21 12a8 8 0 0 1-8 8H5l-3 2 1-5a9 9 0 1 1 18-5z" /></>,
  check: <><path d="m5 12 4 4L19 6" /></>,
  chevron: <><path d="m9 18 6-6-6-6" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  dashboard: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  download: <><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14" /></>,
  eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" /><circle cx="12" cy="12" r="2.5" /></>,
  file: <><path d="M6 2h8l4 4v16H6zM14 2v5h5M9 12h6M9 16h6" /></>,
  folder: <><path d="M3 6h7l2 2h9v11H3z" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  more: <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1z" /></>,
  spark: <><path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4zM18.5 15l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7z" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  upload: <><path d="M12 16V4m0 0L7 9m5-5 5 5M4 19v2h16v-2" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  x: <><path d="M6 6l12 12M18 6 6 18" /></>,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{iconPaths[name]}</svg>;
}

function Button({ children, variant = "primary", icon, onClick, type = "button", className = "", disabled = false }: {
  children: ReactNode; variant?: "primary" | "secondary" | "tertiary" | "danger"; icon?: IconName;
  onClick?: () => void; type?: "button" | "submit"; className?: string; disabled?: boolean;
}) {
  return <button className={`btn btn-${variant} ${className}`} onClick={onClick} type={type} disabled={disabled}>{icon && <Icon name={icon} size={18} />}<span>{children}</span></button>;
}

function Brand({ onClick }: { onClick?: () => void }) {
  return <button className="brand" onClick={onClick}><span className="brand-mark"><Icon name="spark" size={18} /></span><span>Cramly</span></button>;
}

function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "indigo" | "teal" | "amber" | "red" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function Progress({ value }: { value: number }) {
  return <div className="progress" aria-label={`${value}% complete`}><span style={{ width: `${value}%` }} /></div>;
}

function InputField({ label, placeholder, type = "text", error, icon }: { label: string; placeholder?: string; type?: string; error?: string; icon?: IconName }) {
  const [visible, setVisible] = useState(false);
  return <label className="field"><span className="field-label">{label}</span><span className={`input-wrap ${error ? "has-error" : ""}`}>{icon && <Icon name={icon} size={18} />}<input type={type === "password" && visible ? "text" : type} placeholder={placeholder} />{type === "password" && <button type="button" className="input-action" onClick={() => setVisible(!visible)} aria-label="Toggle password visibility"><Icon name="eye" size={18} /></button>}</span>{error && <span className="field-error">{error}</span>}</label>;
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`card ${className}`}>{children}</div>;
}

const navItems: { view: View; label: string; icon: IconName }[] = [
  { view: "dashboard", label: "Dashboard", icon: "dashboard" },
  { view: "library", label: "My Library", icon: "book" },
  { view: "plan", label: "Study Sessions", icon: "clock" },
  { view: "resources", label: "Saved Resources", icon: "file" },
  { view: "settings", label: "Settings", icon: "settings" },
];

function Sidebar({ view, navigate }: { view: View; navigate: (v: View) => void }) {
  return <aside className="sidebar">
    <Brand onClick={() => navigate("dashboard")} />
    <nav className="side-nav">{navItems.map(item => <button key={item.view} className={view === item.view ? "active" : ""} onClick={() => navigate(item.view)}><Icon name={item.icon} size={19} /><span>{item.label}</span></button>)}</nav>
    <div className="side-help"><span className="side-help-icon"><Icon name="spark" size={18} /></span><strong>Need a quick plan?</strong><p>Tell Cramly how much time you have.</p><button onClick={() => navigate("setup")}>Start Exam Rescue <Icon name="arrow" size={15} /></button></div>
    <button className="profile-row" onClick={() => navigate("settings")}><span className="avatar">AK</span><span><strong>Arjun Kumar</strong><small>arjun@college.edu</small></span><Icon name="more" size={18} /></button>
  </aside>;
}

function AppShell({ view, navigate, children }: { view: View; navigate: (v: View) => void; children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return <div className="app-shell">
    <Sidebar view={view} navigate={navigate} />
    <header className="mobile-head"><Brand onClick={() => navigate("dashboard")} /><button className="icon-button" onClick={() => setMobileOpen(!mobileOpen)}><Icon name={mobileOpen ? "x" : "menu"} /></button></header>
    {mobileOpen && <div className="mobile-menu">{navItems.map(item => <button key={item.view} onClick={() => { navigate(item.view); setMobileOpen(false); }}><Icon name={item.icon} size={19} />{item.label}</button>)}</div>}
    <main className="app-main">{children}</main>
    <nav className="bottom-nav">{navItems.slice(0, 4).map(item => <button key={item.view} className={view === item.view ? "active" : ""} onClick={() => navigate(item.view)}><Icon name={item.icon} size={20} /><span>{item.label.split(" ")[0]}</span></button>)}</nav>
  </div>;
}

function Landing({ navigate }: { navigate: (v: View) => void }) {
  return <div className="landing">
    <header className="marketing-nav"><Brand onClick={() => navigate("landing")} /><nav><a href="#features">Features</a><a href="#how">How it works</a></nav><div><Button variant="tertiary" onClick={() => navigate("signin")}>Sign in</Button><Button onClick={() => navigate("setup")}>Start Exam Rescue</Button></div></header>
    <main>
      <section className="hero">
        <div className="hero-copy"><Badge tone="indigo"><Icon name="spark" size={14} /> Your calm plan for the final hours</Badge><h1>Exam tomorrow?<br />Know exactly what to study next.</h1><p>Cramly turns your notes, syllabus, and remaining time into a focused study plan—then helps you understand, practise, and revise what matters.</p><div className="hero-actions"><Button onClick={() => navigate("setup")} icon="arrow">Start Exam Rescue</Button><Button variant="secondary" onClick={() => document.querySelector("#features")?.scrollIntoView()} >Explore features</Button></div><span className="trust-line"><Icon name="check" size={16} /> Built for your materials. No guaranteed-marks claims—just a clearer next step.</span></div>
        <ProductPreview />
      </section>
      <section className="rescue-section" id="features"><div className="section-heading"><Badge tone="indigo">THE EXAM RESCUE ENGINE</Badge><h2>A useful plan, not another overwhelming to-do list</h2><p>Cramly weighs the time you have, your confidence, material evidence, and practice progress to recommend a realistic next action.</p></div><div className="signal-grid">
        {[["clock","Time remaining","Fits the plan to the hours you actually have."],["brain","Your understanding","Spends more time where confidence is low."],["file","Material evidence","Uses syllabus, notes, and past papers when available."],["target","Learning progress","Adapts as you complete topics and practice."]].map(([icon,title,text]) => <Card key={title}><span className="feature-icon"><Icon name={icon as IconName} /></span><h3>{title}</h3><p>{text}</p></Card>)}
      </div></section>
      <section className="feature-showcase">
        <div className="feature-copy"><Badge tone="teal">CONTEXTUAL STUDY</Badge><h2>From “I don’t get it” to a worked example that clicks</h2><p>Ask questions inside a subject, cite your uploaded pages, and switch explanation style without losing context.</p><ul><li><Icon name="check" />Source-grounded answers with page references</li><li><Icon name="check" />Simpler analogies and step-by-step explanations</li><li><Icon name="check" />Save useful answers directly to revision notes</li></ul><Button variant="secondary" onClick={() => navigate("chat")}>See study chat</Button></div>
        <Card className="chat-preview"><div className="mini-context"><Icon name="file" size={16} />2 materials selected</div><div className="mini-message user">Why does a B+ tree keep data only in leaf nodes?</div><div className="mini-message ai"><span className="ai-mark"><Icon name="spark" size={14} /></span><p>Think of internal nodes as a fast directory. They guide the search, while leaf nodes hold the actual records in sorted order.</p><span className="source-pill">DBMS Unit 4.pdf · p. 18</span></div><div className="still-action">I still don’t get it <span>Try an analogy</span></div></Card>
      </section>
      <section className="feature-grid">
        {[["book","Organized study library","Keep subjects, notes, past papers, and generated resources in one clear hierarchy."],["target","Active recall that adapts","Test one idea at a time and flag difficult topics for the study plan."],["file","Revision notes that travel","Save formulas, worked examples, and explanations. Export what you need to PDF."]].map(([icon,title,text]) => <Card key={title}><span className="feature-icon"><Icon name={icon as IconName} /></span><h3>{title}</h3><p>{text}</p></Card>)}
      </section>
      <section className="how-section" id="how"><div className="section-heading"><Badge tone="indigo">HOW IT WORKS</Badge><h2>From scattered materials to focused preparation</h2></div><div className="steps">{[["01","Add what you have","Upload notes, textbooks, syllabus documents, or past papers."],["02","Tell us your situation","Set the subject, remaining time, confidence, and learning preference."],["03","Follow the next best action","Learn, practise, and revise through an explainable plan."]].map(([num,title,text]) => <div className="step" key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>
      <section className="final-cta"><Badge tone="indigo">WHEN TIME MATTERS</Badge><h2>Turn the next six hours into a plan you can follow.</h2><p>Bring your own materials. Cramly will help you decide where to begin.</p><Button onClick={() => navigate("setup")} icon="arrow">Start Exam Rescue</Button></section>
    </main>
    <footer><Brand /><p>Focused preparation for engineering students.</p><span>© 2025 Cramly</span></footer>
  </div>;
}

function ProductPreview() {
  const topics = [["Relational algebra","High","45 min"],["Normalization","High","50 min"],["B+ trees","Medium","35 min"]];
  return <div className="product-preview"><div className="preview-sidebar"><span className="brand-mark"><Icon name="spark" size={15} /></span>{[0,1,2,3].map(i => <i key={i} className={i === 0 ? "on" : ""} />)}</div><div className="preview-main"><div className="preview-top"><div><small>EXAM RESCUE PLAN</small><strong>Database Management Systems</strong></div><span><Icon name="clock" size={15} /> 5h 42m left</span></div><div className="preview-progress"><span>Plan progress</span><strong>28%</strong><Progress value={28} /></div><div className="preview-plan"><div className="next-label">NEXT BEST ACTION</div>{topics.map((topic,i) => <div className={`preview-topic ${i === 0 ? "featured" : ""}`} key={topic[0]}><span className="topic-check">{i === 0 ? <Icon name="arrow" size={15} /> : i + 1}</span><div><strong>{topic[0]}</strong><small>{i === 0 ? "Core concept · Found in past paper" : "Recommended learning block"}</small></div><Badge tone={topic[1] === "High" ? "red" : "amber"}>{topic[1]}</Badge><span>{topic[2]}</span></div>)}</div></div></div>;
}

function Auth({ mode, navigate }: { mode: "signin" | "signup"; navigate: (v: View) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const isSignUp = mode === "signup";
  const submit = (e: FormEvent) => { e.preventDefault(); if (submitted) navigate("dashboard"); else setSubmitted(true); };
  return <div className="auth-page"><button className="auth-back" onClick={() => navigate("landing")}><Icon name="arrow" size={17} /> Back to home</button><div className="auth-panel"><Brand onClick={() => navigate("landing")} /><div className="auth-copy"><h1>{isSignUp ? "Create your study space" : "Welcome back"}</h1><p>{isSignUp ? "Start with your materials and build a focused exam plan." : "Continue your study plan and pick up where you left off."}</p></div><form onSubmit={submit}>{isSignUp && <InputField label="Full name" placeholder="Arjun Kumar" icon="user" />}<InputField label="College email" placeholder="you@college.edu" type="email" icon="user" error={submitted ? "We couldn’t find an account with this email. Check it or create a new account." : undefined} /><InputField label="Password" placeholder="At least 8 characters" type="password" /><Button type="submit" className="full-button">{isSignUp ? "Create account" : "Sign in"}</Button></form><p className="auth-switch">{isSignUp ? "Already have an account?" : "New to Cramly?"}<button onClick={() => navigate(isSignUp ? "signin" : "signup")}>{isSignUp ? "Sign in" : "Create an account"}</button></p><small className="auth-note">Your uploaded materials stay private to your study space.</small></div></div>;
}

function Dashboard({ navigate }: { navigate: (v: View) => void }) {
  const subjects = [
    ["Engineering Mathematics","Calculus · 8 materials","72%","indigo"],
    ["Data Structures & Algorithms","Trees · 5 materials","48%","teal"],
    ["Operating Systems","Process scheduling · 7 materials","36%","blue"],
  ];
  return <div className="page"><div className="page-head dashboard-head"><div><span className="eyebrow">TUESDAY, 14 MAY</span><h1>Good evening, Arjun.</h1><p>Here’s where you left off and what’s worth doing next.</p></div><Button onClick={() => navigate("setup")} icon="spark">Start Exam Rescue</Button></div>
    <Card className="quick-card"><div className="quick-icon"><Icon name="spark" /></div><div><Badge tone="indigo">QUICK START</Badge><h2>Have an exam coming up?</h2><p>Add your notes or choose existing materials. Cramly will turn the time you have into a prioritized, explainable study plan.</p><div className="quick-actions"><Button onClick={() => navigate("setup")} icon="arrow">Build my study plan</Button><Button variant="secondary" onClick={() => navigate("library")} icon="upload">Upload materials</Button></div></div><div className="time-visual"><span>Example plan</span><strong>6 hours</strong><div><i /><i /><i /><i /><i /></div><small>Learn · Practise · Revise</small></div></Card>
    <div className="dashboard-grid"><section><div className="section-title"><div><h2>Recently studied</h2><p>Continue a subject or review your progress.</p></div><button onClick={() => navigate("library")}>View library <Icon name="arrow" size={15} /></button></div><div className="subject-grid">{subjects.map(([title,meta,progress,tone]) => <Card className="subject-card" key={title}><span className={`subject-icon ${tone}`}><Icon name="book" /></span><button className="more-button"><Icon name="more" /></button><h3>{title}</h3><p>{meta}</p><div className="subject-progress"><span>Understanding</span><strong>{progress}</strong></div><Progress value={parseInt(progress)} /></Card>)}</div>
      <div className="section-title"><div><h2>Recent study sessions</h2><p>Your latest focused work.</p></div></div><Card className="session-list"><div className="session-item"><span className="session-date"><strong>13</strong>MAY</span><span><strong>DBMS exam rescue</strong><small>Normalization and relational algebra</small></span><Badge tone="teal">1h 35m focused</Badge><button onClick={() => navigate("plan")}><Icon name="chevron" /></button></div><div className="session-item"><span className="session-date"><strong>11</strong>MAY</span><span><strong>Operating Systems practice</strong><small>CPU scheduling · 8 questions</small></span><Badge>6 of 8 correct</Badge><button onClick={() => navigate("practice")}><Icon name="chevron" /></button></div></Card></section>
      <aside className="summary-column"><Card><div className="section-title compact"><h2>This week</h2><Badge tone="teal">On track</Badge></div><div className="stat-main"><strong>4h 20m</strong><span>focused study time</span></div><div className="mini-stats"><span><strong>7</strong>topics completed</span><span><strong>18</strong>questions practised</span></div></Card><Card><div className="section-title compact"><h2>Saved for revision</h2><button onClick={() => navigate("resources")}>View all</button></div>{[["Formula sheet","Integration essentials"],["Worked example","B+ tree insertion"],["Revision notes","Deadlock conditions"]].map(([type,title]) => <div className="saved-row" key={title}><span><Icon name="file" size={17} /></span><div><strong>{title}</strong><small>{type}</small></div></div>)}</Card></aside></div>
  </div>;
}

function Library({ navigate }: { navigate: (v: View) => void }) {
  const [uploading, setUploading] = useState(false);
  const [empty, setEmpty] = useState(false);
  return <div className="page"><div className="breadcrumbs"><button>My Library</button><Icon name="chevron" size={15} /><span>All materials</span></div><div className="page-head"><div><h1>Study library</h1><p>Organize source materials by subject and topic.</p></div><div className="head-actions"><Button variant="secondary" icon="plus">New folder</Button><Button icon="upload" onClick={() => setUploading(true)}>Upload material</Button></div></div>
    <div className="library-toolbar"><label className="search-box"><Icon name="search" size={18} /><input placeholder="Search files and folders" /></label><div><button className="view-toggle active"><Icon name="dashboard" size={18} /></button><button className="view-toggle"><Icon name="menu" size={18} /></button><button className="demo-toggle" onClick={() => setEmpty(!empty)}>{empty ? "Show files" : "View empty state"}</button></div></div>
    {empty ? <Card className="empty-state"><span><Icon name="folder" size={28} /></span><h2>Your study library is ready</h2><p>Upload lecture notes, a syllabus, textbook chapters, or past papers to begin.</p><Button icon="upload" onClick={() => { setEmpty(false); setUploading(true); }}>Upload your first material</Button><small>PDF and DOCX · Up to 50 MB per file</small></Card> : <>
      {uploading && <Card className="upload-row"><span className="file-icon pdf"><Icon name="file" /></span><div><strong>DBMS_Past_Paper_2023.pdf</strong><span>Uploading · 8.4 MB of 12 MB</span><Progress value={68} /></div><button onClick={() => setUploading(false)}><Icon name="x" size={18} /></button></Card>}
      <div className="library-label"><h2>Folders</h2><span>4 folders</span></div><div className="folder-grid">{[["Engineering Mathematics","Calculus · 8 items"],["Data Structures","Trees · 6 items"],["Database Management","12 items"],["Operating Systems","9 items"]].map(([name,meta]) => <Card className="folder-card" key={name}><span className="folder-icon"><Icon name="folder" /></span><button><Icon name="more" /></button><h3>{name}</h3><p>{meta}</p></Card>)}</div>
      <div className="library-label"><h2>Recent documents</h2><span>Updated today</span></div><Card className="file-table"><div className="file-table-head"><span>Name</span><span>Type</span><span>Uploaded</span><span>Status</span><i /></div>{[
        ["Integration Notes.pdf","PDF","Today","Ready","teal"],
        ["Binary Search Trees.pdf","PDF","Yesterday","Processing","amber"],
        ["DBMS Unit 4.docx","DOCX","12 May","Ready","teal"],
        ["OS Scheduling Notes.pdf","PDF","10 May","Processing failed","red"],
      ].map(([name,type,date,status,tone]) => <div className="file-row" key={name}><span className="file-name"><i className={`file-icon ${type.toLowerCase()}`}><Icon name="file" size={18} /></i><span><strong>{name}</strong>{status === "Processing failed" && <small>Couldn’t read this file. Remove password protection and retry.</small>}</span></span><span>{type}</span><span>{date}</span><span><Badge tone={tone as "teal" | "amber" | "red"}>{status}</Badge></span><button><Icon name="more" /></button></div>)}</Card></>}
    <Card className="context-hint"><Icon name="more" /><div><strong>File actions</strong><p>Use the context menu to rename, move, or delete a document. Deleting always asks for confirmation.</p></div><Button variant="danger">Delete example</Button></Card>
  </div>;
}

const setupSteps = ["Basics", "Starting point", "Study style"];
function ExamSetup({ navigate }: { navigate: (v: View) => void }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Record<string,string>>({ subject: "Database Management Systems", time: "6 hours", materials: "Use my DBMS folder", understanding: "I understand some topics", difficulty: "Challenging", preference: "Explain step by step", goal: "Pass confidently" });
  const choose = (key: string, value: string) => setSelected({ ...selected, [key]: value });
  return <div className="setup-page"><header className="setup-nav"><Brand onClick={() => navigate("dashboard")} /><button onClick={() => navigate("dashboard")}><Icon name="x" /> Save and exit</button></header><main className="setup-shell"><div className="setup-progress"><span>Exam Rescue setup</span><strong>Step {step + 1} of 3</strong><div>{setupSteps.map((s,i) => <span className={i <= step ? "active" : ""} key={s}><i>{i < step ? <Icon name="check" size={13} /> : i + 1}</i>{s}</span>)}</div></div>
    <Card className="setup-card">
      {step === 0 && <><div className="setup-heading"><Badge tone="indigo">THE ESSENTIALS</Badge><h1>What are you preparing for?</h1><p>We’ll use this to size the plan to your actual situation.</p></div><InputField label="Subject or course" placeholder="Database Management Systems" /><div className="field"><span className="field-label">How much preparation time is left?</span><div className="choice-grid">{["3 hours","6 hours","12 hours","Choose exam date"].map(v => <button className={selected.time === v ? "selected" : ""} onClick={() => choose("time",v)} key={v}><Icon name={v.includes("date") ? "calendar" : "clock"} size={18} />{v}</button>)}</div></div><div className="field"><span className="field-label">Available study materials</span><div className="material-choice selected"><span><Icon name="folder" /><span><strong>Use my DBMS folder</strong><small>12 processed materials</small></span></span><Icon name="check" /></div><button className="upload-inline"><Icon name="upload" size={18} />Add different materials</button></div></>}
      {step === 1 && <><div className="setup-heading"><Badge tone="indigo">YOUR STARTING POINT</Badge><h1>How does this subject feel right now?</h1><p>Be honest—this only helps us prioritize.</p></div><div className="field"><span className="field-label">Current understanding</span><div className="stacked-choices">{["Starting from zero","I know the basics","I understand some topics","I need revision","I understand the theory but struggle with problems"].map(v => <button className={selected.understanding === v ? "selected" : ""} onClick={() => choose("understanding",v)} key={v}><span className="radio" />{v}</button>)}</div></div><div className="field"><span className="field-label">Overall difficulty</span><div className="choice-grid three">{["Manageable","Challenging","Very difficult"].map(v => <button className={selected.difficulty === v ? "selected" : ""} onClick={() => choose("difficulty",v)} key={v}>{v}</button>)}</div></div></>}
      {step === 2 && <><div className="setup-heading"><Badge tone="indigo">MAKE IT WORK FOR YOU</Badge><h1>How should Cramly teach you?</h1><p>Choose one primary style. You can change it during a session.</p></div><div className="field"><span className="field-label">Learning preference</span><div className="preference-grid">{["Explain from absolute basics","Use practical examples","Focus on theory","Focus on problem-solving","Explain step by step","Keep it concise and exam-oriented"].map(v => <button className={selected.preference === v ? "selected" : ""} onClick={() => choose("preference",v)} key={v}><Icon name={v.includes("problem") ? "target" : "brain"} size={18} />{v}</button>)}</div></div><div className="field"><span className="field-label">Preparation goal</span><div className="choice-grid three">{["Cover essentials","Pass confidently","Aim for depth"].map(v => <button className={selected.goal === v ? "selected" : ""} onClick={() => choose("goal",v)} key={v}>{v}</button>)}</div></div><div className="plan-summary"><Icon name="spark" /><div><strong>Your plan will use</strong><p>6 hours · 12 materials · step-by-step explanations · a confident-pass goal</p></div></div></>}
      <div className="setup-footer">{step > 0 ? <Button variant="secondary" onClick={() => setStep(step - 1)}>Back</Button> : <span />}<Button onClick={() => step < 2 ? setStep(step + 1) : navigate("plan")} icon={step === 2 ? "spark" : "arrow"}>{step === 2 ? "Generate study plan" : "Continue"}</Button></div>
    </Card><p className="setup-assurance"><Icon name="check" size={15} />You can adjust the plan after it’s generated.</p></main></div>;
}

const planTopics = [
  { title: "Relational model foundations", meta: "Keys, constraints, and relational algebra", time: "45 min", priority: "Essential", reason: "Foundation for 4 later topics and appears throughout your syllabus.", activity: "Learn + quick check", done: true },
  { title: "Normalization", meta: "Functional dependencies, 1NF to BCNF", time: "70 min", priority: "High", reason: "Repeated in 3 uploaded past papers; you marked this subject challenging.", activity: "Worked examples", done: false },
  { title: "Transactions & concurrency", meta: "ACID, serializability, and locking", time: "55 min", priority: "High", reason: "High syllabus weight and low confidence in your setup.", activity: "Learn + 5 questions", done: false },
  { title: "Indexing and B+ trees", meta: "Dense/sparse indexes and insertion", time: "50 min", priority: "Medium", reason: "Found in Unit 4 notes and one past paper.", activity: "Visual explanation", done: false },
  { title: "SQL practice", meta: "Joins, nested queries, and aggregation", time: "60 min", priority: "High", reason: "Your goal prioritizes problem-solving and exam application.", activity: "Practice set", done: false },
];

function StudyPlan({ navigate }: { navigate: (v: View) => void }) {
  const [topics, setTopics] = useState(planTopics);
  const toggle = (idx: number) => setTopics(topics.map((t,i) => i === idx ? { ...t, done: !t.done } : t));
  return <div className="page plan-page"><div className="plan-top"><div><div className="breadcrumbs"><button>Study sessions</button><Icon name="chevron" size={14} /><span>DBMS Exam Rescue</span></div><h1>Database Management Systems</h1><p>Exam Rescue plan · Based on 12 uploaded materials</p></div><div className="countdown"><span><Icon name="clock" size={17} />TIME REMAINING</span><strong>5h 42m</strong><small>Allocated: 5h 40m</small></div></div>
    <Card className="plan-overview"><div><span className="eyebrow">YOUR PLAN</span><h2>One topic complete. Keep the momentum.</h2><p>The next 70 minutes have the highest expected value based on your materials and starting point.</p></div><div className="progress-ring"><svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" /><circle className="ring-value" cx="22" cy="22" r="18" /></svg><strong>18%</strong><span>complete</span></div><div className="overview-action"><span>Next best action</span><strong>Normalization</strong><small>Worked examples · 70 min</small><Button onClick={() => navigate("chat")} icon="arrow">Start learning</Button></div></Card>
    <div className="plan-layout"><section><div className="section-title"><div><h2>Prioritized study plan</h2><p>Timings are suggested allocations and may adjust with progress.</p></div><button>Adjust plan</button></div><div className="topic-list">{topics.map((topic,i) => <Card className={`topic-row ${topic.done ? "completed" : ""} ${i === 1 ? "next" : ""}`} key={topic.title}><button className="topic-checkbox" onClick={() => toggle(i)}>{topic.done && <Icon name="check" size={16} />}</button><span className="topic-index">{String(i + 1).padStart(2,"0")}</span><div className="topic-main"><div><h3>{topic.title}</h3><p>{topic.meta}</p></div><div className="topic-reason"><Icon name="spark" size={15} /><span><strong>Why this priority</strong>{topic.reason}</span></div></div><div className="topic-meta"><Badge tone={topic.priority === "Essential" ? "indigo" : topic.priority === "High" ? "red" : "amber"}>{topic.priority}</Badge><span><Icon name="clock" size={15} />{topic.time}</span><small>{topic.activity}</small></div><button className="row-arrow" onClick={() => navigate(i === 4 ? "practice" : "chat")}><Icon name="chevron" /></button></Card>)}
      <Card className="revision-block"><span className="revision-icon"><Icon name="target" /></span><div><Badge tone="teal">FINAL BLOCK</Badge><h3>Final revision & confidence check</h3><p>Review saved formulas, difficult topics, and missed practice questions.</p></div><span><Icon name="clock" size={16} /> 45 min</span></Card></div></section>
      <aside><Card className="tutor-panel"><span className="feature-icon"><Icon name="brain" /></span><h2>Your contextual tutor</h2><p>Ask questions grounded in the 12 materials selected for this plan.</p><Button onClick={() => navigate("chat")} icon="chat">Open study tutor</Button><button className="prompt-link" onClick={() => navigate("chat")}>“Explain normalization from basics”</button><button className="prompt-link" onClick={() => navigate("chat")}>“Quiz me on functional dependencies”</button></Card><Card className="evidence-card"><h3>Plan evidence</h3><p><Icon name="file" size={16} />Syllabus topics & unit weight</p><p><Icon name="file" size={16} />3 past papers</p><p><Icon name="brain" size={16} />Your confidence & preferences</p><small>Cramly prioritizes from available evidence. It does not predict exact exam questions.</small></Card></aside></div>
  </div>;
}

function StudyChat({ navigate }: { navigate: (v: View) => void }) {
  const [loading, setLoading] = useState(false);
  const [simple, setSimple] = useState(false);
  return <div className="chat-page"><header className="chat-head"><div><button className="back-circle" onClick={() => navigate("plan")}><Icon name="arrow" size={18} /></button><div><strong>DBMS Study Tutor</strong><span>Normalization · Exam Rescue session</span></div></div><div><span className="materials-pill"><Icon name="file" size={16} />3 materials selected</span><Button variant="secondary" onClick={() => navigate("resources")}>Saved notes</Button></div></header>
    <main className="chat-layout"><aside className="chat-context"><span className="eyebrow">CURRENT TOPIC</span><h2>Normalization</h2><Progress value={35} /><small>25 of 70 min</small><div className="context-sources"><strong>Selected sources</strong>{["DBMS Unit 3.pdf","Normalization Notes.pdf","2023 Past Paper.pdf"].map((s,i) => <span key={s}><Icon name="file" size={16} /><span>{s}<small>{i < 2 ? "Source-grounded" : "Question evidence"}</small></span></span>)}</div><div className="grounding-key"><span><i className="grounded" />Source-grounded</span><span><i />General explanation</span></div></aside>
      <section className="conversation"><div className="conversation-inner"><div className="context-banner"><Icon name="spark" size={17} /><span><strong>Studying Normalization</strong>Answers use your selected materials when relevant. Citations open the source page.</span></div><div className="message user-message">I understand functional dependencies, but why do we need 3NF if 2NF already removes partial dependencies?</div><div className="message assistant-message"><span className="assistant-avatar"><Icon name="spark" size={17} /></span><div><span className="answer-label"><i /> GROUNDED IN YOUR MATERIALS</span>{simple ? <><p><strong>Think of a college notice board.</strong> In 2NF, every notice is pinned to the correct course board—but a teacher’s phone number might still be copied onto every student notice.</p><p>3NF gives teacher details their own board. Student records point to the teacher instead of repeating teacher information. This prevents one phone change from requiring many edits.</p></> : <><p><strong>2NF solves only one kind of redundancy:</strong> a non-key attribute depending on part of a composite key.</p><p>But a table can be in 2NF and still have a <em>transitive dependency</em>:</p><div className="formula">StudentID → DeptID → DeptName</div><p>Here, <strong>DeptName</strong> depends on the key through <strong>DeptID</strong>. If the department name changes, every student row must be updated. 3NF removes this by separating department data.</p></>}<div className="citations"><button><Icon name="file" size={14} />DBMS Unit 3 · p. 12</button><button><Icon name="file" size={14} />Normalization Notes · p. 4</button></div><div className="message-actions"><button onClick={() => setSimple(true)}><Icon name="brain" size={16} />I still don’t get it</button><button><Icon name="file" size={16} />Save explanation</button><button onClick={() => setLoading(true)}><Icon name="spark" size={16} />Regenerate</button></div>{simple && <span className="adapted-note"><Icon name="check" size={14} />Explanation adapted to a simpler analogy</span>}</div></div>
        {loading && <div className="message assistant-message loading-message"><span className="assistant-avatar"><Icon name="spark" size={17} /></span><div><i /><i /><i /><span>Reworking the explanation…</span><button onClick={() => setLoading(false)}>Cancel</button></div></div>}
        <div className="suggested"><span>Try asking</span><div><button>Show a 3NF decomposition example</button><button>Quiz me on normal forms</button><button>No source found? Give a general explanation</button></div></div></div>
        <div className="composer"><div className="composer-inner"><textarea placeholder="Ask about normalization…" /><div><span><Icon name="file" size={15} />Using 3 selected sources</span><button className="send-button"><Icon name="arrow" size={18} /></button></div></div><small>Cramly can make mistakes. Verify critical details against your course materials.</small></div>
      </section>
    </main></div>;
}

function Practice({ navigate }: { navigate: (v: View) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [answer, setAnswer] = useState("");
  return <div className="practice-page"><header><Brand onClick={() => navigate("dashboard")} /><button onClick={() => navigate("plan")}><Icon name="x" />Exit practice</button></header><main><div className="practice-top"><div><span className="eyebrow">ACTIVE RECALL · NORMALIZATION</span><h1>Question 3 of 8</h1></div><div className="practice-progress"><span>38% complete</span><Progress value={38} /></div></div><Card className="question-card"><div className="question-meta"><Badge tone="indigo">SHORT ANSWER</Badge><Badge>3NF · Medium</Badge><button><Icon name="target" size={16} />Mark topic as difficult</button></div><h2>Given the relation below, identify the transitive dependency and state whether the relation is in 3NF.</h2><div className="formula question-formula">STUDENT (StudentID, StudentName, DeptID, DeptName)<br /><strong>FDs:</strong> StudentID → StudentName, DeptID &nbsp;·&nbsp; DeptID → DeptName</div><label className="answer-box"><span>Your answer</span><textarea value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Explain your reasoning, not just the final answer…" disabled={submitted} /></label>{submitted && <div className="feedback partial"><div><span><Icon name="target" /></span><div><Badge tone="amber">PARTIALLY CORRECT</Badge><h3>You identified the dependency, but missed the 3NF conclusion.</h3></div></div><p><strong>Correct reasoning:</strong> StudentID → DeptID → DeptName is a transitive dependency. DeptName is non-prime and depends on StudentID through DeptID, so the relation is <strong>not in 3NF</strong>.</p><span className="source-pill"><Icon name="file" size={14} />Normalization Notes.pdf · p. 6</span></div>}<div className="question-actions"><Button variant="tertiary" onClick={() => { setAnswer(""); setSubmitted(false); }}>Skip for now</Button>{submitted ? <><Button variant="secondary" onClick={() => { setAnswer(""); setSubmitted(false); }}>Retry question</Button><Button icon="arrow">Next question</Button></> : <Button onClick={() => setSubmitted(true)} disabled={!answer.trim()}>Submit answer</Button>}</div></Card><p className="practice-note">Answers are evaluated against the concept, not exact wording.</p></main></div>;
}

function Resources() {
  const [selected, setSelected] = useState(2);
  const resources = [
    ["Formula sheet","Calculus integration formulas","Engineering Mathematics","12 May","indigo"],
    ["Revision notes","Normalization in one page","Database Management","Today","teal"],
    ["Worked example","B+ tree insertion walkthrough","Database Management","Today","amber"],
    ["Practice questions","CPU scheduling: 12 questions","Operating Systems","11 May","blue"],
    ["Saved explanation","Why 3NF matters","Database Management","Today","teal"],
    ["Revision notes","AVL rotations quick review","Data Structures","9 May","indigo"],
  ];
  return <div className="page"><div className="page-head"><div><h1>Saved resources</h1><p>Your generated notes, examples, and practice materials.</p></div><Button icon="download">Export selected to PDF</Button></div><div className="resource-toolbar"><label className="search-box"><Icon name="search" size={18} /><input placeholder="Search saved resources" /></label><div className="filter-tabs">{["All","Notes","Formula sheets","Examples","Practice"].map((f,i) => <button className={i === 0 ? "active" : ""} key={f}>{f}</button>)}</div></div><div className="selection-bar"><span><strong>{selected} selected</strong> · Export creates one organized PDF in your chosen order.</span><div><button>Move</button><button>Rename</button><button className="danger-text">Delete</button></div></div><div className="resource-grid">{resources.map(([type,title,subject,date,tone],i) => <Card className="resource-card" key={title}><button className={`select-check ${i < selected ? "checked" : ""}`} onClick={() => setSelected(i < selected ? Math.max(0,selected - 1) : selected + 1)}>{i < selected && <Icon name="check" size={13} />}</button><button className="more-button"><Icon name="more" /></button><span className={`resource-preview ${tone}`}><Icon name={type === "Formula sheet" ? "target" : type === "Practice questions" ? "brain" : "file"} size={26} /><i /><i /><i /></span><Badge tone={tone === "blue" ? "neutral" : tone as "indigo" | "teal" | "amber"}>{type}</Badge><h3>{title}</h3><p>{subject}</p><small>Saved {date}</small></Card>)}</div></div>;
}

function Settings() {
  return <div className="page settings-page"><div className="page-head"><div><h1>Settings</h1><p>Manage your profile, study preferences, and account.</p></div></div><div className="settings-layout"><nav>{["Profile","Study preferences","Appearance","Account & data"].map((s,i) => <button className={i === 0 ? "active" : ""} key={s}>{s}</button>)}</nav><div><Card className="settings-card"><div className="settings-heading"><h2>Profile details</h2><p>This information is used to personalize your workspace.</p></div><div className="profile-editor"><span className="avatar large">AK</span><Button variant="secondary">Change photo</Button></div><div className="form-grid"><InputField label="Full name" placeholder="Arjun Kumar" /><InputField label="College email" placeholder="arjun@college.edu" /><InputField label="College or university" placeholder="National Institute of Technology" /><InputField label="Course" placeholder="B.Tech Computer Science" /></div><div className="settings-footer"><Button>Save changes</Button></div></Card><Card className="settings-card"><div className="settings-heading"><h2>Study preferences</h2><p>Defaults for new Exam Rescue plans.</p></div><div className="preference-row"><span><strong>Explanation style</strong><small>How Cramly should explain new concepts.</small></span><button>Step by step <Icon name="chevron" size={16} /></button></div><div className="preference-row"><span><strong>Theme</strong><small>Dark theme support is planned for a future update.</small></span><button disabled>Light <Badge>Coming later</Badge></button></div></Card><Card className="settings-card danger-zone"><div><h2>Account & data</h2><p>Download a copy of your data or permanently delete your account.</p></div><Button variant="secondary" icon="download">Download my data</Button><Button variant="danger">Delete account</Button></Card></div></div></div>;
}

export default function App() {
  const [view, setView] = useState<View>("landing");
  const navigate = (next: View) => { setView(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  if (view === "landing") return <Landing navigate={navigate} />;
  if (view === "signin" || view === "signup") return <Auth mode={view} navigate={navigate} />;
  if (view === "setup") return <ExamSetup navigate={navigate} />;
  if (view === "practice") return <Practice navigate={navigate} />;
  if (view === "chat") return <StudyChat navigate={navigate} />;
  return <AppShell view={view} navigate={navigate}>
    {view === "dashboard" && <Dashboard navigate={navigate} />}
    {view === "library" && <Library navigate={navigate} />}
    {view === "plan" && <StudyPlan navigate={navigate} />}
    {view === "resources" && <Resources />}
    {view === "settings" && <Settings />}
  </AppShell>;
}
