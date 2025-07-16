const OPENAI_API_KEY = 'YOUR_API_KEY'; // input custonm OpenAI key here 
let hintLevel = 1;

async function generateHint(prompt) {
    try {
        console.log("[LeetCode Assistant] Sending prompt to OpenAI:", prompt);
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: 'You are a helpful coding tutor. Provide hints that progressively get more detailed: start vague and general, then become more specific, and eventually provide the full solution with code. Always consider the user\'s current code to avoid repeating suggestions they\'ve already implemented.' },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7
            })
        });

        const data = await res.json();
        console.log("[LeetCode Assistant] Received response:", data);

        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content.trim();
        } else if (data.error) {
            console.error("[LeetCode Assistant] API error:", data.error);
            const errorMessage = typeof data.error === 'string'
                ? data.error
                : JSON.stringify(data.error, null, 2);
            return `❗ OpenAI error: ${errorMessage}`;
        } else {
            console.error("[LeetCode Assistant] Unexpected API response format.");
            return "❗ Unexpected response from API.";
        }
    } catch (error) {
        console.error("[LeetCode Assistant] API call failed:", error);
        return "❗ Failed to get hint (network error).";
    }
}

function getProblemDescription() {
    const metaTag = document.querySelector('meta[name="description"]');
    const descriptionNode = document.querySelector('[data-cy="description-content"]') ||
                            document.querySelector('.content__u3I1.question-content__JfgR') ||
                            document.querySelector('.question-content');

    if (metaTag && metaTag.content) {
        console.log("[LeetCode Assistant] Found problem description from meta tag.");
        return metaTag.content;
    } else if (descriptionNode) {
        console.log("[LeetCode Assistant] Found problem description from page content.");
        return descriptionNode.innerText;
    }

    console.warn("[LeetCode Assistant] Problem description not found.");
    return '';
}

function injectHintBox(text) {
    let existing = document.getElementById('leetcode-hint-box');
    if (existing) existing.remove();

    const box = document.createElement('div');
    box.id = 'leetcode-hint-box';
    box.innerText = '💡 ' + text;
    box.style.backgroundColor = '#fff9c4';
    box.style.color = '#333';
    box.style.border = '1px solid #fbc02d';
    box.style.padding = '12px';
    box.style.margin = '10px 0';
    box.style.borderRadius = '10px';
    box.style.fontSize = '14px';
    box.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
    box.style.lineHeight = '1.4';
    box.style.whiteSpace = 'pre-wrap';

    const parent = document.body;  // Force fallback to body
    if (parent) {
        console.log("[LeetCode Assistant] Injecting hint box.");
        parent.insertBefore(box, parent.firstChild);
    } else {
        console.warn("[LeetCode Assistant] Parent container not found.");
    }
}

async function runAssistant(userCode) {
    console.log(`[LeetCode Assistant] Running assistant at hint level ${hintLevel}...`);
    const problemText = getProblemDescription();

    if (!problemText) {
        console.warn("[LeetCode Assistant] No problem text to send.");
        injectHintBox("❗ No problem description found on this page.");
        return;
    }

    
    // injectHintBox("Test hint box. If you see this, injection works.");

    let prompt = '';

    if (hintLevel === 1) {
        prompt = `Problem description:\n${problemText}\n\nUser's current code:\n${userCode}\n\nGive only a vague, high-level hint for this problem — no details, no code, no algorithm names, just general direction.`;
    } else if (hintLevel === 2) {
        prompt = `Problem description:\n${problemText}\n\nUser's current code:\n${userCode}\n\nGive a medium-level hint — mention data structures or algorithms they are using or should consider, but no exact steps or code.`;
    } else if (hintLevel === 3) {
        prompt = `Problem description:\n${problemText}\n\nUser's current code:\n${userCode}\n\nGive a near-complete explanation, including key steps, concepts, and pointing out issues in the current code. Help guide them without providing full code.`;
    } else {
        prompt = `Problem description:\n${problemText}\n\nUser's current code:\n${userCode}\n\nProvide the full solution, including clear explanation and code, tailored to the user's current approach.`;
    }

    const hint = await generateHint(prompt);
    injectHintBox(hint);

    hintLevel++;  // Increase hint level for next click
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("[LeetCode Assistant] Received message:", request);
    if (request.action === 'leetcode-helper-new-hint') {
        runAssistant(request.userCode);
        sendResponse({ status: 'ok' });
    }
});
