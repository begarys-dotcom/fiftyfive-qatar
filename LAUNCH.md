# FIFTYFIVE QATAR — запуск сайта и почты

Все внешние расходы — только после согласования с заказчиком. Аккаунты оформляются на корпоративные адреса @ffg.qa, не на личные.

## Статус

| Что | Состояние |
|---|---|
| Домен **ffg.qa** | ✅ Unitech, оплачен до 02.11.2027. ⚠️ Регистрант в WHOIS — частное лицо, переоформить на Iamfighter Sportswear Trading W.L.L. (тикет ZBS-832658) |
| DNS | ✅ Unitech DNS Manager (`ns5s1/ns5s2.unitech.qa`) |
| Почта | ✅ Google Workspace Business Starter, Flexible. SPF / DKIM / DMARC — PASS |
| Ящики | ✅ `begarys@`, `aziz@` (лицензии), `info@` — группа (бесплатно) |
| Оплата Workspace | ⏳ Пробный период до 18.11.2026 — добавить карту заказчика до этой даты |
| Хостинг сайта | ⏳ Не выбран. `A @` пока указывает на заглушку Unitech `178.18.246.73` |
| Форма | ⏳ Нужен ключ Web3Forms |

## 1. DNS-записи ffg.qa (Unitech)

| Тип | Имя | Значение |
|---|---|---|
| A | `ffg.qa.` | `178.18.246.73` — заменить на адрес хостинга |
| CNAME | `www` | `ffg.qa` |
| MX | `ffg.qa.` | `smtp.google.com` (приоритет 1) |
| TXT | `ffg.qa.` | `v=spf1 include:_spf.google.com ~all` |
| TXT | `ffg.qa.` | `google-site-verification=…` (не удалять) |
| TXT | `google._domainkey` | DKIM-ключ Google, 2048 бит |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:info@ffg.qa` |

- Только одна SPF-запись на домене. Не возвращать MX от Unitech.
- Через 2–4 недели без проблем: DMARC → `p=quarantine`.
- **Проверка почты:** письмо на внешний Gmail → «Показать оригинал» → `SPF/DKIM/DMARC: PASS`.

## 2. Хостинг — Cloudflare Pages (бесплатно, SSL автоматически)

1. Аккаунт Cloudflare на `begarys@ffg.qa` (или `aziz@`).
2. Add site → ffg.qa → Free. Cloudflare сам импортирует записи из п.1 — **сверить, что MX, SPF, DKIM, DMARC и google-site-verification перенеслись**, затем в Unitech заменить NS на выданные Cloudflare.
3. Pages → проект из репозитория (или `npx wrangler pages deploy dist`):
   - Build command: `npm run build`, output: `dist`, root: `site`
   - Переменная: `VITE_WEB3FORMS_KEY`
4. Custom domains: `ffg.qa` и `www.ffg.qa` (редирект www → apex). Старую `A`-запись Unitech удалить.

## 3. Контактная форма — Web3Forms

- Создать access key на web3forms.com, указав `info@ffg.qa` (бесплатный тариф).
- Ключ — в `VITE_WEB3FORMS_KEY` (локально `site/.env`, на хостинге — переменная окружения). В git не коммитим.
- Без ключа форма открывает почтовый клиент посетителя (mailto на info@).

## 4. Перед публикацией

- [ ] Заказчик утвердил тексты и концепт
- [ ] Настоящий логотип вместо заглушки «55» (Header, Footer, favicon, og.png)
- [ ] Фото Дохи (заказчика или лицензионный сток) — по желанию вместо векторного силуэта
- [ ] Адрес/телефон офиса — если дадут, в блок Contact
- [ ] Тестовая отправка формы приходит на info@
- [ ] Lighthouse mobile ≥ 90, проверка на реальном телефоне
- [ ] Публикация — только после «ок» заказчика

## Локальная разработка

```bash
cd site
npm install
npm run dev
```
