// globals
let mouseX = 0, mouseY = 0;
var iconScreenPosX, iconScreenPosY;
var target = new THREE.Vector3();
var frameCount = 0;

// init
const raycaster = new THREE.Raycaster();
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x42cbf5);
var camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 15);
camera.lookAt(0, 5, 10);
var renderer = new THREE.WebGL1Renderer();
renderer.shadowMapEnabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.minPolarAngle = 0.75; // radians
controls.maxPolarAngle = 1.0; // radians
controls.minAzimuthAngle = -Math.PI / 16.0; // radians
controls.maxAzimuthAngle = Math.PI / 16.0; // radians
controls.rotateSpeed = 0.05;
controls.enableZoom = false;
controls.update();
// first mouse pos
mouseX = camera.position.x;
mouseY = camera.position.y;

// lights
// const light = new THREE.DirectionalLight( 0xffffff );
// light.position.set( 0, 5, 1 );
// scene.add( light );
var light1 = new THREE.PointLight(0xFFFFFF, 1);
light1.position.set(0, 10, 0);
light1.LightIntensity = .1;
scene.add(light1);

// shapes
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
// scene.add( cube );

var shaderGeometry = new THREE.SphereBufferGeometry(1);
var shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { type: "f", value: 0.0 }
    },
    vertexShader: _vertBasic,
    fragmentShader: _fragBasic
});
var shaderCube = new THREE.Mesh(shaderGeometry, shaderMaterial);
shaderCube.position.x = 2.0;
// scene.add( shaderCube );

//terrain
var terrainHeight = 1.5;
var terrainWeight = 20;
noise.seed(Math.random());
var terrainGeometry = new THREE.PlaneBufferGeometry(250, 60, 75, 75);
var terrainMaterial1 = new THREE.MeshPhongMaterial({ color: 0x00FF00, wireframe: false });
var terrainMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { type: "f", value: 0.0 },
        // Ka: { value: new THREE.Vector3(0.0, 1.0, 0.2) },
        // Kd: { value: new THREE.Vector3(0.0, 1.0, 0.0) },
        // Ks: { value: new THREE.Vector3(0.4, 0.4, 0.4) },
        // LightIntensity: { value: new THREE.Vector4(0.5, 0.5, 0.5, 1.0) },
        // LightPosition: { value: new THREE.Vector4(0.0, 20.0, 0.0, 1.0) },
        // Shininess: { value: 20.0 }
    },
    vertexShader: _vertBasic,
    fragmentShader: _fragBasic
});
var terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
terrain.rotation.x = -Math.PI / 2;
var vertices = terrain.geometry.attributes.position.array;
var l = vertices.length;
for (var i = 0; i < l; i += 3) {
    var value = noise.simplex3(vertices[i] / terrainWeight, vertices[i + 1] / terrainWeight, vertices[i + 2] / terrainWeight);
    vertices[i + 2] = value * terrainHeight;
}
// terrain.castShadow = true;
// terrain.receiveShadow = true;
scene.add(terrain);

//knot
const knotGeometry = new THREE.TorusKnotGeometry(1, .4, 100, 16);
const knotMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
var knotShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { type: "f", value: 0.0 }
    },
    vertexShader: _vertBasic,
    fragmentShader: _fragBasic
});
const torusKnot = new THREE.Mesh(knotGeometry, knotShaderMaterial);
// scene.add( torusKnot );

// icosahedron
var radius = 1;
const icos = new THREE.IcosahedronGeometry(radius, 1);
const icosShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { type: "f", value: 0.0 }
    },
    vertexShader: _vertBasic,
    fragmentShader: _fragBasic
});
const count = icos.attributes.position.count;
icos.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
const color = new THREE.Color();
const positions1 = icos.attributes.position;
const colors1 = icos.attributes.color;
for (let i = 0; i < count; i++) {
    color.setHSL((positions1.getY(i) / radius + 1) / 2, 1.0, 0.5);
    colors1.setXYZ(i, color.r, color.g, color.b);
}
const icosMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: true,
    vertexColors: true,
    shininess: 0
});
const icosMesh = new THREE.Mesh(icos, icosMaterial);
icosMesh.position.y = 4.0;
// scene.add( icosMesh );

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

var animate = function () {
    
    //terrain
    // terrainMaterial.uniforms.time.value = frameCount;
    // knotShaderMaterial.uniforms.time.value = frameCount;
    var vertices = terrain.geometry.attributes.position.array;
    var l = vertices.length;
    for (var i = 0; i < l; i += 3) {
        var value = noise.simplex3((vertices[i] + frameCount) / terrainWeight, (vertices[i + 1] + frameCount) / terrainWeight, (vertices[i + 2] + frameCount) / terrainWeight);
        vertices[i + 2] = value * terrainHeight;
    }
    terrain.geometry.attributes.position.needsUpdate = true;

    //icosohedron
    // target.x += (mouseX - target.x) * .25;
    // target.y -= (- mouseY - target.y) * .25;
    // target.z = camera.position.z; // assuming the camera is located at ( 0, 0, z );
    // terrain.lookAt(target);
    //go to mouse
    frameCount += .05;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    
};
animate();


// add event listeners for key click
document.addEventListener('keydown', function (event) {
    if (event.key == " ") {
        terrain.material.wireframe = !terrain.material.wireframe;
    }
});

document.addEventListener('mousemove', onDocumentMouseMove, false);
function onDocumentMouseMove(event) {
    event.preventDefault();
    mouseX = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouseY = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
}

window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}