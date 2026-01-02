class AudioHub {
  static backgroundMusic = new Audio(
    "./sounds/backgroundmusic/acoustic-mexican-guitar-218610.mp3"
  );

  static characterDamage = new Audio("./sounds/character/characterDamage.mp3");
  static characterDead = new Audio("./sounds/character/characterDead.wav");
  static characterJump = new Audio("./sounds/character/characterJump.wav");
  static characterRun = new Audio("./sounds/character/characterRun.mp3");
  static characterSnoring = new Audio(
    "./sounds/character/characterSnoring.mp3"
  );

  static chickenDead = new Audio("./sounds/chicken/chickenDead.mp3");
  static chickenDead2 = new Audio("./sounds/chicken/chickenDead2.mp3");

  static bottleCollectSound = new Audio(
    "./sounds/collectibles/bottleCollectSound.wav"
  );
  static coinCollectSound = new Audio("./sounds/collectibles/collectSound.wav");

  static bottleBreak = new Audio("./sounds/throwable/bottleBreak.mp3");

  static endbossSound = new Audio("./sounds/endboss/endbossApproach.wav");
  static endbossIdle = new Audio("./sounds/endboss/chickenIdle.mp3");
  static endbossDeath = new Audio("./sounds/endboss/endbossDeath.mp3");

  static gameStart = new Audio("./sounds/game/gameStart.mp3");

  // Array, das alle definierten Audio-Dateien enthält
  static allSounds = [
    AudioHub.characterDamage,
    AudioHub.characterDead,
    AudioHub.characterJump,
    AudioHub.characterRun,
    AudioHub.characterSnoring,
    AudioHub.chickenDead,
    AudioHub.chickenDead2,
    AudioHub.bottleCollectSound,
    AudioHub.coinCollectSound,
    AudioHub.bottleBreak,
    AudioHub.endbossSound,
    AudioHub.endbossDeath,
    AudioHub.endbossIdle,
    AudioHub.gameStart,
  ];

  // Spielt eine einzelne Audiodatei ab
  static playOne(sound) {
    sound.volume = 0.2; // Setzt die Lautstärke auf 0.2 = 20% / 1 = 100%
    sound.currentTime = 0; // Startet ab einer bestimmten stelle (0=Anfang/ 5 = 5 sec.)
    sound.play(); // Spielt das übergebene Sound-Objekt ab
  }

  // Stoppt das Abspielen aller Audiodateien
  static stopAll() {
    AudioHub.allSounds.forEach((sound) => {
      sound.pause(); // Pausiert jedes Audio in der Liste
    });
    // document.getElementById("volume").value = 0.2; // Setzt den Sound-Slider wieder auf 0.2
  }

  // Stoppt das Abspielen einer einzelnen Audiodatei
  static stopOne(sound) {
    sound.pause(); // Pausiert das übergebene Audio
  }

  // ##########################################################################################################################
  // ################################################  Sound Slider - BONUS !  ################################################
  // Setzt die Lautstärke für alle Audiodateien
  static objSetVolume(volumeSlider) {
    let volumeValue = document.getElementById("volume").value; // Holt den aktuellen Lautstärkewert aus dem Inputfeld
    volumeSlider.forEach((sound) => {
      sound.volume = volumeValue; // Setzt die Lautstärke für jedes Audio wie im Slider angegeben
    });
  }

  static mute() {
    AudioHub.allSounds.forEach((sound) => {
      sound.volume = 0.0;
    });
  }

  static unmute() {
    AudioHub.allSounds.forEach((sound) => {
      sound.volume = 0.2;
    });
  }
}
