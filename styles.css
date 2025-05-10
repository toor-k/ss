* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    background: #000;
    color: #00ff00;
    font-family: 'Courier New', monospace;
    overflow: hidden;
    position: relative;
}

#matrix-canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    opacity: 0.15;
}

.scanline {
    position: fixed;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to bottom,
        rgba(0, 255, 0, 0) 0%,
        rgba(0, 255, 0, 0.1) 10%,
        rgba(0, 255, 0, 0) 100%
    );
    animation: scan 3s linear infinite;
    pointer-events: none;
}

.login-container {
    position: relative;
    z-index: 1;
    width: 600px;
    margin: 100px auto;
    padding: 40px;
    background: rgba(0, 20, 0, 0.9);
    border: 1px solid #00ff00;
    box-shadow: 0 0 30px #00ff0077;
}

.login-header {
    text-align: center;
    margin-bottom: 30px;
    text-shadow: 0 0 10px #00ff00;
}

.terminal {
    display: none;
    position: relative;
    z-index: 1;
    width: 800px;
    margin: 50px auto;
    padding: 20px;
}

.output {
    height: 70vh;
    overflow-y: auto;
    border: 1px solid #00ff00;
    margin-bottom: 10px;
    padding: 15px;
    background: rgba(0, 0, 0, 0.8);
}

.input-line {
    display: flex;
    align-items: center;
    border: 1px solid #00ff00;
    padding: 10px;
}

.prompt {
    color: #00ff00;
    margin-right: 10px;
    white-space: nowrap;
}

#command-input {
    background: transparent;
    border: none;
    color: #00ff00;
    font-family: 'Courier New', monospace;
    font-size: 1.1em;
    width: 100%;
    caret-color: #00ff00;
}

#command-input:focus {
    outline: none;
}

.error {
    color: #ff0033;
    text-align: center;
    margin: 15px 0;
    min-height: 20px;
}

button {
    background: #002200;
    color: #00ff00;
    border: 1px solid #00ff00;
    padding: 15px 30px;
    width: 100%;
    font-size: 1.2em;
    cursor: pointer;
    transition: all 0.3s;
}

button:hover {
    background: #003300;
    box-shadow: 0 0 20px #00ff00;
}

@keyframes scan {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
}

@keyframes glitch {
    0%, 100% { text-shadow: 2px 2px #ff00ff, -2px -2px #00ffff; }
    50% { text-shadow: -2px -2px #ff00ff, 2px 2px #00ffff; }
}
