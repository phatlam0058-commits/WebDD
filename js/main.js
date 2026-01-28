document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Menu Toggle ---
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    let burger = document.querySelector('.burger');

    if (!burger && navbar) {
        burger = document.createElement('div');
        burger.classList.add('burger');
        burger.innerHTML = `<div class="line1"></div><div class="line2"></div><div class="line3"></div>`;
        navbar.appendChild(burger);
    }

    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    // --- 2. Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- 3. Active Link Highlighter ---
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.nav-links a');
    menuItems.forEach(item => {
        if(item.href === currentLocation) {
            item.classList.add('active');
        }
    });

    // --- 4. Navbar Scroll Effect ---
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            header.style.padding = '20px 0';
        }
    });

    // --- 5. PROFESSIONAL RIBBON SLIDER (CẬP NHẬT MỚI) ---
    const slider = document.getElementById('hero-slider');
    const slides = document.querySelectorAll('.slide');

    if (slider && slides.length > 0) {
        let currentIndex = 0;
        const totalOriginalSlides = slides.length;

        // A. Nhân bản slide đầu tiên cho vào cuối dải băng
        const firstClone = slides[0].cloneNode(true);
        slider.appendChild(firstClone);

        // B. Hàm quản lý animation chữ (Xóa/Thêm class active-slide)
        function updateTextAnimation(index) {
            const allCurrentSlides = document.querySelectorAll('.slide');
            allCurrentSlides.forEach(s => s.classList.remove('active-slide'));
            
            // Nếu đang ở clone (vị trí cuối dải băng), hãy bật hiệu ứng cho slide 0 thật
            let activeIdx = (index === totalOriginalSlides) ? 0 : index;
            allCurrentSlides[activeIdx].classList.add('active-slide');
        }

        // Chạy hiệu ứng cho slide đầu tiên ngay khi vào trang
        updateTextAnimation(0);

        function autoSlide() {
            currentIndex++;
            
            // Trượt dải băng sang trái mượt mà (1.5 giây)
            slider.style.transition = "transform 1.5s cubic-bezier(0.645, 0.045, 0.355, 1)";
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Cập nhật hiệu ứng chữ ngay khi bắt đầu trượt
            updateTextAnimation(currentIndex);

            // C. Khi trượt đến slide nhân bản (cuối dải băng)
            if (currentIndex === totalOriginalSlides) {
                setTimeout(() => {
                    // Nhảy ngầm về vị trí slide 0 gốc không cho khách thấy
                    slider.style.transition = "none"; 
                    currentIndex = 0;
                    slider.style.transform = `translateX(0)`;
                }, 1500); // 1500ms phải khớp với thời gian transition trượt
            }
        }

        // Tự động chạy sau mỗi 6 giây (Đủ lâu để khách đọc chữ)
        setInterval(autoSlide, 6000);
    }
});