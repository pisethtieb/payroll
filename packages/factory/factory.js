Factory = {};
Factory._factories = [];

var factoryFun = function (name, collection, attributes) {
    this.name = name;
    this.collection = collection;
    this.attributes = attributes;
};

Factory.define = function (name, collection, attributes) {
    var factory = new factoryFun(name, collection, attributes);

    for (var i = 0; i < this._factories.length; i++) {
        if (this._factories[i].name === name) {
            throw new Error('A factory named ' + name + ' already exists');
        }
    }

    Factory._factories.push(factory);
};

Factory._get = function (name) {
    var factory = _.findWhere(Factory._factories, {name: name});

    if (!factory) {
        throw new Error('Could not find the factory named ' + name);
    }

    return factory;
};

Factory.create = function (name, newAttr) {
    var factory = this._get(name);
    var collection = factory.collection;

    // Allow to overwrite the attribute definitions
    var attr = _.merge({}, factory.attributes, newAttr);

    var docId = collection.insert(attr);
    var doc = collection.findOne(docId);

    return doc;
};

Factory.build = function (name, newAttr) {
    var factory = this._get(name);

    var doc = _.merge({}, factory.attributes, newAttr);
    return doc;
};