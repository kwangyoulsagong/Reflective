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
    console.error("Container 또는 gallery를 찾을 수 없습니다");
    return;
  }

  // 반응형 크기 계산 함수
  const getResponsiveSizes = () => {
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const minDimension = Math.min(containerWidth, containerHeight);

    let radius = minDimension * 0.35; // 반지름을 좀 더 작게 조정
    let itemSize = minDimension * 0.15; // 아이템 크기를 더 작게 조정

    // 모바일 화면에 대한 조정
    if (containerWidth < 768) {
      radius = minDimension * 0.35;
      itemSize = minDimension * 0.15;
    }

    return { radius, itemSize };
  };

  // 갤러리에 아이템 생성 함수
  const createItems = () => {
    gallery.innerHTML = "";
    const { itemSize } = getResponsiveSizes();
    data.forEach((post) => {
      const item = document.createElement("div");
      item.classList.add("item");
      item.style.width = `${itemSize}px`;
      item.style.height = `${itemSize}px`;

      const img = document.createElement("img");
      img.src = post.thumbnail;
      img.alt = post.title;

      item.appendChild(img);
      gallery.appendChild(item);
    });
  };

  // 초기 중앙 집중 레이아웃 설정 함수
  const setInitialCentralizedLayout = () => {
    const items = gallery.querySelectorAll<HTMLElement>(".item");
    if (items.length === 0) return;

    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;

    items.forEach((item) => {
      gsap.set(item, {
        left: centerX - item.offsetWidth / 2,
        top: centerY - item.offsetHeight / 2,
        opacity: 0,
        scale: 0.5,
      });
    });

    // 중앙에서 시작하여 퍼지는 애니메이션
    gsap.to(items, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "back.out(1.7)",
      stagger: {
        from: "center",
        amount: 0.5,
      },
    });
  };

  // 원형 레이아웃 설정 함수
  const setCircularLayout = () => {
    const items = gallery.querySelectorAll<HTMLElement>(".item");
    const angleIncrement = (2 * Math.PI) / data.length;
    const { radius } = getResponsiveSizes();
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
      });
    });
  };

  // 중앙 집중에서 원형 레이아웃으로 전환 애니메이션 함수 (개선)
  const animateToCentralizedToCircular = () => {
    const items = gallery.querySelectorAll<HTMLElement>(".item");
    const state = Flip.getState(items);

    setCircularLayout();

    Flip.from(state, {
      duration: 2,
      ease: "elastic.out(1, 0.8)",
      stagger: {
        from: "center",
        amount: 0.5,
      },
      onStart: () => {
        gsap.to(items, {
          rotation: "+=360",
          duration: 2,
          ease: "power1.inOut",
        });
      },
      onComplete: () => {
        if (message) {
          gsap.fromTo(
            message,
            { opacity: 0, scale: 0.5, y: 50 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1,
              ease: "back.out(1.7)",
            }
          );
        }
        // 추가 효과: 아이템들이 살짝 튀는 애니메이션
        gsap.to(items, {
          y: "-=20",
          duration: 0.5,
          ease: "power1.inOut",
          stagger: {
            from: "random",
            amount: 0.3,
          },
          yoyo: true,
          repeat: 1,
        });
      },
    });
  };

  // 갤러리 초기화 및 애니메이션 시작 함수
  const initGallery = () => {
    createItems();
    setInitialCentralizedLayout();

    // 지연 후 원형 레이아웃으로 애니메이션 적용
    setTimeout(animateToCentralizedToCircular, 2000);
  };

  // 창 크기 변경 처리 함수 (개선)
  const handleResize = () => {
    const items = gallery.querySelectorAll<HTMLElement>(".item");
    const state = Flip.getState(items);

    const { itemSize } = getResponsiveSizes();
    items.forEach((item) => {
      item.style.width = `${itemSize}px`;
      item.style.height = `${itemSize}px`;
    });

    setCircularLayout();

    Flip.from(state, {
      duration: 0.8,
      ease: "elastic.out(1, 0.8)",
      stagger: {
        from: "center",
        amount: 0.2,
      },
    });
  };

  // 갤러리 초기화
  initGallery();

  // 창 크기 변경 이벤트 리스너 추가
  window.addEventListener("resize", handleResize);

  // 이벤트 리스너 제거를 위한 정리 함수
  return () => {
    window.removeEventListener("resize", handleResize);
  };
};
