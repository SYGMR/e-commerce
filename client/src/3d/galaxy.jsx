export default function Galaxy() {
	const ref = useRef()
	useFrame(() => (ref.current.rotation.z += 0.001))
	const texture = new THREE.TextureLoader().load('/img/galaxy2.png');
	// const texture = useLoader(THREE.TextureLoader, galaxyImg)
	return (
		<mesh ref={ref} position={[0, 1, 0]} rotation-x={Math.PI / 2}>
			<planeBufferGeometry attach="geometry" args={[1500, 1500, 1]} />
			<meshBasicMaterial side={THREE.BackSide} transparent opacity={0.8} attach="material" map={texture} />
		</mesh>
	)
}