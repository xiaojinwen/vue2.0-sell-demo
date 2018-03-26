// export function saveToLocal(id, key, value) {
//   let ls = window.localStorage
//   let seller = ls.getItem('seller')
//   if (!seller) {
//     seller = {}
//     seller[id] = {}
//   } else {
//     seller = JSON.parse(seller)
//     if (seller[id]) {
//       seller[id] = {}
//     }
//   }
//   seller[id][key] = value
//   ls.setItem('seller', JSON.stringify(seller))
// }
//
// export function loadFormLocal(id, key, def) {
//   let ls = window.localStorage
//   let seller = ls.getItem('seller')
//   if (!seller) {
//     return def
//   }
//   seller = JSON.parse(seller)[id]
//   if (!seller) {
//     return def
//   }
//   let ret = JSON.parse(seller[id])[key]
//   return ret || def
// }

export function saveToLocal(id, key, value) {
  let ls = window.localStorage
  let seller = ls.getItem('seller_' + id)
  if (!seller) {
    seller = {}
  } else {
    seller = JSON.parse(seller)
  }
  seller[key] = value
  ls.setItem('seller_' + id, JSON.stringify(seller))
}

export function loadFormLocal(id, key, def) {
  let ls = window.localStorage
  let seller = ls.getItem('seller_' + id)
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)
  if (!seller) {
    return def
  }
  let ret = seller[key]
  return ret || def
}
