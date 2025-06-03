import { test, expect } from '@playwright/test';

test('Create a board and then a list via API', async ({ request, page }) => {
  const boardResponse = await request.post('http://localhost:3000/api/boards', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
    },
    data: {
      name: 'Test Board'
    }
  });

  expect(boardResponse.status()).toBe(201); 

  const board = await boardResponse.json();
  expect(board).toHaveProperty('id');
  const boardId = board.id;

  const listResponse = await request.post('http://localhost:3000/api/lists', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'Origin': 'http://localhost:3000',
      'Referer': `http://localhost:3000/board/${boardId}`,
    },
    data: {
      boardId: boardId,
      name: 'Test List',
      order: 0
    }
  });

  expect(listResponse.status()).toBe(201); 
  const list = await listResponse.json();
  expect(list.name).toBe('Test List');

});
