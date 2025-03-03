// import * as THREE from 'three';

// // Function to generate random stars around the Earth
// export default function createStars() {
//   const starGeometry = new THREE.BufferGeometry();
//   const starCount = 1000; // Number of stars
//   const starVertices = [];

//   for (let i = 0; i < starCount; i++) {
//     // Random position within a spherical region
//     const radius = 50 + Math.random() * 20; // Spread stars at distance 50-70
//     const theta = Math.random() * Math.PI * 2; // Random longitude
//     const phi = Math.acos(2 * Math.random() - 1); // Random latitude

//     const x = radius * Math.sin(phi) * Math.cos(theta);
//     const y = radius * Math.sin(phi) * Math.sin(theta);
//     const z = radius * Math.cos(phi);

//     starVertices.push(x, y, z);
//   }

//   // Set positions in the geometry
//   starGeometry.setAttribute(
//     'position',
//     new THREE.Float32BufferAttribute(starVertices, 3)
//   );

//   // Star material (small glowing dots)
//   const starMaterial = new THREE.PointsMaterial({
//     color: 0xffffff, // White stars
//     size: 0.5, // Size of each star
//     transparent: true,
//     opacity: 0.8,
//   });

//   // Create starfield points
//   const stars = new THREE.Points(starGeometry, starMaterial);
//   scene.add(stars); // Add to the scene
// }

import * as THREE from 'three';

export default function getStarfield({ numStars = 500 } = {}, img) {
  console.log(img, 'img');
  function randomSpherePoint() {
    const radius = Math.random() * 25 + 25;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.sin(phi) * Math.sin(theta);
    let z = radius * Math.cos(phi);

    return {
      pos: new THREE.Vector3(x, y, z),
      hue: 0.6,
      minDist: radius,
    };
  }
  const verts = [];
  const colors = [];
  const positions = [];
  let col;
  for (let i = 0; i < numStars; i += 1) {
    let p = randomSpherePoint();
    const { pos, hue } = p;
    positions.push(p);
    col = new THREE.Color().setHSL(hue, 0.2, Math.random());
    verts.push(pos.x, pos.y, pos.z);
    colors.push(col.r, col.g, col.b);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    map: img,
  });
  const points = new THREE.Points(geo, mat);
  console.log(points, 'points');
  return points;
}
