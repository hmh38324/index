// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加页面加载动画
    addPageLoadAnimation();
    
    // 添加卡片悬停效果
    addCardHoverEffects();
    
    // 添加按钮点击效果
    addButtonClickEffects();
    
    // 添加滚动动画
    addScrollAnimations();
});

// 页面加载动画
function addPageLoadAnimation() {
    const cards = document.querySelectorAll('.game-card');
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    
    // 设置初始状态
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
    });
    
    header.style.opacity = '0';
    header.style.transform = 'translateY(-30px)';
    footer.style.opacity = '0';
    footer.style.transform = 'translateY(30px)';
    
    // 延迟显示动画
    setTimeout(() => {
        header.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 + index * 150);
        });
        
        setTimeout(() => {
            footer.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            footer.style.opacity = '1';
            footer.style.transform = 'translateY(0)';
        }, 800);
    }, 100);
}

// 卡片悬停效果
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.game-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // 添加悬停时的特殊效果
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            // 图标旋转效果
            const icon = this.querySelector('.game-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.color = getCardColor(this.dataset.game);
            }
            
            // 按钮发光效果
            const buttons = this.querySelectorAll('.btn');
            buttons.forEach(btn => {
                btn.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // 恢复原始状态
            this.style.transform = 'translateY(0) scale(1)';
            
            const icon = this.querySelector('.game-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = '#34495e';
            }
            
            const buttons = this.querySelectorAll('.btn');
            buttons.forEach(btn => {
                btn.style.boxShadow = '';
            });
        });
    });
}

// 获取卡片主题色
function getCardColor(gameType) {
    const colors = {
        'huarongdao': '#e74c3c',
        'duiduipeng': '#f39c12',
        'colortrap': '#2ecc71',
        'digitalbomb': '#3498db'
    };
    return colors[gameType] || '#34495e';
}

// 按钮点击效果
function addButtonClickEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 创建波纹效果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // 添加波纹动画CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// 滚动动画
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // 观察所有卡片
    const cards = document.querySelectorAll('.game-card');
    cards.forEach(card => {
        observer.observe(card);
    });
}

// 添加键盘导航支持
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // 为键盘导航添加视觉反馈
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('btn')) {
            focusedElement.style.outline = '3px solid #f39c12';
            focusedElement.style.outlineOffset = '2px';
        }
    }
});

// 添加触摸设备支持
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    // 为触摸设备优化悬停效果
    const cards = document.querySelectorAll('.game-card');
    cards.forEach(card => {
        let touchStartTime;
        
        card.addEventListener('touchstart', function() {
            touchStartTime = Date.now();
            this.classList.add('touch-active');
        });
        
        card.addEventListener('touchend', function() {
            const touchDuration = Date.now() - touchStartTime;
            if (touchDuration < 200) {
                // 短触摸，触发悬停效果
                this.style.transform = 'translateY(-10px) scale(1.02)';
                setTimeout(() => {
                    this.style.transform = 'translateY(0) scale(1)';
                }, 300);
            }
            this.classList.remove('touch-active');
        });
    });
}

// 添加页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时暂停动画
        document.body.style.animationPlayState = 'paused';
    } else {
        // 页面显示时恢复动画
        document.body.style.animationPlayState = 'running';
    }
});

// 添加性能优化
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

// 优化滚动事件
const optimizedScrollHandler = debounce(() => {
    // 滚动优化逻辑
}, 16);

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
