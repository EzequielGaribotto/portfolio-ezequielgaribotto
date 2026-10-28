"use client";

import { useEffect, useRef } from "react";
import styles from "./ContourBackdrop.module.css";

const VERTEX = `#version 300 es
in vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }`;

// Thin contour lines of a slow noise field, like the relief map of a quiet landscape.
const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uScroll;
uniform vec3 uColor;
uniform float uAlpha;
out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.02 + 7.3;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 frag = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 p = vec2(frag.x, frag.y + uScroll * 0.35) / 520.0;
  float h = fbm(p + vec2(0.0, uTime * 0.012) + 0.5 * fbm(p * 0.8 - uTime * 0.01));
  float level = h * 11.0;
  float d = min(fract(level), 1.0 - fract(level));
  float w = fwidth(level);
  float line = 1.0 - smoothstep(0.0, w * 1.3, d);
  // Fades out toward the left and right edges so the page margins stay calm
  float edge = smoothstep(0.0, 0.12, frag.x / uRes.x) * smoothstep(0.0, 0.12, 1.0 - frag.x / uRes.x);
  float a = line * uAlpha * edge;
  outColor = vec4(uColor * a, a);
}`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

function readAccent(): [number, number, number] {
  const hex = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) return [0.12, 0.38, 0.63];
  const n = parseInt(m[1], 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

/**
 * A quiet generative backdrop for the projects section: contour lines in the accent colour that drift slowly.
 * The canvas is one viewport tall and fixed, clipped to the section's box, so the shader only ever paints what is
 * on screen, and it fills the empty corners the card columns leave. Decorative: no input, hidden from assistive tech.
 */
export default function ContourBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) return; // no WebGL2: the page simply has no backdrop

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const attribute = gl.getAttribLocation(program, "a");
    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uScroll = gl.getUniformLocation(program, "uScroll");
    const uColor = gl.getUniformLocation(program, "uColor");
    const uAlpha = gl.getUniformLocation(program, "uAlpha");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let frame = 0;
    let last = 0;
    let accent = readAccent();

    // The canvas is fixed to the viewport; only the part inside the section's box shows
    const shell = canvas.parentElement as HTMLElement;
    const clip = () => {
      const box = shell.getBoundingClientRect();
      const top = Math.max(0, box.top);
      const bottom = Math.max(0, window.innerHeight - box.bottom);
      canvas.style.clipPath = `inset(${top}px 0 ${bottom}px 0)`;
    };

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(canvas.clientWidth * scale));
      const height = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
    };

    const draw = (now: number) => {
      const dark = document.documentElement.dataset.theme === "dark";
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduced.matches ? 0 : now / 1000);
      gl.uniform1f(uScroll, reduced.matches ? 0 : window.scrollY);
      gl.uniform3f(uColor, accent[0], accent[1], accent[2]);
      gl.uniform1f(uAlpha, dark ? 0.16 : 0.2);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      // About 30 frames a second is plenty for something this slow
      if (now - last >= 33) {
        last = now;
        draw(now);
      }
      if (!reduced.matches) frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        resize();
        start();
      }
    });
    observer.observe(shell);

    const onScroll = () => {
      clip();
      start();
    };
    const onResize = () => {
      resize();
      clip();
      start();
    };
    const onVisibility = () => start();
    const themeObserver = new MutationObserver(() => {
      accent = readAccent();
      start();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    clip();
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onVisibility);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.backdrop} aria-hidden="true" />;
}
