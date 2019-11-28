require('../modules/collection');
var Lover = require('../modules/Lover');
function addLover(person){
    var lover = new Lover({
        name:person.name,
        ldate:person.ldate,
        gender:person.gender,
        uid:person.uid
    })
    lover.save()
}
exports.addLover = addLover