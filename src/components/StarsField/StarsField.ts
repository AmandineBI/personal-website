import {
  Group,
  AxesHelper,
  Vector3,
  CylinderGeometry,
  Mesh,
  MeshLambertMaterial,
  Object3DEventMap,
  ShaderMaterial,
  SphereGeometry,
} from 'three'

import { addSphere, createMasterStar, createStarSky } from './meshes'

/*https://discoverthreejs.com/book/first-steps/built-in-geometries/*/

class MasterStar extends Group {
  star: Mesh<CylinderGeometry, MeshLambertMaterial, Object3DEventMap>[]
  constructor(
    branchNumber: number,
    branchWidth: number,
    branchHeight: number,
    branchSides: number,
  ) {
    super()

    this.star = createMasterStar(branchNumber, branchWidth, branchHeight, branchSides)

    for (let i = 0; i < this.star.length; i++) {
      let starElement = this.star[i]
      if (starElement) {
        this.add(starElement)
      }
    }
  }
}

class StarsField extends Group {
  meshes
  stars: any[]
  newStar: MasterStar
  newStar2: MasterStar
  constructor() {
    super()

    this.meshes = addSphere()
    this.stars = []

    for (let i = 0; i < 1000; i++) {
      let starrr = this.meshes.starTest
      starrr.position.set(0, 0, 0)
      let starElement = this.meshes.stars[i]
      if (starElement) {
        this.add(starElement)
      }
    }

    this.newStar = new MasterStar(5, 1, 2.8, 6)
    this.newStar2 = new MasterStar(5, 1, 3, 8)

    const axesHelper = new AxesHelper(1) // X in red, Y in green and Z in blue.
    this.add(
      axesHelper,
      /*this.meshes.masterStarBranch1,
            this.meshes.masterStarBranch2,
            this.meshes.masterStarBranch3,
            this.meshes.masterStarBranch4,
            this.meshes.masterStarBranch5,
            this.meshes.icosahedron,*/
      //this.meshes.syntheticStar[1],
      this.newStar,
    )
  }
}

class StarSky extends Group {
  meshes: {
    stars: Mesh<SphereGeometry, ShaderMaterial, Object3DEventMap>[]
  }
  constructor() {
    super()

    this.meshes = createStarSky()

    for (let i = 0; i < this.meshes.stars.length; i++) {
      let starElement = this.meshes.stars[i]
      if (starElement) {
        this.add(starElement)
      }
    }
  }
}

export { StarsField, MasterStar, StarSky }
