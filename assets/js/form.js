/* AI Dev Studio - Form Handling & Telegram Integration */

// Telegram Bot Configuration
const TELEGRAM_CONFIG = {
    botToken: '7846802203:AAHEeVOpAJm5I_A7dBP-eLcxAwZ_m-iZ_s8', // Replace with actual bot token
    chatId: '-1002758173508', // Replace with actual chat ID
    apiUrl: 'https://api.telegram.org/bot'
};

// Form Validation Rules
const VALIDATION_RULES = {
    name: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-Zа-яА-Я\s]+$/,
        message: 'Имя должно содержать только буквы и быть не менее 2 символов'
    },
    phone: {
        required: true,
        pattern: /^[\+]?[0-9\(\)\-\s]+$/,
        minLength: 10,
        message: 'Введите корректный номер телефона'
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Введите корректный email адрес'
    },
    service: {
        required: true,
        message: 'Выберите услугу'
    },
    agreement: {
        required: true,
        message: 'Необходимо согласие на обработку данных'
    }
};

// Service prices for payment integration
const SERVICE_PRICES = {
    'express': 21000,
    'standard': 42000,
    'premium': 65000,
    'ecommerce': 85000,
    'consultation': 0
};

// Initialize form handling
function initAdvancedFormHandling() {
    const forms = document.querySelectorAll('.contact__form');
    
    forms.forEach(form => {
        setupFormValidation(form);
        setupFormSubmission(form);
        setupFormEnhancements(form);
    });
    
    // Setup quick contact buttons
    setupQuickContacts();
    
    console.log('Advanced form handling initialized');
}

// Form Validation Setup
function setupFormValidation(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
        
        // Enhanced UX
        input.addEventListener('focus', () => {
            clearFieldError(input);
            addFieldFocus(input);
        });
        
        input.addEventListener('blur', () => {
            removeFieldFocus(input);
        });
    });
    
    // Form submission validation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm(form)) {
            handleFormSubmission(form);
        } else {
            showFormErrors(form);
        }
    });
}

// Field Validation
function validateField(field) {
    const name = field.name;
    const value = field.value.trim();
    const rules = VALIDATION_RULES[name];
    
    if (!rules) return true;
    
    // Clear previous errors
    clearFieldError(field);
    
    // Required validation
    if (rules.required && !value) {
        showFieldError(field, rules.message || 'Это поле обязательно');
        return false;
    }
    
    // Skip other validations if field is empty and not required
    if (!value && !rules.required) return true;
    
    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
        showFieldError(field, rules.message);
        return false;
    }
    
    // Length validation
    if (rules.minLength && value.length < rules.minLength) {
        showFieldError(field, rules.message);
        return false;
    }
    
    // Checkbox validation
    if (field.type === 'checkbox' && rules.required && !field.checked) {
        showFieldError(field, rules.message);
        return false;
    }
    
    // Field is valid
    showFieldSuccess(field);
    return true;
}

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Show Field Error
function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    const errorElement = getOrCreateErrorElement(formGroup);
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    formGroup.classList.add('form-group--error');
    field.style.borderColor = '#ff4444';
    
    // Add shake animation
    field.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        field.style.animation = '';
    }, 500);
}

// Show Field Success
function showFieldSuccess(field) {
    const formGroup = field.closest('.form-group');
    
    formGroup.classList.remove('form-group--error');
    formGroup.classList.add('form-group--success');
    field.style.borderColor = '#00d4ff';
    
    // Add success icon
    const successIcon = getOrCreateSuccessIcon(formGroup);
    successIcon.style.display = 'block';
}

// Clear Field Error
function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.field-error');
    const successIcon = formGroup.querySelector('.field-success');
    
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    
    if (successIcon) {
        successIcon.style.display = 'none';
    }
    
    formGroup.classList.remove('form-group--error', 'form-group--success');
    field.style.borderColor = '';
}

// Add Field Focus Effect
function addFieldFocus(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('form-group--focused');
    
    // Add glow effect
    field.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
}

// Remove Field Focus Effect
function removeFieldFocus(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('form-group--focused');
    
    if (!formGroup.classList.contains('form-group--error')) {
        field.style.boxShadow = '';
    }
}

// Get or Create Error Element
function getOrCreateErrorElement(formGroup) {
    let errorElement = formGroup.querySelector('.field-error');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #ff4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: none;
            animation: fadeIn 0.3s ease;
        `;
        formGroup.appendChild(errorElement);
    }
    
    return errorElement;
}

// Get or Create Success Icon
function getOrCreateSuccessIcon(formGroup) {
    let successIcon = formGroup.querySelector('.field-success');
    
    if (!successIcon) {
        successIcon = document.createElement('div');
        successIcon.className = 'field-success';
        successIcon.innerHTML = '✓';
        successIcon.style.cssText = `
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #00d4ff;
            font-weight: bold;
            display: none;
            animation: bounceIn 0.5s ease;
        `;
        
        const inputContainer = formGroup.querySelector('input, select, textarea').parentNode;
        inputContainer.style.position = 'relative';
        inputContainer.appendChild(successIcon);
    }
    
    return successIcon;
}

// Form Submission Handler
async function handleFormSubmission(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    setButtonLoading(submitButton, true);
    
    try {
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Prepare message for Telegram
        const message = formatTelegramMessage(data);
        
        // Send to Telegram
        await sendToTelegram(message);
        
        // Show success
        showFormSuccess(form);
        
        // Reset form
        setTimeout(() => {
            form.reset();
            clearAllFieldStates(form);
        }, 2000);
        
        // Track conversion
        trackConversion(data);
        
    } catch (error) {
        console.error('Form submission error:', error);
        showFormError('Произошла ошибка при отправке. Попробуйте снова или свяжитесь с нами напрямую.');
    } finally {
        setButtonLoading(submitButton, false, originalText);
    }
}

// Set Button Loading State
function setButtonLoading(button, isLoading, originalText = null) {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = `
            <span style="display: flex; align-items: center; gap: 0.5rem;">
                <div class="spinner"></div>
                Отправка...
            </span>
        `;
    } else {
        button.disabled = false;
        button.innerHTML = originalText || button.innerHTML;
    }
}

// Format Telegram Message
function formatTelegramMessage(data) {
    const servicePrice = SERVICE_PRICES[data.service] || 0;
    const serviceName = getServiceName(data.service);
    
    return `
🚀 *Новая заявка с сайта AI Dev Studio*

👤 *Клиент:* ${data.name}
📞 *Телефон:* ${data.phone}
📧 *Email:* ${data.email}

💼 *Услуга:* ${serviceName}
💰 *Стоимость:* ${servicePrice ? servicePrice.toLocaleString() + '₽' : 'Бесплатно'}

📝 *Описание проекта:*
${data.message || 'Не указано'}

⏰ *Время заявки:* ${new Date().toLocaleString('ru-RU')}

---
Ответить клиенту в течение 15 минут! ⚡
    `.trim();
}

// Get Service Name
function getServiceName(serviceKey) {
    const serviceNames = {
        'express': 'Экспресс (4 часа) - 21,000₽',
        'standard': 'Стандарт (8 часов) - 42,000₽',
        'premium': 'Премиум (12 часов) - 65,000₽',
        'ecommerce': 'Интернет-магазин - от 85,000₽',
        'consultation': 'Бесплатная консультация'
    };
    
    return serviceNames[serviceKey] || serviceKey;
}

// Send to Telegram
async function sendToTelegram(message) {
    // In production, this should be handled by your backend
    // This is a mock implementation
    
    const url = `${TELEGRAM_CONFIG.apiUrl}${TELEGRAM_CONFIG.botToken}/sendMessage`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: TELEGRAM_CONFIG.chatId,
            text: message,
            parse_mode: 'Markdown'
        })
    });
    
    if (!response.ok) {
        throw new Error('Failed to send message to Telegram');
    }
    
    return response.json();
}

// Mock Telegram Send (for development)
async function mockTelegramSend(message) {
    console.log('📱 Telegram Message:', message);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate random success/failure
    if (Math.random() > 0.1) {
        return { ok: true, result: { message_id: Date.now() } };
    } else {
        throw new Error('Mock API error');
    }
}

// Show Form Success
function showFormSuccess(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success-message';
    successMessage.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✓</div>
            <div class="success-text">
                <h4>Заявка отправлена!</h4>
                <p>Мы свяжемся с вами в течение 15 минут</p>
            </div>
        </div>
    `;
    
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #00d4ff, #8b5cf6);
        color: white;
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0, 212, 255, 0.3);
        z-index: 10000;
        text-align: center;
        animation: successPopup 0.5s ease-out;
    `;
    
    document.body.appendChild(successMessage);
    
    // Auto remove
    setTimeout(() => {
        successMessage.style.animation = 'successPopout 0.3s ease-in forwards';
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.parentNode.removeChild(successMessage);
            }
        }, 300);
    }, 3000);
}

// Show Form Error
function showFormError(message) {
    const errorNotification = document.createElement('div');
    errorNotification.className = 'form-error-notification';
    errorNotification.innerHTML = `
        <div class="error-content">
            <span class="error-icon">⚠</span>
            <span class="error-text">${message}</span>
            <button class="error-close" onclick="this.parentNode.parentNode.remove()">×</button>
        </div>
    `;
    
    errorNotification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4444;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(255, 68, 68, 0.3);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(errorNotification);
    
    // Auto remove
    setTimeout(() => {
        if (errorNotification.parentNode) {
            errorNotification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => {
                if (errorNotification.parentNode) {
                    errorNotification.parentNode.removeChild(errorNotification);
                }
            }, 300);
        }
    }, 5000);
}

// Clear All Field States
function clearAllFieldStates(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        clearFieldError(input);
        removeFieldFocus(input);
    });
}

// Setup Quick Contacts
function setupQuickContacts() {
    // Phone click tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('phone_click', { phone: link.href.replace('tel:', '') });
        });
    });
    
    // Telegram click tracking
    const telegramLinks = document.querySelectorAll('a[href*="t.me"], a[href*="telegram"]');
    telegramLinks.forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('telegram_click', { url: link.href });
        });
    });
    
    // Email click tracking
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('email_click', { email: link.href.replace('mailto:', '') });
        });
    });
}

// Setup Form Enhancements
function setupFormEnhancements(form) {
    // Service selection with price update
    const serviceSelect = form.querySelector('select[name="service"]');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', (e) => {
            updateServicePrice(e.target.value);
            updateSubmitButton(e.target.value);
        });
    }
    
    // Phone input formatting
    const phoneInput = form.querySelector('input[name="phone"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneInput);
    }
    
    // Auto-save form data
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => saveFormData(form));
    });
    
    // Restore saved form data
    restoreFormData(form);
}

// Update Service Price Display
function updateServicePrice(serviceKey) {
    const price = SERVICE_PRICES[serviceKey];
    const priceDisplay = document.querySelector('.service-price-display');
    
    if (priceDisplay && price) {
        priceDisplay.textContent = `Стоимость: ${price.toLocaleString()}₽`;
        priceDisplay.style.display = 'block';
    }
}

// Update Submit Button
function updateSubmitButton(serviceKey) {
    const submitButton = document.querySelector('button[type="submit"]');
    const price = SERVICE_PRICES[serviceKey];
    
    if (submitButton && price && serviceKey !== 'consultation') {
        submitButton.innerHTML = `
            <span>Заказать за ${price.toLocaleString()}₽</span>
            <div class="btn__glow"></div>
        `;
    } else {
        submitButton.innerHTML = `
            <span>Получить консультацию</span>
            <div class="btn__glow"></div>
        `;
    }
}

// Format Phone Input
function formatPhoneInput(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.startsWith('8')) {
        value = '7' + value.slice(1);
    }
    
    if (value.startsWith('7')) {
        value = '+7' + value.slice(1);
    }
    
    // Format: +7 (XXX) XXX-XX-XX
    if (value.startsWith('+7')) {
        value = value.replace(/(\+7)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
    }
    
    e.target.value = value.slice(0, 18); // Limit length
}

// Save Form Data
function saveFormData(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    localStorage.setItem('aidevstudio_form_data', JSON.stringify(data));
}

// Restore Form Data
function restoreFormData(form) {
    try {
        const savedData = localStorage.getItem('aidevstudio_form_data');
        if (savedData) {
            const data = JSON.parse(savedData);
            
            Object.entries(data).forEach(([name, value]) => {
                const field = form.querySelector(`[name="${name}"]`);
                if (field && field.type !== 'checkbox') {
                    field.value = value;
                }
            });
        }
    } catch (error) {
        console.warn('Failed to restore form data:', error);
    }
}

// Track Conversion
function trackConversion(data) {
    // Google Analytics / Yandex Metrica integration
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            event_category: 'engagement',
            event_label: data.service,
            value: SERVICE_PRICES[data.service] || 0
        });
    }
    
    // Custom tracking
    trackEvent('form_conversion', {
        service: data.service,
        price: SERVICE_PRICES[data.service] || 0,
        lead_source: 'website'
    });
}

// Generic Event Tracking
function trackEvent(eventName, properties = {}) {
    console.log('📊 Event:', eventName, properties);
    
    // Here you can integrate with your analytics service
    // Example: Mixpanel, Amplitude, custom analytics
}

// Add CSS animations
const formStyles = document.createElement('style');
formStyles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes bounceIn {
        0% { transform: translateY(-50%) scale(0); }
        50% { transform: translateY(-50%) scale(1.2); }
        100% { transform: translateY(-50%) scale(1); }
    }
    
    @keyframes successPopup {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    
    @keyframes successPopout {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .form-group--focused label {
        color: #00d4ff;
        transform: translateY(-2px);
        transition: all 0.3s ease;
    }
    
    .form-group--error input,
    .form-group--error select,
    .form-group--error textarea {
        border-color: #ff4444 !important;
        box-shadow: 0 0 10px rgba(255, 68, 68, 0.3) !important;
    }
    
    .form-group--success input,
    .form-group--success select,
    .form-group--success textarea {
        border-color: #00d4ff !important;
        box-shadow: 0 0 10px rgba(0, 212, 255, 0.3) !important;
    }
    
    .success-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .success-icon {
        width: 50px;
        height: 50px;
        background: rgba(255,255,255,0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
    }
    
    .error-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .error-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
`;
document.head.appendChild(formStyles);

// Custom Select Implementation
function createCustomSelect() {
    const selectElement = document.getElementById('service');
    if (!selectElement) return;

    // Создаем контейнер для кастомного select
    const customSelectContainer = document.createElement('div');
    customSelectContainer.className = 'custom-select-container';
    
    // Создаем кнопку для отображения выбранного значения
    const customSelectButton = document.createElement('div');
    customSelectButton.className = 'custom-select-button';
    customSelectButton.innerHTML = '<span>Выберите услугу</span><div class="custom-select-arrow"></div>';
    
    // Создаем выпадающий список
    const customSelectDropdown = document.createElement('div');
    customSelectDropdown.className = 'custom-select-dropdown';
    
    // Заполняем выпадающий список опциями
    Array.from(selectElement.options).forEach((option, index) => {
        if (index === 0) return; // Пропускаем placeholder
        
        const dropdownItem = document.createElement('div');
        dropdownItem.className = 'custom-select-item';
        dropdownItem.textContent = option.textContent;
        dropdownItem.dataset.value = option.value;
        
        dropdownItem.addEventListener('click', () => {
            // Обновляем выбранное значение
            customSelectButton.querySelector('span').textContent = option.textContent;
            selectElement.value = option.value;
            
            // Скрываем dropdown
            customSelectDropdown.classList.remove('open');
            customSelectContainer.classList.remove('open');
            
            // Убираем активный класс со всех элементов
            document.querySelectorAll('.custom-select-item').forEach(item => {
                item.classList.remove('selected');
            });
            
            // Добавляем активный класс к выбранному элементу  
            dropdownItem.classList.add('selected');
        });
        
        customSelectDropdown.appendChild(dropdownItem);
    });
    
    // Обработчик клика по кнопке
    customSelectButton.addEventListener('click', () => {
        const isOpen = customSelectContainer.classList.contains('open');
        
        // Закрываем все другие открытые dropdown
        document.querySelectorAll('.custom-select-container').forEach(container => {
            container.classList.remove('open');
            container.querySelector('.custom-select-dropdown').classList.remove('open');
        });
        
        if (!isOpen) {
            customSelectContainer.classList.add('open');
            customSelectDropdown.classList.add('open');
        }
    });
    
    // Закрытие при клике вне элемента
    document.addEventListener('click', (e) => {
        if (!customSelectContainer.contains(e.target)) {
            customSelectContainer.classList.remove('open');
            customSelectDropdown.classList.remove('open');
        }
    });
    
    // Собираем компонент
    customSelectContainer.appendChild(customSelectButton);
    customSelectContainer.appendChild(customSelectDropdown);
    
    // Заменяем оригинальный select
    selectElement.style.display = 'none';
    selectElement.parentNode.appendChild(customSelectContainer);
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', createCustomSelect);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdvancedFormHandling);
} else {
    initAdvancedFormHandling();
} 