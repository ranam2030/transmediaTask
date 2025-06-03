import { test, expect } from '../../../fixtures/pomFixtures';
import board from '../../../testData/testData.json';

test.beforeEach(async({page})=>{
  await page.goto(process.env.BASE_URL!);
});

test('Input a Board name, press enter. Verify Board created successfully.',async({myBoardsPage,listPage,getStartedPage})=>{
  await myBoardsPage.createNewBoard(board.boardName[0]);
  await listPage.verifyNewBoardCreated(board.boardName[0]);
})

