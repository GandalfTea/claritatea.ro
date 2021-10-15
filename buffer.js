
// buffer holds data on 5 last edits to allow for undo
// basically a stack


const MAX_BUFFER_ENTRIES = 5;
var IDX = 1;

var db = Array(MAX_BUFFER_ENTRIES);
db.fill(undefined);
Object.seal(db); // fix array size


export function create(method, id, data) {
    this.method = method; // EDIT, DEL or NEW
    this.active_id = id;
    this.id = IDX++;
    this.data = data;   // encoded utf-8 

    push(this);
}


export function undo() {
    
    if(check_id_conflict(entry.active_id)) {  resolve_id_conflict(entry.active_id);  }
    
    switch(db[0].method) {
        case "EDIT":
            $('#edit').children.filter(function() {
                if(this.id === db[0].active_id) { this.innerText = db[0].data; }
            });
            break;

        case "DEL":
            break;

        case "NEW":
            break;

        default:
            //error
    }    

    db.shift();
    db.at(-1) = null;
} 



function pop() {
    db.at(-1) = undefined;
}

function push(entry) 
    //db.unshift(entry);    // Does not work because of seal 
    for(let i = db.length-1; i > 0; i--) {
        db[i] = db[i-1];
    }
    a[0] = entry;
}

function check_id_conflict(id) {
    $('#edit').children().filter(function() {
        if("1234".includes(this.id)) {
            if(this.id === id) {
                return true;
            }
        }
    })
    return false;
}

function resolve_id_conflict(id) {
    // init old entry with old id
    // change new obj id.
}
