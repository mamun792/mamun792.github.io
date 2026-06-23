(function () {
    'use strict';

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var nav = document.getElementById('nav');
    var navToggle = document.getElementById('nav-toggle');
    var navLinks = document.getElementById('nav-links');
    var scrollProgress = document.getElementById('scroll-progress');
    var sections = document.querySelectorAll('section[id], header[id]');
    var profileTabs = document.querySelectorAll('.profile-tab');
    var profilePanels = document.querySelectorAll('.profile-panel');

    /* ── Page load ── */
    document.body.classList.add('is-loading');

    requestAnimationFrame(function () {
        setTimeout(function () {
            document.body.classList.remove('is-loading');
            initSplitChars();
        }, prefersReduced ? 0 : 80);
    });

    /* ── Character-by-character headline reveal ── */
    function initSplitChars() {
        if (prefersReduced) return;

        document.querySelectorAll('.split-chars').forEach(function (el) {
            var text = el.textContent;
            var parentDelay = getComputedStyle(el.closest('.headline-line') || el).getPropertyValue('--delay') || '0s';
            el.textContent = '';
            el.style.setProperty('--delay', parentDelay);

            text.split('').forEach(function (char, i) {
                var span = document.createElement('span');
                span.className = 'char';
                span.style.setProperty('--char-i', i);
                span.textContent = char === ' ' ? '\u00A0' : char;
                el.appendChild(span);
            });
        });
    }

    /* ── Magnetic button effect ── */
    function initMagnetic() {
        if (prefersReduced || window.innerWidth < 768) return;

        document.querySelectorAll('.magnetic').forEach(function (btn) {
            btn.addEventListener('mousemove', function (e) {
                var rect = btn.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.2) + 'px)';
            });

            btn.addEventListener('mouseleave', function () {
                btn.style.transform = '';
            });
        });
    }

    initMagnetic();

    /* ── Scroll progress ── */
    function updateScrollProgress() {
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        scrollProgress.style.width = progress + '%';
    }

    /* ── Nav highlight ── */
    function onScroll() {
        nav.classList.toggle('scrolled', window.scrollY > 40);
        highlightNav();
        updateScrollProgress();
    }

    function highlightNav() {
        var scrollPos = window.scrollY + 120;
        var current = 'hero';

        sections.forEach(function (section) {
            if (section.offsetTop <= scrollPos) {
                current = section.getAttribute('id');
            }
        });

        navLinks.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    /* ── Mobile menu ── */
    navToggle.addEventListener('click', function () {
        var isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    /* ── Resume dropdown ── */
    var resumeBtn = document.getElementById('nav-resume-btn');
    var resumeMenu = document.getElementById('nav-resume-menu');
    var resumeWrap = document.querySelector('.nav-resume-wrap');

    if (resumeBtn && resumeMenu && resumeWrap) {
        resumeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            var isOpen = resumeMenu.classList.toggle('is-open');
            resumeWrap.classList.toggle('is-open', isOpen);
            resumeBtn.setAttribute('aria-expanded', isOpen);
        });

        document.addEventListener('click', function (e) {
            if (!resumeWrap.contains(e.target)) {
                resumeMenu.classList.remove('is-open');
                resumeWrap.classList.remove('is-open');
                resumeBtn.setAttribute('aria-expanded', 'false');
            }
        });

        resumeMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                resumeMenu.classList.remove('is-open');
                resumeWrap.classList.remove('is-open');
                resumeBtn.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ── Profile tabs ── */
    profileTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var target = tab.dataset.profile;

            profileTabs.forEach(function (t) {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            profilePanels.forEach(function (panel) {
                var isMatch = panel.id === 'profile-' + target;
                if (isMatch) {
                    panel.hidden = false;
                    panel.classList.remove('active');
                    requestAnimationFrame(function () {
                        panel.classList.add('active');
                    });
                } else {
                    panel.classList.remove('active');
                    setTimeout(function () {
                        if (!panel.classList.contains('active')) panel.hidden = true;
                    }, 500);
                }
            });
        });
    });

    /* ── Stagger delays ── */
    document.querySelectorAll('.stagger-group').forEach(function (group) {
        Array.from(group.children).forEach(function (child, i) {
            child.style.setProperty('--stagger-i', i);
        });
    });

    document.querySelectorAll('.timeline-item').forEach(function (item, i) {
        item.style.setProperty('--marker-delay', (i * 0.25) + 's');
    });

    /* ── Counter animation ── */
    document.querySelectorAll('[data-count]').forEach(function (el) {
        el.textContent = '';
    });

    function animateCounter(el) {
        var target = parseInt(el.dataset.count, 10);
        var suffix = el.dataset.suffix || '';
        var duration = 2000;
        var start = performance.now();

        function easeOutExpo(t) {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        }

        function tick(now) {
            var progress = Math.min((now - start) / duration, 1);
            el.textContent = Math.round(easeOutExpo(progress) * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }

    /* ── Intersection Observer ── */
    var revealEls = document.querySelectorAll([
        '.section-header',
        '.profile-panels',
        '.profile-toggle',
        '.edu-card',
        '.contact-card',
        '.timeline-item',
        '.stagger-group',
        '.timeline.animate-line'
    ].join(', '));

    revealEls.forEach(function (el) { el.classList.add('reveal'); });

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                el.classList.add('visible');
                observer.unobserve(el);

                if (el.classList.contains('stagger-group')) {
                    el.querySelectorAll('[data-count]').forEach(function (counter) {
                        if (counter.dataset.animated) return;
                        counter.dataset.animated = 'true';
                        if (!prefersReduced) {
                            animateCounter(counter);
                        } else {
                            counter.textContent = counter.dataset.count + (counter.dataset.suffix || '');
                        }
                    });
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

        revealEls.forEach(function (el) { observer.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('visible'); });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ── Contact form (Web3Forms) ── */
    var contactForm = document.getElementById('contact-form');
    var formStatus = document.getElementById('form-status');
    var formSubmit = document.getElementById('form-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var name = contactForm.querySelector('[name="name"]').value.trim();
            var email = contactForm.querySelector('[name="email"]').value.trim();
            var message = contactForm.querySelector('[name="message"]').value.trim();

            if (!name || !email || !message) {
                formStatus.textContent = 'Please fill in all fields.';
                formStatus.className = 'form-status error';
                return;
            }

            formSubmit.disabled = true;
            formSubmit.textContent = 'Sending...';
            formStatus.textContent = '';
            formStatus.className = 'form-status';

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                if (data.success) {
                    formStatus.textContent = 'Message sent! I\'ll get back to you within 24 hours.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    throw new Error(data.message || 'Submission failed');
                }
            }).catch(function () {
                formStatus.textContent = 'Something went wrong. Please email me directly.';
                formStatus.className = 'form-status error';
            }).finally(function () {
                formSubmit.disabled = false;
                formSubmit.textContent = 'Send Message';
            });
        });
    }
})();
