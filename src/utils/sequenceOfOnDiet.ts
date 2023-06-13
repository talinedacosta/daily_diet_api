interface Meal {
  isDiet: 'true' | 'false',
  title: string,
  description?: string,
  eaten_at: string,
  created_at: string,
  updated_at: string,
  id: string,
  user_id: string
}

export const bestSequenceOfOnDiet = (list: Array<Meal>): Number => {
  const reduce = list.reduce((prev: Array<[]>, curr) => {

    if (curr.isDiet === 'true') {
      if (!prev[prev.length - 1]) {
        prev.push([]);
      }

      let arr: any[] = prev[prev.length - 1];
      arr.push(curr);
    } else {
      prev.push([]);
    }

    return prev;

  }, []).map((arr: Array<{}>) => {
    return arr.length;
  })

  return Math.max(...reduce);

}
