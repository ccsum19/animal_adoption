
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  if(slides[slideIndex-1]) {
    slides[slideIndex-1].style.display = "block";
  }
  if(dots[slideIndex-1]){
    dots[slideIndex-1].className += " active";
    captionText.innerHTML = dots[slideIndex-1].alt;
  }
}

export default function Slides() {
return (
  <div className="container">

  <div className="mySlides">
    <img className="petimg" src="images/dog1.jpg" />
  </div>

  <div className="mySlides">
    <img className="petimg" src="images/dog2.jpg" />
  </div>

  <div className="mySlides">
    <img className="petimg" src="images/dog3.jpg" />
  </div>
    
  <div className="mySlides">
    <img className="petimg" src="images/cat1.jpg" />
  </div>

  <div className="mySlides">
    <img className="petimg" src="images/cat2.jpg" />
  </div>
    
  <div className="mySlides">
    <img className="petimg"src="images/cat3.jpg" />
  </div>
    
  <a className="prev" onClick= {() => plusSlides(-1)}>❮</a>
  <a className="next" onClick= {() => plusSlides(1)}>❯</a>

  <div className="caption-container">
    <p id="caption"></p>
  </div>

  <div className="row">
    <div className="column">
      <img className="demo cursor" src="images/dog1.jpg"  onClick= {() => currentSlide(1)} alt="BELLA / Male, Young , Mixed Breed "/>
    </div>
    <div className="column">
      <img className="demo cursor" src="images/dog2.jpg"  onClick= {() => currentSlide(2)} alt="MAX / Felmale, Large, Mixed Breed"/>
    </div>
    <div className="column">
      <img className="demo cursor" src="images/dog3.jpg"  onClick= {() => currentSlide(3)} alt="KINGSTON / Felmale, Large, Mixed Breed"/>
    </div>
    <div className="column">
      <img className="demo cursor" src="images/cat1.jpg"  onClick= {() => currentSlide(4)} alt="GIGI / Female, Mixed, 2 years"/>
    </div>
    <div className="column">
      <img className="demo cursor" src="images/cat2.jpg"  onClick= {() => currentSlide(5)} alt="TOM / Male, Mixed, 3 years"/>
    </div>
    <div className="column">
      <img className="demo cursor" src="images/cat3.jpg"  onClick= {() => currentSlide(6)} alt="SANDY / Female, Mixed, 2 years"/>
    </div>
    
  </div>
  
</div>
);
}

