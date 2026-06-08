// updates made

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderOpen, Code2, Terminal, Award, FileText, Mail, 
  Tv, Power, ShieldAlert, Monitor, Info, Smartphone, Eye, Sparkles
} from 'lucide-react';

import { WindowID, WindowState } from './types';
import DesktopWindow from './components/DesktopWindow';
import AboutMeWindow from './components/AboutMeWindow';
import ProjectsWindow from './components/ProjectsWindow';
import SkillsWindow from './components/SkillsWindow';
import CertificationsWindow from './components/CertificationsWindow';
import ResumeWindow from './components/ResumeWindow';
import ContactWindow from './components/ContactWindow';
import TopMenuBar from './components/TopMenuBar';
import Dock from './components/Dock';

export default function App() {
  // SYSTEM CONFIG STATS
  const [isLaptopMode, setIsLaptopMode] = useState<boolean>(true);
  const [hideStatus, setHideStatus] = useState<boolean>(false);
  const [systemState, setSystemState] = useState<'desktop' | 'locked' | 'shutdown' | 'bios'>('desktop');
  const [isWifiConnected, setIsWifiConnected] = useState<boolean>(true);
  const [biosLogs, setBiosLogs] = useState<string[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<WindowID | null>('about');
  const [aboutOsOpen, setAboutOsOpen] = useState<boolean>(false);

  // DRAGGABLE WINDOW STATES
  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: 'about',
      title: 'about_me.md',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      initialX: 180,
      initialY: 48,
      width: 610,
      height: 440,
      zIndex: 100,
      iconName: 'folder_open',
    },
    {
      id: 'projects',
      title: 'projects.json',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      initialX: 210,
      initialY: 70,
      width: 760,
      height: 480,
      zIndex: 50,
      iconName: 'code',
    },
    {
      id: 'skills',
      title: 'skills.sh',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      initialX: 240,
      initialY: 90,
      width: 740,
      height: 440,
      zIndex: 50,
      iconName: 'terminal',
    },
    {
      id: 'certifications',
      title: 'certs.yml',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      initialX: 270,
      initialY: 110,
      width: 580,
      height: 400,
      zIndex: 50,
      iconName: 'award',
    },
    {
      id: 'resume',
      title: 'resume.pdf',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      initialX: 140,
      initialY: 55,
      width: 720,
      height: 520,
      zIndex: 50,
      iconName: 'description',
    },
    {
      id: 'contact',
      title: 'contact_me.app',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      initialX: 200,
      initialY: 82,
      width: 760,
      height: 480,
      zIndex: 50,
      iconName: 'mail',
    },
  ]);

  // CANVAS REF FOR DUST EFFECTS
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // PARTICLES LOOP
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number | null = null;

    // Cap devicePixelRatio to avoid excessive rendering work on hi-dpi displays
    const getPixelRatio = () => Math.min(window.devicePixelRatio || 1, 1);

    const resizeCanvas = () => {
      const dpr = getPixelRatio();
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w, h };
    };

    let { w: width, h: height } = resizeCanvas();

    const handleResize = () => {
      const dims = resizeCanvas();
      width = dims.w;
      height = dims.h;
      // Recreate particles on resize for consistent density
      initParticles();
    };

    let particles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number }[] = [];

    const initParticles = () => {
      particles = [];
      // Scale particle count by viewport area, keep reasonable bounds
      const area = Math.max(1, width * height);
      const baseCount = 75;
      const scale = Math.sqrt(area / (1280 * 720));
      const count = Math.max(25, Math.min(120, Math.round(baseCount * scale)));

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          alpha: Math.random() * 0.45 + 0.25,
        });
      }
    };

    initParticles();
    window.addEventListener('resize', handleResize);

    // Pause rendering when tab is hidden to save CPU and avoid stutters
    let visible = !document.hidden;
    const handleVisibility = () => {
      visible = !document.hidden;
      if (visible && animationId === null) {
        animationId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const clear = () => ctx.clearRect(0, 0, width, height);

    function draw() {
      if (!visible) {
        animationId = null;
        return;
      }

      clear();
      ctx.fillStyle = 'rgba(194, 193, 255, 0.45)';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animationId = requestAnimationFrame(draw);
    }

    // Start the loop
    animationId = requestAnimationFrame(draw);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [systemState]);

  // BIOS REBOOT CHRONICLE
  const executeRebootSequence = () => {
    setSystemState('bios');
    setBiosLogs([]);

    const messages = [
      'DEVOPS MAIN BOARD V2.66 — INTEL CLUSTER XEON',
      'RAM TEST: 16384MB PASSED',
      'INITIALIZING LOCAL ENVIRONMENT...',
      'AWS ENVIRONMENT PATH CONNECT CONNECTED',
      'DETECING HARDWARE ACTUATORS... GLOVE SENSORS MOUNTED [OK]',
      'MIND MASTER COMPUTER VISION LIBRARY DETECTED [85% EFFICIENCY]',
      'MOUNTING PERSISTENCE SCHEMAS ON DRIZZLE/APPWRITE DATA STACK',
      'COMPILING WEB PORTFOLIO RUNTIME IN VITE (PORT 3000)...',
      'DEVPACK INITIALIZED SUCCESSFULLY — GUEST WORKBENCH GRANTED'
    ];

    messages.forEach((msg, idx) => {
      setTimeout(() => {
        setBiosLogs(prev => [...prev, `[LOG] ${new Date().toLocaleTimeString()} ${msg}`]);
        if (idx === messages.length - 1) {
          setTimeout(() => {
            setSystemState('desktop');
            // Re-open About Window on reboot!
            setWindows(prev => prev.map(w => w.id === 'about' ? { ...w, isOpen: true, isMinimized: false } : w));
            setActiveWindowId('about');
          }, 800);
        }
      }, (idx + 1) * 350);
    });
  };

  // SYSTEM ACTIONS DISPATCHER
  const handleSystemAction = (action: 'shutdown' | 'restart' | 'lock' | 'about_os') => {
    if (action === 'shutdown') {
      setSystemState('shutdown');
    } else if (action === 'restart') {
      executeRebootSequence();
    } else if (action === 'lock') {
      setSystemState('locked');
    } else if (action === 'about_os') {
      setAboutOsOpen(true);
    }
  };

  // FOCUS LAYER MANAGER
  const handleFocusWindow = (id: WindowID) => {
    if (activeWindowId === id) return;
    
    setWindows((prev) => {
      const maxZ = Math.max(...prev.map((w) => w.zIndex), 10);
      return prev.map((w) => {
        if (w.id === id) {
          return { ...w, zIndex: maxZ + 1, isMinimized: false };
        }
        return w;
      });
    });
    setActiveWindowId(id);
  };

  // WINDOW TOGGLES OR LAUNCHERS FROM DOCK/DESKTOP
  const handleLaunchWindow = (id: WindowID) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const wasOpen = w.isOpen;
          const wasMin = w.isMinimized;
          
          if (!wasOpen) {
            // Closed completely -> Launch fresh and focus
            return { ...w, isOpen: true, isMinimized: false };
          } else if (wasMin) {
            // Is minimized -> Restore it and focus
            return { ...w, isMinimized: false };
          } else if (activeWindowId === id) {
            // Already open and focused -> Minimize it
            return { ...w, isMinimized: true };
          }
          // Open but not focused -> Focus handled by next function
          return w;
        }
        return w;
      })
    );

    const targetWin = windows.find(w => w.id === id);
    if (targetWin?.isOpen && !targetWin.isMinimized && activeWindowId === id) {
      // Minimize if same app clicked in focus
      setActiveWindowId(null);
    } else {
      handleFocusWindow(id);
    }
  };

  const handleCloseWindow = (id: WindowID) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w)));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const handleMinimizeWindow = (id: WindowID) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const handleMaximizeWindow = (id: WindowID) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)));
    handleFocusWindow(id);
  };

  const resetWorkbench = () => {
    if (confirm('Are you sure you want to restore the system default workbench layout? This will clean up custom window placements.')) {
      setWindows([
        { id: 'about', title: 'about_me.md', isOpen: true, isMinimized: false, isMaximized: false, initialX: 180, initialY: 48, width: 610, height: 440, zIndex: 100, iconName: 'folder_open' },
        { id: 'projects', title: 'projects.json', isOpen: false, isMinimized: false, isMaximized: false, initialX: 210, initialY: 70, width: 760, height: 480, zIndex: 50, iconName: 'code' },
        { id: 'skills', title: 'skills.sh', isOpen: false, isMinimized: false, isMaximized: false, initialX: 240, initialY: 90, width: 740, height: 440, zIndex: 50, iconName: 'terminal' },
        { id: 'certifications', title: 'certs.yml', isOpen: false, isMinimized: false, isMaximized: false, initialX: 270, initialY: 110, width: 580, height: 400, zIndex: 50, iconName: 'award' },
        { id: 'resume', title: 'resume.pdf', isOpen: false, isMinimized: false, isMaximized: false, initialX: 140, initialY: 55, width: 720, height: 520, zIndex: 50, iconName: 'description' },
        { id: 'contact', title: 'contact_me.app', isOpen: false, isMinimized: false, isMaximized: false, initialX: 200, initialY: 82, width: 760, height: 480, zIndex: 50, iconName: 'mail' },
      ]);
      setActiveWindowId('about');
      setIsWifiConnected(true);
    }
  };

  return (
    <div className={`scene w-screen h-screen overflow-hidden flex items-center justify-center bg-black transition-all font-sans relative`}>
      {/* Background Starry Dust Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40 z-0 bg-[#0f0e13]" />

      {/* FLOATING ATMOSPHERE CONTROLLERS */}
      <div className="absolute top-11 right-4 flex flex-col gap-2 z-[250] text-xs font-mono select-none">
        <button
          onClick={() => setIsLaptopMode(!isLaptopMode)}
          className="p-2 py-1 bg-white/5 hover:bg-indigo-500/15 border border-white/8 hover:border-indigo-400/30 text-slate-300 hover:text-indigo-200 rounded-lg flex items-center gap-1.5 cursor-pointer backdrop-blur-md transition-all uppercase font-semibold text-[10px]"
          title={isLaptopMode ? 'Expand to Full Viewport' : 'Pack in Laptop Mockup'}
        >
          <Tv size={12} className={isLaptopMode ? "text-indigo-300" : "text-green-300"} />
          <span>{isLaptopMode ? "Borderless Workspace" : "Virtual Laptop Shell"}</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* VIEW L: LOCKED PORTAL */}
        {systemState === 'locked' && (
          <motion.div
            key="lock-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSystemState('desktop')}
            className="absolute inset-0 z-[400] flex flex-col items-center justify-center bg-black/80 backdrop-blur-3xl text-slate-200 cursor-pointer select-none py-10"
          >
            <div className="flex flex-col items-center gap-4 text-center max-w-sm px-6">
              
              <div className="relative group mb-1">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-500 to-tertiary opacity-40 blur group-hover:opacity-60 transition duration-300" />
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/20">
                  <img
                    alt="Bijendra Yadav"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIU61g1SUSSZnVMbNznIM9uPRC0IJkSNERzTpenFbcuGwRmRweb_URbJoTGlBVTWi20VMBlg8Vr66NwiVVyeDGztZbfUCtV3Paoab5QVwifIQJtGscSoKCSKE7oEUdInlebU0umST0jDE5EbCOs86-Lmqjc46RDgrKD0dmdVU5lvuaf7j8edJpmteRnLEQbQpia4XxVM4zi5h-HXCSTvMAHW3Rl67fneUoSdfuESfkt04EqmulMr4pcURcO4h-PD2rqsfzVtf2xfA"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div>
                <h1 className="text-xl font-display font-extrabold text-white">Bijendra Yadav</h1>
                <p className="text-xs text-slate-400 font-mono">guest@developer.host</p>
              </div>

              {/* Password simulation */}
              <div className="w-full mt-2">
                <div className="w-full bg-white/5 border border-white/8 rounded-lg p-2.5 text-center text-xs text-slate-400 font-mono tracking-wide">
                  🔓 Tap physical screen to unlock workbench
                </div>
              </div>

              <div className="pt-6 font-mono text-[10px] text-slate-500 animate-pulse">
                SYS INTEGRITY VERIFIED • WIFI BROADCASTING
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW S: SYSTEM SHUTDOWN STATE */}
        {systemState === 'shutdown' && (
          <motion.div
            key="shutdown-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-[500] bg-black flex flex-col items-center justify-center text-slate-500 select-none"
          >
            {/* Visual scanline screen effect */}
            <div className="absolute inset-0 pointer-events-none scanlines opacity-5"></div>
            
            <div className="space-y-4 text-center">
              <div className="relative w-16 h-16 rounded-full border border-rose-500/20 bg-rose-500/5 mx-auto flex items-center justify-center text-rose-400">
                <Power size={24} />
              </div>
              <div className="space-y-1">
                <h2 className="text-sm font-mono font-bold text-slate-400">System offline (Shutdown complete)</h2>
                <p className="text-[10px] text-slate-500 max-w-xs leading-relaxed">
                  The container instance has terminated. To reload the resources, click the power selector below.
                </p>
              </div>
              <button
                onClick={executeRebootSequence}
                className="mt-4 px-4 py-1.5 bg-indigo-500 hover:bg-opacity-90 text-slate-950 text-xs font-mono font-bold rounded-lg transition cursor-pointer select-none"
              >
                Start DevOS Core Power
              </button>
            </div>
          </motion.div>
        )}

        {/* VIEW B: BIOS BOOT sequence */}
        {systemState === 'bios' && (
          <motion.div
            key="bios-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-[500] bg-[#0c0c0e] p-6 font-mono text-xs select-none flex flex-col justify-between"
          >
            <div className="space-y-1.5 text-indigo-300">
              {biosLogs.map((log, i) => (
                <div key={i} className="leading-relaxed animate-fade-in text-emerald-400">
                  {log}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between text-[10px] text-neutral-600 border-t border-white/5 pt-3">
              <span>SYSTEM KERNEL LOADER V4.2 — TSX ENGINE</span>
              <span className="animate-pulse">LOADING WORKBENCH CONTROLS...</span>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* CORE DESKTOP VIEWPORT WRAPPER (STANDALONE vs CONTAINERIZED LAPTOP) */}
      <div 
        className={`transition-all duration-300 select-none relative flex flex-col origin-center ${
          isLaptopMode 
            ? 'w-[1024px] h-[640px] rounded-2xl border-4 border-slate-800 bg-[#0c0a12] shadow-2xl relative select-none animate-float-laptop overflow-hidden shrink-0' 
            : 'w-full h-full' 
        }`}
        style={{
          boxShadow: isLaptopMode ? '0 45px 85px -15px rgba(0, 0, 0, 0.95), inset 0 0 0 1px rgba(255,255,255,0.05)' : 'none',
          willChange: 'transform',
        }}
      >
        {/* Glass top bar */}
        <TopMenuBar 
          onSystemAction={handleSystemAction}
          isWifiConnected={isWifiConnected}
          toggleWifi={() => setIsWifiConnected(!isWifiConnected)}
          activeWindow={activeWindowId}
          toggleLaptopMode={() => setIsLaptopMode(prev => !prev)}
          hideStatus={hideStatus}
          toggleHideStatus={() => setHideStatus(prev => !prev)}
          onCopyPath={() => {
            // Copy active window identifier or fallback to workspace root
            const text = activeWindowId || 'workspace_root';
            try { navigator.clipboard?.writeText(text); } catch (e) { console.log('clipboard failed', e); }
            // small visual feedback
            console.log('Copied path:', text);
          }}
          onSelectCode={() => {
            // Simulated select-code action: focus first textarea if present
            const ta = document.querySelector('textarea');
            if (ta && (ta as HTMLTextAreaElement).select) {
              (ta as HTMLTextAreaElement).focus();
              (ta as HTMLTextAreaElement).select();
            } else {
              console.log('Select code: no textarea present');
            }
          }}
          onMinimizeCore={() => setIsLaptopMode(false)}
          onOpenWorkspace={() => setIsLaptopMode(true)}
        />

        {/* CORE WORKBENCH STAGE WITH WALLPAPER */}
        <div 
          className="flex-grow w-full relative z-10 pt-8 flex items-start justify-start overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD75CMkNjXdNTFn5q2J8HrZbkuLC8LDaypk0-3bpKhc7bbJR4DBydW0FicEXSjWp47Fho0F9FWD1Qkw4L1zgs_m6Lou4YJmzifRvN7jaJq8nS1_nKtm5tgKNBn8pt0gKdE6UwBXDoTyfclBbxZ2pGQsLBWgX8PAZE1AiH7W_1pbgrTObj3x7GrURftscLove1kcCDWHeamaF_jQ6xwBLiiPPthbf9nDvarSHwDRZNTXS2h7QcDwH_nxKTWXxx4UTlQpbwVPjgC9i64')`,
            backgroundBlendMode: 'overlay',
            backgroundColor: 'rgba(10, 8, 14, 0.45)'
          }}
        >
          {/* Left Desk Shortcut Icons */}
          <div className="absolute top-12 left-4 flex flex-col gap-5 text-center font-mono select-none z-10">
            {[
              { id: 'about' as WindowID, label: 'About Me', icon: <FolderOpen className="text-primary" size={32} /> },
              { id: 'projects' as WindowID, label: 'Projects', icon: <Code2 className="text-secondary" size={32} /> },
              { id: 'skills' as WindowID, label: 'Skills Node', icon: <Terminal className="text-emerald-300" size={32} /> },
              { id: 'certifications' as WindowID, label: 'Certs', icon: <Award className="text-tertiary" size={32} /> },
              { id: 'resume' as WindowID, label: 'Resume PDF', icon: <FileText className="text-secondary-fixed-dim" size={32} /> },
              { id: 'contact' as WindowID, label: 'Mail Desk', icon: <Mail className="text-rose-300" size={32} /> },
            ].map((desk) => (
              <div
                key={desk.id}
                onClick={() => handleLaunchWindow(desk.id)}
                className="w-18 flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer hover:bg-white/10 active:bg-white/15 transition duration-150 select-none group"
              >
                <div className="group-hover:scale-108 transition-transform duration-200">
                  {desk.icon}
                </div>
                <span className="text-[9.5px] font-semibold text-slate-200 tracking-wide select-none drop-shadow-md">
                  {desk.label}
                </span>
              </div>
            ))}
          </div>

          {/* ACTIVE Draggable & Resizable WINDOW INSTANCES */}
          {windows.map((win) => {
            return (
              <DesktopWindow
                key={win.id}
                id={win.id}
                title={win.title}
                isOpen={win.isOpen}
                isMinimized={win.isMinimized}
                isMaximized={win.isMaximized}
                initialX={win.initialX}
                initialY={win.initialY}
                width={win.width}
                height={win.height}
                zIndex={win.zIndex}
                onClose={handleCloseWindow}
                onMinimize={handleMinimizeWindow}
                onMaximize={handleMaximizeWindow}
                onFocus={handleFocusWindow}
              >
                {/* Specific inner views mapping */}
                {win.id === 'about' && <AboutMeWindow />}
                {win.id === 'projects' && <ProjectsWindow />}
                {win.id === 'skills' && <SkillsWindow />}
                {win.id === 'certifications' && <CertificationsWindow />}
                {win.id === 'resume' && <ResumeWindow />}
                {win.id === 'contact' && <ContactWindow />}
              </DesktopWindow>
            );
          })}

          {/* About OS Spec Sheet modal */}
          {aboutOsOpen && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[290] flex items-center justify-center animate-fade-in p-4">
              <div className="w-80 rounded-xl bg-[#16161a] border border-white/12 p-5 text-center text-xs space-y-4 shadow-2xl relative select-none font-sans text-slate-200">
                <div className="absolute top-2.5 right-2.5">
                  <button 
                    onClick={() => setAboutOsOpen(false)}
                    className="p-1 hover:text-white text-slate-500 rounded cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="text-3xl text-indigo-300 font-black tracking-wide font-display py-1">
                   DevOS Pro
                </div>
                
                <div className="space-y-1">
                  <p className="font-bold text-neutral-100">Silicon Desktop Platform v1.0.0</p>
                  <p className="text-[10px] text-slate-500 font-mono">React 19 • Vite 6 • Tailwind 4</p>
                </div>

                <div className="p-3 bg-black/40 rounded border border-white/4 space-y-1.5 text-left font-mono text-[10px] text-slate-400">
                  <div className="flex justify-between"><span>Host Processor:</span><span className="text-slate-300">Xeon Cluster</span></div>
                  <div className="flex justify-between"><span>Active User:</span><span className="text-slate-300">Bijendra Yadav</span></div>
                  <div className="flex justify-between"><span>Relational DB:</span><span className="text-slate-300">Local Outbox</span></div>
                  <div className="flex justify-between"><span>Stabilizer:</span><span className="text-slate-300">PID Active</span></div>
                </div>

                <button
                  onClick={() => setAboutOsOpen(false)}
                  className="w-full py-2 rounded bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold cursor-pointer"
                >
                  Close Specification
                </button>
              </div>
            </div>
          )}

          {/* Bottom Dock multi-selector */}
          <Dock 
            windows={windows}
            onIconClick={handleLaunchWindow}
            activeWindowId={activeWindowId}
            resetWorkbench={resetWorkbench}
          />

        </div>

        {/* Laptop frame bezel footer floor (Only on Laptop Mode layout) */}
        {isLaptopMode && (
          <div className="h-6 w-full shrink-0 bg-neutral-900 border-t border-white/15 flex items-center justify-center relative select-none">
            <span className="text-[9px] font-mono tracking-widest text-slate-500 font-extrabold uppercase">
              Silicon Workspace Frame • Bijendra Yadav
            </span>
          </div>
        )}
      </div>

    </div>
  );
}
