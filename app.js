let overlay = document.querySelector(".overlay");
let imagearr = [
  "./dataimages/web1.webp",
  "./dataimages/web2.webp",
  "./dataimages/web3.jpg",
  "./dataimages/web4.jpg",
  "./dataimages/web5.jpg",
  "./dataimages/web6.jpg",
  "./dataimages/web7.jpg",
  "./dataimages/web8.webp",
  "./dataimages/web9.jpg",
  "./dataimages/web10.jpg",
];
let t = gsap.timeline();
t.from(".nav h2", {
  opacity: 0,
  y: -100,
  delay: 2,
});

t.from(".content h1", {
  opacity: 0,
  y: 100,
  
});

function locomotive_scroll() {
  gsap.registerPlugin(ScrollTrigger);
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function main() {
  const throttleFunction = (func, delay) => {
    let prev = 0;
    return (...args) => {
      let now = new Date().getTime();
      if (now - prev > delay) {
        prev = now;
        return func(...args);
      }
    };
  };

  // Mousemove event listener with throttling
  overlay.addEventListener(
    "mousemove",
    throttleFunction((e) => {
      createCard(e);
    }, 250) // Adjust the delay as needed
  );

  function createCard(e) {
    // Create a new card
    let card = document.createElement("div");
    card.className = "card";

    // Calculate the position for the card
    let rect = overlay.getBoundingClientRect();
    let cardX = e.clientX - rect.left - 50; // Center the card
    let cardY = e.clientY - rect.top - 50; // Center the card

    // Set the position of the card
    card.style.left = `${cardX}px`;
    card.style.top = `${cardY}px`;

    // Append the card to the overlay
    overlay.appendChild(card);

    // Optional: GSAP animations based on mouse position
    let mid = Math.floor(rect.width / 2);
    if (e.clientX < mid) {
      gsap.to(card, {
        ease: "power3.inOut",
      });
      gsap.from(card, {
        opacity: 0,
        y: 80,
        scale: 0,
        rotate: -20,
      });
    } else if (e.clientX === mid) {
      gsap.from(card, { opacity: 0, y: 40, rotate: 4, scale: 0 });
    } else {
      gsap.from(card, { opacity: 0, y: -100, scale: 0, rotate: 20 });
    }
    appendrandomeimage(card);

    // Fade out and remove the card after a certain time
    setTimeout(() => {
      gsap.to(".card", {
        delay: 1,
        y: 100,
        duration: 0.5,
        opacity: 0,
      });
      //card.style.opacity = '0';
      // Fade out
      setTimeout(() => card.remove(), 400); // Remove after fading
    }, 2000); // Duration before fade out
  }
}

function appendrandomeimage(card) {
  console.log(imagearr);

  let img = document.createElement("img");
  img.className = "image";
  let index = Math.floor(Math.random() * imagearr.length);
  img.src = imagearr[index];
  console.log(index);

  card.appendChild(img);
}

function page2_hoveranimation() {
  function imagehover1() {
    let box1 = document.querySelector(".box1");
    let img1 = document.querySelector(".box1 .image img");
    box1.addEventListener("mouseenter", () => {
      gsap.to(img1, {
        opacity: 1,
      });
    });
    box1.addEventListener("mouseleave", () => {
      gsap.to(img1, {
        opacity: 0,
      });
    });

    box1.addEventListener("mouseenter", () => {
      let h = document.querySelector(".imghover");
      gsap.from(h, {
        y: 100,
      });
      gsap.to(h, {
        left: "55%",
        transform: "rotate(10deg)",
        duration: 0.7,
        opacity: 1,
      });
    });
    box1.addEventListener("mouseleave", () => {
      let h = document.querySelector(".imghover");
      gsap.to(h, {
        left: "55%",
        x: -100,
        transform: "rotate(0deg)",
        duration: 0.8,
        opacity: 0,
      });
    });
  }

  function imagehover2() {
    let box2 = document.querySelector(".box2");
    let img2 = document.querySelector(".box2 .image img");

    box2.addEventListener("mouseenter", () => {
      gsap.to(img2, {
        opacity: 1,
      });
    });
    box2.addEventListener("mouseleave", () => {
      gsap.to(img2, {
        opacity: 0,
      });
    });
    box2.addEventListener("mouseenter", () => {
      let h = document.querySelector(".imghover2");
      gsap.to(h, {
        left: "60%",
        transform: "rotate(10deg)",
        duration: 0.7,
        opacity: 1,
      });
    });
    box2.addEventListener("mouseleave", () => {
      let h = document.querySelector(".imghover2");
      gsap.to(h, {
        left: "55%",
        transform: "rotate(0deg)",
        duration: 1.1,
        opacity: 0,
      });
    });
  }

  function imagehover3() {
    let box3 = document.querySelector(".box3");
    let img3 = document.querySelector(".box3 .image img");

    box3.addEventListener("mouseenter", () => {
      gsap.to(img3, {
        opacity: 1,
      });
    });
    box3.addEventListener("mouseleave", () => {
      gsap.to(img3, {
        opacity: 0,
      });
    });

    box3.addEventListener("mouseenter", () => {
      let h = document.querySelector(".imghover3");
      gsap.to(h, {
        left: "60%",
        transform: "rotate(10deg)",
        duration: 0.7,
        opacity: 1,
      });
    });
    box3.addEventListener("mouseleave", () => {
      let h = document.querySelector(".imghover3");
      gsap.to(h, {
        left: "55%",
        transform: "rotate(0deg)",
        duration: 1.1,
        opacity: 0,
      });
    });
  }

  imagehover1();
  imagehover2();
  imagehover3();
}

function page3_swapping_animation() {
  gsap.to(".swap", {
    x: "-200%",
    scrollTrigger: {
      scroller: ".main",
      trigger: ".swapper",

      scrub: 1,
      start: "top 80%",
    },
    duration: 4,
  });
}

function noteheadeing_page3() {
  //note animation
  gsap.from(".note", {
    rotate: "-15deg",
    opacity: 0,

    scrollTrigger: {
      scroller: ".main",
      trigger: ".page2",

      start: "top 50%",
    },
  });

  gsap.from(".page3head h1", {
    y: -100,
    opacity: 0,
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page3",

      start: "top 50%",
    },
  });
  gsap.from(".page3head h4", {
    y: 100,
    opacity: 0,
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page3",

      start: "top 50%",
    },
  });
}




gsap.to(".loading",{
    y:-1000,
    duration:2,
    delay:1
    
})


function scroller() {
  let scroller = document.querySelector(".scroller");
  let scrollingbody = document.querySelector(".footerborder");

  scrollingbody.addEventListener("mouseenter", (e) => {
    gsap.to(scroller, {
      opacity: 1,
    });
  });
  scrollingbody.addEventListener("mousemove", (e) => {
    gsap.to(scroller, {
      top: e.clientY - 200,
      left: e.clientX - 200,
    });
  });

  scrollingbody.addEventListener("mouseleave", (e) => {
    gsap.to(scroller, {
      opacity: 0,
    });
  });
}
locomotive_scroll();
main();
page2_hoveranimation();
page3_swapping_animation();
noteheadeing_page3();
scroller();
