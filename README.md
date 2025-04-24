# Growiary 그루어리

<img src="./readme-assets/thumb.png" height="400px" width="800px">
<!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[1.1](#11-주요-스택-사용-이유). 주요 스택 사용 이유   -->

## 목차

[1](#1-기술-스택). 기술 스택  
[2](#2-설치-및-실행). 설치 및 실행  
[3](#3-팀원-구성). 팀원 구성  
[4](#4-협업-방식). 협업 방식  
[5](#5-페이지별-기능). 페이지별 기능  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[5.1](#51-랜딩-페이지). 랜딩 페이지  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[5.2](#52-메인-페이지). 메인 페이지  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[5.3](#53-기록-작성). 기록 작성  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[5.4](#54-나의-기록들). 나의 기록들  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[5.5](#55-추천-주제). 추천 주제  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[5.6](#56-기록-데이터-보기). 기록 데이터 보기  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[5.7](#57-도전과제). 도전과제  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[5.8](#58-설정하기-의견보내기). 설정하기 & 의견보내기

[6](#6-주요-도전-과제). 주요 도전 과제  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[6.1](#61-tanstack-query). Tanstack Query  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[6.2](#62-사용자-상태-별-데이터-처리). 사용자 상태 별 데이터 처리  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[6.3](#63-oauth-로그인). OAuth 로그인  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[6.4](#64-react-hook-form--zod). React-Hook-Form & Zod  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[6.5](#65-web-push-fcm). Web Push(FCM)

<!-- [7](#7-리팩토링). 리팩토링 -->

## 1. 기술 스택

| **Frontend**       | **Backend**        | **Collaboration** |
| ------------------ | ------------------ | ----------------- |
| Nexjs (App Router) | Nest.js            | Figma             |
| Typescript         | OpenAi API         | Notion            |
| Tailwind           | Firebase Functions | Slack             |
| Tanstack Query     | Firebase Firestore | GitHub            |
| Recoil             |                    |                   |
| Vercel             |                    |                   |

 <div align="right">

[목차로 이동](#목차)

  </div>

## 2. 설치 및 실행

```
npm install && npm run dev
```

※ .env 파일이 별도로 필요합니다.

 <div align="right">

[목차로 이동](#목차)

  </div>

## 3. 팀원 구성

| **이름** | **역할**        |
| -------- | --------------- |
| 배건우   | 운영, 마케팅    |
| 임효인   | 기획            |
| 윤동현   | 디자인          |
| 강은영   | 프론트엔드 개발 |
| 이병민   | 백엔드 개발     |

※ 개인 정보 보호를 위해 연락처 및 이메일은 기재하지 않았습니다.

 <div align="right">

[목차로 이동](#목차)

  </div>

## 4. 협업 방식

<img height="16" width="16" src="https://cdn.simpleicons.org/github/000/fff" /> GitHub: 코드 관리</div>

<img height="16" width="16"  src="https://cdn.simpleicons.org/notion/000/fff" /> Notion: 데일리스크럼, 팀 회의, 주요 자료 기록, 이슈 관리

 <div align="right">

[목차로 이동](#목차)

  </div>

## 5. 페이지별 기능

### 5.1. 랜딩 페이지

- 비로그인 사용자가 메인 페이지 접근 시 자동 리다이렉트되는 소개 페이지

 <div align="right">

[목차로 이동](#목차)

  </div>

### 5.2. 메인 페이지

- 사용자 상태에 따라 맞춤형 정보(기록 요약, 추천 주제 등)를 제공
- 카테고리별 추천 주제 확인 및 다른 주제로 전환 가능

 <div align="right">

[목차로 이동](#목차)

  </div>

### 5.3. 기록 작성

- 주제 선택 후 템플릿 기반으로 글 작성 가능
- 비로그인 사용자도 임시 저장 후 로그인 시 데이터 유지
- 입력 조건(제목, 카테고리, 내용 10자 이상) 충족 시 저장 가능

 <div align="right">

[목차로 이동](#목차)

  </div>

### 5.4. 나의 기록들

- 월별 작성 데이터 및 카테고리별 기록 확인
- 달력에서 특정 일자 클릭 시 해당 날짜 기록으로 이동

 <div align="right">

[목차로 이동](#목차)

  </div>

### 5.5. 추천 주제

- 주간 인기, 카테고리별, 최근 작성 주제 등 다양한 기준으로 추천 제공

 <div align="right">

[목차로 이동](#목차)

  </div>

### 5.6. 기록 데이터 보기

- 기록 글 수, 글자 수, 작성 시간대, 카테고리 등 다양한 분석 지표 시각화
- 전체 사용자 및 과거 나와의 비교를 통해 기록 패턴 인식 지원

 <div align="right">

[목차로 이동](#목차)

  </div>

### 5.7. 도전과제

- 글쓰기 루틴과 연동된 뱃지 시스템 제공
- 현재 타이틀 및 획득한 뱃지를 확인하고 설정 가능

 <div align="right">

[목차로 이동](#목차)

  </div>

### 5.8. 설정하기 & 의견 보내기

- 서비스 이용약관, 개인정보 처리방침, 계정 정보 확인
- 서비스 관련 의견 제출 가능 (푸터에서도 접근 가능)

 <div align="right">

[목차로 이동](#목차)

  </div>

## 6. 주요 도전 과제

### 6.1. Tanstack Query
> 사용자 데이터 캐싱 경험을 통해 캐시 전략 수립과 라이브러리 구조 이해의 중요성을 체감

💡 왜 이 방식을 선택했나?
- 사용자 정보와 같은 정적인 데이터를 Storage를 사용하지 않고도 효율적으로 관리하고자 캐싱을 도입
- 널리 사용되는 캐싱 라이브러리인 Tanstack Query를 선택

🔍 구현 과정에서 느낀 고민
- 캐싱 타임 설정이나 `invalidateQueries`와 같은 메서드 활용에 어려움이 있었음
- API 구조가 RESTful하지 않아 일부 데이터에는 캐싱이 적용되지 못함

🌱 지금 돌아봤을 때
- 캐싱 전략은 단순한 적용보다 데이터 흐름과 구조 설계에 대한 깊은 이해가 전제되어야 함을 깨달음
- 관련 문서 및 실제 적용을 통해 라이브러리를 학습하고, 현재 리팩토링을 통해 구조를 개선하고 있음

 <div align="right">

[목차로 이동](#목차)

  </div>

### 6.2. 사용자 상태 별 데이터 처리
> 로그인 여부에 따른 UI와 데이터 처리 간 충돌 이슈 해결

📌 문제 상황
- 로그인된 사용자 페이지에서 데이터 로딩 중, 비로그인 예시 데이터가 먼저 출력되는 현상 발생

🛠 해결 과정
- 비로그인 사용자의 API 응답을 undefined가 아닌 명시적 값으로 처리
- 사용자 상태를 None / Not-Login / Login 3단계로 분리하여 예외 상황 분리

🌱 지금 돌아봤을 때
- API 응답 값이 아닌 `isLoading`과 같은 내장 상태값을 보다 적극적으로 활용했더라면 더 깔끔하게 처리할 수 있었을 것
- 상태 설계가 명확해지니 전체 서비스 흐름도 훨씬 안정적으로 정리됨을 느꼈음

 <div align="right">

[목차로 이동](#목차)

  </div>

### 6.3. OAuth 로그인
> 클라이언트 리다이렉트를 사용하는 OAuth 로그인 방식에서 도메인, 인증 흐름, 보안 등 다양한 문제를 직접 마주하고 개선을 시도

📌 문제 상황
- 기존 방식: 클라이언트 → 서버로 토큰 전달 → 서버에서 사용자 검증 → JWT 발급 → 클라이언트 수신
- 현재 방식: 서버가 리다이렉트를 통해 클라이언트로 JWT를 queryParams에 담아 전달
  - 리다이렉트 주소 고정으로 인한 유연성 저하
  - 도메인 분리 환경에서 쿠키 인증 불가 및 리다이렉트 인해 데이터 전송 제약 → queryParams 방식 선택

🛠 해결 과정
- JWT를 queryParams에 실어 전달 + 암호화 처리
- 클라이언트에서 query 파싱을 통해 토큰 처리

🌱 느낀 점
- 서버에서 리다이렉트하는 과정은 도메인 뿐만 아니라 토큰을 전달하는 방식에도 제약이 있음을 학습
- 도메인 제약과 쿠키 미지원 환경에서는 queryParams 방식이 불가피한 선택이었지만, 보안상 아쉬운 점도 함께 존재함  
- 이 경험을 통해 리다이렉트 방식의 한계를 정확히 파악하게 되었고, 다음엔 보다 정제된 인증 흐름을 설계할 예정
- 인증 구조는 보안뿐 아니라 유연한 서비스 흐름에도 큰 영향을 준다는 걸 체감

 <div align="right">

[목차로 이동](#목차)

  </div>

### 6.4. React-Hook-Form & Zod
> UI 라이브러리와 폼 상태 관리 도구의 조합에서 구조화된 설계의 중요성을 느꼈던 경험

💡 왜 이 조합을 사용했나?
- 유효성 검사와 타입 안전성을 보장할 수 있는 React-Hook-Form + Zod 조합을 선택
- 디자인 시스템 측면에서 사용하고 있던 shadcn/ui 도입

🔍 구현 과정에서 느낀 고민
- 폼 내부 로직이 Controller 중첩 구조로 복잡해졌고, 컴포넌트 간 결합도가 높아져 관리가 어려워졌음

🌱 지금 돌아봤을 때
- 기본 메서드(getValues, watch 등)를 중심으로 폼 로직을 리팩토링 진행
- 역할 기반으로 컴포넌트를 분리하고 Controller 사용은 필요한 부분에만 제한
- 구조 설계 초기 단계에서의 고민이 장기적인 유지보수 효율성과 직결된다는 점을 체감

 <div align="right">

[목차로 이동](#목차)

  </div>

### 6.5. Web Push (FCM)
> 사용자 글쓰기 습관 형성을 위해 푸시 알림 기능을 고민한 과정

💡 왜 이 기능을 기획했나?
- 사용자 루틴 유도와 몰입 유지 차원에서 서비스 측에서의 능동적 알림 제공이 필요하다고 판단

🔍 구현 과정에서 느낀 고민
- 실제 Web Push 사용 빈도와 개발 리소스 대비 효과에 대한 우려 존재
- Firebase GUI 기반으로만 구성하고, 서버와의 커스터마이징은 미진행

🌱 지금 돌아봤을 때
- 최소한의 기능 구현을 통해 가능성을 테스트한 시도였고, 다음엔 사용자 데이터 기반의 기획과 연계한 기능 고도화를 목표로 삼을 수 있음
- 해당 기능은 기술 리소스를 고려해 실험적으로 가볍게 도입했으며, 이 과정을 통해 기능 도입의 타당성과 우선순위 판단에 대한 인사이트를 얻음  

 <div align="right">

[목차로 이동](#목차)

  </div>

<!-- ## 7. 리팩토링 -->

<!-- # 폴더 구조

```text
src
|_apis             // api 요청
|_app
|_components
|   |_providers
|   |_ ui          // installed shadcn component
|_hooks            // custom hooks
|_lib
|_store            // recoil
|_utils            // 공통 함수
|_views            // 화면 UI
|   |_ common      // 공통 화면 UI
```₩

# 관리자 페이지

```text
src
|_app
|   |_admin
|_views
|   |_admin
```

## Shadcn 기본 컴포넌트에 추가된 컴포넌트

- button.tsx
  - ButtonIcon
- alert-dialog.tsx
  - AlertDialogTitleIcon

## 라이브러리 정보

[tailwind](https://tailwindcss.com/)

[shadcn/ui](https://ui.shadcn.com/)

[아이콘](https://lucide.dev/) -->
