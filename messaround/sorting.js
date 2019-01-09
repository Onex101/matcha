var a = [[12, 'AAA'], [58, 'BBB'], [28, 'DDD'],[18, 'CCC']];

a.sort(sortFunction);

function sortFunction(a, b) {
    if (a[0][16] === b[0][16]) {
        return 0;
    }
    else {
        return (a[0][16] < b[0][16]) ? -1 : 1;
    }
}

console.log(a)