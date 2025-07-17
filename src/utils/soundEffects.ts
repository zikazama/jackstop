// Sound effects untuk meningkatkan pengalaman edukatif
// Menggunakan Web Audio API untuk efek suara

class SoundManager {
  private audioContext: AudioContext | null = null;
  private sounds: { [key: string]: AudioBuffer } = {};

  constructor() {
    // Initialize audio context on first user interaction
    this.initAudioContext();
  }

  private initAudioContext() {
    try {
      // Gunakan 'unknown' daripada 'any' untuk window
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      console.warn('Web Audio API not supported');
    }
  }

  private createBeep(frequency: number, duration: number, volume: number = 0.1) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  private createSlotSpinSound() {
    if (!this.audioContext) return;

    // Create spinning sound effect
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        this.createBeep(200 + Math.random() * 100, 0.1, 0.05);
      }, i * 100);
    }
  }

  playSpinSound() {
    this.createSlotSpinSound();
  }

  playWinSound() {
    // Happy ascending notes
    const notes = [523, 659, 784, 1047]; // C, E, G, C
    notes.forEach((note, index) => {
      setTimeout(() => {
        this.createBeep(note, 0.3, 0.1);
      }, index * 150);
    });
  }

  playLoseSound() {
    // Sad descending notes
    const notes = [400, 350, 300]; 
    notes.forEach((note, index) => {
      setTimeout(() => {
        this.createBeep(note, 0.4, 0.08);
      }, index * 200);
    });
  }

  playClickSound() {
    this.createBeep(800, 0.1, 0.05);
  }

  playSuccessSound() {
    // Success chime
    const notes = [523, 659, 784];
    notes.forEach((note, index) => {
      setTimeout(() => {
        this.createBeep(note, 0.2, 0.08);
      }, index * 100);
    });
  }

  playWarningSound() {
    // Warning beep
    this.createBeep(300, 0.5, 0.1);
  }
}

const soundManager = new SoundManager();

export const playSpinSound = () => soundManager.playSpinSound();
export const playWinSound = () => soundManager.playWinSound();
export const playLoseSound = () => soundManager.playLoseSound();
export const playClickSound = () => soundManager.playClickSound();
export const playSuccessSound = () => soundManager.playSuccessSound();
export const playWarningSound = () => soundManager.playWarningSound();