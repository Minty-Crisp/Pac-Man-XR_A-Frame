//
//Game Control Component
AFRAME.registerComponent('game_control', {

init: function () {
//Do something when component first attached.

//A-Frame Elements
const sceneEl = this.el;
const camera = document.querySelector('#camera');
const vrController = document.querySelector('#vrController');
const vrRestartGamePrompt = document.querySelector('#vrRestartGamePrompt');
const vrFloor = document.querySelector('#vrFloor');
const gameStartCountdown = document.querySelector('#gameStartCountdown');
const playerText = document.querySelector('#playerText');
const readyText = document.querySelector('#readyText');
const gameOverText = document.querySelector('#gameOverText');
const scoreText = document.querySelector('#scoreText');
const hiScoreText = document.querySelector('#hiScoreText');
const playerLife1 = document.querySelector('#playerLife1');
const playerLife2 = document.querySelector('#playerLife2');
const playerLife3 = document.querySelector('#playerLife3');
const currentLevelItem = document.querySelector('#currentLevelItem');
const bonusPoints1 = document.querySelector('#bonusPoints1');
const bonusPoints2 = document.querySelector('#bonusPoints2');
const bonusPoints3 = document.querySelector('#bonusPoints3');
const bonusPoints4 = document.querySelector('#bonusPoints4');
const bonusPoints5 = document.querySelector('#bonusPoints5');
const cherry1Level = document.querySelector('#cherry1-level');
const cherry2Level = document.querySelector('#cherry2-level');
const strawberryLevel = document.querySelector('#strawberry-level');
const orangeLevel = document.querySelector('#orange-level');
const appleLevel = document.querySelector('#apple-level');
const melonLevel = document.querySelector('#melon-level');
const diamondLevel = document.querySelector('#diamond-level');
const bellLevel = document.querySelector('#bell-level');
const keyLevel = document.querySelector('#key-level');
const cherry1Bonus = document.querySelector('#cherry1-bonus');
const cherry2Bonus = document.querySelector('#cherry2-bonus');
const strawberryBonus = document.querySelector('#strawberry-bonus');
const orangeBonus = document.querySelector('#orange-bonus');
const appleBonus = document.querySelector('#apple-bonus');
const melonBonus = document.querySelector('#melon-bonus');
const diamondBonus = document.querySelector('#diamond-bonus');
const bellBonus = document.querySelector('#bell-bonus');
const keyBonus = document.querySelector('#key-bonus');
const allLevelIcons = [cherry1Level, cherry2Level, strawberryLevel, orangeLevel, appleLevel, melonLevel, diamondLevel, bellLevel, keyLevel];
const allBonusIcons = [cherry1Bonus, cherry2Bonus, strawberryBonus, orangeBonus, appleBonus, melonBonus, diamondBonus, bellBonus, keyBonus];
//Sounds
const introSound = document.querySelector('#introSound');
const levelCompleteSound = document.querySelector('#levelCompleteSound');
const deathSound = document.querySelector('#deathSound');
const eatFruitSound = document.querySelector('#eatFruitSound');
const eatGhostSound = document.querySelector('#eatGhostSound');
const extraLifeSound = document.querySelector('#extraLifeSound');
const dotHitSound = document.querySelector('#dotHitSound');
const powerUpSound = document.querySelector('#powerUpSound');

//HTML Elements
const beginDiv = document.querySelector('#beginDiv');
const gameRestartButtonHTML = document.querySelector('#gameRestartButtonHTML');
const enableVRHTML = document.querySelector('#enableVRHTML');
const enableVRHTML2 = document.querySelector('#enableVRHTML2');
const controlsInfoToggleAngleButtonHTML = document.querySelector('#controlsInfoToggleAngleButtonHTML');
const controlsInfoToggleAngleButtonHTML2 = document.querySelector('#controlsInfoToggleAngleButtonHTML2');
const enableAudioButtonHTML = document.querySelector('#enableAudioButtonHTML');
const enableAudioButtonHTML2 = document.querySelector('#enableAudioButtonHTML2');
const upButton = document.querySelector('#upButton');
const leftButton = document.querySelector('#leftButton');
const rightButton = document.querySelector('#rightButton');
const downButton = document.querySelector('#downButton');

//
//Important Configs 
//
const checkKillMS = 5;//ms
let playerStartSpeed = 220;//ms @ 0.5
let ghostStartSpeed = 600;//ms @ 1
let ghostLevelSpeed = ghostStartSpeed;
let showAngleController = true;
const switchChaseCheck = .09;
//

//Game Bools
let newGame = true;
let levelLoaded = false;
let levelStart;
let gameStart;
let gameOver;
let levelRestart;
let useVRRestartPrompt = false;
let audioOn = false;

//Misc Intervals & Timeouts
let restartGameTimeout;
let resetAvatarTimeout;
let countdownStartInterval
let buttonHoldInterval;
let killInterval;
let bonusFlashTimeout1;
let bonusFlashTimeout2;
let bonusFlashTimeout3;
let bonusFlashTimeout4;
let bonusFlashTimeout5;
let showBonusTimeout;
let wallsAnimTimeout;
let wallsAnimTimeout2;
let gameStartSoundTimeout;
let levelCompleteSoundTimeout;
let vrControllerInterval;

//Game Score Consts
const playerScorePreText = 'Score : ';
const hiScorePreText = 'Hi-Score : ';
const dotPoint = 10;
const powerUpPoint = 50;
const bonus1 = 100;
const bonus2 = 300;
const bonus3 = 500;
const bonus4 = 700;
const bonus5 = 1000;
const bonus6 = 2000;
const bonus7 = 3000;
const bonus8 = 5000;
const enemy1Point = 200;
const enemy2Point = 400;
const enemy3Point = 800;
const enemy4Point = 1600;
const bonusFlashTime = 2500;//ms

//Game Var Holders
let currentMapWalls;
let countdownText;
let currentLevel;
let currentLives;
let playerScore;
let playerScoreString;
let eatenDots;
let maxDots = 196;//amount of dots spawned in level
let bonusAmount;
let bonusOn;
let playerHitHiScore;
let hiScoreDefault = 10000;
let hiScore = hiScoreDefault;
let hiScoreString;
let bonusTextMaterial = {value:100, width: 10, color: "#FFFFFF", align: "center", font: "exo2bold"};
let usedBonusText = [];
let vrControllerRot = new THREE.Vector3();

//Pretty Number Support
let newNum;
let addCommas;
let commaLength;

//
//Avatar Data
//

//Player Data
//
const player = document.querySelector('#playerOnBoard');
const playerAvatar = document.querySelector('#playerAvatar');
const playerDeathSplash = document.querySelector('#playerDeathSplash');
const playerDeathSplash2 = document.querySelector('#playerDeathSplash2');
const playerDeathSplash3 = document.querySelector('#playerDeathSplash3');
const playerDeathSplash4 = document.querySelector('#playerDeathSplash4');
const playerDeathSplash5 = document.querySelector('#playerDeathSplash5');
const playerDeathSplash6 = document.querySelector('#playerDeathSplash6');
const playerDeathSplash7 = document.querySelector('#playerDeathSplash7');
const playerDeathSplash8 = document.querySelector('#playerDeathSplash8');
//Position and Rotations
const playerSpawn = new THREE.Vector3(0.5, 0, 3);
let playerPos = new THREE.Vector3();
let playerNewPos = new THREE.Vector3();
let playerNextPos = new THREE.Vector3();
let playerNextPosCheck = new THREE.Vector3();
let playerNewRotation = new THREE.Vector3();
let playerCurrentDirection;
//Main
const stepDistance = 0.5;
let stepIntervalPlayer;//ms
let moveAnimation = {};
let inputDirection;
let checkXorZ;
let playerHit;
let poweredUp;
let poweredUpKills;
let poweredUpTimer = 13000;//start at 13secs
let poweredUpWarningTimer = (poweredUpTimer/4) * 3;//start at 3/4 of timer
let poweredUpSpeedChange = 25;//ms
let ghostPoweredUpSpeedChange = poweredUpSpeedChange*3;//ms
let playerEarned1up;
let playerTunnelTeleport;
let playerInTunnel;
//Timeouts & Intervals
let playerInterval;
let tunnelTimeout;
let tunnelTimeout2;
let poweredUpTimeout;
let dotCheckTimeout;
let poweredUpWarningTimeout;
let deathAnimTimeout1;
let deathAnimTimeout2;
let deathSoundTimeout;

//
//Ghost Data
//

//All Ghost Support
let moveGhostStartAnimation = {};

//All Ghost Interval & Timeouts
let moveGhostStartTimeout1;
let moveGhostStartTimeout2;
let moveGhostStartTimeout3;

//Ghost 1
//
const ghost1OnBoard = document.querySelector('#ghost1OnBoard');
const ghost1Eye1Socket = document.querySelector('#ghost1Eye1Socket');
const ghost1Eye1 = document.querySelector('#ghost1Eye1');
const ghost1Eye2Socket = document.querySelector('#ghost1Eye2Socket');
const ghost1Eye2 = document.querySelector('#ghost1Eye2');
const ghost1Mouth = document.querySelector('#ghost1Mouth');
const ghost1Spin = document.querySelector('#ghost1Spin');
const ghost1Head = document.querySelector('#ghost1Head');
const ghost1Body = document.querySelector('#ghost1Body');
const ghost1Legs1 = document.querySelector('#ghost1Legs1');
const ghost1Legs2 = document.querySelector('#ghost1Legs2');
const ghost1Legs3 = document.querySelector('#ghost1Legs3');
const ghost1Legs4 = document.querySelector('#ghost1Legs4');
//Position and Rotations
const ghost1Spawn = new THREE.Vector3(0, -0.1, -1);
let ghost1Pos = new THREE.Vector3();
ghost1Pos.copy(ghost1Spawn);
let ghost1CurrentPos = new THREE.Vector3();
let ghost1CurrentPosAtInput = new THREE.Vector3();
let ghost1NewPos = new THREE.Vector3();
let ghost1CurrentDirection;
let ghost1InputDirection;
//Main
let stepIntervalGhost1 = ghostStartSpeed;//ms
let moveGhost1Animation = {};
let moveGhost1AnimationReturn = {};
let ghost1CheckXorZ;
let ghost1PathReverse;
let ghost1PathTurn1;
let ghost1PathTurn2;
let ghost1AvailablePaths = [];
let ghost1Chance;
let ghost1TunnelHit;
let ghost1TunnelTeleport;
let ghost1InTunnel;
let ghost1Hit;
let ghost1RecentDeath;
let ghost1Start;
let ghost1PoweredUp;
let ghost1PowerUpHit;
//Timeouts & Intervals
let ghost1Interval;
let ghost1MoveSetPosTimeout;
let ghost1Move2Timeout;
let ghost1TunnelTimeout;
let ghost1StartTimeout0;
let ghost1StartTimeout;
let ghost1DeathTimeout;
let ghost1ReturnTimeout;
let ghost1ReturnTimeout2;
//Pathfinding
let ghost1Pathfind;
let ghost1ContinuePathfind;
let ghost1CheckMainDirection;
let ghost1PathMoves;
let ghost1PathOriginalDirection;
let ghost1PathFirst;
let ghost1PathfinderDirections = [];
let ghost1RemainingPaths = [];
let ghost1PathAvailableTemp = [];
let ghost1PathfindPreviously;
let ghost1ChaseCheckIteration;
let ghost1CheckForPathSwitch;
let ghost1StartChaseTo;
let ghost1SwitchChaseChance;

//Ghost 2
//
const ghost2OnBoard = document.querySelector('#ghost2OnBoard');
const ghost2Eye1Socket = document.querySelector('#ghost2Eye1Socket');
const ghost2Eye1 = document.querySelector('#ghost2Eye1');
const ghost2Eye2Socket = document.querySelector('#ghost2Eye2Socket');
const ghost2Eye2 = document.querySelector('#ghost2Eye2');
const ghost2Mouth = document.querySelector('#ghost2Mouth');
const ghost2Spin = document.querySelector('#ghost2Spin');
const ghost2Head = document.querySelector('#ghost2Head');
const ghost2Body = document.querySelector('#ghost2Body');
const ghost2Legs1 = document.querySelector('#ghost2Legs1');
const ghost2Legs2 = document.querySelector('#ghost2Legs2');
const ghost2Legs3 = document.querySelector('#ghost2Legs3');
const ghost2Legs4 = document.querySelector('#ghost2Legs4');
//Position and Rotations
const ghost2Spawn = new THREE.Vector3(1, -0.1, -1);
let ghost2Pos = new THREE.Vector3();
ghost2Pos.copy(ghost2Spawn);
let ghost2CurrentPos = new THREE.Vector3();
let ghost2CurrentPosAtInput = new THREE.Vector3();
let ghost2NewPos = new THREE.Vector3();
let ghost2InputDirection;
let ghost2CurrentDirection;
//Main
let stepIntervalGhost2 = ghostStartSpeed;//ms
let moveGhost2Animation = {};
let moveGhost2AnimationReturn = {};
let ghost2CheckXorZ;
let ghost2PathReverse;
let ghost2PathTurn1;
let ghost2PathTurn2;
let ghost2AvailablePaths = [];
let ghost2Chance;
let ghost2TunnelHit;
let ghost2TunnelTeleport;
let ghost2InTunnel;
let ghost2Hit;
let ghost2RecentDeath;
let ghost2Start;
let ghost2PoweredUp;
let ghost2PowerUpHit;
//Timeouts & Intervals
let ghost2Interval;
let ghost2MoveSetPosTimeout;
let ghost2Move2Timeout;
let ghost2TunnelTimeout;
let ghost2DeathTimeout;
let ghost2StartTimeout0;
let ghost2StartTimeout;
let ghost2ReturnTimeout;
let ghost2ReturnTimeout2;
//Pathfinding
let ghost2Pathfind;
let ghost2ContinuePathfind;
let ghost2CheckMainDirection;
let ghost2PathMoves;
let ghost2PathOriginalDirection;
let ghost2PathFirst;
let ghost2PathfinderDirections = [];
let ghost2RemainingPaths = [];
let ghost2PathAvailableTemp = [];
let ghost2PathfindPreviously;
let ghost2ChaseCheckIteration;
let ghost2CheckForPathSwitch;
let ghost2StartChaseTo;
let ghost2SwitchChaseChance;

//Ghost 3
//
const ghost3OnBoard = document.querySelector('#ghost3OnBoard');
const ghost3Eye1Socket = document.querySelector('#ghost3Eye1Socket');
const ghost3Eye1 = document.querySelector('#ghost3Eye1');
const ghost3Eye2Socket = document.querySelector('#ghost3Eye2Socket');
const ghost3Eye2 = document.querySelector('#ghost3Eye2');
const ghost3Mouth = document.querySelector('#ghost3Mouth');
const ghost3Spin = document.querySelector('#ghost3Spin');
const ghost3Head = document.querySelector('#ghost3Head');
const ghost3Body = document.querySelector('#ghost3Body');
const ghost3Legs1 = document.querySelector('#ghost3Legs1');
const ghost3Legs2 = document.querySelector('#ghost3Legs2');
const ghost3Legs3 = document.querySelector('#ghost3Legs3');
const ghost3Legs4 = document.querySelector('#ghost3Legs4');
//Position and Rotations
const ghost3Spawn = new THREE.Vector3(0, -0.1, 0);
let ghost3Pos = new THREE.Vector3();
ghost3Pos.copy(ghost3Spawn);
let ghost3CurrentPos = new THREE.Vector3();
let ghost3CurrentPosAtInput = new THREE.Vector3();
let ghost3NewPos = new THREE.Vector3();
let ghost3InputDirection;
let ghost3CurrentDirection;
//Main
let stepIntervalGhost3 = ghostStartSpeed;//ms
let moveGhost3Animation = {};
let moveGhost3AnimationReturn = {};
let ghost3CheckXorZ;
let ghost3PathReverse;
let ghost3PathTurn1;
let ghost3PathTurn2;
let ghost3AvailablePaths = [];
let ghost3Chance;
let ghost3TunnelHit;
let ghost3TunnelTeleport;
let ghost3InTunnel;
let ghost3Hit;
let ghost3RecentDeath;
let ghost3Start;
let ghost3PoweredUp;
let ghost3PowerUpHit;
//Timeouts & Intervals
let ghost3Interval;
let ghost3MoveSetPosTimeout;
let ghost3Move2Timeout;
let ghost3TunnelTimeout;
let ghost3ReturnTimeout;
let ghost3ReturnTimeout2;
let ghost3DeathTimeout;
let ghost3StartTimeout0;
let ghost3StartTimeout;
//Pathfinding
let ghost3Pathfind;
let ghost3ContinuePathfind;
let ghost3CheckMainDirection;
let ghost3PathMoves;
let ghost3PathOriginalDirection;
let ghost3PathFirst;
let ghost3PathfinderDirections = [];
let ghost3RemainingPaths = [];
let ghost3PathAvailableTemp = [];
let ghost3PathfindPreviously;
let ghost3ChaseCheckIteration;
let ghost3CheckForPathSwitch;
let ghost3StartChaseTo;
let ghost3SwitchChaseChance;

//Ghost 4
//
const ghost4OnBoard = document.querySelector('#ghost4OnBoard');
const ghost4Eye1Socket = document.querySelector('#ghost4Eye1Socket');
const ghost4Eye1 = document.querySelector('#ghost4Eye1');
const ghost4Eye2Socket = document.querySelector('#ghost4Eye2Socket');
const ghost4Eye2 = document.querySelector('#ghost4Eye2');
const ghost4Mouth = document.querySelector('#ghost4Mouth');
const ghost4Spin = document.querySelector('#ghost4Spin');
const ghost4Head = document.querySelector('#ghost4Head');
const ghost4Body = document.querySelector('#ghost4Body');
const ghost4Legs1 = document.querySelector('#ghost4Legs1');
const ghost4Legs2 = document.querySelector('#ghost4Legs2');
const ghost4Legs3 = document.querySelector('#ghost4Legs3');
const ghost4Legs4 = document.querySelector('#ghost4Legs4');
//Position and Rotations
const ghost4Spawn = new THREE.Vector3(1, -0.1, 0);
let ghost4Pos = new THREE.Vector3();
ghost4Pos.copy(ghost4Spawn);
let ghost4CurrentPos = new THREE.Vector3();
let ghost4CurrentPosAtInput = new THREE.Vector3();
let ghost4NewPos = new THREE.Vector3();
let ghost4InputDirection;
let ghost4CurrentDirection;
//Main
let stepIntervalGhost4 = ghostStartSpeed;//ms
let moveGhost4Animation = {};
let moveGhost4AnimationReturn = {};
let ghost4PlayerHitCheck;
let ghost4CheckXorZ;
let ghost4PathReverse;
let ghost4PathTurn1;
let ghost4PathTurn2;
let ghost4AvailablePaths = [];
let ghost4Chance;
let ghost4TunnelHit;
let ghost4TunnelTeleport;
let ghost4InTunnel;
let ghost4Hit;
let ghost4RecentDeath;
let ghost4Start;
let ghost4PoweredUp;
let ghost4PowerUpHit;
//Timeouts & Intervals
let ghost4Interval;
let ghost4MoveSetPosTimeout;
let ghost4Move2Timeout;
let ghost4TunnelTimeout;
let ghost4ReturnTimeout;
let ghost4ReturnTimeout2;
let ghost4DeathTimeout;
let ghost4StartTimeout0;
let ghost4StartTimeout;
//Pathfinding
let ghost4Pathfind;
let ghost4ContinuePathfind;
let ghost4CheckMainDirection;
let ghost4PathMoves;
let ghost4PathOriginalDirection;
let ghost4PathFirst;
let ghost4PathfinderDirections = [];
let ghost4RemainingPaths = [];
let ghost4PathAvailableTemp = [];
let ghost4PathfindPreviously;
let ghost4ChaseCheckIteration;
let ghost4CheckForPathSwitch;
let ghost4StartChaseAway;
let ghost4SwitchChaseChance;
let ghost4StartChaseTo;

//
//Map Data
//

//
//Basic Map Walls
let mapBasicWallsTopLeft = [ 
[8,9,3,9,7].reverse(),
[10,0,10,0,10].reverse(),
[2,9,0,3,1].reverse(),
[10,0,10,5,7].reverse(),
[5,9,4,8,1].reverse(),
[9,6,10,10,0].reverse(),
[13,12,0,4,0].reverse()
];
let mapBasicWallsTopRight = [ 
[11,8,9,3,9,7],
[11,10,0,10,0,10],
[11,1,3,0,9,4],
[11,8,6,10,0,10],
[11,1,7,2,9,6],
[11,0,10,10,5,9],
[11,0,2,0,12,13]
];
let mapBasicWallsBottomLeft = [ 
[11,11,11,11,11].reverse(),
[9,9,10,2,9].reverse(),
[8,9,0,1,7].reverse(),
[5,7,2,3,1].reverse(),
[0,10,10,10,0].reverse(),
[8,1,6,5,7].reverse(),
[5,9,9,9,1].reverse()
];
let mapBasicWallsBottomRight = [ 
[11,11,11,11,11,11],
[11,9,4,10,9,9],
[11,8,1,0,9,7],
[11,1,3,4,8,6],
[11,0,10,10,10,0],
[11,8,6,5,1,7],
[11,1,9,9,9,6]
];
//Combined Basic Map Walls
let mapBasicWalls = [
mapBasicWallsTopLeft.reverse(),
mapBasicWallsTopRight.reverse(),
mapBasicWallsBottomLeft,
mapBasicWallsBottomRight
];
//Map Support
let mapTunnels = [];
let mapTunnelsGhost = [];
let allWalls = [];
const wallRadius = 0.5
const wallLeftRight = {primitive: 'box', width: 0.1, height: 1, depth: 1};
const wallLeftRightFlair = {primitive: 'box', width: 0.025, height: 0.05, depth: 1};
const wallUpDown = {primitive: 'box', width: 1, height: 1, depth: 0.1};
const wallUpDownFlair = {primitive: 'box', width: 1, height: 0.05, depth: 0.025};
const classicBlue = {shader: "standard", color: "#1801fd", opacity: "1", metalness: "0.2", roughness: "0.8", emissive: "#1801fd", emissiveIntensity: "0.1",};
const flairMaterial = {shader: "standard", color: "#000000", opacity: "1", metalness: "0.2", roughness: "0.8", emissive: "#000000", emissiveIntensity: "0.1",};
const levelCompleteAnim = {
	property: 'material.color',
	from: '#1801fd',
	to: '#fcfafd',
	dur: 250,
	delay: 0,
	loop: '8',
	dir: 'alternate',
	easing:'linear',
	elasticity: 400,
	autoplay: 'false',
	enabled: 'true',
	startEvents: 'levelComplete'
	};

//
//Basic Map Dots
let mapBasicDotsTopLeft = [ 
[1,1,1,1,4].reverse(),
[9,0,3,0,4].reverse(),
[6,1,6,1,1].reverse(),
[3,0,3,3,2].reverse(),
[6,1,3,0,0].reverse(),
[0,0,3,0,0].reverse(),
[0,0,3,0,0].reverse()
];
let mapBasicDotsTopRight = [ 
[11,4,2,2,2,2],
[11,4,0,3,0,9],
[11,10,2,8,2,8],
[11,1,3,3,0,3],
[11,0,0,3,2,8],
[11,0,0,3,0,0],
[11,0,0,3,0,0]
];
let mapBasicDotsBottomLeft = [ 
[11,11,11,11,11].reverse(),
[0,0,3,0,0].reverse(),
[1,1,6,1,4].reverse(),
[9,2,3,2,2].reverse(),
[0,3,3,3,0].reverse(),
[1,6,3,6,4].reverse(),
[6,1,1,1,1].reverse()
];
let mapBasicDotsBottomRight = [ 
[11,11,11,11,11,11],
[11,0,0,3,0,0],
[11,4,2,8,2,2],
[11,1,1,3,1,9],
[11,0,3,3,3,0],
[11,4,8,3,8,2],
[11,10,2,2,2,8]
];
//Combined Basic Map Dots
let mapBasicDots = [
mapBasicDotsTopLeft.reverse(),
mapBasicDotsTopRight.reverse(),
mapBasicDotsBottomLeft,
mapBasicDotsBottomRight
];
//Dot Support
let allDotsXZ = [];
let allDots = [];
let allPowerUpsXZ = [];
let allPowerUps = [];
let allDotsXZLoaded = [];
let allDotsLoaded = [];
let allPowerUpsXZLoaded = [];
let allPowerUpsLoaded = [];
const dotGeometry = {primitive: 'box', width: 0.1, height: 0.1, depth: 0.1};
const classicYellow = {shader: "standard", color: "#f2f603", opacity: "1", emissive: "#f2f603", emissiveIntensity: "0.25",};
const powerUpGeometry = {primitive: 'cylinder', height: 0.1, radius: 0.175, segmentsHeight: 1, segmentsRadial: 16, openEnded: 'false', thetaStart: 0, thetaLength: 360, };
const powerUpMaterial = {shader: "standard", color: "#000000", opacity: "1", emissive: "#f2f603", emissiveIntensity: "0",};
let powerUpBlink = {
	property: 'material.emissiveIntensity',
	from: 0,
	to: 1,
	dur: 450,
	delay: 0,
	loop: 'true',
	dir: 'alternate',
	easing:'easeInOutElastic',
	elasticity: 400,
	autoplay: 'true',
	enabled: 'true',
	};

//
//Misc Support Functions
//

//Pretty Numbers
//useAs = prettyNums(playerScoreString).join('').trim();
function prettyNums(num) {
//Convert num to string and store as an Array
newNum = Array.from(num.toString());
addCommas;
commaLength;

//Check if the number has 1, 2 or 3 numbers before the first comma. All after the third afterwards
if (newNum.length === 1 || newNum.length === 2 ||newNum.length === 3) {
//do nothing
// 1,000
} else if (newNum.length % 3 === 1) {
//Comma after first num, then every 3rd num
//Offset for First Comma
addCommas = newNum.length - 1;
//How many comma's total
commaLength = addCommas / 3;
//
for (let i = commaLength; i > 0; i--){
//newNum.splice(i*3, 0, ',');
newNum.splice((i*3)-2, 0, ',');
}
// 10,000
} else if (newNum.length % 3 === 2) {
//Comma after first two nums, then every 3rd num
//Offset for First Comma
addCommas = newNum.length - 2;
//How many comma's total
commaLength = addCommas / 3;
//
for (let i = commaLength; i > 0; i--){
//newNum.splice(i*3, 0, ',');
newNum.splice((i*3)-1, 0, ',');
}

// 100,000
} else if (newNum.length % 3 === 0) {
//Comma after every 3rd num
//How many times to add a comma
addCommas = newNum.length / 3;
//Avoid the last Triple Set Comma
commaLength = addCommas - 1;
//
for (let i = commaLength; i > 0; i--){
newNum.splice(i*3, 0, ',');
}
// 1,000
} 

return newNum;
//End Pretty Numbers
};

//
//Level Functions
//

//Single Quadrant Walls Spawner
function quadrantWallSpawn(map,parentEl,quadrant) {
//Building from 0,0 requires offsets for most quadrants
//topLeft - no change
//topRight - +x shift right by 1 
//bottomLeft - +z shift down by 1
//bottomRight - +z shift down by 1 & +x shift right by 1 

//Map Key
//
//Walls built in position and movement blocked
//0 - empty
//1 - bottom
//2 - left
//3 - top
//4 - right
//5 - left & bottom
//6 - right & bottom
//7 - right & top
//8 - left & top
//9 - top & bottom
//10 - left & right
//11 - overlap, ignore
//12 - tunnel - top & bottom - slow enemy
//13 - tunnel connect- top & bottom - slow enemy

//Loop through Z array set
for (let i = 0; i < map.length; i++) {

	//Loop through X array set
	for (let j = 0; j < map[i].length; j++) {

		//Check for non-interactable obstacles (1)
		//Spawn Basic walls
		if(map[i][j] === 0){
			//Empty Space
		   } else if(map[i][j] === 1){
//1 - bottom : +z
			//Create wall Entity
			let wall = document.createElement('a-entity');
			let wallFlair = document.createElement('a-entity');
			//Set primitive shape
			wall.setAttribute('geometry', wallUpDown);
			wallFlair.setAttribute('geometry', wallUpDownFlair);
			//Set Material
			wall.setAttribute('material', classicBlue);
			wallFlair.setAttribute('material', flairMaterial);

			//Set levelCompleteAnim animation to Wall
			wall.setAttribute('animation__levelanim', levelCompleteAnim);

			//Add basic wall class
			wall.classList.add("wall");
			wallFlair.classList.add("wallFlair");

			//Set position
			let posX;
			let posY = 0;
			let posZ;
			let posYFlair = 0.5;

			if(quadrant === 'topLeft'){
				posX = j * -1;
				posZ = (i * -1) + wallRadius;
			} else if(quadrant === 'topRight'){
				posX = j;
				posZ = (i * -1) + wallRadius;
			} else if(quadrant === 'bottomLeft'){
				posX = j * -1;
				posZ = i + wallRadius;
			} else if(quadrant === 'bottomRight'){
				posX = j;
				posZ = i + wallRadius;
			} 

			//Set Position
			let positionVec3 = new THREE.Vector3(posX, posY, posZ);
			let positionVec3Flair = new THREE.Vector3(posX, posYFlair, posZ);
			wall.setAttribute('position', positionVec3);
			wallFlair.setAttribute('position', positionVec3Flair);

			//Attach to parent entity
			parentEl.appendChild(wall);
			parentEl.appendChild(wallFlair);

		   } else if(map[i][j] === 2){
//2 - right : -x
			//Create wall Entity
			let wall = document.createElement('a-entity');
			let wallFlair = document.createElement('a-entity');
			//Set primitive shape
			wall.setAttribute('geometry', wallLeftRight);
			wallFlair.setAttribute('geometry', wallLeftRightFlair);
			//Set Material
			wall.setAttribute('material', classicBlue);
			wallFlair.setAttribute('material', flairMaterial);

			//Set levelCompleteAnim animation to Wall
			wall.setAttribute('animation__levelanim', levelCompleteAnim);

			//Add basic wall class
			wall.classList.add("wall");
			wallFlair.classList.add("wallFlair");

			//Set position
			let posX;
			let posY = 0;
			let posZ;
			let posYFlair = 0.5;

			if(quadrant === 'topLeft'){
				posX = (j * -1) - wallRadius;
				posZ = i * -1;
			} else if(quadrant === 'topRight'){
				posX = j - wallRadius;
				posZ = i * -1;
			} else if(quadrant === 'bottomLeft'){
				posX = (j * -1) - wallRadius;
				posZ = i;
			} else if(quadrant === 'bottomRight'){
				posX = j - wallRadius;
				posZ = i;
			} 

			//Set Position
			let positionVec3 = new THREE.Vector3(posX, posY, posZ);
			let positionVec3Flair = new THREE.Vector3(posX, posYFlair, posZ);
			wall.setAttribute('position', positionVec3);
			wallFlair.setAttribute('position', positionVec3Flair);

			//Attach to parent entity
			parentEl.appendChild(wall);
			parentEl.appendChild(wallFlair);

		   } else if(map[i][j] === 3){
//3 - top : -z
			//Create wall Entity
			let wall = document.createElement('a-entity');
			let wallFlair = document.createElement('a-entity');
			//Set primitive shape
			wall.setAttribute('geometry', wallUpDown);
			wallFlair.setAttribute('geometry', wallUpDownFlair);
			//Set Material
			wall.setAttribute('material', classicBlue);
			wallFlair.setAttribute('material', flairMaterial);

			//Set levelCompleteAnim animation to Wall
			wall.setAttribute('animation__levelanim', levelCompleteAnim);

			//Add basic wall class
			wall.classList.add("wall");
			wallFlair.classList.add("wallFlair");

			//Set position
			let posX;
			let posY = 0;
			let posZ;
			let posYFlair = 0.5;

			if(quadrant === 'topLeft'){
				posX = j * -1;
				posZ = (i * -1) - wallRadius;
			} else if(quadrant === 'topRight'){
				posX = j;
				posZ = (i * -1) - wallRadius;
			} else if(quadrant === 'bottomLeft'){
				posX = j * -1;
				posZ = i - wallRadius;
			} else if(quadrant === 'bottomRight'){
				posX = j;
				posZ = i - wallRadius;
			} 

			//Set Position
			let positionVec3 = new THREE.Vector3(posX, posY, posZ);
			let positionVec3Flair = new THREE.Vector3(posX, posYFlair, posZ);
			wall.setAttribute('position', positionVec3);
			wallFlair.setAttribute('position', positionVec3Flair);

			//Attach to parent entity
			parentEl.appendChild(wall);
			parentEl.appendChild(wallFlair);

		   } else if(map[i][j] === 4){
//4 - left : +x
			//Create wall Entity
			let wall = document.createElement('a-entity');
			let wallFlair = document.createElement('a-entity');
			//Set primitive shape
			wall.setAttribute('geometry', wallLeftRight);
			wallFlair.setAttribute('geometry', wallLeftRightFlair);
			//Set Material
			wall.setAttribute('material', classicBlue);
			wallFlair.setAttribute('material', flairMaterial);

			//Set levelCompleteAnim animation to Wall
			wall.setAttribute('animation__levelanim', levelCompleteAnim);

			//Add basic wall class
			wall.classList.add("wall");
			wallFlair.classList.add("wallFlair");

			//Set position
			let posX;
			let posY = 0;
			let posZ;
			let posYFlair = 0.5;

			if(quadrant === 'topLeft'){
				posX = (j * -1) + wallRadius;
				posZ = i * -1;
			} else if(quadrant === 'topRight'){
				posX = j + wallRadius;
				posZ = i * -1;
			} else if(quadrant === 'bottomLeft'){
				posX = (j * -1) + wallRadius;
				posZ = i;
			} else if(quadrant === 'bottomRight'){
				posX = j + wallRadius;
				posZ = i;
			}

			//Set Position
			let positionVec3 = new THREE.Vector3(posX, posY, posZ);
			let positionVec3Flair = new THREE.Vector3(posX, posYFlair, posZ);
			wall.setAttribute('position', positionVec3);
			wallFlair.setAttribute('position', positionVec3Flair);

			//Attach to parent entity
			parentEl.appendChild(wall);
			parentEl.appendChild(wallFlair);

		   } else if(map[i][j] === 5){
//5 - left & bottom : -x & +z
			//Left - wall1 -x
			//Bottom - wall2 +z
			//Create wall Entity
			let wall1 = document.createElement('a-entity');
			let wall1Flair = document.createElement('a-entity');
			let wall2 = document.createElement('a-entity');
			let wall2Flair = document.createElement('a-entity');
			//Set primitive shape
			wall1.setAttribute('geometry', wallLeftRight);
			wall1Flair.setAttribute('geometry', wallLeftRightFlair);
			wall2.setAttribute('geometry', wallUpDown);
			wall2Flair.setAttribute('geometry', wallUpDownFlair);
			//Set Material
			wall1.setAttribute('material', classicBlue);
			wall1Flair.setAttribute('material', flairMaterial);
			wall2.setAttribute('material', classicBlue);
			wall2Flair.setAttribute('material', flairMaterial);

			//Set levelCompleteAnim animation to Walls
			wall1.setAttribute('animation__levelanim', levelCompleteAnim);
			wall2.setAttribute('animation__levelanim', levelCompleteAnim);

			//Add basic wall1 class
			wall1.classList.add("wall");
			wall1Flair.classList.add("wallFlair");
			wall2.classList.add("wall");
			wall2Flair.classList.add("wallFlair");

			//Set position
			let posX1;
			let posY = 0;
			let posZ1;
			let posX2;
			let posZ2;
			let posYFlair = 0.5;

			if(quadrant === 'topLeft'){
				posX1 = (j * -1) - wallRadius;
				posZ1 = i * -1;
				posX2 = j * -1;
				posZ2 = (i * -1) + wallRadius;
			} else if(quadrant === 'topRight'){
				posX1 = j - wallRadius;
				posZ1 = i * -1;
				posX2 = j;
				posZ2 = (i * -1) + wallRadius;
			} else if(quadrant === 'bottomLeft'){
				posX1 = (j * -1) - wallRadius;
				posZ1 = i;
				posX2 = j * -1;
				posZ2 = i + wallRadius;
			} else if(quadrant === 'bottomRight'){
				posX1 = j - wallRadius;
				posZ1 = i;
				posX2 = j;
				posZ2 = i + wallRadius;
			} 

			//Set Position
			let positionVec31 = new THREE.Vector3(posX1, posY, posZ1);
			let positionVec31Flair = new THREE.Vector3(posX1, posYFlair, posZ1);
			let positionVec32 = new THREE.Vector3(posX2, posY, posZ2);
			let positionVec32Flair = new THREE.Vector3(posX2, posYFlair, posZ2);
			wall1.setAttribute('position', positionVec31);
			wall1Flair.setAttribute('position', positionVec31Flair);
			wall2.setAttribute('position', positionVec32);
			wall2Flair.setAttribute('position', positionVec32Flair);

			//Attach to parent entity
			parentEl.appendChild(wall1);
			parentEl.appendChild(wall1Flair);
			parentEl.appendChild(wall2);
			parentEl.appendChild(wall2Flair);

		   } else if(map[i][j] === 6){
//6 - right & bottom : +x & +z
			//right - wall1 +x
			//Bottom - wall2 +z
			//Create wall Entity
			let wall1 = document.createElement('a-entity');
			let wall1Flair = document.createElement('a-entity');
			let wall2 = document.createElement('a-entity');
			let wall2Flair = document.createElement('a-entity');
			//Set primitive shape
			wall1.setAttribute('geometry', wallLeftRight);
			wall1Flair.setAttribute('geometry', wallLeftRightFlair);
			wall2.setAttribute('geometry', wallUpDown);
			wall2Flair.setAttribute('geometry', wallUpDownFlair);
			//Set Material
			wall1.setAttribute('material', classicBlue);
			wall1Flair.setAttribute('material', flairMaterial);
			wall2.setAttribute('material', classicBlue);
			wall2Flair.setAttribute('material', flairMaterial);

			//Set levelCompleteAnim animation to Walls
			wall1.setAttribute('animation__levelanim', levelCompleteAnim);
			wall2.setAttribute('animation__levelanim', levelCompleteAnim);

			//Add basic wall class
			wall1.classList.add("wall");
			wall1Flair.classList.add("wallFlair");
			wall2.classList.add("wall");
			wall2Flair.classList.add("wallFlair");

			//Set position
			let posX1;
			let posY = 0;
			let posZ1;
			let posX2;
			let posZ2;
			let posYFlair = 0.5;

			if(quadrant === 'topLeft'){
				posX1 = (j * -1) + wallRadius;
				posZ1 = i * -1;
				posX2 = j * -1;
				posZ2 = (i * -1) + wallRadius;
			} else if(quadrant === 'topRight'){
				posX1 = j + wallRadius;
				posZ1 = i * -1;
				posX2 = j;
				posZ2 = (i * -1) + wallRadius;
			} else if(quadrant === 'bottomLeft'){
				posX1 = (j * -1) + wallRadius;
				posZ1 = i;
				posX2 = j * -1;
				posZ2 = i + wallRadius;
			} else if(quadrant === 'bottomRight'){
				posX1 = j + wallRadius;
				posZ1 = i;
				posX2 = j;
				posZ2 = i + wallRadius;
			} 

			//Set Position
			let positionVec31 = new THREE.Vector3(posX1, posY, posZ1);
			let positionVec31Flair = new THREE.Vector3(posX1, posYFlair, posZ1);
			let positionVec32 = new THREE.Vector3(posX2, posY, posZ2);
			let positionVec32Flair = new THREE.Vector3(posX2, posYFlair, posZ2);
			wall1.setAttribute('position', positionVec31);
			wall1Flair.setAttribute('position', positionVec31Flair);
			wall2.setAttribute('position', positionVec32);
			wall2Flair.setAttribute('position', positionVec32Flair);

			//Attach to parent entity
			parentEl.appendChild(wall1);
			parentEl.appendChild(wall1Flair);
			parentEl.appendChild(wall2);
			parentEl.appendChild(wall2Flair);

		   } else if(map[i][j] === 7){
//7 - right & top : +x & -z
			//right - wall1 +x
			//top - wall2 -z
			//Create wall Entity
			let wall1 = document.createElement('a-entity');
			let wall1Flair = document.createElement('a-entity');
			let wall2 = document.createElement('a-entity');
			let wall2Flair = document.createElement('a-entity');
			//Set primitive shape
			wall1.setAttribute('geometry', wallLeftRight);
			wall1Flair.setAttribute('geometry', wallLeftRightFlair);
			wall2.setAttribute('geometry', wallUpDown);
			wall2Flair.setAttribute('geometry', wallUpDownFlair);
			//Set Material
			wall1.setAttribute('material', classicBlue);
			wall1Flair.setAttribute('material', flairMaterial);
			wall2.setAttribute('material', classicBlue);
			wall2Flair.setAttribute('material', flairMaterial);

			//Set levelCompleteAnim animation to Walls
			wall1.setAttribute('animation__levelanim', levelCompleteAnim);
			wall2.setAttribute('animation__levelanim', levelCompleteAnim);

			//Add basic wall class
			wall1.classList.add("wall");
			wall1Flair.classList.add("wallFlair");
			wall2.classList.add("wall");
			wall2Flair.classList.add("wallFlair");

			//Set position
			let posX1;
			let posY = 0;
			let posZ1;
			let posX2;
			let posZ2;
			let posYFlair = 0.5;

			if(quadrant === 'topLeft'){
				posX1 = (j * -1) + wallRadius;
				posZ1 = i * -1;
				posX2 = j * -1;
				posZ2 = (i * -1) - wallRadius;
			} else if(quadrant === 'topRight'){
				posX1 = j + wallRadius;
				posZ1 = i * -1;
				posX2 = j;
				posZ2 = (i * -1) - wallRadius;
			} else if(quadrant === 'bottomLeft'){
				posX1 = (j * -1) + wallRadius;
				posZ1 = i;
				posX2 = j * -1;
				posZ2 = i - wallRadius;
			} else if(quadrant === 'bottomRight'){
				posX1 = j + wallRadius;
				posZ1 = i;
				posX2 = j;
				posZ2 = i - wallRadius;
			} 

			//Set Position
			let positionVec31 = new THREE.Vector3(posX1, posY, posZ1);
			let positionVec31Flair = new THREE.Vector3(posX1, posYFlair, posZ1);
			let positionVec32 = new THREE.Vector3(posX2, posY, posZ2);
			let positionVec32Flair = new THREE.Vector3(posX2, posYFlair, posZ2);
			wall1.setAttribute('position', positionVec31);
			wall1Flair.setAttribute('position', positionVec31Flair);
			wall2.setAttribute('position', positionVec32);
			wall2Flair.setAttribute('position', positionVec32Flair);

			//Attach to parent entity
			parentEl.appendChild(wall1);
			parentEl.appendChild(wall1Flair);
			parentEl.appendChild(wall2);
			parentEl.appendChild(wall2Flair);

		   } else if(map[i][j] === 8){
//8 - left & top : -x & -z
			//left - wall1 -x
			//top - wall2 -z
			//Create wall Entity
			let wall1 = document.createElement('a-entity');
			let wall1Flair = document.createElement('a-entity');
			let wall2 = document.createElement('a-entity');
			let wall2Flair = document.createElement('a-entity');
			//Set primitive shape
			wall1.setAttribute('geometry', wallLeftRight);
			wall1Flair.setAttribute('geometry', wallLeftRightFlair);
			wall2.setAttribute('geometry', wallUpDown);
			wall2Flair.setAttribute('geometry', wallUpDownFlair);
			//Set Material
			wall1.setAttribute('material', classicBlue);
			wall1Flair.setAttribute('material', flairMaterial);
			wall2.setAttribute('material', classicBlue);
			wall2Flair.setAttribute('material', flairMaterial);

			//Set levelCompleteAnim animation to Walls
			wall1.setAttribute('animation__levelanim', levelCompleteAnim);
			wall2.setAttribute('animation__levelanim', levelCompleteAnim);

			//Add basic wall class
			wall1.classList.add("wall");
			wall1Flair.classList.add("wallFlair");
			wall2.classList.add("wall");
			wall2Flair.classList.add("wallFlair");

			//Set position
			let posX1;
			let posY = 0;
			let posZ1;
			let posX2;
			let posZ2;
			let posYFlair = 0.5;

			if(quadrant === 'topLeft'){
				posX1 = (j * -1) - wallRadius;
				posZ1 = i * -1;
				posX2 = j * -1;
				posZ2 = (i * -1) - wallRadius;
			} else if(quadrant === 'topRight'){
				posX1 = j - wallRadius;
				posZ1 = i * -1;
				posX2 = j;
				posZ2 = (i * -1) - wallRadius;
			} else if(quadrant === 'bottomLeft'){
				posX1 = (j * -1) - wallRadius;
				posZ1 = i;
				posX2 = j * -1;
				posZ2 = i - wallRadius;
			} else if(quadrant === 'bottomRight'){
				posX1 = j - wallRadius;
				posZ1 = i;
				posX2 = j;
				posZ2 = i - wallRadius;
			} 

			//Set Position
			let positionVec31 = new THREE.Vector3(posX1, posY, posZ1);
			let positionVec31Flair = new THREE.Vector3(posX1, posYFlair, posZ1);
			let positionVec32 = new THREE.Vector3(posX2, posY, posZ2);
			let positionVec32Flair = new THREE.Vector3(posX2, posYFlair, posZ2);
			wall1.setAttribute('position', positionVec31);
			wall1Flair.setAttribute('position', positionVec31Flair);
			wall2.setAttribute('position', positionVec32);
			wall2Flair.setAttribute('position', positionVec32Flair);

			//Attach to parent entity
			parentEl.appendChild(wall1);
			parentEl.appendChild(wall1Flair);
			parentEl.appendChild(wall2);
			parentEl.appendChild(wall2Flair);

		   } else if(map[i][j] === 9){
//9 - top & bottom : -z & +z
			//top - wall1 -z
			//bottom - wall2 +z
			//Create wall Entity
			let wall1 = document.createElement('a-entity');
			let wall1Flair = document.createElement('a-entity');
			let wall2 = document.createElement('a-entity');
			let wall2Flair = document.createElement('a-entity');
			//Set primitive shape
			wall1.setAttribute('geometry', wallUpDown);
			wall1Flair.setAttribute('geometry', wallUpDownFlair);
			wall2.setAttribute('geometry', wallUpDown);
			wall2Flair.setAttribute('geometry', wallUpDownFlair);
			//Set Material
			wall1.setAttribute('material', classicBlue);
			wall1Flair.setAttribute('material', flairMaterial);
			wall2.setAttribute('material', classicBlue);
			wall2Flair.setAttribute('material', flairMaterial);

			//Set levelCompleteAnim animation to Walls
			wall1.setAttribute('animation__levelanim', levelCompleteAnim);
			wall2.setAttribute('animation__levelanim', levelCompleteAnim);

			//Add basic wall class
			wall1.classList.add("wall");
			wall1Flair.classList.add("wallFlair");
			wall2.classList.add("wall");
			wall2Flair.classList.add("wallFlair");

			//Set position
			let posX1;
			let posY = 0;
			let posZ1;
			let posX2;
			let posZ2;
			let posYFlair = 0.5;

			if(quadrant === 'topLeft'){
				posX1 = j * -1;
				posZ1 = (i * -1) - wallRadius;
				posX2 = j * -1;
				posZ2 = (i * -1) + wallRadius;
			} else if(quadrant === 'topRight'){
				posX1 = j;
				posZ1 = (i * -1) - wallRadius;
				posX2 = j;
				posZ2 = (i * -1) + wallRadius;
			} else if(quadrant === 'bottomLeft'){
				posX1 = j * -1;
				posZ1 = i - wallRadius;
				posX2 = j * -1;
				posZ2 = i + wallRadius;
			} else if(quadrant === 'bottomRight'){
				posX1 = j;
				posZ1 = i - wallRadius;
				posX2 = j;
				posZ2 = i + wallRadius;
			} 

			//Set Position
			let positionVec31 = new THREE.Vector3(posX1, posY, posZ1);
			let positionVec31Flair = new THREE.Vector3(posX1, posYFlair, posZ1);
			let positionVec32 = new THREE.Vector3(posX2, posY, posZ2);
			let positionVec32Flair = new THREE.Vector3(posX2, posYFlair, posZ2);
			wall1.setAttribute('position', positionVec31);
			wall1Flair.setAttribute('position', positionVec31Flair);
			wall2.setAttribute('position', positionVec32);
			wall2Flair.setAttribute('position', positionVec32Flair);

			//Attach to parent entity
			parentEl.appendChild(wall1);
			parentEl.appendChild(wall1Flair);
			parentEl.appendChild(wall2);
			parentEl.appendChild(wall2Flair);

		   } else if(map[i][j] === 10){
//10 - left & right : -x & +x
			//left - wall1 -x
			//right - wall2 +x
			//Create wall Entity
			let wall1 = document.createElement('a-entity');
			let wall1Flair = document.createElement('a-entity');
			let wall2 = document.createElement('a-entity');
			let wall2Flair = document.createElement('a-entity');
			//Set primitive shape
			wall1.setAttribute('geometry', wallLeftRight);
			wall1Flair.setAttribute('geometry', wallLeftRightFlair);
			wall2.setAttribute('geometry', wallLeftRight);
			wall2Flair.setAttribute('geometry', wallLeftRightFlair);
			//Set Material
			wall1.setAttribute('material', classicBlue);
			wall1Flair.setAttribute('material', flairMaterial);
			wall2.setAttribute('material', classicBlue);
			wall2Flair.setAttribute('material', flairMaterial);

			//Set levelCompleteAnim animation to Walls
			wall1.setAttribute('animation__levelanim', levelCompleteAnim);
			wall2.setAttribute('animation__levelanim', levelCompleteAnim);

			//Add basic wall class
			wall1.classList.add("wall");
			wall1Flair.classList.add("wallFlair");
			wall2.classList.add("wall");
			wall2Flair.classList.add("wallFlair");

			//Set position
			let posX1;
			let posY = 0;
			let posZ1;
			let posX2;
			let posZ2;
			let posYFlair = 0.5;

			if(quadrant === 'topLeft'){
				posX1 = (j * -1) - wallRadius;
				posZ1 = i * -1;
				posX2 = (j * -1) + wallRadius;
				posZ2 = i * -1;
			} else if(quadrant === 'topRight'){
				posX1 = j - wallRadius;
				posZ1 = i * -1;
				posX2 = j + wallRadius;
				posZ2 = i * -1;
			} else if(quadrant === 'bottomLeft'){
				posX1 = (j * -1) - wallRadius;
				posZ1 = i;
				posX2 = (j * -1) + wallRadius;
				posZ2 = i;
			} else if(quadrant === 'bottomRight'){
				posX1 = j - wallRadius;
				posZ1 = i;
				posX2 = j + wallRadius;
				posZ2 = i;
			} 

			//Set Position
			let positionVec31 = new THREE.Vector3(posX1, posY, posZ1);
			let positionVec31Flair = new THREE.Vector3(posX1, posYFlair, posZ1);
			let positionVec32 = new THREE.Vector3(posX2, posY, posZ2);
			let positionVec32Flair = new THREE.Vector3(posX2, posYFlair, posZ2);
			wall1.setAttribute('position', positionVec31);
			wall1Flair.setAttribute('position', positionVec31Flair);
			wall2.setAttribute('position', positionVec32);
			wall2Flair.setAttribute('position', positionVec32Flair);

			//Attach to parent entity
			parentEl.appendChild(wall1);
			parentEl.appendChild(wall1Flair);
			parentEl.appendChild(wall2);
			parentEl.appendChild(wall2Flair);

		   } else if(map[i][j] === 11){
//11 - overlap / ignore
			   //Overlap wall, no draw
			   //Need to differentiate for obstacle detection to ignore
		   } else if(map[i][j] === 12){
//12 - tunnel - top & bottom : -z & +z
			//top - wall1 -z
			//bottom - wall2 +z
			//Create wall Entity
			let wall1 = document.createElement('a-entity');
			let wall1Flair = document.createElement('a-entity');
			let wall2 = document.createElement('a-entity');
			let wall2Flair = document.createElement('a-entity');
			//Set primitive shape
			wall1.setAttribute('geometry', wallUpDown);
			wall1Flair.setAttribute('geometry', wallUpDownFlair);
			wall2.setAttribute('geometry', wallUpDown);
			wall2Flair.setAttribute('geometry', wallUpDownFlair);
			//Set Material
			wall1.setAttribute('material', classicBlue);
			wall1Flair.setAttribute('material', flairMaterial);
			wall2.setAttribute('material', classicBlue);
			wall2Flair.setAttribute('material', flairMaterial);

			//Set levelCompleteAnim animation to Walls
			wall1.setAttribute('animation__levelanim', levelCompleteAnim);
			wall2.setAttribute('animation__levelanim', levelCompleteAnim);

			//Add basic wall class
			wall1.classList.add("wall");
			wall1Flair.classList.add("wallFlair");
			wall2.classList.add("wall");
			wall2Flair.classList.add("wallFlair");

			//Set position
			let posX1;
			let posY = 0;
			let posZ1;
			let posX2;
			let posZ2;
			let posYFlair = 0.5;

			if(quadrant === 'topLeft'){
				posX1 = j * -1;
				posZ1 = (i * -1) - wallRadius;
				posX2 = j * -1;
				posZ2 = (i * -1) + wallRadius;
			} else if(quadrant === 'topRight'){
				posX1 = j;
				posZ1 = (i * -1) - wallRadius;
				posX2 = j;
				posZ2 = (i * -1) + wallRadius;
			} else if(quadrant === 'bottomLeft'){
				posX1 = j * -1;
				posZ1 = i - wallRadius;
				posX2 = j * -1;
				posZ2 = i + wallRadius;
			} else if(quadrant === 'bottomRight'){
				posX1 = j;
				posZ1 = i - wallRadius;
				posX2 = j;
				posZ2 = i + wallRadius;
			} 

			//Set Position
			let positionVec31 = new THREE.Vector3(posX1, posY, posZ1);
			let positionVec31Flair = new THREE.Vector3(posX1, posYFlair, posZ1);
			let positionVec32 = new THREE.Vector3(posX2, posY, posZ2);
			let positionVec32Flair = new THREE.Vector3(posX2, posYFlair, posZ2);
			wall1.setAttribute('position', positionVec31);
			wall1Flair.setAttribute('position', positionVec31Flair);
			wall2.setAttribute('position', positionVec32);
			wall2Flair.setAttribute('position', positionVec32Flair);

			//Attach to parent entity
			parentEl.appendChild(wall1);
			parentEl.appendChild(wall1Flair);
			parentEl.appendChild(wall2);
			parentEl.appendChild(wall2Flair);

		   } else if(map[i][j] === 13){
//13 - tunnel connect - top & bottom : -z & +z
			//top - wall1 -z
			//bottom - wall2 +z
			//Create wall Entity
			let wall1 = document.createElement('a-entity');
			let wall1Flair = document.createElement('a-entity');
			let wall2 = document.createElement('a-entity');
			let wall2Flair = document.createElement('a-entity');
			//Set primitive shape
			wall1.setAttribute('geometry', wallUpDown);
			wall1Flair.setAttribute('geometry', wallUpDownFlair);
			wall2.setAttribute('geometry', wallUpDown);
			wall2Flair.setAttribute('geometry', wallUpDownFlair);
			//Set Material
			wall1.setAttribute('material', classicBlue);
			wall1Flair.setAttribute('material', flairMaterial);
			wall2.setAttribute('material', classicBlue);
			wall2Flair.setAttribute('material', flairMaterial);

			//Set levelCompleteAnim animation to Walls
			wall1.setAttribute('animation__levelanim', levelCompleteAnim);
			wall2.setAttribute('animation__levelanim', levelCompleteAnim);

			//Add basic wall class
			wall1.classList.add("wall");
			wall1Flair.classList.add("wallFlair");
			wall2.classList.add("wall");
			wall2Flair.classList.add("wallFlair");

			//Set position
			let posX;
			let posY = 0;
			let posZ;
			let posX1;
			let posZ1;
			let posX2;
			let posZ2;
			let posYFlair = 0.5;

			if(quadrant === 'topLeft'){
				posX = (j * -1) - 0.5; //Tunnel Move to Tweak
				posZ = i * - 1;
				posX1 = j * -1;
				posZ1 = (i * -1) - wallRadius;
				posX2 = j * -1;
				posZ2 = (i * -1) + wallRadius;
			} else if(quadrant === 'topRight'){
				posX = j + 0.5; //Tunnel Move to Tweak
				posZ = i * - 1;
				posX1 = j;
				posZ1 = (i * -1) - wallRadius;
				posX2 = j;
				posZ2 = (i * -1) + wallRadius;
			} else if(quadrant === 'bottomLeft'){
				posX = j * -1;
				posZ = i;
				posX1 = j * -1;
				posZ1 = i - wallRadius;
				posX2 = j * -1;
				posZ2 = i + wallRadius;
			} else if(quadrant === 'bottomRight'){
				posX = j;
				posZ = i;
				posX1 = j;
				posZ1 = i - wallRadius;
				posX2 = j;
				posZ2 = i + wallRadius;
			} 

			//Set Position
			let positionVec31 = new THREE.Vector3(posX1, posY, posZ1);
			let positionVec31Flair = new THREE.Vector3(posX1, posYFlair, posZ1);
			let positionVec32 = new THREE.Vector3(posX2, posY, posZ2);
			let positionVec32Flair = new THREE.Vector3(posX2, posYFlair, posZ2);
			wall1.setAttribute('position', positionVec31);
			wall1Flair.setAttribute('position', positionVec31Flair);
			wall2.setAttribute('position', positionVec32);
			wall2Flair.setAttribute('position', positionVec32Flair);

			//Attach to parent entity
			parentEl.appendChild(wall1);
			parentEl.appendChild(wall1Flair);
			parentEl.appendChild(wall2);
			parentEl.appendChild(wall2Flair);

			//Player Tunnel Support 
			//Update Tunnel Connect Found and it's center POS
			let positionVec3 = new THREE.Vector3(posX, posY, posZ);
			mapTunnels.push(positionVec3);

			//Ghost Tunnel Support w/ tweak reversal
			if(quadrant === 'topLeft'){
				posX = j * -1; //Tunnel Move to Reverse Tweak
			} else if(quadrant === 'topRight'){
				posX = j; //Tunnel Move to Reverse Tweak
			}
			let positionVec3G = new THREE.Vector3(posX, posY, posZ);
			mapTunnelsGhost.push(positionVec3G);

		   } 

	}//End X array Loop
}//End Z array Loop

}//End Basic wall Spawner

//Wall Spawner
function wallSpawner(map) {
//Builds from 0,0 XZ
//Builds in order of topLeft, topRight, bottomLeft, bottomRight

//Top Left
//Loop 1 : -Z
//Loop 2 : -X
//Top Right
//Loop 1 : -Z
//Loop 2 : +X
//Bottom Left
//Loop 1 : +Z
//Loop 2 : -X
//Bottom Right
//Loop 1 : +Z
//Loop 2 : +X

//Create parent identity w/ id
let wallParent = document.createElement('a-entity');
wallParent.setAttribute('id','wallParent');
//Append parent entity to scene
sceneEl.appendChild(wallParent);

//Loop through mega array set
for (let h = 0; h < map.length; h++) {

	if (h === 0){
		//Spawn Basic Blocks
		quadrantWallSpawn(map[h],wallParent,'topLeft');

	} else if (h === 1){
		//Spawn Basic Blocks
		quadrantWallSpawn(map[h],wallParent,'topRight');

	} else if (h === 2){
		//Spawn Basic Blocks
		quadrantWallSpawn(map[h],wallParent,'bottomLeft');

	} else if (h === 3){
		//Spawn Basic Blocks
		quadrantWallSpawn(map[h],wallParent,'bottomRight');

	}//End if Checks

}//End Multi-Map array Loop

allWalls = document.querySelectorAll('.wall');

}//End Wall Spawner Function

//Play walls anim at level complete
function wallsAnim(){
	//Loop through all walls to play anim
	for(let i = 0; i < allWalls.length; i++){
		allWalls[i].emit('levelComplete',{});
	}
}//End wallsAnim

//Single Quadrant Walls Spawner
function quadrantDotSpawn(map,parentEl,quadrant) {
//Building from 0,0 requires offsets for most quadrants
//topLeft - no change
//topRight - +x shift right by 1 
//bottomLeft - +z shift down by 1
//bottomRight - +z shift down by 1 & +x shift right by 1

//Map Key
//
//0 - empty
//1 - center & right
//2 - center & left
//3 - center & up
//4 - center & down
//5 - center, right & down - NOT USED YET
//6 - center, right & up
//7 - center, left & down - NOT USED YET
//8 - center, left & up
//9 - powerUp center & up
//10 - center
//11 - overlap, ignore

//Loop through Z array set
for (let i = 0; i < map.length; i++) {

	//Loop through X array set
	for (let j = 0; j < map[i].length; j++) {

		//Check for non-interactable obstacles (1)
		//Spawn Basic Blocks
		if(map[i][j] === 0){
//0 - Empty Space

		   } else if(map[i][j] === 1){
//1 - center & right - normal & +x
			//Create dot Entity
			let dot1 = document.createElement('a-entity');
			let dot2 = document.createElement('a-entity');
			//Prep 2 Dimensional Array for POS XZ
			let dot1xz = [];
			let dot2xz = [];
			//Set primitive shape
			dot1.setAttribute('geometry', dotGeometry);
			dot2.setAttribute('geometry', dotGeometry);
			//Set Material
			dot1.setAttribute('material', classicYellow);
			dot2.setAttribute('material', classicYellow);

			//Add basic dot class
			dot1.classList.add("dot");
			dot2.classList.add("dot");

			//Set position
			let posX1;
			let posY = 0;
			let posZ1;
			let posX2;
			let posZ2;

			if(quadrant === 'topLeft'){
				posX1 = j * -1;
				posZ1 = (i * -1);
				posX2 = (j * -1) + wallRadius;
				posZ2 = (i * -1);
			} else if(quadrant === 'topRight'){
				posX1 = j;
				posZ1 = (i * -1);
				posX2 = j + wallRadius;
				posZ2 = (i * -1);
			} else if(quadrant === 'bottomLeft'){
				posX1 = j * -1;
				posZ1 = i;
				posX2 = (j * -1) + wallRadius;
				posZ2 = i;
			} else if(quadrant === 'bottomRight'){
				posX1 = j;
				posZ1 = i;
				posX2 = j + wallRadius;
				posZ2 = i;
			} 

			//Set Position
			let positionVec31 = new THREE.Vector3(posX1, posY, posZ1);
			let positionVec32 = new THREE.Vector3(posX2, posY, posZ2);
			dot1.setAttribute('position', positionVec31);
			dot2.setAttribute('position', positionVec32);

			//Attach to parent entity
			parentEl.appendChild(dot1);
			parentEl.appendChild(dot2);

			//Add generated dots POS to allDots array for pickup checks
			dot1xz.push(positionVec31.x);
			dot1xz.push(positionVec31.z);
			dot2xz.push(positionVec32.x);
			dot2xz.push(positionVec32.z);
			allDotsXZ.push(dot1xz);
			allDotsXZ.push(dot2xz);
			allDots.push(dot1);
			allDots.push(dot2);

		   } else if(map[i][j] === 2){
//2 - center & left - normal & -x
			//Create dot Entity
			let dot1 = document.createElement('a-entity');
			let dot2 = document.createElement('a-entity');
			//Prep 2 Dimensional Array for POS XZ
			let dot1xz = [];
			let dot2xz = [];
			//Set primitive shape
			dot1.setAttribute('geometry', dotGeometry);
			dot2.setAttribute('geometry', dotGeometry);
			//Set Material
			dot1.setAttribute('material', classicYellow);
			dot2.setAttribute('material', classicYellow);

			//Add basic dot class
			dot1.classList.add("dot");
			dot2.classList.add("dot");

			//Set position
			let posX1;
			let posY = 0;
			let posZ1;
			let posX2;
			let posZ2;

			if(quadrant === 'topLeft'){
				posX1 = j * -1;
				posZ1 = (i * -1);
				posX2 = (j * -1) - wallRadius;
				posZ2 = (i * -1);
			} else if(quadrant === 'topRight'){
				posX1 = j;
				posZ1 = (i * -1);
				posX2 = j - wallRadius;
				posZ2 = (i * -1);
			} else if(quadrant === 'bottomLeft'){
				posX1 = j * -1;
				posZ1 = i;
				posX2 = (j * -1) - wallRadius;
				posZ2 = i;
			} else if(quadrant === 'bottomRight'){
				posX1 = j;
				posZ1 = i;
				posX2 = j - wallRadius;
				posZ2 = i;
			} 

			//Set Position
			let positionVec31 = new THREE.Vector3(posX1, posY, posZ1);
			let positionVec32 = new THREE.Vector3(posX2, posY, posZ2);
			dot1.setAttribute('position', positionVec31);
			dot2.setAttribute('position', positionVec32);

			//Attach to parent entity
			parentEl.appendChild(dot1);
			parentEl.appendChild(dot2);

			//Add generated dots POS to allDots array for pickup checks
			dot1xz.push(positionVec31.x);
			dot1xz.push(positionVec31.z);
			dot2xz.push(positionVec32.x);
			dot2xz.push(positionVec32.z);
			allDotsXZ.push(dot1xz);
			allDotsXZ.push(dot2xz);
			allDots.push(dot1);
			allDots.push(dot2);

		   } else if(map[i][j] === 3){
//3 - center & up - normal & -z
			//Create dot Entity
			let dot1 = document.createElement('a-entity');
			let dot2 = document.createElement('a-entity');
			//Prep 2 Dimensional Array for POS XZ
			let dot1xz = [];
			let dot2xz = [];
			//Set primitive shape
			dot1.setAttribute('geometry', dotGeometry);
			dot2.setAttribute('geometry', dotGeometry);
			//Set Material
			dot1.setAttribute('material', classicYellow);
			dot2.setAttribute('material', classicYellow);

			//Add basic dot class
			dot1.classList.add("dot");
			dot2.classList.add("dot");

			//Set position
			let posX1;
			let posY = 0;
			let posZ1;
			let posX2;
			let posZ2;

			if(quadrant === 'topLeft'){
				posX1 = j * -1;
				posZ1 = (i * -1);
				posX2 = j * -1;
				posZ2 = (i * -1) - wallRadius;
			} else if(quadrant === 'topRight'){
				posX1 = j;
				posZ1 = (i * -1);
				posX2 = j;
				posZ2 = (i * -1) - wallRadius;
			} else if(quadrant === 'bottomLeft'){
				posX1 = j * -1;
				posZ1 = i;
				posX2 = j * -1;
				posZ2 = i - wallRadius;
			} else if(quadrant === 'bottomRight'){
				posX1 = j;
				posZ1 = i;
				posX2 = j;
				posZ2 = i - wallRadius;
			} 

			//Set Position
			let positionVec31 = new THREE.Vector3(posX1, posY, posZ1);
			let positionVec32 = new THREE.Vector3(posX2, posY, posZ2);
			dot1.setAttribute('position', positionVec31);
			dot2.setAttribute('position', positionVec32);

			//Attach to parent entity
			parentEl.appendChild(dot1);
			parentEl.appendChild(dot2);

			//Add generated dots POS to allDots array for pickup checks
			dot1xz.push(positionVec31.x);
			dot1xz.push(positionVec31.z);
			dot2xz.push(positionVec32.x);
			dot2xz.push(positionVec32.z);
			allDotsXZ.push(dot1xz);
			allDotsXZ.push(dot2xz);
			allDots.push(dot1);
			allDots.push(dot2);

		   } else if(map[i][j] === 4){
//4 - center & down - normal & +z
			//Create dot Entity
			let dot1 = document.createElement('a-entity');
			let dot2 = document.createElement('a-entity');
			//Prep 2 Dimensional Array for POS XZ
			let dot1xz = [];
			let dot2xz = [];
			//Set primitive shape
			dot1.setAttribute('geometry', dotGeometry);
			dot2.setAttribute('geometry', dotGeometry);
			//Set Material
			dot1.setAttribute('material', classicYellow);
			dot2.setAttribute('material', classicYellow);

			//Add basic dot class
			dot1.classList.add("dot");
			dot2.classList.add("dot");

			//Set position
			let posX1;
			let posY = 0;
			let posZ1;
			let posX2;
			let posZ2;

			if(quadrant === 'topLeft'){
				posX1 = j * -1;
				posZ1 = (i * -1);
				posX2 = j * -1;
				posZ2 = (i * -1) + wallRadius;
			} else if(quadrant === 'topRight'){
				posX1 = j;
				posZ1 = (i * -1);
				posX2 = j;
				posZ2 = (i * -1) + wallRadius;
			} else if(quadrant === 'bottomLeft'){
				posX1 = j * -1;
				posZ1 = i;
				posX2 = j * -1;
				posZ2 = i + wallRadius;
			} else if(quadrant === 'bottomRight'){
				posX1 = j;
				posZ1 = i;
				posX2 = j;
				posZ2 = i + wallRadius;
			} 

			//Set Position
			let positionVec31 = new THREE.Vector3(posX1, posY, posZ1);
			let positionVec32 = new THREE.Vector3(posX2, posY, posZ2);
			dot1.setAttribute('position', positionVec31);
			dot2.setAttribute('position', positionVec32);

			//Attach to parent entity
			parentEl.appendChild(dot1);
			parentEl.appendChild(dot2);

			//Add generated dots POS to allDots array for pickup checks
			dot1xz.push(positionVec31.x);
			dot1xz.push(positionVec31.z);
			dot2xz.push(positionVec32.x);
			dot2xz.push(positionVec32.z);
			allDotsXZ.push(dot1xz);
			allDotsXZ.push(dot2xz);
			allDots.push(dot1);
			allDots.push(dot2);

		   } else if(map[i][j] === 5){
//5 - center, right & down - NOT USED YET


		   } else if(map[i][j] === 6){
//6 - center, right & up - normal, +x & -z
			//Create dot Entity
			let dot1 = document.createElement('a-entity');
			let dot2 = document.createElement('a-entity');
			let dot3 = document.createElement('a-entity');
			//Prep 2 Dimensional Array for POS XZ
			let dot1xz = [];
			let dot2xz = [];
			let dot3xz = [];
			//Set primitive shape
			dot1.setAttribute('geometry', dotGeometry);
			dot2.setAttribute('geometry', dotGeometry);
			dot3.setAttribute('geometry', dotGeometry);
			//Set Material
			dot1.setAttribute('material', classicYellow);
			dot2.setAttribute('material', classicYellow);
			dot3.setAttribute('material', classicYellow);

			//Add basic dot class
			dot1.classList.add("dot");
			dot2.classList.add("dot");
			dot3.classList.add("dot");

			//Set position
			let posX1;
			let posY = 0;
			let posZ1;
			let posX2;
			let posZ2;
			let posX3;
			let posZ3;

			if(quadrant === 'topLeft'){
				posX1 = j * -1;
				posZ1 = (i * -1);
				posX2 = (j * -1) + wallRadius;
				posZ2 = (i * -1);
				posX3 = j * -1;
				posZ3 = (i * -1) - wallRadius;
			} else if(quadrant === 'topRight'){
				posX1 = j;
				posZ1 = (i * -1);
				posX2 = j + wallRadius;
				posZ2 = (i * -1);
				posX3 = j;
				posZ3 = (i * -1) - wallRadius;
			} else if(quadrant === 'bottomLeft'){
				posX1 = j * -1;
				posZ1 = i;
				posX2 = (j * -1) + wallRadius;
				posZ2 = i;
				posX3 = j * -1;
				posZ3 = i - wallRadius;
			} else if(quadrant === 'bottomRight'){
				posX1 = j;
				posZ1 = i;
				posX2 = j + wallRadius;
				posZ2 = i;
				posX3 = j;
				posZ3 = i - wallRadius;
			} 

			//Set Position
			let positionVec31 = new THREE.Vector3(posX1, posY, posZ1);
			let positionVec32 = new THREE.Vector3(posX2, posY, posZ2);
			let positionVec33 = new THREE.Vector3(posX3, posY, posZ3);
			dot1.setAttribute('position', positionVec31);
			dot2.setAttribute('position', positionVec32);
			dot3.setAttribute('position', positionVec33);

			//Attach to parent entity
			parentEl.appendChild(dot1);
			parentEl.appendChild(dot2);
			parentEl.appendChild(dot3);

			//Add generated dots POS to allDots array for pickup checks
			dot1xz.push(positionVec31.x);
			dot1xz.push(positionVec31.z);
			dot2xz.push(positionVec32.x);
			dot2xz.push(positionVec32.z);
			dot3xz.push(positionVec33.x);
			dot3xz.push(positionVec33.z);
			allDotsXZ.push(dot1xz);
			allDotsXZ.push(dot2xz);
			allDotsXZ.push(dot3xz);
			allDots.push(dot1);
			allDots.push(dot2);
			allDots.push(dot3);

		   } else if(map[i][j] === 7){
//7 - center, left & down - NOT USED YET


		   } else if(map[i][j] === 8){
//8 - center, left & up - normal, -x & -z
			//Create dot Entity
			let dot1 = document.createElement('a-entity');
			let dot2 = document.createElement('a-entity');
			let dot3 = document.createElement('a-entity');
			//Prep 2 Dimensional Array for POS XZ
			let dot1xz = [];
			let dot2xz = [];
			let dot3xz = [];
			//Set primitive shape
			dot1.setAttribute('geometry', dotGeometry);
			dot2.setAttribute('geometry', dotGeometry);
			dot3.setAttribute('geometry', dotGeometry);
			//Set Material
			dot1.setAttribute('material', classicYellow);
			dot2.setAttribute('material', classicYellow);
			dot3.setAttribute('material', classicYellow);

			//Add basic dot class
			dot1.classList.add("dot");
			dot2.classList.add("dot");
			dot3.classList.add("dot");

			//Set position
			let posX1;
			let posY = 0;
			let posZ1;
			let posX2;
			let posZ2;
			let posX3;
			let posZ3;

			if(quadrant === 'topLeft'){
				posX1 = j * -1;
				posZ1 = (i * -1);
				posX2 = (j * -1) - wallRadius;
				posZ2 = (i * -1);
				posX3 = j * -1;
				posZ3 = (i * -1) - wallRadius;
			} else if(quadrant === 'topRight'){
				posX1 = j;
				posZ1 = (i * -1);
				posX2 = j - wallRadius;
				posZ2 = (i * -1);
				posX3 = j;
				posZ3 = (i * -1) - wallRadius;
			} else if(quadrant === 'bottomLeft'){
				posX1 = j * -1;
				posZ1 = i;
				posX2 = (j * -1) - wallRadius;
				posZ2 = i;
				posX3 = j * -1;
				posZ3 = i - wallRadius;
			} else if(quadrant === 'bottomRight'){
				posX1 = j;
				posZ1 = i;
				posX2 = j - wallRadius;
				posZ2 = i;
				posX3 = j;
				posZ3 = i - wallRadius;
			} 

			//Set Position
			let positionVec31 = new THREE.Vector3(posX1, posY, posZ1);
			let positionVec32 = new THREE.Vector3(posX2, posY, posZ2);
			let positionVec33 = new THREE.Vector3(posX3, posY, posZ3);
			dot1.setAttribute('position', positionVec31);
			dot2.setAttribute('position', positionVec32);
			dot3.setAttribute('position', positionVec33);

			//Attach to parent entity
			parentEl.appendChild(dot1);
			parentEl.appendChild(dot2);
			parentEl.appendChild(dot3);

			//Add generated dots POS to allDots array for pickup checks
			dot1xz.push(positionVec31.x);
			dot1xz.push(positionVec31.z);
			dot2xz.push(positionVec32.x);
			dot2xz.push(positionVec32.z);
			dot3xz.push(positionVec33.x);
			dot3xz.push(positionVec33.z);
			allDotsXZ.push(dot1xz);
			allDotsXZ.push(dot2xz);
			allDotsXZ.push(dot3xz);
			allDots.push(dot1);
			allDots.push(dot2);
			allDots.push(dot3);

		   } else if(map[i][j] === 9){
//9 - PowerUpcenter & up - normal & -z
			//Create dot Entity
			let dot1 = document.createElement('a-entity');
			let dot2 = document.createElement('a-entity');
			//Prep 2 Dimensional Array for POS XZ
			let dot1xz = [];
			let dot2xz = [];
			//Set primitive shape
			dot1.setAttribute('geometry', powerUpGeometry);
			dot2.setAttribute('geometry', dotGeometry);
			//Set Material
			dot1.setAttribute('material', powerUpMaterial);
			dot2.setAttribute('material', classicYellow);

			//Set powerUpBlink animation to Power Up Dot
			dot1.setAttribute('animation__blink', powerUpBlink);

			//Add basic dot class
			dot1.classList.add("powerup");
			dot2.classList.add("dot");

			//Set position
			let posX1;
			let posY = 0;
			let posZ1;
			let posX2;
			let posZ2;

			if(quadrant === 'topLeft'){
				posX1 = j * -1;
				posZ1 = (i * -1);
				posX2 = j * -1;
				posZ2 = (i * -1) - wallRadius;
			} else if(quadrant === 'topRight'){
				posX1 = j;
				posZ1 = (i * -1);
				posX2 = j;
				posZ2 = (i * -1) - wallRadius;
			} else if(quadrant === 'bottomLeft'){
				posX1 = j * -1;
				posZ1 = i;
				posX2 = j * -1;
				posZ2 = i - wallRadius;
			} else if(quadrant === 'bottomRight'){
				posX1 = j;
				posZ1 = i;
				posX2 = j;
				posZ2 = i - wallRadius;
			} 

			//Set Position
			let positionVec31 = new THREE.Vector3(posX1, posY, posZ1);
			let positionVec32 = new THREE.Vector3(posX2, posY, posZ2);
			dot1.setAttribute('position', positionVec31);
			dot2.setAttribute('position', positionVec32);

			//Attach to parent entity
			parentEl.appendChild(dot1);
			parentEl.appendChild(dot2);

			//Add generated dots POS to allDots array for pickup checks
			dot1xz.push(positionVec31.x);
			dot1xz.push(positionVec31.z);
			dot2xz.push(positionVec32.x);
			dot2xz.push(positionVec32.z);
			allPowerUpsXZ.push(dot1xz);
			allDotsXZ.push(dot2xz);
			allPowerUps.push(dot1);
			allDots.push(dot2);

		   } else if(map[i][j] === 10){
//10 - center - normal
			//Create dot Entity
			let dot1 = document.createElement('a-entity');
			//Prep 2 Dimensional Array for POS XZ
			let dot1xz = [];
			//Set primitive shape
			dot1.setAttribute('geometry', dotGeometry);
			//Set Material
			dot1.setAttribute('material', classicYellow);

			//Add basic dot class
			dot1.classList.add("dot");

			//Set position
			let posX1;
			let posY = 0;
			let posZ1;

			if(quadrant === 'topLeft'){
				posX1 = j * -1;
				posZ1 = (i * -1);
			} else if(quadrant === 'topRight'){
				posX1 = j;
				posZ1 = (i * -1);
			} else if(quadrant === 'bottomLeft'){
				posX1 = j * -1;
				posZ1 = i;
			} else if(quadrant === 'bottomRight'){
				posX1 = j;
				posZ1 = i;
			} 

			//Set Position
			let positionVec31 = new THREE.Vector3(posX1, posY, posZ1);
			dot1.setAttribute('position', positionVec31);

			//Attach to parent entity
			parentEl.appendChild(dot1);

			//Add generated dots POS to allDots array for pickup checks
			dot1xz.push(positionVec31.x);
			dot1xz.push(positionVec31.z);
			allDotsXZ.push(dot1xz);
			allDots.push(dot1);

		   } else if(map[i][j] === 11){
//11 - overlap | ignore
		   }



	}//End X array Loop
}//End Z array Loop

}//End Basic Block Spawner

//Dot Spawner
function dotSpawner(map) {
//Builds from 0,0 XZ
//Builds in order of topLeft, topRight, bottomLeft, bottomRight

//Top Left
//Loop 1 : -Z
//Loop 2 : -X
//Top Right
//Loop 1 : -Z
//Loop 2 : +X
//Bottom Left
//Loop 1 : +Z
//Loop 2 : -X
//Bottom Right
//Loop 1 : +Z
//Loop 2 : +X

//Create parent identity w/ id
let dotParent = document.createElement('a-entity');
dotParent.setAttribute('id','dotParent');
//Append parent entity to scene
sceneEl.appendChild(dotParent);

//Loop through mega array set
for (let h = 0; h < map.length; h++) {

	if (h === 0){
		//Spawn Basic Blocks
		quadrantDotSpawn(map[h],dotParent,'topLeft');

	} else if (h === 1){
		//Spawn Basic Blocks
		quadrantDotSpawn(map[h],dotParent,'topRight');

	} else if (h === 2){
		//Spawn Basic Blocks
		quadrantDotSpawn(map[h],dotParent,'bottomLeft');

	} else if (h === 3){
		//Spawn Basic Blocks
		quadrantDotSpawn(map[h],dotParent,'bottomRight');

	}//End if Checks

}//End Multi-Map array Loop

//
//Change the quadrant spawn code to use the loaded versions and remove this
//Update Dot Reloaders
allDotsXZLoaded = allDotsXZ.slice(0);
allDotsLoaded = allDots.slice(0);
allPowerUpsXZLoaded = allPowerUpsXZ.slice(0);
allPowerUpsLoaded = allPowerUps.slice(0);

}//End Wall Spawner Function

//Show all loaded Dots
function showDots(){

//Set checked array with pre-built saves
allDotsXZ = [];
allDots = [];
allPowerUpsXZ = [];
allPowerUps = [];
allDotsXZ = allDotsXZLoaded.slice(0);
allDots = allDotsLoaded.slice(0);
allPowerUpsXZ = allPowerUpsXZLoaded.slice(0);
allPowerUps = allPowerUpsLoaded.slice(0);

//loop through entities and make sure they are all visible
for(let i=0; i < allDots.length; i++ ){
	allDots[i].setAttribute('visible', true);
}
for(i=0; i < allPowerUps.length; i++ ){
	allPowerUps[i].setAttribute('visible', true);
}

}//End showDots

//Show bonus fruit
function showLevelIcon(){


//Loop through all level items and hide them before showing the current
for(let i = 0; i < allLevelIcons.length; i++){
	allLevelIcons[i].setAttribute('visible', false);
}

if(currentLevel === 1){
	//Cherry (1)
	cherry1Level.setAttribute('visible',true);	cherry2Level.setAttribute('visible',true);
} else if(currentLevel === 2){
	//Strawberry (2)
	strawberryLevel.setAttribute('visible',true);
} else if(currentLevel === 3 || currentLevel === 4){
	//Orange (3,4)
	orangeLevel.setAttribute('visible',true);
} else if(currentLevel === 5 || currentLevel === 6){
	//Apple (5,6)
	appleLevel.setAttribute('visible',true);
} else if(currentLevel === 7 || currentLevel === 8){
	//Melon/Pear (7,8)
	melonLevel.setAttribute('visible',true);
} else if(currentLevel === 9 || currentLevel === 10){
	//Galaxian/Heart (9,10)
	diamondLevel.setAttribute('visible',true);
} else if(currentLevel === 11 || currentLevel === 12){
	//Bell/Present (11,12)
	bellLevel.setAttribute('visible',true);
} else {
	//Key (13+)
	keyLevel.setAttribute('visible',true);
} 

}//End showLevelIcon

//Show bonus fruit
function showBonus(){

bonusOn = true;

if(currentLevel === 1){
	//Cherry (1) - 100
	//Update current bonus amount
	bonusAmount = bonus1;
	cherry1Bonus.setAttribute('visible', true);
	cherry2Bonus.setAttribute('visible', true);
} else if(currentLevel === 2){
	//Strawberry (2) - 300
	//Update current bonus amount
	bonusAmount = bonus2;
	strawberryBonus.setAttribute('visible', true);
} else if(currentLevel === 3 || currentLevel === 4){
	//Orange (3,4) - 500
	//Update current bonus amount
	bonusAmount = bonus3;
	orangeBonus.setAttribute('visible', true);
} else if(currentLevel === 5 || currentLevel === 6){
	//Apple (5,6)- 700
	//Update current bonus amount
	bonusAmount = bonus4;
	appleBonus.setAttribute('visible', true);
} else if(currentLevel === 7 || currentLevel === 8){
	//Melon/Pear (7,8)- 1000
	//Update current bonus amount
	bonusAmount = bonus5;
	melonBonus.setAttribute('visible', true);
} else if(currentLevel === 9 || currentLevel === 10){
	//Galaxian/Heart (9,10) - 2000
	//Update current bonus amount
	bonusAmount = bonus6;
	diamondBonus.setAttribute('visible', true);
} else if(currentLevel === 11 || currentLevel === 12){
	//Bell/Present (11,12)- 3000
	//Update current bonus amount
	bonusAmount = bonus7;
	bellBonus.setAttribute('visible', true);
} else {
	//Key (13+) - 5000
	//Update current bonus amount
	bonusAmount = bonus8;
	keyBonus.setAttribute('visible', true);
} 

}//End showBonus

//Hide bonus fruit
function hideBonus(){
	bonusOn = false;

	//Loop through all bonus items and hide them
	for(let i = 0; i < allBonusIcons.length; i++){
		allBonusIcons[i].setAttribute('visible', false);
	}

}

//When the player kills a ghost or collects an item, display text in the pos of the amount
function bonusPointsDisplay(amount,pos){

//Text is displayed above player & ghosts
pos.y = 1;

//Use bonusPoints1 to display
bonusTextMaterial = {value:amount, width: 10, color: "#FFFFFF", align: "center", font: "exo2bold"};

//If bonusPoints1 entity is already in use, check another
if(usedBonusText.includes(bonusPoints1)){

	//If bonusPoints2 entity is already in use, check another
	if(usedBonusText.includes(bonusPoints2)){

		//If bonusPoints3 entity is already in use, check another
		if(usedBonusText.includes(bonusPoints3)){

			//If bonusPoints4 entity is already in use, check another
			if(usedBonusText.includes(bonusPoints4)){

				//bonusPoints5 entity in use
				usedBonusText.push(bonusPoints5);
				//Update text to new position
				bonusPoints5.object3D.position.copy(pos);
				//Update text attribute
				bonusPoints5.setAttribute('text',bonusTextMaterial);
				//Emit hit event to flash and fade
				bonusPoints5.emit('bonusHit',{});
				//add a timeout to remove from array after anim is finished
				//Timeout
				bonusFlashTimeout5 = setTimeout(function () {
					//Remove from Array
					usedBonusText.splice(usedBonusText.indexOf(bonusPoints5), 1);
				}, bonusFlashTime); //Delay

			} else {
				//bonusPoints4 entity in use
				usedBonusText.push(bonusPoints4);
				//Update text to new position
				bonusPoints4.object3D.position.copy(pos);
				//Update text attribute
				bonusPoints4.setAttribute('text',bonusTextMaterial);
				//Emit hit event to flash and fade
				bonusPoints4.emit('bonusHit',{});
				//add a timeout to remove from array after anim is finished
				//Timeout
				bonusFlashTimeout4 = setTimeout(function () {
					//Remove from Array
					usedBonusText.splice(usedBonusText.indexOf(bonusPoints4), 1);
				}, bonusFlashTime); //Delay
			}

		} else {
			//bonusPoints3 entity in use
			usedBonusText.push(bonusPoints3);
			//Update text to new position
			bonusPoints3.object3D.position.copy(pos);
			//Update text attribute
			bonusPoints3.setAttribute('text',bonusTextMaterial);
			//Emit hit event to flash and fade
			bonusPoints3.emit('bonusHit',{});
			//add a timeout to remove from array after anim is finished
			//Timeout
			bonusFlashTimeout3 = setTimeout(function () {
				//Remove from Array
				usedBonusText.splice(usedBonusText.indexOf(bonusPoints3), 1);
			}, bonusFlashTime); //Delay
		}

	} else {
		//bonusPoints2 entity in use
		usedBonusText.push(bonusPoints2);
		//Update text to new position
		bonusPoints2.object3D.position.copy(pos);
		//Update text attribute
		bonusPoints2.setAttribute('text',bonusTextMaterial);
		//Emit hit event to flash and fade
		bonusPoints2.emit('bonusHit',{});
		//add a timeout to remove from array after anim is finished
		//Timeout
		bonusFlashTimeout2 = setTimeout(function () {
			//Remove from Array
			usedBonusText.splice(usedBonusText.indexOf(bonusPoints2), 1);
		}, bonusFlashTime); //Delay
	}

} else {
	//bonusPoints1 entity in use
	usedBonusText.push(bonusPoints1);
	//Update text to new position
	bonusPoints1.object3D.position.copy(pos);
	//Update text attribute
	bonusPoints1.setAttribute('text',bonusTextMaterial);
	//Emit hit event to flash and fade
	bonusPoints1.emit('bonusHit',{});
	//add a timeout to remove from array after anim is finished
	//Timeout
	bonusFlashTimeout1 = setTimeout(function () {
		//Remove from Array
		usedBonusText.splice(usedBonusText.indexOf(bonusPoints1), 1);
	}, bonusFlashTime); //Delay
}

}//end bonusPointsDisplay

//
//System Functions
//

//Clear all Movement Intervals and Timeouts aka Pause
function clearMovements(){
	clearInterval(buttonHoldInterval);
	clearInterval(playerInterval);
	inputDirection === 'none';
	clearInterval(ghost1MoveSetPosTimeout);
	clearInterval(ghost1Interval);
	clearTimeout(ghost1ReturnTimeout2);
	clearTimeout(ghost1Move2Timeout);
	clearInterval(ghost2MoveSetPosTimeout);
	clearInterval(ghost2Interval);
	clearTimeout(ghost2ReturnTimeout2);
	clearTimeout(ghost2Move2Timeout);
	clearInterval(ghost3MoveSetPosTimeout);
	clearInterval(ghost3Interval);
	clearTimeout(ghost3ReturnTimeout2);
	clearTimeout(ghost3Move2Timeout);
	clearInterval(ghost4MoveSetPosTimeout);
	clearInterval(ghost4Interval);
	clearTimeout(ghost4ReturnTimeout2);
	clearTimeout(ghost4Move2Timeout);
	clearInterval(killInterval);
	clearTimeout(ghost1StartTimeout0);
	clearTimeout(ghost1StartTimeout);
	clearTimeout(ghost2StartTimeout0);
	clearTimeout(ghost2StartTimeout);
	clearTimeout(ghost3StartTimeout0);
	clearTimeout(ghost3StartTimeout);
	clearTimeout(ghost4StartTimeout0);
	clearTimeout(ghost4StartTimeout);
	clearTimeout(moveGhostStartTimeout1);
	clearTimeout(moveGhostStartTimeout2);
	clearTimeout(moveGhostStartTimeout3);

}

//Reset Player and All Ghosts
function resetAvatars(){
	//Pause All Movements and Collision
	clearMovements();
//Need to only revert ghost speed if they have not died recently
	if(poweredUp){
		//Reset PowerUps
		clearTimeout(poweredUpWarningTimeout);
		clearTimeout(poweredUpTimeout);
		//After delay, reset poweredUp bool
		poweredUp = false;
		poweredUpKills = 0;
		//Reset speed
		stepIntervalPlayer = playerStartSpeed;//ms

		//Rest Ghost Materials via poweredDown event
		if(ghost1PoweredUp){
			ghost1PoweredUp = false;
			stepIntervalGhost1 += ghostPoweredUpSpeedChange;//the interval used
			powerDownGhost1();
		}
		if(ghost2PoweredUp){
			ghost2PoweredUp = false;
			stepIntervalGhost2 += ghostPoweredUpSpeedChange;//the interval used
			powerDownGhost2();
		}
		if(ghost3PoweredUp){
			ghost3PoweredUp = false;
			stepIntervalGhost3 += ghostPoweredUpSpeedChange;//the interval used
			powerDownGhost3();
		}
		if(ghost4PoweredUp){
			ghost4PoweredUp = false;
			stepIntervalGhost4 += ghostPoweredUpSpeedChange;//the interval used
			powerDownGhost4();
		}
	}
	//If they die while a bonus is being shown, remove it on level restart
	if(bonusOn){
		hideBonus();
		clearTimeout(showBonusTimeout);
	}
	//Player
	playerHit = false;
	//Spawn at 0.5 0 3 and Facing left
	playerPos.copy(playerSpawn);
	player.object3D.position.copy(playerPos);
	//Current Input Direction
	inputDirection = 'none';
	playerNewRotation.y = 90;
	playerCurrentDirection = 'left';
	playerAvatar.setAttribute('rotation', playerNewRotation);
	//Tunnel teleporting and input blocking delays
	playerTunnelTeleport = false;
	playerInTunnel = false;
	//Reset Movment Anim
	moveAnimation = {};
	player.setAttribute('animation__moveAnimation', moveAnimation);

	//Reset Death Animation Changes
	playerAvatar.setAttribute('theta-start','225');
	playerAvatar.setAttribute('theta-length','270');
	//Clear Death Timeouts
	clearTimeout(deathAnimTimeout1);
	clearTimeout(deathAnimTimeout2);

	//Ghost1
	resetGhost1();
	//Ghost2
	resetGhost2();
	//Ghost3
	resetGhost3();
	//Ghost4
	resetGhost4();
}

//Game Start Countdown and Movement Start
function gameStartTimer(time){
//Clear any previous countdowns
clearInterval(countdownStartInterval);
//Update current Level Icon
showLevelIcon();
//Ensure the entity is ready
countdownText.value = time;
gameStartCountdown.setAttribute('text',countdownText);
gameStartCountdown.setAttribute('visible',true);
playerText.setAttribute('visible',true);
readyText.setAttribute('visible',true);

//Let all functions finish out before resetting
resetAvatarTimeout = setTimeout(function () {
	resetAvatars();

}, 750); //Delay

countdownStartInterval = setInterval(function() {
	//Update countdown time on screen
	time--;
	countdownText.value = time;
	gameStartCountdown.setAttribute('text',countdownText);
	if(time === 3){
		playerText.setAttribute('visible',false);
	} else if(time === 0){
		gameStartCountdown.setAttribute('visible',false);
		readyText.setAttribute('visible',false);
		levelStart = true;
		clearInterval(countdownStartInterval);
		//Interval function init
		startPlayerInterval(stepIntervalPlayer);
		//Emit moving event to resume eating animation before turning
		playerAvatar.emit('moving',{});
		//Init Collision Detection
		checkKillInterval(checkKillMS);



		//Release Ghost 1 Right Away
		//Start exit movement
		ghostRelease(ghost1OnBoard,ghost1CurrentDirection,ghost1Pos);
		//Timeout
		ghost1StartTimeout = setTimeout(function () {
			//On exit move being done, start ghostInterval after ghostStartSpeed*3
			startGhost1Interval(stepIntervalGhost1);
		//clearTimeout(ghost1StartTimeout);
		}, ghostStartSpeed); //Delay

		//Timeout
		ghost2StartTimeout0 = setTimeout(function () {
			//Start exit movement
			ghostRelease(ghost2OnBoard,ghost2CurrentDirection,ghost2Pos);
			//Timeout
			ghost2StartTimeout = setTimeout(function () {
				//On exit move being done, start ghostInterval after ghostStartSpeed*2
				startGhost2Interval(stepIntervalGhost2);
			//clearTimeout(ghost2StartTimeout);
			}, ghostStartSpeed); //Delay

		//clearTimeout(ghost2StartTimeout0);
		}, 3000); //Delay

		//Timeout
		ghost3StartTimeout0 = setTimeout(function () {
			//Start exit movement
			ghostRelease(ghost3OnBoard,ghost3CurrentDirection,ghost3Pos);
			//Timeout
			ghost3StartTimeout = setTimeout(function () {
				//On exit move being done, start ghostInterval after ghostStartSpeed*2
				startGhost3Interval(stepIntervalGhost3);
			//clearTimeout(ghost3StartTimeout);
			}, ghostStartSpeed); //Delay

		//clearTimeout(ghost3StartTimeout0);
		}, 6000); //Delay


		//Timeout
		ghost4StartTimeout0 = setTimeout(function () {
			//Start exit movement
			ghostRelease(ghost4OnBoard,ghost4CurrentDirection,ghost4Pos);
			//Timeout
			ghost4StartTimeout = setTimeout(function () {
				//On exit move being done, start ghostInterval after ghostStartSpeed*2
				startGhost4Interval(stepIntervalGhost4);
			//clearTimeout(ghost4StartTimeout);
			}, ghostStartSpeed); //Delay

		//clearTimeout(ghost4StartTimeout0);
		}, 9000); //Delay





	}
}, 1000); //Interval

}//End gameStartTimer

//Game Over
function gameIsOver(){

	//Pause all movements and Collision
	clearMovements();

	//Make sure Game Over is turned off
	playerText.setAttribute('visible',true);
	gameOverText.setAttribute('visible',true);

	//Timeout
	restartGameTimeout = setTimeout(function () {
		//Allow click to restart after a few seconds
		gameOver = true;

		if(useVRRestartPrompt){
			vrRestartGamePrompt.setAttribute('visible',true);
		}
	}, 1500); //Delay

	//allow click screen to restart game (or can use the menu)


}

//Set up a New Game
function newGameStart(){
	//Ensure no Intervals are running
	clearMovements();
	newGame = false;
	levelStart = false;
	levelRestart = false;
	gameStart = false;
	gameOver = false;

	//Game Start Sound
	gameStartSoundTimeout = setTimeout(function () {
		//Play Sound
		introSound.emit('gameStartEvent',{});
	}, 1000); //Delay

	if(useVRRestartPrompt){
		vrRestartGamePrompt.setAttribute('visible',false);
	}

	//Make sure Game Over is turned off
	gameOverText.setAttribute('visible',false);

	countdownText = {value:5, width: 20, color: "#FFFFFF", align: "center", font: "exo2bold"};
	//Reset Points
	playerScore = 0;
	//Reset earned 1up
	playerEarned1up = false;
	//Reset level eaten dots
	eatenDots = 0;
	//Reset Bonus
	bonusOn = false;
	//Set playerKills
	poweredUpKills = 0;
	//Reset the player hitting high score
	playerHitHiScore = false;
	scoreText.setAttribute('text',{value: playerScorePreText + playerScore});
	//Starting Level
	currentLevel = 1;
	//Starting Lives
	currentLives = 3;
	//Make sure all 3 are visible
	playerLife1.setAttribute('visible', true);
	playerLife2.setAttribute('visible', true);
	playerLife3.setAttribute('visible', false);//bonus life
	//Player Walk Speed
	stepIntervalPlayer = playerStartSpeed;//ms
	//Ghost1 Walk Speed
	stepIntervalGhost1 = ghostStartSpeed;//ms
	ghost1Pathfind = false;
	ghost1ContinuePathfind = false;
	ghost1CheckMainDirection = true;
	ghost1ChaseCheckIteration = 0;
	ghost1SwitchChaseChance = 40;
	ghost1StartChaseTo = .2;
	ghost1CheckForPathSwitch = true;
	//Ghost2 Walk Speed
	stepIntervalGhost2 = ghostStartSpeed;//ms
	ghost2Pathfind = false;
	ghost2ContinuePathfind = false;
	ghost2CheckMainDirection = true;
	ghost2ChaseCheckIteration = 0;
	ghost2SwitchChaseChance = 50;
	ghost2StartChaseTo = .4;
	ghost2CheckForPathSwitch = true;
	//Ghost3 Walk Speed
	stepIntervalGhost3 = ghostStartSpeed;//ms
	ghost3Pathfind = false;
	ghost3ContinuePathfind = false;
	ghost3CheckMainDirection = true;
	ghost3ChaseCheckIteration = 0;
	ghost3SwitchChaseChance = 50;
	ghost3StartChaseTo = .6;
	ghost3CheckForPathSwitch = true;
	//Ghost4 Walk Speed
	stepIntervalGhost4 = ghostStartSpeed;//ms
	ghost4Pathfind = false;
	ghost4ContinuePathfind = false;
	ghost4CheckMainDirection = true;
	ghost4ChaseCheckIteration = 0;
	ghost4SwitchChaseChance = 50;
	ghost4StartChaseTo = .8;
	ghost4CheckForPathSwitch = true;
	//Power Up Resets
	poweredUpTimer = 13000;//start at 13secs
	poweredUpWarningTimer = (poweredUpTimer/4) * 3;//start at 3/4 of timer

	//Reset all map dots
	showDots();
	//Start Countdown Sequence
	gameStartTimer(5);
	
}

//Restart current Level
function levelRestarter(){
	//Player Walk Speed
	stepIntervalPlayer = playerStartSpeed;//ms
	//Ghost1 Walk Speed
	stepIntervalGhost1 = ghostLevelSpeed;//ms
	//Ghost2 Walk Speed
	stepIntervalGhost2 = ghostLevelSpeed;//ms
	//Ghost3 Walk Speed
	stepIntervalGhost3 = ghostLevelSpeed;//ms
	//Ghost4 Walk Speed
	stepIntervalGhost4 = ghostLevelSpeed;//ms

	gameStart = false;
	levelRestart = false;
	countdownText = {value:5, width: 20, color: "#FFFFFF", align: "center", font: "exo2bold"};

	//Start Countdown Sequence
	gameStartTimer(5);



}

//Completed current Level and load up next
function nextLevelStart(){
	clearMovements();
	newGame = false;
	levelStart = false;
	levelRestart = false;
	gameStart = false;

	countdownText = {value:5, width: 20, color: "#FFFFFF", align: "center", font: "exo2bold"};
	//Update Level
	currentLevel++;
	//Reset level eaten dots
	eatenDots = 0;
	//Reset Bonus
	bonusOn = false;
	//Reset Walk Speed
	stepIntervalPlayer = playerStartSpeed;//ms
	//Update Ghosts Speed
	//Ghost1 Walk Speed
	stepIntervalGhost1 = ghostStartSpeed - (currentLevel*20);//ms
	ghost1Pathfind = false;
	ghost1ContinuePathfind = false;
	ghost1CheckMainDirection = true;
	ghost1ChaseCheckIteration = 0;
	ghost1SwitchChaseChance = 40;
	ghost1StartChaseTo -= 0.05;
	ghost1CheckForPathSwitch = true;
	//Ghost2 Walk Speed
	stepIntervalGhost2 = ghostStartSpeed - (currentLevel*20);//ms
	ghost2Pathfind = false;
	ghost2ContinuePathfind = false;
	ghost2CheckMainDirection = true;
	ghost2ChaseCheckIteration = 0;
	ghost2SwitchChaseChance = 50;
	ghost2StartChaseTo -= 0.05;
	ghost2CheckForPathSwitch = true;
	//Ghost3 Walk Speed
	stepIntervalGhost3 = ghostStartSpeed - (currentLevel*20);//ms
	ghost3Pathfind = false;
	ghost3ContinuePathfind = false;
	ghost3CheckMainDirection = true;
	ghost3ChaseCheckIteration = 0;
	ghost3SwitchChaseChance = 50;
	ghost3StartChaseTo -= 0.05;
	ghost3CheckForPathSwitch = true;
	//Ghost4 Walk Speed
	stepIntervalGhost4 = ghostStartSpeed - (currentLevel*20);//ms
	ghost4Pathfind = false;
	ghost4ContinuePathfind = false;
	ghost4CheckMainDirection = true;
	ghost4ChaseCheckIteration = 0;
	ghost4SwitchChaseChance = 50;
	ghost4StartChaseTo -= 0.05;
	ghost4CheckForPathSwitch = true;
	//Power Up Adjustments
	if(poweredUpTimer >= 4000){
		//Power up always works with a minimum of 4 seconds phase
		poweredUpTimer -= 500;//Reduce power up phase by half a second every level
		poweredUpWarningTimer = (poweredUpTimer/4) * 3;//start at 3/4 of timer
	}

	//Timeout
	wallsAnimTimeout = setTimeout(function () {
		//Anim walls
		wallsAnim();
	}, 2000); //Delay

	//Timeout
	wallsAnimTimeout2 = setTimeout(function () {
		//Reset Map Dots
		showDots();
		//Start Countdown Sequence
		gameStartTimer(5);
	}, 4000); //Delay
	
}

//Check for Map Obstacles at current POS, Direction depending on Avatar
//Returns true or false depending on the direction that is being checked
function checkMapObstacles(nextPos,direction,avatar){
//
//topLeft - no shift
//topRight - +x shift right by 1 
//bottomLeft - +z shift down by 1
//bottomRight - +z shift down by 1 & +x shift right by 1 
//
//Block movement in direction
//0 - empty
//1 - bottom
//2 - left
//3 - top
//4 - right
//5 - left & bottom
//6 - right & bottom
//7 - right & top
//8 - left & top
//9 - top & bottom
//10 - left & right
//11 - overlap / ignore

//Check which Quadrant player is in
if (nextPos.x <= 0 && nextPos.z <= 0){
	//Top Left - 0
	//Loop 1 : -Z
	//Loop 2 : -X
	//topLeft - no shift
	if (currentMapWalls[0][nextPos.z * -1][nextPos.x * -1] === 0){
		//0 - empty
		//Speed up ghost when exiting base of tunnel
		if(avatar === 'ghost1'){
			if(ghost1TunnelHit){
				ghost1TunnelHit = false;
				//Reset ghost speed when out of tunnel
				stepIntervalGhost1 -= ghostPoweredUpSpeedChange;
				//Ghost 1
				clearInterval(ghost1Interval);//clear current speed
				clearTimeout(ghost1Move2Timeout);
				startGhost1Interval(stepIntervalGhost1);//set new speed
			}
		} else if(avatar === 'ghost2'){
			if(ghost2TunnelHit){
				ghost2TunnelHit = false;
				//Reset ghost speed when out of tunnel
				stepIntervalGhost2 -= ghostPoweredUpSpeedChange;
				//Ghost 1
				clearInterval(ghost2Interval);//clear current speed
				clearTimeout(ghost2Move2Timeout);
				startGhost2Interval(stepIntervalGhost2);//set new speed
			}
		} else if(avatar === 'ghost3'){
			if(ghost3TunnelHit){
				ghost3TunnelHit = false;
				//Reset ghost speed when out of tunnel
				stepIntervalGhost3 -= ghostPoweredUpSpeedChange;
				//Ghost 1
				clearInterval(ghost3Interval);//clear current speed
				clearTimeout(ghost3Move2Timeout);
				startGhost3Interval(stepIntervalGhost3);//set new speed
			}
		} else if(avatar === 'ghost4'){
			if(ghost4TunnelHit){
				ghost4TunnelHit = false;
				//Reset ghost speed when out of tunnel
				stepIntervalGhost4 -= ghostPoweredUpSpeedChange;
				//Ghost 1
				clearInterval(ghost4Interval);//clear current speed
				clearTimeout(ghost4Move2Timeout);
				startGhost4Interval(stepIntervalGhost4);//set new speed
			}
		}
		//Update currentBlock player is at
		//currentBlockType = 0;
		return true;
	} else if (currentMapWalls[0][nextPos.z * -1][nextPos.x * -1] === 1){
		//1 - bottom
		//for ghosts block the up direction if the 1 block is at
		//0x -2z
		//1x -2z
		//0x 3z
		//1x 3z
		if(avatar === 'ghost1' || avatar === 'ghost2' || avatar === 'ghost3' || avatar === 'ghost4'){
			if(nextPos.x === 0 && nextPos.z === -2 || nextPos.x === 1 && nextPos.z === -2 || nextPos.x === 0 && nextPos.z === 3 || nextPos.x === 1 && nextPos.z === 3){
				//Block Up and Down
				if(direction === 'down' || direction === 'up'){
				return false;
				} else {
				return true;
				}
			} else {
				//Block Down
				if(direction === 'down'){
				return false;
				} else {
				return true;
				}
			}
		} else if(avatar === 'player'){
			//Update currentBlock player is at
			//currentBlockType = 1;
			if(direction === 'down'){
			return false;
			} else {
			return true;
			}
		}
	} else if (currentMapWalls[0][nextPos.z * -1][nextPos.x * -1] === 2){
		//2 - left
		//Update currentBlock player is at
		//currentBlockType = 2;
		if(direction === 'left'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[0][nextPos.z * -1][nextPos.x * -1] === 3){
		//3 - top
		//Update currentBlock player is at
		//currentBlockType = 3;
		if(direction === 'up'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[0][nextPos.z * -1][nextPos.x * -1] === 4){
		//4 - right
		//Update currentBlock player is at
		//currentBlockType = 4;
		if(direction === 'right'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[0][nextPos.z * -1][nextPos.x * -1] === 5){
		//5 - left & bottom
		//Update currentBlock player is at
		//currentBlockType = 5;
		if(direction === 'left' || direction === 'down'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[0][nextPos.z * -1][nextPos.x * -1] === 6){
		//6 - right & bottom
		//Update currentBlock player is at
		//currentBlockType = 6;
		if(direction === 'right' || direction === 'down'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[0][nextPos.z * -1][nextPos.x * -1] === 7){
		//7 - right & top
		//Update currentBlock player is at
		//currentBlockType = 7;
		if(direction === 'right' || direction === 'up'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[0][nextPos.z * -1][nextPos.x * -1] === 8){
		//8 - left & top
		//Update currentBlock player is at
		//currentBlockType = 8;
		if(direction === 'left' || direction === 'up'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[0][nextPos.z * -1][nextPos.x * -1] === 9){
		//9 - top & bottom
		//Update currentBlock player is at
		//currentBlockType = 9;
		if(direction === 'up' || direction === 'down'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[0][nextPos.z * -1][nextPos.x * -1] === 10){
		//10 - left & right
		//Update currentBlock player is at
		//currentBlockType = 10;
		if(direction === 'left' || direction === 'right'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[0][nextPos.z * -1][nextPos.x * -1] === 11){
		//11 is ignored and shouldn't be checked
	} else if (currentMapWalls[0][nextPos.z * -1][nextPos.x * -1] === 12){
		//12 - tunnel - top & bottom
		//Update currentBlock player is at
		//currentBlockType = 12;
		if(direction === 'up' || direction === 'down'){
		return false;
		} else {

		//Slow down ghost when entering base of tunnel
		if(avatar === 'ghost1'){
			if(ghost1TunnelHit){} else {
				ghost1TunnelHit = true;
				//Set ghost new slower speed while in tunnel
				stepIntervalGhost1 += ghostPoweredUpSpeedChange;
				//Ghost 1
				clearInterval(ghost1Interval);//clear current speed
				clearTimeout(ghost1Move2Timeout);
				startGhost1Interval(stepIntervalGhost1);//set new speed
			}
		} else if(avatar === 'ghost2'){
			if(ghost2TunnelHit){} else {
				ghost2TunnelHit = true;
				//Set ghost new slower speed while in tunnel
				stepIntervalGhost2 += ghostPoweredUpSpeedChange;
				//Ghost 1
				clearInterval(ghost2Interval);//clear current speed
				clearTimeout(ghost2Move2Timeout);
				startGhost2Interval(stepIntervalGhost2);//set new speed
			}
		} else if(avatar === 'ghost3'){
			if(ghost3TunnelHit){} else {
				ghost3TunnelHit = true;
				//Set ghost new slower speed while in tunnel
				stepIntervalGhost3 += ghostPoweredUpSpeedChange;
				//Ghost 1
				clearInterval(ghost3Interval);//clear current speed
				clearTimeout(ghost3Move2Timeout);
				startGhost3Interval(stepIntervalGhost3);//set new speed
			}

		} else if(avatar === 'ghost4'){
			if(ghost4TunnelHit){} else {
				ghost4TunnelHit = true;
				//Set ghost new slower speed while in tunnel
				stepIntervalGhost4 += ghostPoweredUpSpeedChange;
				//Ghost 1
				clearInterval(ghost4Interval);//clear current speed
				clearTimeout(ghost4Move2Timeout);
				startGhost4Interval(stepIntervalGhost4);//set new speed
			}
		}

		//Obstacles clear
		return true;
		}
	} else if (currentMapWalls[0][nextPos.z * -1][nextPos.x * -1] === 13){
		//13 - tunnel - top & bottom
		//Update currentBlock player is at
		//currentBlockType = 13;

		//If user moves up or down, deny
		//If user moves left off of map through tunnel, enable tunnelHit and allow move
		//Otherwise, move
		if(direction === 'up' || direction === 'down'){
		return false;
		} else if(direction === 'left'){
		//Tunnel Suppot
		if(avatar === 'player'){
			playerTunnelTeleport = true;
		} else if(avatar === 'ghost1'){
			ghost1TunnelTeleport = true;
		} else if(avatar === 'ghost2'){
			ghost2TunnelTeleport = true;
		} else if(avatar === 'ghost3'){
			ghost3TunnelTeleport = true;
		} else if(avatar === 'ghost4'){
			ghost4TunnelTeleport = true;
		}
		return true;
		} else {
		return true;
		}
	} else {
		//Obstacle Error
		console.log('Obstacle Error - topLeft');
		console.log(currentMapWalls[0][nextPos.z * -1][nextPos.x * -1]);
	}
} else if (nextPos.x > 0 && nextPos.z <= 0){
	//Top Right - 1
	//Loop 1 : -Z
	//Loop 2 : +X
	//topRight - +x shift right by 1 
	if (currentMapWalls[1][nextPos.z * -1][nextPos.x] === 0){
		//0 - empty

		//Speed up ghost when exiting base of tunnel
		if(avatar === 'ghost1'){
			if(ghost1TunnelHit){
				ghost1TunnelHit = false;
				//Reset ghost speed when out of tunnel
				stepIntervalGhost1 -= ghostPoweredUpSpeedChange;
				//Ghost 1
				clearInterval(ghost1Interval);//clear current speed
				clearTimeout(ghost1Move2Timeout);
				startGhost1Interval(stepIntervalGhost1);//set new speed
			}
		} else if(avatar === 'ghost2'){
			if(ghost2TunnelHit){
				ghost2TunnelHit = false;
				//Reset ghost speed when out of tunnel
				stepIntervalGhost2 -= ghostPoweredUpSpeedChange;
				//Ghost 1
				clearInterval(ghost2Interval);//clear current speed
				clearTimeout(ghost2Move2Timeout);
				startGhost2Interval(stepIntervalGhost2);//set new speed
			}
		} else if(avatar === 'ghost3'){
			if(ghost3TunnelHit){
				ghost3TunnelHit = false;
				//Reset ghost speed when out of tunnel
				stepIntervalGhost3 -= ghostPoweredUpSpeedChange;
				//Ghost 1
				clearInterval(ghost3Interval);//clear current speed
				clearTimeout(ghost3Move2Timeout);
				startGhost3Interval(stepIntervalGhost3);//set new speed
			}
		} else if(avatar === 'ghost4'){
			if(ghost4TunnelHit){
				ghost4TunnelHit = false;
				//Reset ghost speed when out of tunnel
				stepIntervalGhost4 -= ghostPoweredUpSpeedChange;
				//Ghost 1
				clearInterval(ghost4Interval);//clear current speed
				clearTimeout(ghost4Move2Timeout);
				startGhost4Interval(stepIntervalGhost4);//set new speed
			}
		}

		//Update currentBlock player is at
		//currentBlockType = 0;
		return true;
	} else if (currentMapWalls[1][nextPos.z * -1][nextPos.x] === 1){
		//1 - bottom
		//for ghosts block the up direction if the 1 block is at
		//0x -2z
		//1x -2z
		//0x 3z
		//1x 3z
		if(avatar === 'ghost1' || avatar === 'ghost2' || avatar === 'ghost3' || avatar === 'ghost4'){
			if(nextPos.x === 0 && nextPos.z === -2 || nextPos.x === 1 && nextPos.z === -2 || nextPos.x === 0 && nextPos.z === 3 || nextPos.x === 1 && nextPos.z === 3){
				//Block Up and Down
				if(direction === 'down' || direction === 'up'){
				return false;
				} else {
				return true;
				}
			} else {
				//Block Down
				if(direction === 'down'){
				return false;
				} else {
				return true;
				}
			}
		} else if(avatar === 'player'){
			//Update currentBlock player is at
			//currentBlockType = 1;
			if(direction === 'down'){
			return false;
			} else {
			return true;
			}
		}
	} else if (currentMapWalls[1][nextPos.z * -1][nextPos.x] === 2){
		//2 - left
		//Update currentBlock player is at
		//currentBlockType = 2;
		if(direction === 'left'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[1][nextPos.z * -1][nextPos.x] === 3){
		//3 - top
		//Update currentBlock player is at
		//currentBlockType = 3;
		if(direction === 'up'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[1][nextPos.z * -1][nextPos.x] === 4){
		//4 - right
		//Update currentBlock player is at
		//currentBlockType = 4;
		if(direction === 'right'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[1][nextPos.z * -1][nextPos.x] === 5){
		//5 - left & bottom
		//Update currentBlock player is at
		//currentBlockType = 5;
		if(direction === 'left' || direction === 'down'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[1][nextPos.z * -1][nextPos.x] === 6){
		//6 - right & bottom
		//Update currentBlock player is at
		//currentBlockType = 6;
		if(direction === 'right' || direction === 'down'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[1][nextPos.z * -1][nextPos.x] === 7){
		//7 - right & top
		//Update currentBlock player is at
		//currentBlockType = 7;
		if(direction === 'right' || direction === 'up'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[1][nextPos.z * -1][nextPos.x] === 8){
		//8 - left & top
		//Update currentBlock player is at
		//currentBlockType = 8;
		if(direction === 'left' || direction === 'up'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[1][nextPos.z * -1][nextPos.x] === 9){
		//9 - top & bottom
		//Update currentBlock player is at
		//currentBlockType = 9;
		if(direction === 'up' || direction === 'down'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[1][nextPos.z * -1][nextPos.x] === 10){
		//10 - left & right
		//Update currentBlock player is at
		//currentBlockType = 10;
		if(direction === 'left' || direction === 'right'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[1][nextPos.z * -1][nextPos.x] === 11){
		//11 is ignored and shouldn't be checked
	} else if (currentMapWalls[1][nextPos.z * -1][nextPos.x] === 12){
		//12 - tunnel - top & bottom

		//Slow down ghost when entering base of tunnel
		if(avatar === 'ghost1'){
			if(ghost1TunnelHit){} else {
				ghost1TunnelHit = true;
				//Set ghost new slower speed while in tunnel
				stepIntervalGhost1 += ghostPoweredUpSpeedChange;
				//Ghost 1
				clearInterval(ghost1Interval);//clear current speed
				clearTimeout(ghost1Move2Timeout);
				startGhost1Interval(stepIntervalGhost1);//set new speed
			}
		} else if(avatar === 'ghost2'){
			if(ghost2TunnelHit){} else {
				ghost2TunnelHit = true;
				//Set ghost new slower speed while in tunnel
				stepIntervalGhost2 += ghostPoweredUpSpeedChange;
				//Ghost 1
				clearInterval(ghost2Interval);//clear current speed
				clearTimeout(ghost2Move2Timeout);
				startGhost2Interval(stepIntervalGhost2);//set new speed
			}
		} else if(avatar === 'ghost3'){
			if(ghost3TunnelHit){} else {
				ghost3TunnelHit = true;
				//Set ghost new slower speed while in tunnel
				stepIntervalGhost3 += ghostPoweredUpSpeedChange;
				//Ghost 1
				clearInterval(ghost3Interval);//clear current speed
				clearTimeout(ghost3Move2Timeout);
				startGhost3Interval(stepIntervalGhost3);//set new speed
			}

		} else if(avatar === 'ghost4'){
			if(ghost4TunnelHit){} else {
				ghost4TunnelHit = true;
				//Set ghost new slower speed while in tunnel
				stepIntervalGhost4 += ghostPoweredUpSpeedChange;
				//Ghost 1
				clearInterval(ghost4Interval);//clear current speed
				clearTimeout(ghost4Move2Timeout);
				startGhost4Interval(stepIntervalGhost4);//set new speed
			}
		}

		//Update currentBlock player is at
		//currentBlockType = 12;
		if(direction === 'up' || direction === 'down'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[1][nextPos.z * -1][nextPos.x] === 13){
		//13 - tunnel connect - top & bottom
		//Update currentBlock player is at
		//currentBlockType = 13;
		if(direction === 'up' || direction === 'down'){
		return false;
		} else if(direction === 'right'){
		//Tunnel Suppot
		if(avatar === 'player'){
			playerTunnelTeleport = true;
		} else if(avatar === 'ghost1'){
			ghost1TunnelTeleport = true;
		} else if(avatar === 'ghost2'){
			ghost2TunnelTeleport = true;
		} else if(avatar === 'ghost3'){
			ghost3TunnelTeleport = true;
		} else if(avatar === 'ghost4'){
			ghost4TunnelTeleport = true;
		}
		return true;
		} else {
		return true;
		}
	}  else {
		//Obstacle Error
		console.log('Obstacle Error - topRight');
		console.log(currentMapWalls[1][nextPos.z * -1][nextPos.x]);
	}
} else if (nextPos.x <= 0 && nextPos.z > 0){
	//Bottom Left - 2
	//Loop 1 : +Z
	//Loop 2 : -X
	//bottomLeft - +z shift down by 1
	if (currentMapWalls[2][nextPos.z][nextPos.x * -1] === 0){
		//0 - empty
		//Update currentBlock player is at
		//currentBlockType = 0;
		return true;
	} else if (currentMapWalls[2][nextPos.z][nextPos.x * -1] === 1){
		//1 - bottom
		//for ghosts block the up direction if the 1 block is at
		//0x -2z
		//1x -2z
		//0x 3z
		//1x 3z
		if(avatar === 'ghost1' || avatar === 'ghost2' || avatar === 'ghost3' || avatar === 'ghost4'){
			if(nextPos.x === 0 && nextPos.z === -2 || nextPos.x === 1 && nextPos.z === -2 || nextPos.x === 0 && nextPos.z === 3 || nextPos.x === 1 && nextPos.z === 3){
				//Block Up and Down
				if(direction === 'down' || direction === 'up'){
				return false;
				} else {
				return true;
				}
			} else {
				//Block Down
				if(direction === 'down'){
				return false;
				} else {
				return true;
				}
			}
		} else if(avatar === 'player'){
			//Update currentBlock player is at
			//currentBlockType = 1;
			if(direction === 'down'){
			return false;
			} else {
			return true;
			}
		}
	} else if (currentMapWalls[2][nextPos.z][nextPos.x * -1] === 2){
		//2 - left
		//Update currentBlock player is at
		//currentBlockType = 2;
		if(direction === 'left'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[2][nextPos.z][nextPos.x * -1] === 3){
		//3 - top
		//Update currentBlock player is at
		//currentBlockType = 3;
		if(direction === 'up'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[2][nextPos.z][nextPos.x * -1] === 4){
		//4 - right
		//Update currentBlock player is at
		//currentBlockType = 4;
		if(direction === 'right'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[2][nextPos.z][nextPos.x * -1] === 5){
		//5 - left & bottom
		//Update currentBlock player is at
		//currentBlockType = 5;
		if(direction === 'left' || direction === 'down'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[2][nextPos.z][nextPos.x * -1] === 6){
		//6 - right & bottom
		//Update currentBlock player is at
		//currentBlockType = 6;
		if(direction === 'right' || direction === 'down'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[2][nextPos.z][nextPos.x * -1] === 7){
		//7 - right & top
		//Update currentBlock player is at
		//currentBlockType = 7;
		if(direction === 'right' || direction === 'up'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[2][nextPos.z][nextPos.x * -1] === 8){
		//8 - left & top
		//Update currentBlock player is at
		//currentBlockType = 8;
		if(direction === 'left' || direction === 'up'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[2][nextPos.z][nextPos.x * -1] === 9){
		//9 - top & bottom
		//Update currentBlock player is at
		//currentBlockType = 9;
		if(direction === 'up' || direction === 'down'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[2][nextPos.z][nextPos.x * -1] === 10){
		//10 - left & right
		//Update currentBlock player is at
		//currentBlockType = 10;
		if(direction === 'left' || direction === 'right'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[2][nextPos.z][nextPos.x * -1] === 11){
		//11 is ignored and shouldn't be checked
	} else if (currentMapWalls[2][nextPos.z][nextPos.x * -1] === 12){
		//12 - tunnel - top & bottom
		//Update currentBlock player is at
		//currentBlockType = 12;
		if(direction === 'up' || direction === 'down'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[2][nextPos.z][nextPos.x * -1] === 13){
		//13 - tunnel connect - top & bottom
		//Update currentBlock player is at
		//currentBlockType = 13;
		if(direction === 'up' || direction === 'down'){
		return false;
		} else {
		return true;
		}
	} else {
		//Obstacle Error
		console.log('Obstacle Error - bottomLeft');
		console.log(currentMapWalls[2][nextPos.z][nextPos.x * -1]);
	}
} else if (nextPos.x > 0 && nextPos.z > 0){
	//Bottom Right - 3
	//Loop 1 : +Z
	//Loop 2 : +X
	//bottomRight - +z shift down by 1 & +x shift right by 1 
	if (currentMapWalls[3][nextPos.z][nextPos.x] === 0){
		//0 - empty
		//Update currentBlock player is at
		//currentBlockType = 0;
		return true;
	} else if (currentMapWalls[3][nextPos.z][nextPos.x] === 1){
		//1 - bottom
		//for ghosts block the up direction if the 1 block is at
		//0x -2z
		//1x -2z
		//0x 3z
		//1x 3z
		if(avatar === 'ghost1' || avatar === 'ghost2' || avatar === 'ghost3' || avatar === 'ghost4'){
			if(nextPos.x === 0 && nextPos.z === -2 || nextPos.x === 1 && nextPos.z === -2 || nextPos.x === 0 && nextPos.z === 3 || nextPos.x === 1 && nextPos.z === 3){
				//Block Up and Down
				if(direction === 'down' || direction === 'up'){
				return false;
				} else {
				return true;
				}
			} else {
				//Block Down
				if(direction === 'down'){
				return false;
				} else {
				return true;
				}
			}
		} else if(avatar === 'player'){
			//Update currentBlock player is at
			//currentBlockType = 1;
			if(direction === 'down'){
			return false;
			} else {
			return true;
			}
		}
	} else if (currentMapWalls[3][nextPos.z][nextPos.x] === 2){
		//2 - left
		//Update currentBlock player is at
		//currentBlockType = 2;
		if(direction === 'left'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[3][nextPos.z][nextPos.x] === 3){
		//3 - top
		//Update currentBlock player is at
		//currentBlockType = 3;
		if(direction === 'up'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[3][nextPos.z][nextPos.x] === 4){
		//4 - right
		//Update currentBlock player is at
		//currentBlockType = 4;
		if(direction === 'right'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[3][nextPos.z][nextPos.x] === 5){
		//5 - left & bottom
		//Update currentBlock player is at
		//currentBlockType = 5;
		if(direction === 'left' || direction === 'down'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[3][nextPos.z][nextPos.x] === 6){
		//6 - right & bottom
		//Update currentBlock player is at
		//currentBlockType = 6;
		if(direction === 'right' || direction === 'down'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[3][nextPos.z][nextPos.x] === 7){
		//7 - right & top
		//Update currentBlock player is at
		//currentBlockType = 7;
		if(direction === 'right' || direction === 'up'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[3][nextPos.z][nextPos.x] === 8){
		//8 - left & top
		//Update currentBlock player is at
		//currentBlockType = 8;
		if(direction === 'left' || direction === 'up'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[3][nextPos.z][nextPos.x] === 9){
		//9 - top & bottom
		//Update currentBlock player is at
		//currentBlockType = 9;
		if(direction === 'up' || direction === 'down'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[3][nextPos.z][nextPos.x] === 10){
		//10 - left & right
		//Update currentBlock player is at
		//currentBlockType = 10;
		if(direction === 'left' || direction === 'right'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[3][nextPos.z][nextPos.x] === 11){
		//11 is ignored and shouldn't be checked
	} else if (currentMapWalls[3][nextPos.z][nextPos.x] === 12){
		//12 - tunnel - top & bottom
		//Update currentBlock player is at
		//currentBlockType = 12;
		if(direction === 'up' || direction === 'down'){
		return false;
		} else {
		return true;
		}
	} else if (currentMapWalls[3][nextPos.z][nextPos.x] === 13){
		//13 - tunnel connect - top & bottom
		//Update currentBlock player is at
		//currentBlockType = 13;
		if(direction === 'up' || direction === 'down'){
		return false;
		} else {
		return true;
		}
	} else {
		//Obstacle Error
		console.log('Obstacle Error - bottomRight');
		console.log(currentMapWalls[3][nextPos.z][nextPos.x]);
	}
}//End if checks

}//End check for Map Obstacles

//Check and eat Dots at current player POS
//Controls PowerUp phase
function checkMapDots(pos){
//allDotsXZ
//allPowerUpsXZ

//Check for Dots
for(let i = 0; i < allDotsXZ.length; i++){
//Check X location for match first
if(pos.x === allDotsXZ[i][0]){
	//Check Z location if X matchs
	if(pos.z === allDotsXZ[i][1]){

//On hit, remove it from the allDotsXZ array
allDotsXZ.splice(i, 1);

//add points to user score
playerScore += dotPoint;
eatenDots++;
//Play Sound
dotHitSound.emit('dotHitEvent',{});
//Pretify the Cost
playerScoreString = prettyNums(playerScore).join('').trim();
//Update Visible Score
scoreText.setAttribute('text',{value: playerScorePreText + playerScoreString});
//Sync Hi Score if better
if(playerHitHiScore){
	hiScoreText.setAttribute('text',{value: hiScorePreText + playerScoreString});
}

//turn dot invisible
//allDots[i].setAttribute('material',{opacity: 0});
allDots[i].setAttribute('visible', false);

//Remove dot from main array to sync with XZ array
allDots.splice(i, 1);

	}
}
}//End check for Dots

//Check for Power Ups
for(let i = 0; i < allPowerUpsXZ.length; i++){
//Check X location for match first
if(pos.x === allPowerUpsXZ[i][0]){
	//Check Z location if X matchs
	if(pos.z === allPowerUpsXZ[i][1]){
		//Power Up Hit

//On hit, remove it from the allDotsXZ array
allPowerUpsXZ.splice(i, 1);

//add points to user score
playerScore += powerUpPoint;
eatenDots++;
//Play Sound
powerUpSound.emit('powerUpEvent',{});
//Pretify the Cost
playerScoreString = prettyNums(playerScore).join('').trim();
//Update Visible Score
scoreText.setAttribute('text',{value: playerScorePreText + playerScoreString});

//Sync Hi Score if better
if(playerHitHiScore){
	hiScoreText.setAttribute('text',{value: hiScorePreText + playerScoreString});
}

//turn powerUp invisible
//allPowerUps[i].setAttribute('material',{opacity: 0});
allPowerUps[i].setAttribute('visible', false);

//Remove powerUp from main array to sync with XZ array
allPowerUps.splice(i, 1);

//Need to account for if already powered up and hit another dot
//Only extend the duration and not make player even faster and ghosts even slower as well as rehit animation change
if(poweredUp){
	//Reset Warning and poweredDown timeout
	clearTimeout(poweredUpWarningTimeout);
	clearTimeout(poweredUpTimeout);
	//Reset Amount of Kills
	poweredUpKills = 0;
} else {
	//On hit, set poweredUp bool
	poweredUp = true;

	//Set player new faster speed
	stepIntervalPlayer -= poweredUpSpeedChange;//the interval used
	//Restart Intervals for New Speed
	clearInterval(playerInterval);//clear current speed
	startPlayerInterval(stepIntervalPlayer);//set new speed
}//End powerUp check

//Set ghost new slower speed first to ensure always slower than player

//Ghost 1
if(ghost1PoweredUp || ghost1RecentDeath){}else{
	//Ghost 1
	clearInterval(ghost1Interval);//clear current speed
	//clearTimeout(ghost1Move2Timeout);
	stepIntervalGhost1 += ghostPoweredUpSpeedChange;//the interval used
	//Ghost 1
	ghost1Eye1Socket.emit('poweredUp',{});
	ghost1Eye1.emit('poweredUp',{});
	ghost1Eye2Socket.emit('poweredUp',{});
	ghost1Eye2.emit('poweredUp',{});
	ghost1Mouth.emit('poweredUp',{});
	ghost1Spin.emit('poweredUp',{});
	ghost1Head.emit('poweredUp',{});
	ghost1Body.emit('poweredUp',{});
	ghost1Legs1.emit('poweredUp',{});
	ghost1Legs2.emit('poweredUp',{});
	ghost1Legs3.emit('poweredUp',{});
	ghost1Legs4.emit('poweredUp',{});
	//Ghost is now Powered Up
	ghost1PoweredUp = true;
	ghost1PowerUpHit = true;
	//Adjust Pathfinding
	ghost1PathfindPreviously = ghost1Pathfind;
	ghost1Pathfind = false;
	ghost1CheckForPathSwitch = false;

	if(ghost1Start){
		startGhost1Interval(stepIntervalGhost1);//set new speed
	}
}



//Ghost 2
if(ghost2PoweredUp || ghost2RecentDeath){}else{
	//Ghost 2
	clearInterval(ghost2Interval);//clear current speed
	//clearTimeout(ghost2Move2Timeout);
	stepIntervalGhost2 += ghostPoweredUpSpeedChange;//the interval used

	//Ghost 2
	ghost2Eye1Socket.emit('poweredUp',{});
	ghost2Eye1.emit('poweredUp',{});
	ghost2Eye2Socket.emit('poweredUp',{});
	ghost2Eye2.emit('poweredUp',{});
	ghost2Mouth.emit('poweredUp',{});
	ghost2Spin.emit('poweredUp',{});
	ghost2Head.emit('poweredUp',{});
	ghost2Body.emit('poweredUp',{});
	ghost2Legs1.emit('poweredUp',{});
	ghost2Legs2.emit('poweredUp',{});
	ghost2Legs3.emit('poweredUp',{});
	ghost2Legs4.emit('poweredUp',{});
	//Ghost is now Powered Up
	ghost2PoweredUp = true;
	ghost2PowerUpHit = true;
	//Adjust Pathfinding
	ghost2PathfindPreviously = ghost2Pathfind;
	ghost2Pathfind = false;
	ghost2CheckForPathSwitch = false;

	if(ghost2Start){
		startGhost2Interval(stepIntervalGhost2);//set new speed
	}
}
//Ghost 3
if(ghost3PoweredUp || ghost3RecentDeath){}else{
	//Ghost 3
	clearInterval(ghost3Interval);//clear current speed
	//clearTimeout(ghost3Move2Timeout);
	stepIntervalGhost3 += ghostPoweredUpSpeedChange;//the interval used

	//Ghost 3
	ghost3Eye1Socket.emit('poweredUp',{});
	ghost3Eye1.emit('poweredUp',{});
	ghost3Eye2Socket.emit('poweredUp',{});
	ghost3Eye2.emit('poweredUp',{});
	ghost3Mouth.emit('poweredUp',{});
	ghost3Spin.emit('poweredUp',{});
	ghost3Head.emit('poweredUp',{});
	ghost3Body.emit('poweredUp',{});
	ghost3Legs1.emit('poweredUp',{});
	ghost3Legs2.emit('poweredUp',{});
	ghost3Legs3.emit('poweredUp',{});
	ghost3Legs4.emit('poweredUp',{});
	//Ghost is now Powered Up
	ghost3PoweredUp = true;
	ghost3PowerUpHit = true;
	//Adjust Pathfinding
	ghost3PathfindPreviously = ghost3Pathfind;
	ghost3Pathfind = false;
	ghost3CheckForPathSwitch = false;

	if(ghost3Start){
		startGhost3Interval(stepIntervalGhost3);//set new speed
	}
}
//Ghost 4
if(ghost4PoweredUp || ghost4RecentDeath){}else{
	//Ghost 4
	clearInterval(ghost4Interval);//clear current speed
	//clearTimeout(ghost4Move2Timeout);
	stepIntervalGhost4 += ghostPoweredUpSpeedChange;//the interval used

	//Ghost 4
	ghost4Eye1Socket.emit('poweredUp',{});
	ghost4Eye1.emit('poweredUp',{});
	ghost4Eye2Socket.emit('poweredUp',{});
	ghost4Eye2.emit('poweredUp',{});
	ghost4Mouth.emit('poweredUp',{});
	ghost4Spin.emit('poweredUp',{});
	ghost4Head.emit('poweredUp',{});
	ghost4Body.emit('poweredUp',{});
	ghost4Legs1.emit('poweredUp',{});
	ghost4Legs2.emit('poweredUp',{});
	ghost4Legs3.emit('poweredUp',{});
	ghost4Legs4.emit('poweredUp',{});
	//Ghost is now Powered Up
	ghost4PoweredUp = true;
	ghost4PowerUpHit = true;
	//Adjust Pathfinding
	ghost4PathfindPreviously = ghost4Pathfind;
	ghost4Pathfind = false;
	ghost4CheckForPathSwitch = false;

	if(ghost4Start){
		startGhost4Interval(stepIntervalGhost4);//set new speed
	}
}

//Power Up Timeout
poweredUpWarningTimeout = setTimeout(function () {
	//Animate ghost material animation change on warning

	//only give warning if ghost is still poweredDown
	//otherwise they were already eaten and returned
	if(ghost1PoweredUp){
		//Ghost 1
		ghost1Eye1Socket.emit('poweredUpWarning',{});
		ghost1Eye1.emit('poweredUpWarning',{});
		ghost1Eye2Socket.emit('poweredUpWarning',{});
		ghost1Eye2.emit('poweredUpWarning',{});
		ghost1Mouth.emit('poweredUpWarning',{});
		ghost1Spin.emit('poweredUpWarning',{});
		ghost1Head.emit('poweredUpWarning',{});
		ghost1Body.emit('poweredUpWarning',{});
		ghost1Legs1.emit('poweredUpWarning',{});
		ghost1Legs2.emit('poweredUpWarning',{});
		ghost1Legs3.emit('poweredUpWarning',{});
		ghost1Legs4.emit('poweredUpWarning',{});
	}

	if(ghost2PoweredUp){
		//Ghost 2
		ghost2Eye1Socket.emit('poweredUpWarning',{});
		ghost2Eye1.emit('poweredUpWarning',{});
		ghost2Eye2Socket.emit('poweredUpWarning',{});
		ghost2Eye2.emit('poweredUpWarning',{});
		ghost2Mouth.emit('poweredUpWarning',{});
		ghost2Spin.emit('poweredUpWarning',{});
		ghost2Head.emit('poweredUpWarning',{});
		ghost2Body.emit('poweredUpWarning',{});
		ghost2Legs1.emit('poweredUpWarning',{});
		ghost2Legs2.emit('poweredUpWarning',{});
		ghost2Legs3.emit('poweredUpWarning',{});
		ghost2Legs4.emit('poweredUpWarning',{});
	}

	if(ghost3PoweredUp){
		//Ghost 3
		ghost3Eye1Socket.emit('poweredUpWarning',{});
		ghost3Eye1.emit('poweredUpWarning',{});
		ghost3Eye2Socket.emit('poweredUpWarning',{});
		ghost3Eye2.emit('poweredUpWarning',{});
		ghost3Mouth.emit('poweredUpWarning',{});
		ghost3Spin.emit('poweredUpWarning',{});
		ghost3Head.emit('poweredUpWarning',{});
		ghost3Body.emit('poweredUpWarning',{});
		ghost3Legs1.emit('poweredUpWarning',{});
		ghost3Legs2.emit('poweredUpWarning',{});
		ghost3Legs3.emit('poweredUpWarning',{});
		ghost3Legs4.emit('poweredUpWarning',{});
	}

	if(ghost4PoweredUp){
		//Ghost 4
		ghost4Eye1Socket.emit('poweredUpWarning',{});
		ghost4Eye1.emit('poweredUpWarning',{});
		ghost4Eye2Socket.emit('poweredUpWarning',{});
		ghost4Eye2.emit('poweredUpWarning',{});
		ghost4Mouth.emit('poweredUpWarning',{});
		ghost4Spin.emit('poweredUpWarning',{});
		ghost4Head.emit('poweredUpWarning',{});
		ghost4Body.emit('poweredUpWarning',{});
		ghost4Legs1.emit('poweredUpWarning',{});
		ghost4Legs2.emit('poweredUpWarning',{});
		ghost4Legs3.emit('poweredUpWarning',{});
		ghost4Legs4.emit('poweredUpWarning',{});
	}

	//clearTimeout(timeout);
}, poweredUpWarningTimer); //Delay



//Power Up Over Timeout
poweredUpTimeout = setTimeout(function () {
	//Power Up ran out
	poweredUp = false;
	//Reset Amount of Kills
	poweredUpKills = 0;
	//Reset player new faster speed
	stepIntervalPlayer += poweredUpSpeedChange;//the interval used
	clearInterval(playerInterval);//clear current speed
	startPlayerInterval(stepIntervalPlayer);//set new speed

	//If Ghosts are still powered, revert them
	//Ghost 1
	if(ghost1PoweredUp){
		//Ghost 1
		//Reset ghost material animation change
		powerDownGhost1();
		stepIntervalGhost1 -= ghostPoweredUpSpeedChange;//the interval used
		//Ghost 1
		clearInterval(ghost1Interval);//clear current speed
		//clearTimeout(ghost1Move2Timeout);
		startGhost1Interval(stepIntervalGhost1);//set new speed
		//Reset Pathfinding to before PowerUp
		ghost1Pathfind = ghost1PathfindPreviously;
		ghost1CheckForPathSwitch = true;
	}
	//Ghost 2
	if(ghost2PoweredUp){
		//Ghost 2
		//Reset ghost material animation change
		powerDownGhost2();
		stepIntervalGhost2 -= ghostPoweredUpSpeedChange;//the interval used
		//Ghost 2
		clearInterval(ghost2Interval);//clear current speed
		//clearTimeout(ghost2Move2Timeout);
		startGhost2Interval(stepIntervalGhost2);//set new speed
		//Reset Pathfinding to before PowerUp
		ghost2Pathfind = ghost2PathfindPreviously;
		ghost2CheckForPathSwitch = true;
	}
	//Ghost 3
	if(ghost3PoweredUp){
		//Ghost 3
		//Reset ghost material animation change
		powerDownGhost3();
		stepIntervalGhost3 -= ghostPoweredUpSpeedChange;//the interval used
		//Ghost 3
		clearInterval(ghost3Interval);//clear current speed
		//clearTimeout(ghost3Move2Timeout);
		startGhost3Interval(stepIntervalGhost3);//set new speed
		//Reset Pathfinding to before PowerUp
		ghost3Pathfind = ghost3PathfindPreviously;
		ghost3CheckForPathSwitch = true;
	}
	//Ghost 4
	if(ghost4PoweredUp){
		//Ghost 4
		//Reset ghost material animation change
		powerDownGhost4();
		stepIntervalGhost4 -= ghostPoweredUpSpeedChange;//the interval used
		//Ghost 4
		clearInterval(ghost4Interval);//clear current speed
		//clearTimeout(ghost4Move2Timeout);
		startGhost4Interval(stepIntervalGhost4);//set new speed
		//Reset Pathfinding to before PowerUp
		ghost4Pathfind = ghost4PathfindPreviously;
		ghost4CheckForPathSwitch = true;
	}

	//clearTimeout(timeout);
}, poweredUpTimer); //Delay


	}//End Loop2 - Exact
}//End Loop1

}//End check for Power Ups

//Check for total amount of eaten dots to display and enable bonus item
if(bonusOn){
	//Check for Bonus Hit
	if(pos.x === 0.5){
		if(pos.z === 1){
			//Play Sound
			eatFruitSound.emit('eatFruitEvent',{});
			//add points to user score
			playerScore += bonusAmount;
			//Pretify the Cost
			playerScoreString = prettyNums(playerScore).join('').trim();
			//Update Visible Score
			scoreText.setAttribute('text',{value: playerScorePreText + playerScoreString});
			//Sync Hi Score if better
			if(playerHitHiScore){
				hiScoreText.setAttribute('text',{value: hiScorePreText + playerScoreString});
			}
			hideBonus();
			clearTimeout(showBonusTimeout);
			//Text is displayed above player & ghosts
			pos.y = 1;
			bonusPointsDisplay(bonusAmount,pos);
		}
	}
}else{
	if(eatenDots === 100){
		showBonus();
		//13 Second time to collect bonus
		showBonusTimeout = setTimeout(function () {
			hideBonus();
		}, 20000); //Delay
	}
}

//Check for Pathfinding Switch when enabled
//Ghost1
if(ghost1CheckForPathSwitch){
	ghost1PathSwitching();
}
//Ghost2
if(ghost2CheckForPathSwitch){
	ghost2PathSwitching();
}
//Ghost3
if(ghost3CheckForPathSwitch){
	ghost3PathSwitching();
}
//Ghost4
if(ghost4CheckForPathSwitch){
	ghost4PathSwitching();
}

}//End check for Dots

//Check for Player Ghost Interaction
function checkKill(pos1,pos2){

//If center pos is same, hit
if (pos1.x === pos2.x && pos1.z === pos2.z){
	return true;
}

}//End checkKill

//Check Kill
function checkKillInterval(interval) {

killInterval = setInterval(function() {
//Do not move unless the level is ready and started
if(levelStart){
	//console.log('Interval running');

//Don't Check Again after being hit once till reset
if(ghost1Hit){} else {
	if(checkKill(playerPos,ghost1Pos)){
		if(ghost1PoweredUp){
			ghost1Hit = true;
			ghostDeath('ghost1');
		} else {
			playerHit = true;
			playerDeath();
		}
	}
}

if(ghost2Hit){} else {
	if(checkKill(playerPos,ghost2Pos)){
		if(ghost2PoweredUp){
			ghost2Hit = true;
			ghostDeath('ghost2');
		} else {
			playerHit = true;
			playerDeath();
		}
	}
}

if(ghost3Hit){} else {
	if(checkKill(playerPos,ghost3Pos)){
		if(ghost3PoweredUp){
			ghost3Hit = true;
			ghostDeath('ghost3');
		} else {
			playerHit = true;
			playerDeath();
		}
	}
}


if(ghost4Hit){} else {
	if(checkKill(playerPos,ghost4Pos)){
		if(ghost4PoweredUp){
			ghost4Hit = true;
			ghostDeath('ghost4');
		} else {
			playerHit = true;
			playerDeath();
		}
	}
}

//Add bonus fruit hit


}//End levelStart

}, interval);//Interval

}//End checkKillInterval

//
//Player Functions
//

//Animate Player POS movement
//Check for Level Complete
function setPlayerPos(pos){
	//Update phantom 
	playerPos.copy(pos);

	//Animate Player Movement
	if(playerCurrentDirection === 'left' || playerCurrentDirection === 'right'){
	moveAnimation = {
		property: 'object3D.position.x',
		to: pos.x,
		dur: stepIntervalPlayer,
		delay: 0,
		loop: 'false',
		dir: 'normal',
		easing:'linear',
		elasticity: 400,
		autoplay: 'true',
		enabled: 'true',
		};
	} else {
	moveAnimation = {
		property: 'object3D.position.z',
		to: pos.z,
		dur: stepIntervalPlayer,
		delay: 0,
		loop: 'false',
		dir: 'normal',
		easing:'linear',
		elasticity: 400,
		autoplay: 'true',
		enabled: 'true',
		};
	}
	//Set movement animation to Player
	player.setAttribute('animation__moveAnimation', moveAnimation);


//Dot Check Timeout
dotCheckTimeout = setTimeout(function () {

	//check for Dots
	checkMapDots(pos);

	//clearTimeout(dotCheckTimeout);
}, stepIntervalPlayer/2); //Delay to allow movement finish before dotHit


}//End setPlayerPos

//Rotate Player
function rotatePlayer(direction){

//Emit moving event to resume eating animation before turning
playerAvatar.emit('moving',{});

if(direction === "up"){
	//Rotate the player in the Up direction
	playerNewRotation.y = 0;
	playerAvatar.setAttribute('rotation', playerNewRotation);
	playerCurrentDirection = 'up';
} else if(direction === "left"){
	//Rotate the player in the Left direction
	playerNewRotation.y = 90;
	playerAvatar.setAttribute('rotation', playerNewRotation);
	playerCurrentDirection = 'left';
} else if(direction === "right"){
	//Rotate the player in the Right direction
	playerNewRotation.y = 270;
	playerAvatar.setAttribute('rotation', playerNewRotation);
	playerCurrentDirection = 'right';
} else if(direction === "down"){
	//Rotate the player in the Down direction
	playerNewRotation.y = 180;
	playerAvatar.setAttribute('rotation', playerNewRotation);
	playerCurrentDirection = 'down';
}

}//End rotatePlayer

//Check obstacles by Player Position in Direction and move/prep to move
function movePlayer(direction){

//Get current player position
//playerCurrentPos = playerPos;
//Get player position
playerNewPos.copy(playerPos);

//Move based on Direction
if(direction === 'up' ){

	//Get player's new position
	playerNewPos.z -= stepDistance;

	//Check if next position is not center square otherwise look for obstacles
	if(Number.isInteger(playerNewPos.z)){
		//Set movement position
		setPlayerPos(playerNewPos);
	} else {
		//Check for obstacles
		if(checkMapObstacles(playerPos,direction,'player')){
			//Set movement position
			setPlayerPos(playerNewPos);
		} else {
			//Emit hitWall event
			playerAvatar.emit('hitWall',{});
		}
	}

} else if(direction === 'left'){

	//Get player's new position
	playerNewPos.x -= stepDistance;

	//Check if next position is center square to look for obstacles
	if(Number.isInteger(playerNewPos.x)){
		//Set movement position
		setPlayerPos(playerNewPos);
	} else {
		//Check for obstacles
		if(checkMapObstacles(playerPos,direction,'player')){
			//Check for tunnel
			if (playerTunnelTeleport) {
				//Reset playerTunnelTeleport
				playerTunnelTeleport = false;
				playerAvatar.setAttribute('visible',false);
				//Set movement position slightly out of bounds
				setPlayerPos(playerNewPos);
				//Delay half stepIntervalPlayer, then teleport for tunnel
				tunnelTimeout = setTimeout(function () {
					//Set movement position
					setPlayerPos(mapTunnels[1]);
					//Clear Timeout
					clearTimeout(tunnelTimeout);
				}, stepIntervalPlayer); //Delay
				//Reset playerTunnelTeleport
				playerInTunnel = true;
				//Delay half stepIntervalPlayer, then teleport for tunnel
				tunnelTimeout2 = setTimeout(function () {
					//Reset playerTunnelTeleport
					playerInTunnel = false;
					playerAvatar.setAttribute('visible',true);
					//Clear Timeout
					//clearTimeout(tunnelTimeout2);
				}, stepIntervalPlayer * 3); //Delay for Full Step

			} else {
				//Set movement position
				setPlayerPos(playerNewPos);
			}//End tunnel check
		} else {
			//Emit hitWall event
			playerAvatar.emit('hitWall',{});
		}//End obstacle check
	}//End integer check

} else if(direction === 'right'){

	//Get player's new position
	playerNewPos.x += stepDistance;

	//Check if next position is center square to look for obstacles
	if(Number.isInteger(playerNewPos.x)){
		//Set movement position
		setPlayerPos(playerNewPos);
	} else {
		//Check for obstacles
		if(checkMapObstacles(playerPos,direction,'player')){
			//Check for tunnel
			if (playerTunnelTeleport) {
				//Reset playerTunnelTeleport
				playerTunnelTeleport = false;
				playerAvatar.setAttribute('visible',false);
				//Set movement position slightly out of bounds
				setPlayerPos(playerNewPos);
				//Delay half stepIntervalPlayer, then teleport for tunnel
				tunnelTimeout = setTimeout(function () {
					//Set movement position
					setPlayerPos(mapTunnels[0]);
					//Clear Timeout
					clearTimeout(tunnelTimeout);
				}, stepIntervalPlayer); //Delay
				//Reset playerTunnelTeleport
				playerInTunnel = true;
				//Delay half stepIntervalPlayer, then teleport for tunnel
				tunnelTimeout2 = setTimeout(function () {
					//Reset playerTunnelTeleport
					playerInTunnel = false;
					playerAvatar.setAttribute('visible',true);
					//Clear Timeout
					//clearTimeout(tunnelTimeout2);
				}, stepIntervalPlayer * 3); //Delay for Full Step

			} else {
				//Set movement position
				setPlayerPos(playerNewPos);
			}//End tunnel check
		} else {
			//Emit hitWall event
			playerAvatar.emit('hitWall',{});
		}
	}

} else if(direction === 'down'){
	//Get player's new position
	playerNewPos.z += stepDistance;

	//Check if next position is center square to look for obstacles
	if(Number.isInteger(playerNewPos.z)){
		//Set movement position
		setPlayerPos(playerNewPos);
	} else {
		//Check for obstacles
		if(checkMapObstacles(playerPos,direction,'player')){
			//Set movement position
			setPlayerPos(playerNewPos);
		} else {
			//Emit hitWall event
			playerAvatar.emit('hitWall',{});
		}
	}

}//End if/else

}//End movePlayer

//Player Input Update
function inputUpdate(direction){

//Check for half step, if not then do a normal obstacle check
//if half step, use currentDirection to calc the next full step pos
//CORRECTION
//do the above when the position is a perpindicular position
//
//when user is traveling to the left and hits a corner, turn on that corner. Basically don't check for obstacles on that input, but plan the next corner turn ahead.
//
//if the input user is opposite direction. (Parallel, but same direction is ignored for simplicity)
//
//use that next full step to check for obstacles in requested direction
//if clear then prep player to turn when it hits that POS
//else ignore input
//but if im reversing, go backwards to step previous

//
//if the user is at a half step and the input is the opposite direction as current input, then don't check for obstacles and just move there
//
//Disable input when user is in tunnel to cover for teleport and the drawback for the quick movement. Can't reverse, which also bugs out :)

//Get current player position
//playerCurrentPosAtInput = playerPos;

//Depending on direction, assign X or Z to be checked for integer
if(playerCurrentDirection === 'up' || playerCurrentDirection === 'down'){
	checkXorZ = playerPos.z;
} else if(playerCurrentDirection === 'left' || playerCurrentDirection === 'right') {
	checkXorZ = playerPos.x;
}


//Check which direction is being requested
if(direction === 'up'){

	//Player at integer location, check for obstacles
	if(Number.isInteger(checkXorZ)){

		//Check for obstacles
		if(checkMapObstacles(playerPos,direction,'player')){
			//Rotate Player
			rotatePlayer('up');
		}
	} else {
		if (playerCurrentDirection === 'up'){
			//Ignore
			//Input is same as current direction
		} else if (playerCurrentDirection === 'left'){
			//Get player position
			playerNextPosCheck.copy(playerPos);
			//Get player's new position
			playerNextPosCheck.x -= stepDistance;

			//Check for obstacles
			if(checkMapObstacles(playerNextPosCheck,direction,'player')){
				//Prep Up Rotation on next step
				inputDirection = 'up';
			}
		} else if (playerCurrentDirection === 'right'){
			//Get player position
			playerNextPosCheck.copy(playerPos);
			//Get player's new position
			playerNextPosCheck.x += stepDistance;

			//Check for obstacles
			if(checkMapObstacles(playerNextPosCheck,direction,'player')){
				//Prep Up Rotation on next step
				inputDirection = 'up';
			}
		} else if (playerCurrentDirection === 'down'){
			//Get player position
			playerNextPosCheck.copy(playerPos);
			//Get player's new position
			playerNextPosCheck.z += stepDistance;
			//Don't check for obstacles
			//Rotate Player
			rotatePlayer('up');
			//Up Rotation 
			//inputDirection = 'up';
		}

	}//End integer check if/else

} else if(direction === 'left'){

	//Player at integer location, check for obstacles
	if(Number.isInteger(checkXorZ)){
		//Check for obstacles
		if(checkMapObstacles(playerPos,direction,'player')){
			//Rotate Player
			rotatePlayer('left');
		}

	} else {
		if (playerCurrentDirection === 'up'){
			//Get player position
			playerNextPosCheck.copy(playerPos);
			//Get player's new position
			playerNextPosCheck.z -= stepDistance;

			//Check for obstacles
			if(checkMapObstacles(playerNextPosCheck,direction,'player')){
				//Prep Up Rotation on next step
				inputDirection = 'left';
			}
		} else if (playerCurrentDirection === 'left'){
			//Ignore
			//Input is same as current direction
		} else if (playerCurrentDirection === 'right'){
			//Get player position
			playerNextPosCheck.copy(playerPos);
			//Get player's new position
			playerNextPosCheck.x += stepDistance;
			//Don't check for obstacles
			//Rotate Player
			rotatePlayer('left');
			//Left Rotation 
			//inputDirection = 'left';
		} else if (playerCurrentDirection === 'down'){
			//Get player position
			playerNextPosCheck.copy(playerPos);
			//Get player's new position
			playerNextPosCheck.z += stepDistance;

			//Check for obstacles
			if(checkMapObstacles(playerNextPosCheck,direction,'player')){
				//Prep Up Rotation on next step
				inputDirection = 'left';
			}
		}

	}//End integer check if/else

} else if(direction === 'right'){

	//Player at integer location, check for obstacles
	if(Number.isInteger(checkXorZ)){
		//Check for obstacles
		if(checkMapObstacles(playerPos,direction,'player')){
			//Rotate Player
			rotatePlayer('right');
		}
	} else {
		if (playerCurrentDirection === 'up'){
			//Get player position
			playerNextPosCheck.copy(playerPos);
			//Get player's new position
			playerNextPosCheck.z -= stepDistance;

			//Check for obstacles
			if(checkMapObstacles(playerNextPosCheck,direction,'player')){
				//Prep Up Rotation on next step
				inputDirection = 'right';
			}
		} else if (playerCurrentDirection === 'left'){
			//Get player position
			playerNextPosCheck.copy(playerPos);
			//Get player's new position
			playerNextPosCheck.x -= stepDistance;
			//Don't check for obstacles
			//Rotate Player
			rotatePlayer('right');
			//Right Rotation 
			//inputDirection = 'right';
		} else if (playerCurrentDirection === 'right'){
			//Ignore
			//Input is same as current direction
		} else if (playerCurrentDirection === 'down'){
			//Get player position
			playerNextPosCheck.copy(playerPos);
			//Get player's new position
			playerNextPosCheck.z += stepDistance;

			//Check for obstacles
			if(checkMapObstacles(playerNextPosCheck,direction,'player')){
				//Prep Up Rotation on next step
				inputDirection = 'right';
			}
		}

	}//End integer check if/else

} else if(direction === 'down'){

	//Player at integer location, check for obstacles
	if(Number.isInteger(checkXorZ)){
		//Check for obstacles
		if(checkMapObstacles(playerPos,direction,'player')){
			//Rotate Player
			rotatePlayer('down');
		}
	} else {
		if (playerCurrentDirection === 'up'){
			//Get player position
			playerNextPosCheck.copy(playerPos);
			//Get player's new position
			playerNextPosCheck.z -= stepDistance;
			//Don't check for obstacles
			//Rotate Player
			rotatePlayer('down');
			//Down Rotation 
			//inputDirection = 'down';
		} else if (playerCurrentDirection === 'left'){
			//Get player position
			playerNextPosCheck.copy(playerPos);
			//Get player's new position
			playerNextPosCheck.x -= stepDistance;

			//Check for obstacles
			if(checkMapObstacles(playerNextPosCheck,direction,'player')){
				//Prep Up Rotation on next step
				inputDirection = 'down';
			}
		} else if (playerCurrentDirection === 'right'){
			//Get player position
			playerNextPosCheck.copy(playerPos);
			//Get player's new position
			playerNextPosCheck.x += stepDistance;

			//Check for obstacles
			if(checkMapObstacles(playerNextPosCheck,direction,'player')){
				//Prep Up Rotation on next step
				inputDirection = 'down';
			}
		} else if (playerCurrentDirection === 'down'){
			//Ignore
			//Input is same as current direction
		}

	}//End integer check if/else

}//End direction if/else


}//End Input Update

//startPlayerInterval
function startPlayerInterval(interval) {

playerInterval = setInterval(function() {

	//Check for level over condition
	if(levelStart){
		//Check for Level Win condition
		if(allDotsXZ.length === 0 && allPowerUpsXZ.length === 0){
			//Level Complete
			//Start the Next Level
			nextLevelStart();
			//Level Complete Sound
			levelCompleteSoundTimeout = setTimeout(function () {
				//Play Sound
				levelCompleteSound.emit('levelCompleteEvent',{});
			}, 1000); //Delay
		}
	}

	if (playerEarned1up){
		//set player score as the high score
	} else {
		if (playerScore >= hiScoreDefault){
			playerEarned1up = true;
			//Play Sound
			extraLifeSound.emit('extraLifeEvent',{});
			//Add extra life
			if(currentLives === 3){
				playerLife3.setAttribute('visible', true);
			} else if(currentLives === 2){
				playerLife2.setAttribute('visible', true);
			}  else if(currentLives === 1){
				playerLife1.setAttribute('visible', true);
			}
		}
	}

	if (playerHitHiScore) {
		//sync player points
	} else {
		if (playerScore >= hiScore) {
			playerHitHiScore = true;
			hiScoreText.setAttribute('text',{value: hiScorePreText + playerScoreString});
		}
	}

	//If no recent input has been made, move normally in current direction
	//Otherwise, finish 1 move, then rotate in prep for next movement
	if (inputDirection === 'none'){
		//Move player
		movePlayer(playerCurrentDirection);

	} else if (inputDirection === 'up'){
		//Move player
		movePlayer(playerCurrentDirection);
		//Rotate Player
		rotatePlayer(inputDirection);

	} else if (inputDirection === 'left'){
		//Move player
		movePlayer(playerCurrentDirection);
		//Rotate Player
		rotatePlayer(inputDirection);

	} else if (inputDirection === 'right'){
		//Move player
		movePlayer(playerCurrentDirection);
		//Rotate Player
		rotatePlayer(inputDirection);

	} else if (inputDirection === 'down'){
		//Move player
		movePlayer(playerCurrentDirection);
		//Rotate Player
		rotatePlayer(inputDirection);
	}

	//Reset input every step if not in a tunnel
	inputDirection = 'none';

}, interval);//Interval

}//End startPlayerInterval

//Handle Death Animation, checking lives, restarting level or game over and prompt to try again restart click
function playerDeath(){
	//Pause All Movements and Collision
	clearMovements();
	//Level is no longer running
	levelStart = false;
	//Update lives
	currentLives--;

	//delay hiding enemies slightly
	deathSoundTimeout = setTimeout(function () {
		//Play Sound
		deathSound.emit('deathEvent',{});
	}, 1350); //Delay

	//delay hiding enemies slightly
	deathAnimTimeout1 = setTimeout(function () {
		//Hide enemies
		ghost1OnBoard.setAttribute('visible', false);
		ghost2OnBoard.setAttribute('visible', false);
		ghost3OnBoard.setAttribute('visible', false);
		ghost4OnBoard.setAttribute('visible', false);
	}, 1000); //Delay

	//play player death animation
	playerAvatar.emit('death',{});
	playerDeathSplash.emit('death',{});
	playerDeathSplash2.emit('death',{});
	playerDeathSplash3.emit('death',{});
	playerDeathSplash4.emit('death',{});
	playerDeathSplash5.emit('death',{});
	playerDeathSplash6.emit('death',{});
	playerDeathSplash7.emit('death',{});
	playerDeathSplash8.emit('death',{});

	//delay till death anim finishes
	deathAnimTimeout2 = setTimeout(function () {

		if(currentLives === 0){
			//game-over
			gameIsOver();
			//console.log('new game');
		} else {
			//Remove extra life
			if(currentLives === 3){
				playerLife3.setAttribute('visible', false);
			} else if(currentLives === 2){
				playerLife2.setAttribute('visible', false);
			}  else if(currentLives === 1){
				playerLife1.setAttribute('visible', false);
			}
			//Restart Level
			levelRestarter();
			//console.log('level restart');
		}
	}, 3500); //Delay


}//End playerDeath

//
//Ghost Functions
//

//
//Ghost 1
//

//Animate Ghost POS movement
function setGhost1Position(pos){

	//Allow time for ghost to move before setting
	ghost1MoveSetPosTimeout = setTimeout(function () {
		//Update phantom 
		ghost1Pos.copy(pos);
	}, stepIntervalGhost1/4); //Delay 

	//Animate Player Movement
	if(ghost1CurrentDirection === 'left' || ghost1CurrentDirection === 'right'){
	moveGhost1Animation = {
		property: 'object3D.position.x',
		to: pos.x,
		dur: stepIntervalGhost1/2,
		delay: 0,
		loop: 'false',
		dir: 'normal',
		easing:'linear',
		elasticity: 400,
		autoplay: 'true',
		enabled: 'true',
		};
	} else {
	moveGhost1Animation = {
		property: 'object3D.position.z',
		to: pos.z,
		dur: stepIntervalGhost1/2,
		delay: 0,
		loop: 'false',
		dir: 'normal',
		easing:'linear',
		elasticity: 400,
		autoplay: 'true',
		enabled: 'true',
		};
	}
	//Set movement animation to Player
	ghost1OnBoard.setAttribute('animation__moveGhost1Animation', moveGhost1Animation);

}//End setGhost1Position

//Rotate Player
function rotateGhost1(direction){

if(direction === "up"){
	//Emit eye movement animation
	ghost1Eye1.emit('lookUp',{});
	ghost1Eye2.emit('lookUp',{});
	ghost1CurrentDirection = 'up';
} else if(direction === "left"){
	//Emit eye movement animation
	ghost1Eye1.emit('lookLeft',{});
	ghost1Eye2.emit('lookLeft',{});
	ghost1CurrentDirection = 'left';
} else if(direction === "right"){
	//Emit eye movement animation
	ghost1Eye1.emit('lookRight',{});
	ghost1Eye2.emit('lookRight',{});
	ghost1CurrentDirection = 'right';
} else if(direction === "down"){
	//Emit eye movement animation
	ghost1Eye1.emit('lookDown',{});
	ghost1Eye2.emit('lookDown',{});
	ghost1CurrentDirection = 'down';
}

}//End rotateGhost1

//Check obstacles by Ghosts Position in Direction and move/prep to move
function moveGhost1(direction){

//Get ghost position
ghost1CurrentPos.copy(ghost1Pos);

//Get player position
ghost1NewPos.copy(ghost1CurrentPos);
//ghost1NewPos.copy(ghost1Pos);

//Init 2nd Move
clearTimeout(ghost1Move2Timeout);

//Move based on Direction
if(direction === 'up' ){
	//Set ghost's new position
	ghost1NewPos.z -= stepDistance;
	//Set movement position
	setGhost1Position(ghost1NewPos);
	//2nd Step Move
	ghost1Move2Timeout = setTimeout(function () {
		//Set ghost's new position
		ghost1NewPos.z -= stepDistance;
		//Set movement position
		setGhost1Position(ghost1NewPos);
		clearTimeout(ghost1Move2Timeout);
	}, stepIntervalGhost1/2); //Delay


} else if(direction === 'left'){
	//Set ghost's new position
	ghost1NewPos.x -= stepDistance;
	//Set movement position
	setGhost1Position(ghost1NewPos);

	//2nd Step Move
	ghost1Move2Timeout = setTimeout(function () {
		//Set ghost's new position
		ghost1NewPos.x -= stepDistance;
		//Set movement position
		setGhost1Position(ghost1NewPos);
		clearTimeout(ghost1Move2Timeout);
	}, stepIntervalGhost1/2); //Delay

	//Check for tunnel
	if (ghost1TunnelTeleport) {
		//Override normal 2nd Step
		clearInterval(ghost1Move2Timeout);
		//Reset tunnelHit
		ghost1TunnelTeleport = false;
		ghost1OnBoard.setAttribute('visible',false);
		//Set movement position slightly out of bounds
		setGhost1Position(mapTunnelsGhost[1]);
		//Reset ghost1TunnelTeleport
		ghost1InTunnel = true;
		//Delay half stepIntervalPlayer, then teleport for tunnel
		ghost1TunnelTimeout = setTimeout(function () {
			//Reset ghost1TunnelTeleport
			ghost1InTunnel = false;
			ghost1OnBoard.setAttribute('visible',true);
			//Clear Timeout
			//clearTimeout(ghost1TunnelTimeout);
		}, stepIntervalGhost1); //Delay for Full Step

	}

} else if(direction === 'right'){
	//Set ghost's new position
	ghost1NewPos.x += stepDistance;
	//Set movement position
	setGhost1Position(ghost1NewPos);
	//2nd Step Move
	ghost1Move2Timeout = setTimeout(function () {
		//Set ghost's new position
		ghost1NewPos.x += stepDistance;
		//Set movement position
		setGhost1Position(ghost1NewPos);
		clearTimeout(ghost1Move2Timeout);
	}, stepIntervalGhost1/2); //Delay

	//Check for tunnel
	if (ghost1TunnelTeleport) {
		//Override normal 2nd Step
		clearInterval(ghost1Move2Timeout);
		//Reset ghost1TunnelTeleport
		ghost1TunnelTeleport = false;
		ghost1OnBoard.setAttribute('visible',false);
		//Set movement position slightly out of bounds
		setGhost1Position(mapTunnelsGhost[0]);
		//Reset ghost1TunnelTeleport
		ghost1InTunnel = true;
		//Delay half stepIntervalGhost1, then teleport for tunnel
		ghost1TunnelTimeout = setTimeout(function () {
			//Reset ghost1TunnelTeleport
			ghost1InTunnel = false;
			ghost1OnBoard.setAttribute('visible',true);
			//Clear Timeout
			//clearTimeout(ghost1TunnelTimeout);
		}, stepIntervalGhost1); //Delay for Full Step

	}

} else if(direction === 'down'){
	//Set ghost's new position
	ghost1NewPos.z += stepDistance;

	//Set movement position
	setGhost1Position(ghost1NewPos);

	//2nd Step Move
	ghost1Move2Timeout = setTimeout(function () {
		//Set ghost's new position
		ghost1NewPos.z += stepDistance;
		//Set movement position
		setGhost1Position(ghost1NewPos);
		clearTimeout(ghost1Move2Timeout);
		}, stepIntervalGhost1/2); //Delay for Full Step
}//End if/else

}//End moveGhost1

//Ghost 1 Decision making for movement
function ghost1Input(){

//Get current player position
ghost1CurrentPosAtInput.copy(ghost1Pos);

//Reset availablePaths array
ghost1AvailablePaths = [];

//Depending on current direction assign up, down, left or right
//Relative to currentDirection path

//Depending on direction, assign X or Z to be checked for integer
if(ghost1CurrentDirection === 'up'){
	//Set Integer Check
	ghost1CheckXorZ = ghost1CurrentPosAtInput.z;
	//Set Current Path Directions
	ghost1PathReverse = 'down';
	ghost1PathTurn1 = 'left';
	ghost1PathTurn2 = 'right';

} else if(ghost1CurrentDirection === 'down') {
	//Set Integer Check
	ghost1CheckXorZ = ghost1CurrentPosAtInput.z;
	//Set Current Path Directions
	ghost1PathReverse = 'up';
	ghost1PathTurn1 = 'left';
	ghost1PathTurn2 = 'right';

} else if(ghost1CurrentDirection === 'left') {
	//Set Integer Check
	ghost1CheckXorZ = ghost1CurrentPosAtInput.x;
	//Set Current Path Directions
	ghost1PathReverse = 'right';
	ghost1PathTurn1 = 'up';
	ghost1PathTurn2 = 'down';

} else if(ghost1CurrentDirection === 'right'){
	//Set Integer Check
	ghost1CheckXorZ = ghost1CurrentPosAtInput.x;
	//Set Current Path Directions
	ghost1PathReverse = 'left';
	ghost1PathTurn1 = 'up';
	ghost1PathTurn2 = 'down';
}

//Ghost is at integer location, check for available movement
if(Number.isInteger(ghost1CheckXorZ)){

	//Check for Current Direction obstacles
	if(checkMapObstacles(ghost1CurrentPosAtInput, ghost1CurrentDirection,'ghost1')){
		//Current direction clear, append available paths
		ghost1AvailablePaths.push(ghost1CurrentDirection);
	}

	//Check for Current Direction obstacles
	if(checkMapObstacles(ghost1CurrentPosAtInput, ghost1PathReverse,'ghost1')){
		//Current direction clear, append available paths
		ghost1AvailablePaths.push(ghost1PathReverse);
	}

	//Check for Current Direction obstacles
	if(checkMapObstacles(ghost1CurrentPosAtInput, ghost1PathTurn1,'ghost1')){
		//Current direction clear, append available paths
		ghost1AvailablePaths.push(ghost1PathTurn1);
	}

	//Check for Current Direction obstacles
	if(checkMapObstacles(ghost1CurrentPosAtInput, ghost1PathTurn2,'ghost1')){
		//Current direction clear, append available paths
		ghost1AvailablePaths.push(ghost1PathTurn2);
	}

}

//
//Pathfinding
//

//Is ghost continuing the same direction as before?
ghost1Continue: if(ghost1ContinuePathfind){

	//Special finishing move before recalc
	if(ghost1PathMoves === -1){
		ghost1ContinuePathfind = false;

		if(ghost1AvailablePaths.includes(ghost1PathFirst)){
			ghost1AvailablePaths = [ghost1PathFirst];
		}

	} else if(ghost1PathMoves < 6){
		ghost1PathMoves++;

		if(ghost1PathfinderDirections.length === 1){
			//1 optimal direction at check

			if(ghost1CheckMainDirection){
				if(ghost1AvailablePaths.includes(ghost1PathfinderDirections[0])){
					//keep checking if the only ghost1PathfinderDirections[0] is ready
					//if so, take it and stop continue path for new path calc
					ghost1AvailablePaths = [ghost1PathfinderDirections[0]];
					ghost1ContinuePathfind = false;

					//Break out of if/else checks to go directly to assigning move
					break ghost1Continue;
				}
			}

			if(ghost1AvailablePaths.includes(ghost1PathFirst)){
				//Else check if ghost1PathFirst direction is still good
				//if so, take it and add keep continuing ghost1PathfinderDirections[0] checks
				ghost1AvailablePaths = [ghost1PathFirst];
				//Ensure we check for main direction next round
				ghost1CheckMainDirection = true;

			} else {
				//if both of those are blocked
				//change current direction to opposite of ghost1PathfinderDirections[0]
				//continue path and will stop looking for ghost1PathfinderDirections[0] temp, but look for ghost1PathFirst direction instead
				//while moving in the opposite of ghost1PathfinderDirections[0] when ghost1PathFirst direction hits, take it and continue path calc

				if(ghost1PathfinderDirections[0] === 'up'){
					if(ghost1AvailablePaths.includes('down')){
						ghost1AvailablePaths = ['down'];
					}
					ghost1CheckMainDirection = false;
				} else if(ghost1PathfinderDirections[0] === 'right'){
					if(ghost1AvailablePaths.includes('left')){
						ghost1AvailablePaths = ['left'];
					}
					ghost1CheckMainDirection = false;
				} else if(ghost1PathfinderDirections[0] === 'down'){
					if(ghost1AvailablePaths.includes('up')){
						ghost1AvailablePaths = ['up'];
					}
					ghost1CheckMainDirection = false;
				} else if(ghost1PathfinderDirections[0] === 'left'){
					if(ghost1AvailablePaths.includes('right')){
						ghost1AvailablePaths = ['right'];
					}
					ghost1CheckMainDirection = false;
				}

			}//End 1 optimal direction path check

		} else {
			//2 optimal directions at check

			if(ghost1CheckMainDirection){
				if(ghost1AvailablePaths.includes(ghost1PathOriginalDirection)){
					//keep checking for ghost1PathOriginalDirection is ready
					//When that hits, take it and set to -1 for finishing move of
					//the opposite direction of ghost1PathFirst
					ghost1AvailablePaths = [ghost1PathOriginalDirection];
					ghost1PathMoves = -1;

					//Break out of if/else checks to go directly to assigning move
					break ghost1Continue;
				}
			}

			if(ghost1AvailablePaths.includes(ghost1PathFirst)){
				//Else continue path of ghost1PathFirst
				ghost1AvailablePaths = [ghost1PathFirst];
				//Ensure we check for main direction next round
				ghost1CheckMainDirection = true;

			} else {
				//If continue path of ghost1PathFirst fails and ghost1PathOriginalDirection is still not ready
				//Then go opposite of ghost1PathOriginalDirection until ghost1PathFirst hits again
				//When that hits, -1 with a finishing move of ghost1PathOriginalDirection

				if(ghost1PathOriginalDirection === 'up'){
					if(ghost1AvailablePaths.includes('down')){
						ghost1AvailablePaths = ['down'];
					}
					ghost1CheckMainDirection = false;
				} else if(ghost1PathOriginalDirection === 'right'){
					if(ghost1AvailablePaths.includes('left')){
						ghost1AvailablePaths = ['left'];
					}
					ghost1CheckMainDirection = false;
				} else if(ghost1PathOriginalDirection === 'down'){
					if(ghost1AvailablePaths.includes('up')){
						ghost1AvailablePaths = ['up'];
					}
					ghost1CheckMainDirection = false;
				} else if(ghost1PathOriginalDirection === 'left'){
					if(ghost1AvailablePaths.includes('right')){
						ghost1AvailablePaths = ['right'];
					}
					ghost1CheckMainDirection = false;
				}

			}

		}//End pathfind length check

	} else {
		//Failed to find a path, move in any available direction and recalc
		ghost1ContinuePathfind = false;

	}//End check amount of moves and previous move still good

} else {
//Starting new path

//Pathfind is enabled, start path
if(ghost1Pathfind){
//Clear previous pathfinding directions
ghost1PathOriginalDirection = '';
ghost1CheckMainDirection = true;
ghost1PathfinderDirections = [];
ghost1RemainingPaths = [];
ghost1PathAvailableTemp = []
ghost1PathMoves = 0;

//Use this ghosts position as start and the players as end
ghost1PathfinderDirections = pathfinder(ghost1CurrentPosAtInput,playerPos);

//use the returned array to check with ghost1AvailablePaths array for available directions to choose from

//ghost1PathfinderDirections
//has 0(error/ignore), 1 or 2 directions to choose from
if(ghost1PathfinderDirections.length > 0){
	//Loop through available directions to choose from
	//See if any match pathfinding directions, if so choose from those
	//Else choose any other available path
	for(let i = 0; i < ghost1PathfinderDirections.length; i++){
		if(ghost1AvailablePaths.includes(ghost1PathfinderDirections[i])){
			//Optimal direction is available
			ghost1RemainingPaths.push(ghost1PathfinderDirections[i]);
		}

	}
//console.log(ghost1RemainingPaths);
}

//If any pathfind direction's are available, use them. Otherwise continue path
if(ghost1RemainingPaths.length > 0){
	ghost1AvailablePaths = ghost1RemainingPaths;

} else {
	//All pathfinding directions are blocked
	ghost1ContinuePathfind = true;
	ghost1PathMoves = 1;

	if(ghost1PathfinderDirections.length === 1){
		//Only 1 optimal direction is found and is blocked

		if(ghost1PathfinderDirections[0] === 'up'){
			//Need to move Upwards

			if(ghost1CurrentDirection === 'up'){
				//Traveling upwards when blocked
				ghost1PathOriginalDirection = 'up';

				//Check if 1 or both perpindicular directions are available
				if(ghost1AvailablePaths.includes('left')){
					ghost1PathAvailableTemp.push('left');
				}
				if(ghost1AvailablePaths.includes('right')){
					ghost1PathAvailableTemp.push('right');
				}
				//Choose the only 1 available, unless there are 2 then either
				if(ghost1PathAvailableTemp.length > 1){
					if(Math.floor(Math.random()*2) > 0){
						ghost1AvailablePaths = [ghost1PathAvailableTemp[1]];
						ghost1PathFirst = ghost1PathAvailableTemp[1];
					} else {
						ghost1AvailablePaths = [ghost1PathAvailableTemp[0]];
						ghost1PathFirst = ghost1PathAvailableTemp[0];
					}
				} else {
					ghost1AvailablePaths = [ghost1PathAvailableTemp[0]];
					ghost1PathFirst = ghost1PathAvailableTemp[0];
				}
				
			} else if(ghost1CurrentDirection === 'left'){
				//Traveling left when up is checked and blocked
				ghost1PathOriginalDirection = 'left';

				//Check if the current direction is still available
				if(ghost1AvailablePaths.includes('left')){
					ghost1AvailablePaths = ['left'];
					ghost1PathFirst = 'left';
				} else {
					//Up and Left are blocked, coming from the right. Go down
					if(ghost1AvailablePaths.includes('down')){
						ghost1AvailablePaths = ['down'];
						ghost1PathFirst = 'down';
					}
				}
			} else if(ghost1CurrentDirection === 'right'){
				//Traveling right when up is checked and blocked
				ghost1PathOriginalDirection = 'right';

				//Check if the current direction is still available
				if(ghost1AvailablePaths.includes('right')){
					ghost1AvailablePaths = ['right'];
					ghost1PathFirst = 'right';
				} else {
					//Up and Right are blocked, coming from the right. Go down
					if(ghost1AvailablePaths.includes('down')){
						ghost1AvailablePaths = ['down'];
						ghost1PathFirst = 'down';
					}
				}
			}

		} else if(ghost1PathfinderDirections[0] === 'right'){
			//Need to move to the Right

			if(ghost1CurrentDirection === 'right'){
				//Traveling right when blocked
				ghost1PathOriginalDirection = 'right';

				//Check if 1 or both perpindicular directions are available
				if(ghost1AvailablePaths.includes('up')){
					ghost1PathAvailableTemp.push('up');
				}
				if(ghost1AvailablePaths.includes('down')){
					ghost1PathAvailableTemp.push('down');
				}
				//Choose the only 1 available, unless there are 2 then either
				if(ghost1PathAvailableTemp.length > 1){
					if(Math.floor(Math.random()*2) > 0){
						ghost1AvailablePaths = [ghost1PathAvailableTemp[1]];
						ghost1PathFirst = ghost1PathAvailableTemp[1];
					} else {
						ghost1AvailablePaths = [ghost1PathAvailableTemp[0]];
						ghost1PathFirst = ghost1PathAvailableTemp[0];
					}
				} else {
					ghost1AvailablePaths = [ghost1PathAvailableTemp[0]];
					ghost1PathFirst = ghost1PathAvailableTemp[0];
				}
				
			} else if(ghost1CurrentDirection === 'up'){
				//Traveling up when right is checked and blocked
				ghost1PathOriginalDirection = 'up';

				//Check if the current direction is still available
				if(ghost1AvailablePaths.includes('up')){
					ghost1AvailablePaths = ['up'];
					ghost1PathFirst = 'up';
				} else {
					//Up and Left are blocked, coming from the right. Go down
					if(ghost1AvailablePaths.includes('left')){
						ghost1AvailablePaths = ['left'];
						ghost1PathFirst = 'left';
					}
				}
			} else if(ghost1CurrentDirection === 'down'){
				//Traveling down when right is checked and blocked
				ghost1PathOriginalDirection = 'down';

				//Check if the current direction is still available
				if(ghost1AvailablePaths.includes('down')){
					ghost1AvailablePaths = ['down'];
					ghost1PathFirst = 'down';
				} else {
					//Up and Right are blocked, coming from the right. Go down
					if(ghost1AvailablePaths.includes('left')){
						ghost1AvailablePaths = ['left'];
						ghost1PathFirst = 'left';
					}
				}
			}

		} else if(ghost1PathfinderDirections[0] === 'down'){
			//Need to move Downwards

			if(ghost1CurrentDirection === 'down'){
				//Traveling downwards when blocked
				ghost1PathOriginalDirection = 'down';

				//Check if 1 or both perpindicular directions are available
				if(ghost1AvailablePaths.includes('left')){
					ghost1PathAvailableTemp.push('left');
				}
				if(ghost1AvailablePaths.includes('right')){
					ghost1PathAvailableTemp.push('right');
				}
				//Choose the only 1 available, unless there are 2 then either
				if(ghost1PathAvailableTemp.length > 1){
					if(Math.floor(Math.random()*2) > 0){
						ghost1AvailablePaths = [ghost1PathAvailableTemp[1]];
						ghost1PathFirst = ghost1PathAvailableTemp[1];
					} else {
						ghost1AvailablePaths = [ghost1PathAvailableTemp[0]];
						ghost1PathFirst = ghost1PathAvailableTemp[0];
					}
				} else {
					ghost1AvailablePaths = [ghost1PathAvailableTemp[0]];
					ghost1PathFirst = ghost1PathAvailableTemp[0];
				}
				
			} else if(ghost1CurrentDirection === 'left'){
				//Traveling left when down is checked and blocked
				ghost1PathOriginalDirection = 'left';

				//Check if the current direction is still available
				if(ghost1AvailablePaths.includes('left')){
					ghost1AvailablePaths = ['left'];
					ghost1PathFirst = 'left';
				} else {
					//Up and Left are blocked, coming from the right. Go down
					if(ghost1AvailablePaths.includes('up')){
						ghost1AvailablePaths = ['up'];
						ghost1PathFirst = 'up';
					}
				}
			} else if(ghost1CurrentDirection === 'right'){
				//Traveling right when down is checked and blocked
				ghost1PathOriginalDirection = 'right';

				//Check if the current direction is still available
				if(ghost1AvailablePaths.includes('right')){
					ghost1AvailablePaths = ['right'];
					ghost1PathFirst = 'right';
				} else {
					//Up and Right are blocked, coming from the right. Go down
					if(ghost1AvailablePaths.includes('up')){
						ghost1AvailablePaths = ['up'];
						ghost1PathFirst = 'up';
					}
				}
			}

		} else if(ghost1PathfinderDirections[0] === 'left'){
			//Need to move to the Left

			if(ghost1CurrentDirection === 'left'){
				//Traveling left when blocked
				ghost1PathOriginalDirection = 'left';

				//Check if 1 or both perpindicular directions are available
				if(ghost1AvailablePaths.includes('up')){
					ghost1PathAvailableTemp.push('up');
				}
				if(ghost1AvailablePaths.includes('down')){
					ghost1PathAvailableTemp.push('down');
				}
				//Choose the only 1 available, unless there are 2 then either
				if(ghost1PathAvailableTemp.length > 1){
					if(Math.floor(Math.random()*2) > 0){
						ghost1AvailablePaths = [ghost1PathAvailableTemp[1]];
						ghost1PathFirst = ghost1PathAvailableTemp[1];
					} else {
						ghost1AvailablePaths = [ghost1PathAvailableTemp[0]];
						ghost1PathFirst = ghost1PathAvailableTemp[0];
					}
				} else {
					ghost1AvailablePaths = [ghost1PathAvailableTemp[0]];
					ghost1PathFirst = ghost1PathAvailableTemp[0];
				}
				
			} else if(ghost1CurrentDirection === 'up'){
				//Traveling up when left is checked and blocked
				ghost1PathOriginalDirection = 'up';

				//Check if the current direction is still available
				if(ghost1AvailablePaths.includes('up')){
					ghost1AvailablePaths = ['up'];
					ghost1PathFirst = 'up';
				} else {
					//Up and Left are blocked, coming from the left. Go right
					if(ghost1AvailablePaths.includes('right')){
						ghost1AvailablePaths = ['right'];
						ghost1PathFirst = 'right';
					}
				}
			} else if(ghost1CurrentDirection === 'down'){
				//Traveling down when left is checked and blocked
				ghost1PathOriginalDirection = 'down';

				//Check if the current direction is still available
				if(ghost1AvailablePaths.includes('down')){
					ghost1AvailablePaths = ['down'];
					ghost1PathFirst = 'down';
				} else {
					//Up and Left are blocked, coming from the left. Go right
					if(ghost1AvailablePaths.includes('right')){
						ghost1AvailablePaths = ['right'];
						ghost1PathFirst = 'right';
					}
				}
			}

		}//End directionCheck within a single optimal direction
	} else {
		//2 optimal directions found and both are blocked

		if(ghost1CurrentDirection === 'up'){
			//Traveling up when up and another is blocked
			ghost1PathOriginalDirection = 'up';

			if(ghost1PathfinderDirections.includes('left')){
				//The other direction is left, which is blocked
				ghost1AvailablePaths = ['right'];
				ghost1PathFirst = 'right';
			} else if(ghost1PathfinderDirections.includes('right')){
				//The other direction is right, which is blocked
				ghost1AvailablePaths = ['left'];
				ghost1PathFirst = 'left';
			}

		} else if(ghost1CurrentDirection === 'right'){
			//Traveling right when up and another is blocked
			ghost1PathOriginalDirection = 'right';

			if(ghost1PathfinderDirections.includes('up')){
				//The other direction is up, which is blocked
				ghost1AvailablePaths = ['down'];
				ghost1PathFirst = 'down';
			} else if(ghost1PathfinderDirections.includes('down')){
				//The other direction is down, which is blocked
				ghost1AvailablePaths = ['up'];
				ghost1PathFirst = 'up';
			}

		} else if(ghost1CurrentDirection === 'down'){
			//Traveling down when up and another is blocked
			ghost1PathOriginalDirection = 'down';

			if(ghost1PathfinderDirections.includes('left')){
				//The other direction is left, which is blocked
				ghost1AvailablePaths = ['right'];
				ghost1PathFirst = 'right';
			} else if(ghost1PathfinderDirections.includes('right')){
				//The other direction is right, which is blocked
				ghost1AvailablePaths = ['left'];
				ghost1PathFirst = 'left';
			}

		} else if(ghost1CurrentDirection === 'left'){
			//Traveling left when up and another is blocked
			ghost1PathOriginalDirection = 'left';

			if(ghost1PathfinderDirections.includes('up')){
				//The other direction is up, which is blocked
				ghost1AvailablePaths = ['down'];
				ghost1PathFirst = 'down';
			} else if(ghost1PathfinderDirections.includes('down')){
				//The other direction is down, which is blocked
				ghost1AvailablePaths = ['up'];
				ghost1PathFirst = 'up';
			}

		}//End 2 optimal path direction check

	}//End if 1 or 2 optimal paths being blocked

}//End if ghost1RemainingPaths is full or empty

}//End if ghostPathfind is enabled

}//End if ghost1ContinuePathfind is enabled




//
//Scatter | Random Movements
//

//Randomize Choice
ghost1Chance = Math.floor(Math.random()*100);

if(ghost1PowerUpHit){
	//Reverse hit
	rotateGhost1(ghost1PathReverse);
	moveGhost1(ghost1PathReverse);
	ghost1PowerUpHit = false;
	//disable pathfinding on power up
	//re-enable on respawn
} else{

	//If only 1 move is available, i.e. pathfinding ignore and do that
	if(ghost1AvailablePaths.length === 1){
		rotateGhost1(ghost1AvailablePaths[0]);
		moveGhost1(ghost1AvailablePaths[0]);

	} else if(ghost1AvailablePaths.length === 2){
	//Check if only 2 paths which will always include reverse. That is least likely to be choosen so select other most of the time
	//Forward, Reverse
	//Reverse, Turn 1
	//Reverse, Turn 2

		//When optimal paths are available, choose equally from them
		if(ghost1Pathfind){

			//Chance of choosing 1 direction over the other
			if(ghost1Chance >= 50){
				rotateGhost1(ghost1AvailablePaths[0]);
				moveGhost1(ghost1AvailablePaths[0]);
			} else {
				//Assign other available direction
				rotateGhost1(ghost1AvailablePaths[1]);
				moveGhost1(ghost1AvailablePaths[1]);
			}

		} else {

			//Chance of reversing direction at 4%
			if(ghost1Chance >= 96){
				//Reverse hit
				rotateGhost1(ghost1PathReverse);
				moveGhost1(ghost1PathReverse);

			} else {

				//Select other available path
				if(ghost1AvailablePaths.indexOf(ghost1PathReverse) === 0){
					//Assign other available direction
					rotateGhost1(ghost1AvailablePaths[1]);
					moveGhost1(ghost1AvailablePaths[1]);

				} else {
					//Assign other available direction
					rotateGhost1(ghost1AvailablePaths[0]);
					moveGhost1(ghost1AvailablePaths[0]);
				}

			}

		}

	} else if(ghost1AvailablePaths.length === 3){
	//Reverse, Turn 1, Turn 2
	//Forward, Reverse, Turn 1
	//Forward, Reverse, Turn 2

		//Chance of reversing direction at 4%
		if(ghost1Chance >= 96){
			//Reverse hit
			rotateGhost1(ghost1PathReverse);
			moveGhost1(ghost1PathReverse);

		} else {
			//Select other available path

			//Remove reverse direction from path array
			ghost1AvailablePaths.splice(ghost1AvailablePaths.indexOf(ghost1PathReverse), 1);

			//start with a 50/50 chance of choosing direction
			if(ghost1Chance > 50){
				//Direction 0 hit
				rotateGhost1(ghost1AvailablePaths[0]);
				moveGhost1(ghost1AvailablePaths[0]);

			} else {
				//Direction 1 hit
				rotateGhost1(ghost1AvailablePaths[1]);
				moveGhost1(ghost1AvailablePaths[1]);

			}

		}

	} else if(ghost1AvailablePaths.length === 4){
	//Forward, Reverse, Turn 1, Turn 2

		//Chance of reversing direction at 4%
		if(ghost1Chance >= 96){
			//Reverse hit
			rotateGhost1(ghost1PathReverse);
			moveGhost1(ghost1PathReverse);

		} else {
			//Select other available path
			//Remove reverse direction from path array
			ghost1AvailablePaths.splice(ghost1AvailablePaths.indexOf(ghost1PathReverse), 1);

			if(ghost1Chance < 96 && ghost1Chance >= 68 ){
				//Direction 0 hit
				rotateGhost1(ghost1AvailablePaths[0]);
				moveGhost1(ghost1AvailablePaths[0]);

			} else if(ghost1Chance < 68 && ghost1Chance >= 32 ){
				//Direction 1 hit
				rotateGhost1(ghost1AvailablePaths[1]);
				moveGhost1(ghost1AvailablePaths[1]);

			} else if(ghost1Chance < 32 && ghost1Chance >= 0 ){
				//Direction 2 hit
				rotateGhost1(ghost1AvailablePaths[2]);
				moveGhost1(ghost1AvailablePaths[2]);

			}

		}

	}//End if/else ghost1AvailablePaths length check

}//End if power up just hit

}//End ghost1Input

//Ghost1 Path Switching Chances on Collected Dots
function ghost1PathSwitching(){

//Check ghost start chase minimum
if(ghost1ChaseCheckIteration === 0){

	if(eatenDots >= maxDots * ghost1StartChaseTo){
		ghost1Pathfind = true;
		ghost1ChaseCheckIteration++;
	}

} else if(ghost1ChaseCheckIteration >= 1){
	//Check minimum start + interation increase of %
	if(eatenDots >= maxDots * (ghost1StartChaseTo + (switchChaseCheck * ghost1ChaseCheckIteration))){

		//Check percentage chase to swap ghostPathfind
		if(ghost1Pathfind){
			if(Math.floor(Math.random()*100) <= ghost1SwitchChaseChance){
				ghost1Pathfind = false;
			}
		} else {
			if(Math.floor(Math.random()*100) >= ghost1SwitchChaseChance){
				ghost1Pathfind = true;
			}
		}
		//Decrease chance of switching away from chase
		ghost1SwitchChaseChance -= 4;
		//Increase iteration check
		ghost1ChaseCheckIteration++;

	}//Eaten dots increasing percentage check

}//End if/else

}//End ghost1PathSwitching

//Power Down
function powerDownGhost1(){
	//Ghost 1
	ghost1PoweredUp = false;
	//Reset ghost material animation change
	ghost1Eye1Socket.emit('poweredDown',{});
	ghost1Eye1.emit('poweredDown',{});
	ghost1Eye2Socket.emit('poweredDown',{});
	ghost1Eye2.emit('poweredDown',{});
	ghost1Mouth.emit('poweredDown',{});
	ghost1Spin.emit('poweredDown',{});
	ghost1Head.emit('poweredDown',{});
	ghost1Body.emit('poweredDown',{});
	ghost1Legs1.emit('poweredDown',{});
	ghost1Legs2.emit('poweredDown',{});
	ghost1Legs3.emit('poweredDown',{});
	ghost1Legs4.emit('poweredDown',{});
}

//Reset Ghost
function resetGhost1(){
	//Ghost1
	ghost1Hit = false;
	ghost1PoweredUp = false;
	ghost1PowerUpHit = false;
	ghost1RecentDeath = false;
	ghost1Start = false;
	clearTimeout(ghost1StartTimeout0);
	clearTimeout(ghost1StartTimeout);
	clearTimeout(ghost1ReturnTimeout);
	clearTimeout(ghost1ReturnTimeout2);
	ghost1OnBoard.setAttribute('visible', true);
	ghost1Spin.setAttribute('visible', true);
	//Currently Choosen Direction
	ghost1InputDirection = 'none';
	//Spawn at 0 0 -1 and Facing Up
	ghost1Pos.copy(ghost1Spawn);
	ghost1CurrentDirection = 'left';
	ghost1OnBoard.object3D.position.copy(ghost1Pos);
	//Tunnel teleporting and decision blocking delays
	ghost1TunnelHit = false;
	ghost1TunnelTeleport = false;
	ghost1InTunnel = false;
	moveGhost1Animation = {};
	ghost1OnBoard.setAttribute('animation__moveGhost1Animation', moveGhost1Animation);
	ghost1CheckForPathSwitch = true;
	if(poweredUp){
		ghost1Pathfind = ghost1PathfindPreviously;
	}
}

//startGhost1Interval
function startGhost1Interval(interval) {

ghost1Interval = setInterval(function() {

	//Update that Ghost has started
	ghost1Start = true;

	if(ghost1InTunnel){
	//In tunnel, auto move no thoughts
		moveGhost1(ghost1CurrentDirection);
	} else {
		//Choose Ghost move
		ghost1Input();
	}//end ghost1InTunnel exception

}, interval);//Interval

}//End startGhost1Interval

//
//Ghost 2
//

//Animate Ghost POS movement
function setGhost2Position(pos){

	//Allow time for ghost to move before setting
	ghost2MoveSetPosTimeout = setTimeout(function () {
		//Update phantom 
		ghost2Pos.copy(pos);
	}, stepIntervalGhost2/4); //Delay 

	//Animate Player Movement
	if(ghost2CurrentDirection === 'left' || ghost2CurrentDirection === 'right'){
	moveGhost2Animation = {
		property: 'object3D.position.x',
		to: pos.x,
		dur: stepIntervalGhost2/2,
		delay: 0,
		loop: 'false',
		dir: 'normal',
		easing:'linear',
		elasticity: 400,
		autoplay: 'true',
		enabled: 'true',
		};
	} else {
	moveGhost2Animation = {
		property: 'object3D.position.z',
		to: pos.z,
		dur: stepIntervalGhost2/2,
		delay: 0,
		loop: 'false',
		dir: 'normal',
		easing:'linear',
		elasticity: 400,
		autoplay: 'true',
		enabled: 'true',
		};
	}
	//Set movement animation to Player
	ghost2OnBoard.setAttribute('animation__moveGhost2Animation', moveGhost2Animation);

}//End setGhost2Position

//Rotate Ghost 2
function rotateGhost2(direction){

if(direction === "up"){
	//Emit eye movement animation
	ghost2Eye1.emit('lookUp',{});
	ghost2Eye2.emit('lookUp',{});
	ghost2CurrentDirection = 'up';
} else if(direction === "left"){
	//Emit eye movement animation
	ghost2Eye1.emit('lookLeft',{});
	ghost2Eye2.emit('lookLeft',{});
	ghost2CurrentDirection = 'left';
} else if(direction === "right"){
	//Emit eye movement animation
	ghost2Eye1.emit('lookRight',{});
	ghost2Eye2.emit('lookRight',{});
	ghost2CurrentDirection = 'right';
} else if(direction === "down"){
	//Emit eye movement animation
	ghost2Eye1.emit('lookDown',{});
	ghost2Eye2.emit('lookDown',{});
	ghost2CurrentDirection = 'down';
}

}//End rotateGhost2

//Check obstacles by Ghosts Position in Direction and move/prep to move
function moveGhost2(direction){

//Get ghost position
ghost2CurrentPos.copy(ghost2Pos);

//Get player position
ghost2NewPos.copy(ghost2CurrentPos);
//ghost2NewPos.copy(ghost2Pos);

//Init 2nd Move
clearTimeout(ghost2Move2Timeout);

//Move based on Direction
if(direction === 'up' ){
	//Set ghost's new position
	ghost2NewPos.z -= stepDistance;
	//Set movement position
	setGhost2Position(ghost2NewPos);
	//2nd Step Move
	ghost2Move2Timeout = setTimeout(function () {
		//Set ghost's new position
		ghost2NewPos.z -= stepDistance;
		//Set movement position
		setGhost2Position(ghost2NewPos);
		clearTimeout(ghost2Move2Timeout);
	}, stepIntervalGhost2/2); //Delay


} else if(direction === 'left'){
	//Set ghost's new position
	ghost2NewPos.x -= stepDistance;
	//Set movement position
	setGhost2Position(ghost2NewPos);

	//2nd Step Move
	ghost2Move2Timeout = setTimeout(function () {
		//Set ghost's new position
		ghost2NewPos.x -= stepDistance;
		//Set movement position
		setGhost2Position(ghost2NewPos);
		clearTimeout(ghost2Move2Timeout);
	}, stepIntervalGhost2/2); //Delay

	//Check for tunnel
	if (ghost2TunnelTeleport) {
		//Override normal 2nd Step
		clearInterval(ghost2Move2Timeout);
		//Reset tunnelHit
		ghost2TunnelTeleport = false;
		ghost2OnBoard.setAttribute('visible',false);
		//Set movement position slightly out of bounds
		setGhost2Position(mapTunnelsGhost[1]);
		//Reset ghost2TunnelTeleport
		ghost2InTunnel = true;
		//Delay half stepIntervalPlayer, then teleport for tunnel
		ghost2TunnelTimeout = setTimeout(function () {
			//Reset ghost2TunnelTeleport
			ghost2InTunnel = false;
			ghost2OnBoard.setAttribute('visible',true);
			//Clear Timeout
			//clearTimeout(ghost2TunnelTimeout);
		}, stepIntervalGhost2); //Delay for Full Step

	}

} else if(direction === 'right'){
	//Set ghost's new position
	ghost2NewPos.x += stepDistance;
	//Set movement position
	setGhost2Position(ghost2NewPos);
	//2nd Step Move
	ghost2Move2Timeout = setTimeout(function () {
		//Set ghost's new position
		ghost2NewPos.x += stepDistance;
		//Set movement position
		setGhost2Position(ghost2NewPos);
		clearTimeout(ghost2Move2Timeout);
	}, stepIntervalGhost2/2); //Delay

	//Check for tunnel
	if (ghost2TunnelTeleport) {
		//Override normal 2nd Step
		clearInterval(ghost2Move2Timeout);
		//Reset ghost2TunnelTeleport
		ghost2TunnelTeleport = false;
		ghost2OnBoard.setAttribute('visible',false);
		//Set movement position slightly out of bounds
		setGhost2Position(mapTunnelsGhost[0]);
		//Reset ghost2TunnelTeleport
		ghost2InTunnel = true;
		//Delay half stepIntervalGhost2, then teleport for tunnel
		ghost2TunnelTimeout = setTimeout(function () {
			//Reset ghost2TunnelTeleport
			ghost2InTunnel = false;
			ghost2OnBoard.setAttribute('visible',true);
			//Clear Timeout
			//clearTimeout(ghost2TunnelTimeout);
		}, stepIntervalGhost2); //Delay for Full Step

	}

} else if(direction === 'down'){
	//Set ghost's new position
	ghost2NewPos.z += stepDistance;

	//Set movement position
	setGhost2Position(ghost2NewPos);

	//2nd Step Move
	ghost2Move2Timeout = setTimeout(function () {
		//Set ghost's new position
		ghost2NewPos.z += stepDistance;
		//Set movement position
		setGhost2Position(ghost2NewPos);
		clearTimeout(ghost2Move2Timeout);
		}, stepIntervalGhost2/2); //Delay for Full Step
}//End if/else

}//End moveGhost2

//Ghost 2 Decision making for movement
function ghost2Input(){

//Get current player position
ghost2CurrentPosAtInput.copy(ghost2Pos);

//Reset availablePaths array
ghost2AvailablePaths = [];

//Depending on current direction assign up, down, left or right
//Relative to currentDirection path

//Depending on direction, assign X or Z to be checked for integer
if(ghost2CurrentDirection === 'up'){
	//Set Integer Check
	ghost2CheckXorZ = ghost2CurrentPosAtInput.z;
	//Set Current Path Directions
	ghost2PathReverse = 'down';
	ghost2PathTurn1 = 'left';
	ghost2PathTurn2 = 'right';

} else if(ghost2CurrentDirection === 'down') {
	//Set Integer Check
	ghost2CheckXorZ = ghost2CurrentPosAtInput.z;
	//Set Current Path Directions
	ghost2PathReverse = 'up';
	ghost2PathTurn1 = 'left';
	ghost2PathTurn2 = 'right';

} else if(ghost2CurrentDirection === 'left') {
	//Set Integer Check
	ghost2CheckXorZ = ghost2CurrentPosAtInput.x;
	//Set Current Path Directions
	ghost2PathReverse = 'right';
	ghost2PathTurn1 = 'up';
	ghost2PathTurn2 = 'down';

} else if(ghost2CurrentDirection === 'right'){
	//Set Integer Check
	ghost2CheckXorZ = ghost2CurrentPosAtInput.x;
	//Set Current Path Directions
	ghost2PathReverse = 'left';
	ghost2PathTurn1 = 'up';
	ghost2PathTurn2 = 'down';
}

//Ghost is at integer location, check for available movement
if(Number.isInteger(ghost2CheckXorZ)){

	//Check for Current Direction obstacles
	if(checkMapObstacles(ghost2CurrentPosAtInput, ghost2CurrentDirection,'ghost2')){
		//Current direction clear, append available paths
		ghost2AvailablePaths.push(ghost2CurrentDirection);
	}

	//Check for Current Direction obstacles
	if(checkMapObstacles(ghost2CurrentPosAtInput, ghost2PathReverse,'ghost2')){
		//Current direction clear, append available paths
		ghost2AvailablePaths.push(ghost2PathReverse);
	}

	//Check for Current Direction obstacles
	if(checkMapObstacles(ghost2CurrentPosAtInput, ghost2PathTurn1,'ghost2')){
		//Current direction clear, append available paths
		ghost2AvailablePaths.push(ghost2PathTurn1);
	}

	//Check for Current Direction obstacles
	if(checkMapObstacles(ghost2CurrentPosAtInput, ghost2PathTurn2,'ghost2')){
		//Current direction clear, append available paths
		ghost2AvailablePaths.push(ghost2PathTurn2);
	}

}

//
//Pathfinding
//

//Is ghost continuing the same direction as before?
ghost2Continue: if(ghost2ContinuePathfind){

	//Special finishing move before recalc
	if(ghost2PathMoves === -1){
		ghost2ContinuePathfind = false;

		if(ghost2AvailablePaths.includes(ghost2PathFirst)){
			ghost2AvailablePaths = [ghost2PathFirst];
		}

	} else if(ghost2PathMoves < 6){
		ghost2PathMoves++;

		if(ghost2PathfinderDirections.length === 1){
			//1 optimal direction at check

			if(ghost2CheckMainDirection){
				if(ghost2AvailablePaths.includes(ghost2PathfinderDirections[0])){
					//keep checking if the only ghost2PathfinderDirections[0] is ready
					//if so, take it and stop continue path for new path calc
					ghost2AvailablePaths = [ghost2PathfinderDirections[0]];
					ghost2ContinuePathfind = false;

					//Break out of if/else checks to go directly to assigning move
					break ghost2Continue;
				}
			}

			if(ghost2AvailablePaths.includes(ghost2PathFirst)){
				//Else check if ghost2PathFirst direction is still good
				//if so, take it and add keep continuing ghost2PathfinderDirections[0] checks
				ghost2AvailablePaths = [ghost2PathFirst];
				//Ensure we check for main direction next round
				ghost2CheckMainDirection = true;

			} else {
				//if both of those are blocked
				//change current direction to opposite of ghost2PathfinderDirections[0]
				//continue path and will stop looking for ghost2PathfinderDirections[0] temp, but look for ghost2PathFirst direction instead
				//while moving in the opposite of ghost2PathfinderDirections[0] when ghost2PathFirst direction hits, take it and continue path calc

				if(ghost2PathfinderDirections[0] === 'up'){
					if(ghost2AvailablePaths.includes('down')){
						ghost2AvailablePaths = ['down'];
					}
					ghost2CheckMainDirection = false;
				} else if(ghost2PathfinderDirections[0] === 'right'){
					if(ghost2AvailablePaths.includes('left')){
						ghost2AvailablePaths = ['left'];
					}
					ghost2CheckMainDirection = false;
				} else if(ghost2PathfinderDirections[0] === 'down'){
					if(ghost2AvailablePaths.includes('up')){
						ghost2AvailablePaths = ['up'];
					}
					ghost2CheckMainDirection = false;
				} else if(ghost2PathfinderDirections[0] === 'left'){
					if(ghost2AvailablePaths.includes('right')){
						ghost2AvailablePaths = ['right'];
					}
					ghost2CheckMainDirection = false;
				}

			}//End 1 optimal direction path check

		} else {
			//2 optimal directions at check

			if(ghost2CheckMainDirection){
				if(ghost2AvailablePaths.includes(ghost2PathOriginalDirection)){
					//keep checking for ghost2PathOriginalDirection is ready
					//When that hits, take it and set to -1 for finishing move of
					//the opposite direction of ghost2PathFirst
					ghost2AvailablePaths = [ghost2PathOriginalDirection];
					ghost2PathMoves = -1;

					//Break out of if/else checks to go directly to assigning move
					break ghost2Continue;
				}
			}

			if(ghost2AvailablePaths.includes(ghost2PathFirst)){
				//Else continue path of ghost2PathFirst
				ghost2AvailablePaths = [ghost2PathFirst];
				//Ensure we check for main direction next round
				ghost2CheckMainDirection = true;

			} else {
				//If continue path of ghost2PathFirst fails and ghost2PathOriginalDirection is still not ready
				//Then go opposite of ghost2PathOriginalDirection until ghost2PathFirst hits again
				//When that hits, -1 with a finishing move of ghost2PathOriginalDirection

				if(ghost2PathOriginalDirection === 'up'){
					if(ghost2AvailablePaths.includes('down')){
						ghost2AvailablePaths = ['down'];
					}
					ghost2CheckMainDirection = false;
				} else if(ghost2PathOriginalDirection === 'right'){
					if(ghost2AvailablePaths.includes('left')){
						ghost2AvailablePaths = ['left'];
					}
					ghost2CheckMainDirection = false;
				} else if(ghost2PathOriginalDirection === 'down'){
					if(ghost2AvailablePaths.includes('up')){
						ghost2AvailablePaths = ['up'];
					}
					ghost2CheckMainDirection = false;
				} else if(ghost2PathOriginalDirection === 'left'){
					if(ghost2AvailablePaths.includes('right')){
						ghost2AvailablePaths = ['right'];
					}
					ghost2CheckMainDirection = false;
				}

			}

		}//End pathfind length check

	} else {
		//Failed to find a path, move in any available direction and recalc
		ghost2ContinuePathfind = false;

	}//End check amount of moves and previous move still good

} else {
//Starting new path

//Pathfind is enabled, start path
if(ghost2Pathfind){
//Clear previous pathfinding directions
ghost2PathOriginalDirection = '';
ghost2CheckMainDirection = true;
ghost2PathfinderDirections = [];
ghost2RemainingPaths = [];
ghost2PathAvailableTemp = []
ghost2PathMoves = 0;

//Use this ghosts position as start and the players as end
ghost2PathfinderDirections = pathfinder(ghost2CurrentPosAtInput,playerPos);

//use the returned array to check with ghost2AvailablePaths array for available directions to choose from

//ghost2PathfinderDirections
//has 0(error/ignore), 1 or 2 directions to choose from
if(ghost2PathfinderDirections.length > 0){
	//Loop through available directions to choose from
	//See if any match pathfinding directions, if so choose from those
	//Else choose any other available path
	for(let i = 0; i < ghost2PathfinderDirections.length; i++){
		if(ghost2AvailablePaths.includes(ghost2PathfinderDirections[i])){
			//Optimal direction is available
			ghost2RemainingPaths.push(ghost2PathfinderDirections[i]);
		}

	}
//console.log(ghost2RemainingPaths);
}

//If any pathfind direction's are available, use them. Otherwise continue path
if(ghost2RemainingPaths.length > 0){
	ghost2AvailablePaths = ghost2RemainingPaths;

} else {
	//All pathfinding directions are blocked
	ghost2ContinuePathfind = true;
	ghost2PathMoves = 1;

	if(ghost2PathfinderDirections.length === 1){
		//Only 1 optimal direction is found and is blocked

		if(ghost2PathfinderDirections[0] === 'up'){
			//Need to move Upwards

			if(ghost2CurrentDirection === 'up'){
				//Traveling upwards when blocked
				ghost2PathOriginalDirection = 'up';

				//Check if 1 or both perpindicular directions are available
				if(ghost2AvailablePaths.includes('left')){
					ghost2PathAvailableTemp.push('left');
				}
				if(ghost2AvailablePaths.includes('right')){
					ghost2PathAvailableTemp.push('right');
				}
				//Choose the only 1 available, unless there are 2 then either
				if(ghost2PathAvailableTemp.length > 1){
					if(Math.floor(Math.random()*2) > 0){
						ghost2AvailablePaths = [ghost2PathAvailableTemp[1]];
						ghost2PathFirst = ghost2PathAvailableTemp[1];
					} else {
						ghost2AvailablePaths = [ghost2PathAvailableTemp[0]];
						ghost2PathFirst = ghost2PathAvailableTemp[0];
					}
				} else {
					ghost2AvailablePaths = [ghost2PathAvailableTemp[0]];
					ghost2PathFirst = ghost2PathAvailableTemp[0];
				}
				
			} else if(ghost2CurrentDirection === 'left'){
				//Traveling left when up is checked and blocked
				ghost2PathOriginalDirection = 'left';

				//Check if the current direction is still available
				if(ghost2AvailablePaths.includes('left')){
					ghost2AvailablePaths = ['left'];
					ghost2PathFirst = 'left';
				} else {
					//Up and Left are blocked, coming from the right. Go down
					if(ghost2AvailablePaths.includes('down')){
						ghost2AvailablePaths = ['down'];
						ghost2PathFirst = 'down';
					}
				}
			} else if(ghost2CurrentDirection === 'right'){
				//Traveling right when up is checked and blocked
				ghost2PathOriginalDirection = 'right';

				//Check if the current direction is still available
				if(ghost2AvailablePaths.includes('right')){
					ghost2AvailablePaths = ['right'];
					ghost2PathFirst = 'right';
				} else {
					//Up and Right are blocked, coming from the right. Go down
					if(ghost2AvailablePaths.includes('down')){
						ghost2AvailablePaths = ['down'];
						ghost2PathFirst = 'down';
					}
				}
			}

		} else if(ghost2PathfinderDirections[0] === 'right'){
			//Need to move to the Right

			if(ghost2CurrentDirection === 'right'){
				//Traveling right when blocked
				ghost2PathOriginalDirection = 'right';

				//Check if 1 or both perpindicular directions are available
				if(ghost2AvailablePaths.includes('up')){
					ghost2PathAvailableTemp.push('up');
				}
				if(ghost2AvailablePaths.includes('down')){
					ghost2PathAvailableTemp.push('down');
				}
				//Choose the only 1 available, unless there are 2 then either
				if(ghost2PathAvailableTemp.length > 1){
					if(Math.floor(Math.random()*2) > 0){
						ghost2AvailablePaths = [ghost2PathAvailableTemp[1]];
						ghost2PathFirst = ghost2PathAvailableTemp[1];
					} else {
						ghost2AvailablePaths = [ghost2PathAvailableTemp[0]];
						ghost2PathFirst = ghost2PathAvailableTemp[0];
					}
				} else {
					ghost2AvailablePaths = [ghost2PathAvailableTemp[0]];
					ghost2PathFirst = ghost2PathAvailableTemp[0];
				}
				
			} else if(ghost2CurrentDirection === 'up'){
				//Traveling up when right is checked and blocked
				ghost2PathOriginalDirection = 'up';

				//Check if the current direction is still available
				if(ghost2AvailablePaths.includes('up')){
					ghost2AvailablePaths = ['up'];
					ghost2PathFirst = 'up';
				} else {
					//Up and Left are blocked, coming from the right. Go down
					if(ghost2AvailablePaths.includes('left')){
						ghost2AvailablePaths = ['left'];
						ghost2PathFirst = 'left';
					}
				}
			} else if(ghost2CurrentDirection === 'down'){
				//Traveling down when right is checked and blocked
				ghost2PathOriginalDirection = 'down';

				//Check if the current direction is still available
				if(ghost2AvailablePaths.includes('down')){
					ghost2AvailablePaths = ['down'];
					ghost2PathFirst = 'down';
				} else {
					//Up and Right are blocked, coming from the right. Go down
					if(ghost2AvailablePaths.includes('left')){
						ghost2AvailablePaths = ['left'];
						ghost2PathFirst = 'left';
					}
				}
			}

		} else if(ghost2PathfinderDirections[0] === 'down'){
			//Need to move Downwards

			if(ghost2CurrentDirection === 'down'){
				//Traveling downwards when blocked
				ghost2PathOriginalDirection = 'down';

				//Check if 1 or both perpindicular directions are available
				if(ghost2AvailablePaths.includes('left')){
					ghost2PathAvailableTemp.push('left');
				}
				if(ghost2AvailablePaths.includes('right')){
					ghost2PathAvailableTemp.push('right');
				}
				//Choose the only 1 available, unless there are 2 then either
				if(ghost2PathAvailableTemp.length > 1){
					if(Math.floor(Math.random()*2) > 0){
						ghost2AvailablePaths = [ghost2PathAvailableTemp[1]];
						ghost2PathFirst = ghost2PathAvailableTemp[1];
					} else {
						ghost2AvailablePaths = [ghost2PathAvailableTemp[0]];
						ghost2PathFirst = ghost2PathAvailableTemp[0];
					}
				} else {
					ghost2AvailablePaths = [ghost2PathAvailableTemp[0]];
					ghost2PathFirst = ghost2PathAvailableTemp[0];
				}
				
			} else if(ghost2CurrentDirection === 'left'){
				//Traveling left when down is checked and blocked
				ghost2PathOriginalDirection = 'left';

				//Check if the current direction is still available
				if(ghost2AvailablePaths.includes('left')){
					ghost2AvailablePaths = ['left'];
					ghost2PathFirst = 'left';
				} else {
					//Up and Left are blocked, coming from the right. Go down
					if(ghost2AvailablePaths.includes('up')){
						ghost2AvailablePaths = ['up'];
						ghost2PathFirst = 'up';
					}
				}
			} else if(ghost2CurrentDirection === 'right'){
				//Traveling right when down is checked and blocked
				ghost2PathOriginalDirection = 'right';

				//Check if the current direction is still available
				if(ghost2AvailablePaths.includes('right')){
					ghost2AvailablePaths = ['right'];
					ghost2PathFirst = 'right';
				} else {
					//Up and Right are blocked, coming from the right. Go down
					if(ghost2AvailablePaths.includes('up')){
						ghost2AvailablePaths = ['up'];
						ghost2PathFirst = 'up';
					}
				}
			}

		} else if(ghost2PathfinderDirections[0] === 'left'){
			//Need to move to the Left

			if(ghost2CurrentDirection === 'left'){
				//Traveling left when blocked
				ghost2PathOriginalDirection = 'left';

				//Check if 1 or both perpindicular directions are available
				if(ghost2AvailablePaths.includes('up')){
					ghost2PathAvailableTemp.push('up');
				}
				if(ghost2AvailablePaths.includes('down')){
					ghost2PathAvailableTemp.push('down');
				}
				//Choose the only 1 available, unless there are 2 then either
				if(ghost2PathAvailableTemp.length > 1){
					if(Math.floor(Math.random()*2) > 0){
						ghost2AvailablePaths = [ghost2PathAvailableTemp[1]];
						ghost2PathFirst = ghost2PathAvailableTemp[1];
					} else {
						ghost2AvailablePaths = [ghost2PathAvailableTemp[0]];
						ghost2PathFirst = ghost2PathAvailableTemp[0];
					}
				} else {
					ghost2AvailablePaths = [ghost2PathAvailableTemp[0]];
					ghost2PathFirst = ghost2PathAvailableTemp[0];
				}
				
			} else if(ghost2CurrentDirection === 'up'){
				//Traveling up when left is checked and blocked
				ghost2PathOriginalDirection = 'up';

				//Check if the current direction is still available
				if(ghost2AvailablePaths.includes('up')){
					ghost2AvailablePaths = ['up'];
					ghost2PathFirst = 'up';
				} else {
					//Up and Left are blocked, coming from the left. Go right
					if(ghost2AvailablePaths.includes('right')){
						ghost2AvailablePaths = ['right'];
						ghost2PathFirst = 'right';
					}
				}
			} else if(ghost2CurrentDirection === 'down'){
				//Traveling down when left is checked and blocked
				ghost2PathOriginalDirection = 'down';

				//Check if the current direction is still available
				if(ghost2AvailablePaths.includes('down')){
					ghost2AvailablePaths = ['down'];
					ghost2PathFirst = 'down';
				} else {
					//Up and Left are blocked, coming from the left. Go right
					if(ghost2AvailablePaths.includes('right')){
						ghost2AvailablePaths = ['right'];
						ghost2PathFirst = 'right';
					}
				}
			}

		}//End directionCheck within a single optimal direction
	} else {
		//2 optimal directions found and both are blocked

		if(ghost2CurrentDirection === 'up'){
			//Traveling up when up and another is blocked
			ghost2PathOriginalDirection = 'up';

			if(ghost2PathfinderDirections.includes('left')){
				//The other direction is left, which is blocked
				ghost2AvailablePaths = ['right'];
				ghost2PathFirst = 'right';
			} else if(ghost2PathfinderDirections.includes('right')){
				//The other direction is right, which is blocked
				ghost2AvailablePaths = ['left'];
				ghost2PathFirst = 'left';
			}

		} else if(ghost2CurrentDirection === 'right'){
			//Traveling right when up and another is blocked
			ghost2PathOriginalDirection = 'right';

			if(ghost2PathfinderDirections.includes('up')){
				//The other direction is up, which is blocked
				ghost2AvailablePaths = ['down'];
				ghost2PathFirst = 'down';
			} else if(ghost2PathfinderDirections.includes('down')){
				//The other direction is down, which is blocked
				ghost2AvailablePaths = ['up'];
				ghost2PathFirst = 'up';
			}

		} else if(ghost2CurrentDirection === 'down'){
			//Traveling down when up and another is blocked
			ghost2PathOriginalDirection = 'down';

			if(ghost2PathfinderDirections.includes('left')){
				//The other direction is left, which is blocked
				ghost2AvailablePaths = ['right'];
				ghost2PathFirst = 'right';
			} else if(ghost2PathfinderDirections.includes('right')){
				//The other direction is right, which is blocked
				ghost2AvailablePaths = ['left'];
				ghost2PathFirst = 'left';
			}

		} else if(ghost2CurrentDirection === 'left'){
			//Traveling left when up and another is blocked
			ghost2PathOriginalDirection = 'left';

			if(ghost2PathfinderDirections.includes('up')){
				//The other direction is up, which is blocked
				ghost2AvailablePaths = ['down'];
				ghost2PathFirst = 'down';
			} else if(ghost2PathfinderDirections.includes('down')){
				//The other direction is down, which is blocked
				ghost2AvailablePaths = ['up'];
				ghost2PathFirst = 'up';
			}

		}//End 2 optimal path direction check

	}//End if 1 or 2 optimal paths being blocked

}//End if ghost2RemainingPaths is full or empty

}//End if ghostPathfind is enabled

}//End if ghost2ContinuePathfind is enabled




//
//Scatter | Random Movements
//

//Randomize Choice
ghost2Chance = Math.floor(Math.random()*100);

if(ghost2PowerUpHit){
	//Reverse hit
	rotateGhost2(ghost2PathReverse);
	moveGhost2(ghost2PathReverse);
	ghost2PowerUpHit = false;
	//disable pathfinding on power up
	//re-enable on respawn
} else{

	//If only 1 move is available, i.e. pathfinding ignore and do that
	if(ghost2AvailablePaths.length === 1){
		rotateGhost2(ghost2AvailablePaths[0]);
		moveGhost2(ghost2AvailablePaths[0]);

	} else if(ghost2AvailablePaths.length === 2){
	//Check if only 2 paths which will always include reverse. That is least likely to be choosen so select other most of the time
	//Forward, Reverse
	//Reverse, Turn 1
	//Reverse, Turn 2

		//When optimal paths are available, choose equally from them
		if(ghost2Pathfind){

			//Chance of choosing 1 direction over the other
			if(ghost2Chance >= 25){
				rotateGhost2(ghost2AvailablePaths[0]);
				moveGhost2(ghost2AvailablePaths[0]);
			} else {
				//Assign other available direction
				rotateGhost2(ghost2AvailablePaths[1]);
				moveGhost2(ghost2AvailablePaths[1]);
			}

		} else {

			//Chance of reversing direction at 4%
			if(ghost2Chance >= 96){
				//Reverse hit
				rotateGhost2(ghost2PathReverse);
				moveGhost2(ghost2PathReverse);

			} else {

				//Select other available path
				if(ghost2AvailablePaths.indexOf(ghost2PathReverse) === 0){
					//Assign other available direction
					rotateGhost2(ghost2AvailablePaths[1]);
					moveGhost2(ghost2AvailablePaths[1]);

				} else {
					//Assign other available direction
					rotateGhost2(ghost2AvailablePaths[0]);
					moveGhost2(ghost2AvailablePaths[0]);
				}

			}

		}

	} else if(ghost2AvailablePaths.length === 3){
	//Reverse, Turn 1, Turn 2
	//Forward, Reverse, Turn 1
	//Forward, Reverse, Turn 2

		//Chance of reversing direction at 4%
		if(ghost2Chance >= 96){
			//Reverse hit
			rotateGhost2(ghost2PathReverse);
			moveGhost2(ghost2PathReverse);

		} else {
			//Select other available path

			//Remove reverse direction from path array
			ghost2AvailablePaths.splice(ghost2AvailablePaths.indexOf(ghost2PathReverse), 1);

			//start with a 50/50 chance of choosing direction
			if(ghost2Chance > 50){
				//Direction 0 hit
				rotateGhost2(ghost2AvailablePaths[0]);
				moveGhost2(ghost2AvailablePaths[0]);

			} else {
				//Direction 1 hit
				rotateGhost2(ghost2AvailablePaths[1]);
				moveGhost2(ghost2AvailablePaths[1]);

			}

		}

	} else if(ghost2AvailablePaths.length === 4){
	//Forward, Reverse, Turn 1, Turn 2

		//Chance of reversing direction at 4%
		if(ghost2Chance >= 96){
			//Reverse hit
			rotateGhost2(ghost2PathReverse);
			moveGhost2(ghost2PathReverse);

		} else {
			//Select other available path
			//Remove reverse direction from path array
			ghost2AvailablePaths.splice(ghost2AvailablePaths.indexOf(ghost2PathReverse), 1);

			if(ghost2Chance < 96 && ghost2Chance >= 68 ){
				//Direction 0 hit
				rotateGhost2(ghost2AvailablePaths[0]);
				moveGhost2(ghost2AvailablePaths[0]);

			} else if(ghost2Chance < 68 && ghost2Chance >= 32 ){
				//Direction 1 hit
				rotateGhost2(ghost2AvailablePaths[1]);
				moveGhost2(ghost2AvailablePaths[1]);

			} else if(ghost2Chance < 32 && ghost2Chance >= 0 ){
				//Direction 2 hit
				rotateGhost2(ghost2AvailablePaths[2]);
				moveGhost2(ghost2AvailablePaths[2]);

			}

		}

	}//End if/else ghost2AvailablePaths length check

}//End if power up just hit

}//End ghost2Input

//Ghost2 Path Switching Chances on Collected Dots
function ghost2PathSwitching(){

//Check ghost start chase minimum
if(ghost2ChaseCheckIteration === 0){

	if(eatenDots >= maxDots * ghost2StartChaseTo){
		ghost2Pathfind = true;
		ghost2ChaseCheckIteration++;
	}

} else if(ghost2ChaseCheckIteration >= 1){
	//Check minimum start + interation increase of %
	if(eatenDots >= maxDots * (ghost2StartChaseTo + (switchChaseCheck * ghost2ChaseCheckIteration))){

		//Check percentage chase to swap ghostPathfind
		if(ghost2Pathfind){
			if(Math.floor(Math.random()*100) <= ghost2SwitchChaseChance){
				ghost2Pathfind = false;
			}
		} else {
			if(Math.floor(Math.random()*100) >= ghost2SwitchChaseChance){
				ghost2Pathfind = true;
			}
		}
		//Decrease chance of switching away from chase
		//ghost2SwitchChaseChance -= 4;
		//Increase iteration check
		ghost2ChaseCheckIteration++;

	}//Eaten dots increasing percentage check

}//End if/else

}//End ghost2PathSwitching

//Power Down
function powerDownGhost2(){
	//Ghost 2
	ghost2PoweredUp = false;
	//Reset ghost material animation change
	ghost2Eye1Socket.emit('poweredDown',{});
	ghost2Eye1.emit('poweredDown',{});
	ghost2Eye2Socket.emit('poweredDown',{});
	ghost2Eye2.emit('poweredDown',{});
	ghost2Mouth.emit('poweredDown',{});
	ghost2Spin.emit('poweredDown',{});
	ghost2Head.emit('poweredDown',{});
	ghost2Body.emit('poweredDown',{});
	ghost2Legs1.emit('poweredDown',{});
	ghost2Legs2.emit('poweredDown',{});
	ghost2Legs3.emit('poweredDown',{});
	ghost2Legs4.emit('poweredDown',{});
}

//Reset Ghost
function resetGhost2(){
	//Ghost2
	ghost2Hit = false;
	ghost2PoweredUp = false;
	ghost2PowerUpHit = false;
	ghost2RecentDeath = false;
	ghost2Start = false;
	clearTimeout(ghost2StartTimeout0);
	clearTimeout(ghost2StartTimeout);
	clearTimeout(ghost2ReturnTimeout);
	clearTimeout(ghost2ReturnTimeout2);
	ghost2OnBoard.setAttribute('visible', true);
	ghost2Spin.setAttribute('visible', true);
	//Currently Choosen Direction
	ghost2InputDirection = 'none';
	//Spawn at 1 0 -1 and Facing Up
	ghost2Pos.copy(ghost2Spawn);
	ghost2CurrentDirection = 'left';
	ghost2OnBoard.object3D.position.copy(ghost2Pos);
	//Tunnel teleporting and decision blocking delays
	ghost2TunnelHit = false;
	ghost2TunnelTeleport = false;
	ghost2InTunnel = false;
	moveGhost2Animation = {};
	ghost2OnBoard.setAttribute('animation__moveGhost2Animation', moveGhost2Animation);
	ghost2CheckForPathSwitch = true;
	if(poweredUp){
		ghost2Pathfind = ghost2PathfindPreviously;
	}
}

//startGhost2Interval
function startGhost2Interval(interval) {

ghost2Interval = setInterval(function() {

	//Update that Ghost has started
	ghost2Start = true;

	if(ghost2InTunnel){
	//In tunnel, auto move no thoughts
		moveGhost2(ghost2CurrentDirection);
	} else {
		//Choose Ghost move
		ghost2Input();
	}//end ghost2InTunnel exception



}, interval);//Interval

}//End startGhost2Interval

//
//Ghost 3
//

//Animate Ghost POS movement
function setGhost3Position(pos){

	//Allow time for ghost to move before setting
	ghost3MoveSetPosTimeout = setTimeout(function () {
		//Update phantom 
		ghost3Pos.copy(pos);
	}, stepIntervalGhost3/4); //Delay 

	//Animate Player Movement
	if(ghost3CurrentDirection === 'left' || ghost3CurrentDirection === 'right'){
	moveGhost3Animation = {
		property: 'object3D.position.x',
		to: pos.x,
		dur: stepIntervalGhost3/2,
		delay: 0,
		loop: 'false',
		dir: 'normal',
		easing:'linear',
		elasticity: 400,
		autoplay: 'true',
		enabled: 'true',
		};
	} else {
	moveGhost3Animation = {
		property: 'object3D.position.z',
		to: pos.z,
		dur: stepIntervalGhost3/2,
		delay: 0,
		loop: 'false',
		dir: 'normal',
		easing:'linear',
		elasticity: 400,
		autoplay: 'true',
		enabled: 'true',
		};
	}
	//Set movement animation to Player
	ghost3OnBoard.setAttribute('animation__moveGhost3Animation', moveGhost3Animation);

}//End setGhost3Position

//Rotate Ghost 2
function rotateGhost3(direction){

if(direction === "up"){
	//Emit eye movement animation
	ghost3Eye1.emit('lookUp',{});
	ghost3Eye2.emit('lookUp',{});
	ghost3CurrentDirection = 'up';
} else if(direction === "left"){
	//Emit eye movement animation
	ghost3Eye1.emit('lookLeft',{});
	ghost3Eye2.emit('lookLeft',{});
	ghost3CurrentDirection = 'left';
} else if(direction === "right"){
	//Emit eye movement animation
	ghost3Eye1.emit('lookRight',{});
	ghost3Eye2.emit('lookRight',{});
	ghost3CurrentDirection = 'right';
} else if(direction === "down"){
	//Emit eye movement animation
	ghost3Eye1.emit('lookDown',{});
	ghost3Eye2.emit('lookDown',{});
	ghost3CurrentDirection = 'down';
}

}//End rotateGhost3

//Check obstacles by Ghosts Position in Direction and move/prep to move
function moveGhost3(direction){

//Get ghost position
ghost3CurrentPos.copy(ghost3Pos);

//Get player position
ghost3NewPos.copy(ghost3CurrentPos);
//ghost3NewPos.copy(ghost3Pos);

//Init 2nd Move
clearTimeout(ghost3Move2Timeout);

//Move based on Direction
if(direction === 'up' ){
	//Set ghost's new position
	ghost3NewPos.z -= stepDistance;
	//Set movement position
	setGhost3Position(ghost3NewPos);
	//2nd Step Move
	ghost3Move2Timeout = setTimeout(function () {
		//Set ghost's new position
		ghost3NewPos.z -= stepDistance;
		//Set movement position
		setGhost3Position(ghost3NewPos);
		clearTimeout(ghost3Move2Timeout);
	}, stepIntervalGhost3/2); //Delay


} else if(direction === 'left'){
	//Set ghost's new position
	ghost3NewPos.x -= stepDistance;
	//Set movement position
	setGhost3Position(ghost3NewPos);

	//2nd Step Move
	ghost3Move2Timeout = setTimeout(function () {
		//Set ghost's new position
		ghost3NewPos.x -= stepDistance;
		//Set movement position
		setGhost3Position(ghost3NewPos);
		clearTimeout(ghost3Move2Timeout);
	}, stepIntervalGhost3/2); //Delay

	//Check for tunnel
	if (ghost3TunnelTeleport) {
		//Override normal 2nd Step
		clearInterval(ghost3Move2Timeout);
		//Reset tunnelHit
		ghost3TunnelTeleport = false;
		ghost3OnBoard.setAttribute('visible',false);
		//Set movement position slightly out of bounds
		setGhost3Position(mapTunnelsGhost[1]);
		//Reset ghost3TunnelTeleport
		ghost3InTunnel = true;
		//Delay half stepIntervalPlayer, then teleport for tunnel
		ghost3TunnelTimeout = setTimeout(function () {
			//Reset ghost3TunnelTeleport
			ghost3InTunnel = false;
			ghost3OnBoard.setAttribute('visible',true);
			//Clear Timeout
			//clearTimeout(ghost3TunnelTimeout);
		}, stepIntervalGhost3); //Delay for Full Step

	}

} else if(direction === 'right'){
	//Set ghost's new position
	ghost3NewPos.x += stepDistance;
	//Set movement position
	setGhost3Position(ghost3NewPos);
	//2nd Step Move
	ghost3Move2Timeout = setTimeout(function () {
		//Set ghost's new position
		ghost3NewPos.x += stepDistance;
		//Set movement position
		setGhost3Position(ghost3NewPos);
		clearTimeout(ghost3Move2Timeout);
	}, stepIntervalGhost3/2); //Delay

	//Check for tunnel
	if (ghost3TunnelTeleport) {
		//Override normal 2nd Step
		clearInterval(ghost3Move2Timeout);
		//Reset ghost3TunnelTeleport
		ghost3TunnelTeleport = false;
		ghost3OnBoard.setAttribute('visible',false);
		//Set movement position slightly out of bounds
		setGhost3Position(mapTunnelsGhost[0]);
		//Reset ghost3TunnelTeleport
		ghost3InTunnel = true;
		//Delay half stepIntervalGhost3, then teleport for tunnel
		ghost3TunnelTimeout = setTimeout(function () {
			//Reset ghost3TunnelTeleport
			ghost3InTunnel = false;
			ghost3OnBoard.setAttribute('visible',true);
			//Clear Timeout
			//clearTimeout(ghost3TunnelTimeout);
		}, stepIntervalGhost3); //Delay for Full Step

	}

} else if(direction === 'down'){
	//Set ghost's new position
	ghost3NewPos.z += stepDistance;

	//Set movement position
	setGhost3Position(ghost3NewPos);

	//2nd Step Move
	ghost3Move2Timeout = setTimeout(function () {
		//Set ghost's new position
		ghost3NewPos.z += stepDistance;
		//Set movement position
		setGhost3Position(ghost3NewPos);
		clearTimeout(ghost3Move2Timeout);
		}, stepIntervalGhost3/2); //Delay for Full Step
}//End if/else

}//End moveGhost3

//Ghost 3 Decision making for movement
function ghost3Input(){

//Get current player position
ghost3CurrentPosAtInput.copy(ghost3Pos);

//Reset availablePaths array
ghost3AvailablePaths = [];

//Depending on current direction assign up, down, left or right
//Relative to currentDirection path

//Depending on direction, assign X or Z to be checked for integer
if(ghost3CurrentDirection === 'up'){
	//Set Integer Check
	ghost3CheckXorZ = ghost3CurrentPosAtInput.z;
	//Set Current Path Directions
	ghost3PathReverse = 'down';
	ghost3PathTurn1 = 'left';
	ghost3PathTurn2 = 'right';

} else if(ghost3CurrentDirection === 'down') {
	//Set Integer Check
	ghost3CheckXorZ = ghost3CurrentPosAtInput.z;
	//Set Current Path Directions
	ghost3PathReverse = 'up';
	ghost3PathTurn1 = 'left';
	ghost3PathTurn2 = 'right';

} else if(ghost3CurrentDirection === 'left') {
	//Set Integer Check
	ghost3CheckXorZ = ghost3CurrentPosAtInput.x;
	//Set Current Path Directions
	ghost3PathReverse = 'right';
	ghost3PathTurn1 = 'up';
	ghost3PathTurn2 = 'down';

} else if(ghost3CurrentDirection === 'right'){
	//Set Integer Check
	ghost3CheckXorZ = ghost3CurrentPosAtInput.x;
	//Set Current Path Directions
	ghost3PathReverse = 'left';
	ghost3PathTurn1 = 'up';
	ghost3PathTurn2 = 'down';
}

//Ghost is at integer location, check for available movement
if(Number.isInteger(ghost3CheckXorZ)){

	//Check for Current Direction obstacles
	if(checkMapObstacles(ghost3CurrentPosAtInput, ghost3CurrentDirection,'ghost3')){
		//Current direction clear, append available paths
		ghost3AvailablePaths.push(ghost3CurrentDirection);
	}

	//Check for Current Direction obstacles
	if(checkMapObstacles(ghost3CurrentPosAtInput, ghost3PathReverse,'ghost3')){
		//Current direction clear, append available paths
		ghost3AvailablePaths.push(ghost3PathReverse);
	}

	//Check for Current Direction obstacles
	if(checkMapObstacles(ghost3CurrentPosAtInput, ghost3PathTurn1,'ghost3')){
		//Current direction clear, append available paths
		ghost3AvailablePaths.push(ghost3PathTurn1);
	}

	//Check for Current Direction obstacles
	if(checkMapObstacles(ghost3CurrentPosAtInput, ghost3PathTurn2,'ghost3')){
		//Current direction clear, append available paths
		ghost3AvailablePaths.push(ghost3PathTurn2);
	}

}

//
//Pathfinding
//

//Is ghost continuing the same direction as before?
ghost3Continue: if(ghost3ContinuePathfind){

	//Special finishing move before recalc
	if(ghost3PathMoves === -1){
		ghost3ContinuePathfind = false;

		if(ghost3AvailablePaths.includes(ghost3PathFirst)){
			ghost3AvailablePaths = [ghost3PathFirst];
			console.log(ghost3PathFirst);
		}

	} else if(ghost3PathMoves < 6){
		ghost3PathMoves++;

		if(ghost3PathfinderDirections.length === 1){
			//1 optimal direction at check

			if(ghost3CheckMainDirection){
				if(ghost3AvailablePaths.includes(ghost3PathfinderDirections[0])){
					//keep checking if the only ghost3PathfinderDirections[0] is ready
					//if so, take it and stop continue path for new path calc
					ghost3AvailablePaths = [ghost3PathfinderDirections[0]];
					ghost3ContinuePathfind = false;

					//Break out of if/else checks to go directly to assigning move
					break ghost3Continue;
				}
			}

			if(ghost3AvailablePaths.includes(ghost3PathFirst)){
				//Else check if ghost3PathFirst direction is still good
				//if so, take it and add keep continuing ghost3PathfinderDirections[0] checks
				ghost3AvailablePaths = [ghost3PathFirst];
				//Ensure we check for main direction next round
				ghost3CheckMainDirection = true;

			} else {
				//if both of those are blocked
				//change current direction to opposite of ghost3PathfinderDirections[0]
				//continue path and will stop looking for ghost3PathfinderDirections[0] temp, but look for ghost3PathFirst direction instead
				//while moving in the opposite of ghost3PathfinderDirections[0] when ghost3PathFirst direction hits, take it and continue path calc

				if(ghost3PathfinderDirections[0] === 'up'){
					if(ghost3AvailablePaths.includes('down')){
						ghost3AvailablePaths = ['down'];
					}
					ghost3CheckMainDirection = false;
				} else if(ghost3PathfinderDirections[0] === 'right'){
					if(ghost3AvailablePaths.includes('left')){
						ghost3AvailablePaths = ['left'];
					}
					ghost3CheckMainDirection = false;
				} else if(ghost3PathfinderDirections[0] === 'down'){
					if(ghost3AvailablePaths.includes('up')){
						ghost3AvailablePaths = ['up'];
					}
					ghost3CheckMainDirection = false;
				} else if(ghost3PathfinderDirections[0] === 'left'){
					if(ghost3AvailablePaths.includes('right')){
						ghost3AvailablePaths = ['right'];
					}
					ghost3CheckMainDirection = false;
				}

			}//End 1 optimal direction path check

		} else {
			//2 optimal directions at check

			if(ghost3CheckMainDirection){
				if(ghost3AvailablePaths.includes(ghost3PathOriginalDirection)){
					//keep checking for ghost3PathOriginalDirection is ready
					//When that hits, take it and set to -1 for finishing move of
					//the opposite direction of ghost3PathFirst
					ghost3AvailablePaths = [ghost3PathOriginalDirection];
					ghost3PathMoves = -1;

					//Break out of if/else checks to go directly to assigning move
					break ghost3Continue;
				}
			}

			if(ghost3AvailablePaths.includes(ghost3PathFirst)){
				//Else continue path of ghost3PathFirst
				ghost3AvailablePaths = [ghost3PathFirst];
				//Ensure we check for main direction next round
				ghost3CheckMainDirection = true;

			} else {
				//If continue path of ghost3PathFirst fails and ghost3PathOriginalDirection is still not ready
				//Then go opposite of ghost3PathOriginalDirection until ghost3PathFirst hits again
				//When that hits, -1 with a finishing move of ghost3PathOriginalDirection

				if(ghost3PathOriginalDirection === 'up'){
					if(ghost3AvailablePaths.includes('down')){
						ghost3AvailablePaths = ['down'];
					}
					ghost3CheckMainDirection = false;
				} else if(ghost3PathOriginalDirection === 'right'){
					if(ghost3AvailablePaths.includes('left')){
						ghost3AvailablePaths = ['left'];
					}
					ghost3CheckMainDirection = false;
				} else if(ghost3PathOriginalDirection === 'down'){
					if(ghost3AvailablePaths.includes('up')){
						ghost3AvailablePaths = ['up'];
					}
					ghost3CheckMainDirection = false;
				} else if(ghost3PathOriginalDirection === 'left'){
					if(ghost3AvailablePaths.includes('right')){
						ghost3AvailablePaths = ['right'];
					}
					ghost3CheckMainDirection = false;
				}

			}

		}//End pathfind length check

	} else {
		//Failed to find a path, move in any available direction and recalc
		ghost3ContinuePathfind = false;

	}//End check amount of moves and previous move still good

} else {
//Starting new path

//Pathfind is enabled, start path
if(ghost3Pathfind){
//Clear previous pathfinding directions
ghost3PathOriginalDirection = '';
ghost3CheckMainDirection = true;
ghost3PathfinderDirections = [];
ghost3RemainingPaths = [];
ghost3PathAvailableTemp = []
ghost3PathMoves = 0;

//Use this ghosts position as start and the players as end
ghost3PathfinderDirections = pathfinder(ghost3CurrentPosAtInput,playerPos);

//use the returned array to check with ghost3AvailablePaths array for available directions to choose from

//ghost3PathfinderDirections
//has 0(error/ignore), 1 or 2 directions to choose from
if(ghost3PathfinderDirections.length > 0){
	//Loop through available directions to choose from
	//See if any match pathfinding directions, if so choose from those
	//Else choose any other available path
	for(let i = 0; i < ghost3PathfinderDirections.length; i++){
		if(ghost3AvailablePaths.includes(ghost3PathfinderDirections[i])){
			//Optimal direction is available
			ghost3RemainingPaths.push(ghost3PathfinderDirections[i]);
		}

	}
//console.log(ghost3RemainingPaths);
}

//If any pathfind direction's are available, use them. Otherwise continue path
if(ghost3RemainingPaths.length > 0){
	ghost3AvailablePaths = ghost3RemainingPaths;

} else {
	//All pathfinding directions are blocked
	ghost3ContinuePathfind = true;
	ghost3PathMoves = 1;

	if(ghost3PathfinderDirections.length === 1){
		//Only 1 optimal direction is found and is blocked

		if(ghost3PathfinderDirections[0] === 'up'){
			//Need to move Upwards

			if(ghost3CurrentDirection === 'up'){
				//Traveling upwards when blocked
				ghost3PathOriginalDirection = 'up';

				//Check if 1 or both perpindicular directions are available
				if(ghost3AvailablePaths.includes('left')){
					ghost3PathAvailableTemp.push('left');
				}
				if(ghost3AvailablePaths.includes('right')){
					ghost3PathAvailableTemp.push('right');
				}
				//Choose the only 1 available, unless there are 2 then either
				if(ghost3PathAvailableTemp.length > 1){
					if(Math.floor(Math.random()*2) > 0){
						ghost3AvailablePaths = [ghost3PathAvailableTemp[1]];
						ghost3PathFirst = ghost3PathAvailableTemp[1];
					} else {
						ghost3AvailablePaths = [ghost3PathAvailableTemp[0]];
						ghost3PathFirst = ghost3PathAvailableTemp[0];
					}
				} else {
					ghost3AvailablePaths = [ghost3PathAvailableTemp[0]];
					ghost3PathFirst = ghost3PathAvailableTemp[0];
				}
				
			} else if(ghost3CurrentDirection === 'left'){
				//Traveling left when up is checked and blocked
				ghost3PathOriginalDirection = 'left';

				//Check if the current direction is still available
				if(ghost3AvailablePaths.includes('left')){
					ghost3AvailablePaths = ['left'];
					ghost3PathFirst = 'left';
				} else {
					//Up and Left are blocked, coming from the right. Go down
					if(ghost3AvailablePaths.includes('down')){
						ghost3AvailablePaths = ['down'];
						ghost3PathFirst = 'down';
					}
				}
			} else if(ghost3CurrentDirection === 'right'){
				//Traveling right when up is checked and blocked
				ghost3PathOriginalDirection = 'right';

				//Check if the current direction is still available
				if(ghost3AvailablePaths.includes('right')){
					ghost3AvailablePaths = ['right'];
					ghost3PathFirst = 'right';
				} else {
					//Up and Right are blocked, coming from the right. Go down
					if(ghost3AvailablePaths.includes('down')){
						ghost3AvailablePaths = ['down'];
						ghost3PathFirst = 'down';
					}
				}
			}

		} else if(ghost3PathfinderDirections[0] === 'right'){
			//Need to move to the Right

			if(ghost3CurrentDirection === 'right'){
				//Traveling right when blocked
				ghost3PathOriginalDirection = 'right';

				//Check if 1 or both perpindicular directions are available
				if(ghost3AvailablePaths.includes('up')){
					ghost3PathAvailableTemp.push('up');
				}
				if(ghost3AvailablePaths.includes('down')){
					ghost3PathAvailableTemp.push('down');
				}
				//Choose the only 1 available, unless there are 2 then either
				if(ghost3PathAvailableTemp.length > 1){
					if(Math.floor(Math.random()*2) > 0){
						ghost3AvailablePaths = [ghost3PathAvailableTemp[1]];
						ghost3PathFirst = ghost3PathAvailableTemp[1];
					} else {
						ghost3AvailablePaths = [ghost3PathAvailableTemp[0]];
						ghost3PathFirst = ghost3PathAvailableTemp[0];
					}
				} else {
					ghost3AvailablePaths = [ghost3PathAvailableTemp[0]];
					ghost3PathFirst = ghost3PathAvailableTemp[0];
				}
				
			} else if(ghost3CurrentDirection === 'up'){
				//Traveling up when right is checked and blocked
				ghost3PathOriginalDirection = 'up';

				//Check if the current direction is still available
				if(ghost3AvailablePaths.includes('up')){
					ghost3AvailablePaths = ['up'];
					ghost3PathFirst = 'up';
				} else {
					//Up and Left are blocked, coming from the right. Go down
					if(ghost3AvailablePaths.includes('left')){
						ghost3AvailablePaths = ['left'];
						ghost3PathFirst = 'left';
					}
				}
			} else if(ghost3CurrentDirection === 'down'){
				//Traveling down when right is checked and blocked
				ghost3PathOriginalDirection = 'down';

				//Check if the current direction is still available
				if(ghost3AvailablePaths.includes('down')){
					ghost3AvailablePaths = ['down'];
					ghost3PathFirst = 'down';
				} else {
					//Up and Right are blocked, coming from the right. Go down
					if(ghost3AvailablePaths.includes('left')){
						ghost3AvailablePaths = ['left'];
						ghost3PathFirst = 'left';
					}
				}
			}

		} else if(ghost3PathfinderDirections[0] === 'down'){
			//Need to move Downwards

			if(ghost3CurrentDirection === 'down'){
				//Traveling downwards when blocked
				ghost3PathOriginalDirection = 'down';

				//Check if 1 or both perpindicular directions are available
				if(ghost3AvailablePaths.includes('left')){
					ghost3PathAvailableTemp.push('left');
				}
				if(ghost3AvailablePaths.includes('right')){
					ghost3PathAvailableTemp.push('right');
				}
				//Choose the only 1 available, unless there are 2 then either
				if(ghost3PathAvailableTemp.length > 1){
					if(Math.floor(Math.random()*2) > 0){
						ghost3AvailablePaths = [ghost3PathAvailableTemp[1]];
						ghost3PathFirst = ghost3PathAvailableTemp[1];
					} else {
						ghost3AvailablePaths = [ghost3PathAvailableTemp[0]];
						ghost3PathFirst = ghost3PathAvailableTemp[0];
					}
				} else {
					ghost3AvailablePaths = [ghost3PathAvailableTemp[0]];
					ghost3PathFirst = ghost3PathAvailableTemp[0];
				}
				
			} else if(ghost3CurrentDirection === 'left'){
				//Traveling left when down is checked and blocked
				ghost3PathOriginalDirection = 'left';

				//Check if the current direction is still available
				if(ghost3AvailablePaths.includes('left')){
					ghost3AvailablePaths = ['left'];
					ghost3PathFirst = 'left';
				} else {
					//Up and Left are blocked, coming from the right. Go down
					if(ghost3AvailablePaths.includes('up')){
						ghost3AvailablePaths = ['up'];
						ghost3PathFirst = 'up';
					}
				}
			} else if(ghost3CurrentDirection === 'right'){
				//Traveling right when down is checked and blocked
				ghost3PathOriginalDirection = 'right';

				//Check if the current direction is still available
				if(ghost3AvailablePaths.includes('right')){
					ghost3AvailablePaths = ['right'];
					ghost3PathFirst = 'right';
				} else {
					//Up and Right are blocked, coming from the right. Go down
					if(ghost3AvailablePaths.includes('up')){
						ghost3AvailablePaths = ['up'];
						ghost3PathFirst = 'up';
					}
				}
			}

		} else if(ghost3PathfinderDirections[0] === 'left'){
			//Need to move to the Left

			if(ghost3CurrentDirection === 'left'){
				//Traveling left when blocked
				ghost3PathOriginalDirection = 'left';

				//Check if 1 or both perpindicular directions are available
				if(ghost3AvailablePaths.includes('up')){
					ghost3PathAvailableTemp.push('up');
				}
				if(ghost3AvailablePaths.includes('down')){
					ghost3PathAvailableTemp.push('down');
				}
				//Choose the only 1 available, unless there are 2 then either
				if(ghost3PathAvailableTemp.length > 1){
					if(Math.floor(Math.random()*2) > 0){
						ghost3AvailablePaths = [ghost3PathAvailableTemp[1]];
						ghost3PathFirst = ghost3PathAvailableTemp[1];
					} else {
						ghost3AvailablePaths = [ghost3PathAvailableTemp[0]];
						ghost3PathFirst = ghost3PathAvailableTemp[0];
					}
				} else {
					ghost3AvailablePaths = [ghost3PathAvailableTemp[0]];
					ghost3PathFirst = ghost3PathAvailableTemp[0];
				}
				
			} else if(ghost3CurrentDirection === 'up'){
				//Traveling up when left is checked and blocked
				ghost3PathOriginalDirection = 'up';

				//Check if the current direction is still available
				if(ghost3AvailablePaths.includes('up')){
					ghost3AvailablePaths = ['up'];
					ghost3PathFirst = 'up';
				} else {
					//Up and Left are blocked, coming from the left. Go right
					if(ghost3AvailablePaths.includes('right')){
						ghost3AvailablePaths = ['right'];
						ghost3PathFirst = 'right';
					}
				}
			} else if(ghost3CurrentDirection === 'down'){
				//Traveling down when left is checked and blocked
				ghost3PathOriginalDirection = 'down';

				//Check if the current direction is still available
				if(ghost3AvailablePaths.includes('down')){
					ghost3AvailablePaths = ['down'];
					ghost3PathFirst = 'down';
				} else {
					//Up and Left are blocked, coming from the left. Go right
					if(ghost3AvailablePaths.includes('right')){
						ghost3AvailablePaths = ['right'];
						ghost3PathFirst = 'right';
					}
				}
			}

		}//End directionCheck within a single optimal direction
	} else {
		//2 optimal directions found and both are blocked

		if(ghost3CurrentDirection === 'up'){
			//Traveling up when up and another is blocked
			ghost3PathOriginalDirection = 'up';

			if(ghost3PathfinderDirections.includes('left')){
				//The other direction is left, which is blocked
				ghost3AvailablePaths = ['right'];
				ghost3PathFirst = 'right';
			} else if(ghost3PathfinderDirections.includes('right')){
				//The other direction is right, which is blocked
				ghost3AvailablePaths = ['left'];
				ghost3PathFirst = 'left';
			}

		} else if(ghost3CurrentDirection === 'right'){
			//Traveling right when up and another is blocked
			ghost3PathOriginalDirection = 'right';

			if(ghost3PathfinderDirections.includes('up')){
				//The other direction is up, which is blocked
				ghost3AvailablePaths = ['down'];
				ghost3PathFirst = 'down';
			} else if(ghost3PathfinderDirections.includes('down')){
				//The other direction is down, which is blocked
				ghost3AvailablePaths = ['up'];
				ghost3PathFirst = 'up';
			}

		} else if(ghost3CurrentDirection === 'down'){
			//Traveling down when up and another is blocked
			ghost3PathOriginalDirection = 'down';

			if(ghost3PathfinderDirections.includes('left')){
				//The other direction is left, which is blocked
				ghost3AvailablePaths = ['right'];
				ghost3PathFirst = 'right';
			} else if(ghost3PathfinderDirections.includes('right')){
				//The other direction is right, which is blocked
				ghost3AvailablePaths = ['left'];
				ghost3PathFirst = 'left';
			}

		} else if(ghost3CurrentDirection === 'left'){
			//Traveling left when up and another is blocked
			ghost3PathOriginalDirection = 'left';

			if(ghost3PathfinderDirections.includes('up')){
				//The other direction is up, which is blocked
				ghost3AvailablePaths = ['down'];
				ghost3PathFirst = 'down';
			} else if(ghost3PathfinderDirections.includes('down')){
				//The other direction is down, which is blocked
				ghost3AvailablePaths = ['up'];
				ghost3PathFirst = 'up';
			}

		}//End 2 optimal path direction check

	}//End if 1 or 2 optimal paths being blocked

}//End if ghost3RemainingPaths is full or empty

}//End if ghostPathfind is enabled

}//End if ghost3ContinuePathfind is enabled




//
//Scatter | Random Movements
//

//Randomize Choice
ghost3Chance = Math.floor(Math.random()*100);

if(ghost3PowerUpHit){
	//Reverse hit
	rotateGhost3(ghost3PathReverse);
	moveGhost3(ghost3PathReverse);
	ghost3PowerUpHit = false;
	//disable pathfinding on power up
	//re-enable on respawn
} else{

	//If only 1 move is available, i.e. pathfinding ignore and do that
	if(ghost3AvailablePaths.length === 1){
		rotateGhost3(ghost3AvailablePaths[0]);
		moveGhost3(ghost3AvailablePaths[0]);

	} else if(ghost3AvailablePaths.length === 2){
	//Check if only 2 paths which will always include reverse. That is least likely to be choosen so select other most of the time
	//Forward, Reverse
	//Reverse, Turn 1
	//Reverse, Turn 2

		//When optimal paths are available, choose equally from them
		if(ghost3Pathfind){

			//Chance of choosing 1 direction over the other
			if(ghost3Chance >= 75){
				rotateGhost3(ghost3AvailablePaths[0]);
				moveGhost3(ghost3AvailablePaths[0]);
			} else {
				//Assign other available direction
				rotateGhost3(ghost3AvailablePaths[1]);
				moveGhost3(ghost3AvailablePaths[1]);
			}

		} else {

			//Chance of reversing direction at 4%
			if(ghost3Chance >= 96){
				//Reverse hit
				rotateGhost3(ghost3PathReverse);
				moveGhost3(ghost3PathReverse);

			} else {

				//Select other available path
				if(ghost3AvailablePaths.indexOf(ghost3PathReverse) === 0){
					//Assign other available direction
					rotateGhost3(ghost3AvailablePaths[1]);
					moveGhost3(ghost3AvailablePaths[1]);

				} else {
					//Assign other available direction
					rotateGhost3(ghost3AvailablePaths[0]);
					moveGhost3(ghost3AvailablePaths[0]);
				}

			}

		}

	} else if(ghost3AvailablePaths.length === 3){
	//Reverse, Turn 1, Turn 2
	//Forward, Reverse, Turn 1
	//Forward, Reverse, Turn 2

		//Chance of reversing direction at 4%
		if(ghost3Chance >= 96){
			//Reverse hit
			rotateGhost3(ghost3PathReverse);
			moveGhost3(ghost3PathReverse);

		} else {
			//Select other available path

			//Remove reverse direction from path array
			ghost3AvailablePaths.splice(ghost3AvailablePaths.indexOf(ghost3PathReverse), 1);

			//start with a 50/50 chance of choosing direction
			if(ghost3Chance > 50){
				//Direction 0 hit
				rotateGhost3(ghost3AvailablePaths[0]);
				moveGhost3(ghost3AvailablePaths[0]);

			} else {
				//Direction 1 hit
				rotateGhost3(ghost3AvailablePaths[1]);
				moveGhost3(ghost3AvailablePaths[1]);

			}

		}

	} else if(ghost3AvailablePaths.length === 4){
	//Forward, Reverse, Turn 1, Turn 2

		//Chance of reversing direction at 4%
		if(ghost3Chance >= 96){
			//Reverse hit
			rotateGhost3(ghost3PathReverse);
			moveGhost3(ghost3PathReverse);

		} else {
			//Select other available path
			//Remove reverse direction from path array
			ghost3AvailablePaths.splice(ghost3AvailablePaths.indexOf(ghost3PathReverse), 1);

			if(ghost3Chance < 96 && ghost3Chance >= 68 ){
				//Direction 0 hit
				rotateGhost3(ghost3AvailablePaths[0]);
				moveGhost3(ghost3AvailablePaths[0]);

			} else if(ghost3Chance < 68 && ghost3Chance >= 32 ){
				//Direction 1 hit
				rotateGhost3(ghost3AvailablePaths[1]);
				moveGhost3(ghost3AvailablePaths[1]);

			} else if(ghost3Chance < 32 && ghost3Chance >= 0 ){
				//Direction 2 hit
				rotateGhost3(ghost3AvailablePaths[2]);
				moveGhost3(ghost3AvailablePaths[2]);

			}

		}

	}//End if/else ghost3AvailablePaths length check

}//End if power up just hit

}//End ghost3Input

//Ghost3 Path Switching Chances on Collected Dots
function ghost3PathSwitching(){

//Check ghost start chase minimum
if(ghost3ChaseCheckIteration === 0){

	if(eatenDots >= maxDots * ghost3StartChaseTo){
		ghost3Pathfind = true;
		ghost3ChaseCheckIteration++;
	}

} else if(ghost3ChaseCheckIteration >= 1){
	//Check minimum start + interation increase of %
	if(eatenDots >= maxDots * (ghost3StartChaseTo + (switchChaseCheck * ghost3ChaseCheckIteration))){

		//Check percentage chase to swap ghostPathfind
		if(ghost3Pathfind){
			if(Math.floor(Math.random()*100) <= ghost3SwitchChaseChance){
				ghost3Pathfind = false;
			}
		} else {
			if(Math.floor(Math.random()*100) >= ghost3SwitchChaseChance){
				ghost3Pathfind = true;
			}
		}
		//Decrease chance of switching away from chase
		//ghost3SwitchChaseChance -= 4;
		//Increase iteration check
		ghost3ChaseCheckIteration++;

	}//Eaten dots increasing percentage check

}//End if/else

}//End ghost3PathSwitching

//Power Down
function powerDownGhost3(){
	//Ghost 3
	ghost3PoweredUp = false;
	//Reset ghost material animation change
	ghost3Eye1Socket.emit('poweredDown',{});
	ghost3Eye1.emit('poweredDown',{});
	ghost3Eye2Socket.emit('poweredDown',{});
	ghost3Eye2.emit('poweredDown',{});
	ghost3Mouth.emit('poweredDown',{});
	ghost3Spin.emit('poweredDown',{});
	ghost3Head.emit('poweredDown',{});
	ghost3Body.emit('poweredDown',{});
	ghost3Legs1.emit('poweredDown',{});
	ghost3Legs2.emit('poweredDown',{});
	ghost3Legs3.emit('poweredDown',{});
	ghost3Legs4.emit('poweredDown',{});
}

//Reset Ghost
function resetGhost3(){
	//Ghost3
	ghost3Hit = false;
	ghost3PoweredUp = false;
	ghost3PowerUpHit = false;
	ghost3RecentDeath = false;
	ghost3Start = false;
	clearTimeout(ghost3StartTimeout0);
	clearTimeout(ghost3StartTimeout);
	clearTimeout(ghost3ReturnTimeout);
	clearTimeout(ghost3ReturnTimeout2);
	ghost3OnBoard.setAttribute('visible', true);
	ghost3Spin.setAttribute('visible', true);
	//Currently Choosen Direction
	ghost3InputDirection = 'none';
	//Spawn at 0 0 0 and Facing Up
	ghost3Pos.copy(ghost3Spawn);
	ghost3CurrentDirection = 'right';
	ghost3OnBoard.object3D.position.copy(ghost3Pos);
	//Tunnel teleporting and decision blocking delays
	ghost3TunnelHit = false;
	ghost3TunnelTeleport = false;
	ghost3InTunnel = false;
	moveGhost3Animation = {};
	ghost3OnBoard.setAttribute('animation__moveGhost3Animation', moveGhost3Animation);
	ghost3CheckForPathSwitch = true;
	if(poweredUp){
		ghost3Pathfind = ghost3PathfindPreviously;
	}
}

//startGhost3Interval
function startGhost3Interval(interval) {

ghost3Interval = setInterval(function() {

	//Update that Ghost has started
	ghost3Start = true;

	if(ghost3InTunnel){
	//In tunnel, auto move no thoughts
		moveGhost3(ghost3CurrentDirection);
	} else {
		//Choose Ghost move
		ghost3Input();
	}//end ghost3InTunnel exception

}, interval);//Interval

}//End startGhost3Interval

//
//Ghost 4
//

//Animate Ghost POS movement
function setGhost4Position(pos){

	//Allow time for ghost to move before setting
	ghost4MoveSetPosTimeout = setTimeout(function () {
		//Update phantom 
		ghost4Pos.copy(pos);
	}, stepIntervalGhost4/4); //Delay 

	//Animate Player Movement
	if(ghost4CurrentDirection === 'left' || ghost4CurrentDirection === 'right'){
	moveGhost4Animation = {
		property: 'object3D.position.x',
		to: pos.x,
		dur: stepIntervalGhost4/2,
		delay: 0,
		loop: 'false',
		dir: 'normal',
		easing:'linear',
		elasticity: 400,
		autoplay: 'true',
		enabled: 'true',
		};
	} else {
	moveGhost4Animation = {
		property: 'object3D.position.z',
		to: pos.z,
		dur: stepIntervalGhost4/2,
		delay: 0,
		loop: 'false',
		dir: 'normal',
		easing:'linear',
		elasticity: 400,
		autoplay: 'true',
		enabled: 'true',
		};
	}
	//Set movement animation to Player
	ghost4OnBoard.setAttribute('animation__moveGhost4Animation', moveGhost4Animation);

}//End setGhost4Position

//Rotate Ghost 4
function rotateGhost4(direction){

if(direction === "up"){
	//Emit eye movement animation
	ghost4Eye1.emit('lookUp',{});
	ghost4Eye2.emit('lookUp',{});
	ghost4CurrentDirection = 'up';
} else if(direction === "left"){
	//Emit eye movement animation
	ghost4Eye1.emit('lookLeft',{});
	ghost4Eye2.emit('lookLeft',{});
	ghost4CurrentDirection = 'left';
} else if(direction === "right"){
	//Emit eye movement animation
	ghost4Eye1.emit('lookRight',{});
	ghost4Eye2.emit('lookRight',{});
	ghost4CurrentDirection = 'right';
} else if(direction === "down"){
	//Emit eye movement animation
	ghost4Eye1.emit('lookDown',{});
	ghost4Eye2.emit('lookDown',{});
	ghost4CurrentDirection = 'down';
}

}//End rotateGhost4

//Check obstacles by Ghosts Position in Direction and move/prep to move
function moveGhost4(direction){

//Get ghost position
ghost4CurrentPos.copy(ghost4Pos);

//Get player position
ghost4NewPos.copy(ghost4CurrentPos);
//ghost4NewPos.copy(ghost4Pos);

//Init 2nd Move
clearTimeout(ghost4Move2Timeout);

//Move based on Direction
if(direction === 'up' ){
	//Set ghost's new position
	ghost4NewPos.z -= stepDistance;
	//Set movement position
	setGhost4Position(ghost4NewPos);
	//2nd Step Move
	ghost4Move2Timeout = setTimeout(function () {
		//Set ghost's new position
		ghost4NewPos.z -= stepDistance;
		//Set movement position
		setGhost4Position(ghost4NewPos);
		clearTimeout(ghost4Move2Timeout);
	}, stepIntervalGhost4/2); //Delay


} else if(direction === 'left'){
	//Set ghost's new position
	ghost4NewPos.x -= stepDistance;
	//Set movement position
	setGhost4Position(ghost4NewPos);

	//2nd Step Move
	ghost4Move2Timeout = setTimeout(function () {
		//Set ghost's new position
		ghost4NewPos.x -= stepDistance;
		//Set movement position
		setGhost4Position(ghost4NewPos);
		clearTimeout(ghost4Move2Timeout);
	}, stepIntervalGhost4/2); //Delay

	//Check for tunnel
	if (ghost4TunnelTeleport) {
		//Override normal 2nd Step
		clearInterval(ghost4Move2Timeout);
		//Reset tunnelHit
		ghost4TunnelTeleport = false;
		ghost4OnBoard.setAttribute('visible',false);
		//Set movement position slightly out of bounds
		setGhost4Position(mapTunnelsGhost[1]);
		//Reset ghost4TunnelTeleport
		ghost4InTunnel = true;
		//Delay half stepIntervalPlayer, then teleport for tunnel
		ghost4TunnelTimeout = setTimeout(function () {
			//Reset ghost4TunnelTeleport
			ghost4InTunnel = false;
			ghost4OnBoard.setAttribute('visible',true);
			//Clear Timeout
			//clearTimeout(ghost4TunnelTimeout);
		}, stepIntervalGhost4); //Delay for Full Step

	}

} else if(direction === 'right'){
	//Set ghost's new position
	ghost4NewPos.x += stepDistance;
	//Set movement position
	setGhost4Position(ghost4NewPos);
	//2nd Step Move
	ghost4Move2Timeout = setTimeout(function () {
		//Set ghost's new position
		ghost4NewPos.x += stepDistance;
		//Set movement position
		setGhost4Position(ghost4NewPos);
		clearTimeout(ghost4Move2Timeout);
	}, stepIntervalGhost4/2); //Delay

	//Check for tunnel
	if (ghost4TunnelTeleport) {
		//Override normal 2nd Step
		clearInterval(ghost4Move2Timeout);
		//Reset ghost4TunnelTeleport
		ghost4TunnelTeleport = false;
		ghost4OnBoard.setAttribute('visible',false);
		//Set movement position slightly out of bounds
		setGhost4Position(mapTunnelsGhost[0]);
		//Reset ghost4TunnelTeleport
		ghost4InTunnel = true;
		//Delay half stepIntervalGhost4, then teleport for tunnel
		ghost4TunnelTimeout = setTimeout(function () {
			//Reset ghost4TunnelTeleport
			ghost4InTunnel = false;
			ghost4OnBoard.setAttribute('visible',true);
			//Clear Timeout
			//clearTimeout(ghost4TunnelTimeout);
		}, stepIntervalGhost4); //Delay for Full Step

	}

} else if(direction === 'down'){
	//Set ghost's new position
	ghost4NewPos.z += stepDistance;

	//Set movement position
	setGhost4Position(ghost4NewPos);

	//2nd Step Move
	ghost4Move2Timeout = setTimeout(function () {
		//Set ghost's new position
		ghost4NewPos.z += stepDistance;
		//Set movement position
		setGhost4Position(ghost4NewPos);
		clearTimeout(ghost4Move2Timeout);
		}, stepIntervalGhost4/2); //Delay for Full Step
}//End if/else

}//End moveGhost4

//Ghost 4 Decision making for movement
function ghost4Input(){

//Get current player position
ghost4CurrentPosAtInput.copy(ghost4Pos);

//Reset availablePaths array
ghost4AvailablePaths = [];

//Depending on current direction assign up, down, left or right
//Relative to currentDirection path

//Depending on direction, assign X or Z to be checked for integer
if(ghost4CurrentDirection === 'up'){
	//Set Integer Check
	ghost4CheckXorZ = ghost4CurrentPosAtInput.z;
	//Set Current Path Directions
	ghost4PathReverse = 'down';
	ghost4PathTurn1 = 'left';
	ghost4PathTurn2 = 'right';

} else if(ghost4CurrentDirection === 'down') {
	//Set Integer Check
	ghost4CheckXorZ = ghost4CurrentPosAtInput.z;
	//Set Current Path Directions
	ghost4PathReverse = 'up';
	ghost4PathTurn1 = 'left';
	ghost4PathTurn2 = 'right';

} else if(ghost4CurrentDirection === 'left') {
	//Set Integer Check
	ghost4CheckXorZ = ghost4CurrentPosAtInput.x;
	//Set Current Path Directions
	ghost4PathReverse = 'right';
	ghost4PathTurn1 = 'up';
	ghost4PathTurn2 = 'down';

} else if(ghost4CurrentDirection === 'right'){
	//Set Integer Check
	ghost4CheckXorZ = ghost4CurrentPosAtInput.x;
	//Set Current Path Directions
	ghost4PathReverse = 'left';
	ghost4PathTurn1 = 'up';
	ghost4PathTurn2 = 'down';
}

//Ghost is at integer location, check for available movement
if(Number.isInteger(ghost4CheckXorZ)){

	//Check for Current Direction obstacles
	if(checkMapObstacles(ghost4CurrentPosAtInput, ghost4CurrentDirection,'ghost4')){
		//Current direction clear, append available paths
		ghost4AvailablePaths.push(ghost4CurrentDirection);
	}

	//Check for Current Direction obstacles
	if(checkMapObstacles(ghost4CurrentPosAtInput, ghost4PathReverse,'ghost4')){
		//Current direction clear, append available paths
		ghost4AvailablePaths.push(ghost4PathReverse);
	}

	//Check for Current Direction obstacles
	if(checkMapObstacles(ghost4CurrentPosAtInput, ghost4PathTurn1,'ghost4')){
		//Current direction clear, append available paths
		ghost4AvailablePaths.push(ghost4PathTurn1);
	}

	//Check for Current Direction obstacles
	if(checkMapObstacles(ghost4CurrentPosAtInput, ghost4PathTurn2,'ghost4')){
		//Current direction clear, append available paths
		ghost4AvailablePaths.push(ghost4PathTurn2);
	}

}

//
//Pathfinding
//

//Is ghost continuing the same direction as before?
ghost4Continue: if(ghost4ContinuePathfind){

	//Special finishing move before recalc
	if(ghost4PathMoves === -1){
		ghost4ContinuePathfind = false;

		if(ghost4AvailablePaths.includes(ghost4PathFirst)){
			ghost4AvailablePaths = [ghost4PathFirst];
		}

	} else if(ghost4PathMoves < 6){
		ghost4PathMoves++;

		if(ghost4PathfinderDirections.length === 1){
			//1 optimal direction at check

			if(ghost4CheckMainDirection){
				if(ghost4AvailablePaths.includes(ghost4PathfinderDirections[0])){
					//keep checking if the only ghost4PathfinderDirections[0] is ready
					//if so, take it and stop continue path for new path calc
					ghost4AvailablePaths = [ghost4PathfinderDirections[0]];
					ghost4ContinuePathfind = false;

					//Break out of if/else checks to go directly to assigning move
					break ghost4Continue;
				}
			}

			if(ghost4AvailablePaths.includes(ghost4PathFirst)){
				//Else check if ghost4PathFirst direction is still good
				//if so, take it and add keep continuing ghost4PathfinderDirections[0] checks
				ghost4AvailablePaths = [ghost4PathFirst];
				//Ensure we check for main direction next round
				ghost4CheckMainDirection = true;

			} else {
				//if both of those are blocked
				//change current direction to opposite of ghost4PathfinderDirections[0]
				//continue path and will stop looking for ghost4PathfinderDirections[0] temp, but look for ghost4PathFirst direction instead
				//while moving in the opposite of ghost4PathfinderDirections[0] when ghost4PathFirst direction hits, take it and continue path calc

				if(ghost4PathfinderDirections[0] === 'up'){
					if(ghost4AvailablePaths.includes('down')){
						ghost4AvailablePaths = ['down'];
					}
					ghost4CheckMainDirection = false;
				} else if(ghost4PathfinderDirections[0] === 'right'){
					if(ghost4AvailablePaths.includes('left')){
						ghost4AvailablePaths = ['left'];
					}
					ghost4CheckMainDirection = false;
				} else if(ghost4PathfinderDirections[0] === 'down'){
					if(ghost4AvailablePaths.includes('up')){
						ghost4AvailablePaths = ['up'];
					}
					ghost4CheckMainDirection = false;
				} else if(ghost4PathfinderDirections[0] === 'left'){
					if(ghost4AvailablePaths.includes('right')){
						ghost4AvailablePaths = ['right'];
					}
					ghost4CheckMainDirection = false;
				}

			}//End 1 optimal direction path check

		} else {
			//2 optimal directions at check

			if(ghost4CheckMainDirection){
				if(ghost4AvailablePaths.includes(ghost4PathOriginalDirection)){
					//keep checking for ghost4PathOriginalDirection is ready
					//When that hits, take it and set to -1 for finishing move of
					//the opposite direction of ghost4PathFirst
					ghost4AvailablePaths = [ghost4PathOriginalDirection];
					ghost4PathMoves = -1;

					//Break out of if/else checks to go directly to assigning move
					break ghost4Continue;
				}
			}

			if(ghost4AvailablePaths.includes(ghost4PathFirst)){
				//Else continue path of ghost4PathFirst
				ghost4AvailablePaths = [ghost4PathFirst];
				//Ensure we check for main direction next round
				ghost4CheckMainDirection = true;

			} else {
				//If continue path of ghost4PathFirst fails and ghost4PathOriginalDirection is still not ready
				//Then go opposite of ghost4PathOriginalDirection until ghost4PathFirst hits again
				//When that hits, -1 with a finishing move of ghost4PathOriginalDirection

				if(ghost4PathOriginalDirection === 'up'){
					if(ghost4AvailablePaths.includes('down')){
						ghost4AvailablePaths = ['down'];
					}
					ghost4CheckMainDirection = false;
				} else if(ghost4PathOriginalDirection === 'right'){
					if(ghost4AvailablePaths.includes('left')){
						ghost4AvailablePaths = ['left'];
					}
					ghost4CheckMainDirection = false;
				} else if(ghost4PathOriginalDirection === 'down'){
					if(ghost4AvailablePaths.includes('up')){
						ghost4AvailablePaths = ['up'];
					}
					ghost4CheckMainDirection = false;
				} else if(ghost4PathOriginalDirection === 'left'){
					if(ghost4AvailablePaths.includes('right')){
						ghost4AvailablePaths = ['right'];
					}
					ghost4CheckMainDirection = false;
				}

			}

		}//End pathfind length check

	} else {
		//Failed to find a path, move in any available direction and recalc
		ghost4ContinuePathfind = false;

	}//End check amount of moves and previous move still good

} else {
//Starting new path

//Pathfind is enabled, start path
if(ghost4Pathfind){
//Clear previous pathfinding directions
ghost4PathOriginalDirection = '';
ghost4CheckMainDirection = true;
ghost4PathfinderDirections = [];
ghost4RemainingPaths = [];
ghost4PathAvailableTemp = []
ghost4PathMoves = 0;

//Use this ghosts position as start and the players as end
ghost4PathfinderDirections = pathfinder(ghost4CurrentPosAtInput,playerPos);

//use the returned array to check with ghost4AvailablePaths array for available directions to choose from

//ghost4PathfinderDirections
//has 0(error/ignore), 1 or 2 directions to choose from
if(ghost4PathfinderDirections.length > 0){
	//Loop through available directions to choose from
	//See if any match pathfinding directions, if so choose from those
	//Else choose any other available path
	for(let i = 0; i < ghost4PathfinderDirections.length; i++){
		if(ghost4AvailablePaths.includes(ghost4PathfinderDirections[i])){
			//Optimal direction is available
			ghost4RemainingPaths.push(ghost4PathfinderDirections[i]);
		}

	}
//console.log(ghost4RemainingPaths);
}

//If any pathfind direction's are available, use them. Otherwise continue path
if(ghost4RemainingPaths.length > 0){
	ghost4AvailablePaths = ghost4RemainingPaths;

} else {
	//All pathfinding directions are blocked
	ghost4ContinuePathfind = true;
	ghost4PathMoves = 1;

	if(ghost4PathfinderDirections.length === 1){
		//Only 1 optimal direction is found and is blocked

		if(ghost4PathfinderDirections[0] === 'up'){
			//Need to move Upwards

			if(ghost4CurrentDirection === 'up'){
				//Traveling upwards when blocked
				ghost4PathOriginalDirection = 'up';

				//Check if 1 or both perpindicular directions are available
				if(ghost4AvailablePaths.includes('left')){
					ghost4PathAvailableTemp.push('left');
				}
				if(ghost4AvailablePaths.includes('right')){
					ghost4PathAvailableTemp.push('right');
				}
				//Choose the only 1 available, unless there are 2 then either
				if(ghost4PathAvailableTemp.length > 1){
					if(Math.floor(Math.random()*2) > 0){
						ghost4AvailablePaths = [ghost4PathAvailableTemp[1]];
						ghost4PathFirst = ghost4PathAvailableTemp[1];
					} else {
						ghost4AvailablePaths = [ghost4PathAvailableTemp[0]];
						ghost4PathFirst = ghost4PathAvailableTemp[0];
					}
				} else {
					ghost4AvailablePaths = [ghost4PathAvailableTemp[0]];
					ghost4PathFirst = ghost4PathAvailableTemp[0];
				}
				
			} else if(ghost4CurrentDirection === 'left'){
				//Traveling left when up is checked and blocked
				ghost4PathOriginalDirection = 'left';

				//Check if the current direction is still available
				if(ghost4AvailablePaths.includes('left')){
					ghost4AvailablePaths = ['left'];
					ghost4PathFirst = 'left';
				} else {
					//Up and Left are blocked, coming from the right. Go down
					if(ghost4AvailablePaths.includes('down')){
						ghost4AvailablePaths = ['down'];
						ghost4PathFirst = 'down';
					}
				}
			} else if(ghost4CurrentDirection === 'right'){
				//Traveling right when up is checked and blocked
				ghost4PathOriginalDirection = 'right';

				//Check if the current direction is still available
				if(ghost4AvailablePaths.includes('right')){
					ghost4AvailablePaths = ['right'];
					ghost4PathFirst = 'right';
				} else {
					//Up and Right are blocked, coming from the right. Go down
					if(ghost4AvailablePaths.includes('down')){
						ghost4AvailablePaths = ['down'];
						ghost4PathFirst = 'down';
					}
				}
			}

		} else if(ghost4PathfinderDirections[0] === 'right'){
			//Need to move to the Right

			if(ghost4CurrentDirection === 'right'){
				//Traveling right when blocked
				ghost4PathOriginalDirection = 'right';

				//Check if 1 or both perpindicular directions are available
				if(ghost4AvailablePaths.includes('up')){
					ghost4PathAvailableTemp.push('up');
				}
				if(ghost4AvailablePaths.includes('down')){
					ghost4PathAvailableTemp.push('down');
				}
				//Choose the only 1 available, unless there are 2 then either
				if(ghost4PathAvailableTemp.length > 1){
					if(Math.floor(Math.random()*2) > 0){
						ghost4AvailablePaths = [ghost4PathAvailableTemp[1]];
						ghost4PathFirst = ghost4PathAvailableTemp[1];
					} else {
						ghost4AvailablePaths = [ghost4PathAvailableTemp[0]];
						ghost4PathFirst = ghost4PathAvailableTemp[0];
					}
				} else {
					ghost4AvailablePaths = [ghost4PathAvailableTemp[0]];
					ghost4PathFirst = ghost4PathAvailableTemp[0];
				}
				
			} else if(ghost4CurrentDirection === 'up'){
				//Traveling up when right is checked and blocked
				ghost4PathOriginalDirection = 'up';

				//Check if the current direction is still available
				if(ghost4AvailablePaths.includes('up')){
					ghost4AvailablePaths = ['up'];
					ghost4PathFirst = 'up';
				} else {
					//Up and Left are blocked, coming from the right. Go down
					if(ghost4AvailablePaths.includes('left')){
						ghost4AvailablePaths = ['left'];
						ghost4PathFirst = 'left';
					}
				}
			} else if(ghost4CurrentDirection === 'down'){
				//Traveling down when right is checked and blocked
				ghost4PathOriginalDirection = 'down';

				//Check if the current direction is still available
				if(ghost4AvailablePaths.includes('down')){
					ghost4AvailablePaths = ['down'];
					ghost4PathFirst = 'down';
				} else {
					//Up and Right are blocked, coming from the right. Go down
					if(ghost4AvailablePaths.includes('left')){
						ghost4AvailablePaths = ['left'];
						ghost4PathFirst = 'left';
					}
				}
			}

		} else if(ghost4PathfinderDirections[0] === 'down'){
			//Need to move Downwards

			if(ghost4CurrentDirection === 'down'){
				//Traveling downwards when blocked
				ghost4PathOriginalDirection = 'down';

				//Check if 1 or both perpindicular directions are available
				if(ghost4AvailablePaths.includes('left')){
					ghost4PathAvailableTemp.push('left');
				}
				if(ghost4AvailablePaths.includes('right')){
					ghost4PathAvailableTemp.push('right');
				}
				//Choose the only 1 available, unless there are 2 then either
				if(ghost4PathAvailableTemp.length > 1){
					if(Math.floor(Math.random()*2) > 0){
						ghost4AvailablePaths = [ghost4PathAvailableTemp[1]];
						ghost4PathFirst = ghost4PathAvailableTemp[1];
					} else {
						ghost4AvailablePaths = [ghost4PathAvailableTemp[0]];
						ghost4PathFirst = ghost4PathAvailableTemp[0];
					}
				} else {
					ghost4AvailablePaths = [ghost4PathAvailableTemp[0]];
					ghost4PathFirst = ghost4PathAvailableTemp[0];
				}
				
			} else if(ghost4CurrentDirection === 'left'){
				//Traveling left when down is checked and blocked
				ghost4PathOriginalDirection = 'left';

				//Check if the current direction is still available
				if(ghost4AvailablePaths.includes('left')){
					ghost4AvailablePaths = ['left'];
					ghost4PathFirst = 'left';
				} else {
					//Up and Left are blocked, coming from the right. Go down
					if(ghost4AvailablePaths.includes('up')){
						ghost4AvailablePaths = ['up'];
						ghost4PathFirst = 'up';
					}
				}
			} else if(ghost4CurrentDirection === 'right'){
				//Traveling right when down is checked and blocked
				ghost4PathOriginalDirection = 'right';

				//Check if the current direction is still available
				if(ghost4AvailablePaths.includes('right')){
					ghost4AvailablePaths = ['right'];
					ghost4PathFirst = 'right';
				} else {
					//Up and Right are blocked, coming from the right. Go down
					if(ghost4AvailablePaths.includes('up')){
						ghost4AvailablePaths = ['up'];
						ghost4PathFirst = 'up';
					}
				}
			}

		} else if(ghost4PathfinderDirections[0] === 'left'){
			//Need to move to the Left

			if(ghost4CurrentDirection === 'left'){
				//Traveling left when blocked
				ghost4PathOriginalDirection = 'left';

				//Check if 1 or both perpindicular directions are available
				if(ghost4AvailablePaths.includes('up')){
					ghost4PathAvailableTemp.push('up');
				}
				if(ghost4AvailablePaths.includes('down')){
					ghost4PathAvailableTemp.push('down');
				}
				//Choose the only 1 available, unless there are 2 then either
				if(ghost4PathAvailableTemp.length > 1){
					if(Math.floor(Math.random()*2) > 0){
						ghost4AvailablePaths = [ghost4PathAvailableTemp[1]];
						ghost4PathFirst = ghost4PathAvailableTemp[1];
					} else {
						ghost4AvailablePaths = [ghost4PathAvailableTemp[0]];
						ghost4PathFirst = ghost4PathAvailableTemp[0];
					}
				} else {
					ghost4AvailablePaths = [ghost4PathAvailableTemp[0]];
					ghost4PathFirst = ghost4PathAvailableTemp[0];
				}
				
			} else if(ghost4CurrentDirection === 'up'){
				//Traveling up when left is checked and blocked
				ghost4PathOriginalDirection = 'up';

				//Check if the current direction is still available
				if(ghost4AvailablePaths.includes('up')){
					ghost4AvailablePaths = ['up'];
					ghost4PathFirst = 'up';
				} else {
					//Up and Left are blocked, coming from the left. Go right
					if(ghost4AvailablePaths.includes('right')){
						ghost4AvailablePaths = ['right'];
						ghost4PathFirst = 'right';
					}
				}
			} else if(ghost4CurrentDirection === 'down'){
				//Traveling down when left is checked and blocked
				ghost4PathOriginalDirection = 'down';

				//Check if the current direction is still available
				if(ghost4AvailablePaths.includes('down')){
					ghost4AvailablePaths = ['down'];
					ghost4PathFirst = 'down';
				} else {
					//Up and Left are blocked, coming from the left. Go right
					if(ghost4AvailablePaths.includes('right')){
						ghost4AvailablePaths = ['right'];
						ghost4PathFirst = 'right';
					}
				}
			}

		}//End directionCheck within a single optimal direction
	} else {
		//2 optimal directions found and both are blocked

		if(ghost4CurrentDirection === 'up'){
			//Traveling up when up and another is blocked
			ghost4PathOriginalDirection = 'up';

			if(ghost4PathfinderDirections.includes('left')){
				//The other direction is left, which is blocked
				ghost4AvailablePaths = ['right'];
				ghost4PathFirst = 'right';
			} else if(ghost4PathfinderDirections.includes('right')){
				//The other direction is right, which is blocked
				ghost4AvailablePaths = ['left'];
				ghost4PathFirst = 'left';
			}

		} else if(ghost4CurrentDirection === 'right'){
			//Traveling right when up and another is blocked
			ghost4PathOriginalDirection = 'right';

			if(ghost4PathfinderDirections.includes('up')){
				//The other direction is up, which is blocked
				ghost4AvailablePaths = ['down'];
				ghost4PathFirst = 'down';
			} else if(ghost4PathfinderDirections.includes('down')){
				//The other direction is down, which is blocked
				ghost4AvailablePaths = ['up'];
				ghost4PathFirst = 'up';
			}

		} else if(ghost4CurrentDirection === 'down'){
			//Traveling down when up and another is blocked
			ghost4PathOriginalDirection = 'down';

			if(ghost4PathfinderDirections.includes('left')){
				//The other direction is left, which is blocked
				ghost4AvailablePaths = ['right'];
				ghost4PathFirst = 'right';
			} else if(ghost4PathfinderDirections.includes('right')){
				//The other direction is right, which is blocked
				ghost4AvailablePaths = ['left'];
				ghost4PathFirst = 'left';
			}

		} else if(ghost4CurrentDirection === 'left'){
			//Traveling left when up and another is blocked
			ghost4PathOriginalDirection = 'left';

			if(ghost4PathfinderDirections.includes('up')){
				//The other direction is up, which is blocked
				ghost4AvailablePaths = ['down'];
				ghost4PathFirst = 'down';
			} else if(ghost4PathfinderDirections.includes('down')){
				//The other direction is down, which is blocked
				ghost4AvailablePaths = ['up'];
				ghost4PathFirst = 'up';
			}

		}//End 2 optimal path direction check

	}//End if 1 or 2 optimal paths being blocked

}//End if ghost4RemainingPaths is full or empty

}//End if ghostPathfind is enabled

}//End if ghost4ContinuePathfind is enabled


//
//Scatter | Random Movements
//


//Randomize Choice
ghost4Chance = Math.floor(Math.random()*100);


if(ghost4PowerUpHit){
	//Reverse hit
	rotateGhost4(ghost4PathReverse);
	moveGhost4(ghost4PathReverse);
	ghost4PowerUpHit = false;
	//disable pathfinding on power up
	//re-enable on respawn
} else{

	//If only 1 move is available, i.e. pathfinding ignore and do that
	if(ghost4AvailablePaths.length === 1){
		rotateGhost4(ghost4AvailablePaths[0]);
		moveGhost4(ghost4AvailablePaths[0]);

	} else if(ghost4AvailablePaths.length === 2){
	//Check if only 2 paths which will always include reverse. That is least likely to be choosen so select other most of the time
	//Forward, Reverse
	//Reverse, Turn 1
	//Reverse, Turn 2

		//When optimal paths are available, choose equally from them
		if(ghost4Pathfind){

			//Chance of reversing direction at 4%
			if(ghost4Chance >= 50){
				rotateGhost4(ghost4AvailablePaths[0]);
				moveGhost4(ghost4AvailablePaths[0]);
			} else {
				//Assign other available direction
				rotateGhost4(ghost4AvailablePaths[1]);
				moveGhost4(ghost4AvailablePaths[1]);
			}

		} else {

			//Chance of choosing 1 direction over the other
			if(ghost4Chance >= 96){
				//Reverse hit
				rotateGhost4(ghost4PathReverse);
				moveGhost4(ghost4PathReverse);

			} else {

				//Select other available path
				if(ghost4AvailablePaths.indexOf(ghost4PathReverse) === 0){
					//Assign other available direction
					rotateGhost4(ghost4AvailablePaths[1]);
					moveGhost4(ghost4AvailablePaths[1]);

				} else {
					//Assign other available direction
					rotateGhost4(ghost4AvailablePaths[0]);
					moveGhost4(ghost4AvailablePaths[0]);
				}

			}

		}

	} else if(ghost4AvailablePaths.length === 3){
	//Reverse, Turn 1, Turn 2
	//Forward, Reverse, Turn 1
	//Forward, Reverse, Turn 2

		//Chance of reversing direction at 4%
		if(ghost4Chance >= 96){
			//Reverse hit
			rotateGhost4(ghost4PathReverse);
			moveGhost4(ghost4PathReverse);

		} else {
			//Select other available path

			//Remove reverse direction from path array
			ghost4AvailablePaths.splice(ghost4AvailablePaths.indexOf(ghost4PathReverse), 1);

			//start with a 50/50 chance of choosing direction
			if(ghost4Chance > 50){
				//Direction 0 hit
				rotateGhost4(ghost4AvailablePaths[0]);
				moveGhost4(ghost4AvailablePaths[0]);

			} else {
				//Direction 1 hit
				rotateGhost4(ghost4AvailablePaths[1]);
				moveGhost4(ghost4AvailablePaths[1]);

			}

		}

	} else if(ghost4AvailablePaths.length === 4){
	//Forward, Reverse, Turn 1, Turn 2

		//Chance of reversing direction at 4%
		if(ghost4Chance >= 96){
			//Reverse hit
			rotateGhost4(ghost4PathReverse);
			moveGhost4(ghost4PathReverse);

		} else {
			//Select other available path
			//Remove reverse direction from path array
			ghost4AvailablePaths.splice(ghost4AvailablePaths.indexOf(ghost4PathReverse), 1);

			if(ghost4Chance < 96 && ghost4Chance >= 68 ){
				//Direction 0 hit
				rotateGhost4(ghost4AvailablePaths[0]);
				moveGhost4(ghost4AvailablePaths[0]);

			} else if(ghost4Chance < 68 && ghost4Chance >= 32 ){
				//Direction 1 hit
				rotateGhost4(ghost4AvailablePaths[1]);
				moveGhost4(ghost4AvailablePaths[1]);

			} else if(ghost4Chance < 32 && ghost4Chance >= 0 ){
				//Direction 2 hit
				rotateGhost4(ghost4AvailablePaths[2]);
				moveGhost4(ghost4AvailablePaths[2]);

			}

		}

	}//End if/else ghost4AvailablePaths length check

}//End if power up just hit

}//End ghost4Input

//Ghost4 Path Switching Chances on Collected Dots
function ghost4PathSwitching(){

//Check ghost start chase minimum
if(ghost4ChaseCheckIteration === 0){

	if(eatenDots >= maxDots * ghost4StartChaseTo){
		ghost4Pathfind = true;
		ghost4ChaseCheckIteration++;
	}

} else if(ghost4ChaseCheckIteration >= 1){
	//Check minimum start + interation increase of %
	if(eatenDots >= maxDots * (ghost4StartChaseTo + (switchChaseCheck * ghost4ChaseCheckIteration))){

		//Check percentage chase to swap ghostPathfind
		if(ghost4Pathfind){
			if(Math.floor(Math.random()*100) <= ghost4SwitchChaseChance){
				ghost4Pathfind = false;
			}
		} else {
			if(Math.floor(Math.random()*100) >= ghost4SwitchChaseChance){
				ghost4Pathfind = true;
			}
		}
		//Decrease chance of switching away from chase
		ghost4SwitchChaseChance += 4;
		//Increase iteration check
		ghost4ChaseCheckIteration++;

	}//Eaten dots increasing percentage check

}//End if/else

}//End ghost4PathSwitching

//Power Down
function powerDownGhost4(){
	//Ghost 4
	ghost4PoweredUp = false;
	//Reset ghost material animation change
	ghost4Eye1Socket.emit('poweredDown',{});
	ghost4Eye1.emit('poweredDown',{});
	ghost4Eye2Socket.emit('poweredDown',{});
	ghost4Eye2.emit('poweredDown',{});
	ghost4Mouth.emit('poweredDown',{});
	ghost4Spin.emit('poweredDown',{});
	ghost4Head.emit('poweredDown',{});
	ghost4Body.emit('poweredDown',{});
	ghost4Legs1.emit('poweredDown',{});
	ghost4Legs2.emit('poweredDown',{});
	ghost4Legs3.emit('poweredDown',{});
	ghost4Legs4.emit('poweredDown',{});
}

//Reset Ghost
function resetGhost4(){
	//Ghost 4
	ghost4Hit = false;
	ghost4PoweredUp = false;
	ghost4PowerUpHit = false;
	ghost4RecentDeath = false;
	ghost4Start = false;
	clearTimeout(ghost4StartTimeout0);
	clearTimeout(ghost4StartTimeout);
	clearTimeout(ghost4ReturnTimeout);
	clearTimeout(ghost4ReturnTimeout2);
	ghost4OnBoard.setAttribute('visible', true);
	ghost4Spin.setAttribute('visible', true);
	//Currently Choosen Direction
	ghost4InputDirection = 'none';
	//Spawn at 1 0 0 and Facing Up
	ghost4Pos.copy(ghost4Spawn);
	ghost4CurrentDirection = 'right';
	ghost4OnBoard.object3D.position.copy(ghost4Pos);
	//Tunnel teleporting and decision blocking delays
	ghost4TunnelHit = false;
	ghost4TunnelTeleport = false;
	ghost4InTunnel = false;
	moveGhost4Animation = {};
	ghost4OnBoard.setAttribute('animation__moveGhost4Animation', moveGhost4Animation);
	ghost4CheckForPathSwitch = true;
	if(poweredUp){
		ghost4Pathfind = ghost4PathfindPreviously;
	}
}

//startGhost4Interval
function startGhost4Interval(interval) {

ghost4Interval = setInterval(function() {

	//Update that Ghost has started
	ghost4Start = true;

	if(ghost4InTunnel){
	//In tunnel, auto move no thoughts
		moveGhost4(ghost4CurrentDirection);
	} else {
		//Choose Ghost move
		ghost4Input();
	}//end ghost4InTunnel exception


}, interval);//Interval

}//End startGhost4Interval

//
//All Ghosts
//

//Animate Ghost to Start
function ghostRelease(ghostOnBoard,ghostCurrentDirection,pos){

//Ghost Exit Base Movement
//move to x 0.5
//move to z -2
//choose
//move to x 0 and continue left
//or move to x 1 and continue right

//Allow time for ghost to move
moveGhostStartTimeout1 = setTimeout(function () {
	//move to x 0.5
	moveGhostStartAnimation = {
		property: 'object3D.position.x',
		to: 0.5,
		dur: ghostStartSpeed/2,
		delay: 0,
		loop: 'false',
		dir: 'normal',
		easing: 'linear',
		elasticity: 400,
		autoplay: 'true',
		enabled: 'true',
	};
	//Set movement animation to Player
	ghostOnBoard.setAttribute('animation__moveGhostStartAnimation', moveGhostStartAnimation);
}, 0); //Delay 

//Allow time for ghost to move
moveGhostStartTimeout2 = setTimeout(function () {
//move to z -2
	moveGhostStartAnimation = {
		property: 'object3D.position.z',
		to: -2,
		dur: ghostStartSpeed,
		delay: 0,
		loop: 'false',
		dir: 'normal',
		easing: 'linear',
		elasticity: 400,
		autoplay: 'true',
		enabled: 'true',
	};
	pos.z = -2;
	//Set movement animation to Player
	ghostOnBoard.setAttribute('animation__moveGhostStartAnimation', moveGhostStartAnimation);
}, ghostStartSpeed/2); //Delay 
//Update Ghost POS fo Z

//Allow time for ghost to move
moveGhostStartTimeout3 = setTimeout(function () {
//choose left 80% of the time
//move to x 0 and continue left
//or move to x 1 and continue right
//update ghosts current direction for input takeover

	//Animate Player Movement
	//Move left 90% of the time
	if(Math.floor(Math.random()*10 <= 9)){
		moveGhostStartAnimation = {
			property: 'object3D.position.x',
			to: 0,
			dur: ghostStartSpeed/2,
			delay: 0,
			loop: 'false',
			dir: 'normal',
			easing: 'linear',
			elasticity: 400,
			autoplay: 'true',
			enabled: 'true',
		};
		//Update Ghost POS fo Z
		pos.x = 0;
		ghostCurrentDirection = 'left';
	} else {
		moveGhostStartAnimation = {
			property: 'object3D.position.x',
			to: 1,
			dur: ghostStartSpeed/2,
			delay: 0,
			loop: 'false',
			dir: 'normal',
			easing: 'linear',
			elasticity: 400,
			autoplay: 'true',
			enabled: 'true',
		};
		ghostCurrentDirection = 'right';
		//Update Ghost POS fo Z
		pos.x = 1;
	}
	//Set movement animation to Player
	ghostOnBoard.setAttribute('animation__moveGhostStartAnimation', moveGhostStartAnimation);
}, ghostStartSpeed + (ghostStartSpeed/2)); //Delay 

}//End ghostStart

//Ghost Death
function ghostDeath(ghost){
	//Add to player kills
	poweredUpKills++;
	//Check current player kills for bonus points
	if(poweredUpKills === 1){
		playerScore += enemy1Point;
		bonusPointsDisplay(enemy1Point, playerPos);
	} else if(poweredUpKills === 2){
		playerScore += enemy2Point;
		bonusPointsDisplay(enemy2Point, playerPos);
	} else if(poweredUpKills === 3){
		playerScore += enemy3Point;
		bonusPointsDisplay(enemy3Point, playerPos);
	} else if(poweredUpKills === 4){
		playerScore += enemy4Point;
		bonusPointsDisplay(enemy4Point, playerPos);
	}

	//Play Sound
	eatGhostSound.emit('eatGhostEvent',{});

	//Pretify the Cost
	playerScoreString = prettyNums(playerScore).join('').trim();

	//Update Score Text on Kill 
	scoreText.setAttribute('text',{value: playerScorePreText + playerScoreString});
	//Sync Hi Score if better
	if(playerHitHiScore){
		hiScoreText.setAttribute('text',{value: hiScorePreText + playerScoreString});
	}

	//Depending on Ghost, start their death anim sequence
	if(ghost === 'ghost1'){
		//Recent died and invul going home
		ghost1RecentDeath = true;
		//Has Ghost died this powerUp?
		ghost1PoweredUp = false;

		//Death timeout
		ghost1DeathTimeout = setTimeout(function () {
			//Pause Ghost
			clearInterval(ghost1Interval);
			clearTimeout(ghost1Move2Timeout);

			//Rest movement speeds
			stepIntervalGhost1 -= ghostPoweredUpSpeedChange;//the interval used
			//Power down Ghost and Hide Spin
			powerDownGhost1();
			ghost1Spin.setAttribute('visible', false);
		}, stepIntervalPlayer); //Delay

		//Move back to start quickly
		moveGhost1AnimationReturn = {
			property: 'object3D.position.z',
			to: ghost1Spawn.z,
			dur: 1000,
			delay: stepIntervalPlayer*2,
			loop: 'false',
			dir: 'normal',
			easing:'easeInOutSine',
			elasticity: 400,
			autoplay: 'true',
			enabled: 'true',
			};
		//Set movement animation to Player
		ghost1OnBoard.setAttribute('animation__moveGhost1AnimationReturn', moveGhost1AnimationReturn);

		//Timeout
		ghost1ReturnTimeout = setTimeout(function () {
			//Move back to start quickly
			moveGhost1AnimationReturn = {
				property: 'object3D.position.x',
				to: ghost1Spawn.x,
				dur: 1000,
				delay: 0,
				loop: 'false',
				dir: 'normal',
				easing:'easeInOutSine',
				elasticity: 400,
				autoplay: 'true',
				enabled: 'true',
				};
			//Set movement animation to Player
			ghost1OnBoard.setAttribute('animation__moveGhost1AnimationReturn', moveGhost1AnimationReturn);
2			//clearTimeout(ghost1ReturnTimeout);
		}, (stepIntervalPlayer*3) + 1000); //Delay

		//Timeout
		ghost1ReturnTimeout2 = setTimeout(function () {
			//Reset at start
			resetGhost1();
			//Reset Hit
			ghost1Hit = false;
			//Reset Death
			ghost1RecentDeath = false;
			//Start exit movement
			ghostRelease(ghost1OnBoard,ghost1CurrentDirection,ghost1Pos);

			//Timeout
			ghost1StartTimeout = setTimeout(function () {
				//On exit move being done, start ghostInterval after ghostStartSpeed*2
				startGhost1Interval(stepIntervalGhost1);

			//clearTimeout(ghost1StartTimeout);
			}, ghostStartSpeed); //Delay
		//clearTimeout(ghost1ReturnTimeout2);
		}, 5000); //Delay

	} else if(ghost === 'ghost2'){
		//Recent died and invul going home
		ghost2RecentDeath = true;
		//Has Ghost died this powerUp?
		ghost2PoweredUp = false;

		//Death timeout
		ghost2DeathTimeout = setTimeout(function () {
			//Pause Ghost
			clearInterval(ghost2Interval);
			clearTimeout(ghost2Move2Timeout);
			//Rest movement speeds
			stepIntervalGhost2 -= ghostPoweredUpSpeedChange;//the interval used
			//Power down Ghost and Hide Spin
			powerDownGhost2();
			ghost2Spin.setAttribute('visible', false);
		}, stepIntervalPlayer); //Delay

		//Move back to start quickly
		moveGhost2AnimationReturn = {
			property: 'object3D.position.z',
			to: ghost2Spawn.z,
			dur: 1000,
			delay: stepIntervalPlayer*2,
			loop: 'false',
			dir: 'normal',
			easing:'easeInOutSine',
			elasticity: 400,
			autoplay: 'true',
			enabled: 'true',
			};
		//Set movement animation to Player
		ghost2OnBoard.setAttribute('animation__moveGhost2AnimationReturn', moveGhost2AnimationReturn);

		//Timeout
		ghost2ReturnTimeout = setTimeout(function () {
			//Move back to start quickly
			moveGhost2AnimationReturn = {
				property: 'object3D.position.x',
				to: ghost2Spawn.x,
				dur: 1000,
				delay: 0,
				loop: 'false',
				dir: 'normal',
				easing:'easeInOutSine',
				elasticity: 400,
				autoplay: 'true',
				enabled: 'true',
				};
			//Set movement animation to Player
			ghost2OnBoard.setAttribute('animation__moveGhost2AnimationReturn', moveGhost2AnimationReturn);
			//clearTimeout(ghost2ReturnTimeout);
		}, (stepIntervalPlayer*3) + 1000); //Delay

		//Timeout
		ghost2ReturnTimeout2 = setTimeout(function () {
			//Reset at start
			resetGhost2();
			//Reset Hit
			ghost2Hit = false;
			//Reset Death
			ghost2RecentDeath = false;
			//Start exit movement
			ghostRelease(ghost2OnBoard,ghost2CurrentDirection,ghost2Pos);

			//Timeout
			ghost2StartTimeout = setTimeout(function () {
				//On exit move being done, start ghostInterval after ghostStartSpeed*2
				startGhost2Interval(stepIntervalGhost2);

			//clearTimeout(ghost2StartTimeout);
			}, ghostStartSpeed); //Delay
		//clearTimeout(ghost2ReturnTimeout2);
		}, 5000); //Delay

	} else if(ghost === 'ghost3'){
		//Recent died and invul going home
		ghost3RecentDeath = true;
		//Has Ghost died this powerUp?
		ghost3PoweredUp = false;

		//Death timeout
		ghost3DeathTimeout = setTimeout(function () {
			//Pause Them
			clearInterval(ghost3Interval);
			clearTimeout(ghost3Move2Timeout);
			//Rest movement speeds
			stepIntervalGhost3 -= ghostPoweredUpSpeedChange;//the interval used
			//Power down Ghost and Hide Spin
			powerDownGhost3();
			ghost3Spin.setAttribute('visible', false);
		}, stepIntervalPlayer); //Delay

		//Move back to start quickly
		moveGhost3AnimationReturn = {
			property: 'object3D.position.z',
			to: ghost3Spawn.z,
			dur: 1000,
			delay: stepIntervalPlayer*2,
			loop: 'false',
			dir: 'normal',
			easing:'easeInOutSine',
			elasticity: 400,
			autoplay: 'true',
			enabled: 'true',
			};
		//Set movement animation to Player
		ghost3OnBoard.setAttribute('animation__moveGhost3AnimationReturn', moveGhost3AnimationReturn);

		//Timeout
		ghost3ReturnTimeout = setTimeout(function () {
			//Move back to start quickly
			moveGhost3AnimationReturn = {
				property: 'object3D.position.x',
				to: ghost3Spawn.x,
				dur: 1000,
				delay: 0,
				loop: 'false',
				dir: 'normal',
				easing:'easeInOutSine',
				elasticity: 400,
				autoplay: 'true',
				enabled: 'true',
				};
			//Set movement animation to Player
			ghost3OnBoard.setAttribute('animation__moveGhost3AnimationReturn', moveGhost3AnimationReturn);
			//clearTimeout(ghost3ReturnTimeout);
		}, (stepIntervalPlayer*3) + 1000); //Delay

		//Timeout
		ghost3ReturnTimeout2 = setTimeout(function () {
			//Reset at start
			resetGhost3();

			//Reset Hit
			ghost3Hit = false;
			//Reset Death
			ghost3RecentDeath = false;
			//Start exit movement
			ghostRelease(ghost3OnBoard,ghost3CurrentDirection,ghost3Pos);

			//Timeout
			ghost3StartTimeout = setTimeout(function () {
				//On exit move being done, start ghostInterval after ghostStartSpeed*2
				startGhost3Interval(stepIntervalGhost3);

			//clearTimeout(ghost3StartTimeout);
			}, ghostStartSpeed); //Delay
		//clearTimeout(ghost3ReturnTimeout2);
		}, 5000); //Delay

	} else if(ghost === 'ghost4'){
		//Recent died and invul going home
		ghost4RecentDeath = true;
		//Has Ghost died this powerUp?
		ghost4PoweredUp = false;

		//Death timeout
		ghost4DeathTimeout = setTimeout(function () {
			//Pause Their thinking
			clearInterval(ghost4Interval);
			clearTimeout(ghost4Move2Timeout);
			//Rest movement speeds
			stepIntervalGhost4 -= ghostPoweredUpSpeedChange;//the interval used
			//Power down Ghost and Hide Spin
			powerDownGhost4();
			ghost4Spin.setAttribute('visible', false);
		}, stepIntervalPlayer); //Delay

		//Move back to start quickly
		moveGhost4AnimationReturn = {
			property: 'object3D.position.z',
			to: ghost4Spawn.z,
			dur: 1000,
			delay: stepIntervalPlayer*2,
			loop: 'false',
			dir: 'normal',
			easing:'linear',
			elasticity: 400,
			autoplay: 'true',
			enabled: 'true',
			};
		//Set movement animation to Player
		ghost4OnBoard.setAttribute('animation__moveGhost4AnimationReturn', moveGhost4AnimationReturn);

		//Timeout
		ghost4ReturnTimeout = setTimeout(function () {
			//Move back to start quickly
			moveGhost4AnimationReturn = {
				property: 'object3D.position.x',
				to: 1,
				dur: 1000,
				delay: ghost4Spawn.x,
				loop: 'false',
				dir: 'normal',
				easing:'linear',
				elasticity: 400,
				autoplay: 'true',
				enabled: 'true',
				};
			//Set movement animation to Player
			ghost4OnBoard.setAttribute('animation__moveGhost4AnimationReturn', moveGhost4AnimationReturn);
			//clearTimeout(ghost4ReturnTimeout);
		}, (stepIntervalPlayer*3) + 1000); //Delay

		//Timeout
		ghost4ReturnTimeout2 = setTimeout(function () {
			//Reset at start
			resetGhost4();

			//Reset Hit
			ghost4Hit = false;
			//Reset Death
			ghost4RecentDeath = false;
			//Start exit movement
			ghostRelease(ghost4OnBoard,ghost4CurrentDirection,ghost4Pos);

			//Timeout
			ghost4StartTimeout = setTimeout(function () {
				//On exit move being done, start ghostInterval after ghostStartSpeed*2
				startGhost4Interval(stepIntervalGhost4);

			//clearTimeout(ghost4StartTimeout);
			}, ghostStartSpeed); //Delay
		//clearTimeout(ghost4ReturnTimeout2);
		}, 5000); //Delay
	}

}//End ghostDeath

//Pathfinder
//returns array of directions to focus on. Empty if pos is same, ignore.
function pathfinder(startPos,endPos){
//Depending on the X & Z differences, prefer directions that would equal a straight line to endPos
let pathfinderDirections = [];

//if somehow it's reading this function and the start and end are the same, exit
if(startPos === endPos){
	//Error
	//Exit
	return pathfinderDirections;//return empty to ignore
}

if(startPos.x - endPos.x === 0){
	//If X position is the same
	//And Z position is - difference, prefer Down. Else Up
	if(startPos.z - endPos.z < 0){
		//Down
		pathfinderDirections.push('down');
	} else {
		//Up
		pathfinderDirections.push('up');
	}
} else if(startPos.z - endPos.z === 0){
	//If Z position is the same
	//And X position is - difference, prefer Right. Else Left
	if(startPos.x - endPos.x < 0){
		//Right
		pathfinderDirections.push('right');
	} else {
		//Left
		pathfinderDirections.push('left');
	}
} else if(startPos.x - endPos.x > 0){
	//If X position is +, prefer Left and
	pathfinderDirections.push('left');
	//And Z position is - difference, prefer Down. Else Up
	if(startPos.z - endPos.z < 0){
		//Down
		pathfinderDirections.push('down');
	} else {
		//Up
		pathfinderDirections.push('up');
	}
} else if(startPos.x - endPos.x < 0){
	//If X position is -, prefer Right and
	pathfinderDirections.push('right');
	//And Z position is - difference, prefer Down. Else Up
	if(startPos.z - endPos.z < 0){
		//Down
		pathfinderDirections.push('down');
	} else {
		//Up
		pathfinderDirections.push('up');
	}
}
//return optimal direction array list
return pathfinderDirections;

//Single Direction Needed and Available
//
//When ghost has 1 direction to choose from
//Move in that direction if available
//Recalc

//Dual Directions Needed and Both or Either are Available
//
//When ghost has 2 directions to choose from
//Move in either 1 of the 2 that are available
//Ghost personalities could favor specific directions when available
//Recalc

//Single Direction Needed and Blocked
//
//If ghost can't go in single needed direction
//
//If there were previously traveling in the needed direction
//Check perindicular options
//If both are available, choose either.
//Else choose the 1 available
//
//Else the ghost was previously traveling in a perindicular direction to the needed direction
//If the continued direction is good, take that.
//Else skip to first direction being blocked and need direction is still not ready block below
//
//Continue in that first direction until blocked or needed direction is ready
//If needed direction is ready, take it and recalc
//
//if that first direction is blocked and needed direction is still not ready, then go in opposite of needed direction until the first direction is available
//Then check if needed direction is now available, if so take it and recalc
//If not, try to continue in first direction 
//Else can't continue, pick any available direction
//Recalc

//Dual Directions Needed and Both are Blocked
//
//Depending on the original traveling direction, choose the opposite of the needed direction that belongs to the other set that does not contain the original direction until the original direction is available
//When that original direction is finally available, take it
//Then check if the remaining unused direction is now available, if so take it and recalc.
//If not, try to continue in original direction 
//Else can't continue, pick any available direction
//Recalc

}//End pathfinder

//
//Control Functions
//

//Clear current button direction
function buttonClear(){
	clearInterval(buttonHoldInterval);
}

//Up Button
function upButtonHit(){
	//console.log('up button');

	//Allow Movement only when level is ready
	if(levelStart){
		if(playerInTunnel){
		//In tunnel, ignore input
		} else {
		//Check to move player
		inputUpdate('up');
		//Interval Functions
		buttonHoldInterval = setInterval(function() {
			//Check to move player
			inputUpdate('up');
		}, stepIntervalPlayer/2); //Interval
		}//end playerplayerInTunnel exception
	}


}

//Left Button
function leftButtonHit(){
	//console.log('left button');

	//Allow Movement only when level is ready
	if(levelStart){
		if(playerInTunnel){
		//In tunnel, ignore input
		} else {
		//Check to move player
		inputUpdate('left');
		//Interval Functions
		buttonHoldInterval = setInterval(function() {
			//Check to move player
			inputUpdate('left');
		}, stepIntervalPlayer/2); //Interval
		}//end playerplayerInTunnel exception
	}
}

//Right Button
function rightButtonHit(){
	//console.log('right button');

	//Allow Movement only when level is ready
	if(levelStart){
		if(playerInTunnel){
		//In tunnel, ignore input
		} else {
		//Check to move player
		inputUpdate('right');
		//Interval Functions
		buttonHoldInterval = setInterval(function() {
			//Check to move player
			inputUpdate('right');
		}, stepIntervalPlayer/2); //Interval
		}//end playerplayerInTunnel exception
	}
}

//Down Button
function downButtonHit(){
	//console.log('down button');

	//Allow Movement only when level is ready
	if(levelStart){
		if(playerInTunnel){
		//In tunnel, ignore input
		} else {
		//Check to move player
		inputUpdate('down');
		//Interval Functions
		buttonHoldInterval = setInterval(function() {
			//Check to move player
			inputUpdate('down');
		}, stepIntervalPlayer/2); //Interval
		}//end playerplayerInTunnel exception
	}
}

//Mouse Restart Game
function clickToRestartGame(){
	if(gameOver){
		//Start a New Game on click
		newGameStart();
	}
}

//
//Event Listeners
//

//
//Menu Buttons
//

//Toggle Show/Hide Angle Controller
function toggleAngleController(){

	upButton.classList.toggle('hide');
	leftButton.classList.toggle('hide');
	rightButton.classList.toggle('hide');
	downButton.classList.toggle('hide');

	if(showAngleController){
		showAngleController = false;
		controlsInfoToggleAngleButtonHTML.innerHTML = 'Show X Controller';
		controlsInfoToggleAngleButtonHTML2.innerHTML = 'Show X Controller';
	} else {
		showAngleController = true;
		controlsInfoToggleAngleButtonHTML.innerHTML = 'Hide X Controller';
		controlsInfoToggleAngleButtonHTML2.innerHTML = 'Hide X Controller';
	}

}

controlsInfoToggleAngleButtonHTML.addEventListener('click', toggleAngleController);

controlsInfoToggleAngleButtonHTML2.addEventListener('click', toggleAngleController);

//Game Restart HTML Button
gameRestartButtonHTML.addEventListener('click', newGameStart);

//Game Start HTML Button
startGameButtonHTML.addEventListener('click', function(){
//Start Game and Hide Start Menu
beginDiv.style.display = 'none';
newGameStart();
});


//Enable Audio
function toggleAudio(){

	if(audioOn){
		audioOn = false;
		enableAudioButtonHTML.innerHTML = 'Enable Audio';
		enableAudioButtonHTML2.innerHTML = 'Enable Audio';
		//Stop Audio

		//Remove audio info to entities
		introSound.removeAttribute('sound');
		levelCompleteSound.removeAttribute('sound');
		deathSound.removeAttribute('sound');
		eatFruitSound.removeAttribute('sound');
		eatGhostSound.removeAttribute('sound');
		extraLifeSound.removeAttribute('sound');
		dotHitSound.removeAttribute('sound');
		powerUpSound.removeAttribute('sound');

	} else {
		audioOn = true;
		enableAudioButtonHTML.innerHTML = 'Disable Audio';
		enableAudioButtonHTML2.innerHTML = 'Disable Audio';

		//Add audio info to entities
		introSound.setAttribute('sound',{src: '#introSrc', autoplay: false, loop: false, volume: 1, on: 'gameStartEvent'});
		levelCompleteSound.setAttribute('sound',{src: '#levelCompleteSrc', autoplay: false, loop: false, volume: 1, on: 'levelCompleteEvent'});
		deathSound.setAttribute('sound',{src: '#deathSrc', autoplay: false, loop: false, volume: 1, on: 'deathEvent'});
		eatFruitSound.setAttribute('sound',{src: '#eatFruitSrc', autoplay: false, loop: false, volume: 1, on: 'eatFruitEvent'});
		eatGhostSound.setAttribute('sound',{src: '#eatGhostSrc', autoplay: false, loop: false, volume: 1, on: 'eatGhostEvent'});
		extraLifeSound.setAttribute('sound',{src: '#extraLifeSrc', autoplay: false, loop: false, volume: 1, on: 'extraLifeEvent'});
		dotHitSound.setAttribute('sound',{src: '#dotHitSrc', autoplay: false, loop: false, volume: 1, on: 'dotHitEvent', poolSize: 8});
		powerUpSound.setAttribute('sound',{src: '#powerUpSrc', autoplay: false, loop: false, volume: 1, on: 'powerUpEvent'});

	}

}
enableAudioButtonHTML.addEventListener('click', toggleAudio);
enableAudioButtonHTML2.addEventListener('click', toggleAudio);

//
//Dictional Buttons
//

//
//Mouse / Tap
//The mouse/tap events will fire only once and need their own interval function to keep hitting that faster than stepIntervalPlayer
//once the user lets of, stop checking

if(sceneEl.isMobile){
	//console.log('Mobile True');

	upButton.addEventListener('touchstart', upButtonHit);
	upButton.addEventListener('touchend', buttonClear);
	leftButton.addEventListener('touchstart', leftButtonHit);
	leftButton.addEventListener('touchend', buttonClear);
	rightButton.addEventListener('touchstart', rightButtonHit);
	rightButton.addEventListener('touchend', buttonClear);
	downButton.addEventListener('touchstart', downButtonHit);
	downButton.addEventListener('touchend', buttonClear);
	document.addEventListener('touchstart', clickToRestartGame);

} else {
	//console.log('Mobile False');

	upButton.addEventListener('mouseenter', upButtonHit);
	upButton.addEventListener('mouseleave', buttonClear);
	leftButton.addEventListener('mouseenter', leftButtonHit);
	leftButton.addEventListener('mouseleave', buttonClear);
	rightButton.addEventListener('mouseenter', rightButtonHit);
	rightButton.addEventListener('mouseleave', buttonClear);
	downButton.addEventListener('mouseenter', downButtonHit);
	downButton.addEventListener('mouseleave', buttonClear);
	document.addEventListener('mousedown', clickToRestartGame);

}

//
//Keyboard
//Unlike mousedown, the keydown event fires constantly
//Using this to keep running inputUpdate which checks for obstacles to either move now or plan the next step's turn

//WASD & Arrows
//Key Down
document.body.addEventListener('keydown', function (e) {

//Allow Movement only when level is ready
if(levelStart){
	if(playerInTunnel){
	//In tunnel, ignore input
	} else {
		if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
			//Start moving player
			inputUpdate('up');
		} else if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
			//Start moving player
			inputUpdate('left');
		} else if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
			//Start moving player
			inputUpdate('down');
		} else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
			//Start moving player
			inputUpdate('right');
		}
	}//end playerTunnelTeleport exception
if(gameOver){
	//Start a New Game on click
	newGameStart();
}
}

});//End keydown

//Key Up
document.body.addEventListener('keyup', function (e) {

	if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
		//Do nothing
	} else if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
		//Do nothing
	} else if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
		//Do nothing
	} else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
		//Do nothing
	} 
});//End keyup

//
//VR
//

//Sync VR controller to Up,Right,Down,Left controls
function vrControllerUpdate(){

	//Read rotation of VR Controller
	vrControllerRot = vrController.object3D.rotation;
	//Activate XZ up,right,down,left when the X or Z value is greater than the other

	//Deadzone
	//X : 0.08 to -0.08
	//Z : 0.08 to -0.08

	//X is up down movement
	//Up is -
	//Down is +

	//Z is left right twist movement
	//Left is +
	//Right is -

	if(Math.abs(vrControllerRot.x) > Math.abs(vrControllerRot.z)){
		if(vrControllerRot.x >= 0.08){
			buttonClear();
			downButtonHit();
		} else if (vrControllerRot.x <= -0.08){
			buttonClear();
			upButtonHit();
		} else {
			buttonClear();
		}
	} else {
		if(vrControllerRot.z >= 0.08){
			buttonClear();
			leftButtonHit();
		} else if (vrControllerRot.z <= -0.08){
			buttonClear();
			rightButtonHit();
		} else {
			buttonClear();
		}
	}

};

//startGhost4Interval
function startVRControllerInterval(interval) {

vrControllerInterval = setInterval(function() {

	vrControllerUpdate();

}, interval);//Interval

}//End startGhost4Interval

document.addEventListener('enter-vr', function(){
	//console.log('VR Mode On');
	camera.setAttribute('look-controls',{enabled: true});
	vrController.setAttribute('visible', true);
	vrFloor.setAttribute('visible', true);
	startVRControllerInterval(50);
	useVRRestartPrompt = true;
	//Game Restart VR Button
	vrRestartGamePrompt.addEventListener('click', newGameStart);
	//Toggle Audio
	toggleAudio();
});

document.addEventListener('exit-vr', function(){
	//console.log('VR Mode Off');
	camera.setAttribute('look-controls',{enabled: false});
	vrController.setAttribute('visible', false);
	vrFloor.setAttribute('visible', false);
	clearInterval(vrControllerInterval);
	useVRRestartPrompt = false;
	camera.setAttribute('rotation', '0 0 0');
	//Game Restart VR Button
	vrRestartGamePrompt.removeEventListener('click', newGameStart);
	//Toggle Audio
	//toggleAudio();
});

enableVRHTML.addEventListener('click', function(){
beginDiv.style.display = 'none';
newGameStart();
});

enableVRHTML2.addEventListener('click', function(){
sceneEl.enterVR();
});

//
//Init Important Functions
//

//Spawn currently loaded map walls
wallSpawner(mapBasicWalls);
//Walls of current map loaded for obstacle checks
currentMapWalls = mapBasicWalls;
//Spawn currently loaded map dots
dotSpawner(mapBasicDots);
//Basic Map loaded
levelLoaded = true;

//Google Chrome fix to avoid inspector camera from taking over
camera.setAttribute('camera',{active: true})

},//End Init

});//End Player Movement Component