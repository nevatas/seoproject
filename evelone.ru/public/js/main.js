// Основной JavaScript файл
document.addEventListener('DOMContentLoaded', function() {
    // Здесь можно добавить дополнительную логику
    console.log('Страница загружена');
    
    // Проверяем ширину экрана и применяем десктопные изменения
    function handleDesktopLayout() {
        const isDesktop = window.innerWidth >= 1024;
        const promoSection = document.getElementById('promo');
        const newsSection = document.getElementById('features');
        const heroContainer = document.querySelector('.container.mx-auto.px-4.text-center.relative.z-10');
        const characterContainer = document.querySelector('.mb-0.md\\:mb-10.flex.justify-center.-mt-8');
        const socialBannerContainer = document.querySelector('.flex.flex-col.justify-center.gap-4.-mt-\\[80px\\].md\\:mt-0.relative.z-30');
        
        // Обработка hero секции для десктопа
        if (isDesktop && heroContainer) {
            // Добавляем класс для десктопного макета
            heroContainer.classList.add('hero-container');
            
            // Создаем контейнер для основного контента, если его еще нет
            let heroContent = heroContainer.querySelector('.hero-content');
            if (!heroContent) {
                // Получаем логотип
                const logoContainer = heroContainer.querySelector('.flex.justify-center');
                if (logoContainer) {
                    logoContainer.classList.add('logo-container');
                    const logoImage = logoContainer.querySelector('img');
                    if (logoImage) {
                        logoImage.classList.add('logo-image');
                    }
                }
                
                // Создаем контейнер для основного контента
                heroContent = document.createElement('div');
                heroContent.className = 'hero-content';
                
                // Перемещаем персонажа и соцсети в новый контейнер
                if (characterContainer && socialBannerContainer) {
                    // Клонируем элементы
                    const characterClone = characterContainer.cloneNode(true);
                    const socialBannerClone = socialBannerContainer.cloneNode(true);
                    
                    // Добавляем классы
                    characterClone.classList.add('character-container');
                    socialBannerClone.classList.add('social-banner-container');
                    
                    // Добавляем в контейнер
                    heroContent.appendChild(characterClone);
                    heroContent.appendChild(socialBannerClone);
                    
                    // Скрываем оригинальные элементы
                    characterContainer.style.display = 'none';
                    socialBannerContainer.style.display = 'none';
                    
                    // Вставляем новый контейнер после логотипа
                    if (logoContainer) {
                        logoContainer.after(heroContent);
                    } else {
                        heroContainer.appendChild(heroContent);
                    }
                }
            }
        } else if (heroContainer) {
            // Удаляем классы для десктопного макета
            heroContainer.classList.remove('hero-container');
            
            // Удаляем контейнер для основного контента
            const heroContent = heroContainer.querySelector('.hero-content');
            if (heroContent) {
                heroContent.remove();
            }
            
            // Показываем оригинальные элементы
            if (characterContainer) {
                characterContainer.style.display = 'flex';
                characterContainer.classList.remove('character-container');
            }
            
            if (socialBannerContainer) {
                socialBannerContainer.style.display = 'flex';
                socialBannerContainer.classList.remove('social-banner-container');
            }
            
            // Удаляем классы у логотипа
            const logoContainer = heroContainer.querySelector('.logo-container');
            if (logoContainer) {
                logoContainer.classList.remove('logo-container');
                const logoImage = logoContainer.querySelector('.logo-image');
                if (logoImage) {
                    logoImage.classList.remove('logo-image');
                }
            }
        }
        
        // Обработка двухколоночного макета для новостей и промокодов
        if (isDesktop) {
            // Изменяем расположение секций на десктопе
            if (promoSection && newsSection) {
                // Создаем контейнер для двухколоночного макета
                let desktopContainer = document.getElementById('desktop-container');
                
                if (!desktopContainer) {
                    desktopContainer = document.createElement('div');
                    desktopContainer.id = 'desktop-container';
                    desktopContainer.className = 'container mx-auto px-4 flex gap-6';
                    
                    // Перемещаем секции в контейнер
                    const promoContent = promoSection.querySelector('.container');
                    const newsContent = newsSection.querySelector('.container');
                    
                    if (promoContent && newsContent) {
                        const promoCol = document.createElement('div');
                        promoCol.className = 'promo-column';
                        promoCol.appendChild(promoContent.cloneNode(true));
                        
                        const newsCol = document.createElement('div');
                        newsCol.className = 'news-column';
                        newsCol.appendChild(newsContent.cloneNode(true));
                        
                        desktopContainer.appendChild(newsCol);
                        desktopContainer.appendChild(promoCol);
                        
                        // Скрываем оригинальные секции
                        promoSection.style.display = 'none';
                        newsSection.style.display = 'none';
                        
                        // Вставляем новый контейнер после секции новостей
                        newsSection.parentNode.insertBefore(desktopContainer, newsSection.nextSibling);
                    }
                }
            }
        } else {
            // Возвращаем мобильный вид
            const desktopContainer = document.getElementById('desktop-container');
            if (desktopContainer) {
                desktopContainer.remove();
                if (promoSection) promoSection.style.display = 'block';
                if (newsSection) newsSection.style.display = 'block';
            }
        }
    }
    
    // Вызываем функцию при загрузке и изменении размера окна
    handleDesktopLayout();
    window.addEventListener('resize', handleDesktopLayout);
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