import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    let browser;
    let page;
    
    
    beforeAll(async () => {
        jest.setTimeout(5000);
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            ignoreDefaultArgs: ['--disable-extensions']
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    test('An event element is collpsed by default', async () => 
    {
        const eventDetails = await page.$('.event .event__Details');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {
        await page.click('.event .show-details');
        const eventDetails = await page.$('.event .event__Details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide its details', async () => 
    {
        await page.click('.event .show-details');
        const eventDetails = await page.$('.event .event__Details');
        expect(eventDetails).toBeNull();
    });

    afterAll(() => {
        browser.close();
    });
});

describe("Filter events by city", () =>
{
    let browser;
    let page;
    
    jest.setTimeout(80000);
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            ignoreDefaultArgs: ['--disable-extensions']
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    test("Events list of all cities will be shown", async () => 
    {
        const countEvents = await page.$$eval('.event', (element) => element.length);
        expect(countEvents).toBe(2);
    });

    test('Input text will show suggestions', async () =>
    {
        await page.type(".city", "Berlin")
        const countCities = await page.$$eval('.suggestions li', (element) => element.length);
        expect(countCities).toBe(2);
    });

    test('User clicks on suggested city from the list', async () => 
    {
        await page.reload();
        await page.type(".city", "Berlin");
        await page.click(".suggestions li");
        const countEvents = await page.$$eval('.event', (element) => element.length);
        expect(countEvents).toBe(1);
    });
});