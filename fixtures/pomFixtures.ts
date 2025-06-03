import { test as baseTest } from '@playwright/test';
import { MyBoardsPage } from '../pages/myBoards/myBoardsPage';
import { ListPage } from '../pages/lists/listsPage';
import { GetStartedPage } from '../pages/gateStarted/getStartedPage'

type pages = {
    myBoardsPage: MyBoardsPage,
    listPage: ListPage
    getStartedPage: GetStartedPage
}

const testPages = baseTest.extend<pages>({
    myBoardsPage:async ({page},use) => {
        await use(new MyBoardsPage(page));
    },
    listPage:async({page},use)=>{
        await use(new ListPage(page));
    },
    getStartedPage:async({page},use)=>{
        await use(new GetStartedPage(page))
    }
})
export const test = testPages;
export const expect = testPages.expect;