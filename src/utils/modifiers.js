export function prepareBkLink(url, user){
    return url.replace('%s', !!user ? user.id : '' ) + '&' + new URLSearchParams({type: 'bk'});
}