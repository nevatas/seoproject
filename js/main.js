// Основной JavaScript файл
document.addEventListener('DOMContentLoaded', function() {
    // Здесь можно добавить дополнительную логику
    console.log('Страница загружена');
});

// Общая функция для копирования промокода
function copyPromoCodeGeneric(promoTextId) {
    const promoText = document.getElementById(promoTextId);
    const originalText = promoText.textContent;
    
    // Копируем текст в буфер обмена
    navigator.clipboard.writeText(originalText)
        .then(() => {
            // Меняем текст на "СКОПИРОВАНО"
            promoText.textContent = "СКОПИРОВАНО";
            promoText.classList.add('text-green-600'); // Добавляем зеленый цвет для визуального эффекта
            
            // Через 1.5 секунды возвращаем исходный текст
            setTimeout(() => {
                promoText.textContent = originalText;
                promoText.classList.remove('text-green-600');
            }, 1500);
        })
        .catch(err => {
            console.error('Не удалось скопировать текст: ', err);
        });
}

// Функция для копирования промокода Parimatch
function copyPromoCode() {
    copyPromoCodeGeneric('promo-text');
}

// Функция для копирования промокода 1win
function copyPromoCode1win() {
    copyPromoCodeGeneric('promo-text-1win');
}

// Функция для копирования промокода Winline
function copyPromoCodeWinline() {
    copyPromoCodeGeneric('promo-text-winline');
}

// Функция для копирования промокода Fonbet
function copyPromoCodeFonbet() {
    copyPromoCodeGeneric('promo-text-fonbet');
}

// Функция для копирования промокода и перенаправления на сайт
function copyPromoCodeAndRedirect(event, url, promoTextId = 'promo-text') {
    // Предотвращаем стандартное поведение ссылки
    event.preventDefault();
    
    // Копируем промокод
    const promoText = document.getElementById(promoTextId);
    const originalText = promoText.textContent;
    
    navigator.clipboard.writeText(originalText)
        .then(() => {
            // Показываем кратковременное уведомление о копировании
            const button = event.currentTarget;
            const originalButtonText = button.textContent.trim();
            
            // Меняем текст кнопки
            button.textContent = "ПРОМОКОД СКОПИРОВАН";
            
            // Через короткое время перенаправляем на сайт
            setTimeout(() => {
                window.location.href = url;
            }, 800);
        })
        .catch(err => {
            console.error('Не удалось скопировать текст: ', err);
            // В случае ошибки всё равно перенаправляем на сайт
            window.location.href = url;
        });
} 