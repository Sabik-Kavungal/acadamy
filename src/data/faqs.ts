import type { FAQItem } from '../types';

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-01',
    category: 'Curriculum',
    question: 'What courses does AxiomDev Academy offer?',
    answer:
      'AxiomDev Academy offers two independent engineering pathways: 01. Forward Deployed AI Engineer (AI Engineering — covering complete full-stack React, Next.js, TypeScript, Python FastAPI, PostgreSQL, Redis, LLM integration, RAG, tool calling, and Docker cloud deployment) and 02. AI-Powered Mobile Application Developer (Mobile Engineering — covering Dart, Flutter, Android & iOS, backend integration, notifications, payments, and mobile AI features).',
  },
  {
    id: 'faq-02',
    category: 'Curriculum',
    question: 'Does Forward Deployed AI Engineer include full-stack software development?',
    answer:
      'Yes. Full-stack software engineering is a core pillar of the Forward Deployed AI Engineer program—including React, Next.js, TypeScript, Python, FastAPI, REST APIs, PostgreSQL, Redis, authentication, authorization, Docker deployment, and production monitoring alongside LLMs, RAG, embeddings, and AI tool calling.',
  },
  {
    id: 'faq-03',
    category: 'Pricing',
    question: 'How does the ₹2,999 Launch Offer work?',
    answer:
      'Both independent engineering courses carry a regular price of ₹3,999 and are currently available at the ₹2,999 Launch Offer price (₹1,000 OFF · 25% OFF). In this frontend demonstration, enrollment uses a simulated checkout flow; production deployment will integrate server-verified Razorpay checkout.',
  },
  {
    id: 'faq-04',
    category: 'Curriculum',
    question: 'What practical projects will I build during the programs?',
    answer:
      'In Forward Deployed AI Engineer, you build an AI Knowledge Base SaaS and an AI-Powered Business Assistant from frontend and backend to database, AI integration, and cloud deployment. In AI-Powered Mobile Application Developer, you build and deploy a complete AI-powered Android and iOS mobile application with backend sync, auth, notifications, and payments.',
  },
  {
    id: 'faq-05',
    category: 'Careers',
    question: 'Does completing a course guarantee a job?',
    answer:
      'No program can honestly guarantee employment from watching lessons alone. Each course gives you focused architectural patterns, source code, hands-on assignments, and interview preparation topics—real career results depend on building the projects, writing code, and practicing system design.',
  },
  {
    id: 'faq-06',
    category: 'Access & Demo',
    question: 'How does demo mode work in this frontend application?',
    answer:
      'All authentication, course enrollment, video playback resume positions, lesson completion tracking, assignment submissions, and admin CRUD edits run locally in your browser using structured service layers and localStorage—no real passwords or payment credentials are ever collected.',
  },
];
