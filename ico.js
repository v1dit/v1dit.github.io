(function (global) {
  "use strict";

  const BRAILLE_BASE = 0x2800;
  const DOTS = [
    [0, 0, 1], [0, 1, 2], [0, 2, 4], [1, 0, 8],
    [1, 1, 16], [1, 2, 32], [0, 3, 64], [1, 3, 128],
  ];

  const PHI = (1 + Math.sqrt(5)) / 2;
  const BASE_VERTICES = [
    [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
    [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
    [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
  ];

  const FACES = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];

  function normalize(point) {
    const length = Math.hypot(...point);
    return point.map((value) => value / length);
  }

  function edgeKey(a, b) {
    return a < b ? `${a}:${b}` : `${b}:${a}`;
  }

  class BrailleIcosahedron {
    constructor(columns, rows, centerX, centerY, scale) {
      this.columns = columns;
      this.rows = rows;
      this.width = columns * 2;
      this.height = rows * 4;
      this.centerX = centerX * 2;
      this.centerY = centerY * 4;
      this.scale = scale * 4;
      this.vertices = BASE_VERTICES.map(normalize);
      this.edges = [];
      const seen = new Set();

      FACES.forEach((face) => {
        [[face[0], face[1]], [face[1], face[2]], [face[2], face[0]]].forEach(([a, b]) => {
          const key = edgeKey(a, b);
          if (!seen.has(key)) {
            seen.add(key);
            this.edges.push([a, b]);
          }
        });
      });

      this.rotate(-0.22, 0.34);
    }

    rotate(angleX, angleY) {
      const sinX = Math.sin(angleX);
      const cosX = Math.cos(angleX);
      const sinY = Math.sin(angleY);
      const cosY = Math.cos(angleY);

      this.vertices = this.vertices.map(([x, y, z]) => {
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;
        const x2 = x * cosY + z1 * sinY;
        const z2 = z1 * cosY - x * sinY;
        return [x2, y1, z2];
      });
    }

    render() {
      const pixels = Array.from({ length: this.height }, () => new Uint8Array(this.width));
      const points = this.vertices.map(([x, y, z]) => ({
        x: Math.round(this.centerX + x * this.scale * 1.65),
        y: Math.round(this.centerY + y * this.scale),
        z,
      }));

      this.edges.forEach(([startIndex, endIndex]) => {
        const start = points[startIndex];
        const end = points[endIndex];
        const depth = (start.z + end.z) / 2;
        if (depth > 0.56) return;
        this.drawLine(pixels, start.x, start.y, end.x, end.y);
      });

      points.forEach((point) => {
        if (point.z < 0.62) this.drawPoint(pixels, point.x, point.y, 1);
      });

      const output = [];
      for (let row = 0; row < this.rows; row += 1) {
        let line = "";
        for (let column = 0; column < this.columns; column += 1) {
          let mask = 0;
          DOTS.forEach(([dx, dy, bit]) => {
            if (pixels[row * 4 + dy]?.[column * 2 + dx]) mask |= bit;
          });
          line += String.fromCodePoint(BRAILLE_BASE + mask);
        }
        output.push(line);
      }
      return output.join("\n");
    }

    drawPoint(pixels, x, y, radius) {
      for (let dy = -radius; dy <= radius; dy += 1) {
        for (let dx = -radius; dx <= radius; dx += 1) {
          const py = y + dy;
          const px = x + dx;
          if (py >= 0 && py < this.height && px >= 0 && px < this.width) pixels[py][px] = 1;
        }
      }
    }

    drawLine(pixels, x0, y0, x1, y1) {
      const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
      for (let step = 0; step <= steps; step += 1) {
        const amount = steps ? step / steps : 0;
        const x = Math.round(x0 + (x1 - x0) * amount);
        const y = Math.round(y0 + (y1 - y0) * amount);
        if (y >= 0 && y < this.height && x >= 0 && x < this.width) pixels[y][x] = 1;
      }
    }
  }

  global.BrailleIcosahedron = BrailleIcosahedron;
})(window);
