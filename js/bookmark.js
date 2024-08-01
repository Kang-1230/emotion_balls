//setItem
function addBookmark() {
    const already = window.localStorage.getItem(bmk)
    if (already === undefined) {
        window.localStorage.setItem(bmk, true);
    } else {
        window.localStorage.removeItem(bmk)
    }
}