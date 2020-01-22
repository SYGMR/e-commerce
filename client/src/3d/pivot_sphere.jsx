export default function PivotSphere(props) {
	const ref = useRef()
	const dom = useRef()
	useFrame(() => (ref.current.rotation.z += 0.001))
	return (
		<group>		
			<mesh ref={ref} position={[0, 1, 0]} rotation-x={Math.PI / 2}>
				<planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
				// TODO Position should be relative and only updated when pointer is over
				<Dom ref={dom} style={{ color: 'white', display: "none" }}> 
					<h2 style={{ opacity: 0.8 }}>{props.name}</h2>
				</Dom>
				{[
					{ name: "Category 1", position: [400, 1, -5], "rotation-z": Math.PI / 2 },
					{ name: "Category 2", position: [2, 300, -5], "rotation-z": Math.PI / 2 },
					{ name: "Category 3", position: [30, -400, -5], "rotation-z": Math.PI / 3 },
					{ name: "Category 4", position: [-300, 0, -5], "rotation-z": Math.PI / 4 },
					{ name: "Category 5", position: [200, 200, -5], "rotation-z": Math.PI / 5 },
				].map(props => (
					<SolarSystem {...props} />
				))}
			</mesh>
		</group>
	)
}