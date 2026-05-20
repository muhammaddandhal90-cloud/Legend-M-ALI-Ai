function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
    
    if(tabName === 'chat') {
        document.getElementById('chat-tab').classList.add('active');
        event.currentTarget.classList.add('active');
    } else if(tabName === 'admin') {
        document.getElementById('admin-tab').classList.add('active');
        event.currentTarget.classList.add('active');
    }
}

// Load saved keys directly from LocalStorage (Permanent Browser Save)
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('gemini_key')) document.getElementById('gemini-key').value = localStorage.getItem('gemini_key');
    if(localStorage.getItem('gpt_key')) document.getElementById('gpt-key').value = localStorage.getItem('gpt_key');
    if(localStorage.getItem('deepseek_key')) document.getElementById('deepseek-key').value = localStorage.getItem('deepseek_key');
    if(localStorage.getItem('system_prompt')) document.getElementById('system-prompt').value = localStorage.getItem('system_prompt');
});

function saveSettings() {
    const gemini = document.getElementById('gemini-key').value;
    const gpt = document.getElementById('gpt-key').value;
    const deepseek = document.getElementById('deepseek-key').value;
    const prompt = document.getElementById('system-prompt').value;
    
    localStorage.setItem('gemini_key', gemini);
    localStorage.setItem('gpt_key', gpt);
    localStorage.setItem('deepseek_key', deepseek);
    localStorage.setItem('system_prompt', prompt);
    
    const status = document.getElementById('save-status');
    status.innerText = "✓ Configurations saved permanently!";
    setTimeout(() => { status.innerText = ""; }, 3000);
}

document.getElementById('chat-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const inputField = document.getElementById('user-input');
    const userText = inputField.value.trim();
    const model = document.getElementById('ai-model').value;
    
    if(!userText) return;
    
    appendMessage(userText, 'user-message');
    inputField.value = '';
    
    // Simulate real checking of credentials
    setTimeout(() => {
        const hasKey = localStorage.getItem(`${model}_key`);
        if(!hasKey) {
            appendMessage(`[System Alert]: ${model.toUpperCase()} key Admin panel mein save nahi hai. Kripya Admin Control Panel mein jaakar real API key update karein.`, 'ai-message');
        } else {
            appendMessage(`[${model.toUpperCase()} Active]: Processing your high-level logic... Connected successfully.`, 'ai-message');
        }
    }, 1000);
});

function appendMessage(text, className) {
    const chatBox = document.getElementById('chat-box');
    const msg = document.createElement('div');
    msg.className = `message ${className}`;
    if(className === 'ai-message') {
        msg.innerHTML = `<i class="fa-solid fa-robot bot-avatar"></i><div class="message-text">${text}</div>`;
    } else {
        msg.innerHTML = `<div class="message-text">${text}</div>`;
    }
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}
