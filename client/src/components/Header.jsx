import React from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import About from './About'
import './parallax.css'

function Header() {
  return (
    <div className="parallax">
      <Parallax pages={2} style={{ top: '0', left: '0' }} className="animation">
        <ParallaxLayer offset={0} speed={0.25}>
          <div className="animation_layer parallax" id="stage"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.22}>
          <div className="animation_layer parallax" id="singer"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.17}>
          <div className="animation_layer parallax" id="foreground"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.19}>
          <div className="animation_layer parallax" id="midground"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.1}>
          <div className="animation_layer parallax" id="background"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.0}>
          <About />
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}

export default Header