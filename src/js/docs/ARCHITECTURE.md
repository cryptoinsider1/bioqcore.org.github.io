# BioQCore · System Architecture (Draft · Phase 0)

## 1. High-Level View

- **Public Web Layer**  
  Static site on GitHub Pages (`bioqcore.org`), описывает миссию, архитектуру и дорожную карту.
- **Client Layer**  
  iOS-приложение (BioQCore App), web-клиенты, исследовательские интерфейсы.
- **Trust Center Layer**  
  BioQCore Trust Center: Post-Quantum-ready PKI, DID-реестр, GraphQL / REST API.
- **Vault & Root Layer**  
  Root CA и мастер-артефакты на Raspberry Pi + зашифрованный SSD.
- **Edge Layer**  
  MikroTik BR5009 как точка входа, VPN endpoint, TLS-терминал и reverse proxy.

## 2. PKI & Trust Fabric (simplified)

- Root CA (offline, Raspberry Vault)
- Intermediate CA (online, защищённый сервер)
- Issuing CA / Trust Center API
- Edge-узел (MikroTik)
- Клиенты (iOS, web, сервисы консорциумов)

## 3. Current Phase (Phase 0)

- ✅ Static web site (this repository)
- ✅ Conceptual design of Trust Fabric
- 🧪 Lab experiments with PKI (Root CA, Intermediate CA)
- 🧪 Early orchestration for iOS agent / GraphQL
- ⏳ Future: production-grade Trust Center deployment

## 4. Next Steps

1. Определить минимальный стек для Trust Center (язык, фреймворк, GraphQL-схема).
2. Завершить лабораторную PKI (Root CA на Raspberry, Intermediate CA online).
3. Интегрировать MikroTik как Edge-узел с сертификатом от Intermediate CA.
4. Подготовить Next.js-версию фронтенда, используя текущий сайт как контентную основу.
