
const {launch} = require("puppeteer");

async function addTasksToTodoist(tasks) {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto('https://app.todoist.com/auth/login');

    await page.waitForSelector('form');

    // Login
    await page.type('form input[type="email"]', process.env.TODOIST_EMAIL);
    await page.type('form input[type="password"]', process.env.TODOIST_PASSWORD);
    await page.click('form button[type="submit"]');
    await page.waitForNavigation();
    console.log('Logged in at Todoist!');

    console.log('Adding tasks to Todoist...')
    // for task in tasks do something
    try {
        for (let i = 0; i < tasks.length; i++) {
            await page.goto('https://app.todoist.com/app/today', {waitUntil: 'networkidle0'});

            await page.waitForSelector('.view_content');
            await page.click('.view_content .plus_add_button');
            console.log('Clicked on add task button');

            await page.waitForSelector('.view_content .section .list_holder .items', {visible: true});
            console.log('Task editor loaded');

            // I will leave this commented code in order you to understand how i was debugging the code

            // const listItemsWithOlHtml = await page.evaluate(() => {
            //     const items = Array.from(document.querySelectorAll('.view_content .section .list_holder'));
            //     return items.map(item => item.outerHTML);
            // });
            // console.log('List items with ol html', listItemsWithOlHtml);
            // const placeHolderTask = await page.$$('.view_content .section .list_holder .items p[data-placeholder="Task name"]');
            // console.log('Task input', placeHolderTask);

            // Focus on the contenteditable div inside the first li element to input data
            // await page.focus('.items > li:first-child [contenteditable="true"]');
            // await page.screenshot({path: 'ss_beforetyping.png'});
            await page.keyboard.type(tasks[i]);
            console.log('Task inputted');
            // await page.screenshot({path: 'ss_aftertyping.png'});

            // Click on the button with data-testid="task-editor-submit-button"
            await page.waitForSelector('.view_content .section .list_holder .items button[data-testid="task-editor-submit-button"]', {visible: true});
            await page.click('button[data-testid="task-editor-submit-button"]');
            console.log('Task added: ', tasks[i]);
            // await page.waitForNavigation();


        }
        await browser.close();
    }
    catch (e) {
        console.log('Error: ', e);
        await browser.close();
    }
}

module.exports = addTasksToTodoist;
