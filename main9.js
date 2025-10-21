const draggableElements = document.querySelectorAll('.draggable-emoji');

draggableElements.forEach(element => {
    // 각 요소에 드래그 기능을 적용
    makeDraggable(element);
});

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    // 마우스를 눌렀을 때 (드래그 시작)
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        
        // 드래그 시작 시점의 마우스 커서 위치
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        // 드래그 중임을 표시하는 클래스 추가
        element.classList.add('dragging');
        
        // 마우스를 뗏을 때와 움직일 때 이벤트 리스너 할당
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        
        // 이전 위치와 현재 위치의 차이 계산
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        
        // 현재 마우스 위치 업데이트
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        // 요소의 새 위치 계산 및 적용
        // top = 현재 top 위치 - y축 이동 거리
        // left = 현재 left 위치 - x축 이동 거리
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // 마우스를 뗏을 때 (드래그 종료)
        
        // 드래그 중임을 표시하는 클래스 제거
        element.classList.remove('dragging');
        
        // 이벤트 리스너 제거
        document.onmouseup = null;
        document.onmousemove = null;
    }
}