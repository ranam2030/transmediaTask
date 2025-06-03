import { expect, Locator, Page } from "@playwright/test";
import BasePage from '../../basePage';
import board from '../../testData/testData.json';

export class ListPage extends BasePage{
    private boardTitle: Locator
    private listTitleInputField: Locator
    private addListBtn: Locator
    private closeBtn: Locator
    private listSelector:Locator
    private addAnotherCard: Locator
    private deleteList:Locator
    constructor(page:Page){
        super(page);
        this.boardTitle = page.locator('div.inline-block >> text=Sprint Planning');
        this.listTitleInputField = page.getByRole('textbox', { name: 'Enter list title...' })
        this.addListBtn = page.getByRole('button', { name: 'Add list' })
        this.closeBtn = page.locator('.inline-block > path')
        this.listSelector = page.getByRole('textbox')
        this.addAnotherCard = page.getByText('Add another card')
        this.deleteList = page.getByText('Delete list')
    }
    async getListItem(index:number){
        return this.page.getByRole('textbox').nth(index)
    }
    async getMenuItem(index:number){
        return this.page.getByRole('button').nth(index)
    }
    async getBoardTitle(name:string){
        return this.page.locator(`div.inline-block >> text=${name}`);
    }
    async verifyNewBoardCreated(boardName:string){
        const boardTitle = await this.getBoardTitle(boardName); 
        await expect(boardTitle).toHaveText(boardName); 
    }
    async createNewList(listTitle:string){
        await this.listTitleInputField.fill(listTitle)
        await this.addListBtn.click()
    }
    async verifyList(index: number) {
       const listItem = await this.getListItem(index);
       await expect(listItem).toBeVisible();
    }

    async deleteAList(index:number){
        const menuItem = await this.getMenuItem(index);
        await expect(menuItem).toBeVisible(); 
        await this.page.waitForTimeout(500)
        await menuItem.click({ force: true,timeout:30000 }); 
        await this.deleteList.click();
    }

    async verifyListDeleted(index){
        const listItem = await this.getListItem(index);
       await expect(listItem).not.toBeVisible();
    }
   
 
}