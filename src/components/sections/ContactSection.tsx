import { useState } from 'react';
import { Mail, MessageSquare, Send, Info } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-white">Contact</h2>
        <p className="text-sm text-slate-500">Get in touch with the UrjaGrid team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Contact Information" icon={<Mail className="w-4 h-4" />}>
          <div className="flex flex-col gap-4 py-1">
            <div className="flex items-start gap-3 p-3.5 bg-slate-800/40 rounded-lg border border-slate-800">
              <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">Contact information coming soon</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Official contact details will be published here once available. In the meantime, the form below
                  provides a UI for future integration with an email or messaging backend.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3.5 bg-slate-800/40 rounded-lg border border-slate-800">
              <Mail className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-white">Email</h4>
                <p className="text-xs text-slate-500">To be announced</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3.5 bg-slate-800/40 rounded-lg border border-slate-800">
              <MessageSquare className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-white">Support</h4>
                <p className="text-xs text-slate-500">To be announced</p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Send a Message" subtitle="Form UI — not yet connected to a backend" icon={<Send className="w-4 h-4" />}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setName('');
              setEmail('');
              setMessage('');
            }}
            className="flex flex-col gap-3"
          >
            <div>
              <label className="text-xs text-slate-400 font-medium mb-1.5 block">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-3 py-2 text-sm bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-3 py-2 text-sm bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium mb-1.5 block">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message..."
                rows={4}
                className="w-full px-3 py-2 text-sm bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 resize-none"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/20 transition-colors"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
            <p className="text-xs text-slate-600 text-center">
              This form is a UI placeholder. Messages are not sent until a backend is connected.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
