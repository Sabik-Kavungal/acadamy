import React from 'react';

interface TechLogoProps {
  name: string;
  className?: string;
}

export function TechLogo({ name, className = 'w-6 h-6' }: TechLogoProps) {
  const key = name.toLowerCase();

  if (key === 'react') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.4" />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          stroke="#61DAFB"
          strokeWidth="1.4"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          stroke="#61DAFB"
          strokeWidth="1.4"
          transform="rotate(120 12 12)"
        />
      </svg>
    );
  }

  if (key === 'next.js' || key === 'nextjs') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#FFFFFF" />
        <path d="M8.5 16.5V8L17.5 19" stroke="#19192F" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M15.5 8V13" stroke="#19192F" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (key === 'typescript') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#3178C6" />
        <path
          d="M7 11.5H12M9.5 11.5V17.5M14 13.5C14 12.2 15 11.5 16.3 11.5C17.4 11.5 18.2 12 18.5 12.7M14 13.5C14 15 18.5 14.5 18.5 16.3C18.5 17.3 17.5 17.8 16.2 17.8C15 17.8 14 17.3 13.6 16.5"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (key === 'python') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 3C8.8 3 9 4.4 9 6V8H15V9H6.5C4.5 9 3 10.5 3 12.8C3 15 4.3 16.5 6.5 16.5H8V14C8 12.3 9.3 11 11 11H15C16.7 11 18 9.7 18 8V6C18 4 16.3 3 12 3Z"
          fill="#3776AB"
        />
        <path
          d="M12 21C15.2 21 15 19.6 15 18V16H9V15H17.5C19.5 15 21 13.5 21 11.2C21 9 19.7 7.5 17.5 7.5H16V10C16 11.7 14.7 13 13 13H9C7.3 13 6 14.3 6 16V18C6 20 7.7 21 12 21Z"
          fill="#FFD43B"
        />
        <circle cx="10.2" cy="5.5" r="0.9" fill="#FFFFFF" />
        <circle cx="13.8" cy="18.5" r="0.9" fill="#19192F" />
      </svg>
    );
  }

  if (key === 'fastapi') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#009688" />
        <path d="M13 5.5L7.5 13H12L11 18.5L16.5 11H12L13 5.5Z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (key === 'golang' || key === 'go') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="4" fill="#00ADD8" />
        <path
          d="M10 10C8.5 10 7.5 10.9 7.5 12C7.5 13.1 8.5 14 10 14C11.3 14 12 13.3 12 12.3H10M15.5 10C14.1 10 13.2 10.9 13.2 12C13.2 13.1 14.1 14 15.5 14C16.9 14 17.8 13.1 17.8 12C17.8 10.9 16.9 10 15.5 10Z"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (key === 'postgresql' || key === 'pgvector') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <ellipse cx="12" cy="6.5" rx="7.5" ry="3" stroke="#5B9BD5" strokeWidth="1.6" />
        <path d="M4.5 6.5V17.5C4.5 19.2 7.8 20.5 12 20.5C16.2 20.5 19.5 19.2 19.5 17.5V6.5" stroke="#5B9BD5" strokeWidth="1.6" />
        <path d="M4.5 12C4.5 13.7 7.8 15 12 15C16.2 15 19.5 13.7 19.5 12" stroke="#5B9BD5" strokeWidth="1.6" />
      </svg>
    );
  }

  if (key === 'docker') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M4 13.5H19.5C20.5 13.5 21 15 20 16.8C18.8 18.8 15.8 19.8 11.8 19.8C7.2 19.8 4 17.2 4 13.5Z" fill="#2496ED" />
        <rect x="6" y="10" width="2.8" height="2.6" fill="#2496ED" />
        <rect x="9.5" y="10" width="2.8" height="2.6" fill="#2496ED" />
        <rect x="13" y="10" width="2.8" height="2.6" fill="#2496ED" />
        <rect x="9.5" y="6.8" width="2.8" height="2.6" fill="#2496ED" />
        <rect x="13" y="6.8" width="2.8" height="2.6" fill="#2496ED" />
      </svg>
    );
  }

  if (key === 'gemini') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 2.5C12.8 8 16 11.2 21.5 12C16 12.8 12.8 16 12 21.5C11.2 16 8 12.8 2.5 12C8 11.2 11.2 8 12 2.5Z"
          fill="#A5F51F"
        />
      </svg>
    );
  }

  if (key === 'langgraph') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="6" cy="12" r="2.5" stroke="#A5F51F" strokeWidth="1.6" />
        <circle cx="18" cy="6.5" r="2.5" stroke="#FFFFFF" strokeWidth="1.6" />
        <circle cx="18" cy="17.5" r="2.5" stroke="#FFFFFF" strokeWidth="1.6" />
        <path d="M8.3 11L15.6 7.5M8.3 13L15.6 16.5M18 9V15" stroke="#B8B8C5" strokeWidth="1.4" />
      </svg>
    );
  }

  if (key === 'redis') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <ellipse cx="12" cy="7" rx="7.5" ry="2.6" fill="#DC382D" />
        <path d="M4.5 11.5C4.5 13 7.8 14 12 14C16.2 14 19.5 13 19.5 11.5" stroke="#DC382D" strokeWidth="1.8" />
        <path d="M4.5 16C4.5 17.5 7.8 18.5 12 18.5C16.2 18.5 19.5 17.5 19.5 16" stroke="#DC382D" strokeWidth="1.8" />
      </svg>
    );
  }

  if (key === 'openai') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M12 5.5V18.5M6.3 8.8L17.7 15.2M17.7 8.8L6.3 15.2" stroke="#A5F51F" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (key === 'flutter') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M13.5 3L4.5 12L7.3 14.8L19.1 3H13.5Z" fill="#54C5F8" />
        <path d="M13.5 11.4L8.7 16.2L13.5 21H19.1L14.3 16.2L19.1 11.4H13.5Z" fill="#01579B" />
        <path d="M8.7 16.2L11.5 13.4L14.3 16.2L11.5 19L8.7 16.2Z" fill="#29B6F6" />
      </svg>
    );
  }

  if (key === 'dart') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M6 7L12 3.5L19.5 11V17.5L13 19.5L5.5 12L6 7Z" fill="#0175C2" />
        <path d="M12 3.5L19.5 11H12V3.5Z" fill="#13B9FD" />
      </svg>
    );
  }

  if (key === 'rest apis' || key === 'firebase') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="3" stroke="#A5F51F" strokeWidth="1.6" />
        <path d="M7.5 9.5L10.5 12L7.5 14.5M12.5 14.5H16.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // MCP / fallback
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="3" stroke="#A5F51F" strokeWidth="1.6" />
      <path d="M7.5 9.5L10.5 12L7.5 14.5M12.5 14.5H16.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
