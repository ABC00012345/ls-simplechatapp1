document.addEventListener("DOMContentLoaded", function () {
    const messageInput = document.getElementById("message");
    const sendButton = document.getElementById("send");
    const chatMessages = document.getElementById("chat-messages");

    // Function to load chat history
    function loadChatHistory() {
        fetch("/get_chat_history")
            .then((response) => response.text())
            .then((data) => {
                chatMessages.innerHTML = data;
            })
            .catch((error) => {
                console.error("Error loading chat history:", error);
            });
    }

    // Load chat history when the page loads
    loadChatHistory();

    // Function to load chat history every 2 seconds
    function autoSyncChatHistory() {
        loadChatHistory();
    }

    // Set up automatic chat history sync every 2 seconds
    const syncInterval = 2000; // 2 seconds
    setInterval(autoSyncChatHistory, syncInterval);

    sendButton.addEventListener("click", function () {
        const messageText = messageInput.value;
        if (messageText.trim() !== "") {
            // Send the message to the server (e.g., using fetch)
            fetch("/send_message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: messageText }),
            })
                .then(() => {
                    messageInput.value = "";
                })
                .catch((error) => {
                    console.error("Error sending message:", error);
                });
        }
    });
});
