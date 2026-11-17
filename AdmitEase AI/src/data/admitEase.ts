// AdmitEase reply engine — grounded in the structured knowledge base.
// Demonstrates a knowledge-based mode (no live LLM connection configured).
// When an API key / model connection is available, replace generateReply
// with a secure server-side integration that sends this KB + instructions.

import {
  ADMISSION,
  APPLICATION,
  ASSISTANT,
  ESCALATION,
  FEES,
  PROGRAMMES,
  UNIVERSITY,
} from './knowledgeBase';

export const SUGGESTED_QUESTIONS = [
  'What programmes does Westbridge offer?',
  'What is the minimum UTME score?',
  'What are the subject requirements for Computer Science?',
  'Can I use two O\u2019Level sittings?',
  'When does the application open and close?',
  'How much is the application fee?',
  'What documents do I need to apply?',
  'How much is tuition?',
];

const ESCALATION_REFERRAL =
  'For anything requiring official confirmation or individual assistance, please contact the Admissions Office. ' +
  ESCALATION.contactNote;

const FALLBACK =
  "I'm not sure I have that information. I can help with our eight undergraduate programmes, admission requirements, the application process, required documents, fees and deadlines. Could you rephrase, or try one of the suggested questions? " +
  ESCALATION_REFERRAL;

function normalize(s: string): string {
  return s.toLowerCase().replace(/[\u2019']/g, "'").replace(/\s+/g, ' ').trim();
}

function listJoin(items: string[]): string {
  if (items.length <= 1) return items.join('');
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

function bullets(items: string[]): string {
  return items.map((i) => `\u2022 ${i}`).join('\n');
}

// --- Topic matchers -------------------------------------------------------

function matchProgramme(q: string): typeof PROGRAMMES[number] | null {
  for (const p of PROGRAMMES) {
    const key = p.name.toLowerCase();
    if (q.includes(key)) return p;
  }
  // common shorthand
  if (q.includes('computer sci')) return PROGRAMMES[0];
  if (q.includes('software eng')) return PROGRAMMES[1];
  if (q.includes('account')) return PROGRAMMES[2];
  if (q.includes('business')) return PROGRAMMES[3];
  if (q.includes('economics') || q.includes('econ ')) return PROGRAMMES[4];
  if (q.includes('political') || q.includes('political sci')) return PROGRAMMES[5];
  if (q.includes('mass comm')) return PROGRAMMES[6];
  if (q.includes('biochem')) return PROGRAMMES[7];
  return null;
}

function isProgrammeOfferedListQuery(q: string): boolean {
  return (
    (q.includes('program') || q.includes('course') || q.includes('offer') || q.includes('study')) &&
    (q.includes('what') || q.includes('list') || q.includes('available') || q.includes('offer') || q.includes('have'))
  );
}

function isProgrammeCountQuery(q: string): boolean {
  return (q.includes('how many') && (q.includes('program') || q.includes('course')));
}

function isMinUtmeQuery(q: string): boolean {
  return (
    (q.includes('utme') || q.includes('jamb') || q.includes('score')) &&
    (q.includes('minimum') || q.includes('cut') || q.includes('mark') || q.includes('required') || q.includes('what') || q.includes('qualify'))
  );
}

function isBelowMinQuery(q: string): boolean {
  return (q.includes('below') || q.includes('less than') || q.includes('under')) && (q.includes('160') || q.includes('utme') || q.includes('score'));
}

function isSittingsQuery(q: string): boolean {
  return q.includes('sitting') || (q.includes('two') && (q.includes('result') || q.includes('o level') || q.includes('olevel')));
}

function isEnglishCompulsoryQuery(q: string): boolean {
  return q.includes('english') && (q.includes('compulsory') || q.includes('required') || q.includes('need'));
}

function isGuaranteeQuery(q: string): boolean {
  return q.includes('guarantee') || (q.includes('meeting') && q.includes('requirement')) || q.includes('admission guaranteed');
}

function isProgrammeSubjectQuery(q: string): boolean {
  return (
    (q.includes('subject') || q.includes('combination') || q.includes('requirement')) &&
    (q.includes('o level') || q.includes('olevel') || q.includes('utme') || q.includes('jamb'))
  );
}

function isApplicationOpenQuery(q: string): boolean {
  return (q.includes('open') || q.includes('start') || q.includes('when')) && (q.includes('application') || q.includes('apply') || q.includes('register'));
}

function isDeadlineQuery(q: string): boolean {
  return q.includes('deadline') || q.includes('close') || q.includes('closing') || (q.includes('when') && q.includes('end'));
}

function isAppFeeQuery(q: string): boolean {
  return q.includes('application fee') || (q.includes('how much') && (q.includes('apply') || q.includes('application')));
}

function isTuitionQuery(q: string): boolean {
  return q.includes('tuition') || (q.includes('how much') && (q.includes('school') || q.includes('fee') || q.includes('program')));
}

function isOtherFeesQuery(q: string): boolean {
  return (
    q.includes('acceptance') || q.includes('accommodation') || q.includes('hostel') ||
    q.includes('departmental') || q.includes('laboratory') || q.includes('lab fee') ||
    q.includes('examination fee') || q.includes('registration fee') || q.includes('other fee') || q.includes('other charge')
  );
}

function isDocumentsQuery(q: string): boolean {
  return q.includes('document') || q.includes('what do i need') || q.includes('required to apply') || q.includes('need to apply');
}

function isHowToApplyQuery(q: string): boolean {
  return (q.includes('how') && (q.includes('apply') || q.includes('application'))) || q.includes('application process') || q.includes('how do i apply');
}

function isApplyThroughAssistantQuery(q: string): boolean {
  return (q.includes('apply') || q.includes('submit')) && (q.includes('through you') || q.includes('through admitease') || q.includes('can you') || q.includes('via you') || q.includes('chatbot'));
}

function isPayThroughAssistantQuery(q: string): boolean {
  return (q.includes('pay') || q.includes('payment')) && (q.includes('through you') || q.includes('through admitease') || q.includes('can you') || q.includes('assistant'));
}

function isAdmissionStatusQuery(q: string): boolean {
  return q.includes('admission status') || q.includes('check my admission') || q.includes('have i been admitted') || q.includes('am i admitted') || q.includes('my application') || q.includes('my admission');
}

function isScreeningQuery(q: string): boolean {
  return q.includes('screening') || q.includes('post utme') || q.includes('post-utme') || q.includes('screening date');
}

function isAdmissionListQuery(q: string): boolean {
  return q.includes('admission list') || q.includes('admission list') || q.includes('when will admission') || q.includes('admission released');
}

function isContactQuery(q: string): boolean {
  return q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('address') || q.includes('reach') || q.includes('helpline') || q.includes('office');
}

function isLocationQuery(q: string): boolean {
  return q.includes('where') && (q.includes('located') || q.includes('location') || q.includes('address') || q.includes('campus'));
}

function isPrivatePublicQuery(q: string): boolean {
  return q.includes('private') || q.includes('public');
}

function isDurationQuery(q: string): boolean {
  return q.includes('how long') || q.includes('duration') || q.includes('years');
}

function isPostgraduateQuery(q: string): boolean {
  return q.includes('postgraduate') || q.includes('masters') || q.includes('phd') || q.includes('pgd');
}

function isProgrammeChangeQuery(q: string): boolean {
  return q.includes('change') && (q.includes('program') || q.includes('course'));
}

function isAboutUniversity(q: string): boolean {
  return (
    (q.includes('what is') && q.includes('westbridge')) ||
    (q.includes('about') && q.includes('university')) ||
    (q.includes('tell me') && q.includes('university'))
  );
}

function isVisionMissionQuery(q: string): boolean {
  return q.includes('vision') || q.includes('mission') || q.includes('values') || q.includes('aim') || q.includes('goal');
}

function isSensitiveInfoSharing(q: string): boolean {
  return q.includes('password') || q.includes('card number') || q.includes('pin') || q.includes('bank detail') || q.includes('cvv');
}

// --- Reply generators -----------------------------------------------------

function programmeListReply(): string {
  const names = PROGRAMMES.map((p) => p.name);
  return `Westbridge University offers eight undergraduate programmes across four faculties:\n\n${bullets(names)}\n\nEach programme runs for four years. Would you like the admission requirements for any of these?`;
}

function programmeDetailReply(p: typeof PROGRAMMES[number]): string {
  return `${p.name} (${p.faculty})\n\n${p.description}\n\nProgramme duration: ${p.duration}.\n\nO'Level requirements (five credits):\n${bullets(p.oLevel)}\n\nUTME subjects:\n${bullets(p.utme)}`;
}

function programmeSubjectReply(p: typeof PROGRAMMES[number]): string {
  return `Here are the admission requirements for ${p.name}:\n\nO'Level (five credit passes):\n${bullets(p.oLevel)}\n\nUTME subjects:\n${bullets(p.utme)}\n\n${ADMISSION.notGuaranteedText}`;
}

function generalAdmissionReply(): string {
  return `Here are the general admission requirements for the ${ADMISSION.session} session:\n\n${bullets([
    `Minimum UTME score of ${ADMISSION.minUtme}`,
    ...ADMISSION.generalOLevel,
  ])}\n\nEach programme also has specific O'Level and UTME subject combinations. ${ADMISSION.notGuaranteedText}`;
}

function applicationTimelineReply(): string {
  return `For the ${ADMISSION.session} session:\n\n${bullets([
    `Applications open: ${APPLICATION.openingDate}`,
    `Application deadline: ${APPLICATION.deadline}`,
    `Application fee: ${APPLICATION.fee}`,
  ])}\n\nPlease note: there is no live application portal yet. ${APPLICATION.noLivePortal}`;
}

function howToApplyReply(): string {
  const steps = APPLICATION.steps.map((s, i) => `${i + 1}. ${s.title} \u2014 ${s.text}`);
  return `Here is how to apply to Westbridge University for the ${ADMISSION.session} session:\n\n${steps.join('\n\n')}\n\n${APPLICATION.assistantCannotApply} ${ESCALATION_REFERRAL}`;
}

function documentsReply(): string {
  return `You will need the following for your application:\n\n${bullets(APPLICATION.requiredDocuments)}\n\nMake sure your information is accurate and your documents are readable.`;
}

function tuitionReply(): string {
  return `${FEES.tuitionStatus} Please contact the Admissions Office for clarification. ${ESCALATION.contactNote}`;
}

function otherFeesReply(topic: string): string {
  const label = topic === 'acceptance' ? 'acceptance fee' : topic === 'hostel' ? 'accommodation fee' : `${topic} fee`;
  return `The ${label} has not yet been provided in the current sample university information. I cannot provide estimated amounts. Please contact the Admissions Office for further information. ${ESCALATION.contactNote}`;
}

// --- Main entry -----------------------------------------------------------

export function generateReply(question: string): string {
  const q = normalize(question);

  if (!q) {
    return "Could you share your question? I can help with programmes, admission requirements, the application process, required documents, fees and deadlines.";
  }

  // Safety: applicant sharing sensitive info
  if (isSensitiveInfoSharing(q)) {
    return ESCALATION.sensitiveInfoWarning;
  }

  // Programme-specific subject/requirement queries (check before general)
  const programme = matchProgramme(q);
  if (programme && (isProgrammeSubjectQuery(q) || q.includes('requirement') || q.includes('subject') || q.includes('combination') || q.includes('utme') || q.includes('o level') || q.includes('olevel') || q.includes('jamb'))) {
    return programmeSubjectReply(programme);
  }

  // Programme detail query (mentions programme name with what/about)
  if (programme && (q.includes('what is') || q.includes('about') || q.includes('tell me') || q.includes('detail'))) {
    return programmeDetailReply(programme);
  }

  // Programme offering list
  if (isProgrammeOfferedListQuery(q) || isProgrammeCountQuery(q)) {
    return programmeListReply();
  }

  // UTME score
  if (isBelowMinQuery(q)) {
    return `${ADMISSION.belowMinText} ${ADMISSION.notGuaranteedText}`;
  }
  if (isMinUtmeQuery(q)) {
    return `The sample minimum UTME score for the ${ADMISSION.session} admission session is ${ADMISSION.minUtme}. Applicants must also satisfy the subject requirements for their chosen programme. ${ADMISSION.notGuaranteedText}`;
  }

  // Sittings
  if (isSittingsQuery(q)) {
    return `Yes. Westbridge University's sample admission policy accepts O'Level results from a maximum of two sittings. Results from WAEC, NECO and NABTEB are accepted, subject to verification.`;
  }

  // English compulsory
  if (isEnglishCompulsoryQuery(q)) {
    return `Yes. English Language is compulsory for all undergraduate programmes at Westbridge University.`;
  }

  // Guarantee
  if (isGuaranteeQuery(q)) {
    return ADMISSION.notGuaranteedText;
  }

  // General admission requirements (when not programme-specific)
  if ((q.includes('requirement') || q.includes('eligib') || q.includes('qualif') || q.includes('o level') || q.includes('olevel') || q.includes('admission requirement')) && !programme) {
    return generalAdmissionReply();
  }

  // Application timeline
  if (isApplicationOpenQuery(q) && !isDeadlineQuery(q)) {
    return `Applications for the ${ADMISSION.session} session open on ${APPLICATION.openingDate}. The application deadline is ${APPLICATION.deadline}, and the application fee is ${APPLICATION.fee}. ${APPLICATION.noLivePortal}`;
  }
  if (isDeadlineQuery(q)) {
    return `The application deadline for the ${ADMISSION.session} session is ${APPLICATION.deadline}. Applications open on ${APPLICATION.openingDate}. ${APPLICATION.noLivePortal}`;
  }

  // Fees
  if (isAppFeeQuery(q)) {
    return `The application fee for the ${ADMISSION.session} session is ${APPLICATION.fee}. ${APPLICATION.feeNote} ${APPLICATION.assistantCannotPay}`;
  }
  if (isTuitionQuery(q)) {
    return tuitionReply();
  }
  if (isOtherFeesQuery(q)) {
    const topicMatch = q.match(/(acceptance|accommodation|hostel|departmental|laboratory|lab|examination|registration)/);
    const topic = topicMatch ? topicMatch[0] : 'fee';
    return otherFeesReply(topic);
  }
  if (q.includes('fee') || q.includes('fees') || q.includes('how much')) {
    return `Here is what I can confirm about fees:\n\n${bullets([
      `Application fee: ${APPLICATION.fee}`,
      'Tuition fees: not yet published',
      'Other charges (acceptance, accommodation, etc.): not yet provided',
    ])}\n\n${APPLICATION.assistantCannotPay}`;
  }

  // Documents
  if (isDocumentsQuery(q)) {
    return documentsReply();
  }

  // How to apply
  if (isHowToApplyQuery(q)) {
    return howToApplyReply();
  }

  // Apply through assistant
  if (isApplyThroughAssistantQuery(q)) {
    return APPLICATION.assistantCannotApply;
  }

  // Pay through assistant
  if (isPayThroughAssistantQuery(q)) {
    return APPLICATION.assistantCannotPay;
  }

  // Admission status
  if (isAdmissionStatusQuery(q)) {
    return `I'm not able to access individual application records or check admission status. Only the university's authorised admissions process can confirm admission. Please monitor official university communication channels or contact the Admissions Office. ${ESCALATION.contactNote}`;
  }

  // Screening
  if (isScreeningQuery(q)) {
    return `No confirmed screening dates are currently available in the sample university information. Please refer to official university communication channels for updates. ${ESCALATION.contactNote}`;
  }

  // Admission list
  if (isAdmissionListQuery(q)) {
    return `No confirmed admission list publication date is available in the current sample university information. Please refer to official university communication channels for updates. ${ESCALATION.contactNote}`;
  }

  // Contact
  if (isContactQuery(q)) {
    return ESCALATION.contactNote;
  }

  // Location
  if (isLocationQuery(q)) {
    return `${UNIVERSITY.name} is located in ${UNIVERSITY.location}. A specific campus street address has not been provided.`;
  }

  // Private/public
  if (isPrivatePublicQuery(q)) {
    return `${UNIVERSITY.name} is presented as a private university in this project.`;
  }

  // Duration
  if (isDurationQuery(q)) {
    return `All eight undergraduate programmes at Westbridge University have a duration of four years.`;
  }

  // Postgraduate
  if (isPostgraduateQuery(q)) {
    return UNIVERSITY.postgraduate;
  }

  // Programme change
  if (isProgrammeChangeQuery(q)) {
    return `The procedure for changing a selected programme has not been provided in the current sample university information. Please contact the Admissions Office. ${ESCALATION.contactNote}`;
  }

  // About the university
  if (isAboutUniversity(q)) {
    return `${UNIVERSITY.name} is a fictional private university located in ${UNIVERSITY.location}. It offers eight undergraduate programmes across four faculties, built around three principles: ${listJoin(UNIVERSITY.principles)}. ${UNIVERSITY.disclaimer}`;
  }

  // Vision/mission
  if (isVisionMissionQuery(q)) {
    return `Vision: ${UNIVERSITY.vision}\n\nMission: ${UNIVERSITY.mission}`;
  }

  // Greetings
  if (q === 'hi' || q === 'hello' || q === 'hey' || q.includes('good morning') || q.includes('good afternoon') || q.includes('good evening')) {
    return `Hello! I'm ${ASSISTANT.name}, the admission enquiry assistant for ${UNIVERSITY.name}. I can help with programmes, admission requirements, the application process, required documents, fees and deadlines. What would you like to know?`;
  }

  // Thanks
  if (q.includes('thank') || q.includes('thanks')) {
    return `You're welcome! Feel free to ask if you have any other questions about programmes or admissions.`;
  }

  return FALLBACK;
}
