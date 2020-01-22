import React, { Component } from "react";
import * as THREE from "three";
import '../index.css';

export class System extends Component {

  constructor(props) {
    super(props)
    this.state = {
        shops: []
    }
}
  
  createSystem() {

    const shops = this.state.shops;
    const OrbitControls = require('three-orbitcontrols')

     
    // Sphere 1
    var sphereGeo1, sphereMaterial1, sphereMesh1;

    //EVENT MOUSE 
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    // Pivot point
    var pivotPoint;
    const scene = new THREE.Scene()
    var scene2 = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 100, 5000)
    
    camera.position.y = 500;
    camera.position.z = 1000;

    camera.lookAt(scene.position);

    
    

    var texture = new THREE.TextureLoader().load("/img/starfield.png");
    scene.background = texture;

    //Scene ADD CAMERA
    scene.add(camera)
    scene2.add(camera)
    const renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.autoClear = false;
    document.body.childNodes[3].appendChild(renderer.domElement)

    var controls = new OrbitControls( camera, renderer.domElement );
    controls.autoRotate = true;
    controls.update();



    var pointLight =new THREE.PointLight(16777215,1);
    var camLight = new THREE.PointLight(16777215,1);
    var postion = camera.position;
    camLight.position.set(postion)
    var textureSun = new THREE.TextureLoader().load('/img/2k_sun.jpg')
    var materialSun = new THREE.MeshBasicMaterial({
      map: textureSun  
    })

    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene2.add( light );
    
    var SunGeo = new THREE.SphereGeometry(100, 100, 100);
    var Sun = new THREE.Mesh(SunGeo, materialSun);
    Sun.position.set(0, 1, 0);
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 1, 1 ).normalize();
    Sun.rotation.y = Math.PI / 2 
    scene.add(light);
    scene2.add(Sun);
    scene2.add(camLight);
    scene2.add(pointLight)

    var pivotgeo = new THREE.PlaneGeometry(1, 1, 1);
    var pivotsphere = new THREE.Mesh(pivotgeo, sphereMaterial1);
    pivotsphere.position.set(0, 1, 0);
    pivotsphere.rotateX(Math.PI / 2);
    scene2.add(pivotsphere);


    //pivot point
    pivotPoint = new THREE.Object3D();
    pivotsphere.add(pivotPoint);
    

    function entierAleatoire(min, max)
      {
      return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      // GENERE CHAQUE SYSTEM/CATEGORIES

      
    shops.forEach(element => {

    var systemSolaire1 = new THREE.SphereGeometry(entierAleatoire(20,50), 20, 30);
    //Sphere material 1
    var texture = new THREE.TextureLoader().load('/img/flare.png');
    // immediately use the texture for material creation
    var systemMaterial1 = new THREE.MeshLambertMaterial({
      color: 'grey'
    });
    var systemMesh1 = new THREE.Mesh(systemSolaire1, systemMaterial1);
    systemMesh1.position.set(entierAleatoire(-400,400), entierAleatoire(-400,400), -50 );
    systemMesh1.rotateZ(Math.PI / 2);
    systemMesh1.name = element.name;
    systemMesh1.userData = "/category/"+ element.id
    scene2.add(systemMesh1);
    pivotPoint.add(systemMesh1);

    });

    //PARTICULES

    var particleCount = 800,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.ParticleBasicMaterial({
      color: 0xFFFFFF,
      size: 1
    });

// now create the individual particles
for (var p = 0; p < particleCount; p++) {

  // create a particle with random
  // position values, -250 -> 250
  var pX = Math.random() * 3000,
      pY = Math.random() * 3000 ,
      pZ = Math.random() * 3000,
      particle = new THREE.Vector3(pX, pY, pZ)
    

  // add it to the geometry
  particles.vertices.push(particle);
}

// create the particle system
var particleSystem = new THREE.ParticleSystem(
    particles,
    pMaterial);

// add it to the scene
scene2.add(particleSystem);

  


    //MOUSE OVER


    var latestMouseProjection; // this is the latest projection of the mouse on object (i.e. intersection with ray)
    var hoveredObj; // this objects is hovered at the moment

    var tooltipEnabledObjects = [scene2];

    var tooltipDisplayTimeout;


    // This will move tooltip to the current mouse position and show it by timer.
    function showTooltip() {
      if (divElement && latestMouseProjection) {
        divElement[0].style.display = 'block';
        
        //divElement[0].style.opacity = '0.0';

        var canvasHalfWidth = renderer.domElement.offsetWidth / 2;
        var canvasHalfHeight = renderer.domElement.offsetHeight / 2;

        var tooltipPosition = latestMouseProjection.clone().project(camera);
        tooltipPosition.x = (tooltipPosition.x * canvasHalfWidth) + canvasHalfWidth + renderer.domElement.offsetLeft;
        tooltipPosition.y = -(tooltipPosition.y * canvasHalfHeight) + canvasHalfHeight + renderer.domElement.offsetTop;

        var tootipWidth = divElement[0].offsetWidth;
        var tootipHeight = divElement[0].offsetHeight;

        divElement[0].style.left = `${tooltipPosition.x - tootipWidth / 2}px`;
        divElement[0].style.top = `${tooltipPosition.y - tootipHeight -70}px`;


        // var position = new THREE.Vector3();
        // var quaternion = new THREE.Quaternion();
        // var scale = new THREE.Vector3();
        // hoveredObj.matrix.decompose(position, quaternion, scale);
       
        divElement[0].innerHTML = "<h2>"+ hoveredObj.name + "</h2>";
        console.log(clicked)
        if(clicked === false){
        

          divElement[0].style.opacity = "1.0";
        
      }
      else {
        divElement[0].style.opacity = "0"
      }

        
      }
    }

    var divElement = document.getElementsByClassName("tooltip");

    function hideTooltip() {
      
      if (divElement) {
        divElement[0].style.display = 'none';
        divElement[0].style.opacity = "0";

      }
    }

    function updateMouseCoords(event, coordsObj) {
      coordsObj.x = ((event.clientX - renderer.domElement.offsetLeft + 0.5) / window.innerWidth) * 2 - 1;
      coordsObj.y = -((event.clientY - renderer.domElement.offsetTop + 0.5) / window.innerHeight) * 2 + 1;
    }

    var toogle2 = false;
    var canvasBounds = renderer.domElement.getBoundingClientRect();
    function handlemanip(event) {

      // calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components

      mouse.x = ((event.clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left)) * 2 - 1;
      mouse.y = - ((event.clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      var intersects = raycaster.intersectObjects(tooltipEnabledObjects, true);
      if (intersects.length > 0) {
        for (var i = 0; i < intersects.length; i++) {
          latestMouseProjection = intersects[0].point;
          hoveredObj = intersects[0].object;
        }
        
      }

      if (!latestMouseProjection && toogle2 === false) {
        clearTimeout(tooltipDisplayTimeout);
        tooltipDisplayTimeout = undefined;
        hideTooltip();
       
      }

      if (!tooltipDisplayTimeout && latestMouseProjection) {
        
        tooltipDisplayTimeout = setTimeout(function () {
          tooltipDisplayTimeout = undefined;
          showTooltip();
        
        }, 10);
      }
    
    }


    var divDescript= document.getElementsByClassName("description")
    var blur = document.getElementsByClassName("blur")

    function DescriptionAppear(){
      clicked = true
      divElement[0].style.display = 'none';
      divDescript[0].innerHTML ="<h1><a href ="+hoveredObj.userData+">" + hoveredObj.name + "</a></h1><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam dolorem molestias nobis eveniet asperiores, vitae nisi deserunt minus, ab vel consectetur? Voluptates, accusantium dolores incidunt labore perspiciatis ipsam iste pariatur</p>";
      divDescript[0].style.display = 'block';
      setTimeout(function () {
        divDescript[0].style.opacity = "1.0";
      }, 200);

    }

    function DescriptionDesap(){
      clicked = false
      divDescript[0].style.display = 'none';

    }
    var clicked = false

    function check(event){


      mouse.x = ((event.clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left)) * 2 - 1;
      mouse.y = - ((event.clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      var intersects = raycaster.intersectObjects(tooltipEnabledObjects, true);
      if (intersects.length > 0) {
        
        toogle2 = true;
        DescriptionAppear();
        console.log(canvasBounds.width)
        //blur[0].style.display = 'block'
        blur[0].style.opacity = 0.4;
        blur[0].style.width = canvasBounds.width+'px';
        blur[0].style.height = canvasBounds.height+'px';
        blur[0].style.top = canvasBounds.top+'px';
        console.log(blur[0].style.width)
        }
        else{
          DescriptionDesap();
          blur[0].style.opacity = 0;
          toogle2 = false;
        }
        
      }



    function OnMouseClick(event){

      check(event)
    }


    function render() {

      renderer.clear();
      renderer.render(scene, camera);
      renderer.clearDepth();
      renderer.render(scene2, camera);


      requestAnimationFrame(render)
      if (!latestMouseProjection && toogle2 === false) {

        pivotPoint.rotation.z += 0.005;
        Sun.rotation.y += 0.005;
        controls.update();

        //sphereMesh1.rotation.z += 0.001;
      }
    }
   
    window.addEventListener('mousemove', function (event) {
      updateMouseCoords(event, mouse);

      latestMouseProjection = undefined;
      hoveredObj = undefined;

      handlemanip(event);
    }, true);
    window.addEventListener('click',OnMouseClick , true);
    render()
  }

  componentDidMount() {

    fetch(`${process.env.REACT_APP_API_BASE_URL}/shops?category=${this.props.category_id}`)
        .then(res => res.json())
        .then(res => {
             this.setState({
                shops: res["hydra:member"]
             })   
         this.createSystem()
    })

  }
  render() {
    //onMouseEnter onMouseLeave
    return (
      <div><div className="tooltip"></div><div className="description"></div><div className="blur"></div></div>
    )
  }
}
