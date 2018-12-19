var a = [[12, 'AAA'], [58, 'BBB'], [28, 'CCC'],[18, 'DDD']];

a.sort(sortFunction);

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

console.log(a)