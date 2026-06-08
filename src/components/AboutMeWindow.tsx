import { BookOpen, GraduationCap, MapPin, Phone, Mail, Award, Sparkles } from 'lucide-react';

export default function AboutMeWindow() {
  const education = {
    degree: "B.Tech in Computer Science and Engineering",
    school: "SRM Institute of Technology, Chennai",
    period: "2022 - 2026",
    gpa: "CGPA: 9.28",
    location: "Kattankulathur, Tamil Nadu"
  };

  const coursework = [
    "Data Structures & Algorithms (DSA)",
    "Object-Oriented Programming (OOPs)",
    "Operating Systems (OS)",
    "Database Management Systems (DBMS)",
    "Cloud Computing",
    "Full Stack Web Development"
  ];

  const highlights = [
    {
      title: "Author & Publisher",
      desc: "Self-published the novel 'Call of Regrets' on Amazon. Highly creative and disciplined writer."
    },
    {
      title: "Leadership",
      desc: "Led cultural committee in organizing a successful international program for diverse cultures."
    },
    {
      title: "Systems Thinker",
      desc: "Passionate about intersection of hardware & software (like the EMG suppression glove)."
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-slate-200">
      {/* Hero Header Section */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start border-b border-white/8 pb-6">
        <div className="relative group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-500 via-primary-dark to-tertiary opacity-35 blur-lg group-hover:opacity-60 transition duration-500"></div>
          <div className="relative w-36 h-36 rounded-2xl overflow-hidden border border-white/15 bg-black shrink-0">
            <img
              alt="Bijendra Yadav"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIU61g1SUSSZnVMbNznIM9uPRC0IJkSNERzTpenFbcuGwRmRweb_URbJoTGlBVTWi20VMBlg8Vr66NwiVVyeDGztZbfUCtV3Paoab5QVwifIQJtGscSoKCSKE7oEUdInlebU0umST0jDE5EbCOs86-Lmqjc46RDgrKD0dmdVU5lvuaf7j8edJpmteRnLEQbQpia4XxVM4zi5h-HXCSTvMAHW3Rl67fneUoSdfuESfkt04EqmulMr4pcURcO4h-PD2rqsfzVtf2xfA"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-3">
          <div>
            <h1 className="text-3xl font-display font-extrabold text-white tracking-tight glow-text-primary flex items-center justify-center md:justify-start gap-2">
              Bijendra Yadav
              <Sparkles className="w-5 h-5 text-indigo-300 fill-indigo-400/30 animate-pulse" />
            </h1>
            <p className="text-lg font-display text-indigo-200 font-semibold mt-0.5">
              Full Stack Developer & Systems Engineer
            </p>
          </div>

          <p className="font-sans text-sm text-slate-300 leading-relaxed max-w-xl">
            A Computer Science student at <strong>SRM Institute of Technology</strong> specializing in Frontend Engineering, system architecture, and machine learning. Passionate about solving high-impact problems—ranging from sensory-stabilizing wearables (such as tremor suppression gloves) to real-time Generative AI and emotion analytics platforms.
          </p>

          {/* Quick Contact Micro-Badges */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 text-xs font-mono">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/4 border border-white/6 text-slate-300">
              <MapPin size={12} className="text-primary" /> Chennai, India
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/4 border border-white/6 text-slate-300">
              <GraduationCap size={12} className="text-secondary" /> B.Tech CSE (2026)
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/4 border border-white/6 text-slate-300">
              <Award size={12} className="text-tertiary" /> GPA 9.28
            </span>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Education Row */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-white/6 pb-2">
            <GraduationCap className="text-primary w-5 h-5" />
            <h3 className="font-display font-bold text-white text-base">Education</h3>
          </div>

          <div className="p-4 rounded-xl border border-white/8 bg-white/3 space-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full transform translate-x-4 -translate-y-4 blur-xl"></div>
            
            <div className="flex justify-between items-start">
              <h4 className="text-neutral-100 font-semibold text-sm">{education.degree}</h4>
              <span className="text-xs font-mono bg-indigo-500/15 text-indigo-200 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                {education.period}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">{education.school}</p>
            
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-white/5">
              <span>{education.gpa}</span>
              <span className="flex items-center gap-1 text-[11px]">
                <MapPin size={10} /> {education.location}
              </span>
            </div>
          </div>

          {/* Academic Coursework */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 border-b border-white/6 pb-2">
              <BookOpen className="text-secondary w-4 h-5" />
              <h3 className="font-display font-bold text-white text-sm">Key Coursework</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-1.5 text-xs font-mono text-slate-400">
              {coursework.map((course, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-2 py-1 bg-white/2 border border-white/4 rounded">
                  <span className="w-1 h-1 rounded-full bg-secondary"></span>
                  <span className="truncate">{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights Row */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-white/6 pb-2">
            <Award className="text-tertiary w-5 h-5" />
            <h3 className="font-display font-bold text-white text-base">Core Highlights</h3>
          </div>

          <div className="space-y-2.5">
            {highlights.map((h, i) => (
              <div key={i} className="group p-3 rounded-xl border border-white/6 bg-white/1.5 hover:bg-white/4 hover:border-white/10 transition-all duration-200 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-300 mt-0.5 select-none font-mono font-bold text-xs">
                  {i + 1}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-white text-xs font-bold group-hover:text-primary transition-colors duration-150">{h.title}</h4>
                  <p className="text-[11.5px] text-slate-400 leading-normal">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4.5 rounded-xl border border-dashed border-white/10 bg-indigo-500/3 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-bold text-neutral-100 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-red-300" />
                "Call of Regrets" Novel
              </p>
              <p className="text-[10px] text-slate-400 leading-normal max-w-[200px]">
                Available globally on Amazon Kindle. Written during university, showcasing creative narrative vision.
              </p>
            </div>
            <a 
              href="https://www.amazon.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-indigo-200 hover:bg-white/20 transition-all cursor-pointer select-none"
            >
              View Book
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
