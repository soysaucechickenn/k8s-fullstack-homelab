
import { useEffect, useState } from "react";
import {
  Activity, ArrowUpRight, Box, Boxes, Check,
  ChevronDown, CircleHelp, Cloud, Command,
  Cpu, Database, GitBranch, HardDrive,
  LayoutDashboard, Menu, Network, Plus,
  RefreshCw, Search, Server, Settings2,
  ShieldCheck, Terminal, X
} from "lucide-react";
import "./App.css";

const initialWorkloads = [
  { name: "frontend", image: "orbit/frontend:1.0", replicas: "2 / 2", status: "Running", type: "Frontend" },
  { name: "backend-api", image: "orbit/api:1.0", replicas: "2 / 2", status: "Running", type: "Backend" },
  { name: "postgres", image: "postgres:16", replicas: "1 / 1", status: "Running", type: "Database" },
];

const menu = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Workloads", icon: Boxes },
  { label: "Networking", icon: Network },
  { label: "Storage", icon: HardDrive },
  { label: "Activity", icon: Activity },
  { label: "Settings", icon: Settings2 }
];

function App() {
  const [page, setPage] = useState("Overview");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [updated, setUpdated] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
  loadTasks();
}, []);

async function loadTasks() {
  try {
    const response = await fetch("/api/tasks");
    if (!response.ok) throw new Error("Failed to load tasks");

    const data = await response.json();
    setTasks(data);
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

async function createTask() {
  if (!newTask.trim()) return;

  try {
    const response = await fetch(
      `/api/tasks?name=${encodeURIComponent(newTask.trim())}`,
      { method: "POST" }
    );

    if (!response.ok) throw new Error("Failed to create task");

    setNewTask("");
    await loadTasks();
  } catch (error) {
    console.error("Error creating task:", error);
  }
}
  const [newTask, setNewTask] = useState("");

  const workloads = initialWorkloads.filter(w =>
    `${w.name} ${w.type} ${w.image}`.toLowerCase().includes(search.toLowerCase())
  );

  function refresh() {
    setRefreshing(true);
    setUpdated(new Date());
    setTimeout(() => setRefreshing(false), 650);
  }

  return (
    <div className="shell">
      <aside className={`sidebar ${mobileMenu ? "open" : ""}`}>
        <div className="logo">
          <div className="logo-mark">
            <span className="logo-orbit" />
            <span className="logo-core" />
          </div>
          <span>orbit<span className="logo-period">.</span></span>
          <button className="close-menu" onClick={() => setMobileMenu(false)}><X size={19}/></button>
        </div>

        <div className="workspace-switch">
          <div className="workspace-avatar">S</div>
          <div className="workspace-text">
            <strong>Personal Workspace</strong>
            <small>Development</small>
          </div>
          <ChevronDown size={15} color="#98a0ac" />
        </div>

        <div className="sidebar-label">WORKSPACE</div>
        <nav className="navigation">
          {menu.map(({label, icon: Icon}) => (
            <button
              key={label}
              className={`nav-link ${page === label ? "active" : ""}`}
              onClick={() => {setPage(label);setMobileMenu(false);}}
            >
              <Icon size={18} strokeWidth={1.8}/>
              <span>{label}</span>
              {page === label && <span className="active-indicator"/>}
            </button>
          ))}
        </nav>

        <div className="sidebar-spacer"/>
        <div className="sidebar-note">
          <div className="note-icon"><Terminal size={17}/></div>
          <strong>Build. Break. Learn.</strong>
          <p>Your infrastructure playground, built for experimentation.</p>
        </div>
        <div className="sidebar-footer">
          <CircleHelp size={17}/>
          <span>Orbit Lab · v0.1</span>
        </div>
      </aside>

      {mobileMenu && <div className="scrim" onClick={() => setMobileMenu(false)}/>}

      <main className="main">
        <header className="topbar">
          <div className="breadcrumbs">
            <button className="mobile-toggle" onClick={() => setMobileMenu(true)}><Menu size={21}/></button>
            <span>Workspace</span>
            <span className="breadcrumb-slash">/</span>
            <strong>{page}</strong>
          </div>
          <div className="top-actions">
            <span className="demo-pill"><span className="green-dot"/> Demo Environment</span>
            <div className="user-avatar">S</div>
          </div>
        </header>

        <div className="content">
          <div className="intro">
            <div>
              <div className="overline">YOUR INFRASTRUCTURE, SIMPLIFIED</div>
              <h1>{page === "Overview" ? "Good morning." : page}</h1>
              <p>
                {page === "Overview"
                  ? "Here's what's happening across your environment."
                  : `Explore your ${page.toLowerCase()} environment.`}
              </p>
            </div>
            <button className="refresh-btn" onClick={refresh}>
              <RefreshCw size={16} className={refreshing ? "spin" : ""}/>
              Refresh
            </button>
          </div>

          <div className="demo-notice">
            <ShieldCheck size={17}/>
            <span>Preview mode. All infrastructure metrics below are sample data.</span>
          </div>

          <section className="cluster-card">
            <div className="cluster-info">
              <div className="cluster-eyebrow">
                <span className="green-dot"/>
                DEMO CLUSTER
              </div>
              <h2>minikube-local</h2>
              <p>Your development cluster at a glance.</p>
              <div className="cluster-meta">
                <span><Cloud size={14}/> Kubernetes</span>
                <span><Server size={14}/> 3 nodes</span>
                <span><GitBranch size={14}/> Local</span>
              </div>
            </div>
            <div className="topology">
              <svg viewBox="0 0 300 185" role="img" aria-label="Illustrative cluster topology">
                <defs>
                  <linearGradient id="nodeFill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fff"/>
                    <stop offset="100%" stopColor="#eef2ff"/>
                  </linearGradient>
                </defs>
                <path d="M150 50 L65 133 M150 50 L150 145 M150 50 L235 133"
                  stroke="#aab8e8" strokeWidth="1.8" strokeDasharray="5 5" fill="none"/>
                <circle cx="150" cy="50" r="30" fill="url(#nodeFill)" stroke="#d7dff6"/>
                <circle cx="150" cy="50" r="18" fill="#4e65cf"/>
                <g stroke="white" strokeWidth="2" fill="none">
                  <rect x="142" y="43" width="16" height="14" rx="3"/>
                  <path d="M146 47h8M146 52h8"/>
                </g>
                {[[65,133],[150,145],[235,133]].map(([x,y],i)=>(
                  <g key={i}>
                    <circle cx={x} cy={y} r="24" fill="white" stroke="#dce3f3"/>
                    <rect x={x-9} y={y-9} width="18" height="18" rx="4" fill="#e9efff" stroke="#b5c5ee"/>
                    <circle cx={x+5} cy={y+5} r="3" fill="#42b883"/>
                  </g>
                ))}
              </svg>
              <span className="topology-label">CLUSTER TOPOLOGY · ILLUSTRATION</span>
            </div>
          </section>

          <div className="section-heading">
            <div><h3>At a glance</h3><p>A quick look at your environment</p></div>
            <span className="muted-caption">Demo data</span>
          </div>

          <div className="metrics">
            <Metric icon={Server} label="Nodes" value="03" foot="All nodes ready" tone="blue"/>
            <Metric icon={Box} label="Running pods" value="12" foot="12 of 12 healthy" tone="green"/>
            <Metric icon={Cpu} label="CPU usage" value="24%" foot="Across all nodes" tone="violet"/>
            <Metric icon={Database} label="Memory" value="41%" foot="Across all nodes" tone="orange"/>
          </div>

          <div className="section-heading workloads-title">
            <div><h3>Workloads</h3><p>Applications in your environment</p></div>
            <span className="view-link" onClick={() => setPage("Workloads")}>
              View all <ArrowUpRight size={15}/>
            </span>
          </div>

          <section className="workloads-card">
            <div className="table-tools">
              <div className="search-box">
                <Search size={17}/>
                <input
                  placeholder="Search workloads..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <span className="count-label">{workloads.length} workloads</span>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>APPLICATION</th><th>IMAGE</th><th>REPLICAS</th><th>STATUS</th></tr>
                </thead>
                <tbody>
                  {workloads.map((w,i)=>(
                    <tr key={w.name}>
                      <td>
                        <div className="app-name">
                          <div className={`app-icon app-icon-${i % 3}`}>
                            {w.type === "Database" ? <Database size={18}/> : <Box size={18}/>}
                          </div>
                          <div><strong>{w.name}</strong><small>{w.type}</small></div>
                        </div>
                      </td>
                      <td className="image-name">{w.image}</td>
                      <td className="replica-count">{w.replicas}</td>
                      <td><span className="running-pill"><Check size={13}/> {w.status}</span></td>
                    </tr>
                  ))}
                  {workloads.length === 0 && (
                    <tr><td colSpan="4" className="empty">No matching workloads.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
<section className="workloads-card" style={{ padding: "24px", marginTop: "24px" }}>
  <h3>Orbit Tasks</h3>
  <p>Tasks stored in PostgreSQL</p>

  <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
    <input
      value={newTask}
      onChange={(e) => setNewTask(e.target.value)}
      placeholder="Enter a task..."
      style={{ padding: "10px", flex: 1 }}
    />

    <button onClick={createTask}>
      <Plus size={16} /> Add Task
    </button>
  </div>

  <div style={{ marginTop: "20px" }}>
    {tasks.map((task) => (
      <div key={task.id} style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
        {task.name}
      </div>
    ))}
  </div>
</section>
          <footer className="footer">
            <span><span className="green-dot"/> Preview environment</span>
            <span>Refreshed at {updated.toLocaleTimeString()}</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

function Metric({icon:Icon,label,value,foot,tone}) {
  return (
    <div className="metric">
      <div className={`metric-icon ${tone}`}><Icon size={19}/></div>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-foot"><Check size={13}/>{foot}</div>
    </div>
  );
}

export default App;
