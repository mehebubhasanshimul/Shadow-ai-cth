async function sendMessage() {
    const input = document.getElementById('userInput');
    let prompt = input.value.trim();
    if (!prompt) return;

    addMessage(prompt, true);
    input.value = "";

    const loadingId = 'loading-' + Date.now();
    const chat = document.getElementById('chatContainer');
    const loadingDiv = document.createElement('div');
    loadingDiv.id = loadingId;
    loadingDiv.className = 'flex gap-4 animate-pulse';
    loadingDiv.innerHTML = `
        <img src="https://media.giphy.com/media/8YmZ14DOpivXMuckSI/giphy.gif" class="w-10 h-10 rounded-full border border-purple-500 opacity-50">
        <div class="glass-bot p-4 text-[#00ff41] font-matrix tracking-widest text-lg flex items-center gap-2">
            <i class="fas fa-circle-notch fa-spin"></i> GENERATING CHAOS...
        </div>`;
    chat.appendChild(loadingDiv);
    chat.scrollTop = chat.scrollHeight;

    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt })
        });
        
        const data = await res.json();
        
        if (document.getElementById(loadingId)) {
            document.getElementById(loadingId).remove();
        }

        // সফল হলে চ্যাট দেখাবে
        if (data.choices && data.choices.length > 0) {
            const responseText = data.choices[0].message.content;
            addMessage(responseText, false);
        } 
        // ব্যর্থ হলে সরাসরি ডাটাটি স্ক্রিনে লাল বক্সে দেখাবে
        else {
            const debugText = JSON.stringify(data, null, 2);
            addMessage(`<strong class="text-red-500">RAPIDAPI ERROR:</strong><br><pre class="text-xs bg-red-900/30 p-2 rounded border border-red-500 mt-2 overflow-x-auto">${debugText}</pre>`, false);
        }

    } catch(e) {
        if (document.getElementById(loadingId)) {
            document.getElementById(loadingId).remove();
        }
        addMessage(`<strong class="text-red-500">SYSTEM CRASH:</strong> ${e.message}`, false);
    }
}
