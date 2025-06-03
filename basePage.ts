import { Page,Locator } from "@playwright/test";

export default class BasePage{
    readonly page:Page;

    constructor(page:Page){
        this.page= page;
    }
    async navigateTo(url: string){
        await this.page.goto(url);
    }
    async clickElement(element: Locator){
        await element.click();
    }
    async clearInputField(element:Locator){
        await element.clear();
    }
    async fillInputField(element:Locator,value:string){
        await element.fill(value);
    }
    async getText(element:Locator):Promise<string>{
        return element.innerText();
    }
    async waitForElement(selector:string){
        await this.page.waitForSelector(selector,{state:'visible'});
    }
    async getBack(){
        await this.page.goBack();
    }
    async waitForURL(url:string){
        await this.page.waitForURL(url);
    }

}