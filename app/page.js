
'use client';
import Script from 'next/script';
import { useEffect } from 'react';

export default function Page() {
    const [mounted, setMounted] = require('react').useState(false);
    require('react').useEffect(() => { setMounted(true); }, []);
    useEffect(() => {
        // Force the vanilla JS to re-initialize on route changes
        if (typeof window !== 'undefined' && window.initApp) {
            window.initApp();
        }
    }, []);

    if (!mounted) return null;

    return (
        <>
            <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: `
    <!-- TopAppBar -->
    <header class="bg-white/80 backdrop-blur-md border-b border-border-subtle docked full-width top-0 sticky z-50 transition-all duration-300">
        <div class="flex justify-between items-center w-full h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
            <a href="index.html" class="flex items-center gap-3 cursor-pointer no-underline">
                <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
                    <span class="material-symbols-outlined text-white text-base">spa</span>
                </div>
                <span class="font-display-lg text-headline-md md:text-[36px] font-black tracking-tight text-primary flex items-center gap-2">
                    PurpLotus
                </span>
            </a>
            <nav class="hidden md:flex items-center gap-8">
                <a class="text-on-surface-variant font-medium hover:text-primary transition-all duration-300 no-underline" href="input.html">Analysis</a>
                <a class="text-primary border-b-2 border-primary pb-1 font-semibold no-underline" href="index.html">Framework</a>
            </nav>
        </div>
    </header>

    <!-- SECTION: LANDING PAGE -->
    <section id="landing-section" class="flex-grow">
        <!-- Hero Section -->
        <div class="relative pt-24 pb-32 overflow-hidden">
            <!-- Animated Background Blobs -->
            <div class="animated-blob blob-1"></div>
            <div class="animated-blob blob-2"></div>
            <div class="animated-blob blob-3"></div>
            <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out">
                <div class="flex flex-col md:flex-row items-center gap-16">
                    <div class="w-full md:w-3/5 space-y-8">
                        <div class="space-y-4">
                            <span class="font-label-caps text-label-caps text-primary tracking-[0.2em] uppercase">The PurpLotus SWOT Tool</span>
                            <h1 class="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background leading-tight">
                                Strategic Clarity for Your Next Venture.
                            </h1>
                            <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                                Introducing the PurpLotus SWOT tool: a structured planning environment designed to evaluate your Strengths, Weaknesses, Opportunities, and Threats. Our framework empowers executive leadership to transform raw analysis into resilient, actionable growth strategies.
                            </p>
                        </div>
                        <div class="flex flex-wrap gap-4 pt-4">
                            <button onclick="window.location.href='input.html'" class="bg-primary text-on-primary px-10 py-4 font-semibold tracking-wide hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20 rounded-lg">
                                Launch SWOT Tool
                            </button>
                        </div>
                    </div>
                    <div class="w-full md:w-2/5 relative reveal opacity-0 translate-y-8 transition-all duration-1000 delay-300 ease-out">
                        <div class="bg-white border border-border-subtle p-2 shadow-sm rounded-xl overflow-hidden hover-lift">
                            <img alt="Executive SWOT dashboard" class="w-full h-[400px] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 transform hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUra2S18XRiNrJo-9Bildm5c-l096dj8tjDNYSdnDhukP3cTxwXuKFzyufi5GBRthTj1mgLn0hMZzLW8QEKEVb-hzPrw3tk_JV42-wh_ouyaAo-TDVi9KoSL5cDnE9xFoGsb3JeDrt-gFpaJ7BOnRHRrfZ8x_q68PIQw3hebjqYbKtHEXOB7FO7Ct6gXqcUrPCccK7Sfwq7h2QJc0vzXVaBtnn2pAmD9UneOJkBFvRxKiowdZq48A_ho2zEyRkgAgLWTDzlc34kl9u"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Bento Intro Grid -->
        <div class="py-24 bg-surface-container-lowest border-y border-border-subtle">
            <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-gutter">
                    <!-- Strengths -->
                    <div class="bg-white p-6 border border-border-subtle rounded-2xl flex flex-col items-center text-center shadow-sm hover-lift hover:border-swot-threat transition-all duration-300 reveal opacity-0 translate-y-8 ease-out group">
                        <div class="w-16 h-16 rounded-full bg-swot-threat flex items-center justify-center mb-4 text-white group-hover:bg-swot-threat/80 transition-colors">
                            <span class="material-symbols-outlined text-white text-3xl" data-icon="diamond">diamond</span>
                        </div>
                        <h3 class="font-headline-sm text-headline-sm mb-3">Strengths</h3>
                        <p class="text-on-surface-variant font-body-md">Internal attributes and resources that support a successful outcome.</p>
                    </div>
                    <!-- Weaknesses -->
                    <div class="bg-white p-6 border border-border-subtle rounded-2xl flex flex-col items-center text-center shadow-sm hover-lift hover:border-swot-threat transition-all duration-300 reveal opacity-0 translate-y-8 delay-100 ease-out group">
                        <div class="w-16 h-16 rounded-full bg-swot-threat flex items-center justify-center mb-4 text-white group-hover:bg-swot-threat/80 transition-colors">
                            <span class="material-symbols-outlined text-white text-3xl" data-icon="broken_image">broken_image</span>
                        </div>
                        <h3 class="font-headline-sm text-headline-sm mb-3">Weaknesses</h3>
                        <p class="text-on-surface-variant font-body-md">Internal factors that resemble obstacles to your progress.</p>
                    </div>
                    <!-- Opportunities -->
                    <div class="bg-white p-6 border border-border-subtle rounded-2xl flex flex-col items-center text-center shadow-sm hover-lift hover:border-swot-threat transition-all duration-300 reveal opacity-0 translate-y-8 delay-200 ease-out group">
                        <div class="w-16 h-16 rounded-full bg-swot-threat flex items-center justify-center mb-4 text-white group-hover:bg-swot-threat/80 transition-colors">
                            <span class="material-symbols-outlined text-white text-3xl" data-icon="trending_up">trending_up</span>
                        </div>
                        <h3 class="font-headline-sm text-headline-sm mb-3">Opportunities</h3>
                        <p class="text-on-surface-variant font-body-md">External factors that the entity can exploit to its advantage.</p>
                    </div>
                    <!-- Threats -->
                    <div class="bg-white p-6 border border-border-subtle rounded-2xl flex flex-col items-center text-center shadow-sm hover-lift hover:border-swot-threat transition-all duration-300 reveal opacity-0 translate-y-8 delay-300 ease-out group">
                        <div class="w-16 h-16 rounded-full bg-swot-threat flex items-center justify-center mb-4 text-white group-hover:bg-swot-threat/80 transition-colors">
                            <span class="material-symbols-outlined text-white text-3xl" data-icon="warning">warning</span>
                        </div>
                        <h3 class="font-headline-sm text-headline-sm mb-3">Threats</h3>
                        <p class="text-on-surface-variant font-body-md">External elements in the environment that could cause trouble.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-surface-container-lowest border-t border-border-subtle mt-auto full-width">
        <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-gutter flex flex-col md:flex-row justify-between items-center gap-4">
            <span class="font-display-lg text-headline-md font-black text-primary">PurpLotus</span>
            <div class="flex gap-8">
                <a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
                <a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Methodology</a>
                <a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Support</a>
            </div>
            <p class="font-body-md text-body-md text-on-surface-variant">© 2026 PurpLotus Consultancy Pvt Ltd. All rights reserved.</p>
        </div>
    </footer>
    <script>
        // Scroll reveal animation logic
        document.addEventListener("DOMContentLoaded", () => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        entry.target.classList.remove("opacity-0", "translate-y-8");
                        entry.target.classList.add("opacity-100", "translate-y-0");
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        });
    </script>
` }} />
            <Script src="/app.js" strategy="afterInteractive" />
        </>
    );
}
