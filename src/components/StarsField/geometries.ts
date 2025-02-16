import { BoxGeometry, CylinderGeometry, SphereGeometry, IcosahedronGeometry } from 'three';

function createGeometries() {

    const star = new SphereGeometry(0.5, 32, 32);
    const masterStarBranch = new CylinderGeometry(0,1,3,4,1,false,0,2 * Math.PI)
    const icosahedron = new IcosahedronGeometry(0.1,1)


    return {
        star,
        masterStarBranch,
        icosahedron
    };
}

export { createGeometries }