# AI Dev Studio - Премиум сайт-портфолио

Современный премиум сайт-портфолио команды AI Dev Studio с темной темой, неоновыми эффектами и впечатляющими анимациями.

## 🚀 Особенности

- ⚡ **Премиум дизайн** с темной темой и неоновыми акцентами
- 🎨 **Впечатляющие анимации** с использованием GSAP
- 📱 **Полностью адаптивный** mobile-first дизайн
- 🤖 **Интеграция с Telegram** для уведомлений о заявках
- 💳 **Готовность к платежным системам**
- ⚡ **Высокая производительность** (90+ PageSpeed)
- 🔍 **SEO оптимизация**
- ♿ **Доступность** (WCAG 2.1)

## 📁 Структура проекта

```
ai-dev-studio/
├── index.html              # Главная страница
├── assets/
│   ├── css/
│   │   ├── main.css        # Основные стили
│   │   ├── animations.css  # CSS анимации
│   │   └── responsive.css  # Адаптивные стили
│   ├── js/
│   │   ├── main.js         # Основной функционал
│   │   ├── animations.js   # GSAP анимации
│   │   └── form.js         # Обработка формasdasdasd
│   └── images/
│       ├── portfolio/      # Изображения портфолио
│       ├── team/           # Фото команды
│       ├── icons/          # Иконки
│       └── testimonials/   # Фото клиентов
├── components/             # Компоненты (для будущего развития)
└── README.md              # Документация
```

## 🛠 Технологии

- **HTML5** - семантическая разметка
- **CSS3** - современные стили, Grid, Flexbox
- **JavaScript ES6+** - интерактивность
- **GSAP** - профессиональные анимации
- **Intersection Observer API** - анимации при скролле
- **Telegram Bot API** - уведомления о заявках

## ⚙️ Установка и настройка

### 1. Клонирование проекта

```bash
git clone https://github.com/your-username/ai-dev-studio.git
cd ai-dev-studio
```

### 2. Настройка Telegram бота

1. Создайте бота через [@BotFather](https://t.me/BotFather):
   - Отправьте `/newbot`
   - Выберите имя и username для бота
   - Сохраните полученный токен

2. Получите Chat ID:
   - Отправьте сообщение вашему боту
   - Перейдите по ссылке: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Найдите `chat.id` в ответе

3. Обновите конфигурацию в `assets/js/form.js`:

```javascript
const TELEGRAM_CONFIG = {
    botToken: 'YOUR_BOT_TOKEN_HERE',     // Замените на токен бота
    chatId: 'YOUR_CHAT_ID_HERE',         // Замените на ваш Chat ID
    apiUrl: 'https://api.telegram.org/bot'
};
```

### 3. Настройка изображений

Добавьте изображения в соответствующие папки:

- `assets/images/team/daniel.jpg` - фото Даниэля
- `assets/images/team/nikita.jpg` - фото Никиты
- `assets/images/portfolio/project1.jpg` - project4.jpg - скриншоты проектов
- `assets/images/testimonials/client1.jpg` - client3.jpg - фото клиентов

### 4. Настройка аналитики (опционально)

Добавьте код Google Analytics или Яндекс.Метрики в `<head>` секцию `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- Яндекс.Метрика -->
<script type="text/javascript">
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(COUNTER_ID, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
```

## 🚀 Запуск

Сайт можно запустить несколькими способами:

### Локальный сервер (рекомендуется)

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (если установлен serve)
npx serve .

# PHP
php -S localhost:8000
```

Откройте http://localhost:8000 в браузере.

### Live Server (VS Code)

1. Установите расширение "Live Server" в VS Code
2. Откройте проект в VS Code
3. Нажмите правой кнопкой на `index.html`
4. Выберите "Open with Live Server"

## 🎨 Кастомизация

### Цвета

Основные цвета определены в CSS переменных в `assets/css/main.css`:

```css
:root {
    --accent-primary: #00d4ff;      /* Основной акцент */
    --accent-secondary: #8b5cf6;    /* Вторичный акцент */
    --text-primary: #ffffff;        /* Основной текст */
    --text-secondary: #a0a0a0;      /* Вторичный текст */
    --bg-primary: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    --bg-secondary: #1a1a1a;
}
```

### Контент

Основной контент находится в `index.html`. Обновите:

- Информацию о команде в секции "About"
- Цены в секции "Services"
- Проекты в секции "Portfolio"
- Контактную информацию в секции "Contact"

### Анимации

Настройки анимаций в `assets/js/animations.js`:

```javascript
// Скорость анимаций
const ANIMATION_SPEED = {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2
};

// Отключение анимаций на слабых устройствах
if (navigator.hardwareConcurrency < 4) {
    gsap.globalTimeline.timeScale(1.5);
}
```

## 📊 Аналитика и отслеживание

### Отслеживаемые события

- Отправка формы
- Клики по телефону
- Клики по Telegram
- Клики по email
- Переходы между секциями
- Фильтрация портфолио

### Конверсионная воронка

1. Просмотр страницы
2. Скролл до секции услуг
3. Просмотр портфолио
4. Заполнение формы
5. Отправка заявки

## 🔧 Интеграции

### Платежные системы

Для интеграции платежных систем добавьте обработчики в `assets/js/form.js`:

```javascript
// Пример интеграции с ЮKassa
async function processPayment(amount, description) {
    const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, description })
    });
    
    const { paymentUrl } = await response.json();
    window.location.href = paymentUrl;
}
```

### CRM системы

Интеграция с CRM (amoCRM, Bitrix24):

```javascript
async function sendToCRM(leadData) {
    await fetch('/api/crm/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
    });
}
```

## 📱 Адаптивность

Сайт адаптирован для всех устройств:

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1199px
- **Large Desktop**: 1200px+
- **4K**: 1600px+

### Тестирование адаптивности

```bash
# Используйте инструменты разработчика браузера
# Или онлайн сервисы:
# - BrowserStack
# - CrossBrowserTesting
# - ResponsiveDesignChecker
```

## ⚡ Производительность

### Оптимизация изображений

```bash
# Сжатие изображений (требует установки)
npm install -g imagemin-cli
imagemin assets/images/* --out-dir=assets/images/optimized

# Или используйте онлайн сервисы:
# - TinyPNG
# - Squoosh
# - ImageOptim
```

### Минификация

```bash
# CSS минификация
npm install -g clean-css-cli
cleancss -o assets/css/main.min.css assets/css/main.css

# JS минификация
npm install -g terser
terser assets/js/main.js -o assets/js/main.min.js
```

## 🐛 Отладка

### Типичные проблемы

1. **Анимации не работают**
   - Проверьте подключение GSAP
   - Убедитесь, что JavaScript включен

2. **Форма не отправляется**
   - Проверьте настройки Telegram бота
   - Откройте консоль браузера для ошибок

3. **Медленная загрузка**
   - Оптимизируйте изображения
   - Включите сжатие на сервере

### Логирование

```javascript
// Включение debug режима
localStorage.setItem('debug', 'true');

// Отслеживание ошибок
window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
    // Отправка ошибки в систему мониторинга
});
```

## 🔐 Безопасность

- ✅ HTTPS обязателен для продакшена
- ✅ CSP заголовки настроены
- ✅ Валидация данных на клиенте и сервере
- ✅ Защита от XSS и CSRF
- ✅ Ограничение частоты запросов

## 📈 SEO

### Meta теги

Основные meta теги уже настроены в `index.html`:

```html
<title>AI Dev Studio - Создаем сайты за 4 часа с ИИ</title>
<meta name="description" content="Команда профессионалов создает премиум сайты за 4 часа">
<meta name="keywords" content="создание сайтов, веб-разработка, AI">
```

### Структурированные данные

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AI Dev Studio",
  "url": "https://aidevstudio.ru",
  "logo": "https://aidevstudio.ru/logo.png"
}
</script>
```

## 🚀 Деплой

### Netlify

1. Подключите GitHub репозиторий
2. Настройте автодеплой
3. Добавьте переменные окружения

### Vercel

```bash
npm install -g vercel
vercel --prod
```

### GitHub Pages

1. Настройте GitHub Actions
2. Опубликуйте в ветку `gh-pages`

## 📞 Поддержка

При возникновении вопросов обращайтесь:

- **Email**: tddanieltg@gmail.com
- **Telegram**: [@TDDan](https://t.me/TDDan)
- **Телефон**: +996 500 44 1234

## 📄 Лицензия

Проект разработан для AI Dev Studio. Все права защищены.

---

**Создано с ❤️ командой AI Dev Studio** #   p o r t f o l i o 
 
 