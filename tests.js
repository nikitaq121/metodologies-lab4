const assert = require('assert');
const TaskManager = require('./taskManager');

describe('Менеджер завдань', () => {
  let manager;

  beforeEach(() => {
    manager = new TaskManager();
  });

  it('повинен відображати невиконані завдання', () => {
    assert.strictEqual(manager.getIncompleteTasks(), 'Немає невиконаних завдань.');

    manager.addTask({ title: 'Task 1', deadline: '2023-06-30', done: false });
    manager.addTask({ title: 'Task 2', deadline: '2023-07-01', done: true });
    manager.addTask({ title: 'Task 3', deadline: '2023-07-02', done: false });

    const expected = 'Невиконані завдання:\n- Task 1 (Дедлайн: 2023-06-30)\n- Task 3 (Дедлайн: 2023-07-02)';
    assert.strictEqual(manager.getIncompleteTasks(), expected);
  });

  it('повинен відображати повідомлення, якщо немає невиконаних завдань', () => {
    assert.strictEqual(manager.getIncompleteTasks(), 'Немає невиконаних завдань.');

    manager.addTask({ title: 'Task 1', deadline: '2023-06-30', done: true });
    manager.addTask({ title: 'Task 2', deadline: '2023-07-01', done: true });

    assert.strictEqual(manager.getIncompleteTasks(), 'Немає невиконаних завдань.');
  });

  it('повинен додавати нове завдання до списку завдань', () => {
    assert.strictEqual(manager.getTasksCount(), 0);

    manager.addTask({ title: 'Task 1', deadline: '2023-06-30', done: false });

    assert.strictEqual(manager.getTasksCount(), 1);

    const task = manager.getTaskByIndex(0);
    assert.strictEqual(task.title, 'Task 1');
    assert.strictEqual(task.deadline, '2023-06-30');
    assert.strictEqual(task.done, false);
  });

  it('повинен очищати всі завдання', () => {
    manager.addTask({ title: 'Task 1', deadline: '2023-06-30', done: false });
    manager.addTask({ title: 'Task 2', deadline: '2023-07-01', done: false });

    assert.strictEqual(manager.getTasksCount(), 2);

    manager.clearTasks();

    assert.strictEqual(manager.getTasksCount(), 0);
  });

  it('повинен видаляти вказане завдання', () => {
    manager.addTask({ title: 'Task 1', deadline: '2023-06-30', done: false });
    manager.addTask({ title: 'Task 2', deadline: '2023-07-01', done: false });
    manager.addTask({ title: 'Task 3', deadline: '2023-07-02', done: false });

    assert.strictEqual(manager.getTasksCount(), 3);

    manager.deleteTask(1);

    assert.strictEqual(manager.getTasksCount(), 2);

    const task = manager.getTaskByIndex(1);
    assert.strictEqual(task.title, 'Task 3');
    assert.strictEqual(task.deadline, '2023-07-02');
    assert.strictEqual(task.done, false);
  });

  it('повинен позначати вказане завдання як виконане', () => {
    manager.addTask({ title: 'Task 1', deadline: '2023-06-30', done: false });
    manager.addTask({ title: 'Task 2', deadline: '2023-07-01', done: false });
    manager.addTask({ title: 'Task 3', deadline: '2023-07-02', done: false });

    assert.strictEqual(manager.getTaskByIndex(1).done, false);

    manager.markTaskAsDone(1);

    assert.strictEqual(manager.getTaskByIndex(1).done, true);
  });
});