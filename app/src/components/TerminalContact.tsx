import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ChevronRight } from 'lucide-react';

type Step = 'NAME' | 'EMAIL' | 'PHONE' | 'MESSAGE' | 'SENDING' | 'SUCCESS';

const TerminalContact: React.FC = () => {
  const [step, setStep] = useState<Step>('NAME');
  const [inputs, setInputs] = useState({ name: '', email: '', phone: '', message: '' });
  const [currentText, setCurrentText] = useState('');
  const [history, setHistory] = useState<string[]>(['SESSION_INITIALIZED: SUCCESS', 'LOG: OPERATOR_VERIFIED // JAYDEV_GAUDANI']);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentText.trim()) {
      processInput(currentText.trim());
      setCurrentText('');
    }
  };

  const processInput = (val: string) => {
    const newHistory = [...history, `> ${val}`];
    
    if (step === 'NAME') {
      setInputs(prev => ({ ...prev, name: val }));
      setHistory([...newHistory, 'LOG: USER_IDENTIFIED', 'INPUT_REQUIRED: EMAIL_ADDRESS']);
      setStep('EMAIL');
    } else if (step === 'EMAIL') {
      // Email Validation Regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        setHistory([...newHistory, 'ERROR: INVALID_EMAIL_FORMAT', 'RETRY_INPUT: EMAIL_ADDRESS']);
        return;
      }
      setInputs(prev => ({ ...prev, email: val }));
      setHistory([...newHistory, 'LOG: EMAIL_VERIFIED', 'INPUT_REQUIRED: CONTACT_NUMBER']);
      setStep('PHONE');
    } else if (step === 'PHONE') {
      // High-Entropy Phone Validation
      const phoneRegex = /^\+?[\d\s-]{10,14}$/;
      const digitsOnly = val.replace(/\D/g, '');
      
      const isSequential = (s: string) => "01234567890123456789".includes(s) || "98765432109876543210".includes(s);
      const isRepetitive = (s: string) => /^(\d)\1+$/.test(s);

      if (!phoneRegex.test(val) || digitsOnly.length < 10) {
        setHistory([...newHistory, 'ERROR: INVALID_LENGTH_OR_FORMAT', 'RETRY_INPUT: CONTACT_NUMBER']);
        return;
      }
      
      if (isSequential(digitsOnly) || isRepetitive(digitsOnly)) {
        setHistory([...newHistory, 'ERROR: LOW_ENTROPY_DETECTED', 'WARNING: DUMMY_SEQUENCE_REJECTED', 'RETRY_INPUT: CONTACT_NUMBER']);
        return;
      }

      setInputs(prev => ({ ...prev, phone: val }));
      setHistory([...newHistory, 'LOG: CONTACT_IDENTITY_SECURED', 'INPUT_REQUIRED: MESSAGE_PAYLOAD']);
      setStep('MESSAGE');
    } else if (step === 'MESSAGE') {
      const finalInputs = { ...inputs, message: val };
      setInputs(finalInputs);
      setHistory([...newHistory, 'LOG: PAYLOAD_RECEIVED', 'INITIATING_SECURE_TRANSMIT...']);
      setStep('SENDING');
      
      // REAL TRANSMISSION TO GOOGLE APPS SCRIPT
      fetch('https://script.google.com/macros/s/AKfycbzY4L3bl1m1Plqem3g_sXAIjRx0stWRj_jEGkz-lI3q3lEjMVGuBD2Ym9A5fNrBS6FqZQ/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalInputs),
      })
      .then(() => {
        setHistory(prev => [...prev, 'STATUS: SUCCESS_200', 'SIGNAL: TRANSMISSION_COMPLETE']);
        setStep('SUCCESS');
      })
      .catch((err) => {
        setHistory(prev => [...prev, 'STATUS: ERROR_500', `SIGNAL: ${err.message.toUpperCase()}`]);
        setStep('MESSAGE');
      });
    }
  };

  return (
    <div className="w-full bg-black/80 rounded-lg border border-white/10 overflow-hidden font-mono text-sm shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-primary" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
            OPR: J_GAUDANI // LIQUID_ARCHITECT_V1.0
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-primary/40" />
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-6 h-[320px] overflow-y-auto flex flex-col gap-1 custom-scrollbar scroll-smooth">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('>') ? "text-primary italic" : "text-gray-500"}>
            {line}
          </div>
        ))}

        {step !== 'SENDING' && step !== 'SUCCESS' && (
          <div className="flex items-center gap-2 text-white mt-2">
            <span className="text-primary font-bold">
              {step === 'NAME' ? 'USER_NAME' : step === 'EMAIL' ? 'USR_EMAIL' : step === 'PHONE' ? 'USR_PHONE' : 'MESSAGE'}
            </span>
            <ChevronRight size={14} className="text-gray-600" />
            <input
              ref={inputRef}
              type="text"
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none flex-1 text-white caret-primary"
              spellCheck={false}
              autoFocus
            />
          </div>
        )}

        {step === 'SUCCESS' && (
          <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded">
            <p className="text-primary font-black uppercase tracking-tighter text-base">
              SYSTEM: MESSAGE RECEIVED. WE WILL REESTABLISH CONTACT SOON.
            </p>
            <button 
              onClick={() => {
                setHistory(['SESSION_INITIALIZED: REBOOT']);
                setStep('NAME');
              }}
              aria-label="Reinitialize terminal session"
              className="mt-3 text-[10px] text-primary/60 underline underline-offset-4 hover:text-primary transition-colors"
            >
              // REINITIALIZE_SESSION
            </button>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-white/5 px-4 py-1.5 flex items-center justify-between opacity-50">
        <span className="text-[9px] uppercase tracking-tighter">
          LOC: 127.0.0.1 // ENC: AES-256
        </span>
        <div className="flex items-center gap-2">
           <div className={`w-1.5 h-1.5 rounded-full ${step === 'SENDING' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
           <span className="text-[9px] uppercase tracking-tighter">
            NODE_STABLE
           </span>
        </div>
      </div>
    </div>
  );
};

export default TerminalContact;
