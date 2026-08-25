import React, { useEffect, useRef } from 'react';

// Lightweight WebGL aurora/nebula shader background
export const WebGLAurora: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false });
    if (!gl) return;

    const vsSrc = `
      attribute vec2 p;
      void main() { gl_Position = vec4(p, 0.0, 1.0); }
    `;

    const fsSrc = `
      precision mediump float;
      uniform vec2 r;
      uniform float t;

      void main() {
        vec2 uv = gl_FragCoord.xy / r;
        float time = t * 0.12;

        float w1 = sin(uv.x * 4.0 + time * 2.0) * 0.12;
        float w2 = sin(uv.x * 7.0 - time * 1.4 + 1.7) * 0.08;
        float w3 = sin(uv.x * 2.5 + time * 0.8 + 3.1) * 0.15;

        float band1 = smoothstep(0.10, 0.0, abs(uv.y - 0.72 - w1));
        float band2 = smoothstep(0.14, 0.0, abs(uv.y - 0.45 - w2));
        float band3 = smoothstep(0.18, 0.0, abs(uv.y - 0.25 - w3));

        vec3 c1 = vec3(0.0, 0.85, 1.0);   // cyan
        vec3 c2 = vec3(0.66, 0.33, 0.97); // violet
        vec3 c3 = vec3(1.0, 0.2, 0.55);   // pink

        vec3 col = c1 * band1 * 0.5 + c2 * band2 * 0.45 + c3 * band3 * 0.35;
        float alpha = max(max(band1, band2), band3) * 0.22;

        gl_FragColor = vec4(col, alpha);
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vsSrc));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fsSrc));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uR = gl.getUniformLocation(prog, 'r');
    const uT = gl.getUniformLocation(prog, 't');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let raf: number;
    const resize = () => {
      canvas.width = window.innerWidth * 0.5;
      canvas.height = window.innerHeight * 0.5;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const start = performance.now();
    const render = () => {
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform1f(uT, (performance.now() - start) / 1000);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-70"
    />
  );
};
