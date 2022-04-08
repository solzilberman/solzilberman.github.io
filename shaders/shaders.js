const _vertPhong = `
varying vec2 vUv;
varying vec3 norm;
varying vec3 pos;
void main(){
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
    norm = normalize(normalMatrix * normal);
    pos = (modelMatrix * vec4(position, 1.0)).xyz;
}
`
const _fragPhong = `
varying vec2 vUv;
varying vec3 norm;
varying vec3 pos;
uniform float time;
uniform vec3 Ka;
uniform vec3 Kd;
uniform vec3 Ks;
uniform vec4 LightPosition;
uniform vec3 LightIntensity;
uniform float Shininess;

vec3 phong() {
    vec3 n = normalize(norm);
    vec3 s = normalize(vec3(LightPosition) - pos);
    vec3 v = normalize(vec3(-pos));
    vec3 r = reflect(-s, n);

    vec3 ambient = Ka;
    vec3 diffuse = Kd * max(dot(s, n), 0.0);
    vec3 specular = Ks * pow(max(dot(r, v), 0.0), Shininess);

    return LightIntensity * (ambient + diffuse + specular);
}

void main(){
    vec3 light = normalize(LightPosition.xyz - pos);
    float dProd = max(0.0,dot(norm, light));
    vec3 colA = vec3(0.0,0.1,0);
    vec3 colB = vec3(0,1.0,0.0);
    vec2 st = vUv;
    float mixValue = distance(st, vec2(1, 1));

    vec3 color = mix(colA, colB, mixValue);
        
    gl_FragColor = vec4(color, 1);
}
`

// basic shaders
const _vertBasic = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif

varying vec2 vUv;
varying vec3 pos;
void main(){
    vUv = uv;
    pos = position;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
}
`
const _fragBasic = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif

varying vec2 vUv;
varying vec3 pos;
uniform float time;
void main(){
    vec3 colA = vec3(0,1,0);
    vec3 colB = vec3(0,0.75,0);
    float z = (pos.z)/2.0;
    vec3 col = mix(colB,colA,z);
    gl_FragColor = vec4(col,1);
}
`