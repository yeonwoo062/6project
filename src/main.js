const face = document.getElementById('face'); // HTML ID를 'face'로 변경하신 것 같습니다.

let isDragging = false;
let startX = 0; 
let startY = 0;
let offsetX = 0; // face 요소의 현재 translate X 위치
let offsetY = 0; // face 요소의 현재 translate Y 위치

// 1. 드래그 시작: pointerdown (마우스, 터치 모두 감지)
face.addEventListener('pointerdown', (e) => {
    isDragging = true;
    face.setPointerCapture(e.pointerId); // 박스 밖으로 포인터가 나가도 이벤트를 받게 함

    // 현재 마우스 위치와 face의 translate 위치의 차이를 저장
    startX = e.clientX - offsetX; 
    startY = e.clientY - offsetY;
    
    face.style.cursor = 'grabbing';
});

// 2. 드래그 중: pointermove (창 전체에서 감지)
window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;

    // 새로운 translate 위치 계산
    offsetX = e.clientX - startX;
    offsetY = e.clientY - startY;

    // 계산된 값으로 face를 이동시킵니다. (이동은 transform으로 통일)
    face.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

// 3. 드래그 종료: pointerup (창 전체에서 감지)
window.addEventListener('pointerup', (e) => {
    if (isDragging) { 
        isDragging = false; 
        face.releasePointerCapture(e.pointerId);
        face.style.cursor = 'grab';
    }
});