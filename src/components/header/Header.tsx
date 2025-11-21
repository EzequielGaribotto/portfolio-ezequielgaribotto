"use client";
import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../context/TranslationContext';
import LanguageSwitcher from '../language/LanguageSwitcher';
import ThemeToggleButton from '../button/ThemeToggleButton';
import styles from './Header.module.css';
import Image from 'next/image';
  
const Header: React.FC = () => {
  const { t, theme, isHydrated } = useTranslation();
  const [activeSection, setActiveSection] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Set isClient to true when component mounts on client side
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Define styles directly in the component
  const headerContentStyle = {
    backgroundColor: theme === 'dark' 
      ? 'rgba(45, 55, 72, 0.5)'
      : 'rgba(226, 232, 240, 0.5)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)', // For Safari
    border: `1px solid ${theme === 'dark' 
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(0, 0, 0, 0.2)'}`
  };
  
  // Handle smooth scrolling without updating URL hash
  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      // Smooth scroll to element without updating URL
      window.scrollTo({
        top: element.offsetTop - 100, // Offset for header height
        behavior: 'smooth'
      });
      // Close mobile menu if open
      setMobileMenuOpen(false);
    }
  };
  
  // Update active section based on scroll position only
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['profile', 'projects', 'experience', 'training'/*, 'gaming'*/];
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
    // Initial call to set the active section on page load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render until client-side hydration is complete
  if (!isClient || !isHydrated) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return <header className={styles.header}><div className={styles.headerContent} style={{visibility: 'hidden'}}></div></header>;
  }
  
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent} style={headerContentStyle}>
          <a 
            href="#profile"
            onClick={scrollToSection('profile')}
            className={styles.logoLink}
            aria-label="Logo"
          >
            <div className={styles.logo}>
              <Image 
                src="/images/logo/e332logo.webp" 
                alt="Logo" 
                width={60} 
                height={60}
                className={styles.logoImage}
                priority
              />
            </div>
          </a>
        
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a 
                href="#profile" // Replace javascript:void(0) with actual anchor
                onClick={scrollToSection('profile')}
                className={activeSection === 'profile' ? styles.active : ''}
              >
                {t("navigation.profile")}
              </a>
            </li>
            <li className={styles.navItem}>
              <a 
                href="#projects" // Replace javascript:void(0) with actual anchor
                onClick={scrollToSection('projects')}
                className={activeSection === 'projects' ? styles.active : ''}
              >
                {t("navigation.projects")}
              </a>
            </li>
            <li className={styles.navItem}>
              <a 
                href="#experience" // Replace javascript:void(0) with actual anchor
                onClick={scrollToSection('experience')}
                className={activeSection === 'experience' ? styles.active : ''}
              >
                {t("navigation.experience")}
              </a>
            </li>
            <li className={styles.navItem}>
              <a 
                href="#training" // Replace javascript:void(0) with actual anchor
                onClick={scrollToSection('training')}
                className={activeSection === 'training' ? styles.active : ''}
              >
                {t("navigation.training")}
              </a>
            </li>
            {/* <li className={styles.navItem}>
              <a 
                href="#aboutme" // Replace javascript:void(0) with actual anchor
                onClick={scrollToSection('gaming')}
                className={activeSection === 'gaming' ? styles.active : ''}
              >
                {t("navigation.gaming")}
              </a>
            </li> */}
          </ul>
        </nav>
        
        <div className={styles.controls}>
          <LanguageSwitcher />
          <ThemeToggleButton />
          <button 
            className={`${styles.mobileMenuButton} ${mobileMenuOpen ? styles.open : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>
      </div>
    </header>
    
    {/* Mobile Menu Overlay */}
    <div 
      className={`${styles.mobileMenuOverlay} ${mobileMenuOpen ? styles.open : ''}`}
      onClick={() => setMobileMenuOpen(false)}
    >
      <div 
        className={styles.mobileMenuContent} 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className={styles.mobileMenuClose}
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          ×
        </button>
        <nav>
          <ul className={styles.mobileNavList}>
            <li className={styles.mobileNavItem}>
              <a 
                href="#profile"
                onClick={scrollToSection('profile')}
                className={activeSection === 'profile' ? styles.active : ''}
              >
                {t("navigation.profile")}
              </a>
            </li>
            <li className={styles.mobileNavItem}>
              <a 
                href="#projects"
                onClick={scrollToSection('projects')}
                className={activeSection === 'projects' ? styles.active : ''}
              >
                {t("navigation.projects")}
              </a>
            </li>
            <li className={styles.mobileNavItem}>
              <a 
                href="#experience"
                onClick={scrollToSection('experience')}
                className={activeSection === 'experience' ? styles.active : ''}
              >
                {t("navigation.experience")}
              </a>
            </li>
            <li className={styles.mobileNavItem}>
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
      </div>
    </div>
    </>
  );
};

export default Header;
