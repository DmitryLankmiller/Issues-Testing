## VK Tech testing

<p>В файле <code>utils.ts</code> необходимо записать логин и пароль тестового пользователя</p>
<p>В файле <code>issues.test.ts</code> необходимо ввести имя владельца репозитория (<code>REPO-OWNER-NAME</code>) и название репозитория (<code>REPO-NAME</code>)</p>
<p>Для запуска выполните в директории проекта следующие команды:</p>
<ul>
  <li><code>npm install</code></li>
  <li><code>npm install -g npx</code> (Если у Вас не установлен npx)</li>
  <li><code>npx playwright test</code></li>
  <li><code>allure generate allure-results -o allure-report --clean</code> (Необходимо установить allure)</li>
  <li><code>allure open allure-report</code></li>
</ul>
