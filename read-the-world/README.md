# Read the World

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Three.js](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

This project began in 2023 after a New Year’s resolution pushed me to read more worldwide. But with so many countries out there where should my next book come from? I wanted an easy way to discover literature from around the globe without relying on my own biases. Something spontaneous, unexpected, and fun. Read the World was born from that idea: a simple tool where you press a button, the world spins, and chance takes you to your next literary destination.

---

### The Experience

This project isn't about generating a random number but to allow chance guide you to new places as my whole life has been so far. And that’s why it’s a personal project.

- **The Trigger:** Clicking "Spin the Globe" initiates a global search sequence.
- **The Visuals:** A 3D wireframe globe built with Three.js rotates at high speed, scanning the planet in seconds.
- **The Destination:** The rotation decelerates and locks onto a specific country, centering it on the screen with a pulsating marker.
- **The Discovery:** A curated list of books from that region is instantly displayed in a high-contrast interface.

---

### Aesthetics

The design intentionally leans into a glitchy aesthetic, a funky contrast between the “old-school” act of reading and a raw cyberpunk interface.

- **Palette:** Magenta and cyan used to generate visual friction.
- **Typography:** A combination of monospaced fonts and heavy headers.
- **Effects:** Canvas distortion filters designed to make data feel active—simulating a global literary network accessed via a legacy terminal.

---

### Technical Structure

- **Three.js:** Used for 3D globe rendering and rotation mechanics.
- **Vanilla JavaScript:** Handles interaction logic and data manipulation without external frameworks.
- **JSON:** The core database is managed through the `countries_books.json` file.

---

### Local Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/brecketline/read-around]
    ```
2.  **Run a local server:**
    Use VS Code Live Server or the terminal:
    ```bash
    python3 -m http.server
    ```

---

### New Updates

The project is finally growing to include philosophy, my favorite escape since I was thirteen and first discovered Descartes.

---

> Spin the globe and discover your next read.
