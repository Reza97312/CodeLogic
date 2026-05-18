import React, { useEffect, useState } from "react";

const ScrollProgressBar = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScroll(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const radius = 35;
  const stroke = 5;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (scroll / 100) * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      style={{
        position: "fixed",
        bottom: "25px",
        right: "25px",
        transform: "rotate(-90deg)",
        zIndex: 9999,
        cursor: "pointer",
        transition: "transform 0.3s ease",
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "rotate(-90deg) scale(1.1)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "rotate(-90deg) scale(1)")
      }
    >
      <circle
        stroke="#eee"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />

      <circle
        stroke="#00d0b1ff"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{ transition: "stroke-dashoffset 0.2s ease-out" }}
      />

      <text
        x={radius + 2}
        y={radius + 5}
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        transform="rotate(90, 35, 35)"
        fill="#a8a8a8ff"
      >
        {Math.round(scroll)}%
      </text>
    </svg>
  );
};

export default ScrollProgressBar;
