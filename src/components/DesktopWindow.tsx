// updates made

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Maximize2, Minimize2, X, Scaling } from 'lucide-react';
import { WindowID } from '../types';

interface DesktopWindowProps {
  key?: string | number;
  id: WindowID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  initialX: number;
  initialY: number;
  width: number;
  height: number;
  zIndex: number;
  onClose: (id: WindowID) => void;
  onMinimize: (id: WindowID) => void;
  onMaximize: (id: WindowID) => void;
  onFocus: (id: WindowID) => void;
  children: React.ReactNode;
}

export default function DesktopWindow({
  id,
  title,
  isOpen,
  isMinimized,
  isMaximized,
  initialX,
  initialY,
  width,
  height,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
}: DesktopWindowProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width, height });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const positionStart = useRef({ x: 0, y: 0 });
  const sizeStart = useRef({ width: 0, height: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // Keep starting size synced
  useEffect(() => {
    if (!isMaximized) {
      setSize({ width, height });
      setPosition({ x: initialX, y: initialY });
    }
  }, [width, height, initialX, initialY, isMaximized]);

  if (!isOpen) return null;

  // Window Drag Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMaximized) return;
    
    // Guard against clicking control buttons
    const target = e.target as HTMLElement;
    if (target.closest('.win-btn')) return;

    onFocus(id);
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    positionStart.current = { ...position };
    
    if (windowRef.current) {
      windowRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      
      // Calculate new position (stay inside screen loosely)
      const newX = Math.max(-size.width + 100, Math.min(window.innerWidth - 80, positionStart.current.x + dx));
      const newY = Math.max(32, Math.min(window.innerHeight - 80, positionStart.current.y + dy));
      
      setPosition({ x: newX, y: newY });
    } else if (isResizing) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      
      const newWidth = Math.max(380, Math.min(1600, sizeStart.current.width + dx));
      const newHeight = Math.max(280, Math.min(1200, sizeStart.current.height + dy));
      
      setSize({ width: newWidth, height: newHeight });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      if (windowRef.current) {
        windowRef.current.releasePointerCapture(e.pointerId);
      }
    }
    if (isResizing) {
      setIsResizing(false);
      if (windowRef.current) {
        windowRef.current.releasePointerCapture(e.pointerId);
      }
    }
  };

  // Resize Corner Pointer Downs
  const handleResizePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onFocus(id);
    setIsResizing(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    sizeStart.current = { ...size };
    
    if (windowRef.current) {
      windowRef.current.setPointerCapture(e.pointerId);
    }
  };

  // Toggle Maximize on Titlebar Double-click
  const handleTitlebarDoubleClick = () => {
    onMaximize(id);
  };

  // Animation values
  const variants = {
    hidden: { opacity: 0, scale: 0.85, y: 15 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
    minimized: { opacity: 0, scale: 0.4, y: 400, transition: { duration: 0.25, ease: "easeInOut" } }
  };

  return (
    <motion.div
      ref={windowRef}
      id={`window-${id}`}
      onPointerDown={() => onFocus(id)}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      initial="hidden"
      animate={isMinimized ? "minimized" : "visible"}
      variants={variants}
      className={`glass-window select-none absolute rounded-xl flex flex-col overflow-hidden leading-normal border border-white/12 shadow-2xl transition-shadow duration-200 ${
        isMaximized 
          ? 'left-0 top-8 w-full h-[calc(100vh-80px)] rounded-none border-t-0 border-x-0' 
          : 'rounded-xl'
      }`}
      style={{
        zIndex,
        width: isMaximized ? '100%' : `${size.width}px`,
        height: isMaximized ? '100%' : `${size.height}px`,
        left: isMaximized ? 0 : `${position.x}px`,
        top: isMaximized ? 32 : `${position.y}px`,
        cursor: 'default',
        transformOrigin: "bottom center",
      }}
    >
      {/* Titlebar / Header */}
      <div
        onPointerDown={handlePointerDown}
        onDoubleClick={handleTitlebarDoubleClick}
        className="h-9 px-4 shrink-0 flex items-center justify-between glass-bar select-none cursor-grab active:cursor-grabbing text-slate-300 font-display text-sm font-semibold tracking-wide"
      >
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-2">
          {/* Close */}
          <button
            onClick={() => onClose(id)}
            className="win-btn w-3.5 h-3.5 rounded-full bg-rose-500/85 hover:bg-rose-500 hover:scale-105 flex items-center justify-center group border border-rose-600/30 transition-all duration-150 relative cursor-pointer"
            title="Close"
          >
            <X size={8} className="text-rose-950 opacity-0 group-hover:opacity-100 font-extrabold transition-opacity duration-150" />
          </button>
          
          {/* Minimize */}
          <button
            onClick={() => onMinimize(id)}
            className="win-btn w-3.5 h-3.5 rounded-full bg-amber-500/85 hover:bg-amber-500 hover:scale-105 flex items-center justify-center group border border-amber-600/30 transition-all duration-150 relative cursor-pointer"
            title="Minimize"
          >
            <Minimize2 size={8} className="text-amber-950 opacity-0 group-hover:opacity-100 font-extrabold transition-opacity duration-150" />
          </button>
          
          {/* Maximize / Zoom */}
          <button
            onClick={() => onMaximize(id)}
            className="win-btn w-3.5 h-3.5 rounded-full bg-emerald-500/85 hover:bg-emerald-500 hover:scale-105 flex items-center justify-center group border border-emerald-600/30 transition-all duration-150 relative cursor-pointer"
            title="Maximize"
          >
            <Maximize2 size={8} className="text-emerald-950 opacity-0 group-hover:opacity-100 font-extrabold transition-opacity duration-150" />
          </button>
        </div>

        {/* Window Title */}
        <div className="flex-1 text-center font-mono text-xs font-medium text-slate-400 capitalize flex items-center justify-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/50"></span>
          {title}
        </div>

        {/* Dummy Window Width Controls */}
        <div className="w-16 flex justify-end">
          <span className="text-[10px] font-mono font-normal opacity-40 select-none">
            {isMaximized ? 'MAX' : `${Math.round(size.width)}x${Math.round(size.height)}`}
          </span>
        </div>
      </div>

      {/* Window Body/Content */}
      <div className="flex-1 p-5 overflow-auto relative bg-[#131316]/95 text-slate-200">
        {children}
      </div>

      {/* Resize Handle at Bottom-Right */}
      {!isMaximized && (
        <div
          onPointerDown={handleResizePointerDown}
          className="win-btn absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-0.5"
          style={{ zIndex: 101 }}
        >
          <Scaling size={8} className="text-white/20 select-none pointer-events-none rotate-90" />
        </div>
      )}
    </motion.div>
  );
}
