/**
 * Created by martinlinggi on 28.10.14.
 */


describe('Service: TimeCalculationService', function() {

    var TimeCalculationService;

    // load the application module
    beforeEach(module('forgedditApp'));

    // get a reference to all used services
    beforeEach(inject(function (_TimeCalculationService_) {
        TimeCalculationService = _TimeCalculationService_;
    }));

    describe('Public API', function () {

        it('should include a getDuration() function', function () {
            expect(TimeCalculationService.getDuration).toBeDefined();
        });

    });

    describe('Public API usage', function () {

        describe('getDuration()', function () {

            it('should return a proper duration calculation "now"', function () {
                var date = new Date();
                var text = TimeCalculationService.getDuration(date.getTime())
                expect(text).toBe('just now');
            });

            it('should return a proper duration for "5 sec"', function () {
                var date = new Date();
                var text = TimeCalculationService.getDuration(date.getTime() - 5 * 1000)
                expect(text).toBe('5 seconds ago');
            });

            it('should return a proper duration for "2 min"', function () {
                var date = new Date();
                var text = TimeCalculationService.getDuration(date.getTime() - 2 * 60 * 1000)
                expect(text).toBe('2 minutes ago');
            });

            it('should return a proper duration for "2 hr"', function () {
                var date = new Date();
                var text = TimeCalculationService.getDuration(date.getTime() - 2 * 60 * 60 * 1000)
                expect(text).toBe('2 hours ago');
            });

            it('should return a proper duration for "2 days"', function () {
                var date = new Date();
                var text = TimeCalculationService.getDuration(date.getTime() - 2 *24 *60 * 60 * 1000)
                expect(text).toBe('2 days ago');
            });

            it('should return a proper duration for "2 weeks"', function () {
                var date = new Date();
                var text = TimeCalculationService.getDuration(date.getTime() - 2 * 7 * 24 *60 * 60 * 1000)
                expect(text).toBe('2 weeks ago');
            });

            it('should return a proper duration for "2 months"', function () {
                var date = new Date();
                var text = TimeCalculationService.getDuration(date.getTime() - 2 * 31 * 24 *60 * 60 * 1000)
                expect(text).toBe('2 months ago');
            });

            it('should return a proper duration for "2 years"', function () {
                var date = new Date();
                var text = TimeCalculationService.getDuration(date.getTime() - 2 * 365 * 24 *60 * 60 * 1000)
                expect(text).toBe('2 years ago');
            });
        });

    });

});