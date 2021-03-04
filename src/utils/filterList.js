
export const filterList = (list, text, listName) => {
  const name = text.toLocaleLowerCase();
  const filterList = list.filter(el => {
    return el[listName].toLocaleLowerCase().indexOf(name) !== -1
  })
  return filterList;
}
