const versionEl = document.querySelector('#version');
versionEl.innerHTML = process.versions.electron;

console.log(process.versions);
