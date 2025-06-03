import { Locator, Page } from "@playwright/test";
import BasePage from '../../basePage';
export class MyBoardsPage extends BasePage{
    private readonly createNewBoardBtn: Locator
    private readonly boardTitleInputField: Locator
    private readonly createBoardBtn: Locator
    private readonly clearBtn: Locator
    constructor(page:Page){
        super(page);
        this.createNewBoardBtn = page.getByText('Create new board')
        this.boardTitleInputField = page.getByRole('textbox', { name: 'Add board title' })
        this.createBoardBtn = page.getByRole('button', { name: 'Create board' })
        this.clearBtn = page.locator('div').filter({ hasText: /^Create board$/ }).getByRole('img')
    }
    
    async createNewBoard(boardName:string){
        await this.clickElement(this.createNewBoardBtn)
        await this.fillInputField(this.boardTitleInputField,boardName)
        await this.clickElement(this.createBoardBtn)
    }
    
   
 
}