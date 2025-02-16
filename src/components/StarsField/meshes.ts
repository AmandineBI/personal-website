import { Mesh, CylinderGeometry } from 'three'

import { createGeometries } from './geometries'
import { createMaterials } from './materials'
import * as stars_catalog from './bsc.json' assert { type: 'JSON' }

//convert a star's b-v temperature index to human eye color
function bv2rgb(bv_: string) {
  // RGB <0,1> <- BV <-0.4,+2.0> [-]
  let bv = parseFloat(bv_)
  if (isNaN(bv)) bv = 0.8

  let t
  let r = 0.0
  let g = 0.0
  let b = 0.0

  if (bv < -0.4) bv = -0.4
  if (bv > 2.0) bv = 2.0

  if (bv >= -0.4 && bv < 0.0) {
    t = (bv + 0.4) / (0.0 + 0.4)
    r = 0.61 + 0.11 * t + 0.1 * t * t
  } else if (bv >= 0.0 && bv < 0.4) {
    t = (bv - 0.0) / (0.4 - 0.0)
    r = 0.83 + 0.17 * t
  } else if (bv >= 0.4 && bv < 2.1) {
    t = (bv - 0.4) / (2.1 - 0.4)
    r = 1.0
  }
  if (bv >= -0.4 && bv < 0.0) {
    t = (bv + 0.4) / (0.0 + 0.4)
    g = 0.7 + 0.07 * t + 0.1 * t * t
  } else if (bv >= 0.0 && bv < 0.4) {
    t = (bv - 0.0) / (0.4 - 0.0)
    g = 0.87 + 0.11 * t
  } else if (bv >= 0.4 && bv < 1.6) {
    t = (bv - 0.4) / (1.6 - 0.4)
    g = 0.98 - 0.16 * t
  } else if (bv >= 1.6 && bv < 2.0) {
    t = (bv - 1.6) / (2.0 - 1.6)
    g = 0.82 - 0.5 * t * t
  }
  if (bv >= -0.4 && bv < 0.4) {
    t = (bv + 0.4) / (0.4 + 0.4)
    b = 1.0
  } else if (bv >= 0.4 && bv < 1.5) {
    t = (bv - 0.4) / (1.5 - 0.4)
    b = 1.0 - 0.47 * t + 0.1 * t * t
  } else if (bv >= 1.5 && bv < 1.94) {
    t = (bv - 1.5) / (1.94 - 1.5)
    b = 0.63 - 0.6 * t * t
  }
  return [r, g, b]
}

function rgbToHex(r: string, g: string, b: string) {
  let hex =
    parseInt(r, 10).toString(16) + parseInt(g, 10).toString(16) + parseInt(b, 10).toString(16)
  return hex
}

function ascensionDeclinationToCartesian(
  ra_: [string, string, string],
  de_: [string, string, string, string],
  r_: number,
) {
  let ra =
    (parseFloat(ra_[0]) / 24 +
      parseFloat(ra_[1]) / (24 * 60) +
      parseFloat(ra_[2]) / (24 * 60 * 60)) *
    2 *
    Math.PI
  let de =
    (parseFloat(de_[1]) / 360 +
      parseFloat(de_[2]) / (360 * 60) +
      parseFloat(de_[3]) / (360 * 60 * 60)) *
    2 *
    Math.PI
  let r = r_
  if (de_[0] === '-') {
    de = -de
  }
  let sx = r * Math.cos(de) * Math.cos(ra)
  let sy = r * Math.cos(de) * Math.sin(ra)
  let sz = r * Math.sin(de)
  return [sx, sy, sz]
}

function vmagToSize(vmag_: string) {
  let vmag = parseFloat(vmag_)
  let size = 10 * Math.pow(1.35, Math.min(-vmag, 0.15))
  return size
}

function createStarSky() {
  const geometries = createGeometries()
  const materials = createMaterials()

  let stars_data = stars_catalog.default.stars_catalog.stars

  let stars = stars_data.map((st, i) => {
    let rgbColor = bv2rgb(st.bv)
    //let hex_color = parseInt("0x" + rgbToHex(rgbColor[0], rgbColor[1], rgbColor[2]), 16);
    let position = ascensionDeclinationToCartesian(st.RA, st.DE, 800)
    let star = new Mesh(
      geometries.star,
      createMaterials(/*null*/ undefined, rgbColor, position).starMaterial,
    )

    if (position[0] && position[1] && position[2]) {
      star.position.set(position[0], position[1], position[2])
    }

    let osize = vmagToSize(st.vmag)
    // scale it up a bit
    star.scale.x = star.scale.y = star.scale.z = osize

    return star
  })

  return {
    stars,
  }
}

function addSphere() {
  const geometries = createGeometries()
  const materials = createMaterials()

  // Make a sphere (exactly the same as before).
  const star = new Mesh(geometries.star, materials.material)
  const starTest = new Mesh(geometries.star, materials.material)
  const masterStarBranch = new Mesh(geometries.masterStarBranch, materials.material)
  const icosahedron = new Mesh(geometries.icosahedron, materials.material)

  let stars = []
  /*for (let i=0; i<=10; i++) {
    const newStar = star.clone()
    newStar.position.set(0,i,i)
    stars.push(newStar)
  }*/

  // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
  for (let i = 0; i < 10000; i++) {
    let ra = Math.random() * 2 * Math.PI
    let de = Math.random() * 2 * Math.PI
    let sx = 1000 * Math.cos(de) * Math.cos(ra)
    let sy = 1000 * Math.cos(de) * Math.sin(ra)
    let sz = 1000 * Math.sin(de)
    let vmag = Math.random() * 5
    let osize = 10 * Math.pow(1.35, Math.min(-vmag, 0.15))

    const newStar = star.clone()

    newStar.position.x = sx
    newStar.position.y = sy
    newStar.position.z = sz

    // scale it up a bit
    newStar.scale.x = newStar.scale.y = newStar.scale.z = osize

    //finally push it to the stars array
    stars.push(newStar)
  }

  const masterStarBranch1 = masterStarBranch.clone()
  const masterStarBranch2 = masterStarBranch.clone()
  const masterStarBranch3 = masterStarBranch.clone()
  const masterStarBranch4 = masterStarBranch.clone()
  const masterStarBranch5 = masterStarBranch.clone()
  masterStarBranch1.position.set(0, 1.5, 0)
  masterStarBranch2.rotation.set(0, 0, (Math.PI / 5) * 2)
  masterStarBranch2.position.set(
    1.5 * Math.sin((-Math.PI * 2) / 5),
    1.5 * Math.cos((-Math.PI * 2) / 5),
    0,
  )
  masterStarBranch3.rotation.set(0, 0, (Math.PI / 5) * 4)
  masterStarBranch3.position.set(-0.9, -1.2, 0)
  masterStarBranch4.rotation.set(0, 0, (Math.PI / 5) * 6)
  masterStarBranch4.position.set(0.9, -1.2, 0)
  masterStarBranch5.rotation.set(0, 0, (-Math.PI / 5) * 2)
  masterStarBranch5.position.set(
    1.5 * Math.sin((-Math.PI * 8) / 5),
    1.5 * Math.cos((-Math.PI * 8) / 5),
    0,
  )

  return {
    star,
    starTest,
    stars,
    masterStarBranch1,
    masterStarBranch2,
    masterStarBranch3,
    masterStarBranch4,
    masterStarBranch5,
    icosahedron,
  }
}

function createMasterStar(
  branchNumber: number,
  branchWidth: number,
  branchHeight: number,
  branchSides: number,
) {
  const materials = createMaterials()
  let starBranches = []
  if (branchNumber < 3) branchNumber = 3
  if (branchNumber > 10) branchNumber = 10
  for (let i = 0; i < branchNumber; i++) {
    const branch = new Mesh(
      new CylinderGeometry(0, branchWidth, branchHeight, branchSides, 1, false, 0, 2 * Math.PI),
      materials.material,
    )
    const angle = (2 * i * Math.PI) / branchNumber
    branch.rotation.set(0, 0, angle)
    branch.position.set(
      (branchHeight / 2) * Math.sin(-1 * angle),
      (branchHeight / 2) * Math.cos(-1 * angle),
      0,
    )
    starBranches.push(branch)
  }
  return starBranches
}

export { addSphere, createMasterStar, createStarSky }
