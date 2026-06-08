import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Cpu, Layout, Cloud, Hammer, Command, Sparkles } from 'lucide-react';
import { SkillCategory } from '../types';

export default function SkillsWindow() {
  const skillCategories: SkillCategory[] = [
    {
      name: "Programming Languages",
      icon: "languages",
      skills: [
        { name: "Python", level: 90, info: "Core lang for ML; PyPDF, Keras pipelines." },
        { name: "JavaScript", level: 92, info: "Interactive structures, Node, fullstack environments." },
        { name: "C++", level: 85, info: "Hardware, Arduino controllers, sensory gloves." },
        { name: "SQL", level: 88, info: "Data schemas, indexes, relational normalization." }
      ]
    },
    {
      name: "Web Technologies",
      icon: "web",
      skills: [
        { name: "React.js", level: 93, info: "State management, modular hooks, single-view rendering." },
        { name: "Tailwind CSS", level: 95, info: "High-fidelity layouts, custom @theme structures, speed." },
        { name: "Express.js", level: 85, info: "REST servers, routers, static distribution." },
        { name: "HTML & CSS", level: 95, info: "W3C semantics, accessibility, fluid viewports." }
      ]
    },
    {
      name: "Cloud / DevOps",
      icon: "devops",
      skills: [
        { name: "AWS", level: 80, info: "EC2 instances, S3, Machine Learning Academy." },
        { name: "Docker", level: 85, info: "Platform micro-containers, devops isolation." },
        { name: "Terraform", level: 80, info: "Infrastructure as code, automated VPC config." },
        { name: "Jenkins", level: 80, info: "Automated test runs, pipeline integrations." }
      ]
    },
    {
      name: "Tools & Ecosystems",
      icon: "tools",
      skills: [
        { name: "Git & GitHub", level: 90, info: "Branch management, cloud actions, CI/CD integrations." },
        { name: "Figma", level: 82, info: "Vector mockups, premium UX wireframes." },
        { name: "DBMS / Appwrite", level: 85, info: "Local key-vals, storage, database collections." }
      ]
    }
  ];

  // ACTIVE INTERACTION STATE
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; info?: string } | null>({
    name: "React.js",
    info: "State management, modular hooks, single-view rendering."
  });

  // TERMINAL STATE
  const [inputVal, setInputVal] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'DevOS Pro v1.0.0 (Type "help" or click presets below)',
    'Logged in as guest@bijendrasystem',
    'Executing dependencies...'
  ]);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  const executeCommand = (commandStr: string) => {
    const trimmed = commandStr.trim().toLowerCase();
    if (!trimmed) return;

    let reply: string[] = [];
    reply.push(`guest@devos_pro:~$ ${commandStr}`);

    switch (trimmed) {
      case 'help':
        reply.push(
          'Supported CLI parameters represent system triggers:',
          '  list          - Catalog all core technical stacks',
          '  system-check  - Execute simulated system test suite',
          '  glove-stats   - Print hardware details of EMG Wearable',
          '  clear         - Wipe current terminal buffer lines',
          '  author        - Print curriculum developer attributes'
        );
        break;
      case 'clear':
        setTerminalHistory([]);
        return;
      case 'list':
        reply.push(
          '--- PROGRAMMING LANGUAGES ---',
          '  Python, JavaScript, C++, SQL',
          '--- WEB FRAMEWORKS ---',
          '  React.js, Tailwind CSS, Express.js, HTML & CSS',
          '--- CLOUD / DEVOPS ---',
          '  AWS, Docker, Terraform, Jenkins',
          '--- TOOLS & ECOSYSTEMS ---',
          '  Git & GitHub, Figma, DBMS / Appwrite'
        );
        break;
      case 'system-check':
        reply.push(
          '[✓] Checking local index variables... OK',
          '[✓] Resolving AWS Academy endpoints... METRICS REACHABLE',
          '[✓] Compiling tremor suppressors... ONLINE (Latency <3ms)',
          '[✓] GenAI suggested buffer modules... OPTIMIZED',
          'ALL CORE SYSTEMS OPERATIONAL'
        );
        break;
      case 'glove-stats':
        reply.push(
          '--- EMERGENCY GLOVE METRICS ---',
          '  Microprocessor: ATmega328P / Arduino Node',
          '  Feedback loop rate: 200Hz frequency',
          '  EMG filters: Highpass 20Hz + Notch 50Hz',
          '  Actuator torque: Core 1.8kg/cm micro-gears'
        );
        break;
      case 'author':
        reply.push(
          'Developer: Bijendra Yadav',
          'Academic: SRM Institute of Technology',
          'Confidence Metrics: 9.28 CGPA average, 4 major repositories.'
        );
        break;
      default:
        // Try to match a skill
        const matched = skillCategories
          .flatMap(c => c.skills)
          .find(s => s.name.toLowerCase() === trimmed);
        
        if (matched) {
          reply.push(
            `Skill Match: ${matched.name}`,
            `  Context utility: ${matched.info || 'Standard library production'}`
          );
        } else {
          reply.push(`bash: command not found: "${commandStr}". Type "help" or click quick links below.`);
        }
        break;
    }

    setTerminalHistory(prev => [...prev, ...reply]);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal) return;
    executeCommand(inputVal);
    setInputVal('');
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 text-slate-200">
      
      {/* Category Visual Skills Panel */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-2 border-b border-white/6 pb-2">
          <Cpu className="text-primary w-5 h-5" />
          <h2 className="font-display font-black text-white text-base">Interactive Skills Hub</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillCategories.map((cat, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl border border-white/6 bg-white/1.5 hover:border-white/10 transition-all duration-200 flex flex-col gap-3"
            >
              <div className="flex items-center gap-2 font-display">
                {cat.icon === 'languages' && <Command className="text-primary w-4 h-4" />}
                {cat.icon === 'web' && <Layout className="text-secondary w-4 h-4" />}
                {cat.icon === 'devops' && <Cloud className="text-tertiary w-4 h-4" />}
                {cat.icon === 'tools' && <Hammer className="text-pink-300 w-4 h-4" />}
                <h3 className="text-xs font-bold text-slate-200">{cat.name}</h3>
              </div>

              {/* Tag Pillars Grid layout */}
              <div className="flex flex-wrap gap-2 pt-1">
                {cat.skills.map((skill, sIdx) => {
                  const isSelected = selectedSkill?.name === skill.name;
                  return (
                    <button 
                      key={sIdx}
                      onClick={() => setSelectedSkill({ name: skill.name, info: skill.info })}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer flex items-center gap-2 ${
                        isSelected 
                          ? 'bg-indigo-500/12 border-indigo-500/30 text-indigo-200 shadow-sm' 
                          : 'bg-white/3 border-white/5 hover:bg-white/6 hover:border-white/10 text-slate-300'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isSelected ? 'bg-indigo-400 animate-pulse shadow-[0_0_8px_rgb(129,140,248)]' : 'bg-slate-500'
                      }`} />
                      <span>{skill.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Skill Visual Description */}
        {selectedSkill && (
          <div className="p-3.5 rounded-xl border border-indigo-400/20 bg-indigo-500/5 flex items-start gap-3 animate-fade-in">
            <Sparkles className="w-4.5 h-4.5 text-indigo-300 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="text-neutral-100 font-display font-extrabold text-xs">
                {selectedSkill.name} Stack Configuration
              </h4>
              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                {selectedSkill.info}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Retro Interactive Terminal Panel */}
      <div className="xl:w-80 shrink-0 flex flex-col border border-white/10 bg-slate-950/95 rounded-xl overflow-hidden self-stretch shadow-xl">
        <header className="h-8.5 px-3 flex items-center justify-between border-b border-white/6 bg-white/2 select-none font-mono text-[10.5px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <TerminalIcon size={12} className="text-emerald-400" />
            <span className="font-bold">skills.sh — Bash Terminal</span>
          </div>
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
          </div>
        </header>

        {/* Terminal Line Outlets */}
        <div className="flex-1 p-3.5 space-y-2 h-44 overflow-y-auto font-mono text-[10.5px] text-emerald-400/90 scanlines bg-[#0b0c10]">
          {terminalHistory.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {line}
            </div>
          ))}
          <div ref={consoleBottomRef} />
        </div>

        {/* Input Shell Form */}
        <form onSubmit={handleCommandSubmit} className="border-t border-white/6 bg-black flex items-center p-1.5 p-y-2">
          <span className="text-[10px] font-mono font-bold text-indigo-400 pl-1.5 shrink-0 select-none">
            guest$
          </span>
          <input
            type="text"
            className="flex-1 bg-transparent border-0 outline-none p-1 font-mono text-xs text-slate-200 placeholder-slate-600 pl-1.5 font-medium flex-grow focus:ring-0"
            placeholder="Type 'help'..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </form>

        {/* Preset clickables for fast demonstration */}
        <div className="p-2 border-t border-white/6 bg-white/1.5 flex flex-wrap gap-1 items-center justify-start select-none">
          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase pr-1">Macros:</span>
          {[
            { label: 'System Check', cmd: 'system-check' },
            { label: 'List All', cmd: 'list' },
            { label: 'Glove Specs', cmd: 'glove-stats' },
            { label: 'Clear', cmd: 'clear' }
          ].map(mac => (
            <button
              key={mac.cmd}
              onClick={() => executeCommand(mac.cmd)}
              type="button"
              className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-[#161619] border border-white/6 text-slate-300 hover:text-white hover:border-white/12 cursor-pointer transition-all duration-150"
            >
              {mac.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
