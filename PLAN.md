# PLAN — Thép Xanh Nam Định FC Website (Frontend)

> **Dự án:** Website chính thức CLB Thép Xanh Nam Định FC
> **Công nghệ:** React, Next.js (App Router), i18n (vi default + en), Tailwind CSS
> **Design:** Theo DESIGN.md — Matte Sports Editorial, không dùng Stitch tokens
> **Backend:** NestJS (làm sau), FE dùng mock data trước
> **Stitch Project ID:** `11058020546447345196`

---

## Tiến độ tổng quan (cập nhật 2026-09-01)

> ⏸ **Tiếng Anh đang tạm tắt.** Khung i18n hoàn chỉnh (223 key khớp cả hai
> locale) nhưng nội dung — tin tức, tường thuật trận, dữ liệu sân và lịch sử —
> vẫn chỉ có tiếng Việt, nên bản `en` bị tạm dừng thay vì ra mắt nửa vời.
> Toàn bộ file dịch `src/i18n/messages/en/` được **giữ nguyên**.
> Bật lại: thêm `'en'` vào `locales` trong `src/i18n/config.ts`, rồi bỏ
> redirect `/en → /vi` trong `next.config.ts`. Không cần sửa chỗ nào khác.

| Phase | Nội dung | Trạng thái |
|-------|----------|------------|
| **0** | Project Setup & Design System | ✅ Hoàn thành |
| **1A** | Loading Screen | ✅ Hoàn thành |
| **1B** | Homepage | ✅ Hoàn thành |
| **2A** | Club Overview | ✅ Hoàn thành *(nâng cấp: parallax, 3D tilt, timeline drawing, Ken Burns, FB embed, Google Maps)* |
| **2B** | Squad Page | ✅ Hoàn thành |
| **2C** | Player Profile | ✅ Hoàn thành |
| **3A** | Fixtures (Matches) | ✅ Hoàn thành |
| **3B** | Results Archive | ⚡ Gộp vào 3A *(matches page có filter finished)* |
| **3C** | Match Detail | ✅ Hoàn thành *(data đầy đủ cho 3 trận gần nhất + trận kế; còn lại hiện empty state)* |
| **3D** | Standings | ✅ Hoàn thành |
| **4A** | News Center | ⚡ ~85% *(card đã bấm được; còn thiếu search + pagination)* |
| **4B** | News Detail | ✅ Hoàn thành *(10/10 bài có nội dung đầy đủ)* |
| **5** | Stadium & History | ✅ Hoàn thành |
| **6** | 404 + SEO + Polish | ⚡ 6A xong; còn SEO (6B) + QA (6C) |
| **7** | WebSocket Live Match | ❌ Chưa làm |
| **8** | API Contract | ✅ Đã ghi trong PLAN |

### Shared components đã build:
- `ContentLoader` — skeleton loading dùng chung (shimmer animation, 600ms delay)
- `useScrollReveal` — IntersectionObserver hook
- `CountUp` — animated number counter

---

## Tổng quan Screens (26 screens từ Stitch)

| # | Screen | Desktop | Mobile | Route |
|---|--------|---------|--------|-------|
| 01 | Loading Screen | x | | `/` (splash) |
| 02 | Homepage | x | x | `/` |
| 03 | Club Overview | x | x | `/club` |
| 04 | Squad Page | x | x | `/squad` |
| 05 | Player Profile | x | x | `/squad/[playerId]` |
| 06 | Fixtures | x | x | `/matches` |
| 07 | Results Archive | x | x | `/matches/results` |
| 08 | Match Detail | x | x | `/matches/[matchId]` |
| 10 | Standings | x | x | `/standings` |
| 11 | News Center | x | x | `/news` |
| 12 | News Detail | x | x | `/news/[slug]` |
| 13 | Thiên Trường Stadium | x | x | `/stadium` |
| 15 | 404 Error | x | | (not-found) |
| 17 | History & Honours | x | x | `/history` |

---

## Tech Stack chi tiết

| Layer | Công nghệ | Lý do |
|-------|-----------|-------|
| Framework | Next.js 15 (App Router) | SSR/SSG, routing, image optimization |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS v4 + CSS custom properties | Design tokens từ DESIGN.md |
| i18n | next-intl | Routing `/vi/...`, `/en/...`, vi = default |
| State | Zustand (nhẹ) | Client state (theme, menu) |
| Data fetching | Mock JSON → sau chuyển fetch API | Dễ swap khi có BE |
| Images | next/image + blur placeholder | Optimize + lazy load |
| Icons | lucide-react | Nhẹ, tree-shakeable |
| Animation | CSS transitions + Framer Motion (hạn chế) | Theo DESIGN.md: mechanical, không bouncy |
| Dark mode | CSS custom properties + context | Toggle light/dark |
| Fonts | Google Fonts: Bebas Neue, Archivo, Be Vietnam Pro, JetBrains Mono | Theo DESIGN.md (KHÔNG dùng Inter) |
| Linting | ESLint + Prettier | Code consistency |

---

## Cấu trúc thư mục

```
src/
├── app/
│   └── [locale]/                  # i18n routing (vi, en)
│       ├── layout.tsx             # Root layout (Header + Footer)
│       ├── page.tsx               # Homepage
│       ├── loading.tsx            # Loading screen (splash)
│       ├── not-found.tsx          # 404
│       ├── club/page.tsx
│       ├── squad/
│       │   ├── page.tsx
│       │   └── [playerId]/page.tsx
│       ├── matches/
│       │   ├── page.tsx           # Fixtures
│       │   ├── results/page.tsx
│       │   └── [matchId]/page.tsx
│       ├── standings/page.tsx
│       ├── news/
│       │   ├── page.tsx
│       │   └── [slug]/page.tsx
│       ├── stadium/page.tsx
│       └── history/page.tsx
│
├── modules/                       # Mỗi màn = 1 module độc lập
│   ├── home/
│   │   ├── components/            # Components riêng của module
│   │   ├── hooks/                 # Hooks riêng
│   │   ├── types.ts               # Types riêng
│   │   ├── data.ts                # Mock data
│   │   └── index.ts               # Export chính
│   ├── club/
│   ├── squad/
│   ├── player-profile/
│   ├── fixtures/
│   ├── results/
│   ├── match-detail/
│   ├── standings/
│   ├── news-center/
│   ├── news-detail/
│   ├── stadium/
│   ├── history/
│   └── loading-screen/
│
├── shared/                        # Components dùng chung
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx         # Desktop + Mobile header
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── Container.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx          # LIVE, FT, UPCOMING
│   │   │   ├── CategoryFilter.tsx # Horizontal tab/chip filter
│   │   │   ├── Pagination.tsx
│   │   │   ├── SearchInput.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── match/
│   │   │   ├── MatchScoreCard.tsx  # Score widget (2 teams + score)
│   │   │   ├── MatchRow.tsx        # Fixture/result row
│   │   │   └── MatchBadge.tsx      # LIVE/FT/UPCOMING badge
│   │   ├── player/
│   │   │   └── PlayerCard.tsx      # Player grid card
│   │   ├── news/
│   │   │   ├── NewsCardLarge.tsx   # Featured article
│   │   │   └── NewsCardSmall.tsx   # Grid article
│   │   └── data/
│   │       ├── LeagueTable.tsx     # Standings table
│   │       └── StatCard.tsx        # Icon + number + label
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   ├── useMediaQuery.ts
│   │   └── useScrollReveal.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── cn.ts                  # classnames helper
│   └── types/
│       ├── match.ts
│       ├── player.ts
│       ├── news.ts
│       └── common.ts
│
├── i18n/
│   ├── vi/
│   │   ├── common.json
│   │   ├── home.json
│   │   ├── squad.json
│   │   ├── matches.json
│   │   ├── news.json
│   │   ├── club.json
│   │   ├── stadium.json
│   │   └── history.json
│   └── en/
│       └── ... (tương tự)
│
├── mocks/                         # Mock data (JSON)
│   ├── players.json
│   ├── matches.json
│   ├── news.json
│   ├── standings.json
│   ├── club.json
│   ├── stadium.json
│   └── history.json
│
├── styles/
│   ├── globals.css                # Design tokens, fonts, base styles
│   └── theme.css                  # Dark mode overrides
│
└── config/
    ├── navigation.ts              # Menu items
    └── site.ts                    # Site metadata
```

---

## Shared Components (dùng chung giữa các modules)

Từ phân tích UI, các components sau xuất hiện ở nhiều screens:

| Component | Dùng ở screens | Mô tả |
|-----------|---------------|-------|
| `Header` | Tất cả | Logo trái, nav giữa/phải, search, language switch, dark mode toggle |
| `Footer` | Tất cả | Club name, links (Privacy, Terms, Contact, Sponsors), copyright, social |
| `MobileMenu` | Tất cả (mobile) | Hamburger → slide-out menu |
| `MatchScoreCard` | Homepage, Fixtures, Results | 2 team crests + score + date + venue |
| `MatchRow` | Fixtures, Results | Row ngang: date, home vs away, score, venue, badge |
| `MatchBadge` | Nhiều nơi | LIVE (đỏ pulse), FT (navy), UPCOMING (gray) |
| `PlayerCard` | Squad, Homepage | Photo + số áo lớn + tên + vị trí + quốc kỳ |
| `NewsCardLarge` | Homepage, News Center | Featured: ảnh lớn + category badge + title + excerpt |
| `NewsCardSmall` | Homepage, News Center, News Detail (related) | Thumbnail + title + date |
| `LeagueTable` | Homepage, Standings | Bảng xếp hạng: rank, logo, name, P/W/D/L/GD/Pts |
| `StatCard` | Stadium, Club Overview | Icon + số lớn Bebas Neue + label nhỏ |
| `CategoryFilter` | Squad, News Center, Fixtures | Horizontal tabs filter (Tất cả, Thủ môn, ...) |
| `SectionHeader` | Nhiều nơi | Title Bebas Neue + subtitle + optional "Xem tất cả" link |
| `Pagination` | News Center, Results | < 1 2 3 ... > |
| `SearchInput` | News Center | Input với icon search |
| `ShareButtons` | News Detail, Match Detail | Share social icons |
| `Skeleton` | Tất cả data screens | Loading skeleton theo DESIGN.md |
| `Button` | Tất cả | Primary/Secondary/Dark/Ghost theo DESIGN.md |
| `Badge` | Nhiều nơi | Category tag, status tag |
| `Breadcrumb` | Các trang con | Home > Squad > Player Name |

---

## PHASE 0 — Project Setup & Design System

**Mục tiêu:** Dựng nền tảng, chạy được dev server, có layout cơ bản.

### Việc cần làm:

- [x] **0.1** Khởi tạo Next.js 15 project + TypeScript + Tailwind CSS v4
- [x] **0.2** Cấu hình `next-intl` — routing `/vi/...` (default), `/en/...`
- [x] **0.3** Setup fonts: Bebas Neue, Archivo (Condensed + Black), Be Vietnam Pro, JetBrains Mono qua `next/font/google`
- [x] **0.4** Design tokens → CSS custom properties trong `globals.css` (copy từ DESIGN.md section 11)
- [x] **0.5** Tailwind config: extend colors, fonts, spacing, radius theo tokens
- [x] **0.6** Dark mode setup: CSS custom properties swap + context provider + toggle
- [x] **0.7** Base layout: `[locale]/layout.tsx` với Header + Footer
- [x] **0.8** Header component: Desktop (logo + nav + search + lang + theme) + Mobile (hamburger)
- [x] **0.9** Footer component: Club name, nav links, copyright, social icons
- [x] **0.10** MobileMenu component: Slide-out overlay
- [x] **0.11** Shared UI primitives: Button, Badge, Container, Skeleton, SectionHeader
- [x] **0.12** Cấu trúc thư mục `modules/`, `shared/`, `mocks/`, `i18n/`
- [x] **0.13** i18n files cơ bản: `common.json` (vi + en) với nav items, footer text
- [x] **0.14** ESLint + Prettier config
- [x] **0.15** Responsive breakpoints setup (1440, 1200, 768, 390)

### Output Phase 0:
- Dev server chạy được
- Mọi route hiển thị Header + placeholder + Footer
- Chuyển ngôn ngữ vi/en hoạt động
- Dark/Light mode toggle hoạt động
- Responsive header (desktop nav ↔ mobile hamburger)

---

## PHASE 1 — Loading Screen & Homepage

### 1A — Loading Screen (Shader/Splash)

**Screen:** 01 — Loading Screen
**Module:** `modules/loading-screen/`
**Tham chiếu DESIGN.md:** Section 9 — Loading Screen

- [x] **1A.1** Component `LoadingScreen`: full-viewport overlay
- [x] **1A.2** WebGL/Canvas shader effect (từ Stitch "Shader" screen)
- [x] **1A.3** Stadium gate animation: 2 panel (top + bottom) Dark Navy, film grain 3%
- [x] **1A.4** Club crest hiện giữa khi 2 panel gặp nhau
- [x] **1A.5** 3 championship stars vàng (#C3A044) phía trên crest
- [x] **1A.6** Progress bar: 2px Club Blue, fill left→right
- [x] **1A.7** Panels tách ra reveal homepage — easing `cubic-bezier(0.65, 0, 0.35, 1)` 800ms
- [x] **1A.8** Tổng thời gian ~2.5-3s, chỉ hiện lần đầu truy cập (sessionStorage flag)
- [x] **1A.9** i18n: không cần text (chỉ visual)

### 1B — Homepage

**Screen:** 02 — Homepage (Desktop) + TXND FC Trang Chủ (Mobile)
**Module:** `modules/home/`
**Route:** `/[locale]`
**Tham chiếu DESIGN.md:** Section 9 — Homepage

- [x] **1B.1** Hero section: Full-bleed ảnh sân Thiên Trường + overlay Dark Navy gradient + headline Bebas Neue "NIỀM TỰ HÀO THÀNH NAM" + 1 CTA button
- [x] **1B.2** Match Center section: Dark Navy background, scoreboard style — trận tiếp theo / kết quả gần nhất. Bebas Neue scores lớn, JetBrains Mono thời gian, team crests
- [x] **1B.3** Standings mini: Bảng xếp hạng rút gọn (top 4-5 đội) + link "Xem đầy đủ"
- [x] **1B.4** News section: Editorial layout — 1 bài lớn (7 cols) + 2-3 bài nhỏ (5 cols). KHÔNG dùng 3 card đều nhau
- [x] **1B.5** Mock data: `mocks/home.json` (next match, latest result, standings top 5, latest news 4 bài)
- [x] **1B.6** Skeleton loading cho từng section
- [x] **1B.7** Scroll reveal animations: fade + translateY(16px), stagger 50ms
- [x] **1B.8** Mobile layout: đồng nhất với desktop (cùng sections, reflow single column), match info ưu tiên lên đầu
- [x] **1B.9** i18n: `home.json` (vi + en) — hero text, section titles, CTA labels

### Shared components đã build trong Phase 1:
- [x] `MatchScoreCard`
- [x] `LeagueTableMini`
- [x] `NewsCardLarge` + `NewsCardSmall`
- [x] `SectionHeader`

---

## PHASE 2 — Câu lạc bộ & Đội hình

### 2A — Club Overview

**Screen:** 03 — Club Overview
**Module:** `modules/club/`
**Route:** `/[locale]/club`

- [x] **2A.1** Hero: Ảnh sân/CLB + overlay + title "Câu lạc bộ" *(parallax 3-layer hero)*
- [x] **2A.2** Giới thiệu CLB: text editorial layout *(scroll-reveal ClubAbout section)*
- [x] **2A.3** Stats highlights: StatCard row (năm thành lập, số chức vô địch, sức chứa sân...) *(CountUp animation)*
- [x] **2A.4** Lịch sử tóm tắt *(ClubTimeline — scroll-driven drawing line, 7 milestones)*
- [x] **2A.5** Mock data: hardcoded trong components (trang fix cứng)
- [x] **2A.6** i18n: `club.json` (vi + en)
- [x] **2A.7** Responsive: mobile single column
- [x] **2A.8** *(Thêm)* Trophies: 3D tilt cards với mouse-tracking + radial-gradient glint
- [x] **2A.9** *(Thêm)* Stadium section: Ken Burns animation + Google Maps iframe + fact cards
- [x] **2A.10** *(Thêm)* Fans section: Facebook page iframe embed

### 2B — Squad Page

**Screen:** 04 — Squad Page
**Module:** `modules/squad/`
**Route:** `/[locale]/squad`

- [x] **2B.1** Page header: "ĐỘI HÌNH" + subtitle mùa giải
- [x] **2B.2** CategoryFilter (PositionFilter): Tất cả | Thủ môn | Hậu vệ | Tiền vệ | Tiền đạo *(với counts)*
- [x] **2B.3** Player grid: 4 cols desktop, 3 cols tablet, 2 cols mobile
- [x] **2B.4** PlayerCard component: placeholder photo, số áo lớn, tên, vị trí badge (color-coded), quốc kỳ, tuổi/chiều cao/cân nặng
- [ ] **2B.5** Group by position với section headers + horizontal rule *(dùng filter thay vì group)*
- [ ] **2B.6** Background alternation giữa groups (Off White / White)
- [ ] **2B.7** Click card → navigate to `/squad/[playerId]`
- [x] **2B.8** Mock data: `mocks/squad.json` (16 cầu thủ)
- [x] **2B.9** Skeleton loading grid *(ContentLoader shared component)*
- [x] **2B.10** i18n: `squad.json` (position names, filter labels)

### 2C — Player Profile

**Screen:** 05 — Player Profile
**Module:** `modules/player-profile/`
**Route:** `/[locale]/squad/[playerId]`

- [ ] **2C.1** Hero: Large player photo (50%+ viewport width desktop) + oversized jersey number Bebas Neue 8-12rem (background graphic, 15-25% opacity)
- [ ] **2C.2** Player name: Archivo Black hero scale
- [ ] **2C.3** Player info: Quốc tịch, tuổi, chiều cao, cân nặng, vị trí
- [ ] **2C.4** Season stats: Typographic grid — số lớn Bebas Neue + label nhỏ (Appearances, Goals, Assists, Rating...), divided by 1px rules. KHÔNG dùng radial chart hay progress bar
- [ ] **2C.5** Recent performance section: ảnh + mô tả
- [ ] **2C.6** Phong độ 5 trận gần nhất (W/D/L color indicators)
- [ ] **2C.7** Breadcrumb: Home > Đội hình > Tên cầu thủ
- [ ] **2C.8** Mock data: extend `mocks/players.json` với stats detail
- [ ] **2C.9** i18n: thêm vào `squad.json` (stat labels, bio labels)

### Shared components đã build trong Phase 2:
- [x] `PlayerCard` *(trong modules/squad)*
- [x] `PositionFilter` *(thay CategoryFilter, trong modules/squad)*
- [x] `ContentLoader` *(shared UI — skeleton loading dùng chung)*
- [x] `CountUp` *(trong modules/club)*
- [x] `useScrollReveal` hook *(trong modules/club)*
- [ ] `Breadcrumb`

---

## PHASE 3 — Trận đấu & Giải đấu

### 3A — Fixtures (Lịch thi đấu)

**Screen:** 06 — Fixtures
**Module:** `modules/fixtures/`
**Route:** `/[locale]/matches`

- [x] **3A.1** Page header: "LỊCH THI ĐẤU" + dynamic subtitle theo giải đấu
- [x] **3A.2** Filter: dropdown chọn giải đấu + vòng đấu (trên), tabs trạng thái all/upcoming/finished (dưới)
- [x] **3A.3** Match cards: date, đội nhà vs đội khách, tỉ số, sân, badge trạng thái
- [x] **3A.4** KHÔNG dùng individual cards — dùng 1px dividers giữa rows
- [x] **3A.5** Mobile: simplified rows, swipe giữa tháng *(scroll-snap lane + month switcher)*
- [x] **3A.6** Click row → navigate to `/matches/[matchId]`
- [x] **3A.7** Mock data: `mocks/matches.json` (upcoming + finished matches)
- [x] **3A.8** i18n: `matches.json` (vi + en)

### 3B — Results Archive (Kết quả)

**Screen:** 07 — Results Archive
**Module:** `modules/results/`
**Route:** `/[locale]/matches/results`

- [ ] **3B.1** Page header: "KẾT QUẢ"
- [ ] **3B.2** Tương tự Fixtures nhưng hiển thị kết quả: FT badge, score Bebas Neue, W/D/L color
- [ ] **3B.3** Filter theo giải đấu (V.League, Cúp QG...)
- [ ] **3B.4** Pagination
- [ ] **3B.5** Mock data: extend `mocks/matches.json` (past results)
- [ ] **3B.6** i18n: dùng chung `matches.json`

### 3C — Match Detail (Chi tiết trận đấu)

**Screen:** 08 — Match Detail
**Module:** `modules/match-detail/`
**Route:** `/[locale]/matches/[matchId]`

- [x] **3C.1** Scoreboard header: Dark Navy, ảnh sân background, 2 team crests lớn + VS/score Bebas Neue, ngày giờ JetBrains Mono, địa điểm
- [x] **3C.2** Tabs: Tổng quan | Đội hình | Thống kê | Truyền hình (Archivo Condensed, active = 2px bottom border Club Blue)
- [x] **3C.3** Tab Tổng quan: bài recap + ảnh hành động
- [x] **3C.4** Tab Đội hình: 2 column lineup (home/away)
- [x] **3C.5** Tab Thống kê: Possession, shots, fouls... bar comparison
- [x] **3C.6** Tab Truyền hình: thông tin kênh phát sóng
- [x] **3C.7** Sidebar: "Mua vé" CTA card (link external, configurable) + Match info (Giải đấu, Vòng, Trọng tài, Sân)
- [x] **3C.8** Phong độ 5 trận gần nhất (2 đội)
- [x] **3C.9** ShareButtons
- [x] **3C.10** Mock data: `mocks/match-details.json` *(file riêng, key theo `matchId`; đủ data cho r18/r19/r20 + r21, trận khác hiện empty state)*
- [x] **3C.11** i18n: thêm vào `matches.json`

### 3D — Standings (Bảng xếp hạng)

**Screen:** 10 — Standings
**Module:** `modules/standings/`
**Route:** `/[locale]/standings`

- [x] **3D.1** Page header: "BẢNG XẾP HẠNG" + dynamic subtitle
- [x] **3D.2** Competition selector: horizontal tabs (V.League 1, Cúp Quốc gia)
- [x] **3D.3** Full LeagueTable: alternating rows, rank badge (blue top 3, red bottom 2), logo, name, P/W/D/L/GD/Pts
- [x] **3D.4** Highlight row TXND: subtle blue background
- [x] **3D.5** Mobile compact: chỉ hiện P/GD/Pts, desktop full columns
- [x] **3D.6** Mock data: `mocks/standings.json` (14 đội V.League + 4 đội Cúp QG)
- [x] **3D.7** i18n: `standings.json` (vi + en) — short + full column headers

### Shared components Phase 3:
- [x] ~~`MatchCard`~~ *(đã xoá — DESIGN.md yêu cầu rows, không dùng card)*
- [x] `MatchFilters` *(dropdown giải + vòng, tabs trạng thái)*
- [x] `StandingsTable` *(full version trong modules/standings)*
- [x] `MatchRow` *(shared/components/match — grid row + 1px dividers)*
- [x] `MatchBadge`
- [x] `ShareButtons`
- [x] Tab component (for Match Detail) *(`shared/components/ui/Tabs.tsx`)*

---

## PHASE 4 — Tin tức

### 4A — News Center (Trung tâm tin tức)

**Screen:** 11 — News Center
**Module:** `modules/news-center/`
**Route:** `/[locale]/news`

- [x] **4A.1** Page header: "TIN TỨC" + subtitle
- [ ] **4A.2** SearchInput: tìm kiếm tin tức *(chưa làm — simplified version)*
- [x] ~~**4A.3**~~ CategoryFilter *(bỏ theo yêu cầu — để chung chung, ko chia mục)*
- [x] **4A.4** Featured article: NewsCard variant `featured` (2-column large layout, category badge + date + title + excerpt)
- [x] **4A.5** News grid: NewsCard regular (thumbnail + title + excerpt + date) với ContentLoader
- [ ] **4A.6** Pagination: < 1 2 3 ... >
- [x] **4A.7** Mock data: `mocks/news.json` (10 bài viết, sorted by date)
- [x] **4A.8** Skeleton loading *(ContentLoader shared component)*
- [x] **4A.9** i18n: `news.json` (vi + en)

### 4B — News Detail (Chi tiết tin tức)

**Screen:** 12 — News Detail
**Module:** `modules/news-detail/`
**Route:** `/[locale]/news/[slug]`

- [x] **4B.1** Breadcrumb: Home > Tin tức > Title
- [x] **4B.2** Category badge + date
- [x] **4B.3** Headline: Archivo Black / Bebas Neue display scale
- [x] **4B.4** Subtitle/excerpt
- [x] **4B.5** Author info: avatar + name + date *(avatar = chữ cái viết tắt, mock data chưa có ảnh tác giả)*
- [x] **4B.6** Hero image: full body width, 3:2 hoặc 16:9
- [x] **4B.7** Article body: Be Vietnam Pro 400, 1rem, 1.65 line-height, max-width 820px centered
- [x] **4B.8** Pull quotes: Archivo Condensed 600 Italic, 1.5rem, left border 3px Club Blue
- [x] **4B.9** Sidebar: ShareButtons + card trận liên quan *(tỉ số + link sang match detail; chỉ hiện khi bài có `relatedMatchId`)*
- [x] **4B.10** Related News section: 3 NewsCardSmall
- [x] **4B.11** Mock data: `mocks/news.json` có `content` dạng block (`paragraph` / `heading` / `quote`) cho cả 10 bài
- [x] **4B.12** i18n: thêm vào `news.json`

---

## PHASE 5 — Sân vận động & Lịch sử

### 5A — Thiên Trường Stadium

**Screen:** 13 — Thiên Trường Stadium
**Module:** `modules/stadium/`
**Route:** `/[locale]/stadium`

- [x] **5A.1** Hero: Ảnh panoramic sân Thiên Trường + overlay + "THIÊN TRƯỜNG - THÁNH ĐỊA THÀNH NAM" Bebas Neue + CTA "Mua vé"
- [x] **5A.2** Stats row: StatCard — **30.000** (sức chứa), 2003 (năm khánh thành), 3 danh hiệu V.League
  - ⚠ PLAN ghi 25.000 nhưng `club.json`, `ClubStats` và `ClubStadium` đều ghi 30.000 → dùng 30.000 cho nhất quán
- [x] **5A.3** "Trái Tim Bóng Đá Nam Định" section: editorial layout (text + ảnh sân) — lịch sử sân, thông tin kỹ thuật
- [x] **5A.4** Seating map: dùng **sơ đồ chính thức** `images/common/stadium/sodosanvandong.jpg`, overlay 4 vùng bấm (A / B / C / D) — click hiện tên khán đài, danh sách khu và mô tả. Ảnh nhìn từ trên xuống, KHÔNG 3D, KHÔNG perspective
  - Wrapper cắt bỏ viền poster và dải logo tài trợ, chỉ hiện phần sơ đồ
  - Tên khán đài và khu (A1–A6, B1–B4, C, D) lấy đúng theo sơ đồ, thay cho bản tự vẽ Đông/Tây/Nam/Bắc trước đó
  - Bỏ sức chứa từng khán đài vì sơ đồ không ghi — không bịa số
- [x] **5A.5** "Không Khí Ngày Trận" gallery: grid tự co theo số ảnh
  - ⚠ Chỉ có **2 ảnh thật** (`sanvandong.webp` + banner đội hình). Toàn bộ `public/images/news/*.jpg` là ảnh giả 2.3KB màu đặc → cần ảnh matchday thật
- [x] **5A.6** Mock data: `mocks/stadium.json`
- [x] **5A.7** i18n: `stadium.json` (vi + en)

### 5B — History & Honours (Lịch sử & Thành tích)

**Screen:** 17 — History & Honours
**Module:** `modules/history/`
**Route:** `/[locale]/history`

- [x] **5B.1** Hero: ảnh đội hình + cúp tại Thiên Trường, `grayscale(0.85)` + grain
- [x] **5B.2** Timeline: Các mốc lịch sử quan trọng — year numbers lớn Bebas Neue as graphic elements
- [x] **5B.3** Championship years: **1985, 2024, 2025** — oversized numbers + Gold (#C3A044) stars. Đây là CHỖ DUY NHẤT dùng màu vàng
  - ⚠ PLAN/DESIGN.md ghi `1965, 1984, 1985`, nhưng dữ liệu trong code (`ClubTrophies`, `ClubTimeline`, `statTitles: 3`) là 1985 / 2023-24 / 2024-25. 1965 là năm thành lập, không phải danh hiệu → dùng theo dữ liệu code
  - Đã kiểm tra: gold chỉ xuất hiện 3 lần, duy nhất ở trang History
- [x] **5B.4** Honours list: Danh hiệu theo thời gian
- [x] **5B.5** Historical photos: grayscale(0.85) + grain
- [x] **5B.6** Texture grain ở hero (dùng lại `.loading-grain`)
- [x] **5B.7** Mock data: `mocks/history.json`
- [x] **5B.8** i18n: `history.json` (vi + en)

---

## PHASE 6 — Trang phụ, SEO & Polish

### 6A — 404 Error Page

**Screen:** 15 — 404 Error
**Module:** `modules/error/`

- [x] **6A.1** `not-found.tsx`: concept **"Việt vị"** — nền Dark Navy + ảnh sân Thiên Trường, `404` cỡ đại làm watermark, đường việt vị Club Blue nghiêng 2.5° tự kẻ ngang một lượt (700ms, gate easing), cờ trọng tài biên, CTA "Về trang chủ"
  - UI tách ra `NotFoundScene` dùng chung cho cả 2 file 404 — animation thuần CSS, không phụ thuộc JS, có `prefers-reduced-motion`
  - `app/[locale]/not-found.tsx` — bắt `notFound()` trong segment locale, có i18n, kèm Header/Footer
  - `app/not-found.tsx` — bắt URL không khớp route nào; root layout là passthrough nên file này tự dựng `<html>/<body>`
  - ⚠ Hạn chế: URL không khớp route dưới `/en` vẫn hiện chữ tiếng Việt, vì ở nhánh này không có locale context
- [x] **6A.2** i18n: `error404` / `error404Desc` / `backToHome` đã có sẵn trong `common.json`

### 6B — SEO & Meta

- [ ] **6B.1** Dynamic meta tags cho mỗi page (title, description, og:image)
- [ ] **6B.2** `robots.txt` + `sitemap.xml` (next-sitemap)
- [ ] **6B.3** Open Graph images: auto-generate hoặc static per page
- [ ] **6B.4** Structured data (JSON-LD): SportsOrganization, SportsEvent cho matches
- [ ] **6B.5** Canonical URLs cho i18n pages

### 6C — Polish & QA

- [ ] **6C.1** Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] **6C.2** Mobile testing (iPhone, Android)
- [ ] **6C.3** Performance audit (Lighthouse > 90)
- [ ] **6C.4** Accessibility audit (WCAG 2.1 AA)
- [ ] **6C.5** Dark mode QA: tất cả screens
- [ ] **6C.6** i18n QA: tất cả text hiển thị đúng vi/en
- [ ] **6C.7** Quality checklist theo DESIGN.md Section 12

---

## PHASE 7 — WebSocket Live Match (Tùy chọn)

> Thêm real-time cập nhật tỉ số khi có BE sẵn sàng.

- [ ] **7.1** Install `socket.io-client`
- [ ] **7.2** Custom hook `useMatchLive(matchId)`: connect/disconnect, listen events
- [ ] **7.3** `LiveMatchProvider` context: wrap match-related pages
- [ ] **7.4** Update `MatchScoreCard`: real-time score, match clock
- [ ] **7.5** Match events feed: bàn thắng, thẻ phạt, thay người (push vào timeline)
- [ ] **7.6** LIVE badge pulsing dot (animation duy nhất được phép loop)
- [ ] **7.7** Auto-reconnect + fallback polling nếu WS fail
- [ ] **7.8** Mock WebSocket server cho dev (optional)

---

## PHASE 8 — API Contract (Cho Backend NestJS)

> Danh sách tất cả API endpoints mà FE cần. BE sẽ implement theo contract này.

### Auth & Config

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/config` | Site config (tên CLB, social links, ticket URL, theme settings) |

### Homepage

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/home` | Aggregated: next match + latest result + standings top 5 + latest news 4 bài |

*Hoặc tách nhỏ:*

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/matches/next` | Trận đấu tiếp theo |
| GET | `/api/matches/latest` | Kết quả trận gần nhất |
| GET | `/api/standings?limit=5` | BXH rút gọn |
| GET | `/api/news?limit=4` | Tin tức mới nhất |

### Club

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/club` | Thông tin CLB (giới thiệu, stats, lịch sử tóm tắt) |

### Squad / Players

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/players` | Danh sách cầu thủ (có filter `?position=goalkeeper\|defender\|midfielder\|forward`) |
| GET | `/api/players/:id` | Chi tiết cầu thủ (bio + stats + recent form) |

### Matches

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/matches?type=upcoming&page=1&limit=10` | Lịch thi đấu sắp tới (paginated) |
| GET | `/api/matches?type=past&page=1&limit=10` | Kết quả đã đấu (paginated) |
| GET | `/api/matches?type=past&competition=v-league` | Filter theo giải |
| GET | `/api/matches/:id` | Chi tiết trận đấu (lineup, stats, events, recap) |

### Standings

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/standings` | BXH đầy đủ |
| GET | `/api/standings?competition=v-league` | BXH theo giải |

### News

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/news?page=1&limit=10` | Danh sách tin tức (paginated) |
| GET | `/api/news?category=v-league&page=1&limit=10` | Filter theo category |
| GET | `/api/news?search=keyword` | Tìm kiếm tin tức |
| GET | `/api/news/:slug` | Chi tiết bài viết (full content + related news) |

### Stadium

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/stadium` | Thông tin sân (lịch sử, specs, seating sections, gallery images) |

### History

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/history` | Timeline mốc lịch sử + danh hiệu |

### WebSocket (Phase 7)

| Event | Channel | Mô tả |
|-------|---------|-------|
| `match:score` | `match:{matchId}` | Cập nhật tỉ số |
| `match:event` | `match:{matchId}` | Sự kiện: goal, card, substitution |
| `match:status` | `match:{matchId}` | Trạng thái: kickoff, halftime, fulltime |
| `match:clock` | `match:{matchId}` | Đồng hồ trận đấu (phút) |

### Upload / Admin (cho sau)

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/admin/news` | Tạo bài viết |
| PUT | `/api/admin/news/:slug` | Sửa bài viết |
| DELETE | `/api/admin/news/:slug` | Xóa bài viết |
| POST | `/api/admin/players` | Thêm cầu thủ |
| PUT | `/api/admin/players/:id` | Sửa thông tin cầu thủ |
| POST | `/api/admin/matches` | Thêm trận đấu |
| PUT | `/api/admin/matches/:id` | Cập nhật trận đấu |
| POST | `/api/upload` | Upload ảnh (trả về URL) |

---

## Ước lượng thời gian (tham khảo)

| Phase | Nội dung | Ước lượng |
|-------|----------|-----------|
| 0 | Setup & Design System | 2-3 ngày |
| 1 | Loading Screen + Homepage | 3-4 ngày |
| 2 | Club + Squad + Player Profile | 3-4 ngày |
| 3 | Fixtures + Results + Match Detail + Standings | 4-5 ngày |
| 4 | News Center + News Detail | 2-3 ngày |
| 5 | Stadium + History | 2-3 ngày |
| 6 | 404 + SEO + Polish | 2-3 ngày |
| 7 | WebSocket (tùy chọn) | 1-2 ngày |
| 8 | API Contract (tài liệu) | Đã ghi ở trên |
| **Tổng** | | **~20-27 ngày** |

---

## Lưu ý quan trọng

1. **DESIGN.md là source of truth** — KHÔNG dùng Stitch design tokens (Inter bị cấm, color scheme khác)
2. **Mỗi module độc lập** — import shared components, có mock data riêng, có types riêng
3. **Mock data → API**: Mỗi module có file `data.ts` gọi mock JSON. Khi có BE, chỉ cần đổi `data.ts` thành fetch API
4. **Mobile KHÔNG phải desktop thu nhỏ** — redesign layout cho mobile context (DESIGN.md Section 5)
5. **Hạn chế animation** — chỉ dùng permitted animations trong DESIGN.md Section 7
6. **Gold (#C3A044) chỉ dùng ở History** — 3 ngôi sao vô địch, năm championship. KHÔNG dùng cho buttons, headings, decorative
7. **Dark mode** — swap CSS custom properties, không thay đổi layout
