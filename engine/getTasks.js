const puppeteer = require('puppeteer');


async function fetchTrelloTasks() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const tasksList = [];
    const categoriesList = [];
    await page.goto('https://trello.com/b/QvHVksDa/personal-work-goals', { waitUntil: 'networkidle2' });

    await page.waitForSelector('#board');

    // this function can be used to get the outerHTML of the elements and render its content in order to make this tool more flexible
    const listItemsWithOlHtml = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('#board li:has(ol)'));
        return items.map(item => item.outerHTML);
    });

    // this function can be used to create a catalogue of tasks categories
    const headings = await page.$$("h2");
    for (let i = 0; i < headings.length; i++) {
        const text = headings[i]
        const headingText = await page.evaluate(text => text.textContent, text);
        categoriesList.push(headingText);
    }
    console.log("Categories list obtained: ", categoriesList);
    console.log("Obtaining tasks list...");
    const cardsObtained = await page.$$('[data-testid="card-name"]');
    for (let i = 0; i < cardsObtained.length; i++) {
        const text = cardsObtained[i]
        const cardText = await page.evaluate(text => text.textContent, text);
        tasksList.push(cardText);
    }

    if (tasksList.length === 0) {
        console.log("No tasks found");
    }
    console.log("Tasks list obtained of lenght: ", tasksList.length);
    await browser.close();

    return tasksList
}

module.exports = fetchTrelloTasks;
// Path: engine/index.js
