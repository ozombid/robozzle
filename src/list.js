/** 
 * TODO ****************************** ACCESSORIES *********************************/

// Functions on pointed pairs
export function cons(_head, _tail) { return { head: _head, tail: _tail }; }
export const nil = {};
export function head(cons)        { return cons['head']; }
export function tail(cons)        { return cons['tail']; }
export function isEmpty(l)        { return l===nil; }
export function emptyList()           { return nil; }
// Predicate testing if an object `obj` has a field `key`
function hasKey(obj, key) {
    return Object.keys(obj).includes(key);
}
// isList
function isList(l){
    if (l===nil) return true;
    return hasKey(l,"head") && hasKey(l,"tail") && isList(tail(l));
}
// convert given array to list will be used 
export function arrayToList(ar){
    function arrayToList_i(ar,i) { return i===ar.length ? nil : cons(ar[i],arrayToList_i(ar,i+1)); }
    return isList(ar) ? ar : arrayToList_i(ar,0);
}
// Append the element e to the list l1
export function listAppend(l1,e)         { return isEmpty(l1) ? cons(e,nil) : cons(head(l1),listAppend(tail(l1),e));}



/************************************ STACK FUNCTIONS ****************************************** */
// Returns an empty stack
export function stackCreateEmpty() { return nil; }
// Checks that the stack `s` is empty
export function stackIsEmpty(s) { return isEmpty(s) ;}
// Returns a new stack where the element `e` has been pushed on top of the stack `s`
export function stackPush(e, s) { s=cons(e, s); return s; }
// Returns a new stack where the top of the stack `s` has been popped
// Throws an error if `s` is empty
export function stackPop(s) { if (stackIsEmpty(s)) throw new Error('empty stack'); return tail(s); }
// Returns the element at the top of the stack `s`
// Throws an error if `s` is empty
export function stackPeek(s) { if (stackIsEmpty(s)) throw new Error('empty stack'); return head(s); }
// replace head of stack by e
export function stackExchange(e,s) {
    return isEmpty(e) ? stackPop(s) : stackPush(e,stackPop(s));
}
