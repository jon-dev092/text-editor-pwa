const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// Event handler for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', event => {
  deferredPrompt = event;
  // Show the install button
  butInstall.style.visibility = 'visible';
});

// Click event handler for the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  // Show the installation prompt
  deferredPrompt.prompt();
  // Wait for the user to respond
  const choiceResult = await deferredPrompt.userChoice;
  // Reset the deferredPrompt variable
  deferredPrompt = null;
  // Hide the install button
  butInstall.style.visibility = 'hidden';
});

// Event handler for the `appinstalled` event
window.addEventListener('appinstalled', () => {
  // Reset the deferredPrompt variable
  deferredPrompt = null;
});