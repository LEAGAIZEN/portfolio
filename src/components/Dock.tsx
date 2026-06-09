// updates made

import { motion } from 'motion/react';
import { 
  FolderOpen, Code2, Terminal, Award, FileText, Mail, Trash2 
} from 'lucide-react';
import { WindowID, WindowState } from '../types';

interface DockProps {
  windows: WindowState[];
  onIconClick: (id: WindowID) => void;
  activeWindowId: WindowID | null;
  resetWorkbench: () => void;
  isLaptopMode?: boolean;
}

export default function Dock({
  windows,
  onIconClick,
  activeWindowId,
  resetWorkbench,
  isLaptopMode = false,
}: DockProps) {
  
  const dockItems = [
    {
      id: 'about' as WindowID,
      label: 'About Me',
      icon: <FolderOpen className="w-5 h-5 text-primary" />,
      bg: 'bg-indigo-500/10 border-indigo-500/15'
    },
    {
      id: 'projects' as WindowID,
      label: 'Projects',
      icon: <Code2 className="w-5 h-5 text-secondary" />,
      bg: 'bg-blue-500/10 border-blue-500/15'
    },
    {
      id: 'skills' as WindowID,
      label: 'Skills Terminal',
      icon: <Terminal className="w-5 h-5 text-emerald-300" />,
      bg: 'bg-emerald-500/10 border-emerald-500/15'
    },
    {
      id: 'certifications' as WindowID,
      label: 'Certifications',
      icon: <Award className="w-5 h-5 text-tertiary" />,
      bg: 'bg-purple-500/10 border-purple-500/15'
    },
    {
      id: 'resume' as WindowID,
      label: 'Resume PDF',
      icon: <FileText className="w-5 h-5 text-secondary-fixed-dim" />,
      bg: 'bg-sky-500/10 border-sky-500/15'
    },
    {
      id: 'contact' as WindowID,
      label: 'Contact Mail',
      icon: <Mail className="w-5 h-5 text-rose-300" />,
      bg: 'bg-rose-500/10 border-rose-500/15'
    },
  ];

  return (
    <div className={`${isLaptopMode ? 'absolute' : 'fixed'} ${isLaptopMode ? 'bottom-4 left-1/2 -translate-x-1/2' : 'bottom-3.5 left-1/2 -translate-x-1/2'} z-[200] select-none`}>
      <div className="glass-panel flex items-center gap-3.5 px-8 py-2.5 rounded-2xl shadow-2xl relative border border-white/20 overflow-hidden max-w-xl">
        
        {/* Floor Reflections shadow effect */}
        <div className="absolute inset-x-8 -bottom-1 h-3 bg-[#e0e2ff]/5 blur-lg rounded-full pointer-events-none"></div>

        {/* Regular Dock launchers */}
        {dockItems.map((item) => {
          const state = windows.find(w => w.id === item.id);
          const isOpen = state?.isOpen || false;
          const isMinimized = state?.isMinimized || false;
          const isActiveFocus = activeWindowId === item.id;

            return (
            <motion.button
              key={item.id}
              onClick={() => onIconClick(item.id)}
              whileHover={{ scale: 1.18, y: -5 }}
              whileTap={{ scale: 0.94 }}
              className={`relative p-2.5 h-11.5 w-11.5 rounded-xl border flex items-center justify-center transition-all duration-200 group cursor-pointer origin-bottom first:ml-2 last:mr-2 ${
                isActiveFocus 
                  ? 'bg-white/18 border-white/25 shadow-md shadow-black/40 glow-primary' 
                  : 'bg-white/4 border-white/5 hover:bg-white/10 hover:border-white/12'
              }`}
            >
              {/* Launcher Icon */}
              {item.icon}

              {/* Tooltip on hover */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/85 border border-white/8 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-slate-200 font-semibold opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all pointer-events-none shadow-xl tracking-wider select-none whitespace-nowrap">
                {item.label}
              </div>

              {/* Glow Dot at bottom representing window states */}
              {isOpen && (
                <span className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isMinimized 
                    ? 'bg-amber-400' 
                    : isActiveFocus 
                    ? 'bg-[#c2c1ff] shadow-[0_0_8px_rgb(194,193,255)]' 
                    : 'bg-white/50'
                }`}></span>
              )}
            </motion.button>
          );
        })}

        {/* Separator line before actions */}
        <div className="w-px h-7 bg-white/12 justify-self-center my-0.5"></div>

        {/* Trash / Reset system shortcut */}
        <motion.button
          onClick={resetWorkbench}
          whileHover={{ scale: 1.12, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-1.5 h-10 w-10 rounded-lg bg-white/4 border border-white/5 hover:bg-rose-500/10 hover:border-rose-500/20 text-slate-400 hover:text-rose-400 cursor-pointer flex items-center justify-center group origin-bottom"
          title="Reset Workplace configurations"
        >
          <Trash2 className="w-4.5 h-4.5" />
          
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/85 border border-white/8 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-slate-200 font-semibold opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all pointer-events-none shadow-xl tracking-wider select-none whitespace-nowrap">
            Clear cache / reset
          </div>
        </motion.button>
      </div>
    </div>
  );
}
