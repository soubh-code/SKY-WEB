"use client";

import { useTabletPerformanceMode } from "@/hooks/useTabletPerformanceMode";
import { useEffect, useRef } from "react";

type ShaderBackgroundProps = {
  className?: string;
  staticOnPhone?: boolean;
};

const vertexShaderSource = `
  attribute vec4 aVertexPosition;

  void main() {
    gl_Position = aVertexPosition;
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform vec2 iResolution;
  uniform float iTime;

  const float overallSpeed = 0.2;
  const float gridSmoothWidth = 0.015;
  const float axisWidth = 0.05;
  const float majorLineWidth = 0.025;
  const float minorLineWidth = 0.0125;
  const float majorLineFrequency = 5.0;
  const float minorLineFrequency = 1.0;
  const float scale = 5.0;
  const vec4 lineColor = vec4(0.18, 0.58, 1.0, 0.72);
  const float minLineWidth = 0.01;
  const float maxLineWidth = 0.2;
  const float lineSpeed = 1.0 * overallSpeed;
  const float lineAmplitude = 1.0;
  const float lineFrequency = 0.2;
  const float warpSpeed = 0.2 * overallSpeed;
  const float warpFrequency = 0.5;
  const float warpAmplitude = 1.0;
  const float offsetFrequency = 0.5;
  const float offsetSpeed = 1.33 * overallSpeed;
  const float minOffsetSpread = 0.6;
  const float maxOffsetSpread = 2.0;
  const int linesPerGroup = 16;

  #define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
  #define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
  #define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))
  #define drawPeriodicLine(freq, width, t) drawCrispLine(freq / 2.0, width, abs(mod(t, freq) - (freq) / 2.0))

  float drawGridLines(float axis) {
    return drawCrispLine(0.0, axisWidth, axis)
      + drawPeriodicLine(majorLineFrequency, majorLineWidth, axis)
      + drawPeriodicLine(minorLineFrequency, minorLineWidth, axis);
  }

  float random(float t) {
    return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
  }

  float getPlasmaY(float x, float horizontalFade, float offset) {
    return random(x * lineFrequency + iTime * lineSpeed) * horizontalFade * lineAmplitude + offset;
  }

  void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 uv = fragCoord.xy / iResolution.xy;
    vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

    float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
    float verticalFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

    space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);
    space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;

    float grid = min(1.0, drawGridLines(space.x) + drawGridLines(space.y));
    vec4 lines = vec4(0.0);
    vec4 bgColor1 = vec4(0.015, 0.035, 0.07, 1.0);
    vec4 bgColor2 = vec4(0.035, 0.095, 0.18, 1.0);

    for (int l = 0; l < linesPerGroup; l++) {
      float normalizedLineIndex = float(l) / float(linesPerGroup);
      float offsetTime = iTime * offsetSpeed;
      float offsetPosition = float(l) + space.x * offsetFrequency;
      float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;
      float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
      float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
      float linePosition = getPlasmaY(space.x, horizontalFade, offset);
      float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0 + drawCrispLine(linePosition, halfWidth * 0.15, space.y);

      float circleX = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
      vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
      float circle = drawCircle(circlePosition, 0.01, space) * 4.0;

      lines += (line + circle) * lineColor * rand * 0.82;
    }

    vec4 fragColor = mix(bgColor1, bgColor2, uv.x);
    fragColor += vec4(vec3(grid * 0.055), 1.0);
    fragColor *= verticalFade;
    fragColor.a = 1.0;
    fragColor += lines;

    gl_FragColor = fragColor;
  }
`;

function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function initShaderProgram(gl: WebGLRenderingContext) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  if (!vertexShader || !fragmentShader) return null;

  const shaderProgram = gl.createProgram();
  if (!shaderProgram) return null;

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    gl.deleteProgram(shaderProgram);
    return null;
  }

  return shaderProgram;
}

export function ShaderBackground({ className, staticOnPhone = false }: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isTabletPerformance = useTabletPerformanceMode();

  useEffect(() => {
    if (isTabletPerformance) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "high-performance" });
    if (!gl) return;

    const shaderProgram = initShaderProgram(gl);
    const positionBuffer = gl.createBuffer();
    if (!shaderProgram || !positionBuffer) return;

    const vertexPosition = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    const resolution = gl.getUniformLocation(shaderProgram, "iResolution");
    const time = gl.getUniformLocation(shaderProgram, "iTime");
    const positions = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const useStaticPhoneFrame = staticOnPhone && window.matchMedia("(max-width: 560px)").matches;
    let animationFrame = 0;
    let startTime = performance.now();
    let isVisible = true;
    let pageVisible = document.visibilityState === "visible";

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const resizeCanvas = () => {
      const ratio = isTabletPerformance || useStaticPhoneFrame ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.round(window.innerWidth * ratio);
      const height = Math.round(window.innerHeight * ratio);
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };

    const render = () => {
      animationFrame = 0;
      const currentTime = (performance.now() - startTime) / 1000;

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(shaderProgram);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, currentTime);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vertexPosition);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (!reducedMotion && !isTabletPerformance && !useStaticPhoneFrame && isVisible && pageVisible) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const resumeRendering = () => {
      if (animationFrame || reducedMotion || isTabletPerformance || useStaticPhoneFrame || !isVisible || !pageVisible) return;
      animationFrame = window.requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      pageVisible = document.visibilityState === "visible";
      if (!pageVisible && animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        return;
      }
      resumeRendering();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (!isVisible && animationFrame) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
          return;
        }
        resumeRendering();
      },
      { rootMargin: "160px" },
    );

    const restartCanvas = () => {
      startTime = performance.now();
      resizeCanvas();
    };

    resizeCanvas();
    render();
    observer.observe(canvas);
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pageshow", restartCanvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pageshow", restartCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(shaderProgram);
    };
  }, [isTabletPerformance, staticOnPhone]);

  if (isTabletPerformance) {
    return (
      <img
        src="/assets/shader-background-tablet-static.webp"
        className={className ? `${className} shader-background-static` : "shader-background-static"}
        alt=""
        aria-hidden="true"
        decoding="async"
      />
    );
  }

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

export default ShaderBackground;
