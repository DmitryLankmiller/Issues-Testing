## VK Tech testing

Для запуска запустите в консоли следующие команды из папки с проектом:
npm install
npm install -g npx (Если у Вас не установлен npx)
npx playwright test
allure generate allure-results -o allure-report --clean (Необходимо установить allure)
allure open allure-report
