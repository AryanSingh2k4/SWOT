// app.js

const StorageKey = "purplotus_swot_data";

let swotData = {
    companyName: "",
    industry: "",
    points: {
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: []
    }
};

const industryPrompts = {
    "SaaS": {
        strengths: "e.g., Proprietary algorithm, high MRR, low churn rate.",
        weaknesses: "e.g., High server costs, small sales team.",
        opportunities: "e.g., Expansion into enterprise market, new AI features.",
        threats: "e.g., Open-source alternatives, changing data privacy laws."
    },
    "Retail": {
        strengths: "e.g., Prime location, loyal customer base, strong brand.",
        weaknesses: "e.g., High rent, inventory management issues.",
        opportunities: "e.g., Launching e-commerce, seasonal pop-ups.",
        threats: "e.g., Online competitors, supply chain disruptions."
    },
    "Manufacturing": {
        strengths: "e.g., Efficient production line, patents.",
        weaknesses: "e.g., Aging machinery, high energy costs.",
        opportunities: "e.g., Automation technology, new export markets.",
        threats: "e.g., Raw material price volatility, trade tariffs."
    },
    "Healthcare": {
        strengths: "e.g., Specialized expertise, state-of-the-art equipment.",
        weaknesses: "e.g., Staff shortages, long wait times.",
        opportunities: "e.g., Telehealth expansion, aging population needs.",
        threats: "e.g., Regulatory changes, insurance reimbursement cuts."
    },
    "Professional Services": {
        strengths: "e.g., Highly skilled team, strong referral network.",
        weaknesses: "e.g., Scalability issues, reliance on key personnel.",
        opportunities: "e.g., Offering digital consulting, new niche markets.",
        threats: "e.g., Economic downturns, automated software solutions."
    },
    "E-commerce": {
        strengths: "e.g., High conversion rate, streamlined logistics.",
        weaknesses: "e.g., High customer acquisition cost, return rates.",
        opportunities: "e.g., Social commerce, international shipping.",
        threats: "e.g., Changes in ad algorithms, shipping price hikes."
    },
    "Other": {
        strengths: "Identify your unique competitive advantages...",
        weaknesses: "Acknowledge critical areas for improvement...",
        opportunities: "Explore untapped market potential...",
        threats: "Anticipate obstacles and market shifts..."
    }
};

window.initApp = function() { 
    // Load data from session storage if available
    const savedData = sessionStorage.getItem(StorageKey);
    if (savedData) {
        swotData = JSON.parse(savedData);
    }

    // Input Page Initialization
    if (document.getElementById('input-section')) {
        initInputPage();
    }

    // Summary Page Initialization
    if (document.getElementById('summary-section')) {
        initSummaryPage();
    }

    // Scroll reveal animation logic
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
 };
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initApp);
} else {
    window.initApp();
}

function initInputPage() {
    // Setup enter key listeners
    document.querySelectorAll('input[placeholder^="Add a"]').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const btn = input.nextElementSibling;
                btn.click();
            }
        });
    });

    const industrySelect = document.getElementById('industry-select');
    if(industrySelect) {
        industrySelect.addEventListener('change', (e) => {
            const industry = e.target.value;
            const prompts = industryPrompts[industry] || industryPrompts["Other"];
            
            const ps = document.getElementById('prompt-strengths');
            if(ps) ps.textContent = prompts.strengths;
            
            const pw = document.getElementById('prompt-weaknesses');
            if(pw) pw.textContent = prompts.weaknesses;
            
            const po = document.getElementById('prompt-opportunities');
            if(po) po.textContent = prompts.opportunities;
            
            const pt = document.getElementById('prompt-threats');
            if(pt) pt.textContent = prompts.threats;
            
            saveData();
        });
        
        // Restore values
        if(swotData.industry) industrySelect.value = swotData.industry;
    }
    
    const companyInput = document.getElementById('company-name');
    if(companyInput) {
        if(swotData.companyName) companyInput.value = swotData.companyName;
        companyInput.addEventListener('change', saveData);
    }

    // Initial render of lists
    ['strengths', 'weaknesses', 'opportunities', 'threats'].forEach(type => {
        renderInputList(type);
    });
}

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

window.addItem = function addItem(button, type) {
    const container = button.parentElement;
    const input = container.querySelector('input');
    const select = container.querySelector('select');
    const value = input.value.trim();
    const priority = select ? select.value : 'medium';
    
    if (value) {
        const id = generateId();
        swotData.points[type].push({ id, text: value, priority });
        
        renderInputList(type);
        saveData();
        
        input.value = '';
        input.focus();
        if(select) select.value = 'medium';
        
        button.classList.add('scale-125', 'opacity-0');
        setTimeout(() => {
            button.classList.remove('scale-125', 'opacity-0');
        }, 200);
    }
}

window.moveItem = function moveItem(type, index, direction) {
    if (direction === 'up' && index > 0) {
        const temp = swotData.points[type][index - 1];
        swotData.points[type][index - 1] = swotData.points[type][index];
        swotData.points[type][index] = temp;
    } else if (direction === 'down' && index < swotData.points[type].length - 1) {
        const temp = swotData.points[type][index + 1];
        swotData.points[type][index + 1] = swotData.points[type][index];
        swotData.points[type][index] = temp;
    }
    renderInputList(type);
    saveData();
}

window.removeItem = function removeItem(type, id) {
    swotData.points[type] = swotData.points[type].filter(p => p.id !== id);
    renderInputList(type);
    saveData();
}

function saveData() {
    const companyInput = document.getElementById('company-name');
    const industrySelect = document.getElementById('industry-select');
    if(companyInput) swotData.companyName = companyInput.value.trim();
    if(industrySelect) swotData.industry = industrySelect.value;
    
    sessionStorage.setItem(StorageKey, JSON.stringify(swotData));
}

function renderInputList(type) {
    const list = document.getElementById(`${type}-list`);
    if(!list) return;
    
    list.innerHTML = '';
    
    if (swotData.points[type].length === 0) {
        const ind = swotData.industry || "Other";
        const prompts = industryPrompts[ind] || industryPrompts["Other"];
        let prompt = prompts[type] || "Add a point...";

        list.innerHTML = `
            <div class="empty-state py-12 flex flex-col items-center justify-center text-center opacity-40">
                <span class="material-symbols-outlined text-4xl mb-2">add_circle</span>
                <p class="font-body-md" id="prompt-${type}">${prompt}</p>
            </div>
        `;
        
        const counter = document.getElementById(`count-${type}`);
        if (counter) {
            counter.textContent = "0";
            counter.classList.remove('bg-primary', 'text-on-primary');
            counter.classList.add('bg-surface-variant', 'text-on-surface-variant');
        }
        return;
    }

    let dotColor = "bg-primary";
    if(type === 'weaknesses') dotColor = "bg-swot-weakness";
    if(type === 'threats') dotColor = "bg-swot-threat";

    swotData.points[type].forEach((item, index) => {
        const div = document.createElement('div');
        div.className = "flex items-start justify-between group/item p-3 bg-white border border-border-subtle rounded hover:border-primary transition-all animate-in slide-in-from-bottom-2 duration-300 shadow-sm gap-2";
        
        let priorityBadge = "";
        if (item.priority === 'high') {
            priorityBadge = `<span class="bg-error/10 text-error text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 mt-1">High</span>`;
        } else if (item.priority === 'medium') {
            priorityBadge = `<span class="bg-outline/10 text-outline text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 mt-1">Med</span>`;
        } else {
            priorityBadge = `<span class="bg-surface-variant text-on-surface-variant text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 mt-1">Low</span>`;
        }

        div.innerHTML = `
            <div class="flex items-start gap-3 w-full pr-2">
                <div class="w-1.5 h-1.5 rounded-full ${dotColor} mt-2.5 shrink-0"></div>
                <div class="flex flex-col gap-1 w-full">
                    <p class="text-on-surface font-body-md leading-relaxed">${item.text}</p>
                    ${priorityBadge}
                </div>
            </div>
            <div class="flex flex-col items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0">
                <button onclick="moveItem('${type}', ${index}, 'up')" class="text-outline-variant hover:text-primary transition-colors p-0.5" ${index === 0 ? 'disabled class="opacity-30"' : ''}>
                    <span class="material-symbols-outlined text-[16px]">expand_less</span>
                </button>
                <button onclick="removeItem('${type}', '${item.id}')" class="text-outline-variant hover:text-error transition-colors p-0.5">
                    <span class="material-symbols-outlined text-[16px]">close</span>
                </button>
                <button onclick="moveItem('${type}', ${index}, 'down')" class="text-outline-variant hover:text-primary transition-colors p-0.5" ${index === swotData.points[type].length - 1 ? 'disabled class="opacity-30"' : ''}>
                    <span class="material-symbols-outlined text-[16px]">expand_more</span>
                </button>
            </div>
        `;
        list.appendChild(div);
    });
    
    // Update live counter
    const counter = document.getElementById(`count-${type}`);
    if (counter) {
        counter.textContent = swotData.points[type].length;
        if (swotData.points[type].length > 0) {
            counter.classList.add('bg-primary', 'text-on-primary');
            counter.classList.remove('bg-surface-variant', 'text-on-surface-variant');
        } else {
            counter.classList.remove('bg-primary', 'text-on-primary');
            counter.classList.add('bg-surface-variant', 'text-on-surface-variant');
        }
    }
}

function goToSummary() {
    saveData();
    const strengths = swotData.points.strengths.length;
    const weaknesses = swotData.points.weaknesses.length;
    const opportunities = swotData.points.opportunities.length;
    const threats = swotData.points.threats.length;
    
    if (strengths === 0 || weaknesses === 0 || opportunities === 0 || threats === 0) {
        if (typeof showCustomModal !== 'undefined') {
            showCustomModal({
                type: 'alert',
                title: 'Incomplete Audit',
                message: 'Please ensure all four quadrants have at least one point before generating the strategic audit.'
            });
        } else {
            alert("Please ensure all four quadrants have at least one point before generating the strategic audit.");
        }
        return;
    }
    window.location.href = 'summary.html';
}

async function initSummaryPage() {
    // Populate summary headers
    const name = swotData.companyName || "Project Lotus";
    document.getElementById('summary-title').textContent = `Strategic Audit: ${name}`;
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('summary-date').textContent = new Date().toLocaleDateString('en-US', options);

    const totalPoints = swotData.points.strengths.length + swotData.points.weaknesses.length + swotData.points.opportunities.length + swotData.points.threats.length;

    // Populate summary lists
    ['strengths', 'weaknesses', 'opportunities', 'threats'].forEach(type => {
        const list = document.getElementById(`summary-${type}-list`);
        if(!list) return;
        
        list.innerHTML = '';
        
        let icon = "check_circle";
        let iconColor = "text-primary";
        
        if(type === 'strengths') { icon = "check_circle"; iconColor = "text-swot-strength"; }
        if(type === 'weaknesses') { icon = "error"; iconColor = "text-swot-weakness"; }
        if(type === 'opportunities') { icon = "auto_awesome"; iconColor = "text-primary"; }
        if(type === 'threats') { icon = "gpp_maybe"; iconColor = "text-swot-threat"; }

        // Sort items by priority: High -> Medium -> Low
        const priorityScore = { high: 3, medium: 2, low: 1 };
        const sortedPoints = [...swotData.points[type]].sort((a, b) => {
            const scoreA = priorityScore[a.priority || 'medium'];
            const scoreB = priorityScore[b.priority || 'medium'];
            return scoreB - scoreA; // descending
        });

        sortedPoints.forEach(item => {
            const li = document.createElement('li');
            li.className = "flex items-start gap-3 pb-4 border-b border-border-subtle last:border-0";
            
            let priorityBadge = "";
            if (item.priority === 'high') {
                priorityBadge = `<span class="bg-error/10 text-error text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">High Priority</span>`;
            } else if (item.priority === 'medium') {
                priorityBadge = `<span class="bg-outline/10 text-outline text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">Med Priority</span>`;
            } else {
                priorityBadge = `<span class="bg-surface-variant text-on-surface-variant text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">Low Priority</span>`;
            }
            
            li.innerHTML = `
                <span class="material-symbols-outlined ${iconColor} mt-1">${icon}</span>
                <div class="flex flex-col gap-1 w-full">
                    <p class="font-body-md text-on-surface leading-relaxed">${item.text}</p>
                    <div>${priorityBadge}</div>
                </div>
            `;
            list.appendChild(li);
        });
    });

    // Populate stats
    const confidence = Math.min(98, 50 + (totalPoints * 4));
    document.getElementById('confidence-score').textContent = `${confidence}%`;
    document.getElementById('confidence-bar').style.width = `${confidence}%`;
    document.getElementById('audit-depth').textContent = `Comprehensive (${totalPoints} Factors)`;

    // Generate AI Summary (mock)
    const aiLoading = document.getElementById('ai-loading');
    const aiContent = document.getElementById('ai-synthesis-content');
    
    aiContent.innerHTML = '';
    aiLoading.classList.remove('hidden');

    await new Promise(r => setTimeout(r, 1500));
    
    try {
        const res = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(swotData)
        });
        const data = await res.json();
        
        if (res.ok && data.synthesis) {
            aiContent.innerHTML = data.synthesis;
        } else {
            aiContent.innerHTML = `
                <div class="bg-error-container p-4 rounded-xl border border-error/20">
                    <p class="text-on-error-container font-body-md">
                        <span class="material-symbols-outlined align-middle mr-2">error</span>
                        ${data.error || 'Failed to generate synthesis.'}
                    </p>
                </div>`;
        }
    } catch (e) {
        aiContent.innerHTML = `
            <div class="bg-error-container p-4 rounded-xl border border-error/20">
                <p class="text-on-error-container font-body-md">
                    <span class="material-symbols-outlined align-middle mr-2">error</span>
                    Network error: ${e.message}
                </p>
            </div>`;
    }
    
    aiLoading.classList.add('hidden');
}

function downloadSummary() {
    window.scrollTo(0, 0);
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // ---- Theme ----
    const BRAND_PURPLE = [76, 29, 149];
    const BRAND_PURPLE_LIGHT = [230, 215, 250];
    const COLOR_TEXT = [33, 33, 33];
    const COLOR_MUTED = [110, 110, 110];
    const COLOR_WHITE = [255, 255, 255];
    const COLOR_BORDER = [225, 220, 235];

    const QUADRANTS = {
        strengths:     { label: "Strengths",     color: [34, 139, 87] },   // green
        weaknesses:    { label: "Weaknesses",    color: [200, 60, 60] },   // red
        opportunities: { label: "Opportunities", color: [40, 100, 200] },  // blue
        threats:       { label: "Threats",       color: [210, 130, 20] }, // orange
    };
    const PRIORITY_COLORS = { high: [200, 40, 40], medium: [200, 140, 0], low: [110, 110, 110] };

    const margin = 18;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const contentWidth = pageWidth - margin * 2;
    const footerZone = 16;
    const headerZone = 14;

    let y = margin;
    let pageNum = 1;
    const company = swotData.companyName || "Project Lotus";
    const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    const lh = (size, factor = 1.15) => size * 0.3528 * factor;

    // ---- Header / Footer drawn on every page ----
    const drawHeaderFooter = () => {
        // Slim top header (repeated brand bar, not the big banner — that's only on page 1)
        if (pageNum > 1) {
            doc.setFontSize(8.5);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(...BRAND_PURPLE);
            doc.text(company.toUpperCase(), margin, 10);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(...COLOR_MUTED);
            doc.text("Strategic Audit", pageWidth - margin, 10, { align: "right" });
            doc.setDrawColor(...COLOR_BORDER);
            doc.line(margin, 13, pageWidth - margin, 13);
        }
        // Footer
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...COLOR_MUTED);
        doc.text(`${dateStr}`, margin, pageHeight - 8);
        doc.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 8, { align: "right" });
    };

    const newPage = () => {
        doc.addPage();
        pageNum += 1;
        y = pageNum > 1 ? headerZone + 8 : margin;
    };

    const checkPageBreak = (needed) => {
        if (y + needed > pageHeight - footerZone) {
            newPage();
        }
    };

    // ---- Body text block ----
    const addParagraph = (text, size, color = COLOR_TEXT, bold = false) => {
        doc.setFontSize(size);
        doc.setFont("helvetica", bold ? "bold" : "normal");
        doc.setTextColor(...color);
        const lines = doc.splitTextToSize(text, contentWidth);
        const lineH = lh(size);
        checkPageBreak(lines.length * lineH);
        doc.text(lines, margin, y);
        y += lines.length * lineH + lineH * 0.6;
    };

    const sectionHeading = (text) => {
        checkPageBreak(16);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...COLOR_TEXT);
        doc.text(text, margin, y);
        y += 2;
        doc.setDrawColor(...BRAND_PURPLE);
        doc.setLineWidth(0.8);
        doc.line(margin, y, margin + 30, y);
        doc.setLineWidth(0.2);
        y += 8;
    };

    // =====================================================
    // COVER / TITLE BLOCK (page 1 only)
    // =====================================================
    const bannerHeight = 46;
    doc.setFillColor(...BRAND_PURPLE);
    doc.rect(0, 0, pageWidth, bannerHeight, 'F');

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...BRAND_PURPLE_LIGHT);
    doc.text("STRATEGIC AUDIT", margin, 16);

    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...COLOR_WHITE);
    doc.text(company, margin, 30);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...BRAND_PURPLE_LIGHT);
    const subLine = swotData.industry ? `${swotData.industry}  •  Prepared on ${dateStr}` : `Prepared on ${dateStr}`;
    doc.text(subLine, margin, 38);

    y = bannerHeight + 12;

    // =====================================================
    // EXECUTIVE SYNTHESIS — callout box
    // =====================================================
    sectionHeading("Synthesis & Recommendation");

    const aiParagraphs = Array.from(document.querySelectorAll('#ai-synthesis-content p')).map(p => p.innerText.trim());
    const synthesisText = aiParagraphs.length > 0 ? aiParagraphs : ["Strategic synthesis is not available or still generating."];

    // Measure box height first
    doc.setFontSize(10.5);
    doc.setFont("helvetica", "normal");
    const boxPadding = 8;
    let measuredLines = [];
    synthesisText.forEach(para => {
        const lines = doc.splitTextToSize(para, contentWidth - boxPadding * 2);
        measuredLines.push({ lines, gapAfter: lh(10.5) });
    });
    const totalTextHeight = measuredLines.reduce((sum, p) => sum + p.lines.length * lh(10.5) + 3, 0);
    const boxHeight = totalTextHeight + boxPadding * 2;

    checkPageBreak(boxHeight + 6);

    doc.setFillColor(248, 246, 252);
    doc.setDrawColor(...COLOR_BORDER);
    doc.roundedRect(margin, y, contentWidth, boxHeight, 3, 3, 'FD');
    // Left accent strip
    doc.setFillColor(...BRAND_PURPLE);
    doc.rect(margin, y, 2.5, boxHeight, 'F');

    let textY = y + boxPadding + 2;
    doc.setTextColor(...COLOR_TEXT);
    measuredLines.forEach(p => {
        doc.text(p.lines, margin + boxPadding, textY);
        textY += p.lines.length * lh(10.5) + 3;
    });

    y += boxHeight + 14;

    // =====================================================
    // SWOT 2x2 GRID
    // =====================================================
    sectionHeading("SWOT Breakdown");

    const gridGap = 6;
    const colWidth = (contentWidth - gridGap) / 2;
    const order = { high: 0, medium: 1, low: 2 };

    // Measure a quadrant's required height before drawing, so we can decide page breaks per row
    const measureQuadrant = (items) => {
        const sorted = [...(items || [])].sort((a, b) => (order[a.priority] ?? 3) - (order[b.priority] ?? 3));
        doc.setFontSize(9.5);
        let h = 12 + 6; // header bar + top padding
        if (sorted.length === 0) {
            h += lh(9.5) + 6;
        } else {
            sorted.forEach(item => {
                const lines = doc.splitTextToSize(`•  ${item.text}`, colWidth - 12);
                h += lines.length * lh(9.5) + 3;
            });
            h += 6;
        }
        return { sorted, height: h };
    };

    const drawQuadrant = (key, x, rowY, height) => {
        const { label, color } = QUADRANTS[key];
        const { sorted } = measureQuadrant(swotData.points[key]);

        doc.setDrawColor(...COLOR_BORDER);
        doc.roundedRect(x, rowY, colWidth, height, 2, 2, 'S');

        doc.setFillColor(...color);
        doc.roundedRect(x, rowY, colWidth, 11, 2, 2, 'F');
        doc.rect(x, rowY + 5.5, colWidth, 5.5, 'F'); // square off bottom of header bar

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...COLOR_WHITE);
        doc.text(label.toUpperCase(), x + 6, rowY + 7.5);

        let itemY = rowY + 18;
        doc.setFontSize(9.5);
        doc.setFont("helvetica", "normal");

        if (sorted.length === 0) {
            doc.setTextColor(...COLOR_MUTED);
            doc.setFont("helvetica", "italic");
            doc.text("No points added.", x + 6, itemY);
        } else {
            sorted.forEach(item => {
                doc.setFont("helvetica", "normal");
                doc.setTextColor(...COLOR_TEXT);
                const lines = doc.splitTextToSize(`•  ${item.text}`, colWidth - 12);
                doc.text(lines, x + 6, itemY);
                if (item.priority) {
                    const pc = PRIORITY_COLORS[item.priority.toLowerCase()] || COLOR_MUTED;
                    doc.setFontSize(7);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor(...pc);
                    doc.text(item.priority[0].toUpperCase(), x + colWidth - 8, itemY);
                    doc.setFontSize(9.5);
                }
                itemY += lines.length * lh(9.5) + 3;
            });
        }
    };

    const renderRow = (leftKey, rightKey) => {
        const leftM = measureQuadrant(swotData.points[leftKey]);
        const rightM = measureQuadrant(swotData.points[rightKey]);
        const rowHeight = Math.max(leftM.height, rightM.height);

        checkPageBreak(rowHeight + gridGap);

        drawQuadrant(leftKey, margin, y, rowHeight);
        drawQuadrant(rightKey, margin + colWidth + gridGap, y, rowHeight);

        y += rowHeight + gridGap;
    };

    renderRow("strengths", "weaknesses");
    renderRow("opportunities", "threats");

    // =====================================================
    // Apply header/footer to all pages at the end
    // =====================================================
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        pageNum = i;
        drawHeaderFooter();
    }

    doc.save(`${company.replace(/\s+/g, '_')}_Strategic_Audit.pdf`);
}

function clearAllData() {
    if (typeof showCustomModal !== 'undefined') {
        showCustomModal({
            type: 'confirm',
            title: 'Clear All Data',
            message: 'Are you sure you want to completely erase your SWOT analysis? This action cannot be undone.',
            onConfirm: performClearData
        });
    } else {
        if (confirm("Are you sure you want to clear all data? This cannot be undone.")) {
            performClearData();
        }
    }
}

function performClearData() {
    swotData = {
        companyName: "",
        industry: "",
        points: {
            strengths: [],
            weaknesses: [],
            opportunities: [],
            threats: []
        }
    };
    sessionStorage.removeItem(StorageKey);
    
    if (window.location.pathname.includes('input.html') || window.location.pathname.endsWith('/')) {
        const companyInput = document.getElementById('company-name');
        if (companyInput) companyInput.value = '';
        
        const industrySelect = document.getElementById('industry-select');
        if (industrySelect) {
            industrySelect.value = '';
            industrySelect.dispatchEvent(new Event('change'));
        }
        
        ['strengths', 'weaknesses', 'opportunities', 'threats'].forEach(type => {
            renderInputList(type);
        });
    } else {
        window.location.href = 'input.html';
    }
}

// Custom Modal Logic
function showCustomModal({ type, title, message, onConfirm }) {
    const modal = document.getElementById('custom-modal');
    const modalContent = document.getElementById('custom-modal-content');
    const iconContainer = document.getElementById('custom-modal-icon-container');
    const icon = document.getElementById('custom-modal-icon');
    const titleEl = document.getElementById('custom-modal-title');
    const messageEl = document.getElementById('custom-modal-message');
    const actionsEl = document.getElementById('custom-modal-actions');
    
    if (!modal) return;
    
    titleEl.textContent = title;
    messageEl.textContent = message;
    
    iconContainer.className = 'w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ';
    actionsEl.innerHTML = '';
    
    if (type === 'alert') {
        iconContainer.classList.add('bg-swot-threat/10');
        icon.className = 'material-symbols-outlined text-2xl text-swot-threat';
        icon.textContent = 'warning';
        
        const btn = document.createElement('button');
        btn.className = 'bg-primary text-on-primary px-6 py-2 rounded-xl font-label-caps font-bold hover:brightness-110 transition-all';
        btn.textContent = 'OK';
        btn.onclick = closeCustomModal;
        actionsEl.appendChild(btn);
    } else if (type === 'confirm') {
        iconContainer.classList.add('bg-error/10');
        icon.className = 'material-symbols-outlined text-2xl text-error';
        icon.textContent = 'delete_sweep';
        
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'text-on-surface-variant hover:bg-on-surface/5 px-6 py-2 rounded-xl font-label-caps font-bold transition-all';
        cancelBtn.textContent = 'CANCEL';
        cancelBtn.onclick = closeCustomModal;
        
        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'bg-error text-on-error px-6 py-2 rounded-xl font-label-caps font-bold hover:brightness-110 transition-all shadow-md';
        confirmBtn.textContent = 'CLEAR DATA';
        confirmBtn.onclick = () => {
            closeCustomModal();
            if(onConfirm) onConfirm();
        };
        
        actionsEl.appendChild(cancelBtn);
        actionsEl.appendChild(confirmBtn);
    }
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
    }, 10);
}

function closeCustomModal() {
    const modal = document.getElementById('custom-modal');
    const modalContent = document.getElementById('custom-modal-content');
    if (!modal) return;
    
    modal.classList.add('opacity-0');
    modalContent.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}
