// Main JavaScript File

// Load Header and Footer
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));

    // Load footer
    fetch('/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.toLowerCase();
            searchTools(searchTerm);
        });
    }
});

function searchTools(searchTerm) {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-text').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Tool Categories
const toolCategories = {
    textTools: [
        { name: 'Plagiarism Checker', url: '/tools/text-tools/plagiarism-checker.html' },
        { name: 'Word Counter', url: '/tools/text-tools/word-counter.html' },
        { name: 'Grammar Checker', url: '/tools/text-tools/grammar-checker.html' }
    ],
    imageTools: [
        { name: 'Image Compressor', url: '/tools/image-tools/image-compressor.html' },
        { name: 'Image Resizer', url: '/tools/image-tools/image-resizer.html' },
        { name: 'Format Converter', url: '/tools/image-tools/format-converter.html' }
    ],
    seoTools: [
        { name: 'Keyword Research', url: '/tools/seo-tools/keyword-research.html' },
        { name: 'Backlink Checker', url: '/tools/seo-tools/backlink-checker.html' },
        { name: 'Website Analyzer', url: '/tools/seo-tools/website-analyzer.html' }
    ]
};

// Ad Management
function loadAds() {
    // Check if ad container exists
    const adContainers = document.querySelectorAll('.ad-space');
    if (adContainers.length > 0) {
        // Initialize ad code here
        // This is a placeholder for actual ad implementation
        adContainers.forEach(container => {
            container.innerHTML = '<div class="ad-placeholder">Advertisement Space</div>';
        });
    }
}

// Tool Page Initialization
function initializeToolPage() {
    const toolContainer = document.querySelector('.tool-container');
    if (toolContainer) {
        // Add loading spinner
        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        toolContainer.appendChild(spinner);

        // Initialize tool-specific functionality
        const toolName = window.location.pathname.split('/').pop().replace('.html', '');
        initializeTool(toolName);
    }
}

function initializeTool(toolName) {
    // Remove loading spinner
    const spinner = document.querySelector('.spinner');
    if (spinner) {
        spinner.remove();
    }

    // Initialize tool-specific functionality
    switch(toolName) {
        case 'plagiarism-checker':
            initializePlagiarismChecker();
            break;
        case 'word-counter':
            initializeWordCounter();
            break;
        // Add more tool initializations here
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error Handling
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
    return false;
};

// Initialize tool page if we're on a tool page
if (document.querySelector('.tool-container')) {
    initializeToolPage();
}

// Load ads if ad containers exist
loadAds(); 