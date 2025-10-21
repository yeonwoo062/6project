const boxes = document.querySelectorAll('.text-box'); 


let activeElement = null; 
let isDragging = false;


let startX = 0; 
let startY = 0;
let offsetX = 0;
let offsetY = 0;


boxes.forEach(box => {
    box.addEventListener('pointerdown', (e) => {
        activeElement = box; 
        isDragging = true;
        activeElement.setPointerCapture(e.pointerId);
        const style = window.getComputedStyle(activeElement);
        const matrix = new DOMMatrixReadOnly(style.transform);
        
        offsetX = matrix.m41; 
        offsetY = matrix.m42; 
        startX = e.clientX - offsetX;
        startY = e.clientY - offsetY;
        
        activeElement.style.cursor = 'grabbing';
    });
});



window.addEventListener('pointermove', (e) => {
    if (!isDragging || !activeElement) return; 
    offsetX = e.clientX - startX;
    offsetY = e.clientY - startY;
    activeElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});



window.addEventListener('pointerup', (e) => {
    if (isDragging && activeElement) { 
        isDragging = false; 
        activeElement.releasePointerCapture(e.pointerId);
        activeElement.style.cursor = 'grab';
        activeElement = null; 
    }
});