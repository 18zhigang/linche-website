// ============ 移动端菜单 ============
function toggleMenu() {
    const links = document.querySelector('.nav-links');
    links.classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// ============ 导航栏滚动效果 ============
(function () {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
})();

// ============ 平滑滚动 ============
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============ 进度条动画 ============
(function () {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const fills = entry.target.querySelectorAll('.progress-fill');
                    fills.forEach((fill) => {
                        // 读取已有的 width 内联样式并重新触发动画
                        const targetWidth = fill.style.width;
                        fill.style.width = '0';
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                fill.style.width = targetWidth;
                            });
                        });
                    });
                }
            });
        },
        { threshold: 0.3 }
    );

    // 观察追番区和高考后计划区
    const animeSection = document.getElementById('anime');
    const futureSection = document.getElementById('future');
    if (animeSection) observer.observe(animeSection);
    if (futureSection) observer.observe(futureSection);
})();

// ============ 日历格子交互 ============
(function () {
    // 给已打卡的格子添加点击效果
    document.querySelectorAll('.cal-day:not(.gray)').forEach((day) => {
        day.style.cursor = 'pointer';
        day.addEventListener('click', function () {
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
})();

// ============ 统计数字动画 ============
(function () {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const numbers = entry.target.querySelectorAll('.stat-number');
                    numbers.forEach((num) => {
                        const text = num.textContent;
                        const match = text.match(/(\d+\.?\d*)/);
                        if (match) {
                            const target = parseFloat(match[1]);
                            const unit = text.replace(match[1], '');
                            let current = 0;
                            const step = target / 30;
                            const isFloat = text.includes('.');

                            const counter = setInterval(() => {
                                current += step;
                                if (current >= target) {
                                    current = target;
                                    clearInterval(counter);
                                }
                                num.innerHTML = (isFloat ? current.toFixed(1) : Math.floor(current)) + unit;
                            }, 30);
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    const stats = document.querySelector('.stat-cards');
    if (stats) observer.observe(stats);
})();

// ============ 期待值进度条 ============
(function () {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const fill = entry.target.querySelector('.excitement-fill');
                    if (fill) {
                        fill.style.width = '0';
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                fill.style.width = '100%';
                            });
                        });
                    }
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    const excitementBar = document.querySelector('.future-excitement');
    if (excitementBar) observer.observe(excitementBar);
})();
