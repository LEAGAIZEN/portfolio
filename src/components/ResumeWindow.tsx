import { useState, useRef, useEffect } from 'react';
import { 
  FileText, Download, Printer, ZoomIn, ZoomOut, Search, 
  ChevronLeft, ChevronRight, CheckSquare, Sparkles, AlertCircle 
} from 'lucide-react';

export default function ResumeWindow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(680);
  const [autoFit, setAutoFit] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchMatches, setSearchMatches] = useState<number>(0);

  // Measure drafting table container width to scale correctly
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect.width) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Compute and apply the dynamic auto-zoom when container alters or auto-fit is toggled
  useEffect(() => {
    if (!autoFit) return;
    
    // Total document width is 630px. Adding 36px margin buffer.
    const targetWidth = 630 + 36;
    const calculatedZoom = Math.floor((containerWidth / targetWidth) * 100);
    // Clamp the auto zoom range beautifully
    const clampedZoom = Math.max(45, Math.min(115, calculatedZoom));
    setZoom(clampedZoom);
  }, [containerWidth, autoFit]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate simple text blob download of the resume source code
    const blob = new Blob([resumeTextContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Bijendra_Yadav_Resume.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to highlight terms (returns HTML string with <mark> tags)
  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    return text.split(regex).map((part, i) => 
      regex.test(part) 
        ? `<mark class="bg-amber-400 text-neutral-950 font-bold px-0.5 rounded">${part}</mark>` 
        : part
    ).join('');
  };

  const resumeTextContent = `
========================================
BIJENDRA YADAV
bijendrayadav0724@gmail.com | +91-9058243910
Chennai, Tamil Nadu, India
========================================

EDUCATION:
SRM Institute Of Technology, Chennai (2022 - 2026)
B.Tech in Computer Science and Engineering - CGPA: 9.28

EXPERIENCE:
Research Intern - First Melon Company (Aug 2025 - Dec 2025)
Role: Frontend Engineer

PROJECTS:
1. Anti-Tremor Gloves (Sept 2024): wearable EMG suppressor.
2. Mind Master (Jan 2025): emotion computer vision suggesting content.
3. Expense Tracker (2024): offline finance visualizer.
4. Weather App (2022-2023): docker infrastructure.

CERTIFICATIONS:
- AWS Academy: Machine Learning Foundations
- Oracle Cloud Infrastructure: AI Foundations Associate
- Oracle Cloud Infrastructure: Foundations Associate
- AICTE: Virtual Internship in Generative AI
  `;

  return (
    <div className="flex flex-col h-full text-slate-100 flex-grow animate-fade-in relative min-h-[480px]">
      
      {/* OS PDF Viewer Control Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-neutral-900 border border-white/6 p-2 rounded-xl mb-4 text-xs font-mono select-none">
        <div className="flex items-center gap-2">
          {/* Page Indicators */}
          <div className="flex items-center gap-1.5 bg-black/40 border border-white/5 rounded px-2.5 py-1">
            <button 
              onClick={() => setCurrentPage(1)} 
              disabled={currentPage === 1}
              className="p-0.5 hover:text-white disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft size={13} />
            </button>
            <span className="text-[10px] text-slate-400">
              Page <strong className="text-white">{currentPage}</strong> of 2
            </span>
            <button 
              onClick={() => setCurrentPage(2)} 
              disabled={currentPage === 2}
              className="p-0.5 hover:text-white disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Zoom Multipliers */}
          <div className="flex items-center gap-1.5 bg-black/40 border border-white/5 rounded px-2 py-1">
            <button 
              onClick={() => {
                setAutoFit(false);
                setZoom(Math.max(40, zoom - 10));
              }} 
              className="p-0.5 hover:text-white cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut size={13} />
            </button>
            <button
              onClick={() => setAutoFit(p => !p)}
              className={`text-[10px] px-2 py-0.5 rounded transition-all font-mono font-bold hover:scale-105 active:scale-95 ${
                autoFit 
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                  : 'bg-transparent text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
              title="Toggle Auto Fit to Window"
            >
              {zoom}% {autoFit ? 'Auto' : 'Fit'}
            </button>
            <button 
              onClick={() => {
                setAutoFit(false);
                setZoom(Math.min(150, zoom + 10));
              }} 
              className="p-0.5 hover:text-white cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn size={13} />
            </button>
          </div>
        </div>

        {/* Real-time PDF search */}
        <div className="relative w-full sm:w-44">
          <Search size={12} className="absolute left-2.5 top-2 text-slate-500" />
          <input
            type="text"
            className="w-full bg-black/40 border border-white/5 pl-8 pr-2.5 py-1.5 text-[10.5px] rounded outline-none placeholder-slate-500 focus:border-indigo-400 focus:ring-0"
            placeholder="Search keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Action downloads */}
        <div className="flex items-center gap-2">
          <button 
            onClick={handleDownload}
            className="flex items-center gap-1 bg-indigo-500/10 border border-indigo-400/20 hover:bg-indigo-500/20 text-indigo-200 px-3 py-1.5 rounded cursor-pointer transition-all shrink-0 select-none text-[10.5px]"
          >
            <Download size={12} />
            <span>TXT Copy</span>
          </button>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-1 bg-white/4 border border-white/8 hover:bg-white/8 text-slate-300 px-3 py-1.5 rounded cursor-pointer transition-all shrink-0 select-none text-[10.5px]"
          >
            <Printer size={12} />
            <span>Print / export</span>
          </button>
        </div>
      </div>

      {/* Main Drafting Table container */}
      <div 
        ref={containerRef}
        className="flex-grow overflow-auto p-4 flex items-start justify-center bg-[#1e1e24] shadow-inner rounded-xl min-h-[380px]"
      >
        
        {/* Document paper */}
        <div 
          className="bg-[#fafafa] text-[#111113] p-10 font-serif leading-relaxed shadow-lg relative min-h-[750px] transition-all duration-200 max-w-full origin-top text-left select-text"
          style={{ 
            width: '630px', 
            zoom: zoom / 100,
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
          }}
        >
          {/* LaTeX water-mark header lines */}
          <div className="absolute top-2 right-4 font-mono text-[9px] text-neutral-400 opacity-65 uppercase pointer-events-none">
            Bijendra_Yadav_Resume_v2.0 • LaTeX compiled
          </div>

          {currentPage === 1 ? (
            <div className="space-y-6">
              
              {/* PAGE 1: HEADER INFO */}
              <div className="text-center space-y-1.5 border-b-2 border-neutral-800 pb-3">
                <h1 className="text-2xl font-semibold tracking-tight uppercase" dangerouslySetInnerHTML={{ __html: highlightText('Bijendra Yadav') }}></h1>
                <p className="text-xs font-sans text-neutral-600 font-semibold italic">Potheri, Chennai, Tamil Nadu • +91-9058243910</p>
                
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 font-mono text-[10px] text-indigo-800 underline font-semibold">
                  <a href="mailto:bijendrayadav0724@gmail.com" dangerouslySetInnerHTML={{ __html: highlightText('bijendrayadav0724@gmail.com') }}></a>
                  <a href="https://linkedin.com">Linkedin</a>
                  <a href="https://github.com/bijendrayadav">Github</a>
                  <a href="https://leetcode.com">LeetCode</a>
                </div>
              </div>

              {/* EDUCATION */}
              <div className="space-y-2">
                <h2 className="text-sm font-bold tracking-widest uppercase border-b border-neutral-300 pb-1 text-indigo-950">EDUCATION</h2>
                <div className="space-y-1">
                  <div className="flex justify-between font-semibold text-xs.5">
                    <span dangerouslySetInnerHTML={{ __html: highlightText('SRM Institute Of Technology, Chennai') }}></span>
                    <span className="font-mono text-neutral-600 text-[10.5px]">2022 – 2026</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-700 italic">
                    <span>B.Tech - Computer Science and Engineering - <strong dangerouslySetInnerHTML={{ __html: highlightText('CGPA - 9.28') }}></strong></span>
                    <span className="font-sans text-[10.5px]">Chennai, Tamilnadu</span>
                  </div>
                </div>
              </div>

              {/* COURSEWORK */}
              <div className="space-y-1.5">
                <h2 className="text-sm font-bold tracking-widest uppercase border-b border-neutral-300 pb-1 text-indigo-950">COURSEWORK / SKILLS</h2>
                <div className="grid grid-cols-3 gap-1 text-[11px] font-sans text-neutral-700 list-none pl-1">
                  <div dangerouslySetInnerHTML={{ __html: highlightText('• Data Structures & Algorithms') }}></div>
                  <div dangerouslySetInnerHTML={{ __html: highlightText('• OOPs Concepts') }}></div>
                  <div dangerouslySetInnerHTML={{ __html: highlightText('• Web Development') }}></div>
                  <div dangerouslySetInnerHTML={{ __html: highlightText('• Operating Systems') }}></div>
                  <div dangerouslySetInnerHTML={{ __html: highlightText('• Cloud Computing') }}></div>
                  <div dangerouslySetInnerHTML={{ __html: highlightText('• DBMS') }}></div>
                </div>
              </div>

              {/* EXPERIENCE */}
              <div className="space-y-2">
                <h2 className="text-sm font-bold tracking-widest uppercase border-b border-neutral-300 pb-1 text-indigo-950">EXPERIENCE</h2>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between font-semibold text-xs.5">
                      <span className="font-extrabold" dangerouslySetInnerHTML={{ __html: highlightText('• Research Intern — First Melon Company') }}></span>
                      <span className="font-mono text-neutral-600 text-[10.5px]">August 2025 - December 2025</span>
                    </div>
                    <div className="flex justify-between text-xs text-neutral-600 italic mb-1.5">
                      <span>Role - Frontend Engineer</span>
                      <span className="font-sans text-[10.5px]">Urapakkam, Chennai</span>
                    </div>
                    
                    <ul className="list-disc pl-5 text-[11px] text-neutral-700 space-y-1">
                      <li dangerouslySetInnerHTML={{ __html: highlightText('Engaged in discussions on system design and software architecture, contributing to technical decision-making with an 80% adoption rate of proposed solutions.') }}></li>
                      <li dangerouslySetInnerHTML={{ __html: highlightText('Gained practical exposure to industry workflows and R&D processes through mentorship and collaboration, increasing task efficiency by 80%.') }}></li>
                      <li dangerouslySetInnerHTML={{ __html: highlightText('Attended training sessions on Javascript and Databases.') }}></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* PROJECTS (PART 1) */}
              <div className="space-y-3">
                <h2 className="text-sm font-bold tracking-widest uppercase border-b border-neutral-300 pb-1 text-indigo-950">PUBLICATIONS / PROJECTS</h2>
                
                {/* PROJ 1 */}
                <div className="space-y-1">
                  <div className="flex justify-between font-semibold text-xs.5">
                    <span>
                      <strong className="underline" dangerouslySetInnerHTML={{ __html: highlightText('Anti-Tremor Gloves') }}></strong> | <span className="text-[10px] text-neutral-600 font-sans" dangerouslySetInnerHTML={{ __html: highlightText('EMG, Arduino, Machine Learning, Sensors') }}></span>
                    </span>
                    <span className="font-mono text-neutral-600 text-[10.5px]">Sept 2024</span>
                  </div>
                  <ul className="list-disc pl-5 text-[11px] text-neutral-700 space-y-1">
                    <li dangerouslySetInnerHTML={{ __html: highlightText('Developed a wearable solution for tremor suppression using real-time electromyography (EMG) signals and machine learning algorithms to detect and counteract tremors.') }}></li>
                    <li dangerouslySetInnerHTML={{ __html: highlightText('Integrated sensors and microcontrollers (Arduino) to provide real-time feedback and vibrations to stabilize hand movements, significantly improving the quality of life.') }}></li>
                  </ul>
                </div>

                {/* PROJ 2 */}
                <div className="space-y-1">
                  <div className="flex justify-between font-semibold text-xs.5">
                    <span>
                      <strong className="underline" dangerouslySetInnerHTML={{ __html: highlightText('Mind Master') }}></strong> | <span className="text-[10px] text-neutral-600 font-sans" dangerouslySetInnerHTML={{ __html: highlightText('Python, Keras, PyPDF, OpenCV, JS, GenAI') }}></span>
                    </span>
                    <span className="font-mono text-neutral-600 text-[10.5px]">Jan 2025</span>
                  </div>
                  <ul className="list-disc pl-5 text-[11px] text-neutral-700 space-y-1">
                    <li dangerouslySetInnerHTML={{ __html: highlightText('Developed an AI-driven emotion detection platform with real-time GenAI content suggestions based on user emotions and personalized document summaries, enhancing user experience.') }}></li>
                  </ul>
                </div>
              </div>

            </div>
          ) : (
            <div className="space-y-6">
              
              {/* PAGE 2 */}
              {/* PROJECTS (PART 2) */}
              <div className="space-y-4">
                <h2 className="text-sm font-bold tracking-widest uppercase border-b border-neutral-300 pb-1 text-indigo-950">PROJECTS (Continued)</h2>
                
                {/* PROJ 2 Bullet continues */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-neutral-800" dangerouslySetInnerHTML={{ __html: highlightText('Mind Master Analytics Highlights:') }}></p>
                  <ul className="list-disc pl-5 text-[11px] text-neutral-700 space-y-1">
                    <li dangerouslySetInnerHTML={{ __html: highlightText('Achieved 85% accuracy in real-time emotion detection using CNN with Keras, TensorFlow, and OpenCV.') }}></li>
                    <li dangerouslySetInnerHTML={{ __html: highlightText('Increased user engagement by 38% through dynamic GenAI content pipelines, cutting text summarization reading bottlenecks by 62%.') }}></li>
                  </ul>
                </div>

                {/* PROJ 3 */}
                <div className="space-y-1">
                  <div className="flex justify-between font-semibold text-xs.5">
                    <span>
                      <strong className="underline" dangerouslySetInnerHTML={{ __html: highlightText('Expense Tracker') }}></strong> | <span className="text-[10px] text-neutral-600 font-sans" dangerouslySetInnerHTML={{ __html: highlightText('React, JavaScript, Chakra UI, VS Code') }}></span>
                    </span>
                    <span className="font-mono text-neutral-600 text-[10.5px]">2024</span>
                  </div>
                  <ul className="list-disc pl-5 text-[11px] text-neutral-700 space-y-1">
                    <li dangerouslySetInnerHTML={{ __html: highlightText('Developed entry pages to add expenses by category and amount, storing 100% of data in local storage.') }}></li>
                    <li dangerouslySetInnerHTML={{ __html: highlightText('Implemented an list page with filtering and sorting, improving data retrieval speed by 70%, with a interactive Chakra pie chart visualizer worsening category insights by 60%.') }}></li>
                  </ul>
                </div>

                {/* PROJ 4 */}
                <div className="space-y-1">
                  <div className="flex justify-between font-semibold text-xs.5">
                    <span>
                      <strong className="underline" dangerouslySetInnerHTML={{ __html: highlightText('Weather App - Using Docker') }}></strong> | <span className="text-[10px] text-neutral-600 font-sans" dangerouslySetInnerHTML={{ __html: highlightText('HTML, CSS, JavaScript, Terraform, Jenkins') }}></span>
                    </span>
                    <span className="font-mono text-neutral-600 text-[10.5px]">2022-2023</span>
                  </div>
                  <ul className="list-disc pl-5 text-[11px] text-neutral-700 space-y-1">
                    <li dangerouslySetInnerHTML={{ __html: highlightText('Developed a weather application fetching real-time forecasting via OpenWeatherMap API with 98% accuracy.') }}></li>
                    <li dangerouslySetInnerHTML={{ __html: highlightText('Containerized using Docker, decreasing environments setup latency by 85%. Deployed via Terraform config guaranteeing 99.9% host uptime.') }}></li>
                  </ul>
                </div>
              </div>

              {/* TECHNICAL SKILLS COMPLETE */}
              <div className="space-y-2">
                <h2 className="text-sm font-bold tracking-widest uppercase border-b border-neutral-300 pb-1 text-indigo-950">TECHNICAL SKILLS</h2>
                <div className="text-[11px] text-neutral-700 space-y-1 font-sans leading-relaxed">
                  <div className="grid grid-cols-12 gap-1">
                    <span className="col-span-3 font-semibold text-neutral-900" dangerouslySetInnerHTML={{ __html: highlightText('Languages:') }}></span>
                    <span className="col-span-9" dangerouslySetInnerHTML={{ __html: highlightText('Python, JavaScript, C++, SQL') }}></span>
                  </div>
                  <div className="grid grid-cols-12 gap-1">
                    <span className="col-span-3 font-semibold text-neutral-900" dangerouslySetInnerHTML={{ __html: highlightText('Web Configs:') }}></span>
                    <span className="col-span-9" dangerouslySetInnerHTML={{ __html: highlightText('HTML, CSS, React.js, Express.js, Tailwind, Bootstrap') }}></span>
                  </div>
                  <div className="grid grid-cols-12 gap-1">
                    <span className="col-span-3 font-semibold text-neutral-900" dangerouslySetInnerHTML={{ __html: highlightText('Cloud / DevOps:') }}></span>
                    <span className="col-span-9" dangerouslySetInnerHTML={{ __html: highlightText('AWS, Docker, Terraform, Jenkins') }}></span>
                  </div>
                  <div className="grid grid-cols-12 gap-1">
                    <span className="col-span-3 font-semibold text-neutral-900" dangerouslySetInnerHTML={{ __html: highlightText('Databases:') }}></span>
                    <span className="col-span-9" dangerouslySetInnerHTML={{ __html: highlightText('Appwrite, DBMS, general SQL systems') }}></span>
                  </div>
                  <div className="grid grid-cols-12 gap-1">
                    <span className="col-span-3 font-semibold text-neutral-900" dangerouslySetInnerHTML={{ __html: highlightText('Design tools:') }}></span>
                    <span className="col-span-9" dangerouslySetInnerHTML={{ __html: highlightText('Figma, Canva') }}></span>
                  </div>
                </div>
              </div>

              {/* CERTIFICATIONS COMPLETE */}
              <div className="space-y-2">
                <h2 className="text-sm font-bold tracking-widest uppercase border-b border-neutral-300 pb-1 text-indigo-950">CERTIFICATIONS</h2>
                <ul className="list-disc pl-5 text-[11px] text-neutral-700 space-y-1">
                  <li><strong dangerouslySetInnerHTML={{ __html: highlightText('AWS Academy:') }}></strong> Certified Machine Learning Foundations Associate.</li>
                  <li><strong dangerouslySetInnerHTML={{ __html: highlightText('Oracle Cloud Infrastructure 2024:') }}></strong> Certified AI Foundations Associate.</li>
                  <li><strong dangerouslySetInnerHTML={{ __html: highlightText('Oracle Cloud Infrastructure 2024:') }}></strong> Certified Cloud Foundations Associate.</li>
                  <li><strong dangerouslySetInnerHTML={{ __html: highlightText('AICTE:') }}></strong> Virtual Internship in Generative AI technology.</li>
                </ul>
              </div>

              {/* EXTRACURRICULAR HIGHLIGHTS */}
              <div className="space-y-2">
                <h2 className="text-sm font-bold tracking-widest uppercase border-b border-neutral-300 pb-1 text-indigo-950">EXTRACURRICULAR / AUTHORS</h2>
                <ul className="list-disc pl-5 text-[11px] text-neutral-700 space-y-1">
                  <li dangerouslySetInnerHTML={{ __html: highlightText('Achieved 96% response rate in addressing international student inquiries, significantly boosting feedback score.') }}></li>
                  <li dangerouslySetInnerHTML={{ __html: highlightText('Wrote and self-published the novel "Call of Regrets" on Amazon, demonstrating exceptional writing discipline and execution timelines.') }}></li>
                  <li dangerouslySetInnerHTML={{ __html: highlightText('Oversaw logistics, managed group timelines, and led university cultural committees for broad representation.') }}></li>
                </ul>
              </div>

            </div>
          )}

          {/* Page footer numbering */}
          <div className="mt-8 pt-2 border-t border-neutral-300 text-center text-[10px] font-mono text-neutral-600 block">
            {currentPage} of 2 • Curriculam Vitae — Bijendra Yadav
          </div>
        </div>
      </div>

    </div>
  );
}
