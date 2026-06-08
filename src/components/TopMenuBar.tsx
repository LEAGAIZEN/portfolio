// updates made

import React, { useState, useEffect } from 'react';
import { Wifi, Battery, BatteryCharging, Monitor, Lock, Shield, Sparkles, LogOut, RefreshCw } from 'lucide-react';

interface TopMenuBarProps {
  onSystemAction: (action: 'shutdown' | 'restart' | 'lock' | 'about_os') => void;
  isWifiConnected: boolean;
  toggleWifi: () => void;
  activeWindow: string | null;
  toggleLaptopMode?: () => void;
  hideStatus?: boolean;
  toggleHideStatus?: () => void;
  onCopyPath?: () => void;
  onSelectCode?: () => void;
  onMinimizeCore?: () => void;
  onOpenWorkspace?: () => void;
}

export default function TopMenuBar({
  onSystemAction,
  isWifiConnected,
  toggleWifi,
  activeWindow,
  toggleLaptopMode,
  hideStatus,
  toggleHideStatus,
  onCopyPath,
  onSelectCode,
  onMinimizeCore,
  onOpenWorkspace
}: TopMenuBarProps) {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [activeMenu, setActiveMenu] = useState<'system' | 'file' | 'edit' | 'view' | 'profile' | null>(null);

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDate(now.toLocaleDateString([], { month: 'short', day: 'numeric', weekday: 'short' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close menus on click outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveMenu(null);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleMenuClick = (menu: 'system' | 'file' | 'edit' | 'view' | 'profile', e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenu(prev => prev === menu ? null : menu);
  };

  return (
    <div className="h-8 w-full glass-bar fixed top-0 left-0 z-[200] px-4 flex items-center justify-between text-xs font-medium text-slate-300 font-display select-none">
      
      {/* Left Menu Items */}
      <div className="flex items-center gap-4">
        {/* System Apple-style Dropdown */}
        <div className="relative">
          <button
            onClick={(e) => handleMenuClick('system', e)}
            className={`font-semibold tracking-wider hover:text-white hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-pointer flex items-center gap-1 ${
              activeMenu === 'system' ? 'bg-white/12 text-white' : ''
            }`}
          >
            <span className="text-indigo-300 text-sm"></span>
            <span className="font-extrabold font-display">DevOS Pro</span>
          </button>

          {activeMenu === 'system' && (
            <div className="absolute left-0 mt-1 w-48 rounded-lg bg-[#141418]/95 border border-white/8 backdrop-blur-3xl p-1 shadow-2xl z-[300] divide-y divide-white/5 animate-fade-in text-left">
              <div className="py-1">
                <button 
                  onClick={() => onSystemAction('about_os')}
                  className="w-full text-left px-3 py-1.5 hover:bg-indigo-500/10 hover:text-indigo-200 rounded-md transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles size={11} className="text-indigo-400" />
                  <span>About DevOS Pro</span>
                </button>
              </div>
              <div className="py-1">
                <button 
                  onClick={() => onSystemAction('lock')}
                  className="w-full text-left px-3 py-1.5 hover:bg-indigo-500/10 hover:text-indigo-200 rounded-md transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Lock size={11} />
                  <span>Lock Workbench</span>
                </button>
                <button 
                  onClick={() => onSystemAction('restart')}
                  className="w-full text-left px-3 py-1.5 hover:bg-amber-500/10 hover:text-amber-200 rounded-md transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw size={11} />
                  <span>Host Reboot</span>
                </button>
              </div>
              <div className="py-1">
                <button 
                  onClick={() => onSystemAction('shutdown')}
                  className="w-full text-left px-3 py-1.5 hover:bg-rose-500/10 hover:text-rose-300 rounded-md transition-colors flex items-center gap-2 cursor-pointer text-rose-400 font-semibold"
                >
                  <LogOut size={11} />
                  <span>Emergency Shutdown</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* File Dropdown */}
        <div className="relative">
          <button
            onClick={(e) => handleMenuClick('file', e)}
            className={`hover:text-white hover:bg-white/10 px-2.5 py-0.5 rounded transition-colors cursor-pointer ${
              activeMenu === 'file' ? 'bg-white/12 text-white' : ''
            }`}
          >
            File
          </button>
          {activeMenu === 'file' && (
            <div className="absolute left-0 mt-1 w-36 rounded-lg bg-[#141418]/95 border border-white/8 p-1 shadow-2xl z-[300] animate-fade-in text-left">
              <span className="block px-3 py-1 text-[10px] uppercase font-mono font-bold text-slate-500 tracking-wider">
                Active Desk
              </span>
              <button onClick={(e) => { e.stopPropagation(); onMinimizeCore?.(); }} className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-indigo-500/10 rounded cursor-pointer">
                Minimize Core
              </button>
              <button onClick={(e) => { e.stopPropagation(); onOpenWorkspace?.(); }} className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-indigo-500/10 rounded cursor-pointer">
                Open Workspace
              </button>
            </div>
          )}
        </div>

        {/* Edit Dropdown */}
        <div className="relative">
          <button
            onClick={(e) => handleMenuClick('edit', e)}
            className={`hover:text-white hover:bg-white/10 px-2.5 py-0.5 rounded transition-colors cursor-pointer ${
              activeMenu === 'edit' ? 'bg-white/12 text-white' : ''
            }`}
          >
            Edit
          </button>
          {activeMenu === 'edit' && (
            <div className="absolute left-0 mt-1 w-32 rounded-lg bg-[#141418]/95 border border-white/8 p-1 shadow-2xl z-[300] text-left">
              <button onClick={(e) => { e.stopPropagation(); onCopyPath?.(); }} className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-indigo-500/10 rounded cursor-pointer">
                Copy Path
              </button>
              <button onClick={(e) => { e.stopPropagation(); onSelectCode?.(); }} className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-indigo-500/10 rounded cursor-pointer">
                Select Code
              </button>
            </div>
          )}
        </div>

        {/* View Dropdown */}
        <div className="relative">
          <button
            onClick={(e) => handleMenuClick('view', e)}
            className={`hover:text-white hover:bg-white/10 px-2.5 py-0.5 rounded transition-colors cursor-pointer ${
              activeMenu === 'view' ? 'bg-white/12 text-white' : ''
            }`}
          >
            View
          </button>
          {activeMenu === 'view' && (
            <div className="absolute left-0 mt-1 w-44 rounded-lg bg-[#141418]/95 border border-white/8 p-1 shadow-2xl z-[300] text-left">
              <button onClick={(e) => { e.stopPropagation(); toggleLaptopMode?.(); }} className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-indigo-500/10 rounded cursor-pointer">
                Toggle Laptop Frame
              </button>
              <button onClick={(e) => { e.stopPropagation(); toggleHideStatus?.(); }} className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-indigo-500/10 rounded cursor-pointer">
                {hideStatus ? 'Show Status Elements' : 'Hide Status Elements'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Menu Status Bar */}
      {!hideStatus && (
        <div className="flex items-center gap-3">
        {/* Wifi Toggle */}
        <button
          onClick={toggleWifi}
          className={`p-1 rounded cursor-pointer hover:bg-white/10 transition duration-150 ${
            isWifiConnected ? 'text-indigo-300' : 'text-rose-400'
          }`}
          title={isWifiConnected ? 'Wi-Fi Broadcast Connected' : 'Wi-Fi Broadcast Inhibited'}
        >
          <Wifi size={14} className={!isWifiConnected ? "stroke-[2.5]" : ""} />
        </button>

        {/* Battery Display */}
        <div className="flex items-center gap-1.5 text-slate-300 pr-1 select-none" title="Battery charging loop active via host grid">
          <BatteryCharging size={14} className="text-emerald-400" />
          <span className="font-mono text-[10px] font-bold text-slate-400">100%</span>
        </div>

        {/* User Profile avatar info */}
        <div className="relative border-l border-white/10 pl-2">
          <button
            onClick={(e) => handleMenuClick('profile', e)}
            className="flex items-center gap-2 hover:bg-white/10 px-2 py-0.5 rounded transition cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full overflow-hidden border border-white/20">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIU61g1SUSSZnVMbNznIM9uPRC0IJkSNERzTpenFbcuGwRmRweb_URbJoTGlBVTWi20VMBlg8Vr66NwiVVyeDGztZbfUCtV3Paoab5QVwifIQJtGscSoKCSKE7oEUdInlebU0umST0jDE5EbCOs86-Lmqjc46RDgrKD0dmdVU5lvuaf7j8edJpmteRnLEQbQpia4XxVM4zi5h-HXCSTvMAHW3Rl67fneUoSdfuESfkt04EqmulMr4pcURcO4h-PD2rqsfzVtf2xfA"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                alt="Profile"
              />
            </div>
            <span className="hidden sm:inline font-mono font-medium text-[10.5px]">Bijendra Yadav</span>
          </button>
          
          {activeMenu === 'profile' && (
            <div className="absolute right-0 mt-1 w-52 rounded-lg bg-[#141418]/95 border border-white/10 p-3 shadow-2xl z-[300] space-y-1.5 animate-fade-in text-left text-xs font-sans">
              <div className="text-center pb-2.5 border-b border-white/5 space-y-1 select-none">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/40 mx-auto">
                  <img
                    alt=""
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIU61g1SUSSZnVMbNznIM9uPRC0IJkSNERzTpenFbcuGwRmRweb_URbJoTGlBVTWi20VMBlg8Vr66NwiVVyeDGztZbfUCtV3Paoab5QVwifIQJtGscSoKCSKE7oEUdInlebU0umST0jDE5EbCOs86-Lmqjc46RDgrKD0dmdVU5lvuaf7j8edJpmteRnLEQbQpia4XxVM4zi5h-HXCSTvMAHW3Rl67fneUoSdfuESfkt04EqmulMr4pcURcO4h-PD2rqsfzVtf2xfA"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-white font-bold leading-none">Bijendra Yadav</h4>
                <p className="text-[10px] text-slate-500 font-mono">guest@developer.host</p>
              </div>
              <div className="text-[10.5px] p-1 pt-1.5 text-slate-400 text-center select-none leading-normal italic">
                "Developing secure components & high-performance frontend microservices"
              </div>
            </div>
          )}
        </div>

        {/* Clock with Datetime index */}
        <div className="font-mono text-[10.5px] pl-1 opacity-80 select-none text-slate-400 capitalize flex items-center gap-1.5 border-l border-white/10">
          <span>{date}</span>
          <span className="font-semibold text-neutral-100">{time}</span>
        </div>
        </div>
      )}

    </div>
  );
}
