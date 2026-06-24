import * as THREE from "three";

// old color #8fd3ff
export const atmosphereMaterial = (
  atmosphereTexture: THREE.Texture,
  color: string,
) => ({
  uniforms: {
    uTexture: { value: atmosphereTexture },
    uOpacity: { value: 0.3 },
    uColor: { value: new THREE.Color(color ?? "#e8c082") },
  },

  vertexShader: `
    varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);

  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;

  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
  `,

  fragmentShader: `
  uniform sampler2D uTexture;
uniform float uOpacity;
uniform float uTime;
uniform vec3 uColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {

  vec3 viewDir = normalize(cameraPosition - vWorldPosition);
  float ndv = dot(viewDir, vNormal);

  // softer rim influence (NOT dominant anymore)
  float rim = pow(1.0 - abs(ndv), 1.2);

  vec4 tex = texture2D(uTexture, vUv);

  // texture drives base atmosphere everywhere
  float density = dot(tex.rgb, vec3(0.299, 0.587, 0.114));

  // subtle moving breakup
  float n = hash(vUv * 30.0 + uTime * 0.03);
  float flow = mix(0.85, 1.15, n);

  // texture is NOT gated by rim anymore
  float base = density * uOpacity * flow;

  // rim only gently enhances edges (not defines them)
  float edgeBoost = 1.0 + rim * 0.4;

  float alpha = base * edgeBoost;

  // soften instead of hard clamp
  alpha = smoothstep(0.0, 1.0, alpha);

  vec3 color = uColor * tex.rgb;

  gl_FragColor = vec4(color * alpha, alpha);
}
  `,
});
