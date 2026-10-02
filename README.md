# school-local-guide — Seongbuk Discovery (성북 디스커버리)
### Foreign Tourist Local Discovery Guide & Neighborhood Agent

> **수행평가 제출용 웹 프로젝트 (응용프로그래밍 화면구현)**  
> **분야**: 지역 사회  
> **주제**: 우리 동네 숨은 명소 / 맛집 발굴 봇 (외국인 관광객 가이드 에이전트)  
> **지역 범위**: 서울특별시 성북구 성북동 (Seongbuk-dong, Seoul)

---

## 1. Product Overview (제품 개요)

**Seongbuk Discovery**는 대형 프랜차이즈나 천편일률적인 관광지 대신, 서울의 역사문화 지구인 성북동 골목길에 숨겨진 사찰, 전통 찻집, 한옥 문학 산실, 50년 노포 식당, 한양도성 성곽 산책로를 외국인 관광객이 직관적으로 탐색할 수 있도록 설계된 **Map-First Spatial Local Guide**입니다.

* **Target Audience**: 서울의 진짜 로컬 정취와 고즈넉한 골목 문화를 경험하고자 하는 외국인 여행자 (영문 기본 UI, 한글 병기)
* **Design Philosophy**: **Contemporary Editorial + Spatial Map Experience** (OpenAI의 시각적 절제미와 여백 + Apple Maps의 정교한 상호작용). 카드 남발과 불필요한 그림자/그라디언트를 배제하고 타이포그래피와 여백 중심의 고급스러운 완성도를 구축했습니다.
* **Zero External API Dependency**: 외부 유료 API나 API Key 입력 요구 없이 **OpenStreetMap + Leaflet**을 기반으로 안정적으로 구동되며, Vercel 배포 즉시 100% 정상 작동합니다.

---

## 2. 10 Curated Real Locations (100% 실존 장소 큐레이션)

모든 장소는 실제 실측 좌표, 대중교통 접근로, 역사적 맥락, 현지인 추천 이유가 검증된 실존 데이터입니다.

1. **Gilsangsa Temple (길상사)**: 무소유 법정 스님과 김영한의 역사적 기부로 탄생한 도심 속 숲 사찰 (카톨릭 조각가 최종태 교수가 조각한 관세음보살상).
2. **Suyeonsanbang Tea House (수연산방)**: 근대 문학가 이태준 고택이자 1933년 정원형 한옥 전통 찻집 (단호박차, 쌍화차).
3. **Simujang (심우장)**: 만해 한용운 선생이 조선총독부를 바라보지 않기 위해 북향으로 지은 독립운동 유적 한옥.
4. **Sukjeongmun Gate (숙정문 / 북대문)**: 북악산 솔숲 능선에 자리한 한양도성의 북대문이자 유일하게 원형 성곽이 양측으로 보존된 은둔의 성문.
5. **Bukjeong Village (북정마을)**: 성곽 바로 아래 자리한 서울의 마지막 달동네이자 따뜻한 공동체 문화를 간직한 골목길.
6. **Seoul City Wall — Seongbuk Section (한양도성 성북 순성길)**: 혜화문에서 와룡공원으로 이어지는 600년 성곽 야경 및 일몰 산책로.
7. **Choe Sun-u House (최순우 옛집)**: 《무량수전 배흘림기둥에 서서》를 집필한 전 국립중앙박물관장 최순우의 1930년대 배흘림 한옥 정원 (내셔널트러스트 1호).
8. **Guksijib (국시집)**: 1969년 개업한 55년 전통 안동식 칼국수 및 한우 양지 수육 노포.
9. **Seongbukdong Dwaejigalbi (성북동 돼지갈비 기사식당)**: 1970년대부터 연탄불에 구워내는 불고기 백반 기사식당.
10. **Hyehwamun Gate (혜화문 / 동소문)**: 1396년 건립되어 성북 골목길의 관문 역할을 하는 옛 성문 (천장 봉황 벽화).

---

## 3. High-Fidelity Image Verification & Fallback System

* **Verified Photography**: 길상사, 숙정문, 혜화문 등은 **Wikimedia Commons**의 공식 오픈 라이선스(CC BY-SA) 고해상도 사진을 로컬 자산화하여 영구적이고 안정적인 로딩을 보장합니다.
* **Designed Editorial Fallback**: 불명확한 스톡 이미지를 남발하지 않고(NO IMAGE > WRONG IMAGE), 고유의 한옥 처마, 성곽 석축, 다도기, 연탄 화로 등의 **커스텀 SVG 건축 모티프 + 좌표 그리드 + 한글 캘리그래피 워터마크**로 구성된 고급 아카이벌 그래픽 커버를 제공합니다.

---

## 4. Contextual Local Guide Agent (결정론적 가이드 엔진)

인위적인 챗봇 창(채팅 버블, 로봇 아바타 등)을 배제하고, 장소 상세 뷰 내에 자연스럽게 녹아든 **상황 인지형 추천 시스템**입니다.

* **Spatial Distance Calculation**: Haversine 공식을 통해 현재 선택된 장소와 반경 내 주변 장소 간의 정확한 도보 거리 및 소요 시간(분)을 실시간 연산.
* **Thematic Pairings**:
  * 사찰(Culture) 관람 후 → 도보 8분 전통 찻집(Tea) 추천 및 정원 힐링 제안.
  * 노포 식당(Food) 식사 후 → 도보 5분 한옥 정원 산책(Walk) 및 소화 코스 추천.
  * 성곽길(Nature) 탐방 후 → 언덕 아래 따뜻한 백반 식당(Food) 제안.
* **Curated 2-Hour Circuits**:
  * *The Contemplative Sanctuary Circuit (2 Hours · 1.6 km)*
  * *Fortress Battlements & Mountain Village (2.5 Hours · 2.4 km)*
  * *Artisan Heritage & Heritage Noodle Table (1.5 Hours · 1.4 km)*
  수직 타임라인을 통해 각 단계별 머무는 시간과 도보 이동 가이드를 제공합니다.

---

## 5. Component Architecture

```
src/
├── types/index.ts              # Place, Category, Route, GuideSuggestion 타입 정의
├── data/
│   ├── places.ts               # 10개 검증 장소 데이터셋
│   └── routes.ts               # 3개 테마별 2시간 도보 코스
├── services/
│   └── localGuideEngine.ts     # 좌표 거리 계산 및 컨텍스트 추천 엔진
├── components/
│   ├── AppShell.tsx            # 메인 오케스트레이션 쉘
│   ├── TopNavigation.tsx       # 브랜드 정체성, 지역 표기, 카테고리 필터
│   ├── DiscoveryRail.tsx       # 에디토리얼 탐색 레일 (데스크톱 30%)
│   ├── AreaContext.tsx         # 지역 브리핑 및 메트릭스
│   ├── FeaturedPlace.tsx       # 단일 비주얼 히어로 장소
│   ├── PlaceIndex.tsx          # 콤팩트 스캐닝 리스트
│   ├── PlaceIndexItem.tsx      # 개별 장소 리스트 아이템
│   ├── MapCanvas.tsx           # Leaflet 인터랙티브 캔버스 (데스크톱 70%)
│   ├── PlaceDetailSheet.tsx    # 플로팅 디테일 서피스
│   ├── LocalGuide.tsx          # 상황 맞춤형 가이드 컴포넌트
│   ├── GuideSuggestion.tsx     # 추천 카드 액션
│   ├── RouteView.tsx           # 도보 코스 수직 타임라인
│   ├── ImageFallback.tsx       # 아카이벌 건축 그래픽 폴백
│   └── MobileBottomSheet.tsx   # 모바일 프로그레시브 바텀시트
├── styles/
│   ├── variables.css           # 4px 그리드, 웜화이트 팔레트 토큰
│   ├── base.css                # 리셋, 베이스 타이포그래피
│   ├── layout.css              # 데스크톱 2영역 및 모바일 뷰포트
│   ├── navigation.css          # 헤더 스타일
│   ├── discovery.css           # 탐색 레일 스타일
│   ├── map.css                 # 지도 캔버스 및 커스텀 마커
│   ├── detail.css              # 디테일 시트 스타일
│   ├── guide.css               # 로컬 가이드 및 코스 스타일
│   ├── fallback.css            # 그래픽 커버 스타일
│   └── mobile.css              # 모바일 바텀시트 애니메이션
└── index.css                   # 디자인 시스템 번들
```

---

## 6. How to Run Locally

```bash
# 1. 의존성 설치
npm install

# 2. 로컬 개발 서버 실행
npm run dev

# 3. 프로덕션 빌드 검증
npm run build
```

---

## 7. Vercel Deployment Compatibility

* **Production Bundle**: 순수 Vite + React + TypeScript + Vanilla CSS로 번들링되어 번들 용량이 매우 가볍고 빠릅니다 (CSS 23.7KB, JS 128KB gzip).
* **Zero Runtime External Key**: API 키가 없어도 지도 로딩 및 모든 추천 인터랙션이 100% 정상 작동합니다.
* **Vercel Settings**:
  * Build Command: `npm run build`
  * Output Directory: `dist`
  * Install Command: `npm install`
>>>>>>> baa0759 (feat: initial commit for Seongbuk Discovery local guide web project)
