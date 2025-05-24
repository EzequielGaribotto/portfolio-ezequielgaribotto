"use client";
import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../context/TranslationContext';
import LanguageSwitcher from '../LanguageSwitcher';
import ThemeToggleButton from '../button/ThemeToggleButton';
import styles from './Header.module.css';
import Image from 'next/image';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string>('');
  
  // Handle smooth scrolling
  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Offset for header height
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };
  
  // Update active section based on scroll position
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
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <a 
          href="https://github.com/EzequielGaribotto" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.logoLink}
          aria-label="Visit GitHub Profile"
          title="Visit my GitHub Profile"
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
