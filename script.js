document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("sliderTrack");
    const slides = document.querySelectorAll(".slider-img");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const pager = document.getElementById("galleryPager")

    const totalSlides = slides.length;
    let currentIndex = 0;
    let slidesToShow = 3;
    let totalPages = totalSlides - slidesToShow + 1;

    const getSlidesToShow = () => window.innerWidth <= 768 ? 1 : 3;

    const updateSlider = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        updatePager();
    };

    const updatePager = () => {
        pager.innerHTML = '';

        for (let i=0; i< totalPages; i++){
            const dot = document.createElement("button");
            dot.classList.add("pager-dot");

            if (i === currentIndex){
                dot.classList.add("active");
            }

            dot.addEventListener("click", () => {
                currentIndex = i;
                updateSlider();
            });
            pager.appendChild(dot);
        }
    };

    nextBtn.addEventListener("click", () => {
        if (currentIndex < totalPages - 1){
            currentIndex++;
        } else{
            currentIndex = 0;
        }
        updateSlider();
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0){
            currentIndex--;
        } else{
            currentIndex = totalPages - 1;
        }
        updateSlider();
    });

    window.addEventListener("resize", () => {
        const newSlidesToShow = getSlidesToShow();

        if (newSlidesToShow !== slidesToShow) {
            slidesToShow = newSlidesToShow;
            if (currentIndex >= totalSlides - slidesToShow + 1){
                currentIndex = 0;
            }
        }
        updateSlider();
    });
    slidesToShow = getSlidesToShow();
    updateSlider();
})