import gsap from "gsap";
import { PostType } from "../types/types";
import CustomEase from "gsap/CustomEase";
import { Flip } from "gsap/Flip";

export const mainAnimator = (data: PostType[]) => {
  gsap.registerPlugin(CustomEase, Flip);

  CustomEase.create(
    "hop",
    "M0,0 C0.053,0.604 0.157,0.72 0.293,0.837 0.435,0.959 0.633,1 1,1"
  );

  const container = document.querySelector<HTMLElement>(".container");
  const gallery = document.querySelector<HTMLElement>(".gallery");
  const message = document.getElementById("message");

  if (!container || !gallery) {
    console.error("Container or gallery not found");
    return;
  }

  // Function to create items in the gallery
  const createItems = () => {
    data.forEach((post) => {
      const item = document.createElement("div");
      item.classList.add("item");

      const img = document.createElement("img");
      img.src = post.thumbnail;
      img.alt = post.title;

      item.appendChild(img);
      gallery.appendChild(item);
    });
  };

  // Function to set initial linear layout
  const setInitialLinearLayout = () => {
    const items = gallery.querySelectorAll<HTMLElement>(".item");
    if (items.length === 0) return;

    const totalItemsWidth = (items.length - 1) * 10 + items[0].offsetWidth;
    const startX = (container.offsetWidth - totalItemsWidth) / 2;

    items.forEach((item, index) => {
      gsap.set(item, {
        left: `${startX + index * 10}px`,
        top: "150%",
        rotation: 0,
      });
    });

    gsap.to(items, {
      top: "50%",
      transform: "translateY(-50%)",
      duration: 1,
      ease: "hop",
      stagger: 0.03,
    });
  };

  // Function to set circular layout
  const setCircularLayout = () => {
    const items = gallery.querySelectorAll<HTMLElement>(".item");
    const angleIncrement = (2 * Math.PI) / data.length;
    const radius = 200;
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;

    items.forEach((item, index) => {
      const angle = index * angleIncrement;
      const x = centerX + radius * Math.cos(angle) - item.offsetWidth / 2;
      const y = centerY + radius * Math.sin(angle) - item.offsetHeight / 2;

      gsap.set(item, {
        top: `${y}px`,
        left: `${x}px`,
        rotation: angle * (180 / Math.PI),
        transform: "translateY(0%)",
      });
    });
  };

  // Function to animate the transition from linear to circular layout
  const animateToCircularLayout = () => {
    const items = gallery.querySelectorAll<HTMLElement>(".item");
    const state = Flip.getState(items);

    setCircularLayout();

    Flip.from(state, {
      duration: 2,
      ease: "hop",
      stagger: -0.03,
      onEnter: (element) => gsap.to(element, { rotation: "+=360" }),
      onComplete: () => {
        if (message) {
          gsap.to(message, {
            opacity: 1,
            duration: 1,
            ease: "power1.inOut",
          });
        }
      },
    });
  };

  // Function to initialize the gallery with items and set the initial layout
  const initGallery = () => {
    createItems();
    setInitialLinearLayout();

    // Call animateToCircularLayout after a delay or based on an event
    setTimeout(animateToCircularLayout, 3000);
  };

  // Initialize the gallery
  initGallery();
};
