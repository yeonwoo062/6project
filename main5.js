const boxes = document.querySelectorAll('.draggable-img'); 

// 2. 현재 드래그 중인 요소를 저장할 변수
let activeElement = null; 
let isDragging = false;

// 3. 드래그 오프셋과 시작 위치를 저장할 변수
let startX = 0; 
let startY = 0;
let offsetX = 0;
let offsetY = 0;

// 4. 모든 이미지에 'pointerdown' 이벤트 리스너를 추가합니다.
boxes.forEach(box => {
    box.addEventListener('pointerdown', (e) => {
        activeElement = box; 
        isDragging = true;
        activeElement.setPointerCapture(e.pointerId);

        // 현재 transform 값 가져오기
        const style = window.getComputedStyle(activeElement);
        const matrix = new DOMMatrixReadOnly(style.transform);
        
        offsetX = matrix.m41; 
        offsetY = matrix.m42; 

        // 마우스 시작 위치와 현재 요소 위치의 차이 (오프셋) 저장
        startX = e.clientX - offsetX;
        startY = e.clientY - offsetY;
        
        activeElement.style.cursor = 'grabbing'; // 주먹 쥔 모양으로 변경
    });
});


// 5. 드래그 중: pointermove (window 전체에서 감지)
window.addEventListener('pointermove', (e) => {
    if (!isDragging || !activeElement) return;

    // 새로운 translate 위치 계산
    offsetX = e.clientX - startX;
    offsetY = e.clientY - startY;

    // 현재 activeElement만 이동시킵니다.
    activeElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});


// 6. 드래그 종료: pointerup (window 전체에서 감지)
window.addEventListener('pointerup', (e) => {
    if (isDragging && activeElement) { 
        isDragging = false; 
        activeElement.releasePointerCapture(e.pointerId);
        activeElement.style.cursor = 'grab'; // 손 모양으로 복구
        
        activeElement = null; 
    }
});