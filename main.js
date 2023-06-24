const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let tasks = [];

function clearTasks() {
  tasks = [];
}

function loadTasks() {
  try {
    const data = fs.readFileSync('tasks.json', 'utf8');
    tasks = JSON.parse(data);
  } catch (error) {
    tasks = [];
  }
}

function saveTasks() {
  const data = JSON.stringify(tasks, null, 2);
  fs.writeFileSync('tasks.json', data, 'utf8');
}

function showIncompleteTasks() {
  const incompleteTasks = tasks.filter((task) => !task.done);
  if (incompleteTasks.length === 0) {
    console.log('Немає невиконаних завдань.');
  } else {
    console.log('Невиконані завдання:');
    incompleteTasks.forEach((task) => {
      console.log(`- ${task.title} (Дедлайн: ${task.deadline})`);
    });
  }
  mainMenu();
}

function showAllTasks() {
  if (tasks.length === 0) {
    console.log('Список завдань порожній.');
  } else {
    console.log('Усі завдання:');
    tasks.forEach((task) => {
      const status = task.done ? 'виконане' : 'не виконане';
      console.log(`- ${task.title} (Статус: ${status}, Дедлайн: ${task.deadline})`);
    });
  }
  mainMenu();
}

function markTaskAsDone() {
  rl.question('Введіть індекс завдання, яке ви хочете позначити як виконане: ', (index) => {
    const task = tasks[index];
    if (task) {
      task.done = true;
      saveTasks();
      console.log(`Завдання "${task.title}" позначено як виконане.`);
    } else {
      console.log('Недійсний індекс завдання.');
    }
    mainMenu();
  });
}

function editTask() {
  rl.question('Введіть індекс завдання, яке ви хочете відредагувати: ', (index) => {
    const task = tasks[index];
    if (task) {
      rl.question('Введіть новий заголовок завдання: ', (title) => {
        rl.question('Введіть новий опис завдання: ', (description) => {
          rl.question('Введіть новий дедлайн завдання: ', (deadline) => {
            task.title = title;
            task.description = description;
            task.deadline = deadline;
            saveTasks();
            console.log('Завдання відредаговано.');
            mainMenu();
          });
        });
      });
    } else {
      console.log('Недійсний індекс завдання.');
      mainMenu();
    }
  });
}

function deleteTask() {
  rl.question('Введіть індекс завдання, яке ви хочете видалити: ', (index) => {
    const task = tasks[index];
    if (task) {
      tasks.splice(index, 1);
      saveTasks();
      console.log(`Завдання "${task.title}" видалено.`);
    } else {
      console.log('Недійсний індекс завдання.');
    }
    mainMenu();
  });
}

function showOverdueTasks() {
  const currentDate = new Date();
  const overdueTasks = tasks.filter((task) => !task.done && new Date(task.deadline) < currentDate);
  if (overdueTasks.length === 0) {
    console.log('Немає протермінованих завдань.');
  } else {
    console.log('Протерміновані завдання:');
    overdueTasks.forEach((task) => {
      console.log(`- ${task.title} (Дедлайн: ${task.deadline})`);
    });
  }
  mainMenu();
}

function exitProgram() {
  console.log('Дякую за використання менеджера завдань. До побачення!');
  rl.close();
}

function addTask() {
  rl.question('Введіть заголовок завдання: ', (title) => {
    rl.question('Введіть опис завдання: ', (description) => {
      rl.question('Введіть дедлайн завдання: ', (deadline) => {
        const newTask = {
          title: title,
          description: description,
          deadline: deadline,
          done: false,
        };
        tasks.push(newTask);
        saveTasks();
        console.log('Нове завдання додано.');
        mainMenu();
      });
    });
  });
}

function mainMenu() {
  console.log('=== Менеджер завдань ===');
  console.log('1. Показати список невиконаних завдань');
  console.log('2. Показати усі завдання');
  console.log('3. Позначити завдання виконаним');
  console.log('4. Редагувати завдання');
  console.log('5. Видалити завдання');
  console.log('6. Показати список протермінованих завдань');
  console.log('7. Додати нове завдання');
  console.log('8. Вийти');

  rl.question('Виберіть опцію: ', (option) => {
    switch (option) {
      case '1':
        showIncompleteTasks();
        break;
      case '2':
        showAllTasks();
        break;
      case '3':
        markTaskAsDone();
        break;
      case '4':
        editTask();
        break;
      case '5':
        deleteTask();
        break;
      case '6':
        showOverdueTasks();
        break;
      case '7':
        addTask();
        break;
      case '8':
        exitProgram();
        break;
      default:
        console.log('Недійсний вибір. Будь ласка, виберіть одну з опцій.');
        mainMenu();
        break;
    }
  });
}

loadTasks();
mainMenu();

module.exports = {
  showIncompleteTasks,
  addTask,
  clearTasks,
  deleteTask,
  markTaskAsDone,
  tasks,
  loadTasks,
};