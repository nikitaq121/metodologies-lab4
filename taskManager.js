class TaskManager {
    constructor() {
      this.tasks = [];
    }
  
    getTasksCount() {
      return this.tasks.length;
    }
  
    getTaskByIndex(index) {
      return this.tasks[index];
    }
  
    addTask(task) {
      this.tasks.push(task);
    }
  
    clearTasks() {
      this.tasks = [];
    }
  
    deleteTask(index) {
      this.tasks.splice(index, 1);
    }
  
    markTaskAsDone(index) {
      this.tasks[index].done = true;
    }
  
    getIncompleteTasks() {
      const incompleteTasks = this.tasks.filter(task => !task.done);
  
      if (incompleteTasks.length === 0) {
        return 'Немає невиконаних завдань.';
      }
  
      const tasksString = incompleteTasks.map(task => `- ${task.title} (Дедлайн: ${task.deadline})`).join('\n');
      return `Невиконані завдання:\n${tasksString}`;
    }
  
    loadTasks(filename) {
      // Логіка завантаження завдань з файлу
    }
  }
  
  module.exports = TaskManager;