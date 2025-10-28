'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import type React from 'react'
import { useEffect, useRef } from 'react'
import { StarSky } from '@/components/StarsField/StarsField'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  HemisphereLight,
  DirectionalLight,
} from 'three'

type Props = {
  title: string
}

export const StarsBlock: React.FC<Props> = ({ title }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const refContainer = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setHeaderTheme('dark')

    if (!refContainer.current) return

    // Setup
    const renderer = new WebGLRenderer({ antialias: true })
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const scene = new Scene()

    // Set renderer size and add to DOM
    renderer.setSize(window.innerWidth, window.innerHeight)
    refContainer.current.appendChild(renderer.domElement)

    // Camera position
    camera.position.z = 5

    // Stars
    const stars = new StarSky()
    scene.add(stars)

    // Lights
    const ambLight = new AmbientLight(0x909090)
    scene.add(ambLight)

    const hemiLight = new HemisphereLight(0x21266e, 0x080820, 0.2)
    scene.add(hemiLight)

    const dirLight = new DirectionalLight(0xffffff, 1)
    dirLight.position.set(5, 5, 5)
    scene.add(dirLight)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      stars.rotation.y += 0.005
      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
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
    </div>
  )
}
