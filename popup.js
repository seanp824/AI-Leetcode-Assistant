console.log("[Popup] Popup loaded.");

document.getElementById('get-hint').addEventListener('click', async () => {
    console.log("[Popup] Button clicked.");

    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const userCode = document.getElementById('user-code').value || '';

        if (tab.url.includes("leetcode.com")) {
            chrome.tabs.sendMessage(tab.id, {
                action: 'leetcode-helper-new-hint',
                userCode: userCode
            }, (response) => {
                if (chrome.runtime.lastError) {
                    console.warn("[Popup] Message failed:", chrome.runtime.lastError.message);
                } else {
                    console.log("[Popup] Message sent, response:", response);
                }
            });
        } else {
            console.warn("[Popup] Not on a LeetCode page — skipping message.");
        }
    } catch (error) {
        console.error("[Popup] Error sending message:", error);
    }
});
