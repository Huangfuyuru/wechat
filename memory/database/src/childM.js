require('../modules/collection')
var Child = require('../modules/Child');
function addChild(person){
    var child = new Child({
        name:person.name,
        birthday:person.birthday,
        gender:person.gender,
        uid:person.uid
    })
    child.save()
}
exports.addChild = addChild;