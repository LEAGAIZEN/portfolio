import { Award, ShieldCheck, ExternalLink, Calendar, Search, Sparkles } from 'lucide-react';
import { Certification } from '../types';

export default function CertificationsWindow() {
  const certifications: Certification[] = [
    {
      id: 'aws-ml',
      title: 'Machine Learning Foundations',
      issuer: 'AWS Academy',
      date: '2024',
      link: 'https://aws.amazon.com/training/'
    },
    {
      id: 'oracle-ai',
      title: 'Certified AI Foundations Associate',
      issuer: 'Oracle Cloud Infrastructure 2024',
      date: '2024',
      link: 'https://education.oracle.com/'
    },
    {
      id: 'oracle-cloud',
      title: 'Certified Foundations Associate',
      issuer: 'Oracle Cloud Infrastructure 2024',
      date: '2024',
      link: 'https://education.oracle.com/'
    },
    {
      id: 'aicte-genai',
      title: 'Virtual Internship in Generative AI',
      issuer: 'AICTE',
      date: '2024',
      link: 'https://internship.aicte-india.org/'
    }
  ];

  return (
    <div className="flex flex-col gap-5 animate-fade-in text-slate-200">
      {/* Header Summary Card */}
      <div className="p-4.5 rounded-xl border border-indigo-400/20 bg-indigo-500/5 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-display font-extrabold text-white flex items-center gap-1.5">
            <Award className="w-4 h-4 text-primary animate-pulse" />
            Verified Academic Credentials
          </h3>
          <p className="text-[11px] font-sans text-slate-300 leading-normal max-w-lg">
            A comprehensive mapping of certified competencies across AWS machine learning paradigms, enterprise Oracle cloud infrastructure, and national AI scholarship programs.
          </p>
        </div>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert) => (
          <div 
            key={cert.id}
            className="group relative p-4 rounded-xl border border-white/6 bg-white/1.5 hover:bg-white/3 hover:border-white/12 transition-all duration-200 flex flex-col justify-between gap-3 "
          >
            {/* Visual background glare */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/3 rounded-full transform translate-x-5 -translate-y-5 blur-xl group-hover:bg-indigo-500/6 transition-all duration-300"></div>

            <div className="flex items-start gap-3">
              {/* Badge/Seal */}
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-300">
                <ShieldCheck size={18} className="group-hover:scale-110 transition-transform duration-200" />
              </div>

              <div className="space-y-1">
                <h4 className="font-display font-bold text-xs.5 text-neutral-100 leading-tight group-hover:text-primary transition-colors duration-150">
                  {cert.title}
                </h4>
                <p className="text-[11px] font-sans font-semibold text-slate-400">
                  {cert.issuer}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10.5px] font-mono text-slate-500 pt-2 border-t border-white/4">
              <span className="flex items-center gap-1">
                <Calendar size={11} /> {cert.date || 'Verified'}
              </span>
              
              <a 
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-indigo-300 hover:text-indigo-200 cursor-pointer select-none"
              >
                <span>Verify Credential</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Stamp element matching high-end Mac OS folders */}
      <footer className="mt-2 text-center text-[10px] font-mono text-slate-600 border-t border-white/5 pt-4">
        SYSTEM SECURE KEYCHAIN SHA-256 • TRUSTED CA ROOT • ORACLE PARTNER LABS
      </footer>
    </div>
  );
}
