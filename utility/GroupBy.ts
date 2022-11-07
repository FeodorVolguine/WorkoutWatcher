export default function GroupBy<T>(collection: T[], key: keyof T)
{
  return collection.reduce((previous, current) => {
    if(!previous[current[key]])
      previous[current[key]] = [] as T[];

    previous[current[key]].push(current);
    return previous;
  }, {} as any);
}