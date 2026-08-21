const { addElementToDOM, removeElementFromDOM, simulateClick, handleFormSubmit } = require('../index');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

beforeEach(() => {
  document.documentElement.innerHTML = html;
});

describe('addElementToDOM', () => {
  test('adds content to the specified container', () => {
    addElementToDOM('dynamic-content', 'Hello World');
    const container = document.getElementById('dynamic-content');
    expect(container.innerHTML).toBe('Hello World');
  });

  test('does nothing if the container does not exist', () => {
    expect(() => addElementToDOM('nonexistent-id', 'Hello')).not.toThrow();
  });
});

describe('removeElementFromDOM', () => {
  test('removes the specified element from the DOM', () => {
    removeElementFromDOM('dynamic-content');
    const container = document.getElementById('dynamic-content');
    expect(container).toBeNull();
  });
});

describe('simulateClick', () => {
  test('adds the expected content when triggered', () => {
    simulateClick('dynamic-content', 'Button Clicked!');
    const container = document.getElementById('dynamic-content');
    expect(container.textContent).toBe('Button Clicked!');
  });
});

describe('handleFormSubmit', () => {
  test('displays an error when the input is empty', () => {
    const input = document.getElementById('user-input');
    input.value = '';

    handleFormSubmit('user-form', 'dynamic-content');

    const errorMessage = document.getElementById('error-message');
    expect(errorMessage.textContent).toBe('Input cannot be empty');
    expect(errorMessage.classList.contains('hidden')).toBe(false);
  });

  test('displays the input value in the container when valid', () => {
    const input = document.getElementById('user-input');
    input.value = 'Test input';

    handleFormSubmit('user-form', 'dynamic-content');

    const container = document.getElementById('dynamic-content');
    expect(container.innerHTML).toBe('Test input');
  });

  test('clears the error message when input becomes valid', () => {
    const input = document.getElementById('user-input');
    const errorMessage = document.getElementById('error-message');

    input.value = '';
    handleFormSubmit('user-form', 'dynamic-content');
    expect(errorMessage.classList.contains('hidden')).toBe(false);

    input.value = 'Now valid';
    handleFormSubmit('user-form', 'dynamic-content');
    expect(errorMessage.textContent).toBe('');
    expect(errorMessage.classList.contains('hidden')).toBe(true);
  });
});