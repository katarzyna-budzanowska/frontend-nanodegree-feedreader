/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('feed url not empty', function() {
           const testURL = function(feed) {
             // Check that URL is a defined and not empty String.
             expect(feed.url).toBeDefined();
             expect(feed.url).toEqual(jasmine.any(String));
             expect(feed.url).not.toBe('');
           };
           allFeeds.forEach(testURL);
         });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('feed name not empty', function() {
           const testName = function(feed) {
             // Check that name is a defined and not empty String.
             expect(feed.name).toBeDefined();
             expect(feed.name).toEqual(jasmine.any(String));
             expect(feed.name).not.toBe('');
           };
           allFeeds.forEach(testName);
         })
    });


    describe('The menu', function() {

        //This test ensures the menu element is hidden by default.
        it('is hidden by default', function() {
          // menu-hidden class hides the manu panel.
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked.
          */
          it('is visible when menu icon is clicked', function() {
            const menuIcon = $('.menu-icon-link');
            // Click should toggle menu-hidden class.
            menuIcon.trigger( "click" );
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.trigger( "click" );
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });


    describe('Initial Entries', function() {

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

         beforeEach(function(done) {
           // Wait for initial feed load.
           setTimeout(function() {
             done();
           }, 4000);
         });

         it('have entry', function() {
           var container = $('.feed');
           var feedEntries = container.find('.entry');
           expect(feedEntries.length).toBeGreaterThan(0);
         });

    });


     describe('New Feed Selection', function() {
        /* This test ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        */
        var feedEntries = [];
        var newFeedEntries = [];
        beforeEach(function(done) {
          // Use callbacks for synchronisation
          loadFeed(0, function() {
            const container = $('.feed');
            feedEntries = container.find('.entry');
            loadFeed(1, function() {
              const container = $('.feed');
              newFeedEntries = container.find('.entry');
              // Finish beforeEach and go to it(...)
              done();
            });
          });
        });

        it('has changed entries', function() {
          // Check if after second feed load we still have some entries.
          expect(newFeedEntries.length).toBeGreaterThan(0);
          // Compare first and last entries from previous and current feed load.
          expect(newFeedEntries[0].isEqualNode(feedEntries[0])).toBe(false);
          expect(newFeedEntries.slice(-1)[0].isEqualNode(feedEntries.slice(-1)[0])).toBe(false);
        });
     });
}());
