// updates made

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code, Cpu, ShieldAlert, CheckCircle, LineChart, Play, Zap, 
  Terminal, Globe, Github, Sparkles, Smile, RefreshCw, Send, 
  Trash2, DollarSign, Cloud, CheckSquare
} from 'lucide-react';
import { Project } from '../types';

export default function ProjectsWindow() {
  const projects: Project[] = [
    {
    id: 'tremor',
      title: 'Anti-Tremor Gloves',
      category: 'Sensory Wearable & Biotech',
      date: 'Sept 2024',
      description: 'An advanced wearable medical solution for active hand tremor suppression using real-time electromyography (EMG) muscle signals and PID/machine learning algorithms to restore physical stability.',
      tech: ['EMG Sensors', 'Arduino', 'Machine Learning', 'Signal Filters', 'Servo Actuators'],
      points: [
        'Designed a wearable glove using active feedback actuators to counter real-time muscle oscillations.',
        'Extracted EMG frequency signals from physical sensors, processing filtering loops in less than 5ms.',
        'Integrated microcontrollers (Arduino) to inject micro-stabilizing counter-vibrations dynamically.',
        'Drastically improves motor control and overall life quality for Parkinsonian or clinical tremor patients.'
      ],
      githubUrl: 'https://github.com/bijendrayadav/anti-tremor-gloves',
      imageAccent: 'from-blue-500/10 to-indigo-500/15 border-blue-500/20'
    },
    {
      id: 'mind',
      title: 'Mind Master AI',
      category: 'Computer Vision & GenAI',
      date: 'Jan 2025',
      description: 'An AI-powered emotion detection platform. It uses real-time computer vision facial expression nodes via deep learning (Keras/TensorFlow) to offer curated content suggestions and automated contextual document summaries.',
      tech: ['Python', 'CNN/Keras', 'OpenCV', 'PyPDF', 'Generative AI', 'React'],
      points: [
        'Achieved 85% accuracy in real-time facial emotion recognition using convolutional neural networks.',
        'Analyzed documents on-the-fly with PyPDF to produce concise summaries mapped to current cognitive states.',
        'Boosted client engagement by 38% through contextual AI recommendation pipelines.',
        'Decreased standard reading bottlenecks by 62% utilizing dynamic, emotion-driven summary widgets.'
      ],
      githubUrl: 'https://github.com/bijendrayadav/mind-master-ai',
      imageAccent: 'from-purple-500/10 to-fuchsia-500/15 border-purple-500/20'
    },
    {
      id: 'expense',
      title: 'Expense Tracker Pro',
      category: 'Full Stack Frontend',
      date: '2024',
      description: 'A fully functional offline-first personal finance platform. Features rich visualizations and predictive budget checks, utilizing HTML5 storage engines for uninterrupted local capability.',
      tech: ['React.js', 'Chakra UI', 'Local Storage', 'Recharts', 'TypeScript'],
      points: [
        'Constructed intuitive category expense forms with 100% immediate data binding and client parsing rules.',
        'Accelerated data queries and analytical index operations by 70% using native local-first collections.',
        'Rendered dynamic categorical pie charts and budget maps, enhancing monetary insights by 60%.',
        'Implemented detailed filters, sorters, export models and safe transactional recovery modules.'
      ],
      githubUrl: 'https://github.com/bijendrayadav/expense-tracker-pro',
      imageAccent: 'from-amber-500/10 to-emerald-500/15 border-emerald-500/20'
    },
    {
      id: 'weather',
      title: 'Weather App Containerized',
      category: 'DevOps & Systems',
      date: '2022 - 2023',
      description: 'A cloud-native meteorological platform utilizing OpenWeather API. Orchestrated with infrastructure-as-code and robust pipeline testing inside secure isolated virtual runtimes.',
      tech: ['Docker', 'Terraform', 'Jenkins CI/CD', 'OpenWeather API', 'AWS EC2', 'Nginx'],
      points: [
        'Engineered responsive web layout and telemetry feeds reaching 98% accuracy in localized forecasts.',
        'Packaged app components inside lightweight Docker containers to reduce setup times by 85%.',
        'Provisioned cloud networks automatically via Terraform variables, enabling horizontal autoscaling.',
        'Constructed Jenkins build triggers and telemetry checking, guaranteeing 99.9% uptime targets.'
      ],
      githubUrl: 'https://github.com/bijendrayadav/weather-app',
      imageAccent: 'from-cyan-500/10 to-blue-500/15 border-cyan-500/20'
    }
  ];

  const [activeTab, setActiveTab] = useState<string>('tremor');
  const currentProject = projects.find(p => p.id === activeTab) || projects[0];

  // TREMOR SIMULATOR STATE
  const [tremorAmplitude, setTremorAmplitude] = useState<number>(80);
  const [isTremorStabilized, setIsTremorStabilized] = useState<boolean>(false);

  // EMOTION SIMULATOR STATE
  const [detectedEmotion, setDetectedEmotion] = useState<string>('Calm');
  const [documentText, setDocumentText] = useState<string>('Machine Learning provides computers with the ability to learn without being explicitly programmed. CNNs excel at parsing imagery grids...');
  const [summarizing, setSummarizing] = useState<boolean>(false);
  const [summaryResult, setSummaryResult] = useState<string>('');

  // EXPENSE PRO SIM STATE
  const [expenses, setExpenses] = useState<{ id: number; title: string; category: string; amt: number }[]>([
    { id: 1, title: 'Server Hosting (AWS)', category: 'Ops', amt: 48 },
    { id: 2, title: 'Figma Pro Team', category: 'Design', amt: 15 },
    { id: 3, title: 'Organic Coffee Beans', category: 'Supplies', amt: 22 }
  ]);
  const [newExpTitle, setNewExpTitle] = useState('');
  const [newExpCat, setNewExpCat] = useState('Ops');
  const [newExpAmt, setNewExpAmt] = useState('');

  // WEATHER SIMULATOR STATE
  const [weatherCity, setWeatherCity] = useState<string>('Chennai');
  const [cliLogs, setCliLogs] = useState<string[]>([
    'Default boot sequence initialized.',
    '$ terraform init && terraform apply -auto-approve',
    'Applying configuration: aws_instance.web_host created!',
    'Current container running on cluster dev-env @ localhost:3000'
  ]);
  const [loadingWeather, setLoadingWeather] = useState(false);

  // Action helpers for simulators
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpTitle || !newExpAmt) return;
    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        title: newExpTitle,
        category: newExpCat,
        amt: parseFloat(newExpAmt) || 10
      }
    ]);
    setNewExpTitle('');
    setNewExpAmt('');
  };

  const handleSumText = () => {
    setSummarizing(true);
    setSummaryResult('');
    setTimeout(() => {
      setSummarizing(false);
      let contextTip = "";
      if (detectedEmotion === 'Stressed') {
        contextTip = " [SUGGESTION: Try 4-7-8 deep breathing during ML training.]";
      } else if (detectedEmotion === 'Excited') {
        contextTip = " [SUGGESTION: High focus detected. Capitalize on writing complex boilerplate.]";
      }
      setSummaryResult(`AI Aggressive Summary: CNN architectures parse localized spatial features via receptive fields. This eliminates manual feature extraction, highly optimizing face analytics with 85% accuracy.${contextTip}`);
    }, 1200);
  };

  const executeDockerDeploy = () => {
    const steps = [
      `$ docker build -t weather-container:latest .`,
      `[INFO] Step 1/4 - Preparing base node:18-alpine...`,
      `[INFO] Step 2/4 - Injecting environmental templates...`,
      `[INFO] Step 3/4 - Exposing container ports on: 3000`,
      `$ docker run -d -p 3000:3000 weather-container:latest`,
      `[STATUS] Container 8f029cba11d9 launched successfully!`,
      `[TELEMETRY] Nginx load-balancer syncing with node cluster...`,
      `[DEPLOYMENT COMPLETE] Production server live at: https://weather.srm.edu`
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setCliLogs(prev => [...prev, step]);
      }, (idx + 1) * 600);
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[460px] text-slate-200">
      
      {/* Side Project Tabs Navigation */}
      <div className="lg:w-64 shrink-0 flex flex-col gap-2 border-b lg:border-b-0 lg:border-r border-white/8 pb-4 lg:pb-0 lg:pr-4">
        <h3 className="hidden lg:block text-xs font-mono font-bold text-slate-500 uppercase tracking-widest pl-2 mb-2">
          Projects Folder
        </h3>
        <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 no-scrollbar">
          {projects.map((proj) => {
            const isActive = activeTab === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveTab(proj.id)}
                className={`flex-1 lg:flex-none flex items-center justify-between text-left px-3.5 py-2.5 rounded-lg font-display transition-all duration-200 relative whitespace-nowrap lg:whitespace-normal group cursor-pointer ${
                  isActive 
                    ? 'bg-indigo-500/15 text-indigo-200 shadow-sm border border-indigo-400/25 font-semibold' 
                    : 'bg-white/1.5 border border-white/3 text-slate-300 hover:bg-white/4 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Code size={14} className={isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-300"} />
                  <span className="text-xs truncate">{proj.title}</span>
                </div>
                {isActive && (
                  <span className="hidden lg:block w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Content Display Area with Transitions */}
      <div className="flex-1 flex flex-col gap-5 overflow-y-auto pr-0 lg:pr-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className={`flex-1 flex flex-col gap-5 rounded-2xl border p-5 bg-gradient-to-br ${currentProject.imageAccent}`}
          >
            {/* Headers */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-white/6 pb-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-400 font-extrabold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  {currentProject.category}
                </span>
                <h2 className="text-xl font-display font-black text-white mt-1.5">{currentProject.title}</h2>
              </div>
              <div className="flex items-center gap-2.5 mt-1 sm:mt-0">
                <span className="text-xs font-mono text-slate-400 bg-white/4 border border-white/6 px-2.5 py-1 rounded">
                  {currentProject.date}
                </span>
                
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 px-2 text-xs font-mono flex items-center gap-1 hover:text-indigo-200 hover:bg-white/5 border border-white/10 rounded transition cursor-pointer select-none"
                  title="Source Code"
                >
                  <Github size={13} />
                  <span>Repo</span>
                </a>
              </div>
            </div>

            {/* Core Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              
              {/* Write-Up Information */}
              <div className="md:col-span-7 flex flex-col gap-4">
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{currentProject.description}</p>
                
                {/* Highlights List */}
                <div className="space-y-2">
                  <h4 className="text-[10.5px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                    Achievements & Logic
                  </h4>
                  <ul className="space-y-1.5 font-sans text-xs text-slate-300">
                    {currentProject.points.map((pt, index) => (
                      <li key={index} className="flex gap-2 items-start leading-relaxed">
                        <CheckCircle size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Chips */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <h4 className="text-[10.5px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                    Tech Stack Configuration
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {currentProject.tech.map((chip, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-white/3 border border-white/5 text-indigo-200"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* SIMULATOR AREA (RIGHT HAND PANEL) */}
              <div className="md:col-span-5 flex flex-col border border-white/8 bg-black/40 rounded-xl overflow-hidden self-stretch min-h-[290px] shadow-lg">
                <header className="h-8 px-3 flex items-center justify-between border-b border-white/6 bg-white/3 select-none font-mono text-[10.5px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Terminal size={11} className="text-indigo-400" />
                    <span>Simulator://{currentProject.id}</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                </header>

                <div className="flex-1 p-4 flex flex-col bg-slate-950/80 justify-center">
                  
                  {/* SIMULATOR A: TREMOR STABILIZER GLOVES */}
                  {currentProject.id === 'tremor' && (
                    <div className="space-y-3.5 w-full">
                      <div className="text-center">
                        <p className="text-[11px] font-mono text-slate-400">Incoming Muscle Tremor Oscillator Feed</p>
                        
                        {/* Interactive Graph Display */}
                        <div className="h-24 w-full bg-neutral-900 border border-neutral-800 rounded-lg mt-2 relative overflow-hidden flex items-center justify-center">
                          
                          {/* Grid Overlay */}
                          <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 opacity-15 pointer-events-none">
                            <div className="border-r border-b border-white/30"></div>
                            <div className="border-r border-b border-white/30"></div>
                            <div className="border-r border-b border-white/30"></div>
                            <div className="border-r border-b border-white/30"></div>
                            <div className="border-r border-b border-white/30"></div>
                            <div className="border-r border-b border-white/30"></div>
                          </div>

                          {/* Simulated SVG Waveform */}
                          <svg className="w-full h-full absolute inset-0 text-indigo-400 pointer-events-none" preserveAspectRatio="none">
                            <path 
                              d={isTremorStabilized 
                                ? "M 0 48 Q 50 48, 100 48 T 200 48 T 300 48 T 400 48 T 500 48 T 600 48"
                                : `M 0 48 Q 20 ${48 - tremorAmplitude/2}, 40 ${48 + tremorAmplitude/2} T 80 48 T 120 ${48 - tremorAmplitude/1.5} T 160 48 T 200 ${48 + tremorAmplitude/2.5} T 240 48 T 280 ${48 - tremorAmplitude/4} T 320 48 T 360 ${48 + tremorAmplitude/2} T 400 48`
                              }
                              fill="none"
                              stroke={isTremorStabilized ? "#34d399" : "#f43f5e"}
                              strokeWidth="2"
                              className="transition-all duration-300"
                            />
                          </svg>

                          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded font-mono text-[9px] font-bold">
                            <span className={`w-1.5 h-1.5 rounded-full ${isTremorStabilized ? "bg-emerald-400" : "bg-rose-500 animate-pulse"}`}></span>
                            <span className={isTremorStabilized ? "text-emerald-400" : "text-rose-400"}>
                              {isTremorStabilized ? '98.5% STABILIZED' : 'UNSTABLE TREMOR'}
                            </span>
                          </div>

                          {isTremorStabilized && (
                            <motion.span 
                              initial={{ opacity: 0, scale: 0.8 }} 
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute bg-emerald-500/90 text-slate-900 border border-emerald-400/30 text-[10px] font-mono font-black rounded px-3 py-1 text-center"
                            >
                              Stabilization Active
                            </motion.span>
                          )}
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="space-y-2">
                        {!isTremorStabilized && (
                          <div className="flex justify-between text-[10px] font-mono text-slate-400 px-1">
                            <span>Adjust Amplitude Noise:</span>
                            <span>{tremorAmplitude}Hz</span>
                          </div>
                        )}
                        {!isTremorStabilized && (
                          <input 
                            type="range" 
                            min="20" 
                            max="120" 
                            value={tremorAmplitude} 
                            onChange={(e) => setTremorAmplitude(Number(e.target.value))} 
                            className="w-full accent-indigo-400 outline-none h-1 bg-indigo-900/40 rounded appearance-none cursor-pointer"
                          />
                        )}

                        <button
                          onClick={() => setIsTremorStabilized(!isTremorStabilized)}
                          className={`w-full py-2 rounded-lg font-mono text-xs font-bold flex items-center justify-center gap-1.5 border transition cursor-pointer select-none ${
                            isTremorStabilized
                              ? "bg-rose-500/10 border-rose-500/35 hover:bg-rose-500/25 text-rose-300"
                              : "bg-emerald-500 text-slate-900 border-emerald-400/30 hover:opacity-90 shadow-sm"
                          }`}
                        >
                          {isTremorStabilized ? (
                            <>
                              <RefreshCw size={12} className="animate-spin" />
                              <span>Deactivate Feedback Stabilization</span>
                            </>
                          ) : (
                            <>
                              <Zap size={12} className="fill-current animate-bounce" />
                              <span>Activate EMG Actuator Stability</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SIMULATOR B: MIND MASTER EMOTION AI */}
                  {currentProject.id === 'mind' && (
                    <div className="space-y-3.5 text-center">
                      <div className="flex flex-wrap justify-center gap-1 border-b border-white/5 pb-2">
                        {['Calm', 'Stressed', 'Excited', 'Focused'].map(em => (
                          <button
                            key={em}
                            onClick={() => setDetectedEmotion(em)}
                            className={`text-[9.5px] font-mono font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                              detectedEmotion === em 
                                ? 'bg-indigo-400 text-slate-950 font-black' 
                                : 'bg-white/4 border border-white/6 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {em}
                          </button>
                        ))}
                      </div>

                      <div className="space-y-1 my-1">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-xl font-bold">
                            {detectedEmotion === 'Calm' && '😌'}
                            {detectedEmotion === 'Stressed' && '😰'}
                            {detectedEmotion === 'Excited' && '🚀'}
                            {detectedEmotion === 'Focused' && '🧠'}
                          </span>
                          <span className="text-xs font-mono font-bold text-indigo-300 uppercase">
                            State: {detectedEmotion}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-sans italic">
                          {detectedEmotion === 'Calm' && "Suggestions: Standard summaries of ML theory."}
                          {detectedEmotion === 'Stressed' && "Suggestions: Shortened summaries, relaxing lofi beats suggestions."}
                          {detectedEmotion === 'Excited' && "Suggestions: Actionable fast summaries, upbeat ambient tracks."}
                          {detectedEmotion === 'Focused' && "Suggestions: In-depth technical indexes, code boilerplates."}
                        </p>
                      </div>

                      <div className="space-y-2 text-left">
                        <textarea
                          className="w-full text-[10px] font-mono bg-black/60 border border-white/8 p-2 rounded text-slate-300 resize-none h-14 outline-none focus:border-indigo-400"
                          value={documentText}
                          onChange={(e) => setDocumentText(e.target.value)}
                        />
                        
                        <button
                          onClick={handleSumText}
                          disabled={summarizing}
                          className="w-full py-1.5 rounded bg-indigo-500 hover:bg-opacity-90 disabled:bg-indigo-500/40 text-slate-950 font-mono text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer select-none"
                        >
                          {summarizing ? (
                            <>
                              <RefreshCw size={11} className="animate-spin" />
                              <span>Analyzing Node Streams...</span>
                            </>
                          ) : (
                            <>
                              <Send size={11} />
                              <span>Trigger GenAI Context Summary</span>
                            </>
                          )}
                        </button>

                        {summaryResult && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-2 border border-slate-700/50 bg-slate-900/60 rounded text-[9.5px] font-sans leading-relaxed text-slate-200"
                          >
                            <strong>Summary Output:</strong> {summaryResult}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* SIMULATOR C: EXPENSE TRACKER */}
                  {currentProject.id === 'expense' && (
                    <div className="space-y-3 w-full">
                      <div className="max-h-24 overflow-y-auto border border-white/5 rounded p-1.5 space-y-1 bg-black/40">
                        {expenses.map((exp) => (
                          <div key={exp.id} className="flex justify-between items-center text-[10px] font-mono bg-white/2 border border-white/5 px-2 py-0.5 rounded text-slate-300">
                            <span className="truncate max-w-[110px]">{exp.title}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] bg-indigo-500/10 text-indigo-300 rounded px-1.5">{exp.category}</span>
                              <span className="font-bold text-neutral-100">${exp.amt}</span>
                              <button 
                                onClick={() => setExpenses(expenses.filter(e => e.id !== exp.id))}
                                className="text-rose-400 hover:text-rose-300 px-0.5 cursor-pointer"
                              >
                                <Trash2 size={10} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center border-t border-white/5 pt-1 text-[10.5px] font-mono">
                        <span className="text-slate-400">Aggregated Total Bill:</span>
                        <span className="text-indigo-300 font-bold text-xs">${expenses.reduce((sum, e) => sum + e.amt, 0)}</span>
                      </div>

                      {/* Expense entry form */}
                      <form onSubmit={handleAddExpense} className="grid grid-cols-12 gap-1 font-mono text-[9.5px]">
                        <input 
                          type="text" 
                          placeholder="Bill name" 
                          value={newExpTitle}
                          onChange={(e) => setNewExpTitle(e.target.value)}
                          className="col-span-5 bg-neutral-900 text-slate-200 p-1.5 border border-white/5 rounded outline-none focus:border-indigo-400/80"
                        />
                        <select 
                          value={newExpCat}
                          onChange={(e) => setNewExpCat(e.target.value)}
                          className="col-span-3 bg-neutral-900 text-slate-300 p-1.5 border border-white/5 rounded outline-none"
                        >
                          <option value="Ops">Ops</option>
                          <option value="Design">Design</option>
                          <option value="Supplies">Supplies</option>
                        </select>
                        <input 
                          type="number" 
                          placeholder="$" 
                          value={newExpAmt}
                          onChange={(e) => setNewExpAmt(e.target.value)}
                          className="col-span-2 bg-neutral-900 text-slate-200 p-1.5 border border-white/5 rounded outline-none"
                        />
                        <button 
                          type="submit" 
                          className="col-span-2 bg-indigo-400 text-slate-950 hover:bg-indigo-300 rounded font-black cursor-pointer"
                          title="Add entry"
                        >
                          +
                        </button>
                      </form>
                    </div>
                  )}

                  {/* SIMULATOR D: WEATHER CI/CD DOCKER TERMINAL */}
                  {currentProject.id === 'weather' && (
                    <div className="space-y-3 w-full font-mono text-[10px]">
                      <div className="h-32 p-2 rounded border border-slate-800 bg-slate-950 font-mono text-indigo-300 overflow-y-auto space-y-1">
                        {cliLogs.map((log, index) => (
                          <div 
                            key={index}
                            className={
                              log.startsWith('$') 
                                ? "text-cyan-400 font-bold" 
                                : log.includes('COMPLETE') 
                                ? "text-emerald-400 font-black" 
                                : "text-slate-300/80"
                            }
                          >
                            {log}
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-1.5">
                        <button
                          onClick={executeDockerDeploy}
                          className="flex-1 py-1 px-2.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center justify-center gap-1 cursor-pointer select-none"
                        >
                          <Cloud size={11} />
                          <span>Build Docker & Deploy pipeline</span>
                        </button>
                        <button
                          onClick={() => setCliLogs(['CLI refreshed.'])}
                          className="p-1 px-2 border border-slate-700 text-slate-400 hover:text-slate-200 rounded cursor-pointer select-none"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
