import {
  CalendarDays,
  ClipboardList,
  FileCheck2,
  MessageCircle,
  Sparkles,
  Compass,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProgrammesGrid from '@/components/ProgrammesGrid';
import FloatingChat from '@/components/FloatingChat';
import { ChatUIProvider, useChatUI } from '@/components/chatUIContext';
import { APPLICATION, ADMISSION } from '@/data/knowledgeBase';

export default function App() {
  return (
    <ChatUIProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Hero />

          {/* About */}
          <section id="about" className="relative overflow-hidden border-b border-navy-100 bg-white py-24 sm:py-32">
            <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/3 -translate-y-1/3 rounded-full bg-gold-50" />
            <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
              <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-5">
                  <SectionLabel>About Westbridge</SectionLabel>
                  <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-navy-900 sm:text-4xl text-balance">
                    A young university with an old-fashioned commitment to its students.
                  </h2>
                </div>
                <div className="space-y-5 text-base leading-relaxed text-navy-700 lg:col-span-7">
                  <p>
                    Westbridge University is a fictional private university in Lagos,
                    Nigeria, created to explore what a thoughtful undergraduate experience
                    could look like. It offers eight programmes across four faculties,
                    built around three principles: Knowledge, Character and Opportunity.
                  </p>
                  <p>
                    Every programme shares a common foundation before branching into its
                    discipline, and each runs for four years. The idea is simple — small
                    enough to be known by name, rigorous enough to be worth the journey.
                  </p>
                  <p>
                    This website is a demonstration. The university, its programmes and all
                    details here are sample information developed for testing purposes.
                  </p>
                  <div className="grid gap-4 pt-4 sm:grid-cols-3">
                    {[
                      { icon: Compass, title: 'Knowledge', text: 'A clear foundation in every programme.' },
                      { icon: ShieldCheck, title: 'Character', text: 'Honesty, accountability and ethics.' },
                      { icon: Sparkles, title: 'Opportunity', text: 'Practical learning that opens doors.' },
                    ].map((v) => (
                      <div key={v.title} className="rounded-xl border border-navy-100 bg-navy-50/40 p-4">
                        <v.icon className="h-5 w-5 text-gold-500" />
                        <p className="mt-2.5 font-semibold text-navy-900">{v.title}</p>
                        <p className="mt-1 text-sm text-navy-600">{v.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Programmes */}
          <section id="programmes" className="border-b border-navy-100 bg-navy-50/50 py-24 sm:py-32">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <SectionLabel center>Undergraduate programmes</SectionLabel>
                <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-navy-900 sm:text-4xl text-balance">
                  Eight programmes, each built on a clear foundation.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-navy-600">
                  Each programme runs for four years across four faculties. Choose the one
                  that fits where you want to go.
                </p>
              </div>
              <div className="mt-14">
                <ProgrammesGrid />
              </div>
            </div>
          </section>

          {/* Admissions */}
          <section id="admissions" className="relative overflow-hidden border-b border-navy-100 bg-white py-24 sm:py-32">
            <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-navy-50" />
            <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
              <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-5">
                  <SectionLabel>Admissions</SectionLabel>
                  <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-navy-900 sm:text-4xl text-balance">
                    Applications for the 2027/2028 session open 1 March 2027.
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-navy-600">
                    We welcome applicants who have completed their secondary education and
                    meet the entry requirements for their chosen programme. The process is
                    straightforward, and AdmitEase is happy to help along the way.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-navy-50 px-4 py-2 text-sm font-medium text-navy-800">
                      <CalendarDays className="h-4 w-4 text-gold-600" />
                      Opens {APPLICATION.openingDate}
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-navy-50 px-4 py-2 text-sm font-medium text-navy-800">
                      <CalendarDays className="h-4 w-4 text-gold-600" />
                      Closes {APPLICATION.deadline}
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-gold-100 px-4 py-2 text-sm font-medium text-gold-800">
                      Fee {APPLICATION.fee}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <ol className="relative space-y-8 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-navy-200">
                    {[
                      {
                        icon: ClipboardList,
                        title: 'Choose a programme & check eligibility',
                        text: 'Review the eight programmes, then confirm you meet the minimum UTME score of 160, five relevant O\u2019Level credits, and your programme\u2019s subject requirements.',
                      },
                      {
                        icon: FileCheck2,
                        title: 'Prepare your documents',
                        text: 'Gather your passport photograph, UTME result, O\u2019Level result, valid email, active phone number and personal information.',
                      },
                      {
                        icon: MessageCircle,
                        title: 'Apply through the official channel',
                        text: 'When an official application channel becomes available, complete your application, pay the \u20A625,000 fee, and submit before the deadline.',
                      },
                    ].map((step, i) => (
                      <li key={step.title} className="relative flex gap-5">
                        <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-navy-200 bg-white text-navy-900">
                          <step.icon className="h-5 w-5" />
                        </div>
                        <div className="pt-1">
                          <span className="font-mono text-xs font-medium text-gold-600">
                            Step {String(i + 1).padStart(2, '0')}
                          </span>
                          <h3 className="font-serif text-lg font-semibold text-navy-900">
                            {step.title}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-navy-600">
                            {step.text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-10 rounded-2xl border border-gold-200 bg-gold-50 p-5">
                    <p className="text-sm leading-relaxed text-gold-900">
                      <strong className="font-semibold">Please note:</strong> Westbridge
                      University is a fictional institution created for demonstration. The
                      application fee is separate from tuition, which has not yet been
                      published. There is no live application form yet — applicants should
                      use the official application channel when one becomes available.
                      Meeting minimum requirements does not guarantee admission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AdmitEase CTA */}
          <AdmitEaseCTA />

          {/* Footer */}
          <footer className="border-t border-navy-800 bg-navy-950 py-10">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center sm:px-8">
              <p className="font-serif text-lg font-semibold text-white">Westbridge University</p>
              <p className="max-w-md text-xs leading-relaxed text-navy-400">
                Westbridge University is a fictional institution created for demonstration
                purposes. All information on this page is sample information.
              </p>
              <p className="text-xs text-navy-500">
                © 2027 Westbridge University · Lagos, Nigeria
              </p>
            </div>
          </footer>
        </main>

        <FloatingChat />
      </div>
    </ChatUIProvider>
  );
}

function AdmitEaseCTA() {
  const { open } = useChatUI();
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
        <svg
          className="absolute left-0 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 text-gold-400/5"
          viewBox="0 0 800 800"
          fill="none"
        >
          {[180, 280, 380].map((r) => (
            <circle key={r} cx="400" cy="400" r={r} stroke="currentColor" strokeWidth="1" />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-gold-200">
            <Sparkles className="h-3.5 w-3.5" />
            Meet AdmitEase
          </div>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl text-balance">
            Questions about admissions? Ask AdmitEase.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-200">
            A friendly assistant to help with programmes, admission requirements, the
            application process, fees and deadlines — grounded in Westbridge's official
            information. Click below to start a conversation.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={open}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-7 py-3.5 font-semibold text-navy-900 transition-all hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/20"
            >
              <MessageCircle className="h-4 w-4" />
              Chat with AdmitEase
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-navy-400">
            AdmitEase is a prototype. Its answers are based on the official Westbridge
            University reference documents published on this project. It does not submit
            applications, process payments or access individual records.
          </p>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({
  children,
  center,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-600 ${
        center ? 'justify-center' : ''
      }`}
    >
      <span className="h-px w-6 bg-gold-400" />
      {children}
    </span>
  );
}
