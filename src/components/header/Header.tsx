"use client";
import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../context/TranslationContext';
import LanguageSwitcher from '../language/LanguageSwitcher';
import ThemeToggleButton from '../button/ThemeToggleButton';
import styles from './Header.module.css';
import Image from 'next/image';
import Tooltip from '../tooltip/Tooltip';

const Header: React.FC = () => {
  const { t, theme } = useTranslation();
  const [activeSection, setActiveSection] = useState<string>('');
  
  // Define styles directly in the component
  const headerContentStyle = {
    backgroundColor: theme === 'dark' 
      ? 'rgba(45, 55, 72, 0.1)' // Very light background in dark mode
      : 'rgba(226, 232, 240, 0.1)', // Very light background in light mode
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)', // For Safari
    border: `1px solid ${theme === 'dark' 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.1)'}`
  };
  
  // Handle smooth scrolling and update URL hash
  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      // Update URL with hash without causing page jump
      window.history.pushState(null, '', `#${sectionId}`);
      
      // Smooth scroll to element
      window.scrollTo({
        top: element.offsetTop - 100, // Offset for header height
        behavior: 'smooth'
      });
    }
  };
  
  // Update active section based on scroll position and URL hash on initial load
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['profile', 'projects', 'experience', 'training'];
      const scrollPosition = window.scrollY + 200; // Add offset for header
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && 
            scrollPosition >= element.offsetTop && 
            scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    // Check URL hash on initial load
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
      const element = document.getElementById(initialHash);
      if (element) {
        setTimeout(() => {
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: 'smooth'
          });
          setActiveSection(initialHash);
        }, 100); // Small delay to ensure the page is fully loaded
      }
    }
    
    window.addEventListener('scroll', handleScroll);
    // Initial call to set the active section on page load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={styles.header}>
      <div className={styles.headerContent} style={headerContentStyle}>
        <Tooltip 
          text={t("tooltips.logo")} 
          position="bottom" 
          forcePosition={true}
        >
          <a 
            href="https://github.com/EzequielGaribotto" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.logoLink}
            aria-label={t("tooltips.logo")}
          >
            <div className={styles.logo}>
              <Image 
                src="/images/logo/e332logo.png" 
                alt="Logo" 
                width={60} 
                height={60}
                className={styles.logoImage}
              />
            </div>
          </a>
        </Tooltip>
        
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a 
                href="#profile" 
                onClick={scrollToSection('profile')}
                className={activeSection === 'profile' ? styles.active : ''}
              >
                {t("navigation.profile")}
              </a>
            </li>
            <li className={styles.navItem}>
              <a 
                href="#projects" 
                onClick={scrollToSection('projects')}
                className={activeSection === 'projects' ? styles.active : ''}
              >
                {t("navigation.projects")}
              </a>
            </li>
            <li className={styles.navItem}>
              <a 
                href="#experience" 
                onClick={scrollToSection('experience')}
                className={activeSection === 'experience' ? styles.active : ''}
              >
                {t("navigation.experience")}
              </a>
            </li>
            <li className={styles.navItem}>
              <a 
                href="#training" 
                onClick={scrollToSection('training')}
                className={activeSection === 'training' ? styles.active : ''}
              >
                {t("navigation.training")}
              </a>
            </li>
          </ul>
        </nav>
        
        <div className={styles.controls}>
          <LanguageSwitcher />
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
