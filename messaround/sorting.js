var a = [[12, 'AAA'], [58, 'BBB'], [28, 'CCC'],[18, 'DDD']];

a.sort(sortFunction);

function sortFunction(a, b, field) {
    if (a[field] === b[field]) {
        return 0;
    }
    else {
        return (a[field] < b[field]) ? -1 : 1;
    }
}

console.log(a)