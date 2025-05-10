// Firebase Initialization
const firebaseConfig = {
    apiKey: "AIzaSyBhu-uNiY12vfGPfFldtV1oQZ5wjgV44TE",
    authDomain: "siblingchat-a5563.firebaseapp.com",
    databaseURL: "https://siblingchat-a5563-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "siblingchat-a5563",
    storageBucket: "siblingchat-a5563.firebasestorage.app",
    messagingSenderId: "732184278889",
    appId: "1:732184278889:web:177bfeebe6a0da21886ff8",
    measurementId: "G-WNTGHVL5GZ"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const validAgents = {
    'agent-15': {
        code: '25042010',
        name: 'NIGHTINGALE',
        prompt: '[agent-15@secure-chat]~$ ',
        color: '#ff00ff'
    },
    'agent-19': {
        code: '04953737',
        name: 'PHANTOM',
        prompt: '[agent-19@secure-chat]~$ ',
        color: '#00ffff'
    }
};

let currentAgent = null;

function resizeCanvas() {
    const canvas = document.getElementById('matrix-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
const chars = '01';
const drops = Array(Math.floor(canvas.width / 10)).fill(0);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = '15px monospace';

    drops.forEach((drop, i) => {
        const text = chars[Math.random() > 0.5 ? 0 : 1];
        ctx.fillText(text, i * 10, drop * 10);

        if (drop * 10 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(drawMatrix, 50);

function authenticate() {
    const agentId = document.getElementById('agentId').value.trim().toLowerCase();
    const code = document.getElementById('accessCode').value.trim();
    const errorElement = document.getElementById('errorMsg');

    errorElement.textContent = '';

    if (!/^agent-\d{2}$/.test(agentId)) {
        errorElement.textContent = 'INVALID AGENT ID FORMAT';
        return;
    }

    if (!validAgents[agentId]) {
        errorElement.textContent = 'UNAUTHORIZED ACCESS ATTEMPT';
        return;
    }

    if (code !== validAgents[agentId].code) {
        errorElement.textContent = 'ACCESS CODE VERIFICATION FAILED';
        document.getElementById('accessCode').value = '';
        return;
    }

    currentAgent = validAgents[agentId];
    showTerminalInterface();
}

function showTerminalInterface() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('terminal').style.display = 'block';
    document.getElementById('prompt').textContent = currentAgent.prompt;
    document.getElementById('prompt').style.color = currentAgent.color;

    const input = document.getElementById('command-input');
    setupMessageListener();

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            processCommand(input.value.trim());
            input.value = '';
        }
    });
}

function processCommand(cmd) {
    const output = document.getElementById('output');
    output.innerHTML += `<div style="color: ${currentAgent.color}">${currentAgent.prompt}${cmd}</div>`;

    const args = cmd.split(' ');
    switch (args[0].toLowerCase()) {
        case 'help': showHelp(); break;
        case 'clear': output.innerHTML = ''; break;
        case 'mail': handleMailCommand(args); break;
        case 'ddos': sendNotification(args[1]); break;
        default: output.innerHTML += `<div>Unknown command: ${cmd}</div>`;
    }
}

function handleMailCommand(args) {
    const output = document.getElementById('output');
    if (args[1] === 'send' && args[2]) {
        const message = args.slice(2).join(' ');
        sendMessage(message);
        output.innerHTML += `<div>Message encrypted and transmitted</div>`;
    } else if (args[1] === 'read') {
        database.ref('messages').once('value').then(snapshot => {
            const messages = [];
            snapshot.forEach(child => {
                if (child.val().to === currentAgent.name) messages.push(child.val());
            });
            updateMessageDisplay(messages);
        });
    } else {
        output.innerHTML += `<div>Invalid mail command</div>`;
    }
}

function sendMessage(message) {
    const newMessage = {
        from: currentAgent.name,
        to: currentAgent.name === 'NIGHTINGALE' ? 'PHANTOM' : 'NIGHTINGALE',
        message: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    };
    database.ref('messages').push(newMessage);
}

function updateMessageDisplay(messages) {
    const output = document.getElementById('output');
    output.innerHTML = `
        <div>Secure connection established</div>
        <div>Welcome ${currentAgent.name}</div>
        <div>Type 'help' for available commands</div>
        <br>
        <div>Message buffer (${messages.length}):</div>
        ${messages.map(m => `
            <div style="border-left: 3px solid ${currentAgent.color}; padding-left: 10px; margin: 10px 0">
                <div>From: ${m.from}</div>
                <div>${m.message}</div>
                <div style="color: #666">${new Date(m.timestamp).toLocaleTimeString()}</div>
            </div>
        `).join('')}
        <br>
    `;
    output.scrollTop = output.scrollHeight;
}

function showHelp() {
    const output = document.getElementById('output');
    output.innerHTML += `
        <div>Available commands:</div>
        <div>  help       - Show this help</div>
        <div>  clear      - Clear terminal</div>
        <div>  mail send  - Send message</div>
        <div>  mail read  - Show messages</div>
        <div>  ddos       - Ping other agent</div>
        <br>
    `;
}

function sendNotification(message) {
    sendMessage(message || "DDoS ping received!");
}

document.getElementById('agentId').addEventListener('input', function () {
    this.value = this.value.toLowerCase().replace(/[^0-9a-z-]/g, '');
    document.getElementById('errorMsg').textContent = 
        /^agent-\d{0,2}$/.test(this.value) ? '' : 'Format must be agent-XX';
});

document.getElementById('accessCode').addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 8);
});

document.getElementById('accessCode').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') authenticate();
});
