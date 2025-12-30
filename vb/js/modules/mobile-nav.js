/**
 * Mobile Navigation Module
 * Handles hamburger menu, vocabulary panel FAB, and mobile-specific interactions
 */

(function () {
    'use strict';

    class MobileNav {
        constructor() {
            this.controlPanel = null;
            this.vocabPanel = null;
            this.overlay = null;
            this.hamburger = null;
            this.vocabFab = null;
            this.isControlPanelOpen = false;
            this.isVocabPanelOpen = false;
            this.touchStartX = 0;
            this.touchStartY = 0;

            this.init();
        }

        init() {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        }

        setup() {
            // Get existing elements
            this.controlPanel = document.querySelector('.control-panel');
            this.vocabPanel = document.querySelector('.vocab-panel');

            // Create mobile navigation elements
            this.createOverlay();
            this.createHamburgerButton();
            this.createVocabFab();

            // Attach event listeners
            this.attachEventListeners();

            // Handle window resize
            this.handleResize();
        }

        createOverlay() {
            this.overlay = document.createElement('div');
            this.overlay.className = 'mobile-overlay';
            this.overlay.setAttribute('aria-hidden', 'true');
            document.body.appendChild(this.overlay);
        }

        createHamburgerButton() {
            this.hamburger = document.createElement('button');
            this.hamburger.className = 'mobile-hamburger';
            this.hamburger.setAttribute('aria-label', 'Toggle menu');
            this.hamburger.setAttribute('aria-expanded', 'false');
            this.hamburger.innerHTML = `
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            `;
            document.body.appendChild(this.hamburger);
        }

        createVocabFab() {
            this.vocabFab = document.createElement('button');
            this.vocabFab.className = 'vocab-fab';
            this.vocabFab.setAttribute('aria-label', 'Toggle vocabulary panel');
            this.vocabFab.setAttribute('aria-expanded', 'false');
            this.vocabFab.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
            `;
            document.body.appendChild(this.vocabFab);
        }

        attachEventListeners() {
            // Hamburger menu
            this.hamburger.addEventListener('click', () => this.toggleControlPanel());

            // Vocabulary FAB
            this.vocabFab.addEventListener('click', () => this.toggleVocabPanel());

            // Overlay clicks
            this.overlay.addEventListener('click', () => this.closeAll());

            // Keyboard events
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeAll();
                }
            });

            // Touch gestures for swipe to close
            if (this.controlPanel) {
                this.controlPanel.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
                this.controlPanel.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
                this.controlPanel.addEventListener('touchend', (e) => this.handleTouchEnd(e));
            }

            // Window resize
            window.addEventListener('resize', () => this.handleResize());
        }

        toggleControlPanel() {
            this.isControlPanelOpen = !this.isControlPanelOpen;

            if (this.isControlPanelOpen) {
                this.openControlPanel();
            } else {
                this.closeControlPanel();
            }
        }

        openControlPanel() {
            this.controlPanel.classList.add('mobile-open');
            this.overlay.classList.add('active');
            this.hamburger.classList.add('active');
            this.hamburger.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';

            // Close vocab panel if open
            if (this.isVocabPanelOpen) {
                this.closeVocabPanel();
            }
        }

        closeControlPanel() {
            this.controlPanel.classList.remove('mobile-open');
            this.overlay.classList.remove('active');
            this.hamburger.classList.remove('active');
            this.hamburger.setAttribute('aria-expanded', 'false');

            if (!this.isVocabPanelOpen) {
                document.body.style.overflow = '';
            }
        }

        toggleVocabPanel() {
            this.isVocabPanelOpen = !this.isVocabPanelOpen;

            if (this.isVocabPanelOpen) {
                this.openVocabPanel();
            } else {
                this.closeVocabPanel();
            }
        }

        openVocabPanel() {
            this.vocabPanel.classList.add('mobile-open');
            this.overlay.classList.add('active');
            this.vocabFab.classList.add('active');
            this.vocabFab.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';

            // Close control panel if open
            if (this.isControlPanelOpen) {
                this.closeControlPanel();
            }
        }

        closeVocabPanel() {
            this.vocabPanel.classList.remove('mobile-open');
            this.overlay.classList.remove('active');
            this.vocabFab.classList.remove('active');
            this.vocabFab.setAttribute('aria-expanded', 'false');

            if (!this.isControlPanelOpen) {
                document.body.style.overflow = '';
            }
        }

        closeAll() {
            if (this.isControlPanelOpen) {
                this.isControlPanelOpen = false;
                this.closeControlPanel();
            }
            if (this.isVocabPanelOpen) {
                this.isVocabPanelOpen = false;
                this.closeVocabPanel();
            }
        }

        handleTouchStart(e) {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        }

        handleTouchMove(e) {
            if (!this.isControlPanelOpen) return;

            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const deltaX = touchX - this.touchStartX;
            const deltaY = touchY - this.touchStartY;

            // If swiping left and horizontal swipe is dominant
            if (deltaX < -50 && Math.abs(deltaX) > Math.abs(deltaY)) {
                e.preventDefault();
            }
        }

        handleTouchEnd(e) {
            if (!this.isControlPanelOpen) return;

            const touchX = e.changedTouches[0].clientX;
            const deltaX = touchX - this.touchStartX;

            // Swipe left to close
            if (deltaX < -100) {
                this.isControlPanelOpen = false;
                this.closeControlPanel();
            }
        }

        handleResize() {
            const isMobile = window.innerWidth <= 900;

            // Show/hide mobile controls based on screen size
            if (this.hamburger) {
                this.hamburger.style.display = isMobile ? 'flex' : 'none';
            }
            if (this.vocabFab) {
                this.vocabFab.style.display = isMobile ? 'flex' : 'none';
            }

            // Close panels on desktop
            if (!isMobile) {
                this.closeAll();
            }
        }

        // Public method to close control panel (can be called from other modules)
        closeControlPanelPublic() {
            if (this.isControlPanelOpen) {
                this.isControlPanelOpen = false;
                this.closeControlPanel();
            }
        }
    }

    // Initialize when script loads
    window.MobileNav = new MobileNav();
})();
