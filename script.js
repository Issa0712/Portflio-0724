window.onload = function () {
	window.addEventListener('scroll', function (e) {
		if (window.pageYOffset > 100) {
			document.querySelector("header").classList.add('is-scrolling');
		} else {
			document.querySelector("header").classList.remove('is-scrolling');
		}
	});

    const HTML = document.querySelector('html');
	let menu_btn = document.querySelector('.hamburger');
	const mobile_menu = document.querySelector('.mobile-nav');

	menu_btn.addEventListener('click', function () {
        HTML.classList.toggle('state--nav-open');
		menu_btn.classList.toggle('is-active');
		mobile_menu.classList.toggle('is-active');
        
        let isExpanded = this.getAttribute('aria-expanded') === 'true';
        // Toggle the aria-expanded attribute
        this.setAttribute('aria-expanded', !isExpanded);
       	});


    //typing

    const mastheadTitle = document.querySelector('.masthead__title span');
    const titleText = 'I am a Front-end developer';

    function typingTxtEffect(element, text, i = 0) {
        if(i === 0) {
            element.textContent = '';
        }
        element.textContent += titleText[i];

        if(i === titleText.length - 1) {
            return;
        }

        setTimeout(() =>  typingTxtEffect(mastheadTitle, titleText, i + 1), 50 )


    }

    typingTxtEffect(mastheadTitle, titleText);
}


 // Masthead

 const msthVideo = document.querySelector('.masthead .masthead__video');
 const mastheadVideoControl = document.querySelector('.masthead__video-control');

   
 //Reduced Motion Check
 const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


 const playVideo = function(){
     msthVideo.play();
     mastheadVideoControl.setAttribute('aria-pressed', false);
     mastheadVideoControl.querySelector('.state-icon').classList.remove('fa-play');
     mastheadVideoControl.querySelector('.state-icon').classList.add('fa-pause');
     console.log('play')

 }

 const pauseVideo = function(){
     msthVideo.pause();
     mastheadVideoControl.setAttribute('aria-pressed', true);
     mastheadVideoControl.querySelector('.state-icon').classList.remove('fa-pause');
     mastheadVideoControl.querySelector('.state-icon').classList.add('fa-play');

 }

 if(mastheadVideoControl) {
     mastheadVideoControl.addEventListener('click', () => {
         if(msthVideo.paused) {
             playVideo();
         } else {
             pauseVideo();
         }
     })
 }

 

 // If reduced motion setting is on, then pause the autoplay video
 if(isReducedMotion) {
    pauseVideo();
}


//duplicate logos on the slider for smooth transition 
// let logosSlide = document.querySelector('.logos-slide')
// let clone = logosSlide.cloneNode(true)
// let logos = document.querySelector('.logos')
// logos.appendChild(clone)



//timeline

function qs(selector, all = false) {
    return all
      ? document.querySelectorAll(selector)
      : document.querySelector(selector);
  }
  
  const sections = qs(".section", true);
  const timeline = qs(".timeline");
  const line = qs(".line");
  line.style.bottom = `calc(100% - 20px)`;
  let prevScrollY = window.scrollY;
  let up, down;
  let full = false;
  let set = 0;
  const targetY = window.innerHeight * 0.8;
  
  function scrollHandler(e) {
    const { scrollY } = window;
    up = scrollY < prevScrollY;
    down = !up;
    const timelineRect = timeline.getBoundingClientRect();
    const lineRect = line.getBoundingClientRect(); // const lineHeight = lineRect.bottom - lineRect.top;
  
    const dist = targetY - timelineRect.top;
  
    if (down && !full) {
      set = Math.max(set, dist);
      line.style.bottom = `calc(100% - ${set}px)`;
    }
  
    if (dist > timeline.offsetHeight + 50 && !full) {
      full = true;
      line.style.bottom = `-50px`;
    }
  
    sections.forEach((item) => {
      // console.log(item);
      const rect = item.getBoundingClientRect(); //     console.log(rect);
  
      if (rect.top + item.offsetHeight / 5 < targetY) {
        item.classList.add("show-me");
      }
    }); // console.log(up, down);
  
    prevScrollY = window.scrollY;
  }
  
  scrollHandler();
  line.style.display = "block";
  window.addEventListener("scroll", scrollHandler);
