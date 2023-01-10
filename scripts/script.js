document.getElementById("copy_button").addEventListener("click", () => {
    const text = document.getElementById('P_D');
    text.select();
    navigator.clipboard.writeText(text.value);
});

chrome.tabs.query({'active': true, 'currentWindow': true}, function (tab) {
    if (tab) {
        const url = tab[0].url;
        let domain = (new URL(url));
        domain = domain.hostname;
        document.getElementById('url').value = domain;
    } else {
      document.getElementById("url").value = '<span class="error">no active tab</span>';
    }
});

document.getElementById("account").addEventListener("click", () => {
    window.open("../html/webpage.html");
})