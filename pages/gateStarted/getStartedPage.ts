import { expect, Locator, Page } from "@playwright/test";
import BasePage from '../../basePage';
import board from '../../testData/testData.json';

export class GetStartedPage extends BasePage{
    private boardNameInputField: Locator
    
    constructor(page:Page){
        super(page);
        this.boardNameInputField = page.getByRole('textbox', { name: 'Name of your first board' })
        
    }
}