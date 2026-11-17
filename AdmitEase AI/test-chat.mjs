import { generateReply } from './src/data/admitEase.ts';

const tests = [
  'What programmes does Westbridge offer?',
  'What is the minimum UTME score?',
  'What are the subject requirements for Computer Science?',
  'Can I use two O\u2019Level sittings?',
  'When does the application open and close?',
  'What is the application deadline?',
  'How much is the application fee?',
  'What documents do I need to apply?',
  'How much is tuition?',
  'How much is tuition for Computer Science?',
  'What is the acceptance fee?',
  'Have admission screening dates been announced?',
  'How can I check my admission status?',
  'Can I apply through you?',
  'Can I pay the application fee through AdmitEase?',
  'How do I contact the admissions office?',
  'Where is Westbridge University located?',
  'How long do the programmes take?',
  'Does meeting the minimum requirements guarantee admission?',
  'What is the UTME subject combination for Biochemistry?',
  'What are the O Level requirements for Mass Communication?',
  'Is there a postgraduate programme?',
  'My password is 1234',
  '',
  'What is the meaning of life?',
];

for (const q of tests) {
  console.log('\n--- Q: ' + JSON.stringify(q));
  console.log(generateReply(q));
}
