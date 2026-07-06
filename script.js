// 화면에 결과를 띄울 텍스트 공간 만들기
const resultBox = document.createElement('h3');
document.body.appendChild(resultBox);

// Vercel 백엔드(api/hello.js)에 데이터 요청하기
async function testAPI() {
  resultBox.innerText = "백엔드에서 데이터 가져오는 중...";
  
  try {
    const response = await fetch('/api/hello');
    const data = await response.json();
    
    // 성공하면 파란색으로 메시지 표시
    resultBox.innerText = data.message;
    resultBox.style.color = "blue";
  } catch (error) {
    // 실패하면 빨간색으로 에러 표시
    resultBox.innerText = "연결 실패!";
    resultBox.style.color = "red";
  }
}

// 사이트가 열리면 바로 API 테스트 시작
testAPI();
