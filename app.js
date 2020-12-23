class DrumKit {
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.currentKick = "/sounds/kick-classic.wav";
        this.currentSnare = "/sounds/snare-acoustic01.wav";
        this.currentHihat = "/sounds/hihat-acoustic01.wav";
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.btnPlay = document.querySelector(".play");
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteBtns = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");

    }
    activePad(){
        this.classList.toggle("active");
    }
    repeat(){
        let step = this.index % 8;
        const activeBar = document.querySelectorAll(`.b${step}`);
        console.log(activeBar);
        //Loop Over the pads
        activeBar.forEach(bar =>{
            bar.style.animation = `playTrack 0.3s alternate 2 ease-in-out`;
            //Check if pads are active
            if(bar.classList.contains("active")){
                //check each track
                if(bar.classList.contains("kick-pad")){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains("snare-pad")){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }
    start() {
        const interval = (60 / this.bpm) * 1000;
        //Check if it playing
        if(!this.isPlaying){
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
            // console.log(test);
            this.btnPlay.innerText = "Stop";
            this.btnPlay.classList.add("active");
        }else{
            //clear playing
            clearInterval(this.isPlaying);
            this.isPlaying = null;
            this.btnPlay.innerText = "Play";
            this.btnPlay.classList.remove("active");
        }

    }
    changeSounds(e) {
        const selectionName = e.target.name;
        const selectionValue = e.target.value;

        console.log(selectionName);
        console.log(selectionValue);
        switch(selectionName){
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
        }

    }
    mute(e){
        // console.log(e.target);
        const muteIndex = e.target.getAttribute("data-track");
        console.log(muteIndex);
        e.target.classList.toggle("active");
        if(e.target.classList.contains("active")){
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        }else{
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(e){
        const tempoText = document.querySelector(".tempo-nr");
        
        tempoText.innerText = e.target.value;
    }
    updateTempo(e){
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);        
        this.isPlaying = null;
        if(this.btnPlay.classList.contains("active")){
            this.start();
        }
        
    }
}
const drumKit = new DrumKit();

//Event Listener

drumKit.pads.forEach(pad => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener("animationend", function(){
        this.style.animation = "";
    });
});

drumKit.btnPlay.addEventListener("click", function() {
    drumKit.start();     
});

drumKit.selects.forEach(select => {
    select.addEventListener("change", function(e){
        drumKit.changeSounds(e);
    });
});

drumKit.muteBtns.forEach(btn => {
    btn.addEventListener("click", function(e){
        drumKit.mute(e);
    });
});

drumKit.tempoSlider.addEventListener("input", function(e){
    drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change", function(e){
    drumKit.updateTempo(e);
});