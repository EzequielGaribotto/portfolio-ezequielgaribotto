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
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = p * 2.02 + 7.3;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 frag = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 p = vec2(frag.x, frag.y + uScroll * 0.35) / 520.0;
  float h = fbm(p + vec2(0.0, uTime * 0.012) + 0.6 * noise(p * 0.8 - uTime * 0.01));
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
 * A quiet generative backdrop for the whole page: contour lines in the accent colour that drift slowly behind everything.
 * The canvas is one viewport tall and fixed, so the shader only ever paints what is on screen, and it fills the empty
 * corners the cards leave. Decorative: no input, hidden from assistive tech.
 */
export default function ContourBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", {
      premultipliedAlpha: true,
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
    });
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
    let frame = 0;
    let lastFrame = 0;
    let clock = 0; // seconds of drift, advanced only by frames that were drawn
    let accent = readAccent();
    let dark = document.documentElement.dataset.theme === "dark";
    let offset = window.scrollY; // the scroll position the lines follow, eased so they glide instead of stepping
    let velocity = 0;

    // Pixel budget: the lines are thin and faint, so the field never needs more than about a megapixel
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const scale = Math.min(1, Math.sqrt(1_100_000 / Math.max(1, w * h)));
      const width = Math.max(1, Math.round(w * scale));
      const height = Math.max(1, Math.round(h * scale));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
    };

    const draw = () => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, clock);
      gl.uniform1f(uScroll, offset);
      gl.uniform3f(uColor, accent[0], accent[1], accent[2]);
      gl.uniform1f(uAlpha, dark ? 0.16 : 0.17);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    // The field is redrawn on every frame: the drift is only a few pixels a second, so any lower rate shows as
    // visible half-pixel steps. While the page scrolls, the lines follow it with a damped spring.
    const SMOOTH_TIME = 0.16; // seconds the lines take to settle onto the scroll position
    const loop = (now: number) => {
      frame = 0;
      if (document.hidden) return;
      const dt = Math.min(0.1, (now - lastFrame) / 1000);
      lastFrame = now;
      if (reduced.matches) {
        offset = 0;
      } else {
        // Critically damped spring toward the scroll position: unlike a plain ease it also smooths the speed, so the
        // small timing differences between the page's scrolling and this canvas never show as a stutter
        const target = window.scrollY;
        const omega = 2 / SMOOTH_TIME;
        const x = omega * dt;
        const decay = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
        const change = offset - target;
        const carry = (velocity + omega * change) * dt;
        velocity = (velocity - omega * carry) * decay;
        offset = target + (change + carry) * decay;
        if (Math.abs(target - offset) < 0.05 && Math.abs(velocity) < 0.5) {
          offset = target;
          velocity = 0;
        }
      }
      if (!reduced.matches) clock += dt;
      draw();
      // Reduced motion: one still frame, redrawn only when something changes (resize, theme)
      if (!reduced.matches) frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!frame) {
        lastFrame = performance.now();
        frame = requestAnimationFrame(loop);
      }
    };

    const onResize = () => {
      resize();
      start();
    };
    const onScroll = () => start();
    const onVisibility = () => {
      start();
    };
    const themeObserver = new MutationObserver(() => {
      accent = readAccent();
      dark = document.documentElement.dataset.theme === "dark";
      start();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onVisibility);
    resize();
    start();

    return () => {
      cancelAnimationFrame(frame);
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
