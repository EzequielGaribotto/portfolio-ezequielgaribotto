import React from 'react';
import { expandSearchTerm } from '../constants/techSynonyms';

interface HighlightTextProps {
  text: string;
  searchTerm: string;
  className?: string;
  highlightClassName?: string;
}

export function HighlightText({ text, searchTerm, className = '', highlightClassName = '' }: HighlightTextProps) {
  if (!searchTerm || !searchTerm.trim()) {
    return <>{text}</>;
  }

  // Expand search term to include synonyms
  const expandedTerms = expandSearchTerm(searchTerm);
  
  // Find all matches with word boundaries
  const parts: { text: string; isHighlight: boolean }[] = [];
  const matches: Array<{ start: number; end: number }> = [];
  
  // Find matches for all expanded terms
  for (const term of expandedTerms) {
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // For short terms (1-3 chars), use strict word boundary to avoid matching "ML" in "XML"
    let regex: RegExp;
    if (term.length <= 3) {
      regex = new RegExp(`\\b${escapedTerm}\\b`, 'gi');
    } else {
      // For longer terms, use word boundary at start
      regex = new RegExp(`\\b${escapedTerm}`, 'gi');
    }
    
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push({ start: match.index, end: match.index + match[0].length });
    }
  }
  
  // Sort matches by start position and merge overlapping ranges
  matches.sort((a, b) => a.start - b.start);
  const mergedMatches: Array<{ start: number; end: number }> = [];
  
  for (const match of matches) {
    if (mergedMatches.length === 0) {
      mergedMatches.push(match);
    } else {
      const lastMatch = mergedMatches[mergedMatches.length - 1];
      if (match.start <= lastMatch.end) {
        // Overlapping or adjacent, merge them
        lastMatch.end = Math.max(lastMatch.end, match.end);
      } else {
        mergedMatches.push(match);
      }
    }
  }
  
  // Build parts array from merged matches
  let currentIndex = 0;
  
  for (const match of mergedMatches) {
    // Add text before match
    if (match.start > currentIndex) {
      parts.push({
        text: text.substring(currentIndex, match.start),
        isHighlight: false
      });
    }
    
    // Add matched text
    parts.push({
      text: text.substring(match.start, match.end),
      isHighlight: true
    });
    
    currentIndex = match.end;
  }
  
  // Add remaining text
  if (currentIndex < text.length) {
    parts.push({
      text: text.substring(currentIndex),
      isHighlight: false
    });
  }
  
  return (
    <span className={className}>
      {parts.map((part, index) => 
        part.isHighlight ? (
          <mark 
            key={index} 
            className={highlightClassName}
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--background)',
              padding: '2px 4px',
              borderRadius: '3px',
              fontWeight: '600'
            }}
          >
            {part.text}
          </mark>
        ) : (
          <React.Fragment key={index}>{part.text}</React.Fragment>
        )
      )}
    </span>
  );
}
