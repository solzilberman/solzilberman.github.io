const _vertPhong = `
varying vec2 vUv;
out vec3 norm;
out vec3 pos;
void main(){
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
    norm = normalize(normalMatrix * normal);
    pos = (modelMatrix * vec4(position, 1.0)).xyz;
}
`
const _fragPhong = `
varying vec2 vUv;
in vec3 norm;
in vec3 pos;
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
    float mixValue = distance(st, vec2(0, 0));

    vec3 color = mix(colA, colB, mixValue);
        
    gl_FragColor = vec4(color, 1);
}
`

// basic shaders
const _vertBasic = `
varying vec2 vUv;
out vec3 pos;
void main(){
    vUv = uv;
    pos = position;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
}
`
const _fragBasic = `
varying vec2 vUv;
in vec3 pos;
uniform float time;
void main(){
    vec3 colA = vec3(0,1,0);
    vec3 colB = vec3(0,0,0);
    float z = (pos.z)/5.0;
    gl_FragColor = vec4(mix(colA,colB,z),1);
}
`