import React, { useRef, useEffect, useCallback, useState } from 'react';

/* ───────────────────────────────────────────────────────────────
 *  TechOrbitalSphere
 *
 *  A stunning interactive 3D orbital cloud of tech-stack badges
 *  that auto-rotates and can be freely spun with mouse drag.
 *
 *  Pure React + Canvas — no Three.js dependency needed.
 *  Each badge is a colored glowing icon with its tech name,
 *  positioned on a spherical surface and depth-sorted for
 *  correct occlusion + scale perspective.
 * ─────────────────────────────────────────────────────────────── */

interface TechItem {
  name: string;
  color: string;
  svgPath: string;
  viewBox?: string;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

/* Fibonacci sphere distributes N points evenly on a sphere surface */
function fibonacciSphere(count: number, radius: number): Point3D[] {
  const points: Point3D[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // -1 to 1
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push({
      x: Math.cos(theta) * radiusAtY * radius,
      y: y * radius,
      z: Math.sin(theta) * radiusAtY * radius,
    });
  }
  return points;
}

function rotateY(p: Point3D, angle: number): Point3D {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: p.x * cos + p.z * sin,
    y: p.y,
    z: -p.x * sin + p.z * cos,
  };
}

function rotateX(p: Point3D, angle: number): Point3D {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: p.x,
    y: p.y * cos - p.z * sin,
    z: p.y * sin + p.z * cos,
  };
}

const TECH_STACK: TechItem[] = [
  {
    name: 'React',
    color: '#61DAFB',
    svgPath: 'M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.592.068-.838.182-.785.36-1.177 1.243-1.117 2.496.066 1.382.518 3.095 1.303 4.963-1.726.668-3.08 1.469-3.898 2.331C1.915 12.021 1.5 12.849 1.5 13.6c0 .81.473 1.677 1.392 2.498.805.72 1.947 1.413 3.343 2.03a19.653 19.653 0 0 0-.434 1.555c-.203.88-.278 1.647-.218 2.275.082.856.41 1.477 1 1.749.236.109.502.163.79.163 1.348 0 3.103-.957 4.878-2.613 1.776 1.657 3.534 2.613 4.883 2.613.288 0 .555-.054.79-.163.59-.272.918-.893 1-1.749.06-.628-.015-1.395-.218-2.275a19.655 19.655 0 0 0-.434-1.555c1.396-.617 2.538-1.31 3.343-2.03.919-.821 1.392-1.689 1.392-2.498 0-.751-.415-1.579-1.054-2.293-.818-.862-2.172-1.663-3.898-2.331a16.97 16.97 0 0 0 1.303-4.963c.06-1.253-.332-2.136-1.117-2.496a1.772 1.772 0 0 0-.838-.182zM6.684 3.205c.07 0 .13.01.182.03.27.124.46.55.414 1.465-.045.95-.373 2.16-.934 3.554a22.72 22.72 0 0 0-2.13-.595c.132-.348.273-.688.422-1.017.65-1.451 1.367-2.601 2.046-3.437zm10.631 0c.679.836 1.396 1.986 2.046 3.437.15.329.29.669.422 1.017a22.72 22.72 0 0 0-2.13.595c-.56-1.394-.889-2.604-.934-3.554-.046-.915.144-1.341.414-1.465a.418.418 0 0 1 .182-.03zM12 8.082c.614.611 1.217 1.31 1.795 2.087a25.85 25.85 0 0 0-3.59 0A18.77 18.77 0 0 1 12 8.082zM8.77 11.05c.542-.05 1.09-.076 1.647-.076h3.167c.557 0 1.105.026 1.647.076a24.5 24.5 0 0 1 1.263 2.296c.46.966.856 1.949 1.181 2.93-.325.981-.72 1.964-1.18 2.93a24.5 24.5 0 0 1-1.264 2.296A24.7 24.7 0 0 1 12 21.577c-1.14 0-2.249-.084-3.23-.25a24.5 24.5 0 0 1-1.264-2.295A25.08 25.08 0 0 1 6.325 16.1c.325-.981.72-1.964 1.181-2.93a24.5 24.5 0 0 1 1.263-2.296v.176z',
  },
  {
    name: 'Next.js',
    color: '#E2E8F0',
    svgPath: 'M18.665 21.978C16.808 23.255 14.49 24 12 24 5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12c0 3.584-1.574 6.801-4.067 9.001L9.232 7.2H7.2v9.6h1.6V9.92l9.865 12.058zM16.8 7.2h-1.6v5.6h1.6V7.2z',
  },
  {
    name: 'TypeScript',
    color: '#3178C6',
    svgPath: 'M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.473.598.614.957.14.36.21.776.21 1.25 0 .647-.118 1.18-.354 1.598-.236.419-.551.75-.945.993-.394.242-.848.41-1.36.504-.514.094-1.048.141-1.601.141-.269 0-.568-.014-.897-.042a6.891 6.891 0 0 1-.966-.131 5.894 5.894 0 0 1-.89-.252 3.834 3.834 0 0 1-.715-.362v-2.655c.263.228.552.428.866.601.315.174.64.319.977.436a5.64 5.64 0 0 0 1.002.245c.33.058.645.088.945.088.3 0 .57-.028.81-.084.24-.056.443-.14.609-.252.166-.111.294-.249.384-.414.09-.165.135-.363.135-.596a1.15 1.15 0 0 0-.153-.577c-.103-.18-.253-.344-.45-.492a4.61 4.61 0 0 0-.717-.422 21.46 21.46 0 0 0-.972-.44c-.453-.193-.855-.398-1.208-.615a4.213 4.213 0 0 1-.912-.73 2.917 2.917 0 0 1-.575-.936c-.132-.348-.198-.753-.198-1.213 0-.606.119-1.12.357-1.54.237-.422.562-.764.974-1.027a4.459 4.459 0 0 1 1.42-.588 6.86 6.86 0 0 1 1.727-.209zm-16.3.282h7.856v1.97H7.965v10.5H5.672v-10.5H3.006V10.032h-1.818v.031z',
  },
  {
    name: 'JavaScript',
    color: '#F7DF1E',
    svgPath: 'M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z',
  },
  {
    name: 'Java',
    color: '#F89820',
    viewBox: '0 0 384 512',
    svgPath: 'M277.74 312.9c9.8-6.7 23.4-12.5 23.4-12.5s-38.7 7-77.2 10.2c-47.1 3.9-97.7 4.7-123.1 1.3-60.1-8 33-30.1 33-30.1s-36.1-2.4-80.6 19c-52.5 25.4 130 37 224.5 12.1zm-85.4-32.1c-19-42.7-83.1-80.2 0-145.8C296 53.2 242.84 0 242.84 0c21.5 84.5-75.6 110.1-110.7 162.6-23.9 35.9 11.7 74.4 60.2 118.2zm114.6-176.2c.1 0-175.2 43.8-91.5 140.2 24.7 28.4-6.5 54-6.5 54s62.7-32.4 33.9-72.9c-26.9-37.8-47.5-56.6 64.1-121.3zm-6.1 270.5a12.19 12.19 0 0 1-2 2.6c128.3-33.7 81.1-118.9 19.8-97.3a17.33 17.33 0 0 0-8.2 6.3 70.45 70.45 0 0 1 11-3c31-6.5 75.5 41.5-20.6 91.4zM348 437.4s14.5 11.9-15.9 21.2c-57.9 17.5-240.8 22.8-291.6.7-18.3-7.9 16-19 26.8-21.3 11.2-2.4 17.7-2 17.7-2-20.3-14.3-131.3 28.1-56.4 40.2C232.84 509.4 401 461.3 348 437.4zM124.44 396c-78.7 22 47.9 67.4 148.1 24.5a185.89 185.89 0 0 1-28.2-13.8c-44.7 8.5-65.4 9.1-106 4.5-33.5-3.8-13.9-15.2-13.9-15.2zm179.8 97.2c-78.7 14.8-175.8 13.1-233.3 3.6 0-.1 11.8 9.7 72.4 13.6 92.2 5.9 233.8-3.3 237.1-46.9 0 0-6.4 16.5-76.2 29.7zM260.64 353c-59.2 11.4-93.5 11.1-136.8 6.6-33.5-3.5-11.6-19.7-11.6-19.7-86.8 28.8 48.2 61.4 169.5 25.9a60.37 60.37 0 0 1-21.1-12.8z',
  },
  {
    name: 'Spring Boot',
    color: '#6DB33F',
    svgPath: 'M21.577 9.613c-.322-.962-1.076-2.023-2.074-2.883-1.002-.862-2.128-1.503-3.136-1.79-1.007-.286-1.782-.244-2.31.066l-.004.002c-.524.307-.803.905-.758 1.636.046.732.399 1.603.968 2.457.57.855 1.341 1.685 2.125 2.302.784.618 1.579 1.01 2.126 1.076a.44.44 0 0 0 .164-.027c.28-.109.52-.379.704-.758.183-.379.28-.85.195-1.081zm-9.565 8.783c.962.322 2.023 1.076 2.883 2.074.862 1.002 1.503 2.128 1.79 3.136.286 1.007.244 1.782-.066 2.31l-.002.004c-.307.524-.905.803-1.636.758-.732-.046-1.603-.399-2.457-.968-.855-.57-1.685-1.341-2.302-2.125-.618-.784-1.01-1.579-1.076-2.126a.44.44 0 0 1 .027-.164c.109-.28.379-.52.758-.704.379-.183.85-.28 1.081-.195zm-6.398-4.218c-.855-.57-1.685-1.341-2.302-2.125-.618-.784-1.01-1.579-1.076-2.126a.44.44 0 0 1 .027-.164c.109-.28.379-.52.758-.704.379-.183.85-.28 1.081-.195.962.322 2.023 1.076 2.883 2.074.862 1.002 1.503 2.128 1.79 3.136.286 1.007.244 1.782-.066 2.31l-.002.004c-.307.524-.905.803-1.636.758-.732-.046-1.603-.399-2.457-.968zm10.742-5.461c-.57-.855-1.341-1.685-2.125-2.302-.784-.618-1.579-1.01-2.126-1.076a.44.44 0 0 0-.164.027c-.28.109-.52.379-.704.758-.183.379-.28.85-.195 1.081.322.962 1.076 2.023 2.074 2.883 1.002.862 2.128 1.503 3.136 1.79 1.007.286 1.782.244 2.31-.066l.004-.002c.524-.307.803-.905.758-1.636-.046-.732-.399-1.603-.968-2.457zM22.012 12c0 5.529-4.483 10.012-10.012 10.012S1.988 17.529 1.988 12 6.471 1.988 12 1.988 22.012 6.471 22.012 12z',
  },
  {
    name: 'Python',
    color: '#3776AB',
    svgPath: 'M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z',
  },
  {
    name: 'Node.js',
    color: '#339933',
    svgPath: 'M11.998 24c-.321 0-.641-.084-.922-.247L8.14 21.988c-.438-.245-.224-.332-.08-.383.585-.203.703-.249 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.282.282 0 0 0-.137-.242l-8.791-5.072a.278.278 0 0 0-.271 0L3.075 6.68a.284.284 0 0 0-.139.241v10.12a.27.27 0 0 0 .139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v9.994c0 1.746-.951 2.746-2.604 2.746-.509 0-.909 0-2.026-.55l-2.307-1.33A1.85 1.85 0 0 1 1.36 17.04V6.921c0-.645.344-1.248.901-1.572l8.795-5.082c.542-.305 1.264-.305 1.8 0l8.794 5.082c.559.324.904.927.904 1.572v10.12c0 .644-.345 1.245-.904 1.57l-8.795 5.082a1.833 1.833 0 0 1-.857.307z',
  },
  {
    name: 'Express',
    color: '#A1A1AA',
    svgPath: 'M24 18.579h-2.528l-4.596-7.05-4.57 7.05H9.778l5.857-8.995L10.024 1H12.55l4.338 6.744L21.2 1h2.528l-5.632 8.584L24 18.579zM4.604 18.579H2.076V1h2.528v17.579zM7.272 5.617H4.744V3.136h2.528v2.481z',
  },
  {
    name: 'PostgreSQL',
    color: '#4169E1',
    svgPath: 'M12.186 2.04c-3.13 0-5.88 1.55-6.84 3.77-.52 1.2-.38 2.65.34 3.71-.35.53-.87 1.13-1.6 1.75-1.39 1.18-3.08 1.95-3.08 4.23 0 2.54 2.1 4.54 4.8 4.54 1.34 0 2.53-.49 3.44-1.31.81.4 1.76.62 2.76.62 1.28 0 2.47-.36 3.47-1 .82.72 1.88 1.15 3.03 1.15 2.48 0 4.49-1.92 4.49-4.39 0-2.1-1.48-3.83-3.47-4.25.26-.82.39-1.69.39-2.58 0-3.46-2.56-6.24-5.73-6.24zm0 1.5c2.34 0 4.23 2.12 4.23 4.74 0 .82-.19 1.59-.53 2.27-.47-.16-.97-.25-1.49-.25-1.74 0-3.23.95-4.02 2.37-.58-.3-1.23-.47-1.93-.47-.94 0-1.8.31-2.49.83-.34-.73-.37-1.64.04-2.45.69-1.37 2.64-2.54 4.87-2.54.41 0 .82.04 1.22.12.39-.42.84-.76 1.35-1.02-.38-.07-.78-.1-1.18-.1-1.77 0-3.37.7-4.48 1.82-.09-.32-.12-.66-.07-1.01.69-1.71 2.87-4.31 6.46-4.31z',
  },
  {
    name: 'Tailwind CSS',
    color: '#06B6D4',
    svgPath: 'M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z',
  },
  {
    name: 'HTML5',
    color: '#E34F26',
    svgPath: 'M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z',
  },
  {
    name: 'CSS3',
    color: '#1572B6',
    svgPath: 'M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.002l5.379-1.443.744-8.157V4.413z',
  },
  {
    name: 'Docker',
    color: '#2496ED',
    svgPath: 'M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z',
  },
  {
    name: 'Git',
    color: '#F05032',
    svgPath: 'M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.66 2.66a1.838 1.838 0 1 1-1.103 1.03l-2.48-2.48v6.53a1.838 1.838 0 1 1-1.513-.036V8.73a1.839 1.839 0 0 1-.998-2.41L7.636 3.593.45 10.78c-.603.604-.603 1.584 0 2.189l10.48 10.477c.604.604 1.584.604 2.189 0l10.43-10.43c.603-.603.603-1.583-.003-2.187',
  },
  {
    name: 'GitHub',
    color: '#8B949E',
    svgPath: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
];

/* How many unique path2D objects to pre-cache */
const svgPathCache = new Map<string, Path2D>();
function getCachedPath(svgPath: string): Path2D {
  let p = svgPathCache.get(svgPath);
  if (!p) {
    p = new Path2D(svgPath);
    svgPathCache.set(svgPath, p);
  }
  return p;
}

export const TechOrbitalSphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const pointsRef = useRef<Point3D[]>([]);

  /* Rotation state persisted across frames */
  const rotRef = useRef({ angleY: 0, angleX: 0 });
  /* Drag state */
  const dragRef = useRef({ active: false, lastX: 0, lastY: 0, velX: 0, velY: 0 });
  /* Hovered badge index (-1 = none) */
  const [hoveredIdx, setHoveredIdx] = useState(-1);

  /* ──────── responsive sizing ──────── */
  const getRadius = useCallback(() => {
    if (!containerRef.current) return 210;
    const w = containerRef.current.clientWidth;
    // Clamp between 150 (mobile) and 275 (desktop)
    return Math.min(275, Math.max(150, w * 0.38));
  }, []);

  /* ──────── initialise points ──────── */
  useEffect(() => {
    pointsRef.current = fibonacciSphere(TECH_STACK.length, getRadius());
  }, [getRadius]);

  /* ──────── draw loop ──────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const w = container.clientWidth;
      const h = container.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      pointsRef.current = fibonacciSphere(TECH_STACK.length, getRadius());
    };
    resize();
    window.addEventListener('resize', resize);

    /* ──── animation frame ──── */
    const draw = () => {
      const drag = dragRef.current;

      // Natural auto-rotation & inertia decay
      if (!drag.active) {
        rotRef.current.angleY += 0.003;
        rotRef.current.angleX += 0.0005;

        if (Math.abs(drag.velX) > 0.0001 || Math.abs(drag.velY) > 0.0001) {
          rotRef.current.angleY += drag.velX;
          rotRef.current.angleX += drag.velY;
          drag.velX *= 0.96;
          drag.velY *= 0.96;
        }
      }

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.scale(dpr, dpr);

      const cx = w / (2 * dpr);
      const cy = h / (2 * dpr);

      // Project & depth-sort
      const projected = pointsRef.current.map((p, i) => {
        let rp = rotateY(p, rotRef.current.angleY);
        rp = rotateX(rp, rotRef.current.angleX);
        const radius = getRadius();
        const depth = (rp.z + radius) / (2 * radius); // 0 (back) to 1 (front)
        return { x: rp.x + cx, y: rp.y + cy, z: rp.z, depth, idx: i };
      });

      // Sort: draw back-to-front
      projected.sort((a, b) => a.z - b.z);

      for (const item of projected) {
        const tech = TECH_STACK[item.idx];
        const isHovered = item.idx === hoveredIdx;

        const scale = 0.45 + item.depth * 0.55;
        const alpha = 0.15 + item.depth * 0.85;

        const badgeSize = (isHovered ? 68 : 56) * scale;
        const iconSize = (isHovered ? 30 : 24) * scale;

        ctx.globalAlpha = Math.min(1, isHovered ? 1 : alpha);

        // ── Badge Background (frosted pill) ──
        const bx = item.x - badgeSize / 2;
        const by = item.y - badgeSize / 2;
        const br = badgeSize * 0.28;

        ctx.save();

        // Outer glow - only apply expensive shadowBlur on hover to maintain 60 FPS
        if (isHovered) {
          ctx.shadowColor = tech.color;
          ctx.shadowBlur = 24;
        }

        // Badge bg
        ctx.beginPath();
        ctx.roundRect(bx, by, badgeSize, badgeSize, br);
        ctx.fillStyle = isHovered
          ? `rgba(255,255,255,0.18)`
          : `rgba(255,255,255,${0.04 + item.depth * 0.06})`;
        ctx.fill();

        // Border
        ctx.strokeStyle = isHovered
          ? tech.color
          : `rgba(255,255,255,${0.08 + item.depth * 0.1})`;
        ctx.lineWidth = isHovered ? 1.8 : 1.0;
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';

        // ── Draw SVG icon ──
        const iconX = item.x - iconSize / 2;
        const iconY = item.y - iconSize / 2 - 5 * scale;

        ctx.save();
        const vbParts = (tech.viewBox || '0 0 24 24').split(' ').map(Number);
        const vbW = vbParts[2] || 24;
        const vbH = vbParts[3] || 24;
        const maxDim = Math.max(vbW, vbH);
        const s = iconSize / maxDim;
        ctx.translate(iconX + (iconSize - vbW * s) / 2, iconY + (iconSize - vbH * s) / 2);
        ctx.scale(s, s);
        ctx.fillStyle = tech.color;
        ctx.fill(getCachedPath(tech.svgPath));
        ctx.restore();

        // ── Tech name ──
        const fontSize = Math.max(9.5, 12 * scale);
        ctx.font = `600 ${fontSize}px 'Inter', system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = isHovered
          ? '#ffffff'
          : `rgba(255,255,255,${0.45 + item.depth * 0.55})`;
        ctx.fillText(
          tech.name,
          item.x,
          item.y + iconSize / 2 - 3 * scale
        );

        ctx.restore();
      }

      ctx.restore();
      if (isVisible) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(rafRef.current);
        }
      },
      { rootMargin: '0px' }
    );
    observer.observe(container);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [hoveredIdx, getRadius]);

  /* ──────── mouse interaction ──────── */
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    dragRef.current = { active: true, lastX: e.clientX, lastY: e.clientY, velX: 0, velY: 0 };
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (drag.active) {
      const dx = e.clientX - drag.lastX;
      const dy = e.clientY - drag.lastY;
      rotRef.current.angleY += dx * 0.006;
      rotRef.current.angleX += dy * 0.006;
      drag.velX = dx * 0.006;
      drag.velY = dy * 0.006;
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
    }

    // Hit-test for hovered badge
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const radius = getRadius();

    let closestIdx = -1;
    let closestDist = Infinity;

    pointsRef.current.forEach((p, i) => {
      let rp = rotateY(p, rotRef.current.angleY);
      rp = rotateX(rp, rotRef.current.angleX);
      const px = rp.x + cx;
      const py = rp.y + cy;
      const depth = (rp.z + radius) / (2 * radius);
      const dist = Math.hypot(mx - px, my - py);
      const hitRadius = 35 * (0.45 + depth * 0.55);
      if (dist < hitRadius && dist < closestDist && depth > 0.35) {
        closestDist = dist;
        closestIdx = i;
      }
    });

    setHoveredIdx(closestIdx);
  }, [getRadius]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (canvas) canvas.releasePointerCapture(e.pointerId);
    dragRef.current.active = false;
  }, []);

  const onPointerLeave = useCallback((e: React.PointerEvent) => {
    onPointerUp(e);
    setHoveredIdx(-1);
  }, [onPointerUp]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[600px] mx-auto select-none"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Ambient radial glow behind the sphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(204,51,102,0.08) 0%, rgba(204,51,102,0.02) 40%, transparent 70%)',
        }}
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
      />
    </div>
  );
};
