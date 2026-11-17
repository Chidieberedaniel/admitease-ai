// Structured knowledge base for AdmitEase AI.
// Source of truth: the seven official Westbridge University reference documents.
// Maintained here as typed data so it can be updated without rewriting the chatbot.

export const UNIVERSITY = {
  name: 'Westbridge University',
  type: 'Fictional private university',
  location: 'Lagos State, Nigeria',
  principles: ['Knowledge', 'Character', 'Opportunity'],
  vision:
    'To become a recognised centre of academic excellence, innovation and responsible leadership, producing graduates equipped to contribute meaningfully to society.',
  mission:
    'To provide quality, student-centred education that develops knowledgeable, ethical and innovative graduates through academic excellence, practical learning and personal development.',
  values: [
    { name: 'Academic Excellence', text: 'Encouraging high academic standards, curiosity and continuous learning.' },
    { name: 'Integrity', text: 'Promoting honesty, accountability and ethical conduct.' },
    { name: 'Innovation', text: 'Encouraging creativity, critical thinking and problem-solving.' },
    { name: 'Inclusiveness', text: 'Creating a respectful and supportive learning environment.' },
    { name: 'Leadership', text: 'Developing responsible individuals who can positively influence their communities.' },
    { name: 'Service', text: 'Encouraging students to contribute meaningfully to society.' },
  ],
  faculties: [
    'Faculty of Computing and Technology',
    'Faculty of Management and Social Sciences',
    'Faculty of Communication and Humanities',
    'Faculty of Science',
  ],
  programmeDuration: '4 years (all eight programmes)',
  postgraduate: 'Postgraduate programmes are not included in the current sample programme catalogue.',
  disclaimer:
    'Westbridge University is a fictional institution created for this project. All institutional details are sample information for demonstration and testing purposes.',
};

export type Programme = {
  name: string;
  faculty: string;
  icon:
    | 'Cpu' | 'Code2' | 'Calculator' | 'Briefcase'
    | 'TrendingUp' | 'Landmark' | 'Radio' | 'FlaskConical';
  description: string;
  duration: string;
  oLevel: string[];
  utme: string[];
};

export const PROGRAMMES: Programme[] = [
  {
    name: 'Computer Science',
    faculty: 'Faculty of Computing and Technology',
    icon: 'Cpu',
    description:
      'Computer Science focuses on the principles of computing, software development, programming, data management and computational problem-solving.',
    duration: '4 years',
    oLevel: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'One other relevant subject'],
    utme: ['English Language', 'Mathematics', 'Physics', 'One relevant science subject'],
  },
  {
    name: 'Software Engineering',
    faculty: 'Faculty of Computing and Technology',
    icon: 'Code2',
    description:
      'Software Engineering focuses on the design, development, testing and maintenance of software applications and systems.',
    duration: '4 years',
    oLevel: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'One other relevant subject'],
    utme: ['English Language', 'Mathematics', 'Physics', 'One relevant science subject'],
  },
  {
    name: 'Accounting',
    faculty: 'Faculty of Management and Social Sciences',
    icon: 'Calculator',
    description:
      'Accounting focuses on financial information, reporting, auditing, taxation and financial management.',
    duration: '4 years',
    oLevel: ['English Language', 'Mathematics', 'Economics', 'Two other relevant subjects'],
    utme: ['English Language', 'Mathematics', 'Economics', 'One other relevant subject'],
  },
  {
    name: 'Business Administration',
    faculty: 'Faculty of Management and Social Sciences',
    icon: 'Briefcase',
    description:
      'Business Administration provides an understanding of how organisations operate, manage resources and achieve business objectives.',
    duration: '4 years',
    oLevel: ['English Language', 'Mathematics', 'Economics', 'Two other relevant subjects'],
    utme: ['English Language', 'Mathematics', 'Economics', 'One other relevant subject'],
  },
  {
    name: 'Economics',
    faculty: 'Faculty of Management and Social Sciences',
    icon: 'TrendingUp',
    description:
      'Economics examines how individuals, businesses and governments make decisions about resources, production, distribution and consumption.',
    duration: '4 years',
    oLevel: ['English Language', 'Mathematics', 'Economics', 'Two other relevant subjects'],
    utme: ['English Language', 'Mathematics', 'Economics', 'One other relevant subject'],
  },
  {
    name: 'Political Science',
    faculty: 'Faculty of Management and Social Sciences',
    icon: 'Landmark',
    description:
      'Political Science examines political institutions, government systems, public policies and relationships between individuals, societies and political organisations.',
    duration: '4 years',
    oLevel: ['English Language', 'Mathematics', 'Government', 'Two other relevant subjects'],
    utme: ['English Language', 'Government', 'Economics', 'One other relevant subject'],
  },
  {
    name: 'Mass Communication',
    faculty: 'Faculty of Communication and Humanities',
    icon: 'Radio',
    description:
      'Mass Communication focuses on the creation, production and distribution of information through different media channels.',
    duration: '4 years',
    oLevel: ['English Language', 'Literature in English', 'Three other relevant subjects'],
    utme: ['English Language', 'Literature in English', 'Government or History', 'One other relevant subject'],
  },
  {
    name: 'Biochemistry',
    faculty: 'Faculty of Science',
    icon: 'FlaskConical',
    description:
      'Biochemistry explores the chemical processes and biological molecules that support life.',
    duration: '4 years',
    oLevel: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    utme: ['English Language', 'Biology', 'Chemistry', 'Physics'],
  },
];

export const ADMISSION = {
  session: '2027/2028',
  minUtme: 160,
  generalOLevel: [
    'At least five relevant credit passes',
    'English Language is compulsory for all programmes',
    'Mathematics and other relevant subjects depend on the chosen programme',
    'A maximum of two O\'Level sittings is permitted',
    'Accepted examination bodies: WAEC, NECO and NABTEB (subject to verification)',
  ],
  englishCompulsory: true,
  maxSittings: 2,
  meetingMinimumDoesNotGuarantee: true,
  notGuaranteedText:
    'Meeting the minimum UTME score and other admission requirements does not guarantee admission. Final decisions are subject to the university\'s screening and selection process.',
  belowMinText:
    'The sample minimum UTME score is 160. Applicants who score below this threshold do not meet the stated general UTME requirement.',
};

export const APPLICATION = {
  openingDate: '1 March 2027',
  deadline: '30 August 2027',
  fee: '₦25,000',
  feeNote: 'The application fee is separate from tuition fees.',
  noLivePortal:
    'This project does not provide a live application portal. Applicants should use the official application channel when one becomes available.',
  assistantCannotApply:
    'AdmitEase AI provides information and guidance only. It does not accept, process or submit applications.',
  assistantCannotPay:
    'The assistant does not process payments or collect financial information. Applicants should follow verified university payment instructions when available.',
  steps: [
    { title: 'Choose a Programme', text: 'Review the Programme Catalogue and select a preferred programme from the eight available.' },
    { title: 'Check Admission Eligibility', text: 'Confirm you meet the minimum UTME score of 160, have at least five relevant O\'Level credits, and meet your programme\'s subject requirements and the two-sitting limit.' },
    { title: 'Prepare Required Documents', text: 'Gather your passport photograph, UTME result/registration details, O\'Level result, valid email, active phone number, personal information, and any programme-specific documents.' },
    { title: 'Complete the Application', text: 'Provide accurate personal information, UTME details, O\'Level information and select your preferred programme. Review entries before submission.' },
    { title: 'Pay the Application Fee', text: 'The application fee is ₦25,000. Follow verified university payment instructions when an official payment channel becomes available.' },
    { title: 'Review and Submit', text: 'Confirm your personal information, selected programme, examination details, documents and payment before submitting.' },
    { title: 'Await Screening and Admission Updates', text: 'Monitor official university communication channels for screening instructions and admission updates.' },
  ],
  requiredDocuments: [
    'Recent passport photograph',
    'UTME registration details or result',
    'O\'Level result (WAEC, NECO, NABTEB or accepted equivalent)',
    'Valid email address',
    'Active phone number',
    'Personal information',
    'Additional programme-specific documents, where applicable',
  ],
  afterSubmitting: [
    'Keep your application confirmation or reference details',
    'Monitor your registered email and phone number for communication',
    'Follow any screening instructions provided by the university',
    'Check official communication channels for admission updates',
    'Contact the admissions office if you need assistance',
  ],
};

export const FEES = {
  applicationFee: '₦25,000',
  tuitionStatus: 'Tuition fees for the 2027/2028 academic session have not yet been published. This applies to all eight programmes.',
  tuitionNotSameAnswer:
    'The tuition fee structure has not yet been published, so I cannot confirm whether fees differ between programmes.',
  unpublishedCharges: [
    'Acceptance fee',
    'Accommodation fees',
    'Departmental charges',
    'Laboratory fees',
    'Examination fees',
    'Student registration fees',
    'Other additional charges',
  ],
  unpublishedDates: [
    'Post-UTME or admission screening',
    'Screening results',
    'Admission list publication',
    'Acceptance fee payment deadline',
    'Resumption',
    'Registration and orientation',
  ],
};

export const ESCALATION = {
  cannotDo: [
    'submit or process applications',
    'process or verify payments',
    'access individual application records',
    'check admission status',
    'confirm admission decisions',
    'verify documents',
  ],
  contactNote:
    'Verified admissions contact details (email, phone, office address) have not yet been provided. Please refer to official university communication channels when they become available.',
  sensitiveInfoWarning:
    'Please do not share passwords, bank card details, PINs or other sensitive information in this conversation. The assistant will never request them.',
};

export const ASSISTANT = {
  name: 'AdmitEase',
  role: 'Admission enquiry assistant for Westbridge University',
  scope: [
    'Undergraduate programmes',
    'O\'Level and UTME admission requirements',
    'Application procedures',
    'Required application documents',
    'Application fees and tuition',
    'Application deadlines',
    'General admission enquiries',
  ],
};
