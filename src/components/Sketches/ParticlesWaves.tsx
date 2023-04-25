import React from 'react';
import * as THREE from 'three';

import vertexShader from './shaders/particleVert';
import fragmentShader from './shaders/particleFrag';

import styles from './Sketches.module.scss';

type Props = {}

const SEPARATION = 100;
const AMOUNTX = 50;
const AMOUNTY = 50;

let camera: any;
let scene: any;
let renderer: any;

let particles: any ;
let count = 0;

let mouseX = 0;
let mouseY = 0;

const ParticlesWaves = (props: Props) => {
    const container = React.useRef<any>(null);

    const init = React.useCallback(() => {
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        scene = new THREE.Scene();

        const numParticles = AMOUNTX * AMOUNTY;
        const positions = new Float32Array( numParticles * 3 );
        const scales = new Float32Array( numParticles );

		camera.position.z = 300;

        let i = 0;
        let j = 0;

        for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
            for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
                
                positions[ i ] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ); // x
                positions[ i + 1 ] = 0; // y
                positions[ i + 2 ] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 ); // z

                scales[ j ] = 1;

                i += 3;
                j ++;
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.setAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );

        const material = new THREE.ShaderMaterial( {
            uniforms: {
                color: { value: new THREE.Color( 0xffffff ) },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        } );

        particles = new THREE.Points( geometry, material );
        scene.add( particles );


        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.current.appendChild( renderer.domElement );


        container.current.style.touchAction = 'none';
        container.current.addEventListener( 'pointermove', onPointerMove );


        window.addEventListener( 'resize', onWindowResize );

    }, [])

    const onWindowResize = () => {
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    const onPointerMove = (event: any) => {
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;

        if ( event.isPrimary === false ) return;

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;

    }

    const animate = React.useCallback(() => {
        setTimeout( function() {

            requestAnimationFrame( animate );
    
        }, 6);
        render();
    }, [])

    const render = () => {

        camera.position.x += ( mouseX - camera.position.x ) * .05;
        camera.position.y += ( - mouseY - camera.position.y ) * .05;
        camera.lookAt( scene.position );

        const positions = particles.geometry.attributes.position.array;
        const scales = particles.geometry.attributes.scale.array;

        let i = 0, j = 0;

        for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
            for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
                positions[ i + 1 ] = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
                                ( Math.sin( ( iy + count ) * 0.5 ) * 50 );

                scales[ j ] = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 20 +
                                ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 20;

                i += 3;
                j ++;

            }

        }

        particles.geometry.attributes.position.needsUpdate = true;
        particles.geometry.attributes.scale.needsUpdate = true;

        renderer.render( scene, camera );

        count += 0.1;

    }


    React.useEffect(() => {
        console.log('init')
        init();
        animate();
    }, [animate, init])

    

    return (
        <div ref={container} className={styles.container}></div>
    )
}

export default ParticlesWaves;