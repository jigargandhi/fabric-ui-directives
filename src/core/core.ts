angular.module('fabric.ui.components', []);

interface Window {
    dump(message);
}

if (!window.dump) {
    window.dump = console.log;
}