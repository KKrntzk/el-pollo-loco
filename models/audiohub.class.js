class AudioHub {
  static characterDamage = new Audio("./sounds/character/characterDamage.mp3");
  static characterDead = new Audio("./sounds/character/characterDead.wav");
  static characterJump = new Audio("./sounds/character/characterJump.wav");
  static characterRun = new Audio("./sounds/character/characterRun.mp3");
  static characterSnoring = new Audio(
    "./sounds/character/characterSnoring.mp3"
  );

  // Array, das alle definierten Audio-Dateien enthält
  static allSounds = [
    AudioHub.characterDamage,
    AudioHub.characterDead,
    AudioHub.characterJump,
    AudioHub.characterRun,
    AudioHub.characterSnoring,
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
      const instrumentImages = document.querySelectorAll(".sound_img"); // nur wichtig für die Visualisierung
      instrumentImages.forEach((img) => img.classList.remove("active")); // nur wichtig für die Visualisierung
    });
  }

  static unmute() {
    AudioHub.allSounds.forEach((sound) => {
      sound.volume = 0.2;
      const instrumentImages = document.querySelectorAll(".sound_img"); // nur wichtig für die Visualisierung
      instrumentImages.forEach((img) => img.classList.add("active")); // nur wichtig für die Visualisierung
    });
  }
}
