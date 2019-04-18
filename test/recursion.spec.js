const expect = require('chai').expect;
const mergeRecursive = require('../recursion').mergeRecursive;
describe('mergeRecursive', () => {


    describe('when target object is empty and source object contains primitive', () => {
        it('should merge recursively', () => {
            expect(mergeRecursive({}, {a: 1})).to.eql({a: 1});
        });
    });
    describe('when target and source objects contain nested, but not equal objects ', () => {
        it('should merge recursively', () => {

            expect(mergeRecursive({a: {b: 1}}, {a: {c: 2}})).to.eql({a: {b: 1, c: 2}});
        });
    });
    describe('when target and source are arrays and merged ', () => {
        it('should merge recursively', () => {

            // expect(mergeRecursive([{a: 1}], [{a: 1}, {b: 2}])).to.eql([{a: 1}, {b: 2}]);
            expect(mergeRecursive([{text: 1}], [{text: 2},{text: 1}])).to.eql([{text: 2}, {text: 1}]);


        });
    });
    describe('when target and source are arrays and merged ', () => {
        it('should merge recursively', () => {
            expect(mergeRecursive({parent: [{text: 1}]}, {parent: [{b: 2}, {text: 1}]})).to.eql({parent: [{b: 2},{text: 1}]});
        });
    });
    describe.only('when target and source are arrays and merged ', () => {
        it('should merge recursively', () => {
            expect(mergeRecursive([{text: 1}], [{b: 2}, {text: 1}])).to.eql( [{b: 2},{text: 1}]);
        });
    });
    describe('when target and source are arrays and merged .....', () => {
        it('should merge recursively', () => {
            expect(mergeRecursive([{a: 1, c: 2}], [{a: 1, d: 3}, {b: 2}])).to.eql([{a: 1, c: 2, d: 3}, {b: 2}]);
        });
    });
    describe('when source object contains primitive value in already existed property', () => {
        it('should merge recursively', () => {
            expect(mergeRecursive({a: {b: {c: 1}}}, {a: {b: 2}})).to.eql({a: {b: 2}});
        });
    });
    describe('when source object contains primitive value in already existed property', () => {
        it('should merge recursively', () => {
            expect(mergeRecursive({a: {b: 2}}, {a: {b: {c: 1}}})).to.eql({a: {b: {c: 1}}});
        });
    });
    // describe('when source object contains primitive', () => {
    //     it('should merge recursively', () => {
    //
    //         expect(mergeRecursive({b:[1,2]}, 2)).to.eql({b:2});
    //     });
    // });
    // describe('when target are not array and primitive object ', () => {
    //     it('should merge recursively', () => {
    //
    //         expect(mergeRecursive({}, {a:'a'})).to.eql({a:'a'});
    //     });
    // });
});