"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var mutator = require("../index");
var parser_1 = require("../parser");
function sleep(ns) {
    return new Promise(function (resolve) { return setTimeout(resolve, ns); });
}
var Category = /** @class */ (function () {
    function Category() {
        this.name = 'novel';
        this.count = 123;
    }
    Object.defineProperty(Category.prototype, "count2", {
        get: function () {
            return this.count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Category.prototype, "count3", {
        set: function (val) {
            this.count = val;
        },
        enumerable: true,
        configurable: true
    });
    Category.prototype.count4 = function () {
        return this.count;
    };
    return Category;
}());
var originalBook = {
    title: {
        zh: '哈利·波特与魔法石',
        en: 'Harry Potter and the Philosopher\'s Stone',
    },
    category: new Category(),
    author: 'J. k. rowling',
    tags: ['novel', 'magic'],
    pub_date: new Date('2017-7-11'),
};
var book = {
    title: {
        zh: '哈利·波特与魔法石',
        en: 'Harry Potter and the Philosopher\'s Stone',
    },
    category: new Category(),
    author: 'J. k. rowling',
    tags: ['novel', 'magic'],
    pub_date: new Date('2017-7-11'),
};
describe('setIn', function () {
    it('simple', function () {
        var newBook = mutator.setIn(book, function (_) { return _.author; }, 'J');
        assert.equal(newBook.author, 'J', 'author');
        assert.equal(book.author, originalBook.author, 'original author');
        assert.notEqual(newBook, book, 'book');
        assert.equal(newBook.category, book.category, 'category should keep');
        assert.equal(newBook.pub_date, book.pub_date, 'pub_date should keep');
    });
    it('simple2', function () {
        var newBook = mutator.setIn(book, function (_) { return _.title.en; }, 'Harry Potter and something...');
        assert.deepEqual(book, originalBook, 'book shouldn\'t change');
        assert.equal(newBook.title.en, 'Harry Potter and something...', 'title.en should change');
        assert.equal(newBook.title.zh, '哈利·波特与魔法石', 'title.zh shouldn\'t change');
        assert(newBook.tags === book.tags);
        assert.deepEqual(newBook.tags, book.tags);
        assert.deepEqual(newBook.category, book.category);
        assert.notEqual(newBook, book);
        assert.notEqual(newBook.title, book.title);
    });
    it('class', function () {
        var newBook = mutator.setIn(book, function (_) { return _.category.name; }, 'book');
        assert(newBook.category.name === 'book');
        assert(newBook.category.count === book.category.count);
        assert(newBook !== book);
        assert(newBook.category !== book.category);
        assert(newBook.title === book.title);
        assert(newBook.category.count2 === book.category.count2);
        newBook.category.count3 = 10;
        assert(newBook.category.count === 10);
        assert(book.category.count === originalBook.category.count);
        assert(newBook.category.count4() === newBook.category.count);
        assert(newBook.category instanceof Category);
    });
    it('quote', function () {
        var newBook = mutator.setIn(book, function (_) { return _['category']['name']; }, 'book');
        assert(newBook.category.name === 'book');
        assert(newBook.category.count === book.category.count);
        assert(newBook !== book);
        assert(newBook.category !== book.category);
        assert(newBook.title === book.title);
        assert(newBook.category instanceof Category);
    });
    it('array', function () {
        var newBook = mutator.setIn(book, function (_) { return _.tags[0]; }, 'N');
        assert(newBook.tags[0] === 'N', 'First tag should change');
        assert(newBook.tags[1] === 'magic', 'Second tag should keep');
        assert(newBook.tags.length === 2, 'tags length should keep');
        assert(newBook.tags instanceof Array, 'tags type should keep');
        assert(newBook.category === book.category, 'category should keep');
        assert(newBook !== book);
        assert(newBook.tags !== book.tags);
        assert(newBook.title === book.title);
        assert(newBook.category instanceof Category);
    });
    it('delete', function () {
        var newBook = mutator.setIn(book, function (_) { return _.title.en; }, null);
        assert(newBook.title.en === null);
        assert(newBook.title.zh === book.title.zh);
        assert(newBook.title !== book.title);
        assert(newBook !== book);
        assert(newBook.category === book.category);
    });
});
describe('updateIn', function () {
    it('simple', function () {
        var newBook = mutator.updateIn(book, function (_) { return _.title.en; }, function (title) { return title + ' (Original Edition)'; });
        assert.deepEqual(book, originalBook);
        assert.equal(newBook.title.en, 'Harry Potter and the Philosopher\'s Stone (Original Edition)');
        assert(newBook.tags === book.tags);
        assert.deepEqual(newBook.tags, book.tags);
        assert.notEqual(newBook, book);
        assert.notEqual(newBook.title, book.title);
    });
});
describe('dynamic updateIn', function () {
    it('simple', function () {
        var type = 'en';
        var title = 'title';
        var newBookTmp = mutator.updateIn(book, function (_) { return _[title][type]; }, function (title) { return title + ' tem'; }, [title, type]);
        var newBook = mutator.updateIn(book, function (_) { return _[title][type]; }, function (title) { return title + ' (Original Edition)'; }, [title, type]);
        assert.deepEqual(book, originalBook);
        assert.equal(newBook.title.en, 'Harry Potter and the Philosopher\'s Stone (Original Edition)');
        assert(newBook.tags === book.tags);
        assert.deepEqual(newBook.tags, book.tags);
        assert.notEqual(newBook, book);
        assert.notEqual(newBook.title, book.title);
    });
});
var newBook = mutator.setIn(book, function (_) { return _.title.en; }, 'nnn');
newBook = mutator.updateIn(book, function (_) { return _.tags; }, function (t) { return t.concat(['novel']); });
var expected = { args: ['a', ['a1', 'a2', 'a3']],
    obj: 'a',
    keyPath: [{ type: 'string', value: 'bb' },
        { type: 'string', value: 'cc' },
        { type: 'string', value: 'aa' },
        { type: 'number', value: 1 },
        { type: 'string', value: 'dd' },
        { type: 'variable', value: 'a1' },
        { type: 'string', value: 'cc' }] };
var parse = function (str) { return parser_1.default.accessor.tryParse(str); };
function prettyPrint(x) {
    // let opts = { depth: null, colors: true }
    // let s = util.inspect(x, opts)
    // console.log(s)
}
describe('parser', function () {
    it('function', function () {
        console.time('parse function');
        var ast = parse("function (a, [a1,a2,a3]) { return a.bb.cc['aa'][1][\"dd\"][a1]['cc']; }");
        console.timeEnd('parse function');
        prettyPrint(ast);
        assert.deepEqual(ast, expected);
    });
    it('lambda with args', function () {
        console.time('parse lambda with args');
        var ast = parse("(a, [a1,a2,a3]) => { return a.bb.cc['aa'][1][\"dd\"][a1]['cc']; }");
        console.timeEnd('parse lambda with args');
        prettyPrint(ast);
        console.time('start');
        assert.deepEqual(ast, expected);
        console.timeEnd('start');
    });
    it('lambda', function () {
        console.time('parse lambda');
        var ast = parse("_ => _.bb.cc['aa'].get('cc')[1][\"dd\"][a1].get(ee).get(\"ff\")");
        console.timeEnd('parse lambda');
        prettyPrint(ast);
        assert.deepEqual(ast, { args: ['_'],
            obj: '_',
            keyPath: [{ type: 'string', value: 'bb' },
                { type: 'string', value: 'cc' },
                { type: 'string', value: 'aa' },
                { type: 'string', value: 'cc' },
                { type: 'number', value: 1 },
                { type: 'string', value: 'dd' },
                { type: 'variable', value: 'a1' },
                { type: 'variable', value: 'ee' },
                { type: 'string', value: 'ff' },] });
    });
    it('self', function () {
        console.time('parse lambda');
        var ast = parse("_ => _");
        console.timeEnd('parse lambda');
        prettyPrint(ast);
        assert.deepEqual(ast, { args: ['_'], obj: '_', keyPath: [] });
    });
});
describe('getIn', function () {
    it('simple', function () {
        assert.equal(book.title, mutator.getIn(book, function (_) { return _.title; }), 'title should work');
        assert.equal(book.tags, mutator.getIn(book, function (_) { return _.tags; }), 'tags should work');
        assert.equal(book.tags[0], mutator.getIn(book, function (_) { return _.tags[0]; }), 'tags item should work');
        assert.equal(undefined, mutator.getIn(book, function (_) { return _.tags.aa.bbb; }), 'undefined should work');
        assert.equal(undefined, mutator.getIn(book, ['aa', 'bb', 1, 2]), 'undefined for array should work');
    });
});
//# sourceMappingURL=index.test.js.map