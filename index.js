// globals
let mouseX = 0, mouseY = 0;
var iconScreenPosX, iconScreenPosY;
var target = new THREE.Vector3(); 
var frameCount = 0;

// init
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x42cbf5);
var camera = new THREE.PerspectiveCamera( 95, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(0,5,10);
camera.lookAt(0,5,10);
var renderer = new THREE.WebGLRenderer();
renderer.shadowMapEnabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.minPolarAngle = -Math.PI; // radians
controls.maxPolarAngle = 1.0; // radians
controls.minAzimuthAngle = -Math.PI/8.0; // radians
controls.maxAzimuthAngle = Math.PI/8.0; // radians
controls.dampingFactor = 0.25;;
controls.update();
// first mouse pos
mouseX = camera.position.x;
mouseY = camera.position.y;

// lights
// const light = new THREE.DirectionalLight( 0xffffff );
// light.position.set( 0, 5, 1 );
// scene.add( light );
var light1 = new THREE.PointLight( 0xFFFFFF, 1 );
light1.position.set( 0, 20, -10 );
scene.add( light1 );

// shapes
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

var shaderGeometry = new THREE.SphereBufferGeometry( 1 );
var shaderMaterial = new THREE.ShaderMaterial( { 
    uniforms: {
        time: {type:"f", value:0.0}
    },
    vertexShader: _vertBasic,
    fragmentShader: _fragBasic
 } );
var shaderCube = new THREE.Mesh( shaderGeometry, shaderMaterial );
shaderCube.position.x = 2.0;
// scene.add( shaderCube );

//terrain
var terrainHeight = 1.5;
var terrainWeight = 20;
noise.seed(Math.random());
var terrainGeometry = new THREE.PlaneBufferGeometry(250,60, 75,75);
var terrainMaterial1 = new THREE.MeshPhongMaterial( { color: 0x00FF00, wireframe: true } );
var terrainMaterial = new THREE.ShaderMaterial( { 
    uniforms: {
        time: {type:"f", value:0.0},
        Ka: { value: new THREE.Vector3(0.0, 1.0, 0.2) },
        Kd: { value: new THREE.Vector3(0.0, 1.0, 0.0) },
        Ks: { value: new THREE.Vector3(0.4, 0.4, 0.4) },
        LightIntensity: { value: new THREE.Vector4(0.5, 0.5, 0.5, 1.0) },
        LightPosition: { value: new THREE.Vector4(0.0, 20.0, 0.0, 1.0) },
        Shininess: { value: 20.0 }
    },
    vertexShader: _vertPhong,
    fragmentShader: _fragPhong
 } );
var terrain = new THREE.Mesh( terrainGeometry, terrainMaterial );
terrain.rotation.x = -Math.PI/2;
var vertices = terrain.geometry.attributes.position.array;
var l = vertices.length;
for ( var i = 0;i < l;i+=3){
    var value = noise.simplex3(vertices[i]/terrainWeight, vertices[i+1]/terrainWeight,vertices[i+2]/terrainWeight);
    vertices[i+2] = value*terrainHeight;
}
// terrain.castShadow = true;
// terrain.receiveShadow = true;
scene.add( terrain );

//knot
const knotGeometry = new THREE.TorusKnotGeometry( 1, .4, 100, 16 );
const knotMaterial = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
var knotShaderMaterial = new THREE.ShaderMaterial( { 
    uniforms: {
        time: {type:"f", value:0.0}
    },
    vertexShader: _vertBasic,
    fragmentShader: _fragBasic
 } );
const torusKnot = new THREE.Mesh( knotGeometry, knotShaderMaterial );
// scene.add( torusKnot );

// icosahedron
var radius = 1;
const icos = new THREE.IcosahedronGeometry( radius, 1 );
const icosShaderMaterial = new THREE.ShaderMaterial( {
    uniforms: {
        time: {type:"f", value:0.0}
    },
    vertexShader: _vertBasic,
    fragmentShader: _fragBasic
});
const count = icos.attributes.position.count;
icos.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( count * 3 ), 3 ) );
const color = new THREE.Color();
const positions1 = icos.attributes.position;
const colors1 = icos.attributes.color;
for ( let i = 0; i < count; i ++ ) {
    color.setHSL( ( positions1.getY( i ) / radius + 1 ) / 2, 1.0, 0.5 );
    colors1.setXYZ( i, color.r, color.g, color.b );
}
const icosMaterial = new THREE.MeshPhongMaterial( { 
    color: 0xffffff,
    flatShading: true,
    vertexColors: true,
    shininess: 0 
} );
const icosMesh = new THREE.Mesh( icos, icosMaterial );
icosMesh.position.y = 4.0;
// scene.add( icosMesh );

// const loader = new THREE.GLTFLoader()
// var pythonLogo;
// loader.load(
//     'models/python/scene.gltf',
//     function (gltf) {
//         // gltf.scene.traverse(function (child) {
//         //     if ((child as THREE.Mesh).isMesh) {
//         //         const m = (child as THREE.Mesh)
//         //         m.receiveShadow = true
//         //         m.castShadow = true
//         //     }
//         //     if (((child as THREE.Light)).isLight) {
//         //         const l = (child as THREE.Light)
//         //         l.castShadow = true
//         //         l.shadow.bias = -.003
//         //         l.shadow.mapSize.width = 2048
//         //         l.shadow.mapSize.height = 2048
//         //     }
//         // })
//         pythonLogo = gltf.scene;
//         pythonLogo.scale.set(.075, .075, .075);
//         pythonLogo.position.set(-15, 5, -10);
//         pythonLogo.rotation.set(0, .45, 0);
//         scene.add(gltf.scene)
//     },
//     (xhr) => {
//         console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
//     },
//     (error) => {
//         console.log(error)
//     }
// )

function clamp(value, min, max){
    return Math.min(Math.max(value, min), max);
}

var animate = function () {
    frameCount+=.05;
	requestAnimationFrame( animate );
	renderer.render(scene, camera);

    //terrain
    terrainMaterial.uniforms.time.value = frameCount;
    knotShaderMaterial.uniforms.time.value = frameCount;
    var vertices = terrain.geometry.attributes.position.array;
    var l = vertices.length;
    for ( var i = 0;i < l;i+=3){
        var value = noise.simplex3((vertices[i]+frameCount)/terrainWeight, (vertices[i+1]+frameCount)/terrainWeight, (vertices[i+2]+frameCount)/terrainWeight);
        vertices[i+2] = value*terrainHeight;
    }
    terrain.geometry.attributes.position.needsUpdate = true;

    //icosohedron
    target.x += ( mouseX - target.x )*.25;
    target.y += ( - mouseY - target.y )*.25;
    target.z = camera.position.z; // assuming the camera is located at ( 0, 0, z );
    icosMesh.lookAt(target);

    //go to mouse
    
};
animate();


// add event listeners for key click
document.addEventListener('keydown', function(event) {
    if (event.key == " ") {
        terrain.material.wireframe = !terrain.material.wireframe;
    }
});

document.addEventListener('mousemove', onDocumentMouseMove, false);
function onDocumentMouseMove(event) {
    event.preventDefault();
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY );
}