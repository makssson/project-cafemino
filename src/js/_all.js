const menuPositions = document.querySelector(".menu__positions");
const itemsContent = document.querySelectorAll(".menu__item");
const headerBurger = document.querySelector(".nav__burger-wrapper");
const burgerLine = document.querySelector(".burger__line");
const navMenu = document.querySelector(".nav__list");
const hero = document.querySelector(".hero");
const heroNav = document.querySelector(".hero__nav");

menuPositions.addEventListener("click", function (event) {
  menuPositions
    .querySelectorAll(".positions__active")
    .forEach((li) => li.classList.remove("positions__active"));

  event.target.classList.add("positions__active");

  let targetTab = menuPositions.querySelector(".positions__active");
  let dTitle = targetTab.getAttribute("data-title");

  itemsContent.forEach((item) => {
    if (item.getAttribute("data-content") === dTitle) {
      item.classList.add("menu__active");
    } else {
      item.classList.remove("menu__active");
    }
  });
});

function scrollTo(to, duration = 700) {
  const element = document.scrollingElement || document.documentElement,
    start = element.scrollTop,
    change = to - start,
    startDate = +new Date(),
    easeInOutQuad = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    },
    animateScroll = function () {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(
        easeInOutQuad(currentTime, start, change, duration)
      );
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };
  animateScroll();
}

document.addEventListener("DOMContentLoaded", function () {
  let btn = document.querySelector("#toTop");
  window.addEventListener("scroll", function () {
    // Если прокрутили дальше 599px, показываем кнопку
    if (pageYOffset > 100) {
      btn.classList.add("show");
      // Иначе прячем
    } else {
      btn.classList.remove("show");
    }
  });

  // При клике прокручиываем на самый верх
  btn.onclick = function (click) {
    click.preventDefault();
    scrollTo(0, 400);
  };
});

const animation = function () {
  if (headerBurger.getAttribute("class") === "nav__burger-wrapper") {
    headerBurger.setAttribute("class", "nav__burger-wrapper active");
    burgerLine.setAttribute("class", "burger__line active");
    navMenu.setAttribute("class", "nav__list active");
  } else {
    headerBurger.setAttribute("class", "nav__burger-wrapper");
    burgerLine.setAttribute("class", "burger__line");
    navMenu.setAttribute("class", "nav__list");
  }
};

hero.addEventListener("click", function () {
  if (event.target === headerBurger || event.target === burgerLine) {
    animation();
  } else if (event.target === heroNav || event.target === hero) {
    headerBurger.setAttribute("class", "nav__burger-wrapper");
    burgerLine.setAttribute("class", "burger__line");
    navMenu.setAttribute("class", "nav__list");
  }
});
