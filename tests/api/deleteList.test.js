import { test, expect } from '@playwright/test';

test('Delete list by ID via API', async ({ request }) => {
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
  const listData = await listResponse.json();
  const listId = listData.id;
  const boardId1 = listData.boardId; 

  const deleteResponse = await request.delete(`http://localhost:3000/api/lists/${listId}`, {
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Origin': 'http://localhost:3000',
      'Referer': `http://localhost:3000/board/${boardId1}`,
    },
  });

  expect(deleteResponse.status()).toBe(200); 
  console.log(`List ${listId} deleted successfully.`);
});
