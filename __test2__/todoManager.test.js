const {
    addTask,
    toggleTask,
    deleteTask,
    todoList,
} = require('../src/test_2/script');

describe('Todo Manager', () => {
    beforeEach(() => {
        todoList.length = 0; // Reset the todo list before each test

        // Mock the input element and todo-list element for the tests
        document.getElementById = jest.fn((id) => {
            if (id === 'todo-input') {
                return { value: 'Test Task', trim: function() { return this.value.trim(); } };
            } else if (id === 'todo-list') {
                return {
                    innerHTML: '',
                    appendChild: jest.fn(),  // Mock appendChild method
                };
            }
            return null;
        });
    });

    test('addTask should add a task to the todo list', () => {
        addTask();  // No parameter, simulates using the DOM element
        expect(todoList.length).toBe(1);
        expect(todoList[0].text).toBe('Test Task');
        expect(todoList[0].done).toBe(false);
    });

    test('toggleTask should mark the task as done', () => {
        addTask();
        const taskId = todoList[0].id;
        toggleTask(taskId);
        expect(todoList[0].done).toBe(true);
    });

    test('deleteTask should remove the task from the todo list', () => {
        addTask();
        const taskId = todoList[0].id;
        deleteTask(taskId);
        expect(todoList.length).toBe(0);
    });

    test("toggleTask should mark a task as not done if called twice", () => {
        addTask();
        const taskId = todoList[0].id;
        toggleTask(taskId);
        toggleTask(taskId);
        expect(todoList[0].done).toBe(false);
    });
});
