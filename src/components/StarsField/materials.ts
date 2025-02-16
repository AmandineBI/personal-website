import {
  Vector3,
  Color,
  AdditiveBlending,
  ShaderMaterial,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  MeshLambertMaterial,
} from 'three'

function createMaterials(color = 0xffffff, rgbColor = [255, 255, 255], position = [0, 0, -800]) {
  const material = new MeshLambertMaterial({ color: color })

  /*new MeshLambertMaterial({
    color: new THREE.Color('#bb86a1'),
    roughness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0,
  })*/

  //MeshStandardMaterial( {color: 0xffffff} );

  //the glsl code for the shaders
  //vertex shader
  var _VS = `
    uniform vec3 baseColor;
    uniform vec3 viewVector;
    varying float intensity;
    varying vec3 vertexNormal;
    varying vec3 objPosition;
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        vertexNormal = normal;
        objPosition = normalize(1.0 * position);
        
        //vec3 vNormal = normalize( normalMatrix * normal );
        //vec3 vNormel = normalize( normalMatrix * viewVector );
        //intensity = pow( dot(vNormal, vNormel), 1.5 );
        //vec3 actual_normal = vec3(modelMatrix * vec4(normal, 0.0));
        //intensity = pow( dot(normalize(viewVector), actual_normal), 2.0 );
    }
    `
  //fragment shader
  var _FS = `
    uniform vec3 baseColor;
    uniform vec3 starObjPosition;
    varying float intensity;
    varying vec3 vertexNormal;
    varying vec3 objPosition;
    void main() {
        //float colorIntensity = pow(0.5 - dot(vertexNormal, vec3(0.0, 1.0, 0.0)), 2.0);
        float colorIntensity = pow( - dot(vertexNormal, normalize(-1.0 * starObjPosition)), 2.0);
        //gl_FragColor = vec4( baseColor, 1.0 ) * colorIntensity;
        gl_FragColor = vec4( baseColor, colorIntensity );
    }
    `
  if (rgbColor[0] && rgbColor[1] && rgbColor[2]) {
    const starMaterial = new ShaderMaterial({
      uniforms: {
        baseColor: { /*type: 'c',*/ value: new Color(rgbColor[0], rgbColor[1], rgbColor[2]) },
        viewVector: { /*type: 'v3',*/ value: new Vector3(0, 0, -5) },
        starObjPosition: {
          /*type: 'v3',*/ value: new Vector3(position[0], position[1], position[2]),
        },
      },
      vertexShader: _VS,
      fragmentShader: _FS,
      blending: AdditiveBlending,
    })

    return { material, starMaterial }
  }
  return { material, undefined }
}

export { createMaterials }
