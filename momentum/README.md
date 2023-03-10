# Momentum*

🔗 https://marerma-momentum.netlify.app/

**Momentum** - аналог [одноимённого приложения](https://chrome.google.com/webstore/detail/momentum/laookkfknpbbblfpciffpaejjkokdgca?hl=ru) интернет-магазина Chrome. Приложение показывает время и имя пользователя. Фоновое изображение и приветствие меняются в зависимости от времени суток.  
В приложении есть часы, слайдер изображений, виджеты погоды, аудиоплеер, блок цитата дня, настройки. Для хранения имени пользователя и населённого пункта используется локальное хранилище - local storage.

## Функционал приложения
1. ⏰ Часы и календарь
   - время выводится в 24-часовом формате, например: `21:01:00`  
   - выводится день недели, число, месяц, например: "Воскресенье, 16 мая" / "Sunday, May 16" / "Нядзеля, 16 траўня"
   Язык и формат вывода даты определяется языком приложения.
   - при изменении дня недели, даты, месяца эти данные меняются в приложении

2. ✋ Приветствие
   - текст приветствия меняется в зависимости от времени суток (утро, день, вечер, ночь)
   - пользователь может ввести своё имя. При перезагрузке страницы приложения имя пользователя сохраняется, данные о  нём хранятся в local storage

3. 🌄 Смена фонового изображения  
   При загрузке или перезагрузке приложения фоновое изображение выбирается из расположенной на GitHub, Unsplash API или Flickr API.
   - изображения можно перелистывать кликами по стрелкам, расположенным по бокам экрана. 
   
4. ☔ Виджет погоды
   - город по умолчанию - Минск, пока пользователь не ввёл другой город
   - при перезагрузке страницы приложения указанный пользователем город сохраняется, данные о  нём хранятся в local storage
   - для указанного пользователем населённого пункта выводятся данные о погоде, если их возвращает API
   - данные о погоде включают в себя: иконку погоды, описание погоды, температуру в `°C`, скорость ветра в `м/с`, относительную влажность воздуха в `%`. Числовые параметры погоды округляются до целых чисел
   - выводится уведомление об ошибке при вводе некорректных значений, для которых API не возвращает погоду (пустая строка или бессмысленный набор символов)
5. 📰 Виджет цитата дня
   - при загрузке страницы приложения отображается рандомная цитата и её автор  
   
6. 📻 Кастомный аудиоплеер с элементами управления, прогресс-баром, регулятором громкости
   
7. 🌎 Перевод приложения на два языка (en/ru) 

8. 💻 Настройки приложения  
   - в настройках приложения можно указать язык приложения (en/ru)
   - в настройках приложения можно указать источник получения фото для фонового изображения: коллекция изображений GitHub, Unsplash API, Flickr API
   - в настройках приложения можно скрыть/отобразить любой из виджетов, которые находятся на странице
   - настройки приложения сохраняются при перезагрузке страницы
9. 📋 ToDo List - список дел

<hr>

\* *Учебный проект*