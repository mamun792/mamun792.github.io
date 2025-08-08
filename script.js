class ModernTerminalPortfolio {
    constructor() {
        this.terminals = new Map();
        this.currentTerminal = 'main';
        this.commandHistory = [];
        this.historyIndex = -1;
        this.tabCounter = 1;
        this.isLoading = true;
        
        this.commands = {
            help: this.helpCommand,
            about: this.aboutCommand,
            experience: this.experienceCommand,
            skills: this.skillsCommand,
            achievements: this.achievementsCommand,
            projects: this.projectsCommand,
            contact: this.contactCommand,
            social: this.socialCommand,
            stats: this.statsCommand,
            tips: this.tipsCommand,
            quick: this.quickCommand,
            clear: this.clearCommand,
            newtab: this.newTabCommand,
            whoami: this.whoamiCommand,
            date: this.dateCommand,
            pwd: this.pwdCommand,
            ls: this.lsCommand,
            cat: this.catCommand,
            echo: this.echoCommand,
            history: this.historyCommand,
            matrix: this.matrixCommand,
            coffee: this.coffeeCommand,
            joke: this.jokeCommand,
            theme: this.themeCommand,
            animate: this.animateCommand
        };

        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.initializeTerminal();
        this.setupEventListeners();
        this.startMatrixRain();
        this.createFloatingParticles();
        this.updateTime();
        
        // Start time update interval
        setInterval(() => this.updateTime(), 1000);
        
        // Hide loading screen after animation
        setTimeout(() => this.hideLoadingScreen(), 3500);
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.display = 'flex';
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.animation = 'fadeOut 1s ease-out forwards';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            this.isLoading = false;
            this.focusCurrentInput();
        }, 1000);
    }

    initializeTerminal() {
        this.terminals.set('main', {
            id: 'main',
            title: 'main',
            element: document.getElementById('terminal-main'),
            input: document.getElementById('terminal-input-main'),
            output: document.getElementById('terminal-output-main')
        });
    }

    setupEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // Click events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('terminal-input') || 
                e.target.closest('.terminal-window')) {
                this.focusCurrentInput();
            }
        });

        // Tab switching
        document.addEventListener('click', (e) => {
            if (e.target.closest('.tab')) {
                const tab = e.target.closest('.tab');
                const terminalId = tab.dataset.terminal;
                this.switchTerminal(terminalId);
            }
        });

        // Prevent context menu on terminal
        document.querySelector('.terminal-window').addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }

    handleKeyDown(e) {
        if (this.isLoading) return;
        
        const input = this.getCurrentInput();
        if (!input) return;

        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                this.executeCommand(input.value.trim());
                input.value = '';
                this.historyIndex = -1;
                this.hideSuggestions();
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                this.navigateHistory(-1);
                break;
                
            case 'ArrowDown':
                e.preventDefault();
                this.navigateHistory(1);
                break;
                
            case 'Tab':
                e.preventDefault();
                this.autoComplete(input.value);
                break;
                
            case 'l':
                if (e.ctrlKey) {
                    e.preventDefault();
                    this.clearCommand();
                }
                break;
                
            case 'c':
                if (e.ctrlKey) {
                    e.preventDefault();
                    this.addOutput('<span class="error">^C</span>');
                    input.value = '';
                }
                break;
                
            default:
                // Show suggestions as user types
                setTimeout(() => this.showSuggestions(input.value), 100);
        }
    }

    executeCommand(commandLine) {
        if (!commandLine) return;

        const terminal = this.terminals.get(this.currentTerminal);
        const [command, ...args] = commandLine.split(' ');
        
        // Add to history
        this.commandHistory.unshift(commandLine);
        if (this.commandHistory.length > 100) {
            this.commandHistory.pop();
        }

        // Display command with modern styling
        this.addOutput(`
            <div class="command-input">
                <span class="user">mahababur</span><span class="separator">@</span><span class="host">portfolio</span><span class="path">:~$</span> ${commandLine}
            </div>
        `);

        // Execute command with animation
        setTimeout(() => {
            if (this.commands[command.toLowerCase()]) {
                this.commands[command.toLowerCase()].call(this, args);
            } else {
                this.addOutput(`<span class="error">Command not found: ${command}</span>\nType '<span class="command-highlight">help</span>' for available commands.`);
            }
            this.scrollToBottom();
        }, 100);
    }

    executeQuickCommand(command) {
        const input = this.getCurrentInput();
        if (input) {
            input.value = command;
            this.executeCommand(command);
        }
    }

    addOutput(content, className = 'command-output') {
        const terminal = this.terminals.get(this.currentTerminal);
        const outputDiv = document.createElement('div');
        outputDiv.className = className;
        outputDiv.innerHTML = content;
        terminal.output.appendChild(outputDiv);
        
        // Add animation
        outputDiv.style.opacity = '0';
        outputDiv.style.transform = 'translateY(10px)';
        setTimeout(() => {
            outputDiv.style.transition = 'all 0.3s ease-out';
            outputDiv.style.opacity = '1';
            outputDiv.style.transform = 'translateY(0)';
        }, 50);
    }

    // Enhanced command implementations with modern styling
    helpCommand() {
        const helpText = `
<div class="modern-help">
    <div class="help-header">
        <span class="help-title">🚀 Available Commands</span>
        <div class="help-divider"></div>
    </div>

    <div class="help-section">
        <span class="section-title">📋 Portfolio Commands:</span>
        <div class="command-grid">
            <div class="help-cmd"><span class="cmd-name">about</span><span class="cmd-desc">Professional summary</span></div>
            <div class="help-cmd"><span class="cmd-name">experience</span><span class="cmd-desc">Work experience</span></div>
            <div class="help-cmd"><span class="cmd-name">skills</span><span class="cmd-desc">Technical skills</span></div>
            <div class="help-cmd"><span class="cmd-name">achievements</span><span class="cmd-desc">Accomplishments</span></div>
            <div class="help-cmd"><span class="cmd-name">projects</span><span class="cmd-desc">Project portfolio</span></div>
            <div class="help-cmd"><span class="cmd-name">contact</span><span class="cmd-desc">Contact information</span></div>
            <div class="help-cmd"><span class="cmd-name">social</span><span class="cmd-desc">Social media links</span></div>
            <div class="help-cmd"><span class="cmd-name">stats</span><span class="cmd-desc">Performance statistics</span></div>
        </div>
    </div>

    <div class="help-section">
        <span class="section-title">🖥️ System Commands:</span>
        <div class="command-grid">
            <div class="help-cmd"><span class="cmd-name">clear</span><span class="cmd-desc">Clear terminal</span></div>
            <div class="help-cmd"><span class="cmd-name">newtab</span><span class="cmd-desc">New terminal tab</span></div>
            <div class="help-cmd"><span class="cmd-name">history</span><span class="cmd-desc">Command history</span></div>
            <div class="help-cmd"><span class="cmd-name">theme</span><span class="cmd-desc">Change theme</span></div>
        </div>
    </div>

    <div class="help-section">
        <span class="section-title">🎮 Fun Commands:</span>
        <div class="command-grid">
            <div class="help-cmd"><span class="cmd-name">matrix</span><span class="cmd-desc">Enter the Matrix</span></div>
            <div class="help-cmd"><span class="cmd-name">coffee</span><span class="cmd-desc">Brew some coffee</span></div>
            <div class="help-cmd"><span class="cmd-name">joke</span><span class="cmd-desc">Programming joke</span></div>
            <div class="help-cmd"><span class="cmd-name">animate</span><span class="cmd-desc">Cool animations</span></div>
        </div>
    </div>

    <div class="help-footer">
        <span class="keyboard-shortcuts">⌨️ Shortcuts: <kbd>↑↓</kbd> History | <kbd>Tab</kbd> Autocomplete | <kbd>Ctrl+L</kbd> Clear | <kbd>Ctrl+C</kbd> Cancel</span>
    </div>
</div>

<style>
.modern-help { margin: 20px 0; }
.help-header { margin-bottom: 25px; text-align: center; }
.help-title { font-size: 1.5rem; font-weight: bold; color: var(--primary-green); }
.help-divider { width: 100%; height: 2px; background: linear-gradient(90deg, transparent, var(--primary-green), transparent); margin: 10px 0; }
.help-section { margin-bottom: 25px; }
.section-title { color: var(--accent-cyan); font-weight: bold; font-size: 1.1rem; display: block; margin-bottom: 15px; }
.command-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 10px; margin-left: 20px; }
.help-cmd { display: flex; justify-content: space-between; padding: 8px 15px; background: rgba(0, 255, 65, 0.1); border-radius: 6px; border-left: 3px solid var(--primary-green); }
.cmd-name { color: var(--accent-orange); font-weight: bold; }
.cmd-desc { color: var(--text-secondary); font-size: 0.9rem; }
.help-footer { text-align: center; margin-top: 30px; padding: 15px; background: rgba(42, 42, 42, 0.5); border-radius: 8px; }
.keyboard-shortcuts { color: var(--text-muted); font-size: 0.9rem; }
kbd { background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 3px; padding: 2px 6px; font-size: 0.8rem; margin: 0 2px; }
</style>`;
        
        this.addOutput(helpText);
    }

    aboutCommand() {
        const aboutText = `
<div class="about-section">
    <div class="profile-header">
        <div class="profile-avatar">
            <div class="avatar-ring"></div>
            <div class="avatar-content">👨‍💻</div>
        </div>
        <div class="profile-info">
            <h2 class="profile-name">Mahababur Rahman</h2>
            <p class="profile-title">Java & Spring Boot Specialist</p>
            <div class="profile-status">
                <span class="status-indicator"></span>
                <span>Available for opportunities</span>
            </div>
        </div>
    </div>

    <div class="about-content">
        <div class="about-card">
            <h3>🚀 Professional Summary</h3>
            <p>Highly accomplished and innovative Software Engineer with <strong>1+ years</strong> of experience specializing in <span class="highlight">Java and Spring Boot</span>. Proven ability to design, develop, and deploy high-performance enterprise applications that optimize system efficiency.</p>
        </div>

        <div class="about-card">
            <h3>🎯 Core Expertise</h3>
            <ul class="expertise-list">
                <li>Enterprise application development</li>
                <li>Microservices architecture design</li>
                <li>Database optimization and performance tuning</li>
                <li>Team leadership and mentoring</li>
                <li>Agile development methodologies</li>
            </ul>
        </div>

        <div class="about-card">
            <h3>📈 Key Achievements</h3>
            <div class="achievements-grid">
                <div class="achievement-item">
                    <span class="achievement-number">99.9%</span>
                    <span class="achievement-label">Application Uptime</span>
                </div>
                <div class="achievement-item">
                    <span class="achievement-number">25%</span>
                    <span class="achievement-label">Performance Improvement</span>
                </div>
                <div class="achievement-item">
                    <span class="achievement-number">3+</span>
                    <span class="achievement-label">Developers Mentored</span>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.about-section { margin: 20px 0; }
.profile-header { display: flex; align-items: center; gap: 20px; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, rgba(0, 255, 65, 0.1), rgba(0, 204, 51, 0.05)); border-radius: 12px; border: 1px solid var(--primary-green); }
.profile-avatar { position: relative; }
.avatar-ring { width: 80px; height: 80px; border: 3px solid var(--primary-green); border-radius: 50%; animation: rotate 3s linear infinite; }
.avatar-content { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 2rem; }
.profile-info h2 { color: var(--text-primary); margin-bottom: 5px; }
.profile-title { color: var(--accent-cyan); font-size: 1.1rem; margin-bottom: 10px; }
.profile-status { display: flex; align-items: center; gap: 8px; color: var(--text-secondary); }
.status-indicator { width: 8px; height: 8px; background: var(--primary-green); border-radius: 50%; animation: pulse 2s infinite; }
.about-content { display: grid; gap: 20px; }
.about-card { background: rgba(26, 26, 26, 0.8); border: 1px solid var(--border-color); border-radius: 10px; padding: 20px; }
.about-card h3 { color: var(--accent-orange); margin-bottom: 15px; font-size: 1.2rem; }
.about-card p { color: var(--text-secondary); line-height: 1.6; }
.highlight { color: var(--primary-green); font-weight: bold; }
.expertise-list { list-style: none; padding: 0; }
.expertise-list li { color: var(--text-secondary); padding: 8px 0; border-bottom: 1px solid rgba(51, 51, 51, 0.5); position: relative; padding-left: 20px; }
.expertise-list li::before { content: '▶'; color: var(--primary-green); position: absolute; left: 0; }
.achievements-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; }
.achievement-item { text-align: center; padding: 15px; background: rgba(0, 255, 65, 0.1); border-radius: 8px; border: 1px solid var(--primary-green); }
.achievement-number { display: block; font-size: 2rem; font-weight: bold; color: var(--primary-green); }
.achievement-label { color: var(--text-secondary); font-size: 0.9rem; }
</style>`;
        
        this.addOutput(aboutText);
    }

    skillsCommand() {
        const skillsText = `
<div class="skills-section">
    <div class="skills-header">
        <h2>🛠️ Technical Arsenal</h2>
        <p>Comprehensive skill set for modern software development</p>
    </div>

    <div class="skills-grid">
        <div class="skill-category">
            <h3>💻 Programming Languages</h3>
            <div class="skill-items">
                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">Java</span>
                        <span class="skill-level">Advanced</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: 95%"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">JavaScript (ES6+)</span>
                        <span class="skill-level">Proficient</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: 80%"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">TypeScript</span>
                        <span class="skill-level">Intermediate</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: 75%"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="skill-category">
            <h3>🚀 Frameworks & Libraries</h3>
            <div class="skill-items">
                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">Spring Boot</span>
                        <span class="skill-level">Expert</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: 95%"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">Hibernate ORM</span>
                        <span class="skill-level">Proficient</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: 80%"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">Angular</span>
                        <span class="skill-level">Intermediate</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: 70%"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="skill-category">
            <h3>🗄️ Databases & Tools</h3>
            <div class="skill-items">
                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">MySQL</span>
                        <span class="skill-level">Advanced</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: 85%"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">PostgreSQL</span>
                        <span class="skill-level">Proficient</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: 75%"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">Docker</span>
                        <span class="skill-level">Intermediate</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: 70%"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.skills-section { margin: 20px 0; }
.skills-header { text-align: center; margin-bottom: 30px; }
.skills-header h2 { color: var(--primary-green); font-size: 1.8rem; margin-bottom: 10px; }
.skills-header p { color: var(--text-secondary); }
.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; }
.skill-category { background: rgba(26, 26, 26, 0.8); border: 1px solid var(--border-color); border-radius: 12px; padding: 25px; }
.skill-category h3 { color: var(--accent-cyan); margin-bottom: 20px; font-size: 1.2rem; }
.skill-items { display: flex; flex-direction: column; gap: 15px; }
.skill-item { }
.skill-info { display: flex; justify-content: space-between; margin-bottom: 8px; }
.skill-name { color: var(--text-primary); font-weight: 600; }
.skill-level { color: var(--accent-orange); font-size: 0.9rem; }
.skill-bar { width: 100%; height: 8px; background: var(--bg-tertiary); border-radius: 4px; overflow: hidden; }
.skill-progress { height: 100%; background: linear-gradient(90deg, var(--primary-green), var(--secondary-green)); border-radius: 4px; transition: width 2s ease-in-out; animation: skillLoad 2s ease-in-out; }
@keyframes skillLoad { from { width: 0%; } }
</style>`;
        
        this.addOutput(skillsText);
    }

    // Matrix Rain Effect
    startMatrixRain() {
        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        
        const drops = [];
        for(let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff41';
            ctx.font = fontSize + 'px monospace';
            
            for(let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        setInterval(draw, 35);
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Floating Particles
    createFloatingParticles() {
        const container = document.getElementById('particles-container');
        
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            container.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 6000);
        };
        
        setInterval(createParticle, 300);
    }

    // Auto-completion with suggestions
    showSuggestions(input) {
        if (!input.trim()) {
            this.hideSuggestions();
            return;
        }
        
        const commands = Object.keys(this.commands);
        const matches = commands.filter(cmd => cmd.startsWith(input.toLowerCase()));
        
        if (matches.length > 0 && matches.length <= 5) {
            const suggestionsDiv = document.getElementById(`suggestions-${this.currentTerminal}`);
            suggestionsDiv.innerHTML = `Suggestions: ${matches.join(', ')}`;
            suggestionsDiv.style.display = 'block';
        } else {
            this.hideSuggestions();
        }
    }

    hideSuggestions() {
        const suggestionsDiv = document.getElementById(`suggestions-${this.currentTerminal}`);
        if (suggestionsDiv) {
            suggestionsDiv.style.display = 'none';
        }
    }

    // Enhanced commands with animations
    matrixCommand() {
        this.addOutput(`
<div class="matrix-effect">
    <div class="matrix-text">
        <span class="glitch-text" data-text="Wake up, Neo...">Wake up, Neo...</span>
        <div class="matrix-lines">
            <div class="matrix-line">The Matrix has you...</div>
            <div class="matrix-line">Follow the white rabbit 🐰</div>
            <div class="matrix-line">But first, check out my Java skills! ☕</div>
        </div>
    </div>
</div>

<style>
.matrix-effect { text-align: center; padding: 20px; }
.matrix-text { animation: matrixGlow 2s ease-in-out infinite; }
.glitch-text { font-size: 1.5rem; color: #00ff41; font-weight: bold; }
.matrix-lines { margin-top: 15px; }
.matrix-line { color: #00ff41; margin: 10px 0; animation: typeIn 1s ease-out; }
.matrix-line:nth-child(1) { animation-delay: 0.5s; opacity: 0; animation-fill-mode: forwards; }
.matrix-line:nth-child(2) { animation-delay: 1s; opacity: 0; animation-fill-mode: forwards; }
.matrix-line:nth-child(3) { animation-delay: 1.5s; opacity: 0; animation-fill-mode: forwards; }
@keyframes matrixGlow { 0%, 100% { text-shadow: 0 0 10px #00ff41; } 50% { text-shadow: 0 0 20px #00ff41, 0 0 30px #00ff41; } }
</style>`);
    }

    coffeeCommand() {
        this.addOutput(`
<div class="coffee-animation">
    <div class="coffee-cup">
        <div class="cup">☕</div>
        <div class="steam">
            <span class="steam-line">~</span>
            <span class="steam-line">~</span>
            <span class="steam-line">~</span>
        </div>
    </div>
    <div class="coffee-text">
        <div class="coffee-line">Brewing coffee...</div>
        <div class="coffee-line">Perfect for coding Java! ☕</div>
        <div class="coffee-line">Caffeine level: <span class="highlight">MAXIMUM</span></div>
        <div class="coffee-line">Ready to code some Spring Boot magic! 🚀</div>
    </div>
</div>

<style>
.coffee-animation { text-align: center; padding: 20px; }
.coffee-cup { font-size: 3rem; margin-bottom: 20px; position: relative; }
.steam { position: absolute; top: -20px; left: 50%; transform: translateX(-50%); }
.steam-line { color: #888; font-size: 1rem; animation: steam 1s ease-in-out infinite; display: inline-block; margin: 0 2px; }
.steam-line:nth-child(1) { animation-delay: 0s; }
.steam-line:nth-child(2) { animation-delay: 0.3s; }
.steam-line:nth-child(3) { animation-delay: 0.6s; }
.coffee-line { color: var(--text-secondary); margin: 8px 0; animation: fadeInUp 0.5s ease-out; }
.coffee-line:nth-child(1) { animation-delay: 0.5s; opacity: 0; animation-fill-mode: forwards; }
.coffee-line:nth-child(2) { animation-delay: 1s; opacity: 0; animation-fill-mode: forwards; }
.coffee-line:nth-child(3) { animation-delay: 1.5s; opacity: 0; animation-fill-mode: forwards; }
.coffee-line:nth-child(4) { animation-delay: 2s; opacity: 0; animation-fill-mode: forwards; }
@keyframes steam { 0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; } 50% { transform: translateY(-10px) rotate(5deg); opacity: 1; } }
</style>`);
    }

    jokeCommand() {
        const jokes = [
            "Why do Java developers wear glasses? Because they don't C#! 😄",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
            "What's a programmer's favorite hangout place? Foo Bar! 🍺",
            "Why did the programmer quit his job? He didn't get arrays! 📊",
            "What do you call a programmer from Finland? Nerdic! 🇫🇮",
            "Why do Java programmers have to wear glasses? Because they can't C! 👓"
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        
        this.addOutput(`
<div class="joke-container">
    <div class="joke-header">🎭 Programming Humor</div>
    <div class="joke-text">${randomJoke}</div>
    <div class="joke-footer">Hope that made you smile! 😊</div>
</div>

<style>
.joke-container { text-align: center; padding: 20px; background: rgba(255, 107, 53, 0.1); border-radius: 10px; border: 1px solid var(--accent-orange); margin: 10px 0; }
.joke-header { color: var(--accent-orange); font-weight: bold; font-size: 1.2rem; margin-bottom: 15px; }
.joke-text { color: var(--text-primary); font-size: 1.1rem; margin: 15px 0; line-height: 1.5; }
.joke-footer { color: var(--text-secondary); font-size: 0.9rem; margin-top: 15px; }
</style>`);
    }

    animateCommand() {
        this.addOutput(`
<div class="animation-showcase">
    <div class="animated-title">🎨 Animation Showcase</div>
    <div class="animation-grid">
        <div class="anim-box bounce">Bounce</div>
        <div class="anim-box shake">Shake</div>
        <div class="anim-box rotate">Rotate</div>
        <div class="anim-box pulse">Pulse</div>
        <div class="anim-box glow">Glow</div>
        <div class="anim-box slide">Slide</div>
    </div>
</div>

<style>
.animation-showcase { text-align: center; padding: 20px; }
.animated-title { font-size: 1.5rem; color: var(--primary-green); margin-bottom: 20px; animation: rainbow 3s linear infinite; }
.animation-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 15px; margin-top: 20px; }
.anim-box { padding: 15px; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); font-weight: bold; cursor: pointer; }
.bounce { animation: bounce 1s infinite; }
.shake { animation: shake 0.5s infinite; }
.rotate { animation: rotate 2s linear infinite; }
.pulse { animation: pulse 1.5s infinite; }
.glow { animation: glow 2s ease-in-out infinite; }
.slide { animation: slide 2s ease-in-out infinite; }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
@keyframes glow { 0%, 100% { box-shadow: 0 0 5px var(--primary-green); } 50% { box-shadow: 0 0 20px var(--primary-green); } }
@keyframes slide { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(10px); } }
@keyframes rainbow { 0% { color: #ff0000; } 16% { color: #ff8000; } 33% { color: #ffff00; } 50% { color: #00ff00; } 66% { color: #0080ff; } 83% { color: #8000ff; } 100% { color: #ff0000; } }
</style>`);
    }

    themeCommand(args) {
        const themes = ['matrix', 'cyberpunk', 'ocean', 'sunset'];
        const theme = args[0] || 'matrix';
        
        if (!themes.includes(theme)) {
            this.addOutput(`<span class="error">Unknown theme: ${theme}</span>\nAvailable themes: ${themes.join(', ')}`);
            return;
        }
        
        this.addOutput(`<span class="success">Theme changed to: ${theme}</span>\n<span class="info">Theme switching feature coming soon! 🎨</span>`);
    }

    // Continue with other enhanced commands...
    experienceCommand() {
        const experienceText = `
<div class="experience-section">
    <div class="experience-header">
        <h2>💼 Professional Journey</h2>
        <p>Building enterprise solutions with Java & Spring Boot</p>
    </div>

    <div class="timeline">
        <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="job-header">
                    <h3>Software Engineer</h3>
                    <div class="company-info">
                        <span class="company">Pro Info Sys BD</span>
                        <span class="duration">Present</span>
                    </div>
                </div>
                <div class="job-location">📍 Gulshan, Dhaka-1212, Bangladesh</div>
                
                <div class="achievements">
                    <h4>🎯 Key Achievements:</h4>
                    <ul class="achievement-list">
                        <li>Spearheaded development of high-volume enterprise Java applications</li>
                        <li>Achieved <span class="highlight">99.9% uptime</span> serving thousands of users daily</li>
                        <li>Reduced time-to-market by <span class="highlight">15%</span> through cross-team collaboration</li>
                        <li>Improved system performance by <span class="highlight">25%</span> via microservices architecture</li>
                        <li>Mentored <span class="highlight">3+ junior developers</span>, elevating team standards</li>
                        <li>Enhanced project delivery efficiency by <span class="highlight">20%</span> using Agile methodologies</li>
                    </ul>
                </div>

                <div class="tech-stack">
                    <h4>🛠️ Technologies Used:</h4>
                    <div class="tech-tags">
                        <span class="tech-tag">Java</span>
                        <span class="tech-tag">Spring Boot</span>
                        <span class="tech-tag">MySQL</span>
                        <span class="tech-tag">Docker</span>
                        <span class="tech-tag">Microservices</span>
                        <span class="tech-tag">Agile</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.experience-section { margin: 20px 0; }
.experience-header { text-align: center; margin-bottom: 30px; }
.experience-header h2 { color: var(--primary-green); font-size: 1.8rem; margin-bottom: 10px; }
.experience-header p { color: var(--text-secondary); }
.timeline { position: relative; padding-left: 30px; }
.timeline::before { content: ''; position: absolute; left: 15px; top: 0; bottom: 0; width: 2px; background: linear-gradient(180deg, var(--primary-green), var(--secondary-green)); }
.timeline-item { position: relative; margin-bottom: 30px; }
.timeline-marker { position: absolute; left: -23px; top: 10px; width: 16px; height: 16px; background: var(--primary-green); border-radius: 50%; border: 3px solid var(--bg-primary); box-shadow: 0 0 10px var(--primary-green); }
.timeline-content { background: rgba(26, 26, 26, 0.8); border: 1px solid var(--border-color); border-radius: 12px; padding: 25px; margin-left: 20px; }
.job-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; }
.job-header h3 { color: var(--text-primary); font-size: 1.3rem; margin: 0; }
.company-info { text-align: right; }
.company { color: var(--accent-cyan); font-weight: bold; display: block; }
.duration { color: var(--accent-orange); font-size: 0.9rem; }
.job-location { color: var(--text-muted); margin-bottom: 20px; }
.achievements h4 { color: var(--accent-purple); margin-bottom: 15px; }
.achievement-list { list-style: none; padding: 0; }
.achievement-list li { color: var(--text-secondary); padding: 8px 0; border-bottom: 1px solid rgba(51, 51, 51, 0.3); position: relative; padding-left: 20px; }
.achievement-list li::before { content: '✅'; position: absolute; left: 0; }
.highlight { color: var(--primary-green); font-weight: bold; }
.tech-stack { margin-top: 20px; }
.tech-stack h4 { color: var(--accent-orange); margin-bottom: 15px; }
.tech-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.tech-tag { background: rgba(0, 255, 65, 0.1); color: var(--primary-green); padding: 5px 12px; border-radius: 15px; font-size: 0.9rem; border: 1px solid var(--primary-green); }
</style>`;
        
        this.addOutput(experienceText);
    }

    // Utility methods
    navigateHistory(direction) {
        const input = this.getCurrentInput();
        if (!input || this.commandHistory.length === 0) return;

        if (direction === -1) { // Up arrow
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                input.value = this.commandHistory[this.historyIndex];
            }
        } else { // Down arrow
            if (this.historyIndex > 0) {
                this.historyIndex--;
                input.value = this.commandHistory[this.historyIndex];
            } else if (this.historyIndex === 0) {
                this.historyIndex = -1;
                input.value = '';
            }
        }
    }

    autoComplete(partial) {
        const commands = Object.keys(this.commands);
        const matches = commands.filter(cmd => cmd.startsWith(partial.toLowerCase()));
        
        if (matches.length === 1) {
            const input = this.getCurrentInput();
            if (input) {
                input.value = matches[0];
            }
        }
    }

    getCurrentInput() {
        const terminal = this.terminals.get(this.currentTerminal);
        return terminal ? terminal.input : null;
    }

    focusCurrentInput() {
        if (this.isLoading) return;
        const input = this.getCurrentInput();
        if (input) {
            input.focus();
        }
    }

    scrollToBottom() {
        const terminal = this.terminals.get(this.currentTerminal);
        if (terminal) {
            terminal.output.scrollTop = terminal.output.scrollHeight;
        }
    }

    switchTerminal(terminalId) {
        // Hide current terminal
        const currentTerminal = this.terminals.get(this.currentTerminal);
        if (currentTerminal) {
            currentTerminal.element.classList.remove('active');
        }

        // Show new terminal
        const newTerminal = this.terminals.get(terminalId);
        if (newTerminal) {
            newTerminal.element.classList.add('active');
            this.currentTerminal = terminalId;
            
            // Update tab states
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.dataset.terminal === terminalId) {
                    tab.classList.add('active');
                }
            });
            
            this.focusCurrentInput();
        }
    }

    updateTime() {
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            timeElement.textContent = new Date().toLocaleString();
        }
    }

    clearCommand() {
        const terminal = this.terminals.get(this.currentTerminal);
        terminal.output.innerHTML = '';
    }

    // Add remaining command implementations...
    contactCommand() {
        const contactText = `
<div class="contact-section">
    <div class="contact-header">
        <h2>📞 Get In Touch</h2>
        <p>Let's connect and build something amazing together!</p>
    </div>

    <div class="contact-grid">
        <div class="contact-card primary">
            <div class="contact-icon">📧</div>
            <h3>Email</h3>
            <p>mahababurrahaman2014@gmail.com</p>
            <button class="contact-btn" onclick="window.open('mailto:mahababurrahaman2014@gmail.com')">Send Email</button>
        </div>

        <div class="contact-card">
            <div class="contact-icon">📱</div>
            <h3>Phone</h3>
            <p>+880 1745010925</p>
            <button class="contact-btn" onclick="window.open('tel:+8801745010925')">Call Now</button>
        </div>

        <div class="contact-card">
            <div class="contact-icon">🔗</div>
            <h3>GitHub</h3>
            <p>github.com/mamun792</p>
            <button class="contact-btn" onclick="window.open('https://github.com/mamun792')">View Profile</button>
        </div>

        <div class="contact-card">
            <div class="contact-icon">💼</div>
            <h3>LinkedIn</h3>
            <p>linkedin.com/in/mahababur-2-bc23/</p>
            <button class="contact-btn" onclick="window.open('https://linkedin.com/in/mahababur-2-bc23/')">Connect</button>
        </div>
    </div>

    <div class="availability-status">
        <div class="status-indicator online"></div>
        <span>Currently available for new opportunities</span>
    </div>
</div>

<style>
.contact-section { margin: 20px 0; }
.contact-header { text-align: center; margin-bottom: 30px; }
.contact-header h2 { color: var(--primary-green); font-size: 1.8rem; margin-bottom: 10px; }
.contact-header p { color: var(--text-secondary); }
.contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
.contact-card { background: rgba(26, 26, 26, 0.8); border: 1px solid var(--border-color); border-radius: 12px; padding: 25px; text-align: center; transition: all 0.3s ease; }
.contact-card:hover { transform: translateY(-5px); border-color: var(--primary-green); box-shadow: 0 10px 30px rgba(0, 255, 65, 0.2); }
.contact-card.primary { border-color: var(--primary-green); background: rgba(0, 255, 65, 0.05); }
.contact-icon { font-size: 2.5rem; margin-bottom: 15px; }
.contact-card h3 { color: var(--text-primary); margin-bottom: 10px; }
.contact-card p { color: var(--text-secondary); margin-bottom: 20px; word-break: break-all; }
.contact-btn { background: linear-gradient(135deg, var(--primary-green), var(--secondary-green)); border: none; color: var(--bg-primary); padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold; transition: all 0.3s ease; }
.contact-btn:hover { transform: scale(1.05); box-shadow: 0 5px 15px rgba(0, 255, 65, 0.4); }
.availability-status { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 15px; background: rgba(0, 255, 65, 0.1); border-radius: 8px; border: 1px solid var(--primary-green); }
.availability-status span { color: var(--text-primary); font-weight: 500; }
</style>`;
        
        this.addOutput(contactText);
    }

    // Add other command implementations (projects, achievements, etc.)
    projectsCommand() {
        const projectsText = `
<div class="projects-section">
    <div class="projects-header">
        <h2>🚀 Project Portfolio</h2>
        <p>Showcasing enterprise-grade applications and innovative solutions</p>
    </div>

    <div class="projects-grid">
        <div class="project-card featured">
            <div class="project-header">
                <h3>Enterprise Microservices Platform</h3>
                <div class="project-status">Production</div>
            </div>
            <div class="project-description">
                High-volume application serving thousands of users with 99.9% uptime. Implemented microservices architecture resulting in 25% performance improvement.
            </div>
            <div class="project-tech">
                <span class="tech-badge">Java</span>
                <span class="tech-badge">Spring Boot</span>
                <span class="tech-badge">Docker</span>
                <span class="tech-badge">MySQL</span>
            </div>
            <div class="project-metrics">
                <div class="metric">
                    <span class="metric-value">99.9%</span>
                    <span class="metric-label">Uptime</span>
                </div>
                <div class="metric">
                    <span class="metric-value">25%</span>
                    <span class="metric-label">Performance ↑</span>
                </div>
            </div>
        </div>

        <div class="project-card">
            <div class="project-header">
                <h3>Spring Boot API Gateway</h3>
                <div class="project-status">Active</div>
            </div>
            <div class="project-description">
                RESTful API development with database optimization and Angular frontend integration. Comprehensive testing with JUnit.
            </div>
            <div class="project-tech">
                <span class="tech-badge">Spring Boot</span>
                <span class="tech-badge">PostgreSQL</span>
                <span class="tech-badge">Angular</span>
                <span class="tech-badge">JUnit</span>
            </div>
        </div>

        <div class="project-card">
            <div class="project-header">
                <h3>Real-time Data Processing System</h3>
                <div class="project-status">Development</div>
            </div>
            <div class="project-description">
                Event-driven architecture with real-time data streaming, scalable system design, and performance monitoring.
            </div>
            <div class="project-tech">
                <span class="tech-badge">Java</span>
                <span class="tech-badge">Spring Boot</span>
                <span class="tech-badge">Microservices</span>
                <span class="tech-badge">Kafka</span>
            </div>
        </div>
    </div>

    <div class="github-link">
        <p>🔗 View more projects on <a href="https://github.com/mamun792" target="_blank">GitHub</a></p>
    </div>
</div>

<style>
.projects-section { margin: 20px 0; }
.projects-header { text-align: center; margin-bottom: 30px; }
.projects-header h2 { color: var(--primary-green); font-size: 1.8rem; margin-bottom: 10px; }
.projects-header p { color: var(--text-secondary); }
.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; margin-bottom: 30px; }
.project-card { background: rgba(26, 26, 26, 0.8); border: 1px solid var(--border-color); border-radius: 12px; padding: 25px; transition: all 0.3s ease; }
.project-card:hover { transform: translateY(-5px); border-color: var(--primary-green); box-shadow: 0 10px 30px rgba(0, 255, 65, 0.2); }
.project-card.featured { border-color: var(--primary-green); background: rgba(0, 255, 65, 0.05); }
.project-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; }
.project-header h3 { color: var(--text-primary); font-size: 1.2rem; margin: 0; }
.project-status { padding: 4px 12px; border-radius: 12px; font-size: 0.8rem; font-weight: bold; }
.project-card .project-status { background: var(--primary-green); color: var(--bg-primary); }
.project-card:not(.featured) .project-status { background: var(--accent-orange); color: var(--bg-primary); }
.project-description { color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px; }
.project-tech { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
.tech-badge { background: rgba(0, 255, 65, 0.1); color: var(--primary-green); padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; border: 1px solid var(--primary-green); }
.project-metrics { display: flex; gap: 20px; }
.metric { text-align: center; }
.metric-value { display: block; color: var(--primary-green); font-size: 1.5rem; font-weight: bold; }
.metric-label { color: var(--text-muted); font-size: 0.8rem; }
.github-link { text-align: center; padding: 20px; background: rgba(42, 42, 42, 0.5); border-radius: 8px; }
.github-link a { color: var(--primary-green); text-decoration: none; font-weight: bold; }
.github-link a:hover { text-decoration: underline; }
</style>`;
        
        this.addOutput(projectsText);
    }
}

// Global functions for HTML event handlers
function createNewTab() {
    portfolio.createNewTab();
}

function closeTab(terminalId) {
    portfolio.closeTab(terminalId);
}

function executeQuickCommand(command) {
    portfolio.executeQuickCommand(command);
}

function toggleCommands() {
    const grid = document.querySelector('.commands-grid');
    const btn = document.querySelector('.toggle-btn');
    
    if (grid.style.display === 'none') {
        grid.style.display = 'grid';
        btn.style.transform = 'rotate(45deg)';
    } else {
        grid.style.display = 'none';
        btn.style.transform = 'rotate(0deg)';
    }
}

// Extend the ModernTerminalPortfolio class with tab management
ModernTerminalPortfolio.prototype.createNewTab = function() {
    this.tabCounter++;
    const terminalId = `terminal-${this.tabCounter}`;
    const title = `tab-${this.tabCounter}`;

    // Create tab
    const tabsContainer = document.querySelector('.terminal-tabs');
    const newTabBtn = document.querySelector('.new-tab-btn');
    
    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.dataset.terminal = terminalId;
    tab.innerHTML = `
        <div class="tab-icon">⚡</div>
        <span class="tab-title">${title}</span>
        <button class="tab-close" onclick="closeTab('${terminalId}')">
            <svg width="12" height="12" viewBox="0 0 12 12">
                <path d="M1 1l10 10M1 11L11 1" stroke="currentColor" stroke-width="2"/>
            </svg>
        </button>
    `;
    
    tabsContainer.insertBefore(tab, newTabBtn);

    // Create terminal window
    const terminalContainer = document.querySelector('.terminal-container');
    const terminalWindow = document.createElement('div');
    terminalWindow.className = 'terminal-window';
    terminalWindow.id = `terminal-${terminalId}`;
    
    terminalWindow.innerHTML = `
        <div class="terminal-header">
            <div class="terminal-controls">
                <div class="control-btn close">
                    <svg width="8" height="8" viewBox="0 0 8 8">
                        <path d="M1 1l6 6M1 7L7 1" stroke="currentColor" stroke-width="1.5"/>
                    </svg>
                </div>
                <div class="control-btn minimize">
                    <svg width="8" height="2" viewBox="0 0 8 2">
                        <path d="M1 1h6" stroke="currentColor" stroke-width="1.5"/>
                    </svg>
                </div>
                <div class="control-btn maximize">
                    <svg width="8" height="8" viewBox="0 0 8 8">
                        <rect x="1" y="1" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5"/>
                    </svg>
                </div>
                <span class="terminal-title">mahababur@portfolio-${this.tabCounter}:~$</span>
            </div>
            <div class="terminal-info">
                <div class="connection-status">
                    <div class="signal-bars">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </div>
                    <span>${new Date().toLocaleString()}</span>
                </div>
            </div>
        </div>
        <div class="terminal-content" id="terminal-output-${terminalId}">
            <div class="command-line">
                <div class="command-output">
<span class="success">New terminal session started! 🚀</span>
Type '<span class="command-highlight">help</span>' for available commands.
                </div>
            </div>
        </div>
        <div class="input-line">
            <div class="prompt-container">
                <span class="user">mahababur</span>
                <span class="separator">@</span>
                <span class="host">portfolio</span>
                <span class="path">:~$</span>
            </div>
            <div class="input-container">
                <input type="text" class="terminal-input" id="terminal-input-${terminalId}" autocomplete="off" spellcheck="false">
                <div class="input-suggestions" id="suggestions-${terminalId}"></div>
            </div>
            <div class="cursor-container">
                <span class="modern-cursor">█</span>
            </div>
        </div>
    `;
    
    terminalContainer.appendChild(terminalWindow);

    // Register terminal
    this.terminals.set(terminalId, {
        id: terminalId,
        title: title,
        element: terminalWindow,
        input: document.getElementById(`terminal-input-${terminalId}`),
        output: document.getElementById(`terminal-output-${terminalId}`)
    });

    // Switch to new terminal
    this.switchTerminal(terminalId);
};

ModernTerminalPortfolio.prototype.closeTab = function(terminalId) {
    if (this.terminals.size <= 1) return; // Don't close last tab

    // Remove terminal
    const terminal = this.terminals.get(terminalId);
    if (terminal) {
        terminal.element.remove();
        this.terminals.delete(terminalId);
    }

    // Remove tab
    const tab = document.querySelector(`[data-terminal="${terminalId}"]`);
    if (tab) {
        tab.remove();
    }

    // Switch to another terminal if current was closed
    if (this.currentTerminal === terminalId) {
        const remainingTerminals = Array.from(this.terminals.keys());
        if (remainingTerminals.length > 0) {
            this.switchTerminal(remainingTerminals[0]);
        }
    }
};

// Initialize the modern terminal portfolio
const portfolio = new ModernTerminalPortfolio();
