import { test, expect } from '../../../fixtures/pomFixtures';
import board from '../../../testData/testData.json';

test.beforeEach(async({page})=>{
  await page.goto(process.env.BASE_URL!);
});

test('Add two lists and verify two lists created successfully.',async({myBoardsPage,listPage,getStartedPage})=>{
  await myBoardsPage.createNewBoard(board.boardName[1]);
  for (let index = 0; index < 2; index++) {
    await listPage.createNewList(board.listName[index])
  }
  for (let index = 0; index < 2; index++) {
    await listPage.verifyList(index)
  }
})

test('Delete a list.',async({myBoardsPage,listPage,getStartedPage})=>{
  await myBoardsPage.createNewBoard(board.boardName[2]);
  for (let index = 0; index < 1; index++) {
    await listPage.createNewList(board.listName[index])
  }
  await listPage.deleteAList(2)
  await listPage.verifyListDeleted(1)
})

