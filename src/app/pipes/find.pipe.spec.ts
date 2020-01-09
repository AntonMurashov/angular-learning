import { FindPipe } from './find.pipe';

describe('FindPipe', () => {
  let pipe = new FindPipe();
  let items = [{
    id: 1,
    name: "name1",
    date: new Date(),
    length: 0,
    description: "description",
    isTopRated: true
  },
  {
    id: 2,
    name: "name2",
    date: new Date(),
    length: 0,
    description: "description",
    isTopRated: true
  },
  {
    id: 3,
    name: "caption3",
    date: new Date(),
    length: 0,
    description: "description",
    isTopRated: true
  }];
  let initialItems = JSON.parse(JSON.stringify(items));
  
  it('finds items', () => {
    expect(pipe.transform(items, 'name').length).toBe(2);
  });
});
