// ===== SCROLL ANIMATIONS =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== NAVIGATION SCROLL EFFECT =====
function handleNavScroll() {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
    }
}

// ===== IMAGE ERROR HANDLING =====
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            // 이미지 로드 실패 시 대체 텍스트 표시
            this.style.display = 'none';
            
            // 대체 요소 생성
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 200px;
                background: #f8f9fa;
                border: 2px dashed #e9ecef;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #666;
                font-size: 14px;
                border-radius: 12px;
                margin: 20px 0;
            `;
            placeholder.textContent = '이미지를 불러올 수 없습니다';
            
            // 이미지 위치에 대체 요소 삽입
            this.parentNode.insertBefore(placeholder, this.nextSibling);
        });
    });
}

// ===== CONTACT FORM ENHANCEMENTS =====
function enhanceContactButtons() {
    const emailBtn = document.querySelector('a[href^="mailto:"]');
    const telBtn = document.querySelector('a[href^="tel:"]');
    
    if (emailBtn) {
        emailBtn.addEventListener('click', function() {
            console.log('Email button clicked');
        });
    }
    
    if (telBtn) {
        telBtn.addEventListener('click', function() {
            console.log('Phone button clicked');
        });
    }
}

// ===== LOADING SCREEN =====
function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    }
}

// ===== PORTFOLIO LINK TRACKING =====
function trackPortfolioClick() {
    const portfolioLink = document.querySelector('.portfolio-link');
    if (portfolioLink) {
        portfolioLink.addEventListener('click', function() {
            console.log('Portfolio link clicked:', this.href);
        });
    }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initIntersectionObserver() {
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        window.addEventListener('scroll', animateOnScroll);
    }
}

// ===== MOBILE MENU TOGGLE =====
function initMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const logo = document.querySelector('.logo');
    
    // 모바일에서 로고 클릭 시 홈으로 스크롤
    if (logo) {
        logo.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                document.querySelector('#home').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizePerformance() {
    // 스크롤 이벤트 throttling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                handleNavScroll();
                scrollTimeout = null;
            }, 10);
        }
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Forest Web - 페이지 로드 완료');
    
    // 초기화 함수들 실행
    initSmoothScroll();
    initIntersectionObserver();
    initMobileMenu();
    handleImageErrors();
    enhanceContactButtons();
    trackPortfolioClick();
    optimizePerformance();
    hideLoadingScreen();
    
    // 초기 애니메이션 실행
    animateOnScroll();
    
    // 페이지 완전 로드 후 추가 최적화
    window.addEventListener('load', function() {
        console.log('모든 리소스 로드 완료');
    });
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript 오류:', e.error);
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        animateOnScroll,
        initSmoothScroll,
        handleNavScroll
    };
}