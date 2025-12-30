/**
 * Speech Synthesis Module
 * Handles text-to-speech functionality with playback controls
 */

const SpeechController = {
    // State
    state: {
        utterance: null,
        isPaused: false,
        isPlaying: false,
        currentLineIndex: 0,
        totalLines: 0
    },

    // DOM Elements (cached on init)
    elements: {},

    // Synth reference
    synth: null,

    // Voice references for male/female
    voices: {
        male: null,
        female: null,
        all: []
    },

    /**
     * Initialize speech controls
     */
    init() {
        this.elements = {
            speakBtn: document.getElementById('speakBtn'),
            pauseBtn: document.getElementById('pauseBtn'),
            resumeBtn: document.getElementById('resumeBtn'),
            stopBtn: document.getElementById('stopBtn'),
            progressFill: document.getElementById('speechProgress'),
            progressText: document.getElementById('speechProgressText'),
            speedSelect: document.getElementById('speechSpeed')
        };

        if (!('speechSynthesis' in window)) {
            this.elements.speakBtn.disabled = true;
            this.elements.progressText.textContent = 'Not supported';
            return;
        }

        this.synth = window.speechSynthesis;
        this.loadVoices();
        this.bindEvents();
    },

    /**
     * Load available voices and select male/female
     */
    loadVoices() {
        const loadVoiceList = () => {
            this.voices.all = this.synth.getVoices();

            // Try to find English voices - prefer distinct male and female
            const englishVoices = this.voices.all.filter(v =>
                v.lang.startsWith('en')
            );

            // Common female voice name patterns
            const femalePatterns = /female|woman|zira|susan|samantha|victoria|karen|moira|fiona|tessa|veena/i;
            // Common male voice name patterns
            const malePatterns = /male|man|david|james|daniel|george|richard|alex|tom|lee/i;

            // Find female voice
            this.voices.female = englishVoices.find(v => femalePatterns.test(v.name)) ||
                                 englishVoices.find(v => v.name.toLowerCase().includes('female')) ||
                                 englishVoices[0];

            // Find male voice (different from female)
            this.voices.male = englishVoices.find(v =>
                malePatterns.test(v.name) && v !== this.voices.female
            ) || englishVoices.find(v =>
                v !== this.voices.female && !femalePatterns.test(v.name)
            ) || englishVoices[1] || englishVoices[0];

            // Fallback if no English voices
            if (!this.voices.female) this.voices.female = this.voices.all[0];
            if (!this.voices.male) this.voices.male = this.voices.all[1] || this.voices.all[0];
        };

        // Load voices (may be async in some browsers)
        loadVoiceList();
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = loadVoiceList;
        }
    },

    /**
     * Bind event listeners
     */
    bindEvents() {
        this.elements.speakBtn.addEventListener('click', () => this.play());
        this.elements.pauseBtn.addEventListener('click', () => this.pause());
        this.elements.resumeBtn.addEventListener('click', () => this.resume());
        this.elements.stopBtn.addEventListener('click', () => this.stop());
    },

    /**
     * Start playing the conversation
     */
    play() {
        const conversation = ConversationGenerator.currentConversation;
        if (conversation.length === 0) return;

        this.synth.cancel();
        this.state.isPlaying = true;
        this.state.isPaused = false;
        this.state.currentLineIndex = 0;
        this.state.totalLines = conversation.length;

        // Hide play button, show pause button
        this.elements.speakBtn.style.display = 'none';
        this.elements.pauseBtn.style.display = 'flex';
        this.elements.pauseBtn.disabled = false;
        this.elements.resumeBtn.style.display = 'none';
        this.elements.stopBtn.disabled = false;
        this.elements.progressText.textContent = 'Playing...';

        this.updateProgress();
        this.speakLine(0);
    },

    /**
     * Speak a single line with appropriate voice
     */
    speakLine(index) {
        const conversation = ConversationGenerator.currentConversation;

        if (index >= conversation.length) {
            this.reset();
            this.elements.progressText.textContent = 'Completed';
            return;
        }

        const line = conversation[index];
        // Don't prefix with "A says:" - just speak the text naturally
        const utterance = new SpeechSynthesisUtterance(line.text);
        utterance.rate = parseFloat(this.elements.speedSelect.value);

        // Assign voice based on speaker: A = male, B = female
        if (line.speaker === 'A') {
            utterance.voice = this.voices.male;
            utterance.pitch = 0.9; // Slightly lower pitch for male
        } else {
            utterance.voice = this.voices.female;
            utterance.pitch = 1.1; // Slightly higher pitch for female
        }

        utterance.onend = () => {
            this.state.currentLineIndex++;
            this.updateProgress();
            if (this.state.isPlaying && !this.state.isPaused) {
                // Small pause between speakers for more natural flow
                setTimeout(() => {
                    this.speakLine(this.state.currentLineIndex);
                }, 300);
            }
        };

        utterance.onerror = () => {
            this.reset();
            this.elements.progressText.textContent = 'Error';
        };

        this.state.utterance = utterance;
        this.synth.speak(utterance);
    },

    /**
     * Pause playback
     */
    pause() {
        this.synth.pause();
        this.state.isPaused = true;
        // Hide pause, show resume (play icon)
        this.elements.pauseBtn.style.display = 'none';
        this.elements.resumeBtn.style.display = 'flex';
        this.elements.speakBtn.style.display = 'none';
        this.elements.progressText.textContent = 'Paused';
    },

    /**
     * Resume playback
     */
    resume() {
        this.synth.resume();
        this.state.isPaused = false;
        // Hide resume, show pause
        this.elements.resumeBtn.style.display = 'none';
        this.elements.pauseBtn.style.display = 'flex';
        this.elements.speakBtn.style.display = 'none';
        this.elements.progressText.textContent = 'Playing...';
    },

    /**
     * Stop playback
     */
    stop() {
        this.synth.cancel();
        this.reset();
        this.elements.progressText.textContent = 'Stopped';
    },

    /**
     * Update progress bar
     */
    updateProgress() {
        const progress = (this.state.currentLineIndex / this.state.totalLines) * 100;
        this.elements.progressFill.style.width = `${progress}%`;
        this.elements.progressText.textContent = `${this.state.currentLineIndex}/${this.state.totalLines} lines`;
    },

    /**
     * Reset controls to initial state
     */
    reset() {
        this.state.isPlaying = false;
        this.state.isPaused = false;
        this.state.currentLineIndex = 0;

        // Show play button, hide pause/resume
        this.elements.speakBtn.style.display = 'flex';
        this.elements.speakBtn.disabled = false;
        this.elements.pauseBtn.style.display = 'none';
        this.elements.pauseBtn.disabled = true;
        this.elements.resumeBtn.style.display = 'none';
        this.elements.stopBtn.disabled = true;
        this.elements.progressFill.style.width = '0%';
    },

    /**
     * Cancel any ongoing speech
     */
    cancel() {
        if (this.synth) {
            this.synth.cancel();
        }
    }
};
