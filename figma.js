document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById("cursor");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    requestAnimationFrame(animate);
  }
  animate();

  /* TEXT hover */
  document
    .querySelectorAll("p,h1,h2,h3,h4,h5,h6,span,a,button")
    .forEach(el => {
      el.addEventListener("mouseenter", () =>
        cursor.classList.add("cursor-text")
      );
      el.addEventListener("mouseleave", () =>
        cursor.classList.remove("cursor-text")
      );
    });

  /* IMAGE hover */
  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("mouseenter", () =>
      cursor.classList.add("cursor-image")
    );
    img.addEventListener("mouseleave", () =>
      cursor.classList.remove("cursor-image")
    );
  });
});

/* ================= Sidebar ================= */
(function sidebarToggle() {
  const menuBtn = document.querySelector("#menuBtn");
  const sidebar = document.querySelector("#sidebar");
  let isOpen = false;

  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("-right-80", isOpen);
    sidebar.classList.toggle("right-0", !isOpen);
    isOpen = !isOpen;
  });
})();

/* ================= Theme ================= */
(function themeToggle() {
  const themeBtn = document.querySelector("#themeBtn");
  const toggleSlider = document.querySelector("#toggleSlider");
  const sunIcon = themeBtn.querySelector(".fa-sun");
  const moonIcon = themeBtn.querySelector(".fa-moon");

  const sidebar = document.querySelector("#sidebar");
  const sidebarLinks = sidebar.querySelectorAll("ul li a");
  const logoutBtn = document.querySelector("#logoutBtn");
  const menuHeading = document.querySelector("#menuHeading");
  const dropdown = document.querySelector("#navDropdown");

  const THEME_KEY = "theme";

  function applyTheme(isDark) {
    document.body.classList.toggle("dark-theme", isDark);

    toggleSlider.classList.toggle("translate-x-20", isDark);

    sunIcon.classList.toggle("text-yellow-400", !isDark);
    sunIcon.classList.toggle("text-gray-400", isDark);

    moonIcon.classList.toggle("text-gray-600", !isDark);
    moonIcon.classList.toggle("text-yellow-400", isDark);

    dropdown?.classList.toggle("bg-black", isDark);
    dropdown?.classList.toggle("bg-white", !isDark);

    sidebar.classList.toggle("bg-gray-800/70", isDark);

    sidebarLinks.forEach((link) => {
      link.classList.toggle("text-gray-200", isDark);
      link.classList.toggle("text-gray-700", !isDark);
    });

    logoutBtn.classList.toggle("bg-red-600", isDark);
    logoutBtn.classList.toggle("bg-[#d62828]", !isDark);

    menuHeading.classList.toggle("text-gray-100", isDark);
    menuHeading.classList.toggle("text-gray-800", !isDark);

    // ================= Section bg toggle =================
    const sec4 = document.querySelector("#section-4");
    const sec5 = document.querySelector("#section-5");

    if (isDark) {
      sec4.classList.remove("bg-[#f3ffe3]");
      sec5.classList.remove("bg-[#e2e2e2]");
    } else {
      sec4.classList.add("bg-[#f3ffe3]");
      sec5.classList.add("bg-[#e2e2e2]");
    }

    // Save theme in localStorage
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  }

  // Load saved theme
  const savedTheme = localStorage.getItem(THEME_KEY);
  applyTheme(savedTheme === "dark");

  themeBtn.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-theme");
    applyTheme(isDark);
  });
})();

// Navbar nalinks functionallty

// ===== SELECTORS =====

function dropdown() {
  const navLinks = document.querySelectorAll(".navLinks");
  const dropdown = document.getElementById("navDropdown");

  // ===== STATE =====
  let isOpen = false;
  let activeNav = "";

  // ===== DATA =====
  const navData = {
    Products:
      "Explore powerful design tools to create, prototype, and collaborate on interfaces, design systems, and interactive experiences — all in one unified platform.",

    Solutions:
      "Discover tailored solutions for product teams, designers, developers, and enterprises to streamline workflows and improve collaboration at every stage.",

    Community:
      "Connect with a global design community to explore shared files, templates, plugins, events, and inspiration created by designers worldwide.",

    Resources:
      "Access learning materials, tutorials, documentation, best practices, and support resources to help you master design and build better products.",
  };

  // ===== RESET ARROWS =====
  function resetAllArrows() {
    navLinks.forEach((link) => {
      const icon = link.querySelector("i");
      if (icon) icon.style.transform = "rotate(0deg)";
    });
  }

  // ===== CLICK LOGIC =====
  navLinks.forEach((link) => {
    const icon = link.querySelector("i");
    const title = link.childNodes[0].textContent.trim(); // 🔥 FIX

    link.addEventListener("click", () => {
      // Pricing ke liye dropdown nahi
      if (!icon) return;

      // same nav → close
      if (isOpen && activeNav === title) {
        dropdown.style.height = "0";
        resetAllArrows();
        isOpen = false;
        activeNav = "";
        return;
      }

      activeNav = title;
      resetAllArrows();

      // arrow rotate
      icon.style.transition = "transform 0.3s ease";
      icon.style.transform = "rotate(180deg)";

      dropdown.innerHTML = "";

      const content = document.createElement("div");
      content.style.width = "50%";
      content.style.textAlign = "justify";
      content.style.padding = "60px";
      content.style.fontSize = "22px";
      content.style.opacity = "0";
      content.style.transform = "translateY(-20px)";
      content.style.transition = "all 0.4s ease";

      content.innerText = navData[title] || "No content";

      dropdown.appendChild(content);
      dropdown.style.height = "250px";

      setTimeout(() => {
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
      }, 100);

      isOpen = true;
    });
  });

  // ===== HOVER ARROW MOVE =====
  navLinks.forEach((link) => {
    const icon = link.querySelector("i");
    if (!icon) return;

    link.addEventListener("mouseenter", () => {
      icon.style.transform = "translateY(2px)";
    });

    link.addEventListener("mouseleave", () => {
      if (activeNav !== link.childNodes[0].textContent.trim()) {
        icon.style.transform = "translateY(0)";
      }
    });
  });
}

dropdown();

// card slide
const track = document.getElementById("sliderTrack");
let speed = 1; // pixels per frame
let position = 0;

// total width of original cards (without duplicates)
const originalCards = track.children.length / 2;
let cardWidth = track.children[0].offsetWidth + 5; // card + gap
let totalWidth = cardWidth * originalCards;

function animate() {
  position -= speed;

  // seamless reset
  if (position <= -totalWidth) {
    position = 0;
  }

  track.style.transform = `translateX(${position}px)`;
  requestAnimationFrame(animate);
}

animate();

// overlay headings handle

const cloneHeadings = [
  "Cloned slides ensure seamless infinite scrolling.",
  "Hover effects highlight the center video.",
  "Adjacent slides slightly scale for focus.",
  "Looping prevents gaps at slider ends.",
  "Smooth transitions animate the slide movement.",
];

const titleEl = document.getElementById("title");
let index = 0;

function showHeading() {
  // Clear previous
  titleEl.textContent = "";

  const heading = cloneHeadings[index];
  let charIndex = 0;

  // Type effect
  const typer = setInterval(() => {
    if (charIndex < heading.length) {
      titleEl.textContent += heading[charIndex];
      charIndex++;
    } else {
      clearInterval(typer);
      // Wait 2s, then show next heading
      setTimeout(() => {
        index = (index + 1) % cloneHeadings.length;
        showHeading();
      }, 2000);
    }
  }, 50); // typing speed (50ms per character)
}

showHeading();

//  Explore what people are making

const projectsData = [
  {
    image: "./assets/photo1.jpg",
    title: "Modern Dashboard UI",
    userImage: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",

    downloadLinkTitle: "Download UI Kit",
  },
  {
    image: "./assets/photo2.jpg",
    title: "Creative Portfolio Website",
    userImage: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",

    downloadLinkTitle: "Download Source Code",
  },
  {
    image: "./assets/photo3.jpg",
    title: "E-commerce Product Page",
    userImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",

    downloadLinkTitle: "Download Assets",
  },
  {
    image: "./assets/photo4.jpg",
    title: "Mobile App Landing Page",
    userImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",

    downloadLinkTitle: "Download Landing Page",
  },
  {
    image: "./assets/photo5.jpg",
    title: "AI SaaS Website Design",
    userImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",

    downloadLinkTitle: "Download Design Files",
  },
  {
    image: "./assets/photo6.jpg",
    title: "Creative Agency Homepage",
    userImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",

    downloadLinkTitle: "Download Template",
  },
  {
    image: "./assets/photo7.jpg",
    title: "Minimal Blog Layout",
    userImage: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c",

    downloadLinkTitle: "Download Blog Theme",
  },
  {
    image: "./assets/photo8.jpg",
    title: "Startup Pitch Website",
    userImage: "https://images.unsplash.com/photo-1545996124-0501ebae84d0",

    downloadLinkTitle: "Download Pitch Files",
  },
];

function exploreUser() {
  const exploreDiv = document.getElementById("explore-div");

  projectsData.forEach((item) => {
    // CARD
    const card = document.createElement("div");
    card.className =
      "group bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col";

    // IMAGE WRAP
    const imgWrap = document.createElement("div");
    imgWrap.className = "w-full h-40 overflow-hidden";

    const img = document.createElement("img");
    img.src = item.image;
    img.className =
      "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500";

    imgWrap.appendChild(img);

    // CONTENT
    const content = document.createElement("div");
    content.className = "p-4 flex flex-col gap-3 flex-1 cursor-pointer";

    // TITLE
    const title = document.createElement("h3");
    title.innerText = item.title;
    title.className = "text-lg font-semibold leading-snug text-black";

    // USER
    const userWrap = document.createElement("div");
    userWrap.className = "flex items-center gap-3 mt-auto";

    const userImg = document.createElement("img");
    userImg.src = item.userImage;
    userImg.className = "w-8 h-8 rounded-full object-cover";

    const links = document.createElement("div");
    links.className = "flex gap-3 text-sm";

    // DOWNLOAD LINK ONLY
    const download = document.createElement("a");
    download.innerText = item.downloadLinkTitle;
    download.href = item.downloadLink;
    download.className = "text-gray-600 hover:underline";

    // APPEND
    links.appendChild(download);

    userWrap.appendChild(userImg);
    userWrap.appendChild(links);

    content.appendChild(title);
    content.appendChild(userWrap);

    card.appendChild(imgWrap);
    card.appendChild(content);

    exploreDiv.appendChild(card);
  });
}

exploreUser();

// section 9

document.addEventListener("DOMContentLoaded", () => {
  const sliderTrack = document.getElementById("sec9-bottom-bar");
  const nextSlideBtn = document.getElementById("nextBtn");
  const prevSlideBtn = document.getElementById("prevBtn");
  const currentIndexEl = document.getElementById("currentIndex");
  const totalCountEl = document.getElementById("totalCount");

  const templatesData = [
    { title: "Websites", bg: "#e4ff97", img: "./assets/template1.avif" },
    { title: "Social media", bg: "#00b6ff", img: "./assets/template2.avif" },
    { title: "Mobile apps", bg: "#24cb71", img: "./assets/template3.avif" },
    { title: "Presentations", bg: "#c4baff", img: "./assets/template4.avif" },
    { title: "Invitations", bg: "#95b9ac", img: "./assets/template6.avif" },
    { title: "Illustrations", bg: "#ff7237", img: "./assets/template5.avif" },
    {
      title: "Portfolio templates",
      bg: "#cb9fd2",
      img: "./assets/template7.avif",
    },
    { title: "Plugins", bg: "#ffc9c1", img: "./assets/template8.avif" },
    {
      title: "Web ads",
      bg: "#721c1c",
      img: "./assets/template9.avif",
      textWhite: true,
    },
    { title: "Icons", bg: "#c7f8fb", img: "./assets/template10.avif" },
  ];

  function createCard(item) {
    const card = document.createElement("div");
    card.className = "w-[18%] h-[300px] shrink-0 relative whitespace-nowrap";
    card.style.backgroundColor = item.bg;

    const title = document.createElement("p");
    title.innerText = item.title;
    title.className = `text-2xl font-semibold p-5 ${item.textWhite ? "text-white" : "text-black"}`;

    const img = document.createElement("img");
    img.src = item.img;
    img.className = "absolute bottom-0 left-0 w-full";

    card.append(title, img);
    return card;
  }

  // CREATE CARDS
  templatesData.forEach((item) => sliderTrack.appendChild(createCard(item)));

  // CLONES for infinite effect
  sliderTrack.appendChild(createCard(templatesData[0])); // first clone
  sliderTrack.insertBefore(
    createCard(templatesData[templatesData.length - 1]),
    sliderTrack.firstChild,
  ); // last clone

  let sliderIndex = 1;
  const gap = 28;
  const slideWidth = sliderTrack.children[0].offsetWidth + gap;
  const totalSlides = templatesData.length;

  sliderTrack.style.transform = `translateX(-${sliderIndex * slideWidth}px)`;
  totalCountEl.innerText = totalSlides;
  currentIndexEl.innerText = sliderIndex;

  function updateCounter() {
    let displayIndex = sliderIndex;
    if (sliderIndex === 0) displayIndex = totalSlides;
    if (sliderIndex === totalSlides + 1) displayIndex = 1;
    currentIndexEl.innerText = displayIndex;
  }

  // BUTTONS
  nextSlideBtn.addEventListener("click", () => {
    sliderIndex++;
    sliderTrack.style.transition = "transform 0.45s ease";
    sliderTrack.style.transform = `translateX(-${sliderIndex * slideWidth}px)`;
  });

  prevSlideBtn.addEventListener("click", () => {
    sliderIndex--;
    sliderTrack.style.transition = "transform 0.45s ease";
    sliderTrack.style.transform = `translateX(-${sliderIndex * slideWidth}px)`;
  });

  // TRANSITION END - update counter AFTER transition
  sliderTrack.addEventListener("transitionend", () => {
    if (sliderIndex === 0) {
      sliderTrack.style.transition = "none";
      sliderIndex = totalSlides;
      sliderTrack.style.transform = `translateX(-${sliderIndex * slideWidth}px)`;
    }
    if (sliderIndex === totalSlides + 1) {
      sliderTrack.style.transition = "none";
      sliderIndex = 1;
      sliderTrack.style.transform = `translateX(-${sliderIndex * slideWidth}px)`;
    }
    updateCounter(); // ✅ update counter only after transition
  });
});
