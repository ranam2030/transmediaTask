import { test, expect } from '@playwright/test';

test('Delete list by ID via API', async ({ request }) => {
  const listId = 10;  
  const boardId = 11; 

  const deleteResponse = await request.delete(`http://localhost:3000/api/lists/${listId}`, {
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Origin': 'http://localhost:3000',
      'Referer': `http://localhost:3000/board/${boardId}`,
    },
  });

  expect(deleteResponse.status()).toBe(200); 
  console.log(`List ${listId} deleted successfully.`);
});
