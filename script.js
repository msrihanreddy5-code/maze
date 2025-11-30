const title = document.getElementById("title");
const text = document.getElementById("text");
const choicesDiv = document.getElementById("choices");
let scoreLogic = 0;
let scoreInstinct = 0;

function showScene(scene){
    choicesDiv.innerHTML = "";
    title.textContent = scene.title;
    text.textContent = scene.text;

    scene.choices.forEach(c=>{
        let btn = document.createElement("div");
        btn.className = "choice";
        btn.textContent = c.text;
        btn.onclick = ()=>{
            if(c.type==="logic") scoreLogic++;
            if(c.type==="instinct") scoreInstinct++;
            transition(c.next);
        };
        choicesDiv.appendChild(btn);
    });
}

function transition(next){
    document.getElementById("screen").classList.add("fade");
    setTimeout(()=>{
        document.getElementById("screen").classList.remove("fade");
        if(next==="end") return ending();
        showScene(scenes[next]);
    },600);
}

const scenes = {
    start:{
        title:"Mind Maze",
        text:"You wake up in a glowing labyrinth. A voice whispers: 'Your choices define your fate.'",
        choices:[
            {text:"Walk towards the blue corridor", next:"logic1", type:"logic"},
            {text:"Follow the echoing sound", next:"instinct1", type:"instinct"}
        ]
    },

    logic1:{
        title:"The Silent Room",
        text:"A door with symbols appears. Each symbol looks like a puzzle piece.",
        choices:[
            {text:"Decode the symbols", next:"logic2", type:"logic"},
            {text:"Kick the door open", next:"instinct1", type:"instinct"}
        ]
    },

    instinct1:{
        title:"The Whispering Hall",
        text:"You hear a heartbeat-like sound getting louder.",
        choices:[
            {text:"Move toward the sound", next:"instinct2", type:"instinct"},
            {text:"Stop and analyze first", next:"logic2", type:"logic"}
        ]
    },

    logic2:{
        title:"The Pattern Gate",
        text:"The wall rearranges itself into a glowing pattern.",
        choices:[
            {text:"Solve the pattern", next:"end", type:"logic"},
            {text:"Touch it without thinking", next:"end", type:"instinct"}
        ]
    },

    instinct2:{
        title:"The Pulse Chamber",
        text:"The pulses sync with your heartbeat. Strange but calming.",
        choices:[
            {text:"Trust the feeling", next:"end", type:"instinct"},
            {text:"Remain cautious", next:"end", type:"logic"}
        ]
    }
};

function ending(){
    choicesDiv.innerHTML = "";

    if(scoreLogic > scoreInstinct){
        title.textContent = "Ending: The Analyst";
        text.textContent = "You escaped by solving the maze through logic and clarity. Your mind is your greatest tool.";
    }
    else if(scoreInstinct > scoreLogic){
        title.textContent = "Ending: The Explorer";
        text.textContent = "You trusted your instincts and followed your intuition. The maze bent to your will.";
    }
    else{
        title.textContent = "Ending: The Balance";
        text.textContent = "Logic and instinct worked in harmony. You achieved perfect balance within the maze.";
    }
}

showScene(scenes.start);
