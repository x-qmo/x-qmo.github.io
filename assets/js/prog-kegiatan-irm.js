let slideIndexirm = 1;
showSlidesirm(slideIndexirm);

function plusSlides(n) {
  showSlidesirm(slideIndexirm += n);
}

function currentSlide(n) {
  showSlidesirm(slideIndexirm = n);
}

function showSlidesirm(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides-irm");
  let dots = document.getElementsByClassName("dot-irm-d");
  if (n > slides.length) {slideIndexirm = 1}
  if (n < 1) {slideIndexirm = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active-irm", "");
  }
  slides[slideIndexirm-1].style.display = "block";
  dots[slideIndexirm-1].className += " active-irm";
}
