window.onload = () => {
    let deferredPrompt;
    const btn = document.getElementById('addToScreenButton'); //需要用户激活按钮才能添加到桌面
    btn.style.display = 'none';

    window.addEventListener('beforeinstallprompt', e => {
        console.log('event: beforeinstallprompt');
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI to notify the user they can add to home screen
        btn.style.display = 'block';

        btn.addEventListener('click', e => {
            // hide our user interface that shows our A2HS button
            btn.style.display = 'none';
            // Show the prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then(choiceResult => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });
        });
    });
};
