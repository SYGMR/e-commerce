import React, { Component } from "react";
import * as THREE from "three";
import '../index.css';

export class Galaxy extends Component {


  


  componentDidMount() {

    
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
    camera.rotation.z = -0.6;
    camera.rotation.y = -0.2;
    camera.rotation.x = -0.5;

    camera.position.z = 1000;
    camera.position.y = 400;
    camera.position.x = -200;

    var texture = new THREE.TextureLoader().load("img/space.jpg");
    scene.background = texture;

    //Scene ADD CAMERA
    scene.add(camera)
    scene2.add(camera)
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.autoClear = false;
    document.body.appendChild(renderer.domElement)

    //PARTICULES

    const geometry = new THREE.Geometry()
    const geometry2 = new THREE.Geometry()
    const geometry3 = new THREE.Geometry()
    const galaxySize = 1000
    var norm = 0;
    var t = 0;

    for (let y = 0; y < 8; y++) {
      t++;
      // Generate particles forpiral galaxy:
      for (let i = 0; i < 1000; i++) {
        norm = i / 1000;
        var thetaVariation = THREE.Math.randFloatSpread(0.5)
        var theta = norm * Math.PI + t + thetaVariation;
        var phi = THREE.Math.randFloatSpread(0.15)
        const distance = norm * galaxySize;

        // Here I need generate spiral arms instead of sphere.
        geometry.vertices.push(new THREE.Vector3(
          distance * Math.sin(theta) * Math.cos(phi),
          distance * Math.sin(theta) * Math.sin(phi),
          distance * Math.cos(theta)
        ))
      }
    }
    for (let y = 0; y < 8; y++) {
      t++;
      // Generate particles forpiral galaxy:
      for (let i = 0; i < 1000; i++) {
        norm = i / 1000;
        var thetaVariation = THREE.Math.randFloatSpread(0.5)
        var theta = norm * Math.PI + t + thetaVariation;
        var phi = THREE.Math.randFloatSpread(0.15)
        const distance = norm * 500;

        // Here I need generate spiral arms instead of sphere.
        geometry3.vertices.push(new THREE.Vector3(
          distance * Math.sin(theta) * Math.cos(phi),
          distance * Math.sin(theta) * Math.sin(phi),
          distance * Math.cos(theta)
        ))
      }
    }

    for (let y = 0; y < 12; y++) {

      // Generate particles forpiral galaxy:
      for (let i = 0; i < 1000; i++) {
        norm = i / 1000;
        var thetaVariation = THREE.Math.randFloatSpread(10)
        var theta = norm * Math.PI + t + thetaVariation;
        var phi = THREE.Math.randFloatSpread(0.15)
        const distance = norm * 1500;

        // Here I need generate spiral arms instead of sphere.
        geometry2.vertices.push(new THREE.Vector3(
          distance * Math.sin(theta) * Math.cos(phi),
          distance * Math.sin(theta) * Math.sin(phi),
          distance * Math.cos(theta)
        ))
      }
    }

    const spiralGalaxy = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0xffffff }))
    const spiralGalaxy2 = new THREE.Points(geometry2, new THREE.PointsMaterial({ color: "#51fcff" }))
    const spiralGalaxy3 = new THREE.Points(geometry3, new THREE.PointsMaterial({ color: 0xffffff }))
    scene.add(spiralGalaxy);
    scene.add(spiralGalaxy2);
    scene.add(spiralGalaxy3);


    //ADD PNG IMAGE FOR CENTER OF GALAXY

    sphereGeo1 = new THREE.PlaneGeometry(1500, 1500, 1);
    //Sphere material 1
    var texture = new THREE.TextureLoader().load('img/galaxy2.png');

    // immediately use the texture for material creation

    sphereMaterial1 = new THREE.MeshBasicMaterial({
      side: THREE.BackSide, map: texture, depthWrite: false, depthTest: false, transparent: true, opacity: 0.8
    });
    //Sphere Mesh 1
    sphereMesh1 = new THREE.Mesh(sphereGeo1, sphereMaterial1);
    sphereMesh1.position.set(0, 1, 0);
    sphereMesh1.rotateX(Math.PI / 2);
    sphereMesh1.name = "pngImage"
    scene.add(sphereMesh1);


    var pivotgeo = new THREE.PlaneGeometry(1, 1, 1);
    var pivotsphere = new THREE.Mesh(pivotgeo, sphereMaterial1);
    pivotsphere.position.set(0, 1, 0);
    pivotsphere.rotateX(Math.PI / 2);
    scene2.add(pivotsphere);


    //pivot point
    pivotPoint = new THREE.Object3D();
    pivotsphere.add(pivotPoint);


    //SYSTEME SOLAIRE
    var systemSolaire1 = new THREE.PlaneGeometry(70, 70, 30);
    //Sphere material 1
    var texture = new THREE.TextureLoader().load('img/flare.png');
    // immediately use the texture for material creation
    var systemMaterial1 = new THREE.MeshBasicMaterial({
      side: THREE.BackSide, map: texture, depthWrite: false, depthTest: false, transparent: true
    });
    var systemMesh1 = new THREE.Mesh(systemSolaire1, systemMaterial1);
    systemMesh1.position.set(400, 1, 40);
    systemMesh1.rotateZ(Math.PI / 2);
    systemMesh1.name = 'CATEGORIE 1'
    scene2.add(systemMesh1);
    pivotPoint.add(systemMesh1);

    var systemSolaire2 = new THREE.PlaneGeometry(70, 70, 30);
    //Sphere material 2
    var texture = new THREE.TextureLoader().load('img/flare.png');
    // immediately use the texture for material creation
    var systemMaterial2 = new THREE.MeshBasicMaterial({
      side: THREE.BackSide, map: texture, depthWrite: false, depthTest: false, transparent: true
    });
    var systemMesh2 = new THREE.Mesh(systemSolaire2, systemMaterial2);
    systemMesh2.position.set(2, 300, 40);
    systemMesh2.rotateZ(Math.PI / 2);
    systemMesh2.name = 'CATEGORIE 2'
    scene2.add(systemMesh2);
    pivotPoint.add(systemMesh2);

    var systemSolaire3 = new THREE.PlaneGeometry(70, 70, 30);
    //Sphere material 3
    var texture = new THREE.TextureLoader().load('img/flare.png');
    // immediately use the texture for material creation
    var systemMaterial3 = new THREE.MeshBasicMaterial({
      side: THREE.BackSide, map: texture, depthWrite: false, depthTest: false, transparent: true
    });
    var systemMesh3 = new THREE.Mesh(systemSolaire3, systemMaterial3);
    systemMesh3.position.set(30, -400, 40);
    systemMesh3.rotateZ(Math.PI / 3);
    systemMesh3.name = 'CATEGORIE 3'
    scene2.add(systemMesh3);
    pivotPoint.add(systemMesh3);

    var systemSolaire4 = new THREE.PlaneGeometry(70, 70, 40);
    //Sphere material 4
    var texture = new THREE.TextureLoader().load('img/flare.png');
    // immediately use the texture for material creation
    var systemMaterial4 = new THREE.MeshBasicMaterial({
      side: THREE.BackSide, map: texture, depthWrite: false, depthTest: false, transparent: true
    });
    var systemMesh4 = new THREE.Mesh(systemSolaire4, systemMaterial4);
    systemMesh4.position.set(-300, 0, 40);
    systemMesh4.rotateZ(Math.PI / 4);
    systemMesh4.name = 'CATEGORIE 4'
    scene2.add(systemMesh4);
    pivotPoint.add(systemMesh4);

    var systemSolaire5 = new THREE.PlaneGeometry(70, 70, 40);
    //Sphere material 5
    var texture = new THREE.TextureLoader().load('img/flare.png');
    // immediately use the texture for material creation
    var systemMaterial5 = new THREE.MeshBasicMaterial({
      side: THREE.BackSide, map: texture, depthWrite: false, depthTest: false, transparent: true
    });
    var systemMesh5 = new THREE.Mesh(systemSolaire5, systemMaterial5);
    systemMesh5.position.set(200, 200, 40);
    systemMesh5.rotateZ(Math.PI / 5);
    systemMesh5.name = 'CATEGORIE 5'
    scene2.add(systemMesh5);
    pivotPoint.add(systemMesh5);



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
       
        divElement[0].innerHTML = "<h2><a href =\"/" + hoveredObj.name + "\">" + hoveredObj.name + "</a></h2>";
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
      divDescript[0].innerHTML ="<h1><a href =\"/" + hoveredObj.name + "\">" + hoveredObj.name + "</a></h1><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam dolorem molestias nobis eveniet asperiores, vitae nisi deserunt minus, ab vel consectetur? Voluptates, accusantium dolores incidunt labore perspiciatis ipsam iste pariatur</p>";
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

    function onMouseMove(event) {
      updateMouseCoords(event, mouse);

      latestMouseProjection = undefined;
      hoveredObj = undefined;

      handlemanip(event);
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
        spiralGalaxy.rotation.y -= 0.001;

        spiralGalaxy2.rotation.y -= 0.001;

        spiralGalaxy3.rotation.y -= 0.001;

        pivotPoint.rotation.z += 0.001;

        sphereMesh1.rotation.z += 0.001;
      }
    }
   
    window.addEventListener('mousemove', onMouseMove, true);
    window.addEventListener('click',OnMouseClick , true);
    render()
  }
  render() {
    //onMouseEnter onMouseLeave
    return (
      <div><div className="tooltip"></div><div className="description"></div><div className="blur"></div></div>
    )
  }
}

