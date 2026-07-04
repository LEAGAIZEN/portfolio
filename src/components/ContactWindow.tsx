// updates made

import React, { useState, useEffect } from 'react';
import { Mail, Send, Trash2, Check, Inbox, Sparkles, SendHorizontal } from 'lucide-react';
import { Message } from '../types';

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/bijendrayadav0724@gmail.com';

export default function ContactWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeMsgId, setActiveMsgId] = useState<string | null>(null);

  // Form Inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('devos_pro_messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed);
        if (parsed.length > 0) {
          setActiveMsgId(parsed[0].id);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      // Default welcome message
      const defaultMsg: Message = {
        id: 'welcome',
        senderName: 'Bijendra Yadav',
        senderEmail: 'bijendrayadav0724@gmail.com',
        subject: 'Welcome to DevOS Pro Mail Launcher!',
        content: `Hi there! \n\nThanks for visiting my portfolio. This is a fully functional macOS Mail simulator. If you write a message and hit "Send", it will be saved locally using your browser's LocalStorage and will appear in the "Sent" category in real-time. \n\nFeel free to try it out! You can reach me directly at: \n- Phone: +91-9058243910 \n- Email: bijendrayadav0724@gmail.com \n\nLooking forward to collaborating with you!`,
        timestamp: new Date().toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        isRead: true
      };
      setMessages([defaultMsg]);
      setActiveMsgId(defaultMsg.id);
    }
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !content) return;

    setIsSending(true);
    setSendError(null);
    setShowSuccess(false);

    try {
      const submittedAt = new Date().toLocaleString();
      const sourcePage = window.location.href;
      const fullPayload = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        `Submitted At: ${submittedAt}`,
        `Source Page: ${sourcePage}`,
        '',
        'Message:',
        content
      ].join('\n');

      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message: content,
          submitted_at: submittedAt,
          source_page: sourcePage,
          full_payload: fullPayload,
          _subject: `Portfolio Contact: ${subject}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const result = await response.json();
      if (!response.ok || result.success === false || result.success === 'false') {
        throw new Error(result.message || 'FormSubmit request failed');
      }

      const newMsg: Message = {
        id: Date.now().toString(),
        senderName: name,
        senderEmail: email,
        subject: subject,
        content: content,
        timestamp: new Date().toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        isRead: true
      };

      const updated = [newMsg, ...messages];
      setMessages(updated);
      localStorage.setItem('devos_pro_messages', JSON.stringify(updated));
      setActiveMsgId(newMsg.id);

      // Reset Inputs
      setName('');
      setEmail('');
      setSubject('');
      setContent('');
      setIsSending(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Failed to send message', error);
      setSendError('Message could not be sent. Open your first FormSubmit verification email, then try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleDeleteMessage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('devos_pro_messages', JSON.stringify(updated));
    if (activeMsgId === id) {
      setActiveMsgId(updated.length > 0 ? updated[0].id : null);
    }
  };

  const activeMsg = messages.find(m => m.id === activeMsgId);

  return (
    <div className="flex flex-col md:flex-row h-full rounded-xl overflow-hidden text-slate-200 border border-white/6 min-h-[460px]">
      
      {/* Side message list of sent items */}
      <div className="w-full md:w-56 bg-black/60 border-b md:border-b-0 md:border-r border-white/8 flex flex-col shrink-0">
        <header className="h-10 px-3 bg-white/2 border-b border-white/6 flex items-center justify-between text-xs font-mono text-slate-400 select-none">
          <span className="flex items-center gap-1">
            <Inbox size={11} className="text-indigo-400" />
            <span>Outbox / Sent ({messages.length})</span>
          </span>
        </header>

        <div className="flex-1 overflow-y-auto min-h-[110px]">
          {messages.length === 0 ? (
            <div className="p-4 text-center text-[10.5px] text-slate-500 font-sans italic pt-8">
              No correspondence logged.
            </div>
          ) : (
            <div className="divide-y divide-white/4">
              {messages.map((msg) => {
                const isActive = msg.id === activeMsgId;
                return (
                  <div
                    key={msg.id}
                    onClick={() => setActiveMsgId(msg.id)}
                    className={`p-3 text-left transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-indigo-500/15 border-l-2 border-indigo-400' 
                        : 'hover:bg-white/2 bg-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-baseline text-[10px] font-mono mb-1">
                      <span className="font-bold text-neutral-100 truncate max-w-[90px]">{msg.senderName}</span>
                      <span className="text-slate-500 text-[8.5px]">{msg.timestamp}</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-200 truncate block">
                      {msg.subject}
                    </span>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5 max-w-[170px] line-clamp-1">
                      {msg.content}
                    </p>
                    <div className="flex justify-end mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => handleDeleteMessage(msg.id, e)}
                        className="p-1 text-slate-500 hover:text-rose-400 cursor-pointer"
                        title="Delete log"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Message Reader / Compose Form */}
      <div className="flex-1 flex flex-col bg-[#0b0c0f]/95">
        
        {/* Actions for currently selected log */}
        <header className="h-10 px-4 bg-white/2 border-b border-white/6 flex items-center justify-between text-xs font-mono select-none">
          <span className="text-slate-400">Correspondence Inspector</span>
          {activeMsgId && (
            <button
              onClick={(e) => handleDeleteMessage(activeMsgId, e)}
              className="p-1 px-2.5 rounded bg-rose-500/10 border border-rose-500/25 hover:bg-rose-500/20 text-rose-300 flex items-center gap-1 text-[10px] cursor-pointer"
            >
              <Trash2 size={11} />
              <span>Delete logs</span>
            </button>
          )}
        </header>

        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          
          {/* Active Correspondence Render */}
          {activeMsg ? (
            <div className="p-4 rounded-xl border border-white/6 bg-white/1 space-y-3.5 animate-fade-in text-left">
              <div className="border-b border-white/6 pb-2.5 space-y-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs font-mono">
                  <div>
                    <span className="text-slate-400">From: </span>
                    <strong className="text-white">{activeMsg.senderName}</strong>
                    <span className="text-slate-400 text-[10px]"> &lt;{activeMsg.senderEmail}&gt;</span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 sm:mt-0">{activeMsg.timestamp}</span>
                </div>
                <div className="text-xs.5 font-sans font-extrabold text-neutral-100 pt-1">
                  Subject: {activeMsg.subject}
                </div>
              </div>

              <div className="text-xs font-sans text-slate-300 leading-relaxed whitespace-pre-line bg-black/20 p-3 rounded border border-white/4">
                {activeMsg.content}
              </div>
            </div>
          ) : (
            <div className="h-28 flex items-center justify-center text-slate-500 text-xs italic font-sans">
              Empty correspondence reader. Write a log below to launch records.
            </div>
          )}

          {/* New Message Form */}
          <div className="pt-4 border-t border-white/6 text-left">
            <h3 className="text-xs font-mono font-bold text-slate-400 mb-3 flex items-center gap-1.5 select-none">
              <Mail size={12} className="text-primary" />
              <span>Send New Message to Bijendra</span>
            </h3>

            <form onSubmit={handleSendMessage} className="space-y-3.5 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-[10.5px] font-mono text-slate-400 select-none">Your Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-black/40 border border-white/8 p-2 rounded outline-none placeholder-slate-700 text-slate-200 focus:border-indigo-400"
                    placeholder="E.g. Elon Musk"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10.5px] font-mono text-slate-400 select-none">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-black/40 border border-white/8 p-2 rounded outline-none placeholder-slate-700 text-slate-200 focus:border-indigo-400"
                    placeholder="E.g. elon@spacex.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10.5px] font-mono text-slate-400 select-none">Subject Header</label>
                <input
                  type="text"
                  required
                  className="w-full bg-black/40 border border-white/8 p-2 rounded outline-none placeholder-slate-700 text-slate-200 focus:border-indigo-400"
                  placeholder="E.g. Synergy collaboration on Tremor control..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10.5px] font-mono text-slate-400 select-none">Message Body Content</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-black/40 border border-white/8 p-2 rounded outline-none placeholder-slate-700 text-slate-200 resize-none focus:border-indigo-400"
                  placeholder="Type details..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between gap-4 select-none">
                {/* Visual send state feedback */}
                {showSuccess ? (
                  <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded border border-emerald-500/25">
                    <Check size={11} className="stroke-[3]" />
                    <span>Message sent to my Gmail inbox.</span>
                  </span>
                ) : (
                  <span className="text-[9.5px] font-mono text-slate-500 italic">
                    Free FormSubmit relay sends to Gmail and mirrors this local outbox.
                  </span>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="px-5 py-2.5 rounded-lg bg-indigo-500 hover:bg-opacity-95 text-slate-950 font-mono text-xs font-black transition flex items-center gap-1.5 shrink-0 hover:glow-primary disabled:opacity-40 cursor-pointer"
                >
                  {isSending ? (
                    <>
                      <Sparkles size={12} className="animate-spin" />
                      <span>Transmitting logs...</span>
                    </>
                  ) : (
                    <>
                      <SendHorizontal size={12} />
                      <span>Transmit Mail Logs</span>
                    </>
                  )}
                </button>
              </div>

              {sendError && (
                <div className="text-[10px] font-mono text-rose-300 bg-rose-500/10 border border-rose-500/25 rounded px-3 py-2">
                  {sendError}
                </div>
              )}
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}
