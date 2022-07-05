import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointLightHelper } from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// const pointLight = new THREE.PointLight(0xffffff);
// const pointLight2 = new THREE.PointLight(0xffffff);
// const pointLight3 = new THREE.PointLight(0xffffff);
// pointLight.position.set(5, 60, 5);
// pointLight2.position.set(5, -60, 5);
// pointLight3.position.set(0, 10, 70);
// // const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(pointLight, pointLight2, pointLight3);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const lightHelper2 = new THREE.PointLightHelper(pointLight3);
// scene.add(lightHelper, lightHelper2);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(500));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(1000).fill().forEach(addStar);

const jeffTexture = new THREE.TextureLoader().load("jeff.JPG");

const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: jeffTexture })
);

scene.add(jeff);

const moonTexture = new THREE.TextureLoader().load("ola.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(6, 64, 64),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

const earthTexture = new THREE.TextureLoader().load("dad.jpeg");

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(9, 96, 96),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    // normalMap: normalTexture,
  })
);

scene.add(earth);

const mumTexture = new THREE.TextureLoader().load("mum.JPG");

const mum = new THREE.Mesh(
  new THREE.SphereGeometry(16, 140, 140),
  new THREE.MeshStandardMaterial({
    map: mumTexture,
    // normalMap: normalTexture,
  })
);

scene.add(mum);

const grandadTexture = new THREE.TextureLoader().load("grandad.JPG");

const grandad = new THREE.Mesh(
  new THREE.SphereGeometry(40, 200, 200),
  new THREE.MeshStandardMaterial({
    map: grandadTexture,
    // normalMap: normalTexture,
  })
);

scene.add(grandad);

const marcelTexture = new THREE.TextureLoader().load("marcel.JPG");

const marcel = new THREE.Mesh(
  new THREE.SphereGeometry(40, 200, 200),
  new THREE.MeshStandardMaterial({
    map: marcelTexture,
    // normalMap: normalTexture,
  })
);

scene.add(marcel);

const ringTexture = new THREE.TextureLoader().load("ring.png");

const geometry = new THREE.TorusGeometry(6, 1, 2, 100);
const material = new THREE.MeshStandardMaterial({
  map: ringTexture,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

earth.position.z = 50;
earth.position.setX(-15);

mum.position.z = 100;
mum.position.setX(-25);

grandad.position.z = 200;
grandad.position.setX(-35);

marcel.position.z = 250;
marcel.position.setX(70);

moon.position.z = 30;
moon.position.setX(-10);

jeff.position.x = 2;
jeff.position.z = -5;

torus.position.x = 2;
torus.position.z = -5;

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.005;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.005;

  earth.rotation.x -= 0.017;

  mum.rotation.y += 0.012;

  grandad.rotation.y -= 0.009;

  marcel.rotation.y += 0.007;

  moon.rotation.y += 0.02;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
