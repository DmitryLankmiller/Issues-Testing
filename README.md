## VK Tech testing

Для запуска запустите в консоли следующие команды из папки с проектом:
<ul>
  <li><code>npm install</code>code></li>
  <li>npm install -g npx (Если у Вас не установлен npx)</li>
  <li><code>npx playwright test</code></li>
  <li><code>allure generate allure-results -o allure-report --clean</code> (Необходимо установить allure)</li>
  <li><code>allure open allure-report</code></li>
</ul>
