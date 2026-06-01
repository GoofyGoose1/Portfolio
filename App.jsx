import { useEffect, useRef, useState } from "react";
import {
  FaCss3Alt,
  FaFacebookF,
  FaGithub,
  FaHtml5,
  FaInstagram,
  FaJs,
  FaLinkedin,
  FaReact,
} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import {
  SiMongodb,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import {
  Blocks,
  Bot,
  ChevronRight,
  Command,
  ExternalLink,
  Files,
  GitBranch,
  Mail,
  Play,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";

const FILES = {
  home: { name: "home.tsx", lang: "TypeScript React", icon: <FaReact className="text-cyan-400" /> },
  about: { name: "about.html", lang: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
  projects: { name: "projects.js", lang: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
  skills: { name: "skills.json", lang: "JSON", icon: <span className="text-lime-400">{"{}"}</span> },
  contact: { name: "contact.css", lang: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
  readme: { name: "README.md", lang: "Markdown", icon: <span className="text-sky-300">MD</span> },
  resume: { name: "resume.pdf", lang: "PDF", icon: <span className="text-red-500">PDF</span> },
};

const PROJECTS = [
  {
    title: "StepUp",
    label: "PRODUCT DESIGN · E-COMMERCE",
    desc: "A futuristic footwear experience focused on premium presentation, product storytelling, and clean interaction design.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://stepupweb.netlify.app",
  },
  {
    title: "WebDesigner",
    label: "BUILDER TOOL · VISUAL WORKFLOW",
    desc: "A website-building experience that simplifies visual creation through a beginner-friendly interface.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://webdesigner-design.netlify.app/",
  },
  {
    title: "FinWise",
    label: "FINANCE PRODUCT · DASHBOARD",
    desc: "A finance-oriented product concept built around clean dashboards, readability, and calm UI.",
    tags: ["HTML", "CSS", "TypeScript"],
    link: "https://finawise.lovable.app/",
  },
  {
    title: "Studzy",
    label: "LEARNING PLATFORM · COMING SOON",
    desc: "A collaborative learning platform concept for students and developers.",
    tags: ["React", "Tailwind CSS", "JavaScript"],
    link: "",
  },
  {
    title: "Never Again",
    label: "HABIT TRACKER · REFLECTION TOOL",
    desc: "An anti-bucket-list app for recording mistakes, regrets, and personal reminders of what not to repeat.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://neveragain.lovable.app",
  },
  {
    title: "Worth My Day?",
    label: "FINANCE CALCULATOR · MINDFUL SPENDING",
    desc: "A calculator that shows how many work hours or days an item really costs based on your income.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://worthmyday.lovable.app",
  },
];

const SKILL_GROUPS = [
  { title: "Languages", items: [["JavaScript", 86, "bg-yellow-400"], ["Python", 78, "bg-blue-400"], ["C#", 65, "bg-purple-400"], ["SQL", 72, "bg-cyan-400"]] },
  { title: "Frontend", items: [["React", 88, "bg-cyan-400"], ["Tailwind CSS", 90, "bg-sky-400"], ["CSS", 84, "bg-blue-500"], ["Responsive UI", 86, "bg-emerald-400"]] },
  { title: "Backend & Tools", items: [["Node.js", 76, "bg-green-400"], ["MongoDB", 72, "bg-emerald-500"], ["Socket.io", 68, "bg-zinc-300"], ["GitHub", 84, "bg-white"]] },
];

const TECH_ICONS = {
  HTML: <FaHtml5 className="text-orange-500" />,
  CSS: <FaCss3Alt className="text-blue-500" />,
  JavaScript: <FaJs className="text-yellow-400" />,
  TypeScript: <SiTypescript className="text-blue-500" />,
  React: <FaReact className="text-cyan-400" />,
  "Tailwind CSS": <SiTailwindcss className="text-sky-400" />,
  MongoDB: <SiMongodb className="text-green-500" />,
  Vite: <SiVite className="text-purple-400" />,
};

function BootScreen() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(timer);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-[#0f0f0f]">
      <div>
        <div className="mb-8 text-6xl font-black tracking-[-0.08em] text-[#4ec9b0]">&gt;_ daniel.edri</div>
        {["loading workspace...", "mounting files...", "starting portfolio..."].map((line, i) => (
          <div key={line} className="boot-line font-mono text-lg text-[#6a9955]" style={{ animationDelay: `${i * 180}ms` }}>
            &gt; {line}
          </div>
        ))}
      </div>
    </div>
  );
}

function useCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    let id;
    const loop = () => {
      setRing((r) => ({ x: r.x + (pos.x - r.x) * 0.12, y: r.y + (pos.y - r.y) * 0.12 }));
      id = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(id);
  }, [pos]);

  return { pos, ring };
}

function TitleBar({ setTerminalOpen, setPaletteOpen, setSidebarOpen, setAssistantOpen }) {
  const [menuOpen, setMenuOpen] = useState(null);
  return (
    <div className="flex h-11 shrink-0 items-center border-b border-[#111] bg-[#2b2b2b] text-sm text-zinc-300">
      <button onClick={() => setSidebarOpen((v) => !v)} className="flex h-full w-11 items-center justify-center text-zinc-300 hover:bg-[#3a3a3a] md:hidden">
        ☰
      </button>
      <div className="hidden w-20 items-center justify-center gap-2 md:flex">
        <span className="h-3.5 w-3.5 rounded-full bg-[#ff5f57]" />
        <span className="h-3.5 w-3.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-3.5 w-3.5 rounded-full bg-[#28c940]" />
      </div>

      <div className="hidden h-full items-center md:flex">
        {["File", "Edit", "View", "Go", "Run", "Terminal", "Help", "Copilot"].map((item) => (
          <div key={item} className="relative h-full">
            <button
              onClick={() => {
                if (item === "Terminal") setMenuOpen(menuOpen === item ? null : item);
                else if (item === "Go") setPaletteOpen(true);
              }}
              className={`h-full px-3 hover:bg-[#3a3a3a] ${menuOpen === item ? "bg-[#3a3a3a]" : ""}`}
            >
              {item}
            </button>
            {menuOpen === item && (
              <div className="absolute left-0 top-full z-50 w-64 rounded-b-md border border-[#444] bg-[#2d2d2d] py-2 shadow-2xl">
                <button onClick={() => setTerminalOpen(true)} className="flex w-full justify-between px-5 py-3 text-left hover:bg-[#3a3a3a]">
                  New Terminal <span className="text-zinc-500">Ctrl+`</span>
                </button>
                <button onClick={() => setTerminalOpen((v) => !v)} className="flex w-full justify-between px-5 py-3 text-left hover:bg-[#3a3a3a]">
                  Toggle Terminal <span className="text-zinc-500">Ctrl+`</span>
                </button>
                <button onClick={() => setTerminalOpen(false)} className="w-full px-5 py-3 text-left hover:bg-[#3a3a3a]">Clear Terminal</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => setPaletteOpen(true)}
        className="mx-auto flex w-[min(380px,52vw)] items-center justify-center gap-2 rounded-md border border-[#45405c] bg-[#25243a] px-3 py-1 text-xs text-zinc-400 md:px-4"
      >
        <Search size={14} />
        <span className="hidden sm:inline">daniel-edri : portfolio</span>
        <span className="sm:hidden">search files</span>
        <kbd className="hidden rounded bg-white/10 px-1 sm:inline">Ctrl</kbd><kbd className="hidden rounded bg-white/10 px-1 sm:inline">P</kbd>
      </button>
      <button onClick={() => setAssistantOpen((v) => !v)} className="flex h-full w-11 items-center justify-center text-purple-300 hover:bg-[#3a3a3a] md:hidden">
        ✦
      </button>
    </div>
  );
}

function ActivityBar({ activeView, setActiveView, setSidebarOpen, setAssistantOpen }) {
  const items = [
    ["explorer", Files, "Explorer"],
    ["search", Search, "Search"],
    ["git", GitBranch, "Source Control"],
    ["run", Play, "Run"],
    ["extensions", Blocks, "Extensions"],
    ["assistant", Sparkles, "Assistant"],
  ];

  return (
    <aside className="hidden w-14 shrink-0 flex-col items-center border-r border-[#151515] bg-[#303030] py-3 md:flex">
      {items.map(([id, Icon, label]) => (
        <button
          key={id}
          title={label}
          onClick={() => {
            if (id === "assistant") setAssistantOpen((v) => !v);
            else {
              setActiveView(id);
              setSidebarOpen(true);
            }
          }}
          className={`mb-3 flex h-10 w-10 items-center justify-center border-l-2 text-zinc-400 hover:text-white ${
            activeView === id ? "border-[#4ec9b0] text-white" : "border-transparent"
          }`}
        >
          <Icon size={23} />
        </button>
      ))}
      <button className="mt-auto text-zinc-400 hover:text-white"><Settings size={23} /></button>
    </aside>
  );
}

function Sidebar({ open, activeView, openFile, activeFile, setSidebarOpen }) {
  if (!open) return null;
  return (
    <aside className="absolute inset-y-0 left-0 z-3000 w-[min(82vw,280px)] shrink-0 border-r border-[#151515] bg-[#252526] text-sm text-zinc-400 shadow-2xl md:relative md:z-auto md:w-65 md:shadow-none">
      <div className="flex h-11 items-center justify-between px-4 text-xs font-bold uppercase tracking-widest text-zinc-300">
        {activeView === "explorer" ? "Portfolio" : activeView}
        <button onClick={() => setSidebarOpen(false)} className="text-zinc-500 hover:text-white"><FaXmark /></button>
      </div>

      {activeView === "explorer" ? (
        <div>
          {Object.entries(FILES).map(([id, file]) => (
            <button
              key={id}
              onClick={() => openFile(id)}
              className={`flex w-full items-center gap-3 px-5 py-2 text-left hover:bg-[#333] ${
                activeFile === id ? "bg-[#37373d] text-white" : ""
              }`}
            >
              <span className="w-5">{file.icon}</span>
              <span>{file.name}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="px-4 py-3 leading-8">
          <p className="text-zinc-500">This panel is interactive.</p>
          <p>Use Explorer to open files.</p>
          <p>Use Terminal menu above.</p>
          <p>Use sparkle icon for assistant.</p>
        </div>
      )}

      <div className="absolute bottom-12 left-4 w-57.5 rounded-md border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-xs text-purple-300">
        <Sparkles size={14} className="mr-2 inline" /> Daniel&apos;s Copilot
      </div>
    </aside>
  );
}

function Tabs({ tabs, activeFile, setActiveFile, closeTab, modifiedFiles }) {
  return (
    <div className="flex h-10 shrink-0 overflow-x-auto border-b border-[#151515] bg-[#252525]">
      {tabs.map((id) => (
        <button
          key={id}
          onClick={() => setActiveFile(id)}
          className={`group flex min-w-33 items-center gap-2 border-r border-[#181818] px-3 text-xs sm:min-w-36 sm:px-4 sm:text-sm ${
            activeFile === id ? "bg-[#1e1e1e] text-white" : "text-zinc-500 hover:bg-[#2e2e2e]"
          }`}
        >
          {FILES[id].icon}
          <span>{FILES[id].name}</span>
          {modifiedFiles?.[id] && <span className="text-white" title="Unsaved changes">●</span>}
          {id === "home" && <span className="ml-auto text-[10px] text-[#4ec9b0]" title="Pinned tab"></span>}
          {id !== "home" && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                closeTab(id);
              }}
              className="ml-auto rounded p-1 opacity-0 hover:bg-white/10 group-hover:opacity-100"
              title="Close file"
            >
              <FaXmark />
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

function Breadcrumb({ activeFile }) {
  return (
    <div className="flex h-8 shrink-0 items-center gap-2 border-b border-[#2d2d2d] bg-[#1e1e1e] px-4 text-xs text-zinc-500">
      <span>daniel-edri</span>
      <ChevronRight size={14} />
      <span>src</span>
      <ChevronRight size={14} />
      <span className="text-zinc-300">{FILES[activeFile]?.name}</span>
    </div>
  );
}

function Home({ openFile, markModified }) {
  return (
    <div onClick={() => markModified?.("home")} className="max-w-5xl px-5 py-8 sm:px-8 md:px-10 md:py-12">
      <p className="mb-5 font-mono text-sm text-[#4ec9b0] sm:text-base md:text-lg">// hello world !! Welcome to my portfolio</p>
      <h1 className="text-5xl font-black leading-[0.9] tracking-[-0.08em] text-white sm:text-7xl md:text-8xl">
        Daniel<br />
        <span className="text-pink-400">Edri</span>
      </h1>

      <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs">
        {["Software Engineering Student", "Frontend Developer", "React", "Open to Work"].map((tag) => (
          <span key={tag} className="rounded border border-[#454545] px-4 py-2">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#4ec9b0]" />
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-8 max-w-3xl font-mono text-sm leading-7 text-zinc-500 sm:text-base md:mt-10 md:text-lg md:leading-9">
        I build clean digital products with structured design, thoughtful interaction, and practical full-stack execution.
        I care about <span className="font-bold text-sky-400">frontend development</span>,{" "}
        <span className="font-bold text-sky-400">design systems</span>, and interfaces that feel polished.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <button onClick={() => openFile("projects")} className="flex-1 bg-[#007acc] px-5 py-3 font-mono text-sm font-bold text-white hover:bg-[#0098ff] sm:flex-none sm:px-6">
          📁 Projects
        </button>
        <button onClick={() => openFile("about")} className="flex-1 border border-zinc-500 px-5 py-3 font-mono text-sm font-bold hover:border-white sm:flex-none sm:px-6">
          👤 About Me
        </button>
        <button onClick={() => openFile("contact")} className="flex-1 border border-zinc-500 px-5 py-3 font-mono text-sm font-bold hover:border-white sm:flex-none sm:px-6">
          ✉ Contact
        </button>
        <button onClick={() => openFile("resume")} className="flex-1 border border-zinc-500 px-5 py-3 font-mono text-sm font-bold hover:border-white sm:flex-none sm:px-6">
          📄 Resume
        </button>
      </div>

      <div className="mt-10 grid grid-cols-2 rounded border border-[#3c3c3c] md:mt-14 md:grid-cols-4">
        {[["2+", "years learning"], ["6", "core projects"], ["∞", "curiosity"], ["↑", "always improving"]].map(([big, small]) => (
          <div key={small} className="border-[#2a2a2a] px-4 py-6 text-center md:border-r md:px-8 md:py-7">
            <div className="text-3xl font-black text-white">{big}</div>
            <div className="mt-3 font-mono text-xs uppercase tracking-widest text-zinc-500">{small}</div>
          </div>
        ))}
      </div>

      <SocialRow />
    </div>
  );
}

function About({ markModified }) {
  return (
    <div onClick={() => markModified?.("about")} className="max-w-5xl px-5 py-8 sm:px-8 md:px-10 md:py-10">
      <h1 className="text-4xl font-black tracking-[-0.06em] text-white sm:text-5xl md:text-6xl">About Me</h1>
      <p className="mt-4 font-mono text-lg text-zinc-500">// who I am · what I do · where I build</p>
      <div className="mt-10 rounded border border-[#3c3c3c] bg-[#242424] p-8 font-mono leading-8 text-zinc-400">
        Hi! I&apos;m <span className="font-bold text-sky-400">Daniel Edri</span>, a Software Engineering student based in Israel.
        I&apos;m focused on <span className="font-bold text-sky-400">front-end development</span>,{" "}
        <span className="font-bold text-sky-400">design systems</span>, and building digital experiences that feel refined and intentional.
      </div>
      <section className="mt-8 rounded border border-[#3c3c3c] bg-[#242424] p-8">
        <h2 className="font-mono text-2xl uppercase tracking-[0.35em] text-[#4ec9b0]">Current Focus</h2>
        <div className="mt-6 grid gap-5 font-mono text-zinc-400 md:grid-cols-2">
          <p>⚒ Building full-stack web applications</p>
          <p>🧠 Learning C# and React deeply</p>
          <p>🧩 Backend systems, APIs, and database design</p>
          <p>✨ Clean UI, polish, and thoughtful interaction</p>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="mb-5 font-mono text-2xl uppercase tracking-[0.35em] text-[#4ec9b0]">Education</h2>
        <div className="rounded border border-[#3c3c3c] bg-[#242424] p-7">
          <div className="flex justify-between gap-4">
            <h3 className="font-mono text-xl font-bold text-white">Practical Software Engineering</h3>
            <span className="font-mono text-zinc-400">2024 - Present</span>
          </div>
          <p className="mt-2 font-mono text-zinc-500">Technological College Ruppin</p>
        </div>
      </section>
    </div>
  );
}

function Projects({ notify, markModified }) {
  return (
    <div onClick={() => markModified?.("projects")} className="px-5 py-8 sm:px-8 md:px-10 md:py-10">
      <h1 className="text-4xl font-black tracking-[-0.06em] text-white sm:text-5xl md:text-6xl">Projects</h1>
      <p className="mt-4 font-mono text-lg text-zinc-500">const projects = [ ...shipped, ...building ]</p>
      <div className="mt-8 grid max-w-6xl gap-4 md:gap-6 lg:grid-cols-2">
        {PROJECTS.map((project, index) => {
          const content = (
            <>
              <div className="mb-7 flex items-start justify-between">
                <div className="text-3xl">{index % 2 === 0 ? "⚡" : "🛡️"}</div>
                <span className="rounded border border-[#444] px-3 py-1 font-mono text-xs text-zinc-500">
                  {project.link ? "Live ↗" : "Soon"}
                </span>
              </div>
              <p className="font-mono text-sm uppercase tracking-[0.35em] text-pink-400">{project.label}</p>
              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-white md:text-3xl">{project.title}</h2>
              <p className="mt-4 font-mono text-sm leading-7 text-zinc-500 md:mt-5 md:text-base">{project.desc}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} title={tag} className="flex items-center gap-2 rounded border border-[#3c3c3c] bg-[#303030] px-3 py-2 font-mono text-xs text-zinc-300">
                    <span className="text-base">{TECH_ICONS[tag]}</span>
                    {tag}
                  </span>
                ))}
              </div>
            </>
          );
          if (!project.link) {
            return <button key={project.title} onClick={() => notify("Studzy live link coming soon")} className="min-h-64 rounded border border-[#3c3c3c] bg-[#242424] p-5 text-left transition hover:-translate-y-1 hover:border-[#4ec9b0] md:min-h-80 md:p-8">{content}</button>;
          }
          return <a key={project.title} href={project.link} target="_blank" rel="noreferrer" className="min-h-64 rounded border border-[#3c3c3c] bg-[#242424] p-5 text-left transition hover:-translate-y-1 hover:border-[#4ec9b0] md:min-h-80 md:p-8">{content}</a>;
        })}
      </div>
    </div>
  );
}

function Skills({ markModified }) {
  return (
    <div onClick={() => markModified?.("skills")} className="px-5 py-8 sm:px-8 md:px-10 md:py-10">
      <h1 className="text-4xl font-black tracking-[-0.06em] text-white sm:text-5xl md:text-6xl">Skills</h1>
      <p className="mt-4 font-mono text-lg text-zinc-500">{'{ "status": "always_learning", "passion": "immeasurable" }'}</p>
      <div className="mt-10 grid max-w-6xl gap-10 lg:grid-cols-2">
        {SKILL_GROUPS.map((group) => (
          <section key={group.title}>
            <h2 className="mb-5 border-b border-[#3c3c3c] pb-4 font-mono text-2xl uppercase tracking-[0.35em] text-yellow-100">{group.title}</h2>
            <div className="space-y-5">
              {group.items.map(([name, value, color]) => (
                <div key={name} className="grid grid-cols-[105px_1fr_45px] items-center gap-3 font-mono text-sm text-zinc-500 sm:grid-cols-[150px_1fr_55px] sm:gap-4 sm:text-base">
                  <span>{name}</span>
                  <div className="h-1 bg-[#333]"><div className={`h-full ${color}`} style={{ width: `${value}%` }} /></div>
                  <span className="text-[#4ec9b0]">{value}%</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function Contact({ notify, markModified }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function send(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      notify("Please fill name, email, and message");
      return;
    }
    window.location.href = `mailto:edridaniel2002@gmail.com?subject=${encodeURIComponent(form.subject || "Portfolio message")}&body=${encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`)}`;
  }

  const socials = [
    ["Email", "edridaniel2002@gmail.com", "mailto:edridaniel2002@gmail.com", <Mail size={18} className="text-[#4ec9b0]" />],
    ["LinkedIn", "linkedin.com/in/danieledri-", "https://www.linkedin.com/in/danieledri-", <FaLinkedin className="text-blue-500" />],
    ["GitHub", "github.com/GoofyGoose1", "https://github.com/GoofyGoose1", <FaGithub />],
    ["Instagram", "instagram.com/imdanny.xo", "https://www.instagram.com/imdanny.xo", <FaInstagram className="text-pink-500" />],
    ["Facebook", "facebook.com/daniel.edri.182", "https://www.facebook.com/daniel.edri.182", <FaFacebookF className="text-blue-500" />],
  ];

  return (
    <div onClick={() => markModified?.("contact")} className="px-5 py-8 sm:px-8 md:px-10 md:py-10">
      <p className="font-mono text-lg italic text-[#6a9955]">/* contact.css — let&apos;s build something */</p>
      <h1 className="mt-4 text-4xl font-black tracking-[-0.06em] text-white sm:text-5xl md:text-6xl">Contact</h1>
      <p className="mt-4 font-mono text-lg text-zinc-500">// open to work, collabs & good conversations</p>
      <div className="mt-8 grid max-w-6xl gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-6 font-mono text-2xl uppercase tracking-[0.35em] text-[#4ec9b0]">Find me on</h2>
          <div className="space-y-3">
            {socials.map(([name, value, href, icon]) => (
              <a key={name} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-3 rounded border border-[#3c3c3c] bg-[#242424] p-3 hover:border-[#4ec9b0] sm:gap-4 sm:p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded border border-[#444] bg-[#303030] text-lg">{icon}</span>
                <span>
                  <span className="block font-mono text-sm font-bold uppercase tracking-widest text-zinc-300">{name}</span>
                  <span className="font-mono text-zinc-400">{value}</span>
                </span>
                <ExternalLink size={14} className="ml-auto text-zinc-600" />
              </a>
            ))}
          </div>
        </section>

        <form onSubmit={send}>
          <h2 className="mb-6 font-mono text-2xl uppercase tracking-[0.35em] text-[#4ec9b0]">Send a message</h2>
          {[["name", "YOUR_NAME *"], ["email", "YOUR_EMAIL *"], ["subject", "SUBJECT"]].map(([key, label]) => (
            <label key={key} className="mb-4 block font-mono text-zinc-500">
              // {label}
              <input value={form[key]} onChange={(e) => {
                  setForm({ ...form, [key]: e.target.value });
                  markModified?.("contact");
                }} placeholder="string" className="mt-2 w-full border border-[#3c3c3c] bg-[#242424] px-4 py-3 text-zinc-300 outline-none focus:border-[#4ec9b0]" />
            </label>
          ))}
          <label className="mb-4 block font-mono text-zinc-500">
            // MESSAGE *
            <textarea value={form.message} onChange={(e) => {
                setForm({ ...form, message: e.target.value });
                markModified?.("contact");
              }} placeholder={'"""your message"""'} rows={5} className="mt-2 w-full resize-none border border-[#3c3c3c] bg-[#242424] px-4 py-3 text-zinc-300 outline-none focus:border-[#4ec9b0]" />
          </label>
          <button className="w-full bg-[#007acc] px-5 py-4 font-mono font-bold text-white hover:bg-[#0098ff]">→ send_message()</button>
        </form>
      </div>
    </div>
  );
}

function Readme({ markModified }) {
  return (
    <div onClick={() => markModified?.("readme")} className="max-w-4xl px-5 py-8 sm:px-8 md:px-10 md:py-12">
      <h1 className="text-4xl font-black tracking-[-0.06em] text-white sm:text-5xl md:text-6xl">Daniel Edri</h1>
      <hr className="my-6 border-[#3c3c3c]" />
      <p className="font-mono text-lg text-zinc-500">Software Engineering Student · Israel 🇮🇱</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {["React", "Tailwind CSS", "JavaScript", "Python", "Node.js"].map((tag) => <span key={tag} className="rounded border border-[#3c3c3c] bg-[#303030] px-3 py-1 font-mono text-sm text-[#ce9178]">{tag}</span>)}
      </div>
      <h2 className="mt-10 text-3xl font-black text-white">💜 About</h2>
      <p className="mt-4 font-mono leading-8 text-zinc-500">I build digital experiences with clean architecture, thoughtful interaction, and premium UI direction.</p>
      <h2 className="mt-10 text-3xl font-black text-white">Stack</h2>
      <p className="mt-4 font-mono leading-8 text-zinc-500">Languages: JavaScript, Python, C#, SQL<br />Frontend: React, Tailwind, CSS<br />Tools: GitHub, MongoDB, Socket.io, Vite</p>
    </div>
  );
}

function Resume() {
  return (
    <div className="h-full p-6">
      <div className="mb-4 flex items-center gap-3">
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="rounded bg-[#007acc] px-4 py-2 font-mono text-sm text-white">Open PDF preview</a>
        <a href="/resume.pdf" download className="rounded border border-[#3c3c3c] px-4 py-2 font-mono text-sm text-zinc-300">Download</a>
      </div>
      <iframe title="Resume PDF" src="/resume.pdf" className="h-[calc(100%-56px)] w-full rounded border border-[#3c3c3c] bg-white" />
    </div>
  );
}

function SocialRow() {
  const links = [
    ["GitHub", "https://github.com/GoofyGoose1", <FaGithub />],
    ["LinkedIn", "https://www.linkedin.com/in/danieledri-", <FaLinkedin className="text-blue-500" />],
    ["Instagram", "https://www.instagram.com/imdanny.xo", <FaInstagram className="text-pink-500" />],
    ["Email", "mailto:edridaniel2002@gmail.com", <Mail size={15} className="text-[#4ec9b0]" />],
  ];
  return <div className="mt-8 flex flex-wrap gap-3">{links.map(([label, href, icon]) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-2 rounded border border-[#3c3c3c] px-4 py-2 font-mono text-sm text-zinc-500 hover:text-white">{icon}{label}</a>)}</div>;
}

function Editor({ activeFile, openFile, notify, markModified }) {
  const pages = {
    home: <Home openFile={openFile} markModified={markModified} />,
    about: <About markModified={markModified} />,
    projects: <Projects notify={notify} markModified={markModified} />,
    skills: <Skills markModified={markModified} />,
    contact: <Contact notify={notify} markModified={markModified} />,
    readme: <Readme markModified={markModified} />,
    resume: <Resume />,
  };
  return <main className="min-h-0 flex-1 overflow-auto bg-[#1e1e1e]">{pages[activeFile] || <div className="flex h-full items-center justify-center font-mono text-zinc-500">No file open. Use Explorer.</div>}</main>;
}

function TerminalPanel({ open }) {
  if (!open) return null;
  return (
    <div className="h-44 shrink-0 border-t border-[#151515] bg-[#1e1e1e]">
      <div className="flex border-b border-[#333] bg-[#252526] font-mono text-xs">
        <span className="border-b border-[#007acc] px-5 py-2 text-white">TERMINAL</span>
        <span className="px-5 py-2 text-zinc-500">PROBLEMS</span>
        <span className="px-5 py-2 text-zinc-500">OUTPUT</span>
      </div>
      <div className="p-4 font-mono text-sm leading-7">
        <div><span className="text-[#4ec9b0]">daniel@portfolio</span><span className="text-zinc-500">:~/portfolio$ </span>npm run dev</div>
        <div className="text-[#6a9955]">✓ Vite ready on http://localhost:5173</div>
        <div><span className="text-[#4ec9b0]">daniel@portfolio</span><span className="text-zinc-500">:~/portfolio$ </span><span className="blink" /></div>
      </div>
    </div>
  );
}

function AssistantPanel({ open, setOpen, openFile }) {
  const [messages, setMessages] = useState([{ from: "bot", text: "Hi! I'm Daniel's Copilot 👋 Ask me about projects, skills, experience, or contact." }]);
  const [input, setInput] = useState("");
  const ref = useRef(null);
  useEffect(() => { ref.current?.scrollTo({ top: ref.current.scrollHeight }); }, [messages]);
  if (!open) return null;

  function answer(question) {
    const q = question.toLowerCase();
    if (q.includes("project")) return "Daniel has 6 core projects: StepUp, WebDesigner, FinWise, Studzy, Never Again, and Worth My Day. Opening projects for you.";
    if (q.includes("skill") || q.includes("stack")) return "Main stack: React, Tailwind CSS, JavaScript, Python, Node.js, MongoDB, Vite, and CSS.";
    if (q.includes("contact") || q.includes("email")) return "Email Daniel at edridaniel2002@gmail.com or use the contact.css file.";
    if (q.includes("resume")) return "The resume is available in resume.pdf. Opening it for you.";
    return "Daniel is a Software Engineering student focused on frontend development, design systems, and full-stack web apps.";
  }
  function ask(text) {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text }, { from: "bot", text: answer(text) }]);
    if (text.toLowerCase().includes("project")) openFile("projects");
    if (text.toLowerCase().includes("contact")) openFile("contact");
    if (text.toLowerCase().includes("resume")) openFile("resume");
    setInput("");
  }

  return (
    <aside className="absolute inset-y-0 right-0 z-3500 flex w-[min(92vw,380px)] shrink-0 flex-col border-l border-[#151515] bg-[#1e1e1e] shadow-2xl md:relative md:z-auto md:w-90 md:shadow-none">
      <div className="flex h-11 items-center justify-between border-b border-[#333] px-4">
        <span className="flex items-center gap-2 font-mono text-sm text-zinc-300"><Bot size={18} className="text-purple-400" /> Daniel&apos;s AI Assistant</span>
        <button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-white"><FaXmark /></button>
      </div>
      <div ref={ref} className="flex-1 overflow-auto p-4">
        <div className="mb-5 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-purple-500/40 bg-purple-500/20"><Sparkles className="text-purple-400" /></div>
          <h3 className="font-bold text-white">Hi! I&apos;m Daniel&apos;s Copilot</h3>
          <p className="text-sm text-zinc-500">Ask me anything about the portfolio.</p>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-2">
          {["What projects has Daniel built?", "What's his tech stack?", "How can I contact Daniel?", "Open resume"].map((prompt) => (
            <button key={prompt} onClick={() => ask(prompt)} className="rounded border border-[#3c3c3c] p-3 text-left text-xs text-zinc-400 hover:border-purple-400">✦ {prompt}</button>
          ))}
        </div>
        {messages.map((msg, i) => <div key={i} className={`mb-3 rounded p-3 text-sm ${msg.from === "bot" ? "bg-[#252526] text-zinc-300" : "bg-purple-500/20 text-purple-100"}`}>{msg.text}</div>)}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="border-t border-[#333] p-4">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about Daniel's projects..." className="w-full rounded border border-[#3c3c3c] bg-[#252526] px-4 py-3 text-sm outline-none focus:border-purple-400" />
      </form>
    </aside>
  );
}

function Palette({ open, setOpen, openFile }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-8000 flex justify-center bg-black/55 pt-24 backdrop-blur-sm">
      <div className="h-fit w-[min(640px,90vw)] overflow-hidden rounded border border-[#454545] bg-[#2d2d2d] shadow-2xl">
        <div className="flex items-center gap-3 border-b border-[#444] px-4 py-3 text-zinc-400">
          <Command size={17} />
          <input autoFocus placeholder="Go to file or run command..." className="flex-1 bg-transparent outline-none" />
          <kbd className="rounded bg-white/10 px-2 py-1 text-xs">Esc</kbd>
        </div>
        <div className="py-2">
          <div className="px-4 py-2 font-mono text-xs uppercase text-zinc-500">Files</div>
          {Object.entries(FILES).map(([id, file]) => (
            <button key={id} onClick={() => { openFile(id); setOpen(false); }} className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-purple-500/30">
              <span className="w-5">{file.icon}</span><span>{file.name}</span><span className="ml-auto text-xs text-zinc-500">src/</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBar({ activeFile, setTerminalOpen, saveStatus }) {
  const isSaved = saveStatus?.startsWith("✓");
  const isUnsaved = saveStatus?.startsWith("●");

  return (
    <footer className="flex h-6 shrink-0 items-center gap-3 bg-[#007acc] px-3 font-mono text-[11px] text-white sm:px-4 sm:text-xs">
      <span>⑂ main</span>
      <span>⚠ 0</span>

      <button onClick={() => setTerminalOpen((v) => !v)} className="ml-auto">
        Terminal
      </button>

      <span className="hidden sm:inline">{FILES[activeFile]?.lang || "Plain Text"}</span>
      <span className="hidden sm:inline">UTF-8</span>

      <span
        className={`rounded px-2 py-0.5 ${
          isSaved
            ? "bg-green-500/25 text-green-100"
            : isUnsaved
              ? "bg-yellow-500/25 text-yellow-100"
              : "bg-white/10 text-white"
        }`}
      >
        {saveStatus}
      </span>

      <span className="hidden sm:inline">Prettier</span>
      <span className="hidden md:inline">♥ Daniel Dark</span>
    </footer>
  );
}

export default function App() {
  const cursor = useCursor();
  const [activeView, setActiveView] = useState("explorer");
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [assistantOpen, setAssistantOpen] = useState(() => window.innerWidth >= 1024);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [tabs, setTabs] = useState(["home"]);
  const [activeFile, setActiveFile] = useState("home");
  const [notice, setNotice] = useState("");
  const [modifiedFiles, setModifiedFiles] = useState({});
  const [saveStatus, setSaveStatus] = useState("Auto Save: On");
  const [saveFlash, setSaveFlash] = useState("");

  const notify = (msg) => {
    setNotice(msg);
    clearTimeout(window.__notice);
    window.__notice = setTimeout(() => setNotice(""), 2500);
  };

  const markModified = (id) => {
    if (!id || id === "resume") return;

    setModifiedFiles((current) => ({ ...current, [id]: true }));
    setSaveStatus(`● Unsaved changes in ${FILES[id]?.name || "file"}`);

    clearTimeout(window.__autosave);
    window.__autosave = setTimeout(() => {
      setModifiedFiles((current) => {
        const next = { ...current };
        delete next[id];
        return next;
      });
      const savedMessage = `✓ Auto Saved ${FILES[id]?.name || "file"}`;
      setSaveStatus(savedMessage);
      setSaveFlash(savedMessage);

      clearTimeout(window.__saveFlash);
      window.__saveFlash = setTimeout(() => setSaveFlash(""), 2200);

      setTimeout(() => setSaveStatus("Auto Save: On"), 2200);
    }, 1400);
  };

  const openFile = (id) => {
    setTabs((current) => {
      const withHome = current.includes("home") ? current : ["home", ...current];
      if (withHome.includes(id)) return withHome;
      return [...withHome, id];
    });
    setActiveFile(id);
  };

  const closeTab = (id) => {
    if (id === "home") return;

    setTabs((current) => {
      const next = current.filter((tab) => tab !== id);
      const safeNext = next.includes("home") ? next : ["home", ...next];

      if (activeFile === id) {
        setActiveFile(safeNext[safeNext.length - 1] || "home");
      }

      return safeNext;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(true);
      if (window.innerWidth < 768) setAssistantOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setPaletteOpen(true);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault();
        setTerminalOpen((v) => !v);
      }
      if (e.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#1e1e1e] text-zinc-300">
      <BootScreen />
      <div className="cursor-dot" style={{ left: cursor.pos.x, top: cursor.pos.y }} />
      <div className="cursor-ring" style={{ left: cursor.ring.x, top: cursor.ring.y }} />

      <TitleBar setTerminalOpen={setTerminalOpen} setPaletteOpen={setPaletteOpen} setSidebarOpen={setSidebarOpen} setAssistantOpen={setAssistantOpen} />
      <div className="flex min-h-0 flex-1">
        <ActivityBar activeView={activeView} setActiveView={setActiveView} setSidebarOpen={setSidebarOpen} setAssistantOpen={setAssistantOpen} />
        {(sidebarOpen || assistantOpen) && (
          <button
            aria-label="Close mobile panels"
            onClick={() => {
              setSidebarOpen(false);
              setAssistantOpen(false);
            }}
            className="absolute inset-0 z-2500 bg-black/45 md:hidden"
          />
        )}
        <Sidebar open={sidebarOpen} activeView={activeView} openFile={openFile} activeFile={activeFile} setSidebarOpen={setSidebarOpen} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Tabs tabs={tabs} activeFile={activeFile} setActiveFile={setActiveFile} closeTab={closeTab} modifiedFiles={modifiedFiles} />
          {activeFile && <Breadcrumb activeFile={activeFile} />}
          <Editor activeFile={activeFile} openFile={openFile} notify={notify} markModified={markModified} />
          <TerminalPanel open={terminalOpen} />
        </div>
        <AssistantPanel open={assistantOpen} setOpen={setAssistantOpen} openFile={openFile} />
      </div>
      <StatusBar activeFile={activeFile} setTerminalOpen={setTerminalOpen} saveStatus={saveStatus} />
      <Palette open={paletteOpen} setOpen={setPaletteOpen} openFile={openFile} />
      {saveFlash && (
        <div className="fixed bottom-20 right-5 z-7100 rounded border border-green-400/40 bg-[#252526] px-4 py-3 font-mono text-sm text-green-200 shadow-2xl">
          {saveFlash}
        </div>
      )}
      <div className={`fixed bottom-10 right-5 z-7000]rounded border border-[#3c3c3c] bg-[#252526] px-4 py-3 font-mono text-sm shadow-2xl transition ${notice ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
        {notice}
      </div>
    </div>
  );
}
