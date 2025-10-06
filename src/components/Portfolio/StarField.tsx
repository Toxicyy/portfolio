import * as React from "react";
import { useEffect, useCallback, type FC } from "react";

const StarField: FC = React.memo(() => {
  const createStars = useCallback(() => {
    const starsContainer = document.getElementById("stars-container");
    if (!starsContainer) return;

    const numberOfStars = 150;

    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.animationDelay = Math.random() * 3 + "s";
      star.style.animationDuration = Math.random() * 3 + 2 + "s";
      starsContainer.appendChild(star);
    }
  }, []);

  const createShootingStars = useCallback(() => {
    const starsContainer = document.getElementById("stars-container");
    if (!starsContainer) return;

    const interval = setInterval(() => {
      const shootingStar = document.createElement("div");
      shootingStar.className = "shooting-star";
      shootingStar.style.left = Math.random() * 100 + "%";
      shootingStar.style.top = Math.random() * 50 + "%";
      starsContainer.appendChild(shootingStar);

      setTimeout(() => {
        if (shootingStar.parentNode) {
          shootingStar.parentNode.removeChild(shootingStar);
        }
      }, 3000);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    createStars();
    const cleanupShootingStars = createShootingStars();

    return cleanupShootingStars;
  }, [createStars, createShootingStars]);

  return (
    <>
      <div
        id="stars-container"
        className="fixed inset-0 z-0 pointer-events-none"
      />
      <style>{`
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle linear infinite;
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
        }

        .shooting-star {
          position: absolute;
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ffffff, #a855f7, transparent);
          border-radius: 50%;
          animation: shoot 2.5s linear forwards;
          transform-origin: left center;
          transform: rotate(45deg);
        }

        .shooting-star::before {
          content: "";
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, #ffffff, #a855f7);
          border-radius: 50%;
          box-shadow: 0 0 8px #a855f7;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        @keyframes shoot {
          0% {
            transform: rotate(45deg) translateX(0) scale(0);
            opacity: 1;
          }
          10% {
            transform: rotate(45deg) translateX(0) scale(1);
            opacity: 1;
          }
          90% {
            transform: rotate(45deg) translateX(200px) scale(1);
            opacity: 1;
          }
          100% {
            transform: rotate(45deg) translateX(300px) scale(0);
            opacity: 0;
          }
        }

        html {
          scroll-behavior: smooth;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
});

StarField.displayName = "StarField";

export default StarField;
