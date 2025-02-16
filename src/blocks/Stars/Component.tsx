'use client'
import { cn } from '@/utilities/ui'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useRef } from 'react'
import { StarSky } from '@/components/StarsField/StarsField'
import {
  Scene,
  PerspectiveCamera,
  Mesh,
  BoxGeometry,
  MeshLambertMaterial,
  AmbientLight,
  HemisphereLight,
  DirectionalLight,
  Object3D,
  Object3DEventMap,
  WebGLRenderer,
} from 'three'

type Props = {
  title: string
}

export const StarsBlock: React.FC<Props> = ({ title }) => {
  const { setHeaderTheme } = useHeaderTheme()

  const refContainer = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    setHeaderTheme('dark')

    console.log('THIS IS THE SECONDS USEEFFECT')
    /*****************/
    /***** Setup *****/
    /*****************/
    let renderer: WebGLRenderer = new WebGLRenderer({
      antialias: true,
    })
    let camera: PerspectiveCamera = new PerspectiveCamera()
    let scene: Scene = new Scene()

    //const { width, height } = useWindowSize()
    //computed is a Vue function that needs to be migrated
    //const aspectRatio = computed(() => width.value / height.value)
    const aspectRatio = { value: window.innerWidth / window.innerHeight }

    function updateRenderer() {
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(window.devicePixelRatio)
    }
    function updateCamera() {
      camera.aspect = aspectRatio.value
      camera.updateProjectionMatrix()
    }

    // Migrated from Vue. Correct???
    window.addEventListener('resize', updateRenderer)
    window.addEventListener('resize', updateCamera)
    // watch is a Vue function that needs to be migrated
    //watch(aspectRatio, updateRenderer)
    //watch(aspectRatio, updateCamera)
    camera = new PerspectiveCamera(75, aspectRatio.value, 0.1, 1000)
    camera.aspect = aspectRatio.value
    // Move the camera away from center
    camera.position.z = -5
    scene.add(camera)

    refContainer.current?.appendChild(renderer.domElement)

    /*****************/
    /***** Stars *****/
    /*****************/
    const stars = new StarSky()
    scene.add(stars)

    /*****************/
    /*** Material ****/
    /*****************/

    const cube = new Mesh(
      // Create a new BoxGeometry with dimensions 1 x 1 x 1
      new BoxGeometry(1, 1, 1),
      // Create a new material with a white color
      new MeshLambertMaterial({ color: 0xffffff }),
    )

    const degreesToRadians = (degrees: number) => {
      return degrees * (Math.PI / 180)
    }
    cube.rotation.x = degreesToRadians(30)
    cube.rotation.y = degreesToRadians(45)
    //scene.add(cube);

    /*****************/
    /***** Light *****/
    /*****************/

    // Add ambient light, coming from all directions with a tint
    /*const lightAmbient = new AmbientLight(0x9eaeff, 0.2)
    scene.add(lightAmbient)*/
    //an ambient light
    const amb_light = new AmbientLight(0x909090)
    scene.add(amb_light)
    //the hemisphere light
    const hemi_light = new HemisphereLight(0x21266e, 0x080820, 0.2)
    scene.add(hemi_light)

    const lightDirectional = new DirectionalLight(0xffffff, 1)
    scene.add(lightDirectional)

    // Move the light source towards us and off-center
    lightDirectional.position.set(5, 5, 5)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      stars.rotation.y += 0.0005
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      refContainer.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      className="relative -mt-[6.1rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div ref={refContainer} className="absolute inset-0"></div>

      <div className="relative z-10 mx-auto my-0 w-full h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>

      {/*<div className="mx-auto my-0 w-full h-screen bg-red-700">
        <p>HELLO WORLD</p>
        <p>Here {title}</p>
        <p>Hellow here am I</p>
        <p>This should be the title: {title}</p>
  </div>*/}
    </div>
  )
}
