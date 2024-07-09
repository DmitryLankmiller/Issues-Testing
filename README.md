## VK Tech testing

Для запуска выполните в директории проекта следующие команды:
<ul>
  <li><code>npm install</code>code></li>
  <li><code>npm install -g npx</code> (Если у Вас не установлен npx)</li>
  <li><code>npx playwright test</code></li>
  <li><code>allure generate allure-results -o allure-report --clean</code> (Необходимо установить allure)</li>
  <li><code>allure open allure-report</code></li>
</ul>
