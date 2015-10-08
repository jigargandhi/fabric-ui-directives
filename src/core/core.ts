angular.module('fabric.ui.components', []);

interface Window {
    dump(message);
}

if (!console.log) {
    console.log = log => {}
}