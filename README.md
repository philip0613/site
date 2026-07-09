# 🚀 Vercel + Supabase Full-Stack Boilerplate

순수 바닐라 자바스크립트(Vanilla JS)와 Vercel Serverless Functions, 그리고 Supabase(PostgreSQL)를 연동하여 만든 **풀스택 웹 애플리케이션 기본 뼈대(Boilerplate)**입니다.
어떤 웹 서비스를 개발하든 이 템플릿과 환경설정 가이드를 바탕으로 빠르게 초기 구축을 시작할 수 있습니다.

## 🛠 Tech Stack
* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Backend (API):** Vercel Serverless Functions (`/api` 디렉토리 기반 Node.js)
* **Database & Auth:** Supabase (PostgreSQL)
* **Hosting:** Vercel

---

## ⚙️ 1. Supabase 초기 환경설정 (Database & Auth)

데이터베이스와 회원가입/로그인(인증) 시스템을 구축하는 필수 세팅입니다.

### 1-1. Table 생성 규칙
* 데이터를 저장할 테이블 생성 시, 유저와 데이터를 매핑하려면 `user_id` (uuid 타입) 컬럼이 필수입니다.
* **🚨 [주의사항]** `user_id` 컬럼 생성 시 Default Value(기본값)에 `gen_random_uuid()`가 자동 할당되어 있다면 반드시 지우고 **`NULL`**로 비워두어야 합니다. 백엔드에서 로그인한 유저의 '진짜 고유 ID'를 주입하여 저장해야 데이터가 꼬이지 않습니다.

### 1-2. Authentication (회원가입/로그인) 세팅
* **경로:** Supabase Dashboard > Authentication (자물쇠 아이콘) > Providers > Email
* **Enable Email provider:** 🟢 **ON** (이메일 로그인 활성화)
* **Confirm email:** 🔴 **OFF** (이메일 인증 절차 생략)
* 설정 변경 후 반드시 하단의 **Save**를 눌러 적용합니다.

---

## 🌐 2. Vercel 배포 및 환경 변수 (Environment Variables)

GitHub 레포지토리를 Vercel에 연동한 뒤, 소스 코드에 노출되면 안 되는 DB 비밀키를 안전하게 보관하는 설정입니다.

### 2-1. 환경 변수 등록
* **경로:** Vercel Dashboard > Project Settings > Environment Variables
* 아래 두 가지 키를 등록합니다.
  * `SUPABASE_URL` : 본인의 Supabase API URL
  * `SUPABASE_KEY` : 본인의 Supabase anon public key

### 2-2. 🚨 환경 변수 설정 후 필수 작업
환경 변수를 새로 추가하거나 수정했다면, Vercel 서버가 이를 다시 읽어갈 수 있도록 **반드시 재배포**를 해야 합니다.
* **경로:** 상단 Deployments 탭 > 최신 배포 기록 우측 점 3개(⋮) > **Redeploy** 실행

---

## 💥 3. 핵심 트러블슈팅 (Troubleshooting Log)

초기 환경 구축 시 직접 겪고 해결했던 치명적인 에러와 원인, 해결 방법 기록입니다.

### ❌ 에러 1: `Failed to parse URL from undefined...`
* **현상:** Vercel 서버리스 API 통신 중 주소가 `undefined`로 뜨며 500 에러 발생.
* **원인:** Vercel 환경 변수에 `SUPABASE_URL` 키가 등록되지 않았거나, 오타가 있어서 백엔드가 주소를 찾지 못한 상태.
* **해결:** 환경 변수 이름을 대문자로 정확히 맞추고 **Redeploy** 진행.

### ❌ 에러 2: `Failed to parse URL from (https://...)`
* **현상:** 주소는 찾았으나 URL 파싱 에러(400 Bad Request) 발생.
* **원인:** Vercel 환경 변수에 URL 값을 넣을 때 양옆에 괄호 `()`나 공백이 포함됨. (컴퓨터는 괄호가 포함된 문자열을 정상적인 웹 주소로 인식하지 못함).
* **해결:** 환경 변수 Value에서 괄호와 공백을 모두 제거하고 순수하게 `https://~` 로 시작하는 주소만 남긴 뒤 **Redeploy** 진행.

### ❌ 에러 3: `Email signups are disabled` (400 에러)
* **현상:** 프론트엔드에서 폼을 입력하고 '회원가입' 버튼을 눌렀으나 가입이 거절됨.
* **원인:** Supabase의 보안 기본 설정으로 인해 '새로운 사용자의 이메일 가입' 기능이 막혀(Disabled) 있는 상태.
* **해결:** Supabase Auth > Providers > Email 설정에서 **Enable Email provider를 ON**으로 변경 후 저장.

---

## 📂 4. 3-Tier Architecture 기본 구조

프론트엔드에서 DB로 직접 접근하지 않고, Vercel API(백엔드)를 거쳐 통신하는 안전한 구조를 사용합니다.

```text
📦 project-root
 ┣ 📂 api/                   # Vercel Serverless 백엔드
 ┃ ┣ 📜 auth.js              # 회원가입/로그인 통신
 ┃ ┣ 📜 loadData.js          # DB에서 데이터 가져오기 (GET)
 ┃ ┗ 📜 saveData.js          # DB에 데이터 밀어넣기 (POST)
 ┣ 📜 index.html             # 프론트엔드 메인 UI
 ┣ 📜 style.css              # 스타일링
 ┗ 📜 script.js              # DOM 조작 및 백엔드(/api)로 fetch 요청 전송
