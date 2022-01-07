var parametersShort = {

    ROAD_LENGTH: 500,

    CENTER_WIDTH: 0.125,
    ROAD_WIDTH: 15,

    CURB_WIDTH: 0.25,
    CURB_HEIGHT: 0.15,

    DELINEATOR_WIDTH: 0.1,
    DELINEATOR_HEIGHT: 0.9,

    SIDEWALK_WIDTH: 4,
    SIDEROAD_WIDTH: 2,

    GROUND_WIDTH: 150,

    LAMP_HEIGHT: 4.5,
    LAMP_BOTTOM: 0.5,

    NUM_BUILDINGS: 100

};

var materialGround = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, ambient: 0xaaaaaa, specular: 0x999999, perPixel: true, vertexColors: THREE.FaceColors });
var materialRoad = new THREE.MeshPhongMaterial({ color: 0x222222, ambient: 0x222222, specular: 0x222222, perPixel: true });
var materialCenter = new THREE.MeshPhongMaterial({ color: 0xffee00, ambient: 0xffee00, specular: 0xffee00, map: mapStrips, perPixel: true, alphaTest: 0.5 });
materialCenter.polygonOffset = true;
materialCenter.polygonOffsetFactor = -1;
materialCenter.polygonOffsetUnits = 1;

var materialFront = new THREE.MeshBasicMaterial({ color: 0xffee00 });
materialFront.polygonOffset = true;
materialFront.polygonOffsetFactor = -1;
materialFront.polygonOffsetUnits = 1;

var materialBack = new THREE.MeshBasicMaterial({ color: 0xff0000 });
materialBack.polygonOffset = true;
materialBack.polygonOffsetFactor = -1;
materialBack.polygonOffsetUnits = 1;

var sharedMaterials = {

    ground: materialGround,
    road: materialRoad,
    center: materialCenter,
    front: materialFront,
    back: materialBack

}
                            // 500                  15                      0.125                  materialRoad      materialCenter
var road = generateRoad( parameters.ROAD_LENGTH, parameters.ROAD_WIDTH, parameters.CENTER_WIDTH, materials.road, materials.center );
function generateRoad(roadLength, roadWidth, centerWidth, materialRoad, materialCenter) {

    var root = new THREE.Object3D();
    root.rotation.x = -Math.PI / 2;

    var groundGeo = new THREE.PlaneGeometry(roadWidth, roadLength);
    var centerGeo = new THREE.PlaneGeometry(centerWidth, roadLength);

    var ground = new THREE.Mesh(groundGeo, materialRoad);
    var center = new THREE.Mesh(centerGeo, materialCenter);

    ground.receiveShadow = true;
    center.receiveShadow = true;

    addStatic(root, ground);
    addStatic(root, center);

    return root;

}

function addStatic(parent, child) {

    child.matrixAutoUpdate = false;
    child.updateMatrix();

    parent.add(child);

}