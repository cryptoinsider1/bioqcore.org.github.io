# Техническое задание на доработку сайта BioQCore.org

Версия: v0.9 Release Candidate
Объект: bioqcore.org
Тип проекта: публичный сайт + Trust Center + документационный контур + контактно-партнёрская воронка
Релизная адаптация: v1.0.0-rc static-first GitHub Pages package
Дата: 2026-06-13

## 1. Цель

Привести текущий BioQCore.org в рабочий, юридически аккуратный, технически устойчивый и институционально понятный вид для партнёров, исследователей, грантодателей, юристов, банков, инвесторов и будущих участников консорциума.

Главная цель: публично и юридически аккуратно объяснить BioQCore как гуманитарно-научный trust-first консорциум в фазе research/design/prototype.

Вторичные цели:

1. Сформировать понятный путь для партнёров, лабораторий, грантодателей и исследователей.
2. Показать прозрачную архитектуру управления, аудита, безопасности и дорожной карты.

До контрольной точки игнорируются: токенсейл, агрессивный фандрайзинг, неподтверждённые партнёрства, сбор медицинских данных, публичные обещания клинического результата.

## 2. Инварианты

1. Правда статуса: всё planned/prototype/lab phase помечается явно.
2. Миссия выше маркетинга.
3. Юридическая чистота: medical/investment/token/partner disclaimers.
4. Privacy by design: минимум данных, запрет медицинских данных через публичный сайт.
5. Security by design: HTTPS, CSP, secure headers, no secrets.
6. Transparency without exposure.
7. Mission-invariant core + local legal envelopes.
8. Партнёры только по статусу: confirmed / in discussion / target / context.
9. Token/DAO only as future optional mechanism.
10. SHIP first.

## 3. Целевые аудитории

- Исследователи и лаборатории.
- Грантодатели и фонды.
- Банки, юристы, compliance-специалисты.
- Инвесторы и стратегические партнёры.
- Пациенты/родители/широкая публика.
- Разработчики и open-science участники.

## 4. Информационная архитектура MVP

- Home
- Mission
- Trust Fabric
- Research
- Governance
- Transparency
- Roadmap
- Docs
- Partner
- Contact
- Privacy
- Terms
- Security

## 5. Релизный SHIP-пакет

В v1.0.0-rc реализовано:

1. Главная страница с публичным статусом и честными границами.
2. Mission page без медицинских обещаний.
3. Trust Fabric page с Root/Vault, Trust Center, Edge/Client.
4. Research page с maturity labels.
5. Governance page: Delaware LLC / future local envelopes / Council of Seven concept.
6. Transparency dashboard skeleton.
7. Roadmap по стадиям Phase 0–3 + Future optional.
8. Docs index.
9. Partner intake via mailto fallback with no-patient-data warning.
10. Contact page.
11. Privacy / Terms / Security pages.
12. status.json / roadmap.json / changelog.json.
13. sitemap.xml / robots.txt / _headers / CNAME.

## 6. Acceptance criteria

- Нет неподтверждённых партнёров.
- Нет медицинских обещаний.
- Нет инвестиционных оферт.
- Нет активного token/DAO/fundraising claim.
- Есть Mission, Governance, Trust Fabric, Roadmap, Privacy, Terms, Security.
- Есть contact path.
- Есть no-patient-data warning.
- Есть public status dashboard.
- Есть changelog.
- Нет broken internal links.

## 7. Следующий слой после v1.0.0-rc

- v1.0.1: углубление RU/EN контента и diagrams.
- v1.0.2: Trust Center API ping backend / GraphQL-ready status.
- v1.1.0: partner intake backend with rate limits and privacy-friendly anti-spam.
- v1.2.0: Next.js/MDX migration if required by scale.
